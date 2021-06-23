import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {Redirect, useHistory} from 'react-router-dom'
import {RedirectButton} from '../components/RedirectButton'


export const CreatePage = ()=>{
    const message = useMessage()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [added, setAdded] = useState(false)
    const [id, setId] = useState(null)
    useEffect(()=>{
        window.M.updateTextFields()
    }, [ ])
    const clickHandler = async event =>{
        try{
            const data = await request('/api/article/create', 'POST', {title, content}, {
                Authorization: `Bearer ${auth.token}`
            })
            message('Статья успешно добавлена')
            setAdded(true)
            setId(data.article._id)
            //history.push(`/detail/${data.article._id}`)
        }catch(e){

        }
    }

    return(
            <div className="row">
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input placeholder="Введить название статьи" id="title" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field">
                        <textarea id="content" className="materialize-textarea" name="content" value={content} onChange={e => setContent(e.target.value)}></textarea>
                        <label htmlFor="content">Content</label>
                    </div>
                    <div className="card-action">
                            <button className="authButton btn purple darken-3" onClick={clickHandler}>Добавить</button>
                            {added && (
                                <a className="waves-effect waves-light btn" onClick={()=>{history.push(`/detail/${id}`)}}>Перейти к статье</a>
                            )}
                        </div>
                </div>
            </div>
    )
}
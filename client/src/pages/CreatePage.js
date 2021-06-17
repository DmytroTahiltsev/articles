import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = ()=>{
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    useEffect(()=>{
        window.M.updateTextFields()
    }, [ ])
    const clickHandler = async event =>{
        try{
            const data = await request('/api/article/create', 'POST', {title, content}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
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
                    </div>
            </div>
        </div>
    )
}
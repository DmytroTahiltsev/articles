import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = ()=>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', username: '', password: ''
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(()=>{
        window.M.updateTextFields()
    }, [ ])
    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
       try{
            const data = await request('/api/auth/registration', 'POST', {...form})
            message(data.message)
            console.log('data', data)
        }catch(e){

        }
    }
    const loginHandler = async () => {
        try{
             const data = await request('/api/auth/login', 'POST', {...form})
             auth.login(data.token, data.userId)
             console.log('data', data)
         }catch(e){
 
         }
     }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Project</h1>
                <div className="card deep-purple lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введить email" id="email" type="text" name="email" value={form.email} onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введить имя" id="username" type="text" name="username" value={form.username} onChange={changeHandler} />
                                <label htmlFor="username">Имя</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введить пароль" id="password" type="password" name="password" value={form.password} onChange={changeHandler} />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="authButton btn yellow darken-4" onClick={loginHandler} disabled={loading}>Войти</button>
                        <button className="authButton btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
      </div>
            </div>
        </div>
    )
}
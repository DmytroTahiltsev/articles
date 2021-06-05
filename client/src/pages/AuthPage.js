import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = ()=>{
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', username: '', password: ''
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
       try{
            const data = await request('/api/auth/registration', 'POST', {...form})
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
                                <input placeholder="Введить email" id="email" type="text" name="email" onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введить имя" id="username" type="text" name="username" onChange={changeHandler} />
                                <label htmlFor="username">Имя</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введить пароль" id="password" type="password" name="password" onChange={changeHandler} />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="authButton btn yellow darken-4" disabled={loading}>Войти</button>
                        <button className="authButton btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
      </div>
            </div>
        </div>
    )
}
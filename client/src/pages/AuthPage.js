import React, {useContext, useState } from "react"
import {useHttp} from '../hooks/http.hooks'

export const AuthPage = () => {
    const {loading, error, request} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('data', data)
        } catch (e) {
            
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Links shortener app</h3>
                <div className="row">
                    <div className="card grey lighten-5">
                        <div className="card-content white-text">
                            <span className="card-title" style={{ color: "black" }}>Authentication</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        id="inputEmail"
                                        type="email"
                                        name="email"
                                        onChange={changeHandler}
                                        className="validate" />
                                    <label for="inputEmail">Email</label>
                                </div>

                                <div className="input-field">
                                    <input
                                        id="inputPassword"
                                        type="password"
                                        name="password"
                                        onChange={changeHandler}
                                        className="validate"/>
                                    <label for="inputPassword">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <input 
                                type="button" 
                                className="btn teal lighten-2" 
                                style={{ marginRight: 10 }} 
                                value="Login"
                                disabled={loading}/>
                            <input 
                                type="button" 
                                className="btn grey lighten-1 black-text" 
                                value="Register" 
                                onClick={registerHandler}
                                disabled={loading}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message])

    const changeHandler = event => {
        //console.log("changeHandler", event.target.name, event.target.value)
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
        } catch (e) {
            console.log(e.message)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            console.log(data)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e.message)
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
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={changeHandler}
                                        className="validate" />
                                    <label htmlFor="inputEmail">Email</label>
                                </div>

                                <div className="input-field">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={changeHandler}
                                        className="validate" />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <input
                                type="button"
                                className="btn teal lighten-2"
                                style={{ marginRight: 10 }}
                                value="Login"
                                disabled={loading}
                                onClick={loginHandler} />
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

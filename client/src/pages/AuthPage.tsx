import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { UserInfo } from "../domain/UserInfo"

export const AuthPage: React.FunctionComponent = () => {
    const auth = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState<UserInfo>(new UserInfo())

    useEffect( () =>{
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', { ...form })
        } catch (e) {
            console.log((e as Error).message)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            console.log(data)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log((e as Error).message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Links shortener app</h3>
                <div className="card grey lighten-5">
                    <div className="card-content white-text">
                        <div>
                        <span className="card-title" style={{ color: "black" }}>Welcome to the app</span>
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
                            className="btn"
                            style={{ marginRight: 10 }}
                            value="Login"
                            disabled={loading}
                            onClick={loginHandler} />
                        <input
                            type="button"
                            className="btn"
                            value="Register"
                            onClick={registerHandler}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

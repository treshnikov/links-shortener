import React from "react"

export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Links shortener app</h3>
                <div className="row">
                    <div className="card grey lighten-5">
                        <div className="card-content white-text">
                            <span className="card-title" style={{ color: "black" }}>Authentication</span>
                            <div>
                                <div class="input-field">
                                    <input
                                        placeholder="Your email address"
                                        id="inputEmail"
                                        type="text"
                                        name="inputEmail"
                                        class="email" />
                                    <label for="inputEmail">Email</label>
                                </div>

                                <div class="input-field">
                                    <input
                                        placeholder="Your password"
                                        id="inputPassword"
                                        type="password"
                                        name="inputPassword"
                                        class="password" />
                                    <label for="inputPassword">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <input type="button" className="btn teal lighten-2" style={{ marginRight: 10 }} value="Login" />
                            <input type="button" className="btn grey lighten-1 black-text" value="Register" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

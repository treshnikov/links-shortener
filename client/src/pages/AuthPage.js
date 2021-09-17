import React from "react"

export const AuthPage = () => {
    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Links shortener app</h1>
                <div className="row">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authentication</span>
                            <div>

                            </div>
                        </div>
                        <div className="card-action">
                            <input type="button" className="btn yellow darken-4" value="Login" />
                            <input type="button" className="btn grey lighten-1 black-text" value="Register"/>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
 
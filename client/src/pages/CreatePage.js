import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            await handleCreate()
        }
    }

    const handleCreate = async () =>{
        try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            history.push(`/detail/${data.link._id}`)
        } catch (e) { }

    }

    return (
        <>
            <div className="row">
                <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                    <div className="input-field">
                        <input
                            placeholder="Link"
                            id="link"
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                        <label htmlFor="link">Type your link here</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s8 offset-s2">
                    <input
                        type="button"
                        className="btn"
                        value="Create"
                        onClick={handleCreate}
                        disabled={loading}/>
                </div>
            </div>
        </>
    )
}

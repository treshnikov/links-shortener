import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const login = useCallback( (jwtToken: string, id: string) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}))
    }, [])

    const logout = useCallback(() => {
        setToken('')
        setUserId('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const storage = localStorage.getItem(storageName)
        if (!storage){
            return
        }
        const data = JSON.parse(storage)
        if (data && data.token){
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId}
}
import api from '../utils/api'

import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const history = useHistory()
    const {setFlashMessage} = useFlashMessage()
    
    useEffect(() => {
        const token = localStorage.getItem('token') 

        if (token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])


    async function register(user){

        let msgText = 'Registered successfully!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) =>{
                return response.data
            })
            
           await  authUser(data)
        } catch (error) {

             msgText = error.response.data.message
             msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }
    async function login(user){
        let msgText = 'Login successfully!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then((response) =>{
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        history.push('/')
    }

    function logout(){
        const msgText = 'Logout successfully!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/')

        setFlashMessage(msgText, msgType)
    }

    return {authenticated, register, logout, login}
} 
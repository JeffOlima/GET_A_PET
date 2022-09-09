import api from '../utils/api'

import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default function useAuth() {
    async function register(user){
        try {
            const data = await api.post('/users/register', user).then((responses) =>{
                return responses.data
            })
            console.log(data)
        } catch (error) {
            // error
        }
    }
    return {register}
} 
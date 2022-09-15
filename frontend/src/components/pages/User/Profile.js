import api from '../../../utils/api'

import {useState, useEffect} from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input' 

import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile(){
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
   
    useEffect(() =>{
        api
        .get('/users/checkuser', {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) =>{
            setUser(response.data)
        })
    }, [token])
   
    function onFileChange(e){
        setUser({ ...user,[e.target.name]: e.target.files[0]})
    }

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e){
        e.preventDefault()
     
        let msgType = 'success'
        
        const formData = new FormData()

         const userFormData = await Object.keys(user).forEach((key) => 
         formData.append(key, user[key]),
        )

        const data = await api
        .patch(`/users/edit/${user._id}`, formData,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return(
        <section>
          <div className={styles.profile_header}>
          <h1>Profile</h1>
          <p>Image preview</p>
          </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                text='image'
                type='file'
                name='file'
                handleOnChange={onFileChange}
                />
                <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder="Type your e-mail"
                handleOnChange={handleChange}
                value = {user.email || ''}
                />
                  <Input
                text='Name'
                type='name'
                name='name'
                placeholder="Type your name"
                handleOnChange={handleChange}
                value = {user.name || ''}
                />
                 <Input
                text='Phone'
                type='phone'
                name='phone'
                placeholder="Type your phone"
                handleOnChange={handleChange}
                value = {user.phone || ''}
                />
                 <Input
                text='Password'
                type='password'
                name='password'
                placeholder="Type your password"
                handleOnChange={handleChange}
                />
                 <Input
                text='Password confirmation'
                type='password'
                name='confirmpassword'
                placeholder="Confirm yuor password"
                handleOnChange={handleChange}
                />
                <input type="submit" value="Edit"/>
            </form>
        </section>
    )
}

export default Profile
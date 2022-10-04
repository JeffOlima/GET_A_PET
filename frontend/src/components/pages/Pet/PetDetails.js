import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './PetDetails.module.css'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){
    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() =>{
        api.get(`/pets/${id}`).then((response) =>{
            setPet(response.data.pet)
        })
    }, [id])
    
    return (
        <>
        {pet.name && (
            <section>
                <div>
                    <h1>Getting to know the pet: {pet.name}</h1>
                    <p>If you are interested, get in touch with the owner to visit it</p>
                </div>
                <div>
                    {pet.images.map((image, index) =>(
                       <img 
                       key={index}
                       src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                        alt={pet.name}
                       /> 
                    ))}
                </div>
                <p>
                    <span className='bold'>weight:</span>{pet.weight}Kg
                </p>
                <p>
                    <span className='bold'>Age:</span>{pet.age} years old
                </p>
                {token ? (
                    <button>Schedule a visit</button>
                 ) : (
                    <p>
                       You need <Link to="/register">Create a account</Link> to schedule a visit    
                    </p>
                )}
            </section>
        )}
        </>
    ) 
}

export default PetDetails

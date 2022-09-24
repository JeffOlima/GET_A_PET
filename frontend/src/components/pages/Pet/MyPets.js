import api from '../../../utils/api' 

import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets(){
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api
          .get('/pets/mypets', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setPets(response.data.pets)
          })
      }, [token])

    return(
        <section>
           <div>
           <h1>MyPets</h1>
           <Link to="/pet/add">Register a new Pet</Link>
           </div>
            <div>
            {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} >
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.action}>
                {pet.available ? (
                    <>
                    {pet.adopter && <button>Coclud adoption</button>}
                    <Link to={`/pet/edit/${pet._id}`}>Edit</Link>
                    <button>Delete</button>
                    </>
                ) : <p>Pet already adopted</p>}
              </div>
            </div>
                ))
                }
                {pets.length === 0 && <p>No Pets registered </p>}                
            </div>
        </section>
    )
}

export default MyPets
import api from '../../utils/api' 

import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.css' 

function Home(){
    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets').then((response) =>{
            setPets(response.data.pets)
            console.log(pets)
        })
    }, [])
    
    return(
        <section>
          <div>
          <h1>Adopt a pet</h1>
            <p>See the details of all of them and contatct their owner</p>
          </div>
          <div>
              {pets.length > 0 && pets.map((pet) =>(
                  <div>
                      <p>Imagem do Pet</p>
                      <h3>{pet.name}</h3>
                      <p>
                          <span className='bold'>Weight</span> {pet.weight}Kg
                      </p>
                      {pet.available ? (
                          <Link to={`pet/${pet._id}`}>More details</Link>
                       ) : (
                        <p>Adopted</p>
                        )} 
                  </div>
             ))}
              
              {pets.length === 0 &&(
                  <p>There are no available pets at the moment!</p>
              )}
          </div>
        </section>
    )
}

export default Home
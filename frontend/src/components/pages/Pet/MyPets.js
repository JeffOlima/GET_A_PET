import {useState, useContext} from 'react'

import { Link } from 'react-router-dom'

function MyPets(){
    const [pets, setPets] = useState([])

    return(
        <section>
           <div>
           <h1>MyPets</h1>
           <Link to="/pet/add">Register a new Pet</Link>
           </div>
            <div>
                {pets.lenght > 0 && <p>My registered Pets </p>}
                {pets.length === 0 && <p>No Pets registered </p>}
            </div>
        </section>
    )
}

export default MyPets
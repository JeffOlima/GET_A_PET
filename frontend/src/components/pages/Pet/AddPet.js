import ap from '../../../utils/api'

import styles from './AddPet.module.css'

import {useState} from 'react'
import {useHistory} from 'react-router-dom'

/* hooks */

function AddPet(){
    return(
        <section className={styles.addpet_header}>
            <div>
                <h1>Register a Pet</h1>
                <p>It will be available to adopt</p>
            </div>
            <p>Form</p>
        </section>
    )
}

export default AddPet
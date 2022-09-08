import Input from '../../form/Input'
import {Link} from 'react-router-dom'

import styles from '../../form/Form.module.css'

function Register(){

    function handleChange(e){}

    return(
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form>
                <Input
                text="Name"
                type="text"
                name="name"
                placeholder='Type your name'
                handleOnChange={handleChange}
                />
                <Input
                text="Phone"
                type="text"
                name="phone"
                placeholder='Type your phone'
                handleOnChange={handleChange}
                />
                <Input
                text="E-mail"
                type="email"
                name="email"
                placeholder='Type your e-mail'
                handleOnChange={handleChange}
                />
                <Input
                text="Password"
                type="password"
                name="password"
                placeholder='Type your password'
                handleOnChange={handleChange}
                />
                <Input
                text="Password confirmation"
                type="password"
                name="confirmpassword"
                placeholder='Type your password'
                handleOnChange={handleChange}
                />
                <input type="submit" value="Register"/>
            </form>
            <p>
                Are you alredy registered <Link to="/login">Click here.</Link>
            </p>
        </section>
    )
}

export default Register
import { useState } from "react"
import axios from "axios"

function IndextPage() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    //Permite hacer una copia de los datos de credenciales
    const handleChange = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    //Muestra por consola las credenciales
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(credentials);
        const response = await axios.post("api/auth/login", credentials)
        console.log(response)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="ejemplo@gmail.com" onChange={handleChange}></input>
                <input name="password" type="password" placeholder="password" onChange={handleChange}></input>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default IndextPage
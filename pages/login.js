import { useState } from "react"
import axios from "axios"
import Router from "next/router"
function IndextPage() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    //const router = useRouter

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
        if(response.status === 200){
            Router.push('/dashboard')
        }
        //console.log(response)
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
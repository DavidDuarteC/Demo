
import axios from 'axios'
function dashoboard(){
    const getProfile = async() =>{
        const reponse = await axios.get('/get/profile')
        console.log(response)
    }
    return (
        <diiv>
            <h1>Dashboard</h1>
            <button onClick={()=>getProfile()}>
                get profile
            </button>
        </diiv>
    )
}

export default dashoboard
import axios from 'axios'
import React, { useState } from "react";
import Router from 'next/router';
function Dashboard(){

    const[user, setUser] = useState({
        email:"",
        username:"",
    });
    //const router = useRouter;

    const getProfile = async() =>{
        const response = await axios.get('/api/profile');
        setUser(response.data);
    };

    const logout = async () => {
        try {
            const response = await axios.post('/api/auth/logout');
            Router.push("/login");
        } catch (error) {
            console.log(error);
            Router.push("/login");
        }
        
    }
    return (
        <diiv>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
            <button onClick={()=>getProfile()}>
                get profile
            </button>
            <button onClick={()=> logout()}>
                Logout
            </button>
        </diiv>
    )
}

export default Dashboard
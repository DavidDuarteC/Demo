import {verify} from "jsonwebtoken"
import {serialize} from 'cookie'
export default function logOutHandler(req,res){
    const {myTokenName} = req.cookies;

    if(!myTokenName){
        return res.status(401).json({error: 'no token'});
    }
    try {
        verify(myTokenName,'secret');
        const serialized = serialize("myTokenName", null, {
            httpOnly: true, // Si estamos en producción el navegador no va a mostrarlo
            secure: process.env.NODE_ENV === "production", // Esto comprueba si está en producción, significa que necesitamos SSL
            sameSite: "strict", // Significa que la cookie está dentro del mismo dominio, pero si estamos desde un servidor externo ponle none
            maxAge: 0, // Tiempo de expiración
            path: "/",
        });
        res.setHeader('Set-Cookie', serialized);
        res.status(200).json('logout exitoso');
    } catch (error) {
        return res.status(401).json({error: 'invalid token token'});
    }

}
import jwt from "jsonwebtoken";
import {serialize} from "cookie";
export default function loginHandler(req, res) {
    const { email, password } = req.body;

    if (email === "admin@local.local" && password === "admin") {
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //token valido por 30 días
                email: "amdin@local.local",
                username: "david",
            },
            "secret"
        );

        const serialized = serialize("myTokenName", token, {
            httpOnly: true, // Si estamos en producción el navegador no va a mostrarlo
            secure: process.env.NODE_ENV === "production", // Esto comprueba si está en producción, significa que necesitamos SSL
            sameSite: "strict", // Significa que la cookie está dentro del mismo dominio, pero si estamos desde un servidor externo ponle none
            maxAge: 1000 + 60 * 60 * 24 * 30, // Tiempo de expiración
            path: "/",
        });
        

        res.setHeader("Set-Cookie", serialized);
        return res.json("login exitoso");
    }

    return res.status(401).json({error: 'invalid email or password'})
}

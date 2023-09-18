import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
    //Se ejecuta antes de llegar a las paginas

    const jwt = request.cookies.get("myTokenName");
    console.log(jwt);
    if (jwt === undefined) {
        //Comprueba si el web token existe
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        //Comprueba de que el token sea valido
        const { payload } = await jwtVerify(
            jwt.value,
            new TextEncoder().encode("secret")
        );
        console.log("======Payload=====");
        console.log(payload);
        return NextResponse.next(); //Continuo con la pagina que estaba visitando
    } catch (error) {
        console.log("======Error=====");
        console.log(error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {//Proteccipon con esta ruta si se esta visitando y se puede con varias rutas
    matcher: ['/dashboard', '/', '/admin/:path*']
}
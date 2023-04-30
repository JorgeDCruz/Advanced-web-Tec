import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import excuteQuery from "../../database/db"

const authOptions: NextAuthOptions = {
    session:{
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            id: "credential-login",
            name: "IBM Account",
            type: "credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "johnDoe@test.com"},
                password: {label: "Password", type: "password"}
            },
            //La función autoriza el login se esta manera
            async authorize(credentials){
                //Obtenemos los datos que nos va a pasar la vista de signin.tsx
                const {email, password} = credentials as {email: string; password: string};
                //Realizamos la lógica del login, aquí va la consulta y comprobación de la DB

                const rows = await excuteQuery({
                    query: 'insert into user (userID, email, password) values(?, ?, ?)',
                    values: ['1234', email, password]
                })
                console.log(rows);
                if(email !== "A01634536@tec.mx" && password !== "1234"){
                    return null;
                }
                return {id: "1234", name: "jorge Cruz", email: "A01634536@tec.mx", redirect: "/"};
            }
        })
    ],
    callbacks: {
        //Este callback se ejecutará cuando un JWT se creao actualiza
        //Cuando se ejecuten las funciones para obtener datos de la sesión, está función se ejecutará
        jwt: ({token, user}) => {
            //Checamos que tengamos un usuario
            if(user){
                //El id del token será el id del usuario
                token.id = user.id;
            }
            return token;
        },
    },
    secret: "test",
}

export default NextAuth(authOptions);
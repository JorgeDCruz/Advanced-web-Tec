import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import excuteQuery from "../../database/db"
import helpers from "../../lib/helpers"
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
                
                //Checamos que exista el usuario
                const rows = await excuteQuery({
                    query: 'select * from user where email = ?',
                    values: [email]
                })
                let result = JSON.parse(JSON.stringify(rows));
                if(result.length == 0){
                    return null;
                }
                else{
                    console.log(result);
                    let obtainedPassword = result[0].password;
                    const match = await helpers.matchPassword(password, obtainedPassword);
                    //console.log("poass: ", match)
                    //const match = await helpers.matchPassword(password, result.)
                    if(!match){
                        return null;
                    }
                    return {id: result[0].userID, name: result[0].name, email: result[0].email}
                    //return {id: "1234", name: "jorge Cruz", email: "A01634536@tec.mx", redirect: "/"};
                }
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
    pages: {
        signIn: "/auth/signin"
    }
}

export default NextAuth(authOptions);
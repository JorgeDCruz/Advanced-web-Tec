import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session:{
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            //La función autoriza el login se esta manera
            authorize(credentials, req){
                //Obtenemos los datos que nos va a pasar la vista de signin.tsx
                const {email, password} = credentials as {email: string; password: string};
                //Realizamos la lógica del login, aquí va la consulta y comprobación de la DB
                if(email !== "A01634536@tec.mx" && password !== "1234"){
                    return null;
                }
                return {id: "1234", name: "jorge Cruz", email: "A01634536@tec.mx"};
            }
        })
    ]
}

export default NextAuth(authOptions);
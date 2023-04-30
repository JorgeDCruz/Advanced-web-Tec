import { sign } from "crypto";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    //Obtenemos la informacion del usuario
    const [userInfo, setUserInfo] = useState({email: ' ', password: ' '});

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        //Con esta función podemos validar que la información dada sea de cierto tipo, ej tenga "@tec" el email o que la contraseña sea de cierto tamaño
        e.preventDefault()

        //Especificamos que tipo de credenciales utilizaremos y los valores que le pasaremos
        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false
        });
        console.log(res);
    };

    return (
        <div className="sign-in-form">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input value={userInfo.email} onChange={({target}) => setUserInfo({ ...userInfo, email: target.value})} type="email" placeholder="email@gmail.com"></input>
                <input value={userInfo.password} onChange={({target}) => setUserInfo({ ...userInfo, password: target.value})} type="password" placeholder="********"></input>
                <input type="submit" value="login"></input>
            </form>
        </div>
    );
};

export default SignIn;
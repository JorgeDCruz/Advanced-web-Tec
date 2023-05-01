import { sign } from "crypto";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/router';
interface Props {}




const SignUp: NextPage = (props): JSX.Element => {
    const router = useRouter();


    return (
        <div className="sign-in-form">
            <form>
                <h1>Sign Up</h1>
                <input type="email" placeholder="email@gmail.com"></input>
                <input type="password" placeholder="********"></input>
                <input type="submit" value="login"></input>
                
            </form>
            <button onClick={() => {router.push("/auth/signin")}}>Sign Up</button>
        </div>
    );
};

export default SignUp;
import { sign } from "crypto";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/router';
import excuteQuery from "../database/db"

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
                <button onClick={() => {router.push("/")}}>Cancel</button>
            </form>
        </div>
    );
};

export default SignUp;
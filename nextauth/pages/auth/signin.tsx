import { sign } from "crypto";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/router';
import excuteQuery from "../database/db"

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      // validate your userinfo
      e.preventDefault();
  
      const res = await signIn("credential-login", {
        email: userInfo.email,
        password: userInfo.password,
        //redirect: false,
        callbackUrl: `${window.location.origin}/` 
      });
  
      console.log(res);
    };

    return (
        <div className="sign-in-form">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} type="email" placeholder="email@gmail.com"></input>
                <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder="********"></input>
                <input type="submit" value="login"></input>
                <button onClick={() => {router.push("/")}}>Cancel</button>
            </form>
        </div>
    );
};

export default SignIn;
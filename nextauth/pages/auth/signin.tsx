import { NextPage } from "next";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    return (
        <div className="sign-in-form">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="email@gmail.com"></input>
                <input type="password" placeholder="********"></input>
                <input type="submit" value="login"></input>
            </form>
        </div>
    );
};

export default SignIn;
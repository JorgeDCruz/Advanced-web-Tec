import { NextPage } from "next";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from "react";

const Protected: NextPage = (): JSX.Element => {

    const {status, data} = useSession();
    const router = useRouter();

    //Si el usuario no está autentificado se redirigirá a la página de signin
    useEffect(() => {
        if(status == "unauthenticated") router.replace("/auth/signin");
    }, [status]);
    if(status == "authenticated"){
        return (
            <div>You are seeing this page because you are authenticated!!</div>
        );
    }


    return (
        <div>
            Loading...
        </div>
    );
};
export default Protected;
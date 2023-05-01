import Image from 'next/image'
import { Inter } from 'next/font/google'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data:session, status} = useSession();
  console.log("session", session);
  const router = useRouter();

  useEffect(() => {
    if(status == "unauthenticated") router.replace("/auth/signin");
  }, [status]);


  if(status == "authenticated"){
    return (
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div>
        {session ? <button onClick={() => {signOut()}}>Log Out</button>: <button onClick={() => {router.push("/api/auth/signin")}}>Log In</button>}
      </div>
      <div>
        <button onClick={() => {router.push("/auth/signup")}}>Sign Up</button>
      </div>
      <div>
      <button onClick={() => {router.push("/protected")}}>Protected</button>
      </div>
    </main>
    );
  }

  return (
    <div>
      Loading...
    </div>
  )
}


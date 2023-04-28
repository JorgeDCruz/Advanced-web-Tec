import Image from 'next/image'
import { Inter } from 'next/font/google'
import { NextPage } from 'next'


const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () =>{
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <p>Hola</p>
        </main>
    )
}
// export default function Home() {

// }
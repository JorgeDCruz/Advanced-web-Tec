import excuteQuery from "../../database/db"
import helpers from "../../lib/helpers"
import { useRouter } from 'next/router';


async function signUp(email: string, password: string){
    
    const enPassword = await helpers.encryptPassword(password);
    console.log(enPassword)

    return 
}

export default signUp;
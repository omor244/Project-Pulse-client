import axios from "axios"


export const saveorupdateuser = async (userdata) => {


    const { data } = await axios.post('https://project-plus-liard.vercel.app/users', userdata)

    return data
}
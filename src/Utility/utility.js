import axios from "axios"


export const saveorupdateuser = async (userdata) => {


    const { data } = await axios.post('http://localhost:5000/users', userdata)

    return data
}
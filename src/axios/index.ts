import axios from "axios";
import { UserData } from '../store/modules'

const instanse = axios.create({
    baseURL: 'http://95.87.94.154:8888/api/',
    headers: {
        "Content-Type": 'application/json',
    }
})

export const authApi = {
    addNewUser(userData: UserData) {
        return instanse.post('user/registration/', userData)
    },
    login(userData: UserData) {
        return instanse.post('user/token/', userData)
    },
    getUserData(token: string) {
        const headers = { "Authorization": `Bearer ${token}` }
        return instanse.get('user/user_profile/profile/', { headers })
    }
}
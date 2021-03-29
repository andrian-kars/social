import * as axios from 'axios'
import { apiKey } from '../apiKey'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) { return instance.get(`users?page=${currentPage}&count=${pageSize}`) },
    deleteFollow(id) { return instance.delete(`follow/${id}`) },
    postFollow(id) { return instance.post(`follow/${id}`) },
}

export const profileAPI = {
    getProfile(userID) { return instance.get(`profile/${userID}`) },
    getStatus(userID) { return instance.get(`profile/status/${userID}`) },
    updateStatus(status) { return instance.put(`profile/status`, { status: status }) },
}

export const authAPI = {
    getAuth() { return instance.get(`auth/me`) },
    login(email, password, rememberMe = false) { return instance.post(`auth/login`, { email, password, rememberMe }) },
    logout() { return instance.delete(`auth/login`) },
}
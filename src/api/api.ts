import axios from 'axios'
import { apiKey } from '../apiKey'
import { ProfileType } from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) { return instance.get(`users?page=${currentPage}&count=${pageSize}/`) },
    deleteFollow(id: number) { return instance.delete(`follow/${id}/`) },
    postFollow(id: number) { return instance.post(`follow/${id}/`) },
}

export const profileAPI = {
    getProfile(userID: number) { return instance.get(`profile/${userID}/`) },
    getStatus(userID: number) { return instance.get(`profile/status/${userID}/`) },
    updateStatus(status: string) { return instance.put(`profile/status/`, { status: status }) },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile/`, profile)
    },
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

type GetAuthResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    getAuth() { return instance.get<GetAuthResponseType>(`auth/me/`).then(res => res.data) },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login/`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() { return instance.delete(`auth/login/`) },
}

export const securityAPI = {
    getCaptchaUrl() { 
        return instance.get(`security/get-captcha-url/`)
    },
}
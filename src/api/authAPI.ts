import { instance, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api"

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
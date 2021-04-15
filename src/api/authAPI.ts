import { instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api"

type GetAuthResponseDataType = { id: number, email: string, login: string }

type LoginResponseType = { userId: number }

export const authAPI = {
    getAuth() { return instance.get<APIResponseType<GetAuthResponseDataType>>(`auth/me/`).then(res => res.data) },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseType, ResultCodeForCaptchaEnum | ResultCodesEnum>>(`auth/login/`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() { return instance.delete(`auth/login/`).then(res => res.data) },
}
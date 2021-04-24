import { ResultCodesEnum, ResultCodeForCaptchaEnum } from './../api/api';
import { FormAction, stopSubmit } from "redux-form"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { authAPI } from '../api/authAPI';
import { securityAPI } from '../api/securityAPI';

const initialState = {
    userId: 0,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    isFetching: false
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/AUTH/SET_USER_DATA':
        case 'S/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

export const actions = {
    setAuthUserData: (userId: number, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'S/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'S/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const authData = await authAPI.getAuth()

    if (authData.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = authData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(0, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    dispatch(actions.getCaptchaUrlSuccess(captchaData.url))
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
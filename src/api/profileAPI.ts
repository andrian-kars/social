import { ProfileType } from "../types/types"
import { instance } from "./api"

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
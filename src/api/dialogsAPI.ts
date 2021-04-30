import { DialogType } from "../types/types"
import { instance, APIResponseType } from "./api"


// type LoginResponseType = { userId: number }

export const dialogsAPI = {
    getDialogs() { return instance.get<APIResponseType<Array<DialogType>>>(`dialogs`).then(res => res.data) },
    startDialog(useId: number) { return instance.put<APIResponseType>(`dialogs/${useId}`).then(res => res.data) },
}
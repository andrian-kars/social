import { DialogType, MessageType } from "../types/types"
import { instance, APIResponseType } from "./api"


// type LoginResponseType = { userId: number }

export const dialogsAPI = {
    getDialogs() { return instance.get<APIResponseType<Array<DialogType>>>(`dialogs`).then(res => res.data) },
    startDialog(useId: number) { return instance.put<APIResponseType>(`dialogs/${useId}`).then(res => res.data) },
    getMessages(useId: number) { return instance.get<APIResponseType<Array<MessageType>>>(`dialogs/${useId}/messages`).then(res => res.data) },
    sendMessage(useId: number, body: string) { return instance.post<APIResponseType>(`dialogs/${useId}/messages`, {body: body}).then(res => res.data) },
}
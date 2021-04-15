import { instance } from "./api"

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) { return instance.get(`users?page=${currentPage}&count=${pageSize}/`) },
    deleteFollow(id: number) { return instance.delete(`follow/${id}/`) },
    postFollow(id: number) { return instance.post(`follow/${id}/`) },
}
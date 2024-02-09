import { IUser, Users } from "../../module/Auth/model"
import { http } from "../http"

class DAl {
    login = async (body: IUser) => {
        return await http.post(`user/login`, body).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    getUser = async (token?: string) => {
        return await http.get(`user/getUser?token=${token}`).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    getAllUsers = async () => {
        return await http.get(`user/get/all`).then((res: any) => res.data)
            .catch(() => new Users())
    }
    logout = async (id: string) => {
        return await http.post(`user/logout?id=${id}`).then((res: any) => res.data)
            .catch((err: any) => err)
    }
}

export const UserActionDAL = new DAl()
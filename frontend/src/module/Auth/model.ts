export interface IUser {
    _id: string
    userName: string
    token: string
    imgURL: string
    userId: string
    createdAt: string
    updatedAt: string
    __v: number
}

export class Users {
    success: boolean
    result: IUser[]
    constructor() {
        this.success = false
        this.result = []
    }
}
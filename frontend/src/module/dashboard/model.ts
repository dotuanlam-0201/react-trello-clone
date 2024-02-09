
export interface ICard {
    title: string
    labels: string[]
    description: string
    comments: IComment[],
    cover: string
    _id: string
    createdAt: string
    updatedAt: string
    deadLine: string
}

export interface IComment {
    name: string,
    comment: string,
    avatar: string
}

export interface IListCard {
    _id: string
    title: string
    cards: ICard[]
    createdAt: string
    updatedAt: string
    __v: number
}

export class ListCard {
    success: boolean
    result: IListCard[]
    constructor() {
        this.success = false
        this.result = []
    }
}


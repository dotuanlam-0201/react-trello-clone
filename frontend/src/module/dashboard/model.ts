export interface ICard {
    title: string
    labels: string[]
    description: string
    comments: IComment[],
    cover: string
}

export interface IComment {
    name: string,
    comment: string,
    avatar: string
}

export interface IListCard {
    title: string
    cards: ICard[]
}

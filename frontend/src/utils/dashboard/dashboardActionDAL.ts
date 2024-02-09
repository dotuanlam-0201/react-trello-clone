import { ICard, IListCard, ListCard } from "../../module/dashboard/model"
import { http } from "../http"

class DAL {
    addCard = async (body: ICard, liscardId: string) => {
        return await http.post(`dashboard/${liscardId}/card/add`, body).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    addListCard = async (body: IListCard) => {
        return await http.post('dashboard/listCard/add', body).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    updateCard = async (body: ICard, liscardId: string) => {
        return http.post(`dashboard/${liscardId}/card/update`, body).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    getListCard = async (payload: { id: string }) => {
        return await http.post('dashboard/listCard/get/all', payload).then((res: any) => res.data)
            .catch(() => new ListCard())
    }
    deleteListCard = async (listCardId: string) => {
        return await http.post(`dashboard/listCard/${listCardId}/delete`).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    deleteCard = (cardId: string, listCardId: string) => {
        return http.post(`dashboard/${listCardId}/${cardId}/card/delete`).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    updateListCardByDragDrop = (listCard: IListCard[]) => {
        return http.post(`dashboard/listCard/update/byDragDrop`, listCard).then((res: any) => res.data)
            .catch((err: any) => err)
    }
    createBoard = (body: { listId: string, listCard: IListCard[], members: string[] }) => {
        return http.post(`dashboard/createBoard`, body).then((res: any) => res.data)
            .catch((err: any) => err)
    }
}

export const DashboardActionDAL = new DAL()
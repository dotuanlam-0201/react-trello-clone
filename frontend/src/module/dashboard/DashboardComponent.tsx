import { Active, DndContext, DragCancelEvent, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Col, Row, Skeleton, notification } from "antd"
import { find, findIndex, get, isEmpty, isNumber, map } from "lodash"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import update from "react-addons-update"
import { useGetDataFromLocal } from "../../hook/useGetDataFromLocal"
import { DashboardActionDAL } from "../../utils/dashboard/DashboardActionDAL"
import { IResponse } from "../../utils/http"
import Header from "../layout/Header"
import MainLayout from "../layout/MainLayout"
import ListCardComponent from "./ListCardComponent"
import ButtonAddListCard from "./components/ButtonAddListCard"
import { useAppSensors } from "./hooks/useAppSensors"
import { ICard, IListCard } from "./model"


const DashboardComponent = () => {
    const sensors = useAppSensors()
    const [listCardDnd, setListCardDnd] = useState([] as IListCard[])

    const queryListCard = useQuery({
        queryKey: ['listCard'],
        queryFn: () => DashboardActionDAL.getListCard({ id: useGetDataFromLocal('ID') }),
        placeholderData: keepPreviousData,
    })

    const updateListCard = async () => {
        const layload = map(listCardDnd, (list: IListCard, index: number) => {
            return { ...list, ...{ order: index + 1 } }
        })
        try {
            await DashboardActionDAL.updateListCardByDragDrop(layload)
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        if (queryListCard.data) {
            setListCardDnd(queryListCard.data.result)
        }
        return () => {
            setListCardDnd([])
        }
    }, [queryListCard.data])

    let items = map(listCardDnd, (list: IListCard) => list._id)

    const [active, setActive] = useState(undefined as undefined | Active)

    const onAddList = async (title: string, sl: Dispatch<SetStateAction<boolean>>) => {
        sl(true)
        const res: IResponse<IListCard> = await DashboardActionDAL.addListCard({
            title: title,
            cards: [],
        })
        if (res.success) {
            setTimeout(() => {
                queryListCard.refetch()
            }, 500);
            notification.success({
                message: 'Success'
            })
        } else {
            notification.error({
                message: 'Error'
            })
        }
        sl(false)
    }

    if (queryListCard.isFetching) {
        return <>
            <Header />
            <main id="dashboard">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </main>
        </>
    }

    const onDragStart = (e: DragStartEvent) => {
        if (e.active) {
            setActive(e.active)
        }
    }

    const moveListCard = (e: DragOverEvent) => {
        const { active, over } = e
        const indexActive = findIndex(listCardDnd, (list: IListCard) => list._id === active.id)
        const indexOver = findIndex(listCardDnd, (list: IListCard) => list._id === over?.id)
        const newList = update(listCardDnd, {
            $splice: [
                [indexActive, 1],
                [indexOver, 0, listCardDnd[indexActive]],
            ],
        })
        setListCardDnd(newList)
    }

    const moveCard = (e: DragOverEvent) => {
        const { active, over } = e
        if (active.id === over?.id || !active.id || !over?.id) return

        let indexContainerActive: undefined | number
        let indexContainerOver: undefined | number
        let indexCardActive: undefined | number
        let indexCardOver: undefined | number
        let isContainerOverEmpty = false

        listCardDnd.forEach((listCard: IListCard, indexList: number) => {
            if (listCard._id === over.id) {
                indexContainerOver = indexList
                isContainerOverEmpty = true
                indexCardOver = -1
            }
            if (isNumber(indexContainerActive) && isNumber(indexContainerOver) && isNumber(indexCardActive) && isNumber(indexCardOver)) {
                return
            }
            listCard.cards.forEach((card: ICard, indexCard: number) => {
                if (card._id === active.id) {
                    indexCardActive = indexCard
                    indexContainerActive = indexList
                }
                if (card._id === over.id) {
                    indexCardOver = indexCard
                    indexContainerOver = indexList
                }
            })
        })

        if (!isNumber(indexContainerActive) || !isNumber(indexContainerOver) || !isNumber(indexCardActive) || !isNumber(indexCardOver)) {
            return
        }

        if (isContainerOverEmpty) {
            const listRemoveActiveCard = update(listCardDnd, {
                [indexContainerActive]: {
                    cards: {
                        $splice: [
                            [indexCardActive, 1],
                        ],
                    }
                }
            })
            const listPushActiveCard = update(listRemoveActiveCard, {
                [indexContainerOver]: {
                    cards: {
                        $push: [listCardDnd[indexContainerActive].cards[indexCardActive]]
                    }
                }
            })
            setListCardDnd(listPushActiveCard)
            return
        }


        if (indexContainerActive === indexContainerOver) {
            const newList = update(listCardDnd, {
                [indexContainerActive]: {
                    cards: {
                        $splice: [
                            [indexCardActive, 1],
                            [indexCardOver, 0, listCardDnd[indexContainerActive].cards[indexCardActive]],
                        ],
                    }
                }
            })
            setListCardDnd(newList)
        } else {
            const listRemoveActiveCard = update(listCardDnd, {
                [indexContainerActive]: {
                    cards: {
                        $splice: [
                            [indexCardActive, 1],
                        ],
                    }
                }
            })
            const listPushActiveCard = update(listRemoveActiveCard, {
                [indexContainerOver]: {
                    cards: {
                        $unshift: [listCardDnd[indexContainerActive].cards[indexCardOver]]
                    }
                }
            })
            setListCardDnd(listPushActiveCard)
        }

    }

    const onDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (!over) return;

        if (get(active.data, 'current.sortable.containerId') === "ListCard" && get(over.data, 'current.sortable.containerId') === "ListCard") {
            moveListCard(e)
        } else {
            moveCard(e)
        }
        updateListCard()
        setActive(undefined)
    }


    const onDragOver = (e: DragOverEvent) => {
        const { active, over } = e
        if (!over) return;
        if (get(active.data, 'current.type') === "Column" && get(over.data, 'current.type') === "Column") {
            moveListCard(e)
        } else {
            moveCard(e)
        }
    }

    const renderOverlay = () => {
        const list = find(listCardDnd, (o: IListCard) => o._id === active?.id)
        if (list) {
            return <div style={{ transform: 'rotateZ(5deg)' }}>
                <ListCardComponent
                    list={list}
                    onRefresh={() => { }}
                />
            </div>
        }
    }

    const onDragCancel = (e: DragCancelEvent) => {
        setActive(undefined)
    }

    return (
        <MainLayout>

            {isEmpty(listCardDnd) && (
                <ButtonAddListCard onAddList={onAddList} />
            )}

            <DndContext
                onDragCancel={onDragCancel}
                collisionDetection={closestCorners}
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <SortableContext
                    id="ListCard"
                    strategy={horizontalListSortingStrategy}
                    items={items}>
                    <Row wrap={false} gutter={[20, 20]}>
                        {listCardDnd.map((list: IListCard) => {
                            return (
                                <Col
                                    key={list._id}
                                    xs={24}
                                    sm={24}
                                    md={10}
                                    lg={8}
                                    xl={6}
                                    xxl={6}
                                >
                                    <ListCardComponent
                                        active={active}
                                        onRefresh={queryListCard.refetch}
                                        list={list}
                                    />
                                </Col>
                            );
                        })}
                        {!isEmpty(listCardDnd) &&
                            <Col>
                                <ButtonAddListCard onAddList={onAddList} />
                            </Col>
                        }
                    </Row>
                </SortableContext>

                {
                    active && active?.data?.current?.type === "Column" &&
                    <DragOverlay>
                        {renderOverlay()}
                    </DragOverlay>
                }

            </DndContext>

        </MainLayout>
    );
}

export default DashboardComponent

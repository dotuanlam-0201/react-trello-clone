import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Active, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    Modal,
    Row,
    notification,
} from "antd";
import { find, map } from "lodash";
import { useState } from "react";
import { DashboardActionDAL } from "../../utils/dashboard/dashboardActionDAL";
import CardComponent from "./CardComponent";
import ModalCardInfo from "./ModalCardInfo";
import { ICard, IListCard } from "./model";

interface IProps {
    list: IListCard;
    onRefresh: () => void;
    active?: Active;

}
const ListCardComponent = (props: IProps) => {
    const [visibleAddCard, setVisibleAddCard] = useState(false as boolean);
    const [selectedCard, setSelectedCard] = useState(
        undefined as undefined | ICard
    );

    const items = map(props.list.cards, (card: ICard) => card._id)

    const onDeleteListCard = async () => {
        const res = await DashboardActionDAL.deleteListCard(props.list._id);
        if (res.success) {
            setTimeout(() => {
                props.onRefresh();
            }, 1000);
            notification.success({ message: "Success" });
        } else {
            notification.error({ message: "Error" });
        }
    };

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.list._id,
        data: {
            type: "Column",
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={{
                    ...style,
                    ...{
                        background: "gray",
                        opacity: 0.3,
                        width: "100%",
                        height: "85vh",
                        borderRadius: 12
                    },
                }}
            ></div>
        );

    }

    const renderOverlay = () => {
        const card = find(props.list.cards, (card: ICard) => card._id === props.active?.id)
        if (card) {
            return <CardComponent
                card={card}
                onShowCardInfo={() => { }}
            />
        }
    }


    return (
        <div ref={setNodeRef} style={style}>
            <Card
                style={{
                    maxHeight: '85vh',
                    overflowY: 'auto'
                }}
                headStyle={{
                    cursor: "move",
                }}
                size="small"
                bordered
                title={
                    <div {...attributes} {...listeners}>
                        <Row justify={"space-between"}>
                            <Col>{props.list.title}</Col>
                            <Col>
                                <Dropdown
                                    overlay={
                                        <Menu
                                            onClick={(e: any) => {
                                                if (e.key === "add") {
                                                    setVisibleAddCard(true);
                                                }
                                            }}
                                        >
                                            <Menu.Item key={"add"}>
                                                <Button size="small" type="link">
                                                    Add a card
                                                </Button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Button
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            title: (
                                                                <>
                                                                    Are you sure to delete list{" "}
                                                                    <b>{props.list.title}</b> ?
                                                                </>
                                                            ),
                                                            onOk: onDeleteListCard,
                                                        });
                                                    }}
                                                    danger
                                                    size="small"
                                                    type={"link"}
                                                >
                                                    Delete list
                                                </Button>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    placement="bottomRight"
                                >
                                    <Button size="small" type="link" icon={<MoreOutlined />} />
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                }
                id="dashboard-list-card"
            >
                <Row gutter={[20, 20]}>

                    <Col xs={24}>
                        <SortableContext
                            strategy={verticalListSortingStrategy}
                            items={items}>
                            <Row gutter={[10, 10]}>
                                {props.list.cards.map((card: ICard) => {
                                    return (
                                        <Col xs={24}>
                                            <CardComponent
                                                key={props.list._id}
                                                card={card}
                                                onShowCardInfo={(card: ICard) => {
                                                    setSelectedCard(card);
                                                    setVisibleAddCard(true);
                                                }}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </SortableContext>
                        {
                            props.active && props.active?.data?.current?.type === "Card" &&
                            <DragOverlay>
                                {renderOverlay()}
                            </DragOverlay>
                        }

                    </Col>

                    <Col xs={24}>
                        <Button
                            onClick={() => setVisibleAddCard(true)}
                            icon={<PlusOutlined />}
                            size="small"
                            type="link"
                        >
                            Add a card
                        </Button>
                    </Col>
                </Row>
            </Card>

            <ModalCardInfo
                listCardId={props.list._id}
                onRefresh={props.onRefresh}
                selectedCard={selectedCard}
                visible={visibleAddCard}
                onClose={() => {
                    setVisibleAddCard(false);
                    setSelectedCard(undefined);
                }}
            />
        </div>
    );
};

export default ListCardComponent;

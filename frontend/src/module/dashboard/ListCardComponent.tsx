import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    MenuProps,
    Modal,
    Row,
    Space
} from "antd";
import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { ICard, IListCard } from "./model";
import ModalCardInfo from "./ModalCardInfo";
import update from "react-addons-update";
import { findIndex } from "lodash";
import { v4 as uuidv4 } from 'uuid'

interface IProps {
    list: IListCard;
}

const ListCardComponent = (props: IProps) => {
    const [visibleAddCard, setVisibleAddCard] = useState(false as boolean)
    const [listCard, setListCard] = useState([] as ICard[])
    const [selectedCard, setSelectedCard] = useState(undefined as undefined | ICard)


    const onClickMenuDropdown: MenuProps['onClick'] = (e) => {
        if (e.key === 'add') {
            setVisibleAddCard(true)
        }
    };

    const onAddCard = (card: ICard) => {
        if (selectedCard) {
            const indexSelectedCard = findIndex(listCard, selectedCard)

            if (indexSelectedCard < 0) return

            const data = update(listCard, {
                [indexSelectedCard]: {
                    $set: card
                }
            })
            setListCard(data)
        } else {
            const data = update(listCard, {
                $push: [card]
            })
            setListCard(data)
        }
    }

    const onDeleteCard = (card: ICard, index: number) => {
        const data = update(listCard, {
            $splice: [[index, 1]]
        })
        setListCard(data)
    }


    return (
        <>
            <Card
                headStyle={{
                    cursor: "pointer",
                }}
                size="small"
                bordered
                title={
                    <Row justify={"space-between"}>
                        <Col>{props.list.title}</Col>
                        <Col>
                            <Dropdown dropdownRender={() => {
                                return <Menu onClick={onClickMenuDropdown} items={items} />
                            }} placement="bottomRight">
                                <Button size="small" type="link" icon={<MoreOutlined />} />
                            </Dropdown>
                        </Col>
                    </Row>
                }
                id="dashboard-list-card"
            >
                <Row gutter={[20, 20]}>
                    <Col xs={24}>
                        <Row gutter={[10, 10]}>
                            {
                                listCard.map((card: ICard, index: number) => {
                                    return <Col xs={24}>
                                        <CardComponent
                                            key={uuidv4()}
                                            index={index}
                                            onDeleteCard={(card: ICard) => onDeleteCard(card, index)}
                                            card={card}
                                            onShowCardInfo={(card: ICard) => {
                                                setSelectedCard(card)
                                                setVisibleAddCard(true)
                                            }}
                                        />
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>

                    <Col xs={24}>
                        <Button onClick={() => setVisibleAddCard(true)} icon={<PlusOutlined />} size="small" type="link">Add a card</Button>
                    </Col>

                </Row>
            </Card>

            <ModalCardInfo
                selectedCard={selectedCard}
                onSave={onAddCard}
                visible={visibleAddCard}
                onClose={() => {
                    setVisibleAddCard(false)
                    setSelectedCard(undefined)
                }}
            />
        </>
    );
};

export default ListCardComponent;

const items: MenuProps["items"] = [
    {
        key: "add",
        label: (
            <Button size="small" type="link">
                Add a card
            </Button>
        ),
    },
    {
        key: "delete",
        label: (
            <Button
                onClick={() => {
                    Modal.confirm({
                        title: "Are you sure to delete list?",
                        onOk: () => { },
                    });
                }}
                danger
                size="small"
                type={"link"}
            >
                Delete list
            </Button>
        ),
    },
];

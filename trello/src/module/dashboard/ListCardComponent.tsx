import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    MenuProps,
    Modal,
    Row
} from "antd";
import { useState } from "react";
import CardComponent from "./CardComponent";
import DrawerAddCard from "./DrawerAddCard";
import { IListCard } from "./model";

interface IProps {
    list: IListCard;
}

const ListCardComponent = (props: IProps) => {
    const [visibleAddCard, setVisibleAddCard] = useState(false as boolean)


    const onClickMenuDropdown: MenuProps['onClick'] = (e) => {
        if (e.key === 'add') {
            setVisibleAddCard(true)
        }
    };


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
                        <CardComponent />
                    </Col>
                    <Col xs={24}>
                        <CardComponent />
                    </Col>
                    <Col xs={24}>
                        <CardComponent />
                    </Col>
                    <Col xs={24}>
                        <CardComponent />
                    </Col>
                    <Col xs={24}>
                        <Button onClick={() => setVisibleAddCard(true)} icon={<PlusOutlined />} size="small" type="link">Add a card</Button>
                    </Col>
                </Row>
            </Card>

            <DrawerAddCard
                visible={visibleAddCard}
                onClose={() => setVisibleAddCard(false)}
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

import { FileTextOutlined, MoreOutlined, ProjectOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Dropdown, Menu, Modal, Row, Tooltip } from "antd";
import { isEmpty } from "lodash";
import { ICard } from "./model";
import { v4  as uuidv4} from "uuid"

interface IProps {
    onShowCardInfo: (card: ICard) => void;
    onDeleteCard: (card: ICard, index: number) => void;
    card: ICard;
    index: number
}

const CardComponent = (props: IProps) => {
    return (
        <Card
            cover={<div style={{ height: 30, background: props.card.cover || 'gray', textAlign: 'right' }}>
                <Dropdown dropdownRender={() => {
                    return <Menu  >
                        <Menu.Item>
                            <Button
                                onClick={() => {
                                    Modal.confirm({
                                        title: "Are you sure to delete this card?",
                                        onOk: () => props.onDeleteCard(props.card, props.index),
                                    });
                                }}
                                danger
                                size="small"
                                type={"link"}
                            >
                                Delete card
                            </Button>
                        </Menu.Item>
                    </Menu>
                }} placement="bottomRight">
                    <Button style={{ color: 'white' }} size="small" type="link" icon={<MoreOutlined />} />
                </Dropdown>
            </div>}
            bordered
            size="small"
        >
            <Row style={{
                cursor: 'pointer'
            }} onClick={() => props.onShowCardInfo(props.card)} gutter={[5, 5]}>
                <Col xs={24}>
                    {props.card.labels.map((label: string) => {
                        return <Label key={uuidv4()} color={label} />;
                    })}
                </Col>
                <Col xs={24}>{props.card.title}</Col>
                <Col xs={24}>
                    {props.card.description && (
                        <Tooltip title={"Description"}>
                            <ProjectOutlined />
                            <Divider type="vertical" />
                        </Tooltip>
                    )}
                    {
                        !isEmpty(props.card.comments) && <Tooltip title={"Comment"}>
                            <FileTextOutlined />
                        </Tooltip>
                    }
                </Col>
            </Row>
        </Card>
    );
};

export default CardComponent;

const Label = ({ color }: { color: string }) => {
    return (
        <div
            style={{
                height: 10,
                background: color,
                width: 50,
                borderRadius: "100px",
                marginRight: 5,
                display: "inline-block",
            }}
        ></div>
    );
};

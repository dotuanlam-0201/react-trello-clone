import {
    ClockCircleFilled,
    FileImageFilled,
    FileTextFilled,
    PlusOutlined,
    ProjectFilled,
    StarFilled,
    TagFilled,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Col,
    DatePicker,
    DatePickerProps,
    List,
    Modal,
    Popconfirm,
    Popover,
    Row,
    Space,
    message,
    notification,
} from "antd";
import { findIndex, isArray } from "lodash";
import { useEffect, useState } from "react";
import update from "react-addons-update";
import { MY_TRELLO_CONTANT } from "../../Contant";
import { DashboardActionDAL } from "../../utils/dashboard/DashboardActionDAL";
import { IResponse } from "../../utils/http";
import CustomEditor from "../share/CustomEditor";
import EditableTitleComponent from "./components/EditableTitleComponent";
import InputComment from "./components/InputComment";
import { ICard, IComment } from "./model";
import moment from 'moment'
import dayjs from "dayjs";

interface IProps {
    visible: boolean;
    onClose: () => void;
    selectedCard?: ICard;
    onRefresh: () => void;
    listCardId: string;
}

const ModalCardInfo = (props: IProps) => {
    const [card, setCard] = useState({
        title: "Title",
        description: "",
        labels: [],
        comments: [],
        cover: "",
    } as ICard);

    useEffect(() => {
        if (props.visible && props.selectedCard) {
            setCard(props.selectedCard);
        } else {
            setCard({
                title: "Title",
                description: "",
                labels: [],
                comments: [],
                cover: "",
            });
        }
    }, [props.visible]);

    const onChangeTitle = (e: string) => {
        const data: ICard = update(card, {
            title: {
                $set: e,
            },
        });
        setCard(data);
    };

    const onChangeLable = (label: string, indexLabel: number) => {
        if (indexLabel === -1) {
            const data: ICard = update(card, {
                labels: {
                    $push: [label],
                },
            });
            setCard(data);
        } else {
            const data: ICard = update(card, {
                labels: {
                    $splice: [[indexLabel, 1]],
                },
            });
            setCard(data);
        }
    };

    const onChangeDescription = (des?: string) => {
        const data: ICard = update(card, {
            description: {
                $set: des,
            },
        });
        setCard(data);
    };

    const onChangeComment = (cmt?: string) => {
        const data: ICard = update(card, {
            comments: {
                $push: [
                    {
                        name: "Lam",
                        comment: cmt,
                        avatar: "",
                    },
                ],
            },
        });
        setCard(data);
    };

    const onSave = async () => {
        if (!card.title) {
            notification.error({
                message: "Missing Title!",
            });
            return;
        }

        if (props.selectedCard) {
            const res: IResponse<ICard> = await DashboardActionDAL.updateCard(
                card,
                card._id
            );
            if (res.success) {
                setTimeout(() => {
                    props.onRefresh();
                }, 1000);
                notification.success({ message: "Success" });
            } else {
                notification.error({ message: "Error" });
            }
            props.onClose();
        } else {
            const res: IResponse<ICard> = await DashboardActionDAL.addCard(
                card,
                props.listCardId
            );
            if (res.success) {
                setTimeout(() => {
                    props.onRefresh();
                }, 1000);
                notification.success({ message: "Success" });
            } else {
                notification.error({ message: "Error" });
            }
            props.onClose();
        }
    };

    const onChangeCoverImg = (e: string) => {
        const data: ICard = update(card, {
            cover: {
                $set: e,
            },
        });
        setCard(data);
    };

    const onDeleteCard = async () => {
        const res: IResponse<{}> = await DashboardActionDAL.deleteCard(
            card._id,
            props.listCardId
        );
        if (res.success) {
            props.onClose();
            setTimeout(() => {
                props.onRefresh();
            }, 1000);
            message.success("Success");
        } else {
            message.error("Error");
        }
    };

    const onUpdateDeadline = (e: DatePickerProps['value']) => {
        const date = dayjs(e).format('DD-MM-YYYY HH:mm:ss')
        const data: ICard = update(card, {
            deadLine: {
                $set: date,
            },
        });
        setCard(data);
    }

    return (
        <Modal
            footer={
                <Row justify={"space-between"} style={{ padding: "0 1rem 1rem 1rem" }}>
                    <Col>
                        <Popconfirm
                            onConfirm={onDeleteCard}
                            title={
                                <span>
                                    Are you sure to delete <b>{card.title}</b> ?
                                </span>
                            }
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Col>
                    <Col>
                        <Space>
                            <Button onClick={props.onClose}>Cancle</Button>
                            <Button onClick={onSave} type="primary">
                                Save
                            </Button>
                        </Space>
                    </Col>
                </Row>
            }
            className="dashboard-modal__cardInfo"
            styles={{
                content: {
                    padding: 0,
                    borderRadius: 12,
                },
            }}
            width={1000}
            onCancel={props.onClose}
            open={props.visible}
        >
            <div
                style={{
                    height: 120,
                    background: card.cover || "gray",
                    borderRadius: "12px 12px 0 0",
                }}
            >
                <Popover
                    trigger={"click"}
                    title="Lable"
                    content={
                        <Row gutter={[10, 10]}>
                            {MY_TRELLO_CONTANT.coverCardColors.map((color: string) => {
                                return (
                                    <Col key={color}>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                onChangeCoverImg(color);
                                            }}
                                        >
                                            <Label color={color} />
                                        </span>
                                    </Col>
                                );
                            })}
                        </Row>
                    }
                >
                    <Button
                        style={{ color: "white" }}
                        icon={<FileImageFilled />}
                        type="link"
                    >
                        Cover
                    </Button>
                </Popover>
            </div>
            <div style={{ padding: "1rem" }}>
                <Row gutter={[10, 10]}>
                    <Col xs={24}>
                        <StarFilled />{" "}
                        <EditableTitleComponent
                            title={card.title}
                            onChange={onChangeTitle}
                        />
                    </Col>

                    <Col xs={24}>
                        <Space>
                            <span>
                                <ClockCircleFilled />  Deadline
                            </span>
                            <DatePicker defaultValue={props.selectedCard ? dayjs(props.selectedCard?.deadLine, 'DD-MM-YYYY HH:mm:ss') : undefined} onOk={onUpdateDeadline} showTime />
                        </Space>
                    </Col>

                    <Col>
                        <Space>
                            <span>
                                <TagFilled /> Label
                            </span>
                            <Row gutter={[5, 5]}>
                                {card.labels &&
                                    isArray(card.labels) &&
                                    card.labels.map((label: string) => {
                                        return (
                                            <Col key={label}>
                                                <Label color={label} />
                                            </Col>
                                        );
                                    })}
                                <Col>
                                    <Popover
                                        trigger={"click"}
                                        title="Lable"
                                        content={
                                            <Row gutter={[10, 10]}>
                                                {MY_TRELLO_CONTANT.labelCardColors.map(
                                                    (color: string) => {
                                                        const indexLabel = findIndex(
                                                            card.labels,
                                                            (lable: string) => lable === color
                                                        );
                                                        return (
                                                            <Col key={color}>
                                                                <span
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => {
                                                                        onChangeLable(color, indexLabel);
                                                                    }}
                                                                >
                                                                    <Label color={color} />
                                                                </span>
                                                            </Col>
                                                        );
                                                    }
                                                )}
                                            </Row>
                                        }
                                    >
                                        <Button icon={<PlusOutlined />} />
                                    </Popover>
                                </Col>
                            </Row>
                        </Space>
                    </Col>

                    <Col xs={24}>
                        <ProjectFilled /> Description
                        <CustomEditor
                            text={card.description}
                            onChange={onChangeDescription}
                        />
                    </Col>

                    <Col xs={24}>
                        <FileTextFilled /> Activity
                        <InputComment onChange={onChangeComment} />
                        <List
                            dataSource={card.comments}
                            renderItem={(item: IComment) => (
                                <List.Item>
                                    <List.Item.Meta
                                        className="dashboard-cardInfo_activity"
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<span>{item.name}</span>}
                                        description={
                                            <div style={{ fontSize: 10, lineHeight: 1.5 }}>
                                                {item.comment}
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default ModalCardInfo;

const Label = ({ color }: { color: string }) => {
    return (
        <div
            style={{ height: 32, width: 60, background: color, borderRadius: 13 }}
        />
    );
};

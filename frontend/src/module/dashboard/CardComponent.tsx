import { ClockCircleOutlined, FileTextOutlined, ProjectOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Col, Divider, Row, Tooltip } from "antd";
import { isEmpty } from "lodash";
import { ICard } from "./model";
import dayjs from "dayjs";
interface IProps {
    onShowCardInfo: (card: ICard) => void;
    card: ICard;
}

const CardComponent = (props: IProps) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.card._id,
        data: {
            type: "Card",
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
                        opacity: 0.1,
                        width: "100%",
                        height: "80px",
                        borderRadius: 12,
                    },
                }}
            ></div>
        );
    }


    return (
        <div ref={setNodeRef} style={style}>
            <Card
                hoverable
                cover={
                    <div
                        {...listeners}
                        {...attributes}
                        style={{
                            height: 30,
                            cursor: "move",
                            background: props.card.cover || "gray",
                            textAlign: "right",
                        }}
                    ></div>
                }
                bordered
                size="small"
            >
                <Row
                    onClick={() => props.onShowCardInfo(props.card)}
                    style={{
                        cursor: "pointer",
                    }}
                    gutter={[5, 5]}
                >
                    <Col xs={24}>
                        {props.card.labels.map((label: string) => {
                            return <Label key={label} color={label} />;
                        })}
                    </Col>
                    <Col style={{ textOverflow: "ellipsis", overflow: "hidden" }} xs={24}>
                        {props.card.title}
                    </Col>
                    <Col xs={24}>
                        {
                            props.card.deadLine && <Tooltip title={props.card.deadLine}>
                                <ClockCircleOutlined />
                                <Divider type="vertical" />
                            </Tooltip>
                        }
                        {props.card.description && (
                            <Tooltip title={"Description"}>
                                <ProjectOutlined />
                                <Divider type="vertical" />
                            </Tooltip>
                        )}
                        {!isEmpty(props.card.comments) && (
                            <Tooltip title={"Comment"}>
                                <FileTextOutlined />
                            </Tooltip>
                        )}
                    </Col>
                </Row>
            </Card>



        </div>
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

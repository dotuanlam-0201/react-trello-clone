import { FileImageFilled, FileImageOutlined, FileTextFilled, FileTextOutlined, PlusOutlined, ProjectFilled, ProjectOutlined, StarFilled, StarOutlined, TagFilled, TagOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, List, Modal, Popover, Row, Space } from 'antd'
import { find, isArray } from 'lodash'
import { useEffect, useState } from 'react'
import update from 'react-addons-update'
import { v4 as uuidv4 } from 'uuid'
import { MY_TRELLO_CONTANT } from '../../Contant'
import CustomEditor from '../share/CustomEditor'
import EditableTitleComponent from './components/EditableTitleComponent'
import InputComment from './components/InputComment'
import { ICard, IComment } from './model'

interface IProps {
    visible: boolean
    onClose: () => void
    onSave: (card: ICard) => void
    selectedCard?: ICard
}


const ModalCardInfo = (props: IProps) => {
    const [card, setCard] = useState({
        title: 'Title',
        description: '',
        labels: [],
        comments: [],
        cover: ''
    } as ICard)

    useEffect(() => {
        if (props.visible && props.selectedCard) {
            setCard(props.selectedCard)
        } else {
            setCard({
                title: 'Title',
                description: '',
                labels: [],
                comments: [],
                cover: ''
            })
        }
    }, [props.visible])


    const onChangeTitle = (e: string) => {
        const data: ICard = update(card, {
            title: {
                $set: e
            }
        })
        setCard(data)
    }

    const onChangeLable = (label: string) => {
        const data: ICard = update(card, {
            labels: {
                $push: [label]
            }
        })
        setCard(data)
    }

    const onChangeDescription = (des?: string) => {
        const data: ICard = update(card, {
            description: {
                $set: des
            }
        })
        setCard(data)
    }


    const onChangeComment = (cmt?: string) => {
        const data: ICard = update(card, {
            comments: {
                $push: [{
                    name: 'Lam',
                    comment: cmt,
                    avatar: ''
                }]
            }
        })
        setCard(data)
    }


    const onSave = () => {
        if (card.title) {
            props.onSave(card)
            props.onClose()
        }
    }

    const onChangeCoverImg = (e: string) => {
        const data: ICard = update(card, {
            cover: {
                $set: e
            }
        })
        setCard(data)
    }



    return (
        <Modal
            footer={<div style={{ padding: '0 1rem 1rem 0' }}>
                <Space>
                    <Button onClick={props.onClose}>Cancle</Button>
                    <Button onClick={onSave} type='primary'>Save</Button>
                </Space>
            </div>}
            className='dashboard-modal__cardInfo'
            styles={{
                content: {
                    padding: 0,
                    borderRadius: 24,
                },
            }}
            width={1000}
            onCancel={props.onClose} open={props.visible}>
            <div style={{ height: 120, background: card.cover || 'gray', borderRadius: '24px 24px 0 0' }} >
                <Popover trigger={'click'} title="Lable"
                    content={<Row gutter={[10, 10]}>
                        {
                            MY_TRELLO_CONTANT.coverCardColors.map((color: string) => {
                                return <Col key={uuidv4()} >
                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                        onChangeCoverImg(color)
                                    }}>
                                        <Label disabled={false} color={color} />
                                    </span>
                                </Col>
                            })}
                    </Row>}>
                    <Button style={{ color: 'white' }} icon={<FileImageFilled />} type='link'>Cover</Button>
                </Popover>
            </div>
            <div style={{ padding: '1rem' }}>

                <Row gutter={[10, 10]}>

                    <Col xs={24}>

                        <StarFilled /> <EditableTitleComponent title={card.title} onChange={onChangeTitle} />
                    </Col>
                    <Col>
                        <TagFilled /> Label
                        <Row gutter={[5, 5]}>
                            {
                                card.labels && isArray(card.labels) &&
                                card.labels.map((label: string) => {
                                    return <Col key={uuidv4()}>
                                        <Label disabled={false} color={label} />
                                    </Col>
                                })
                            }
                            <Col>
                                <Popover trigger={'click'} title="Lable"
                                    content={<Row gutter={[10, 10]}>
                                        {
                                            MY_TRELLO_CONTANT.labelCardColors.map((color: string) => {
                                                const isExist = find(card.labels, (lable: string) => lable === color) ? true : false
                                                return <Col key={uuidv4()} >
                                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                                        if (!isExist) {
                                                            onChangeLable(color)
                                                        }
                                                    }}>
                                                        <Label disabled={isExist} color={color} />
                                                    </span>
                                                </Col>
                                            })}
                                    </Row>}>
                                    <Button icon={<PlusOutlined />} />
                                </Popover>
                            </Col>
                        </Row>
                    </Col>


                    <Col xs={24}>
                        <ProjectFilled /> Description
                        <CustomEditor text={card.description} onChange={onChangeDescription} />
                    </Col>

                    <Col xs={24}>
                        <FileTextFilled />  Activity

                        <InputComment onChange={onChangeComment} />

                        <List
                            dataSource={card.comments}
                            renderItem={(item: IComment) => (
                                <List.Item
                                >
                                    <List.Item.Meta
                                        className='dashboard-cardInfo_activity'
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<span>{item.name}</span>}
                                        description={<div style={{ fontSize: 10, lineHeight: 1.5 }}>
                                            {item.comment}
                                        </div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>

                </Row>

            </div>
        </Modal>
    )
}

export default ModalCardInfo

const Label = ({ color, disabled }: { color: string, disabled: boolean }) => {
    return <div style={{ height: 32, width: 60, background: disabled ? 'gray' : color, borderRadius: 13 }} />
}


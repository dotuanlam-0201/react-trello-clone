import { FileTextOutlined, ProjectOutlined, StarOutlined, TagOutlined } from '@ant-design/icons'
import { Avatar, Col, List, Modal, Row } from 'antd'
import { MY_TRELLO_CONTANT } from '../../Contant'
import CustomEditor from '../share/CustomEditor'

interface IProps {
    visible: boolean
    onClose: () => void
}

const ModalCardInfo = (props: IProps) => {

    return (
        <Modal
            className='dashboard-modal__cardInfo'
            footer={[]}
            styles={{
                content: {
                    padding: 0,
                    borderRadius: 24,
                },
            }}
            width={1000}
            onCancel={props.onClose} open={props.visible}>
            <div style={{ height: 120, background: '#216e4e', borderRadius: '24px 24px 0 0' }} />
            <div style={{ padding: '1rem' }}>

                <Row gutter={[10, 10]}>

                    <Col xs={24}>
                        <StarOutlined /> Title
                    </Col>

                    <Col>
                        <TagOutlined /> Label
                        <Row gutter={[5, 5]}>
                            {
                                MY_TRELLO_CONTANT.labelCardColors.map((color: string) => {
                                    return <Col>
                                        <Label color={color} />
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>


                    <Col xs={24}>
                        <ProjectOutlined /> Description
                        <CustomEditor />
                    </Col>

                    <Col xs={24}>
                        <FileTextOutlined />  Activity
                        <List
                            dataSource={[{}]}
                            renderItem={(item) => (
                                <List.Item
                                >
                                    <List.Item.Meta
                                        className='dashboard-cardInfo_activity'
                                        avatar={<Avatar src={''} />}
                                        title={<span>name</span>}
                                        description={<div style={{ fontSize: 10, lineHeight: 1.5 }}>
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
                                            Ant Design, a design language for background applications, is refined by Ant UED Team
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

const Label = ({ color }: { color: string }) => {
    return <div style={{ height: 32, width: 60, background: color, borderRadius: 13 }} />
}

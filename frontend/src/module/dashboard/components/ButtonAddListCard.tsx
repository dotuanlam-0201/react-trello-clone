import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'

interface IProps {
    onAddList: (s: string,sl:Dispatch<SetStateAction<boolean>>) => void
}

const ButtonAddListCard = (props: IProps) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()

    return (
        <>
            <Button icon={<PlusOutlined />} onClick={() => {
                setVisible(true)
            }}>
                Add a List
            </Button>
            <Modal okButtonProps={{
                loading: loading
            }} closable onOk={() => {
                form.validateFields()
                    .then((res) => {
                        if (res.listTitle) {
                            props.onAddList(res.listTitle,setLoading)
                        }
                    })
            }} open={visible} onCancel={() => setVisible(false)}>
                <Form layout={'vertical'} form={form}>
                    <Form.Item label="List Title" required name={'listTitle'}>
                        <Input autoFocus placeholder='Enter' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ButtonAddListCard

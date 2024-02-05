import { Form, Input } from 'antd';

interface IProps {
    onChange: (e: string) => void
}

const InputComment = (props: IProps) => {
    const [form] = Form.useForm();

    return (
        <Form form={form}>
            <Form.Item style={{ margin: 0 }} name={'comment'}>
                <Input onPressEnter={(e: any) => {
                    props.onChange(e.target.value)
                    form.resetFields()
                }} style={{ marginTop: 8 }} placeholder='Comment' />
            </Form.Item>
        </Form>
    )
}

export default InputComment

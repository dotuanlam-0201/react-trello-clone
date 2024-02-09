import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';

interface IProps {
    onChange: (s: string) => void
    title: string
}

const EditableTitleComponent = (props: IProps) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(props.title)
    }, [props.title])


    return (
        <Paragraph editable={{
            onChange: (e: any) => {
                setTitle(e)
                props.onChange(e)
            },
        }} style={{ display: 'inline' }} >
            <span style={{ fontSize: 18 }}>{title}</span>
        </Paragraph>
    )
}

export default EditableTitleComponent

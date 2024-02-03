import { Drawer } from 'antd'

interface IProps {
    visible: boolean
    onClose: () => void
}

const DrawerAddCard = (props: IProps) => {
    return (
        <Drawer
            open={props.visible}
            title={'Add new card'}
            onClose={props.onClose}
            width={'100%'}
            style={{
                maxWidth: 900
            }}
        >
            asdf
        </Drawer>
    )
}

export default DrawerAddCard

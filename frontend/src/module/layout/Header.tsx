import { MoreOutlined } from "@ant-design/icons"
import { Button, Popover, Space } from "antd"
import { MY_TRELLO_CONTANT } from "../../Contant"

const Header = () => {
    return (
        <div id={'header'}>
            My Trello
            <Popover trigger={'click'} placement={'bottom'} content={<Space>
                {
                    MY_TRELLO_CONTANT.backgroundImgs.map((bg: string) => {
                        return <BackgroundSelection bg={bg} />
                    })
                }
            </Space>}>
                <Button style={{ color: 'white' }} size="small" type="link" icon={<MoreOutlined />}></Button>
            </Popover>
        </div>
    )
}

export default Header


const BackgroundSelection = ({ bg }: { bg: string }) => {
    return <div onClick={() => {
        document.body.style.backgroundImage = bg || 'gray'
        localStorage.setItem('clone-trello-bg', bg)
    }} style={{ backgroundImage: bg, height: 50, width: 40, borderRadius: 8, cursor: 'pointer' }} />
}

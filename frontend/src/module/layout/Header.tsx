import { LogoutOutlined, MoreOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Avatar, Button, Divider, Popover, Row, Space, Tooltip } from "antd"
import { useNavigate } from "react-router-dom"
import { MY_TRELLO_CONTANT } from "../../Contant"
import { useGetDataFromLocal } from "../../hook/useGetDataFromLocal"
import { UserActionDAL } from "../../utils/dashboard/UserActionDAL"
import { IResponse } from "../../utils/http"
import { IUser, Users } from "../Auth/model"

const Header = () => {
    const navigate = useNavigate()

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: UserActionDAL.getAllUsers
    })

    const users: IResponse<IUser[]> = usersQuery.data || new Users()

    const onLogout = async () => {
        const res: IResponse<IUser> = await UserActionDAL.logout(useGetDataFromLocal('ID'))
        if (res.success) {
            navigate({ pathname: '/login' })
            localStorage.setItem("TOKEN", '')
        }
    }

    return (
        <Row justify={'space-between'} id={'header'}>
            <div>
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
            <div>
                <Row align={"middle"}>
                    <Avatar.Group size={30} maxCount={5} >
                        {users.result.map((user: IUser) => {
                            return <Tooltip title={user.userName}>
                                <Avatar size={30} src={user.imgURL} />
                            </Tooltip>
                        })}
                    </Avatar.Group>
                    <Divider type="vertical" />
                    <Button onClick={onLogout} size="small" icon={<LogoutOutlined />} />
                </Row>
            </div>
        </Row>
    )
}

export default Header


const BackgroundSelection = ({ bg }: { bg: string }) => {
    return <div onClick={() => {
        document.body.style.backgroundImage = bg || 'gray'
        localStorage.setItem('clone-trello-bg', bg)
    }} style={{ backgroundImage: bg, height: 50, width: 40, borderRadius: 8, cursor: 'pointer' }} />
}

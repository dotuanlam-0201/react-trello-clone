import { GithubFilled, MailOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, notification } from "antd";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useGetDataFromLocal } from "../../hook/useGetDataFromLocal";
import { DashboardActionDAL } from "../../utils/dashboard/DashboardActionDAL";
import { UserActionDAL } from "../../utils/dashboard/UserActionDAL";
import { IResponse } from "../../utils/http";
import { IUser } from "./model";

const ggProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const LoginComponent = () => {
    const navigate = useNavigate()

    const queryUser = useQuery({
        queryKey: ['user'],
        queryFn: () => UserActionDAL.getUser(useGetDataFromLocal('TOKEN')),
    })

    const user: IResponse<IUser> | undefined = queryUser.data

    useEffect(() => {
        if (user && user.success && user.result) {
            navigate({ pathname: '/' })
        }
    }, [user])

    const onLoginGoogle = () => {
        signInWithPopup(auth, ggProvider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                const payload = {
                    userName: user.displayName,
                    token: token,
                    imgURL: user.photoURL,
                    userId: useGetDataFromLocal('ID'),
                } as IUser
                const resLogin: IResponse<IUser> = await UserActionDAL.login(payload)
                if (resLogin.success) {
                    localStorage.setItem('TOKEN', token || '')
                    localStorage.setItem('ID', resLogin.result._id)
                    const board = {
                        listId: resLogin.result._id,
                        listCard: [],
                        members: [resLogin.result._id]
                    }
                    await DashboardActionDAL.createBoard(board)
                    navigate({ pathname: '/' })
                }
            }).catch(() => {
                navigate({ pathname: '/login' })
                notification.error({ message: 'Some thing went wrong!' })
            });
    }

    const onLoginGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(async (result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                const payload = {
                    userName: user.displayName,
                    token: token,
                    imgURL: user.photoURL,
                    userId: useGetDataFromLocal('ID'),
                } as IUser
                const resLogin: IResponse<IUser> = await UserActionDAL.login(payload)
                if (resLogin.success) {
                    localStorage.setItem('TOKEN', token || '')
                    localStorage.setItem('ID', resLogin.result._id)
                    const board = {
                        listId: resLogin.result._id,
                        listCard: [],
                        members: [resLogin.result._id]
                    }
                    await DashboardActionDAL.createBoard(board)
                    navigate({ pathname: '/' })
                }
            }).catch(() => {
                navigate({ pathname: '/login' })
                notification.error({ message: 'Some thing went wrong!' })
            });
    }

    return (
        <Row justify={"center"} align={'middle'} style={{ minWidth: '100vw', minHeight: '100vh' }}>
            <Col xs={22} sm={16} md={14} lg={12} xl={6} xxl={4}>
                <Card>
                    <Row gutter={[20, 20]}>
                        <Col xs={24}>
                            <Card
                                onClick={onLoginGoogle}
                                style={{ cursor: 'pointer' }}
                            >
                                <Row justify={'space-between'}>
                                    <Col>
                                        Gmail <MailOutlined />
                                    </Col>
                                    <Col>
                                        <RightCircleOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24}>
                            <Card
                                onClick={onLoginGithub}
                                style={{ cursor: 'pointer' }}
                            >
                                <Row justify={'space-between'}>
                                    <Col>
                                        Github <GithubFilled />
                                    </Col>
                                    <Col>
                                        <RightCircleOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginComponent

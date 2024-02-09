import { GithubFilled, MailOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const ggProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const LoginComponent = () => {

    const onLoginGoogle = () => {
        signInWithPopup(auth, ggProvider)
            .then((result) => {
                console.log("🚀 ~ .then ~ result:", result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                console.log("🚀 ~ .then ~ token:", token)
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const onLoginGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                console.log("🚀 ~ .then ~ token:", token)

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log("🚀 ~ .then ~ error:", error)
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
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

import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundComponent = () => {
    return (
        <div id="not-found-page">
            <Result
                title={
                    <>
                        Not Found
                        <Divider />
                        <div>
                            <Link
                                to={{
                                    pathname: "/",
                                }}
                            >
                                <Button icon={<LeftOutlined />} type="primary">
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </>
                }
                status={"404"}
            />
        </div>
    );
};

export default NotFoundComponent;
import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider, Result } from "antd";
import { Link } from "react-router-dom";


const ErrorComponent = () => {
    return (
        <div id='error-page' >
            <Result title={<>
                Oop! Some thing went wrong!
                <Divider />
                <div>
                    <Link to={{
                        pathname: '/'
                    }}>
                        <Button icon={<LeftOutlined />} type='primary'>
                            Back
                        </Button>
                    </Link>
                </div>
            </>} status={'500'} />
        </div>
    )
}

export default ErrorComponent
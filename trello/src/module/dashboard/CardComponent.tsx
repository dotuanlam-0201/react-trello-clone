import { Card, Col, Row } from 'antd'

const CardComponent = () => {
    return (
        <Card cover={<div style={{ height: 30, background: '#216e4e' }}>

        </div>} bordered hoverable size='small'>
            <Row gutter={[5, 5]}>
                <Col xs={24}>
                    <div style={{ height: 10, background: '#216e4e', width: 50, borderRadius: '100px', marginRight: 5, display: "inline-block" }}></div>
                    <div style={{ height: 10, background: '#216e4e', width: 50, borderRadius: '100px', marginRight: 5, display: "inline-block" }}></div>
                    <div style={{ height: 10, background: '#216e4e', width: 50, borderRadius: '100px', marginRight: 5, display: "inline-block" }}></div>
                    <div style={{ height: 10, background: '#216e4e', width: 50, borderRadius: '100px', marginRight: 5, display: "inline-block" }}></div>
                </Col>
                <Col xs={24}>
                    Title 
                </Col>
                <Col xs={24}>
                    Description..........
                </Col>
            </Row>
        </Card>
    )
}

export default CardComponent

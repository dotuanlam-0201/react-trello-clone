import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Empty, Row } from "antd"
import { isEmpty } from "lodash"
import { useState } from "react"
import update from "react-addons-update"
import ListCardComponent from "./ListCardComponent"
import { IListCard } from "./model"
import Header from "../layout/Header"
import { v4 as uuidv4 } from 'uuid';

const DashboardComponent = () => {
    const [listCard, setListCard] = useState([] as IListCard[])

    const onAddList = () => {
        const newList = update(listCard, {
            $push: [{
                title: 'asdf',
                cards: []
            } as IListCard]
        })
        setListCard(newList)
    }

    return (
        <>
            <Header />
            <main id="dashboard">
                {isEmpty(listCard) && <Empty>
                    <Button icon={<PlusOutlined />} onClick={onAddList}>
                        Add a List
                    </Button>
                </Empty>}

                {!isEmpty(listCard) && <Row wrap={false} gutter={[20, 20]}>
                    {
                        listCard.map((list: IListCard) => {
                            return <Col key={uuidv4()} xs={24} sm={24} md={10} lg={8} xl={6} xxl={6}>
                                <ListCardComponent list={list} />
                            </Col>
                        })
                    }
                    <Col>
                        <Button icon={<PlusOutlined />} onClick={onAddList}>
                            Add a List
                        </Button>
                    </Col>
                </Row>}

            </main>
        </>
    )
}

export default DashboardComponent

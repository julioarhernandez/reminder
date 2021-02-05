import {
    Row,
    Col
} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import React from "react";

const CloseFakeModal = ({closeHandler}) => {

    return (
        <Row justify="end" align="top">
            <Col>
                <CloseOutlined onClick={closeHandler}/>
            </Col>
        </Row>
    );
};

export default CloseFakeModal;
import React, {useState, useRef, useEffect} from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber, Col, Row
} from 'antd';

import {InsertCategoryFormStyle} from "./insertCategoryForm_styles"

const InsertCategoryForm = ({categories, submitHandler, children}) => {

    const [formData, setFormData] = useState({Name:'', Category: '', Store: '', Date: '', Price: ''});
    const inputName = useRef();
    const inputPrice = useRef();

    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
    };

    const submitFormHandler = () => {
        submitHandler(formData);

        // TODO: after submitting clear the
        //  input name and date
    };


    return (
        <InsertCategoryFormStyle>
            {children}
            <Form
                labelCol={{
                    span: 12,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                size="large"
                onFinish={submitFormHandler}
            >
                <Form.Item
                    label="Category Name"
                    required
                    tooltip="This is a required field"
                    name="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Item Name!',
                        },
                    ]}
                >
                    <Input
                        ref={inputName}
                        onChange={(e) => handleChange(e.target.value, 'Name')}
                    />
                </Form.Item>


                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit">Insert Category</Button>
                </Form.Item>
            </Form>
        </InsertCategoryFormStyle>
    );
};

export default InsertCategoryForm;
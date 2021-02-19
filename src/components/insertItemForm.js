import React, {useState, useRef, useEffect} from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber, Col, Row
} from 'antd';

import {InsertForm} from "./insertItemForm_styles"

const InsertItemForm = ({categories, submitHandler, children, changeView}) => {

    const [formData, setFormData] = useState({Name:'', Category: '', Store: '', Date: '', Price: ''});
    const formSubmit = useRef();

    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
    };

    const addCategoryLink = () => {
        changeView('InsertCategory');
    };

    const submitFormHandler = () => {
        submitHandler(formData);
        // TODO: after submitting clear the
        //  input name and date
        formSubmit.current.resetFields();
    };


    return (
        <InsertForm>
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
                ref={formSubmit}
            >
                <Form.Item
                    label="Item Name"
                    required
                    tooltip="This is a required field"
                    name="Name"
                    value={formData.Name}
                    rules={[
                        {
                            required: true,
                            message: 'Please input Item Name!',
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => handleChange(e.target.value, 'Name')}
                    />
                </Form.Item>

                <Form.Item
                    label="Store"
                    tooltip="This is a required field"
                    name="Store">
                    <Input
                        onChange={(e) => handleChange(e.target.value, 'Store')}
                    />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="Category">
                    <Select
                        onChange={(value) => handleChange(value, 'Category')}
                    >
                        {categories && categories.map( (item,index)=>{
                           return (
                               <Select.Option
                                   key={`select-${index}`}
                                   value={item.id}>{item.category_name}</Select.Option>
                           )
                        })}
                    </Select>
                    <Button type="link" size="small" className="btn-no-padding" onClick={() => addCategoryLink()}>
                        Add category
                    </Button>
                </Form.Item>
                <Row gutter={10} className="mb-submit">
                    <Col span={12}>
                        <Form.Item
                            label="Date"
                            required
                            tooltip="This is a required field"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input start date of item!',
                                },
                            ]}
                            name="Date">
                            <DatePicker
                                format={"MM/DD/YYYY"}
                                onChange={(value, dateValue) => handleChange(dateValue, 'Date')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Price"
                            name="Price">
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={(value) => handleChange(value, 'Price')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit">Insert Item</Button>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default InsertItemForm;
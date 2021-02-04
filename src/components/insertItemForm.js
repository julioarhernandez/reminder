import React, {useState} from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';

import {InsertForm} from "./insertItemForm_styles"

const InsertItemForm = ({categories, submitHandler}) => {

    const [formData, setFormData] = useState({Name:'', Category: '', Store: '', Date: '', Price: ''});

    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
    };

    const submitFormHandler = () => {
        submitHandler(formData);
    };

    return (
        <InsertForm>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                size="large"
                onFinish={submitFormHandler}
            >
                <Form.Item
                    label="Item Name"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Item Name!',
                        },
                    ]}
                >
                    <Input
                        name="Name"
                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                    />
                </Form.Item>

                <Form.Item
                    label="Store"
                    tooltip="This is a required field"
                >
                    <Input
                        name="Store"
                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                    />
                </Form.Item>

                <Form.Item label="Category">
                    <Select
                        name="Category"
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
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        label="Date"
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                        required
                        tooltip="This is a required field"
                        rules={[
                            {
                                required: true,
                                message: 'Please input start date of item!',
                            },
                        ]}
                    >
                        <DatePicker
                            format={"MM/DD/YYYY"}
                            name="Date"
                            onChange={(value, dateValue) => handleChange(dateValue, 'Date')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <InputNumber
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            name="Price"
                            onChange={(value) => handleChange(value, 'Price')}
                        />
                    </Form.Item>
                </Form.Item>
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
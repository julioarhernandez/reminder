import React, {useState, useRef, useEffect} from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber
} from 'antd';

import {InsertForm} from "./insertItemForm_styles"

const InsertItemForm = ({categories, submitHandler, children}) => {

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
            >
                <Form.Item
                    label="Item Name"
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
                        name="Date"
                    >
                        <DatePicker
                            format={"MM/DD/YYYY"}
                            onChange={(value, dateValue) => handleChange(dateValue, 'Date')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="Price"
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <InputNumber
                            ref={inputPrice}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
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
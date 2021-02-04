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

    const [formData, setFormData] = useState({Name:'', Category: '', Date: '', Price: ''});

    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
        console.log(formData);
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
            >
                <Form.Item label="Item Name">
                    <Input
                        name="Name"
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
                    <Button type="primary">Insert Item</Button>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default InsertItemForm;
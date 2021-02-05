import React, {useState, useEffect} from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';
import moment from "moment";

import {InsertForm} from "./insertItemForm_styles"

const UpdateItemForm = ({data, categories, submitHandler }) => {

    const [formData, setFormData] = useState({Id: '',Name:'', Category: '', Store: '', Date: '', Price: ''});
    const [form] = Form.useForm();


    const handleChange = (value, element) => {
        console.log({...formData, [element]: value});
        setFormData({...formData, [element]: value});
        console.log(formData)
    };

    const submitFormHandler = () => {
        submitHandler(formData);
    };

    useEffect(() => {
        form.setFieldsValue({
            Name: data && data.name,
            Id: data && data.Id,
            Store: data && data.store,
            Category: data && data.categoryID,
            Date: data && moment(data.date),
            Price: data && data.price,
        });
        setFormData(data);
        console.log('effect here');
    }, [data]);

    return (
        <InsertForm>
            <Form
                form={form}
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
                <Input
                    name="Id"
                    type="hidden"
                    onChange={(e) => handleChange(e.target.value, 'Id')}
                />
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
                    name="Name">
                    <Input
                        onChange={(e) => handleChange(e.target.value, 'name')}
                    />
                </Form.Item>

                <Form.Item
                    label="Store"
                    tooltip="This is a required field"
                    name="Store"
                >
                    <Input
                        onChange={(e) => handleChange(e.target.value, 'store')}
                    />
                </Form.Item>

                <Form.Item
                    name="Category"
                    label="Category">
                    <Select

                        onChange={(value) => handleChange(value, 'categoryID')}
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
                            onChange={(value, dateValue) => handleChange(dateValue, 'date')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="Price"
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <InputNumber
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(value) => handleChange(value, 'price')}
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit">Update Item</Button>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default UpdateItemForm;
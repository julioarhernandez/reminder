import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';

import {InsertForm} from "./insertItemForm_styles"

const InsertItemForm = ({categories}) => {
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
                    <Input/>
                </Form.Item>

                <Form.Item label="Category">
                    <Select>
                        {categories && categories.map( (item,index)=>{
                           return (
                               <Select.Option value={item.ID}>{item.category_name}</Select.Option>
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
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <InputNumber
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
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
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

const InsertItemForm = () => {
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
                <Form.Item label="Input">
                    <Input/>
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Switch">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default InsertItemForm;
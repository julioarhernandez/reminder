import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {
    Form,
    Input,
    Button,
    Popconfirm,
} from 'antd';

import {InsertForm} from "./insertItemForm_styles"

const UpdateCategoryForm = ({data, categories, submitHandler, deleteHandler, children }) => {

    const [formData, setFormData] = useState({Id: '',category_name:''});
    const [form] = Form.useForm();

    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
        console.log(formData)
    };

    function confirm() {
        deleteHandler(formData.id);
    }

    const submitFormHandler = () => {
        console.log('data submitted for update is',formData);
        submitHandler(formData);
    };

    useEffect(() => {
        form.setFieldsValue({
            Id: data && data.id,
            Category: data && data.category_name
        });
        setFormData(data);

        //TODO: Update button should be disabled
        // avoid send not changed data to update

        console.log('effect here', data);
    }, [data]);

    return (
        <InsertForm>
            {children}
            <Form
                form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                size="large"
                onFinish={submitFormHandler}
            >
                <Input
                    name="Id"
                    type="hidden"
                    onChange={(e) => handleChange(e.target.value, 'id')}
                />
                <Form.Item
                    label="Category Name"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Category Name!',
                        },
                    ]}
                    name="Category">
                    <Input
                        onChange={(e) => handleChange(e.target.value, 'category_name')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >Update Item</Button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#" style={{marginLeft: '10px'}} className="ant-btn ant-btn-lg ant-btn-dangerous">Delete Category</a>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default UpdateCategoryForm;
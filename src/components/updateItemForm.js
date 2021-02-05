import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Switch,
    Row,
    Col
} from 'antd';
import moment from "moment";
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';

import {InsertForm} from "./insertItemForm_styles"

const UpdateItemForm = ({data, categories, submitHandler, deleteHandler, children }) => {

    const [formData, setFormData] = useState({Id: '',Name:'', Category: '', Store: '', Date: '', Price: '', Active: false});
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [form] = Form.useForm();


    const handleChange = (value, element) => {
        setFormData({...formData, [element]: value});
        console.log(formData)
        setEnableSubmit(true);
    };

    const deleteFormHandler = () => {
        deleteHandler(formData.id);
    }

    const submitFormHandler = () => {
        console.log('data submitted for update is',formData);
        submitHandler(formData);
    };

    useEffect(() => {
        form.setFieldsValue({
            Name: data && data.name,
            Id: data && data.Id,
            Store: data && data.store,
            Category: data && data.categoryID,
            Date: data && moment(data.date),
            endingDate: (data && data.endingDate) && moment(data.endingDate),
            Price: data && data.price,
            Active: true
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
                    onChange={(e) => handleChange(e.target.value, 'Id')}
                />
                <Row gutter={10} className="mb-submit">
                    <Col span={12}>
                <Form.Item
                    label="Status"
                    name="Active">
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        onChange={(checked) => handleChange(checked, 'active')}
                        checked={formData && formData.active}
                    />
                </Form.Item>
                    </Col>
                        <Col span={12} className={classNames({hidden: formData && formData.active})}>
                            <Form.Item
                                label="Ending Date"
                                // style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                required
                                tooltip="This is a required field"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input end of date of item!',
                                    },
                                ]}
                                name="endingDate">
                                <DatePicker
                                    disabled={formData && formData.active}
                                    format={"MM/DD/YYYY"}
                                    onChange={(value, dateValue) => handleChange(dateValue, 'endingDate')}/>
                            </Form.Item>
                        </Col>
                </Row>

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
                <Row gutter={10} className="mb-submit">
                    <Col span={12}>
                        <Form.Item
                            label="Date"
                            // style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
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
                                onChange={(value, dateValue) => handleChange(dateValue, 'date')} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Price"
                            name="Price"
                            // style={{display: 'inline-block', width: 'calc(50% - 8px)'}}>
                            >
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={(value) => handleChange(value, 'price')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >Update Item</Button>
                    <Button
                        danger
                        onClick={deleteFormHandler}
                        style={{marginLeft: '10px'}}>Delete Item</Button>
                </Form.Item>
            </Form>
        </InsertForm>
    );
};

export default UpdateItemForm;
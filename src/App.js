import React, { useState, useEffect} from 'react';
import {Layout, Button, Tabs, message, Input} from 'antd';
import moment from "moment";
import classNames from "classnames";

import {AppButtonAdd} from "./App_styles";

import './App.css';
import {DataStore, SortDirection} from '@aws-amplify/datastore';

import {Reminder, Category} from './models';
import ItemList from "./components/itemList";
import InsertItemForm from "./components/insertItemForm";
import UpdateItemForm from "./components/updateItemForm";
import CloseFakeModal from "./components/closeFakeModal";
import {InsertForm} from "./components/insertItemForm_styles";

const {Header, Content} = Layout;

function App() {

    const [data, setData] = useState();
    const [dataArchived, setDataArchived] = useState();
    const [activeTab,setActiveTab] = useState('1');
    const [categories, setCategories] = useState();
    const [edit, setEdit] = useState();
    const [uiView, setUiView] = useState('home');
    const {TabPane} = Tabs;

    useEffect(() => {
        readData();
        readDataCat();
        readDataArchived();
    }, []);

    const {Search} = Input;

    function tabChanged(key) {
        console.log(key);
        setActiveTab(key);
    }

    const onSearch = value => {
        readDataFiltered(value);
        readDataArchivedFiltered(value);
    };

    function formInsertHandler(formData){
        saveData(formData).then(()=>{
            console.log('data saved successfully', formData);
            readData();
            message.success('New Item Created');
            // Reset insert input fields
        });
    }

    function closeHandler (){
        setUiView('home');
    }

    function editHandler(formData) {
        setEdit(formData);
        setUiView('Update');
    }

    function deleteHandler(id) {
        eraseData(id).then(() => {
            readData();
            readDataArchived();
            setUiView('home');
            message.success('Item Deleted');
        });
    }

    function editSubmitHandler(formData) {
        updateData(formData).then(() => {
            readData();
            readDataArchived();
            message.success('Item Updated');
            setUiView('home');
        });
    }

    async function readData() {
        const models = await DataStore.query(Reminder, c =>
                c.active("eq", true), {
                sort: s => s.date(SortDirection.ASCENDING)
            }
        );
        setData(models);
    }

    async function readDataFiltered(searchQuery) {
        const models = await DataStore.query(Reminder, c =>
                c.active("eq", true).name("contains", searchQuery), {
                sort: s => s.date(SortDirection.ASCENDING)
            }
        );
        setData(models);
    }

    async function readDataArchived() {
        const models = await DataStore.query(Reminder, c =>
                c.active("eq", false), {
                sort: s => s.date(SortDirection.ASCENDING)
            }
        );
        setDataArchived(models);
    }

    async function readDataArchivedFiltered(searchQuery) {
        const models = await DataStore.query(Reminder, c =>
                c.active("eq", false).name("contains", searchQuery), {
                sort: s => s.date(SortDirection.ASCENDING)
            }
        );
        setDataArchived(models);
    }

    async function updateData(data) {
        console.log('update data', moment(data.date).format( "YYYY-MM-DD"));
        const original = await DataStore.query(Reminder, data.id);
        await DataStore.save(
            Reminder.copyOf(original, updated => {
                updated.name = data.name;
                updated.store = data.store;
                updated.date = moment(data.date).format( "YYYY-MM-DD").toString();
                updated.endingDate = data.active ? null : moment(data.endingDate).format("YYYY-MM-DD").toString();
                updated.price = data.price;
                updated.active = data.active;
                updated.categoryID = data.categoryID;
            })
        );
    }

    async function saveData(data) {
        console.log('saving data');
        await DataStore.save(
            new Reminder({
                "name": data.Name,
                "date": moment(data.Date).format("YYYY-MM-DD"),
                "price": data.Price || 0,
                "store": data.Store,
                "active":  true,
                "categoryID": data.Category
            })
        );
    }

    async function eraseData(data) {
        const modelToDelete = await DataStore.query(Reminder, data);
        DataStore.delete(modelToDelete);
    }

    async function saveCategory() {
        console.log('saving data category');
        await DataStore.save(
            new Category({
                "category_name": "Goods",
                "Reminders": []
            })
        );
    }

    async function readDataCat() {
        const models2 = await DataStore.query(Category);
        setCategories(models2);
    }

  return (
    <div className={classNames('App', {
            activeBackground: activeTab === '1'
        })}>
        <Layout >
            <Header>
                <Search placeholder="input search text" onSearch={onSearch} enterButton allowClear/>
                {/*<Button onClick={() => saveCategory()}>SaveCate</Button>*/}
            </Header>
            <Content>
                <div className={classNames('fake-modal animate__animated animate__faster',{
                    animate__slideInDown: uiView === 'Insert',
                    animate__fadeOutDown: uiView !== 'Insert',
                    hide: uiView !== 'Insert',
                })}>
                    <InsertItemForm
                        categories={categories}
                        submitHandler={formInsertHandler}>
                        <CloseFakeModal
                            closeHandler={closeHandler}/>
                    </InsertItemForm>
                </div>
                <div className={classNames('fake-modal animate__animated animate__faster', {
                    animate__slideInDown: uiView === 'Update',
                    animate__fadeOutDown: uiView !== 'Update',
                    hide: uiView !== 'Update',
                })}>
                    <UpdateItemForm
                        data={edit}
                        categories={categories}
                        submitHandler={editSubmitHandler}
                        deleteHandler={deleteHandler}>
                        <CloseFakeModal
                            closeHandler={closeHandler}/>
                    </UpdateItemForm>

                </div>
                <Tabs defaultActiveKey="1" onChange={tabChanged}>
                    <TabPane tab="Active" key="1">
                        <ItemList
                            editHandler={editHandler}
                            items={data}
                            categories={categories}/>
                    </TabPane>
                    <TabPane tab="Ended" key="2">
                        <ItemList
                            editHandler={editHandler}
                            items={dataArchived}
                            categories={categories}/>
                    </TabPane>
                </Tabs>

            </Content>
            <AppButtonAdd
                className="ant-btn-primary"
                onClick={() => setUiView('Insert')}
            />
        </Layout>
    </div>
  );
}

export default App;

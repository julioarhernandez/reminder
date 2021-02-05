import React, { useState, useEffect} from 'react';
import {Layout, Button} from 'antd';
import moment from "moment";

import {AppButtonAdd} from "./App_styles";

import './App.css';
import {DataStore, SortDirection} from '@aws-amplify/datastore';

import {Reminder, Category} from './models';
import ItemList from "./components/itemList";
// import InsertItemForm from "./components/insertItemForm";
import UpdateItemForm from "./components/updateItemForm";

const {Header, Content} = Layout;

function App() {

    const [data, setData] = useState();
    const [categories, setCategories] = useState();
    const [edit, setEdit] = useState();

    useEffect(() => {
        readData();
        readDataCat();

    }, []);

    // function formInsertHandler(formData){
    //     saveData(formData).then(()=>{
    //         console.log('data saved successfully', formData);
    //         readData();
    //     });
    // }

    function editHandler(formData) {
        setEdit(formData);
    }

    function deleteHandler(id) {
        eraseData(id).then(() => {
            readData();
        });
    }

    function editSubmitHandler(formData) {
        updateData(formData).then(() => {
            readData();
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

    async function updateData(data) {
        console.log('update data');
        const original = await DataStore.query(Reminder, data.id);
        await DataStore.save(
            Reminder.copyOf(original, updated => {
                updated.name = data.name;
                updated.store = data.store;
                updated.date = data.date;
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
                "price": data.Price,
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
    <div className="App">
        <Layout>
            <Header>
                <Button type="primary" size="large" onClick={() => saveData()}>Save</Button>
                <button onClick={() => saveCategory()}>SaveCate</button>
                <button onClick={() => readData()}>read</button>
                <button onClick={() => readDataCat()}>readCate</button>
            </Header>
            <Content>
                {/*<InsertItemForm*/}
                {/*    categories={categories}*/}
                {/*    submitHandler={formInsertHandler}*/}
                {/*/>*/}
                <UpdateItemForm
                    data={edit}
                    categories={categories}
                    submitHandler={editSubmitHandler}
                    deleteHandler={deleteHandler}
                />
                <ItemList
                    editHandler={editHandler}
                    items={data}/>
            </Content>
            <AppButtonAdd/>
        </Layout>
    </div>
  );
}

export default App;

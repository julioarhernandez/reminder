import React, { useState, useEffect} from 'react';
import {Layout} from 'antd';
import {Button} from 'antd';
import moment from "moment";
import {AppButtonAdd} from "./App_styles";

import './App.css';
import {DataStore} from '@aws-amplify/datastore';

import {Reminder, Category} from './models';
import ItemList from "./components/itemList";
import InsertItemForm from "./components/insertItemForm";

const {Header, Content} = Layout;

function App() {

    const [data, setData] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        readData();
        readDataCat();

    }, []);

    function formInsertHandler(formData){
        console.log('from here',formData);
        saveData({...formData, Date: moment(formData.Date).format("YYYY-MM-DD")});
        // saveData(formData);
    }

    async function saveData(data) {
        console.log('saving data');
        await DataStore.save(
            new Reminder({
                "name": data.Name,
                "date": moment(data.Date).format("YYYY-MM-DD"),
                "price": data.Price,
                "store": data.Store,
                "categoryID": data.Category
            })
        );
    }

    async function saveCategory() {
        console.log('saving data');
        await DataStore.save(
            new Category({
                "category_name": "Food",
                "Reminders": []
            })
        );
    }

    async function readData() {
        const models = await DataStore.query(Reminder);
        setData(models);
        console.log(models);
    }

    async function readDataCat() {
        const models2 = await DataStore.query(Category);
        setCategories(models2);
        console.log(models2);
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
                <InsertItemForm
                    categories={categories}
                    submitHandler={formInsertHandler}
                />
                <ItemList items={data}/>
            </Content>
            <AppButtonAdd/>
        </Layout>






    </div>
  );
}

export default App;

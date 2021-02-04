import React, { useState } from 'react';
import {Layout} from 'antd';
import {Button} from 'antd';
import {AppButtonAdd} from "./App_styles";

import './App.css';
import {DataStore} from '@aws-amplify/datastore';

import {Reminder, Category} from './models';
import ItemList from "./components/itemList";
import InsertItemForm from "./components/insertItemForm";

const {Header, Content} = Layout;

function App() {
    const [data, setData] = useState();

    async function saveData() {
        console.log('saving data');
        await DataStore.save(
            new Reminder({
                "name": "Lorem ipsum dolor sit amet",
                "date": "1970-01-01Z",
                "store": "Lorem ipsum dolor sit amet",
                "categoryID": "d5ee6b1e-211e-45cb-8dd5-53b398f3b383"
            })
        );
    }

    async function saveCategory() {
        console.log('saving data');
        await DataStore.save(
            new Category({
                "category_name": "Lorem ipsum dolor sit amet",
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
        setData(models2);
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
                <InsertItemForm/>
                {data && data.map((el, i) => {
                    return (
                        <p>
                            <span>{el.category_name}</span> ->
                            <span>{el.id}</span> ->
                            <span>{el.categoryID}</span>
                        </p>
                    )
                })}
                <ItemList/></Content>
            <AppButtonAdd/>
        </Layout>






    </div>
  );
}

export default App;

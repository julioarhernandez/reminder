import React from 'react';
// import PropTypes from 'prop-types';
import {List, Avatar, Skeleton} from 'antd';
import {ItemListStyled} from './itemList_styles';
import moment from "moment";
import {
    CalendarTwoTone
} from '@ant-design/icons';


const ItemList = ({items, editHandler, categories}) => {

    const findCategory = (catId) => {
        const catIdFound = categories.find(v => v.id === catId);
        if (catIdFound){
            return catIdFound.category_name;
        }
    };

    const compareDateResult = (itemDate, itemEndingDate) => {
        console.log('itemending', itemEndingDate);
        if (itemEndingDate) {
            return moment(itemEndingDate).diff(itemDate, "days");

        } else {
            return moment().diff(itemDate, "days");
        }

    };

    const getFirstLetterOf = (string) => {
        return string[0];
    };

    const showCatLetter = (itemCategoryId) => {
        const catName = findCategory(itemCategoryId);
        if (catName){
            return getFirstLetterOf(catName);
        }
        return '?';
    };

    const itemClickHandler = (item) => {
        editHandler(item);
    };
     return (
        <ItemListStyled>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={items}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit" onClick={(e) => itemClickHandler(item)}>Edit</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar style={{backgroundColor: 'rgba(0, 22, 41, 0.5)'}}>{showCatLetter(item.categoryID)}</Avatar>
                                }
                                title={<div>{item.name} {item.price !== 0 && <strong>(${item.price})</strong>} <span>{item.store}</span></div>}
                                description={<div><CalendarTwoTone/> {compareDateResult(item.date, item.endingDate)} Days - {moment(item.date).format("MM/DD/YYYY")}</div>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </ItemListStyled>
    );
};

// ItemList.propTypes = {
//     data: PropTypes.string
// };

export default ItemList;
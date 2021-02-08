import React from 'react';
// import PropTypes from 'prop-types';
import {List, Avatar, Skeleton} from 'antd';
import {CategoryListStyled} from './categoryList_styles';
import moment from "moment";
import {
    CalendarTwoTone
} from '@ant-design/icons';


const CategoryList = ({editHandler, categories}) => {

    const getFirstLetterOf = (string) => {
        return string[0];
    };

    const findCategory = (catId) => {
        const catIdFound = categories.find(v => v.id === catId);
        if (catIdFound) {
            return catIdFound.category_name;
        }
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
        <CategoryListStyled>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit" onClick={(e) => itemClickHandler(item)}>Edit</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar style={{backgroundColor: 'rgba(0, 22, 41, 0.5)'}}>{showCatLetter(item.id)}</Avatar>
                                }
                                title={<div>{item.category_name}</div>} />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </CategoryListStyled>
    );
};

// CategoryList.propTypes = {
//     data: PropTypes.string
// };

export default CategoryList;
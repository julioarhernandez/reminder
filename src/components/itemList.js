import React from 'react';
// import PropTypes from 'prop-types';
import {List, Avatar, Skeleton} from 'antd';
import {ItemListStyled} from './itemList_styles';

const ItemList = ({items}) => {
     return (
        <ItemListStyled>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={items}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">Done</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                }
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={`${item.date} bought in ${item.store}`}
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
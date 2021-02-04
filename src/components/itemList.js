import React from 'react';
import {List, Avatar, Button, Skeleton} from 'antd';
import {Body} from './itemList_styles';

const ItemList = () => {
    const list = [
        {
            "gender": "female",
            "name": {"title": "Miss", "first": "Bernardete", "last": "de Souza"},
            "email": "bernardete.desouza@example.com",
            "nat": "BR"
        },
        {
            "gender": "female",
            "name": {"title": "Ms", "first": "Ella", "last": "Montgomery"},
            "email": "ella.montgomery@example.com",
            "nat": "IE"
        }
    ];
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            }
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ItemList;
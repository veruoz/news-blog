import React from 'react';
import {Item, Icon, Label} from "semantic-ui-react";

const setText = (s) => s.length >= 300 ? s.substr(0, 300) + '...' : s

const Post = ({image, key, title, text, views, link}) => {
    return (
        <Item>
            <Item.Image src={image} />

            <Item.Content>
                <Item.Header as='a'><a href={link}>{title}</a></Item.Header>
                <Item.Description>{setText(text)}</Item.Description>
                <Item.Extra>
                    <Label icon='eye' content={`Просмотров: ${views}`} />
                </Item.Extra>
            </Item.Content>
        </Item>
        // <div className="post">
        //     <div style={{backgroundImage: `url(${props.image})`}} className="post__image" />
        //     <div className="post__info">
        //         <h2 className="post__title">{props.title}</h2>
        //         <p className="post__description">{props.description}</p>
        //     </div>
        // </div>
    );
};

export default Post;

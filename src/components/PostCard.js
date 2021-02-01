import React,{ useContext} from 'react';
import {Card, Icon, Label, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import DeleteButton from './DeleteButton';
import { AuthContext }  from '../context/auth';
import MyPopup from '../util/MyPopUp';

function PostCard({post}) {
    
    const { user } = useContext(AuthContext);
    const  { body, createdAt, id, username, likeCount, commentCount, likes} = post

    return (
        <Card>
            <Card.Content>
            <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
                {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
               
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content="Comment On Post" >
                    <Button  labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard;

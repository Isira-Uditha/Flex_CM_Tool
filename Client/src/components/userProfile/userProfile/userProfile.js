import React, {Component} from 'react';
import PostForm from "../postForm/postForm";
import PostTable from "../postTable/postTable";

const initialState = {
    postId: null
}

class UserProfile extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.editPost = this.editPost.bind(this);
    }

    editPost(id){
        this.setState({postId: id});
    }

    render(){
        return(
            <div className="container">
                <br/>
                <h5 style={{textAlign:"left"}}>Welcome back "User Name"</h5>
                <PostForm postId = {this.state.postId} />
                <PostTable editPost = {this.editPost} />
            </div>
        )
    }
}

export default UserProfile;
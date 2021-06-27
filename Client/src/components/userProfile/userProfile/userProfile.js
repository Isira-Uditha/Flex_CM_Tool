import React, {Component} from 'react';
import PostForm from "../postForm/postForm";
import PostTable from "../postTable/postTable";
import UserSession from "../../auth/userSession";
import axios from 'axios';

const initialState = {
    postId: 'null',
    userDetails: [],
    user_id: ''
}

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.editPost = this.editPost.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user === 'null') {
            window.location = '/auth';
        }

        axios.get(`http://localhost:8087/user/getUser/${user}`).then(response => {
            // console.log(response.data.data);
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })
    }

    editPost(id) {
        this.setState({postId: id});
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h5 style={{textAlign: "left"}}>Welcome back {this.state.userDetails.name} </h5>
                <PostForm
                    postId={this.state.postId}
                />
                <PostTable
                    editPost={this.editPost}
                    userId={this.state.user_id}
                />
            </div>
        )
    }
}

export default UserProfile;
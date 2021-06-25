import React, {Component} from 'react';
import PostForm from "../postForm/postForm";
import PostTable from "../postTable/postTable";

class UserProfile extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="container">
                <br/>
                <h5 style={{textAlign:"left"}}>Welcome back "User Name"</h5>
                <PostForm/>
                <PostTable/>
            </div>
        )
    }
}

export default UserProfile;
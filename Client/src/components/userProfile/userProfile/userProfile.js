import React, {Component} from 'react';
import PostForm from "../postForm/postForm";
import PostTable from "../postTable/postTable";
import UserSession from "../../auth/userSession";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

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
        this.parentReload = this.parentReload.bind(this);
        this.loadPDF = this.loadPDF.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user === 'null') {
            window.location = '/auth';
        }

        axios.get(`http://localhost:8087/user/getUser/${user}`).then(response => {
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })
    }

    editPost(id) {
        this.setState({postId: id});
    }

    parentReload(){
        window.location.reload();
    }

    loadPDF(link, title){
        const fileWindow = window.open();
        const url = link;
        fileWindow.document.write(
            '<title>'+title+'</title>' +
            '<body style="overflow: hidden; margin: 0">' +
            '<object width="100%" width="-webkit-fill-available" height="100%" height="-webkit-fill-available" type="application/pdf" data="' + encodeURI(url) + '"></object>' +
            '</body>'
        );
        var string = doc.output(link);
        var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    }

    render() {
        return (
            <div className="container">
                <br/>
                <PostForm
                    postId={this.state.postId}
                    parentReload={this.parentReload}
                />
                <PostTable
                    editPost={this.editPost}
                    userId={this.state.user_id}
                    parentReload={this.parentReload}
                    loadPDF={this.loadPDF}
                />
            </div>
        )
    }
}

export default UserProfile;
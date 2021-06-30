import React, { Component } from "react";
import AdminAddMainUsers from "../adminAddMainUsers/adminAddMainUsers";
import AdminViewUsers from "../adminViewUsers/adminViewUsers";


const initialState = {
    userId: 'null',
}

class AdminUserhandle extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.editUser = this.editUser.bind(this);
    }

    editUser(id) {
        console.log('USER ID PASSED TO PARENT', id);
        this.setState({userId: id});
    }

    render() {
        return (
            <div className="container">
                <br/>
                <AdminAddMainUsers
                    userId={this.state.userId}
                />
                <AdminViewUsers
                    editUser={this.editUser}
                />
            </div>
        )
    }
}

export default AdminUserhandle;
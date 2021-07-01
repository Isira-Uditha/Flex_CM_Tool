import React, {Component} from 'react';
import PresenterForm from '../presenterForm/presenterForm';
import PresenterTable from '../presenterTable/presenterTable';
import UserSession from "../../auth/userSession";
import axios from 'axios';

const initialState = {
    workshopId: 'null',
    userDetails: [],
    user_id: ''
}

class ResearchPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.editWorkshop = this.editWorkshop.bind(this);
        this.parentReload = this.parentReload.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user === 'null') {
            window.location = '/auth';
        }

        axios.get(`https://flexconferencetool.herokuapp.com/user/getUser/${user}`).then(response => {
            // console.log(response.data.data);
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })
    }

    editWorkshop(id) {
        this.setState({workshopId: id});
        console.log('WORKSHOP ID PASSED TO PARENT', id);
    }

    parentReload(){
        window.location.reload();
    }

    render() {
        return (
            <div className="container">
                <br/>
                <PresenterForm
                    workshopId={this.state.workshopId}
                    parentReload={this.parentReload}
                />
                <PresenterTable
                    editWorkshop={this.editWorkshop}
                    parentReload={this.parentReload}
                />
            </div>
        )
    }
}

export default ResearchPresenter;
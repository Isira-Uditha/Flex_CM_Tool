import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import UserSession from "../auth/userSession";
import 'react-toastify/dist/ReactToastify.css';
import * as RoleTypes from "../auth/rolesTypes.constants"

const initialState = {
    items: [],
    entries: [],
    notified: [],
    loading: false
}
class Notification extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.show = this.show.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {

        const user = UserSession.getName();
        const role = UserSession.getRole();
        if(role === RoleTypes.RESEARCHER){
            axios.get(`http://localhost:8087/post/user/${user}`).then(response => {
                this.setState({entries: response.data.data});
                this.setData();
            })
        }else if(role === RoleTypes.EDITOR){
            axios.get(`http://localhost:8087/conference/`).then(response => {
                this.setState({entries: response.data.data});
                this.setData();
            })
        }else if(role === RoleTypes.WORKSHOP_PRESENTEE){
            axios.get(`http://localhost:8087/workshop/user/${user}`).then(response => {
                this.setState({entries: response.data.data});
                this.setData();
            })
        }
    }

    setData(){
        let data = [];
        for(let i =0 ; i < this.state.entries.length ; i++) {
            console.log(this.state.entries[i].notify);
            if (this.state.entries[i].notify == "1" || this.state.entries[i].notify == "2" ) {

                console.log("fff"+this.state.entries[i].title);
                let n = {
                    value: this.state.entries[i]._id,
                    label: this.state.entries[i].title,
                    notifyStatus: this.state.entries[i].notify
                }
                data.push(n)
            }
        }
        this.setState({
            notified: data
        }, () => {
            console.log("bbbbbbbbbb"+this.state.notified.length)
            this.setState({loading: true});
            console.log(this.state.notified);
        })
        console.log(this.state.entries);
    }

    show(e){
        for(let i =0 ; i < this.state.notified.length ; i++) {
            console.log("ss"+this.state.notified[i].notifyStatus)
            if(this.state.notified[i].notifyStatus == "1") {
                toast.success('Approved' + this.state.notified[i].label)
                console.log(this.state.notified[i].value)
            }else   if(this.state.notified[i].notifyStatus == "2"){
                toast.error('Decline ' + this.state.notified[i].label)
            }
            let approvedPost = {
                notify: "-1"
            };

            const role = UserSession.getRole();

            if(role === RoleTypes.RESEARCHER) {
                axios.patch(`http://localhost:8087/post/approvePost/${this.state.notified[i].value}`, approvedPost)
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error.message)
                        alert(error.message)
                    })
            }else if(role === RoleTypes.EDITOR){
                axios.patch(`http://localhost:8087/conference/${this.state.notified[i].value}`, approvedPost)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.message)
                        alert(error.message)
                    })
            }else if(role === RoleTypes.WORKSHOP_PRESENTEE){
                axios.patch(`http://localhost:8087/workshop/update/${this.state.notified[i].value}`, approvedPost)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.message)
                        alert(error.message)
                    })
            }
        }
      this.setState({notified: 0});
    }

    render(){

    return(
        <div>
            <button style={{ background:  "rgb(8, 48, 84, 0.5)"}} type="button" className="btn btn-dark" onClick={e => this.show(e)}>
                Notifications <span className="badge bg-danger">{this.state.notified.length}</span>
            </button>
                <ToastContainer />
        </div>
        )
    }
}

export default Notification;
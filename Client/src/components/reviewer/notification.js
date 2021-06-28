import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import UserSession from "../auth/userSession";
import 'react-toastify/dist/ReactToastify.css';

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

        axios.get(`http://localhost:8087/post/user/${user}`).then(response => {
            this.setState({entries: response.data.data});
            this.setData();
        })

        /*axios.get('http://localhost:8087/post').then(response => {
            this.setState({entries: response.data.data});
            this.setData();
        })*/
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
                toast.success('Your' + this.state.notified[i].label +  + 'Research Paper is approved by the Official Reviewer of ICAF')
                console.log(this.state.notified[i].value)
            }else   if(this.state.notified[i].notifyStatus == "2"){
                toast.error('Your ' + this.state.notified[i].label + 'Research Paper is declined by the Official Reviewer of ICAF')
            }
            let approvedPost = {
                notify: "-1"
            };
          axios.patch(`http://localhost:8087/post/approvePost/${this.state.notified[i].value}`, approvedPost)
                .then(response => {

                })
                .catch(error => {
                    console.log(error.message)
                    alert(error.message)
                })
        }
      this.setState({notified: 0});
    }



    render(){

    return(
        <div>
                {/*<button  type="button" className="btn btn-primary " onClick={e => this.show(e)}>Notifications
                    <span className="badge bg-secondary">{this.state.notified.length}</span>
                </button>*/}
            <button type="button" className="btn btn-primary" onClick={e => this.show(e)}>
                Notifications <span className="badge bg-secondary">{this.state.notified.length}</span>
            </button>

           {/* <button type="button" className="btn btn-primary position-relative">
                Inbox
                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span className="visually-hidden">unread messages</span>
  </span>
            </button>*/}
              {/*  <button   className="btn btn-info btnspace" onClick={()=>toast.info('Info Message')}>Info Message</button>
                <button  className="btn btn-danger btnspace" onClick={()=>toast.error('Error Message')}>Error Message</button>
                <button  className="btn btn-warning btnspace" onClick={()=>toast.warning('Success Message')}>Warning Message</button>*/}
                <ToastContainer />
        </div>

        )
    }

}

export default Notification;
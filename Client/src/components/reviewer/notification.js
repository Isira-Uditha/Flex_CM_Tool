import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
        axios.get('http://localhost:8087/post').then(response => {
            this.setState({entries: response.data.data});
            this.setData();
        })
    }

    setData(){
        let data = [];
        for(let i =0 ; i < this.state.entries.length ; i++) {
            console.log(this.state.entries[i].notify);
            if (this.state.entries[i].notify == "1") {

                console.log("fff"+this.state.entries[i].title);
                let n = {
                    value: this.state.entries[i]._id,
                    label: this.state.entries[i].title
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
            toast.success('This Reaserach Paper is Approved '+ this.state.notified[i].label)
            console.log(this.state.notified[i].value)
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
                <button  className="btn btn-success btnspace" onClick={e => this.show(e)}>Notifications -
                    {this.state.notified.length}
                </button>
              {/*  <button   className="btn btn-info btnspace" onClick={()=>toast.info('Info Message')}>Info Message</button>
                <button  className="btn btn-danger btnspace" onClick={()=>toast.error('Error Message')}>Error Message</button>
                <button  className="btn btn-warning btnspace" onClick={()=>toast.warning('Success Message')}>Warning Message</button>*/}
                <ToastContainer />
        </div>

        )
    }

}

export default Notification;
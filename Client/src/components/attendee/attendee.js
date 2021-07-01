import axios from "axios";
import UserSession from "../auth/userSession";
import React, {Component} from "react";
import Workshops from '../home/workshops/workshops';
import Stripe from "react-stripe-checkout";
import CountDown from "../home/countdown/countdown";
import Carousel from "../home/carousel/carousel";

const initialState = {
    conference: [],
    userDetails: [],
    conference_id: '',
    conference_date: '',
    conference_title: '',
    user_id: '',
    load: false,
    payment: 'pending'
}

class Attendee extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleToken = this.handleToken.bind(this);
        this.tokenHandler = this.tokenHandler.bind(this);
        this.paymentHandler = this.paymentHandler.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user == "null") {
            window.location = `/auth`
        }

        // API call to get user details
        axios.get(`https://flexconferencetool.herokuapp.com/user/getUser/${user}`).then(response => {
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});

        }).then(() => {

            axios.get(`https://flexconferencetool.herokuapp.com/conference/post/conference`).then(response => {
                this.setState({conference: response.data.data[0]});
            }).then(response => {
                this.setState({conference_id: this.state.conference._id})
                this.setState({conference_date: this.state.conference.date})
                this.state.load = true;
            }).catch(error => {
                console.log('CONFERENCE ISSUE', error.message);
            })
        })

    }


    handleToken(totalAmount, token) {
        //API call to stripe payment gateway
        axios.post('https://flexconferencetool.herokuapp.com/payment/pay', {
            token: token.id,
            amount: totalAmount,
            customer_name: this.state.user_id
        }).then(response => {
            console.log(response);

            //Invoking payment handler to update the payment details
            this.paymentHandler(this.state.user_id);
        }).catch(error => {
            console.log({error: error.message});
        })
    }

    tokenHandler(token) {
        console.log('TOKEN', token);
        this.handleToken(100, token);
    }

    paymentHandler(userId) {
        this.setState({payment: 'paid'});
        console.log(this.state.payment);

        this.state.userDetails.payment_status = this.state.payment;

        console.log(this.state.userDetails);
        axios.patch(`http://localhost:8087/user/updateUser/${userId}`, this.state.userDetails).then(response => {
            console.log(response);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="card p-4" style={{background: "rgb(255,255,255,0.3)"}}>
                    {(() => {
                        if (this.state.userDetails.payment_status == 'pending') {
                            return <div className="card-header">
                                <h5>Interested to participate?</h5>
                            </div>
                        } else if (this.state.userDetails.payment_status == 'paid') {
                            return <div className="card-header">
                                <h5>All set! You are eligible to attend to the Conference</h5>
                            </div>
                        }
                    })()}
                    <div className="card-body">
                        <Carousel/>
                    </div>
                    <div className="card-footer">
                        {(() => {
                            if (this.state.userDetails.payment_status == 'pending') {
                                return <Stripe
                                    stripeKey="pk_test_51J5ViHAHA9nESvo0LpVRniSH1A8hx0Gq3uBya8uswpVIOaz1FeeRyRicbUXd5RYFpnJj6WKuf0HOwZIDXzGYjIJa008q7s35RK"
                                    token={this.tokenHandler}
                                />
                            } else if (this.state.userDetails.payment_status == 'paid') {
                                return <button className="btn btn-success">Paid</button>
                            }
                        })()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Attendee;
import React, { Component } from "react";
import './footer.css'

const initialState = {
    conferenceId:'',
    workshops:[],
    hidden: '',
}

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render(){

        return (
            <div className={"w-100"}>
                <footer className="site-footer" style={{opacity: "0.9"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h6>About</h6>
                                <div className={"text-start"}>
                                <p style={{textAlign:"justify"}}>Flex.com <i>MANAGEMENT WANTS TO BE SIMPLE </i> Large conferences are the center of your event program and marketing strategy.
                                    Our conference management software delivers the insights, experience, and technology to enhance your revenue potential.
                                    Whether you need an in-person conference platform, a virtual conference platform, or a hybrid conference platform, Cvent has you covered.</p>
                                </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Categories</h6>
                                <ul className="footer-links">
                                    <div className={"text-start"} style={{marginLeft:"95px"}}>
                                        <li><a href="#">Conference</a></li>
                                        <li><a href="#">Researches</a>
                                        </li>
                                        <li><a href="#">Workshops</a></li>
                                        <li><a href="#">Ticketing</a></li>
                                        <li><a href="#">Research Papers</a></li>
                                        <li><a href="#">Templates</a></li>
                                    </div>
                                </ul>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul className="footer-links">
                                    <div className={"text-start"} style={{marginLeft:"95px"}}>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Contribute</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Sitemap</a></li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by
                                    <a href="#">Flex</a>.
                                </p>
                            </div>

                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <ul className="social-icons">
                                    <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                                    <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
export default Footer;
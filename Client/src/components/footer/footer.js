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

    componentWillMount() {

    }

    componentDidMount() {

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
                                <p style={{textAlign:"justify"}}>Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an
                                    initiative to help the upcoming programmers with the code. Scanfcode focuses on
                                    providing the most efficient code or snippets as the code wants to be simple. We
                                    will help programmers build up concepts in different programming languages that
                                    include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and
                                    Algorithm.</p>
                                </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Categories</h6>
                                <ul className="footer-links">
                                    <div className={"text-start"} style={{marginLeft:"95px"}}>
                                        <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                                        <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a>
                                        </li>
                                        <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                                        <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                                        <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                                        <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
                                    </div>
                                </ul>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul className="footer-links">
                                    <div className={"text-start"} style={{marginLeft:"95px"}}>
                                    <li><a href="http://scanfcode.com/about/">About Us</a></li>
                                    <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                                    <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                                    <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                                    <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
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
                                    <a href="#">Scanfcode</a>.
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
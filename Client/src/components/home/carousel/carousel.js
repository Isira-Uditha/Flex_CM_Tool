import React, { Component } from "react";
import con1 from '../../../assets/con1.jpg';
import con2 from '../../../assets/con2.jpg';
import con3 from '../../../assets/con3.jpg';


const initialState = {
    days:'',
    hours:'',
    minutes:'',
    seconds:'',
    date:'',
    conference:'',
}

class Carousel extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    // componentDidMount() {
    // }

    render(){

        return (
            <div className={"w-100"} style={{background:"rgb(1,71,132,0.7)"}}>
                <div className={"container w-50"}>
                <br/>
                <h2 className={"text-white text-uppercase"}>Past Flex Conferences</h2>
                    <br/>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={con1} className="d-block w-100" alt="conference 3" style={{ width: "100%", height: "25vw", objectFit: "cover"}}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>2018 Flex Conference</h5>
                                    <p>No grand idea was ever born in a conference, but a lot of foolish ideas have died there..</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src={con2} className="d-block w-100" alt="conference 2" style={{ width: "100%", height: "25vw", objectFit: "cover"}}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>2019 Flex Conference</h5>
                                    <p>Leadership in today's world requires far more than a large stock of gunboats and a hard fist at the conference table.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src={con3} className="d-block w-100" alt="conference 3" style={{ width: "100%", height: "25vw", objectFit: "cover"}}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>2020 Flex Conference</h5>
                                    <p>Time is a great conference planning our end, and youth is only the past putting a leg forward.</p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                    <br/>
                </div>
            </div>
        )
    }
}
export default Carousel;
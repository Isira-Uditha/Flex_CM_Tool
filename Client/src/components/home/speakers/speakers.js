import React, { Component } from "react";


const initialState = {
    speakers: [],

}

class Speakers extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.displayCollapse  = this.displayCollapse.bind(this);
        this.setProps  = this.setProps.bind(this);

    }

    componentDidMount() {
        this.setProps();
    }
    setProps(){
        setTimeout(() => {
            console.log('Our data is fetched');
            this.setState({speakers:this.props.speakers});
        }, 1000)
    }

    componentWillMount(){
        console.log('First this called');
    }

    displayCollapse(e){
        e.preventDefault()
        if(this.state.hidden === ""){
            this.setState({hidden:"show"})
        }else{
            this.setState({hidden:""})
        }
    }

    render(){
        return (
            <div className={"container"}>
                <div className={"row"} style={{justifyContent:"center"}}>
                    <h2 className={"text-center text-light text-uppercase"}>Key Note Speakers</h2>
                    {this.state.speakers.length > 0 && this.state.speakers.map((item, index) => (
                        <div className="card m-4 border-secondary border-4" style={{width: "18rem",background:"rgb(255,255,255,0.2)"}} key={index}>
                            <img className="card-img-top mx-auto mt-2" style={{  width: "100%", height: "15vw", objectFit: "cover"}} src={item.url} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{item.speaker}</h5>
                            </div>
                        </div>
                    ))}
                </div>
                <br/>
                <div className={"row"} style={{justifyContent:"center"}} >
                    <h2 className={"text-center text-light text-uppercase"} >Guest Speaker</h2>
                    <div className="card m-4 border-secondary border-4" style={{width: "18rem",background:"rgb(255,255,255,0.2)"}}>
                            <img className="card-img-top mt-2" style={{ width: "100%", height: "15vw", objectFit: "cover"}} src={this.props.g_url} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{this.props.g_speaker}</h5>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default Speakers;
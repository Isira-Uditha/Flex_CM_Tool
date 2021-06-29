import React, { Component } from "react";
import axios from "axios";

const initialState = {
    show: false
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.setState({show: this.props.show});
        console.log(this.state.show)
    }

    render(){
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
        return(
            <div className={showHideClassName}>
                <section className="modal-main">

                    <button type="button">
                        Close
                    </button>
                </section>
            </div>
        )
    }

}

export default Modal;
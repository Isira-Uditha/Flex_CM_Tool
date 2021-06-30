import React, {Component} from "react";
import ResearchPaperTemplate from "../../assets/Research_Paper_Template.docx"
import WorskshopTemplate from "../../assets/Workshop_Propasal_Presentation.pptx"

const initialState = {}

class DownloadTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"container mt-5"}>
                <br/><br/><br/>
                <br/>
                <div  className={"card p-4"} style={{background: "rgb(255,255,255,0.2)", height: "30rem"}}>
                    <div className={"row"} style={{justifyContent: "center"}}>
                        <br/>
                        <h5 htmlFor="title" className="form-label mb-4 text-dark" style={{textAlign: "left"}}>Download Templates
                            From here</h5>
                        <br/><br/><br/>

                        <div className="card m-4 border-secondary border-4"
                             style={{width: "18rem", background: "rgb(255,255,255,0.8)"}}>
                            {/* <img className="card-img-top mx-auto mt-2" style={{  width: "100%", height: "15vw", objectFit: "cover"}}  alt="Card image cap"/>*/}
                            <div className="card-body">
                                <h5 className="card-title">Research Paper Template</h5>
                                <p className="card-text">Research Paper Template to build your Research Paper according
                                    to the conference.</p>
                                <br/>
                                <a href={ResearchPaperTemplate} download={'Research_Paper_Template'}
                                   style={{background: "rgb(8, 48, 84, 0.7)"}} className="btn btn-primary">Download</a>
                            </div>
                        </div>

                        <div className="card m-4 border-secondary border-4"
                             style={{width: "18rem", background: "rgb(255,255,255,0.8)"}}>
                            {/* <img className="card-img-top mx-auto mt-2" style={{  width: "100%", height: "15vw", objectFit: "cover"}}  alt="Card image cap"/>*/}
                            <div className="card-body">
                                <h5 className="card-title">Workshop Paper Template</h5>
                                <p className="card-text">Workshop Propasal Presentation Template to conduct your
                                    Workshop according to the conference.</p>
                                <a href={WorskshopTemplate} download={'WorskShop_Propasal_Presentation'}
                                   className="btn btn-primary" style={{background: "rgb(8, 48, 84, 0.7)"}}>Download</a>
                            </div>
                        </div>
                        <br/>

                    </div>

                    <br/>
                </div>
            </div>
        )
    }

}

export default DownloadTemplate;

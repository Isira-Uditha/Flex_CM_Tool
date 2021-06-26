import React, {Component} from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    type: '',
    pdf: '',
    status: 'pending',
    post_id: 'null',
    fetchedData: []
}

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.postId != prevProps.postId) {
            this.setState({post_id: this.props.postId}, this.fetchData);
        }
    }

    fetchData() {
        axios.get(`http://localhost:8087/post/${this.state.post_id}`).then(response => {
            this.setState({fetchedData: response.data.data});
        }).then(() => {
            this.setState({title: this.state.fetchedData.title});
            this.setState({type: this.state.fetchedData.type});
            // this.setState({pdf: this.state.fetchedData.pdf_url});
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let submission = {
            title: this.state.title,
            type: this.state.type,
            pdf_url: this.state.pdf,
            status: this.state.status
        }

        console.log('DATA TO SEND ', submission);
        axios.post('http://localhost:8087/post/create', submission).then(response => {
            alert('Successfully added');
        }).catch(error => {
            alert(error.message);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="card p-4">
                    <h5 className="card-title">Add your Research Papers</h5>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <div className="form-floating mb-3">
                                        <input type="title"
                                               name="title"
                                               className="form-control"
                                               placeholder="Title"
                                               value={this.state.title}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="title">Title</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <div className="form-floating">
                                        <input type="text"
                                               name="type"
                                               className="form-control"
                                               placeholder="Type"
                                               value={this.state.type}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="type">Type</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Type</label>
                                    <input type="file"
                                           name="pdf"
                                           className="form-control"
                                           placeholder="Add your pdf here"
                                           value={this.state.pdf}
                                           onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12" style={{textAlign: "right"}}>
                                    {(()=>{
                                        if(this.state.post_id === 'null'){
                                            return <button type="submit" className="btn btn-primary">Submit</button>
                                        } else {
                                            return <button type="submit" className="btn btn-primary">Update</button>
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PostForm;
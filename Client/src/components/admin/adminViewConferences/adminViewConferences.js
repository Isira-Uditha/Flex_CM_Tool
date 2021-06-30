// import React, { Component } from 'react';
// import axios from 'axios';
//
//
// class Conferences extends Component {
//
//     constructor(props) {
//         super(props);
//         //creating states
//         this.state = {
//             conferences: []
//         }
//     }
//
//     //excecutes when page loading
//     componentDidMount() {
//         axios.get('http://localhost:8087/conference/')
//             .then(response => {
//                 this.setState({ conferences: response.data.data });
//             })
//     }
//
//     render() {
//         return (
//
//             <div className="card">
//                 <br/>
//                 <h1 className="card-header">Conferences</h1>
//                 <div className="card-body">
//                     <h1></h1>
//                     <table className="table table-dark table-striped">
//                         <thead>
//                         <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Code</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Date</th>
//                             <th scope="col">Time</th>
//                             <th scope="col">Location</th>
//                             <th scope="col">Speakers</th>
//                             <th scope="col">Ticket_price</th>
//                             <th scope="col">Approve</th>
//                             <th scope="col">Reject</th>
//
//                         </tr>
//                         </thead>
//                         <tbody>
//
//                         {this.state.conferences.length > 0 && this.state.conferences.map((item, index) =>
//                         <tr>
//                             <th scope="row">1</th>
//                             <td>{item.code}</td>
//                             <td>{item.description}</td>
//                             <td>{item.date}</td>
//                             <td>{item.time}</td>
//                             <td>{item.location}</td>
//                             <td>{item.g_speaker}</td>
//                             <td>{item.ticket_price}</td>
//                             <td><a className="btn btn-success" href="path/to/settings" aria-label="Edit">
//                                 <i className="fa fa-edit" aria-hidden="true"></i>
//                             </a></td>
//                             <td>
//                                 <a className="btn btn-danger" href="path/to/settings" aria-label="Delete">
//                                     <i className="fa fa-trash-o" aria-hidden="true"></i>
//                                 </a>
//                             </td>
//
//
//                         </tr>
//                         )}
//                         </tbody>
//                     </table>
//
//                 </div>
//
//             </div>
//         )
//     }
//
// }
//
// export default Conferences;

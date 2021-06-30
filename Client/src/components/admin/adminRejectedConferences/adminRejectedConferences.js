import React, { Component } from 'react';
import axios from 'axios';

class RejectedConferences extends Component {

    render() {
        return (

            <div className="card">
                <br/>
                <h1 className="card-header">Rejected Conferences</h1>
                <div className="card-body">
                    <h1></h1>
                    <table className="table table-dark table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Code</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Location</th>
                            <th scope="col">Speakers</th>
                            <th scope="col">Ticket_price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }

}

export default RejectedConferences;
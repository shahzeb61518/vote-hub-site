import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import validator from 'validator';
import MyTextField from '../../helper/MyTextField'

import Button from '@material-ui/core/Button';

export default class Orgnization extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //Orgnization main body
    mainBody = () => {

        return (
            <div className="container" style={{ textAlign: 'left' }}>
                <br />
                <h2>Orgnizations</h2>
                <br />
                <table class="table">
                    <thead style={{ backgroundColor: 'black', color: 'white'}}>
                        <tr>
                            <th>Orgnization</th>
                            <th>Your Role</th>
                            <th>Billing account</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Shahsoft</td>
                            <td>Owner</td>
                            <td>shah@gmail.com</td>
                            <td>
                                <Button><li className="fa fa-pencil"> </li> Edit</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <Button
                    class="btn btn-primary"><li className="fa fa-plus"></li> Add Orgnization</Button>
                <br />
                <br />
                <br />

            </div>

        )
    }
}

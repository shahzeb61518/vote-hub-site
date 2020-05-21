import React, { Component } from 'react'

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

export default class Ready extends Component {
    constructor(props) {
        super(props)
        this.state = {
            electionTitle: ''
        }
        this.userData = '';

    }


    componentDidMount() {

        if (this.props.location) {
            if (this.props.location.state) {
                if (this.props.location.state.title) {
                    console.log("Title>", this.props.location.state.title)
                    this.setState({
                        electionTitle: this.props.location.state.title,
                    })

                    // Funtion APi call
                    new ApiManager().sendLinkWithTitle(this.props.location.state.title).then(result => {
                        if (result.no_result) {
                            return
                        }
                        if (result.data) {
                            if (result.data.error) {
                                alert(result.data.error)
                                return
                            }
                        }
                        if (result.data) {
                            console.log("result sendLinkWithTitle>>>", result.data);
                        }
                    })
                }

            }
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

    //VOting main body
    mainBody = () => {

        return (
            <div>
                <div className="container" style={{ padding: '10px' }}>
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <h1>Thank you!</h1>
                        <h6>Your election is running</h6>
                        <br />
                        <p>Notices will be sent shortly.</p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                    </div>
                </div>
            </div>
        )
    }


}

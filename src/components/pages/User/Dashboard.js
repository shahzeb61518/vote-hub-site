import React, { Component } from 'react'

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

            electionData: '',
            userFName: "",
            userLName: "",
            electionName: "",
            date: "25-05-2020 12:12PM"
        }
        this.userData = '';

    }


    componentDidMount() {
        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                userFName: this.userData.firstname,
                userLName: this.userData.lastname
            })
        }


        // Get Election data
        new ApiManager().getElectionData().then(result => {
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
                this.setState({
                    electionData: result.data
                })
                console.log("getElectionData>>>", result.data);

            }
        })
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

    //Dashboard main body
    mainBody = () => {

        return (
            <div>
                <div className="container" style={{ padding: '10px' }}>
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: 'left' }}>
                        <h1>Welcome <span>{this.state.userFName + " " + this.state.userLName}</span>! Your elections are listed below:</h1>
                        <p>To filter the list, select an election type (ex. running, completed) or choose actions to complete setup, view the voter list or access results.
                </p>
                    </div>

                    <br />
                    <br />

                    <div className="row" style={{ textALign: 'center' }}>
                        <div className="col">
                            <Card style={{ padding: '20px', height: '90px' }}>
                                <h6>Total Elections</h6>
                                <p>{this.state.electionData ? this.state.electionData.length : 0}</p>
                            </Card>
                        </div>
                        <div className="col">
                            <Card style={{ padding: '20px', backgroundColor: '#06aed5', color: 'white', height: '90px' }}>
                                <h6>Incompelete</h6>
                                <p>0</p>
                            </Card>
                        </div>
                        <div className="col">
                            <Card style={{ padding: '20px', backgroundColor: '#f60020', color: 'white', height: '90px' }}>
                                <h6>Needs Payment</h6>
                                <p>0</p>
                            </Card>
                        </div>
                        <div className="col">
                            <Card style={{ padding: '20px', backgroundColor: '#ff8000', color: 'white', height: '90px' }}>
                                <h6>Ready</h6>
                                <p>0</p>
                            </Card>
                        </div>
                        <div className="col">
                            <Card style={{ padding: '20px', backgroundColor: '#03af11', color: 'white', height: '90px' }}>
                                <h6>Running</h6>
                                <p>0</p>
                            </Card>
                        </div>
                        <div className="col">
                            <Card style={{ padding: '20px', backgroundColor: '#414141', color: 'white', height: '90px' }}>
                                <h6>Compeleted</h6>
                                <p>0</p>
                            </Card>
                        </div>
                    </div>
                    <br />
                    <br />
                    {
                        this.state.electionData && this.state.electionData.map((item, i) => {

                            return (
                                <div className="row" key={i}>
                                    <div className="col">
                                        <Nav navbar style={{ float: 'left' }}>
                                            <AppHeaderDropdown direction="down">
                                                <DropdownToggle nav
                                                    style={{
                                                        color: ''
                                                    }}>
                                                    <Button style={{ padding: '20px' }} color="inherit">Action</Button>
                                                </DropdownToggle>
                                                <DropdownMenu>

                                                    <DropdownItem
                                                        onClick={e => this.props.history.push('/')}
                                                    >Complete Setup</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem
                                                        onClick={e => this.props.history.push('/')}
                                                    >Dublicate</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem
                                                        onClick={e => this.props.history.push('/')}
                                                    >Delete</DropdownItem>
                                                    <DropdownItem />
                                                </DropdownMenu>
                                            </AppHeaderDropdown>
                                        </Nav>
                                        <div style={{ float: 'left', marginLeft: '10px', textAlign: 'left' }}>
                                            {this.state.electionData ?
                                                <div>
                                                    <h4 style={{ marginTop: '5px' }}>{item.title}</h4>
                                                    <p>{item.startdate}</p>
                                                </div>
                                                :
                                                undefined
                                            }
                                        </div>
                                    </div>
                                    <div className="col" style={{ textAlign: 'right' }}>
                                        <Button
                                            style={{}}
                                            color="inherit"
                                            class="btn btn-primary"
                                            onClick={() => {
                                            }}>Incomplete</Button>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>

        )
    }
}

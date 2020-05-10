import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// import Menu from '../../helper/Menu'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav  } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';

// import { LocalStorage } from "../../helper/LocalStorage";

import { userLogout } from '../../../redux-store/actions/ActionUserData'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedin: false,
            name: '',
            anchorEl: null,

        }
    }

    render() {
        // console.log("this.props.user.user.name", this.props.user.user.name)

        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ marginLeft: '20px' }}>
                            VOTE-HUB: An online Election System
              </Typography>
                        {
                            this.state.loggedin === false ?
                                <>
                                    <Link
                                        to='/home'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '30px', fontSize: '12px' }} color="inherit">Home</Button>
                                    </Link>

                                    <Nav navbar>
                                        <AppHeaderDropdown direction="down">
                                            <DropdownToggle nav
                                                style={{
                                                    color: 'white'
                                                }}>
                                                <Button color="inherit">How It Works</Button>
                                            </DropdownToggle>
                                            <DropdownMenu>

                                                <DropdownItem
                                                    onClick={e => this.props.history.push('/election-voting')}
                                                >  Election Voting</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem
                                                    onClick={e => this.props.history.push('/meeting-voting')}
                                                >  Meeting Voting</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem
                                                    onClick={e => this.props.history.push('/announcments')}
                                                >  Announcments and notice</DropdownItem>
                                                <DropdownItem />
                                            </DropdownMenu>
                                        </AppHeaderDropdown>
                                    </Nav>
                                    <Link
                                        to='/features'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Features</Button>
                                    </Link>
                                    <Link
                                        to='/services'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Services</Button>
                                    </Link>
                                    <Link
                                        to='/who-its-for'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Who It's For</Button>
                                    </Link>
                                    <Link
                                        to='/vote'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Vote</Button>
                                    </Link>

                                    <div style={{
                                        marginLeft: '10%'
                                    }}>
                                        <Link
                                            to='/signup'
                                            style={{
                                                textDecoration: "None",
                                                color: 'white',
                                            }}
                                        >
                                            <Button style={{ fontSize: '12px' }} color="inherit">SignUp</Button>
                                        </Link>
                                        <Link
                                            to='/login'
                                            style={{
                                                textDecoration: "None",
                                                color: 'white',
                                            }}
                                        >
                                            <Button
                                                style={{ fontSize: '12px' }}
                                                color="inherit"
                                                onClick={() => {
                                                    this.setState({ loggedin: true })
                                                }}>Login</Button>
                                        </Link>

                                    </div>
                                </>
                                :
                                <>
                                    <Link
                                        to='/user/dashboard'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                            marginLeft: '40%'
                                        }}
                                    >
                                        <Button style={{ marginLeft: '30px', fontSize: '12px' }} color="inherit">Dashboard</Button>
                                    </Link>

                                    {/* <Link
                                        to='/user/help'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button style={{ marginLeft: '15px', fontSize: '12px' }} color="inherit">Help</Button>
                                    </Link> */}

                                    <Nav navbar>
                                        <AppHeaderDropdown direction="down">
                                            <DropdownToggle nav
                                                style={{
                                                    color: 'white'
                                                }}>
                                                <Button color="inherit">Profile</Button>
                                            </DropdownToggle>
                                            <DropdownMenu>

                                                <DropdownItem
                                                    onClick={e => this.props.history.push('/user/settings')}
                                                >Settings</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem
                                                    onClick={e => this.props.history.push('/user/orgnization')}
                                                >Orgnization</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem
                                                    onClick={() => {
                                                        this.setState({ loggedin: false })
                                                        this.props.history.push('/')
                                                    }
                                                    }
                                                >Logout</DropdownItem>
                                            </DropdownMenu>
                                        </AppHeaderDropdown>
                                    </Nav>
                                    <Link
                                        to='/user/new-election'
                                        style={{
                                            textDecoration: "None",
                                            color: 'white',
                                        }}
                                    >
                                        <Button
                                            class="btn btn-warning"
                                            style={{ fontSize: '12px' }}
                                            color="inherit"
                                            onClick={() => {
                                            }}>New Election</Button>
                                    </Link>
                                </>
                        }

                    </Toolbar>
                </AppBar>
            </div >
        );
    }

}

const mapStateToProps = (state) => {

    const { user, chat } = state
    return {
        user,
        chat
    }
}

const actions = {
    userLogout
}

export default withRouter(connect(mapStateToProps, actions)(Header))
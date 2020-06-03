import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import validator from 'validator';

import Button from '@material-ui/core/Button';

import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux';
import { userData } from './../../../redux-store/actions/ActionUserData'
import { LocalStorage } from '../../helper/LocalStorage';

import MyTextField from '../../helper/MyTextField'
import ApiManager from '../../helper/ApiManager'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            email_error: "",
            password: "",
            password_error: "",

            successMsg: "",
            isLoading: false,
            disableBtn: false,
            errorMessage: ""

        }
    }

    componentDidMount() {
        let userEmail = new LocalStorage().getUserData();

        
        userEmail = JSON.parse(userEmail);
        console.log("userEmailuserEmail>", userEmail)
        if (userEmail) {
            new ApiManager().editStatus(userEmail).then(result => {
                if (result.no_result) {
                    return
                }
                console.log("result after adding>>>", result);
            })
        }


        // console.log("UserEmail>", this.props.location.state)
        // if (this.props.location) {
        //     if (this.props.location.state) {
        //         if (this.props.location.state.userEmail) {
        //             console.log("UserEmail>", this.props.location.state.userEmail)
        //             // api call for after verify from email

        //         }
        //     }
        // }
    }



    render() {
        return (
            <div className="container">
                {
                    this.loginBody()
                }
            </div>
        )
    }


    loginBody = () => {
        const { email, email_error, password, password_error } = this.state;

        return (
            <div style={{ width: "50%", marginLeft: '25%' }}>
                <br />
                <br />
                <Card style={{ padding: '50px' }}>
                    <h5>Login</h5>
                    <br />
                    <MyTextField
                        reference={(ref) => this.email = ref}
                        label="Email"
                        placeholder="email"
                        required={true}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            });
                        }}
                        helperText={email_error ? email_error : ""}
                        error={email_error ? true : false}
                    />

                    <MyTextField
                        reference={(ref) => this.password = ref}
                        label="Password"
                        placeholder="password"
                        required={true}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            });
                        }}
                        helperText={password_error ? password_error : ""}
                        error={password_error ? true : false}
                    />

                    <Button style={{}}
                        variant="contained"
                        className="btn btn-primary"
                        onClick={() => {
                            this.loginFunction()
                        }}
                        disabled={this.state.disableBtn}>
                        {
                            this.state.disableBtn ?
                                <span className="spinner-border spinner-border-sm"></span>
                                :
                                undefined
                        }
                        Login
                        </Button>

                    <Link
                        to='/signup'
                        style={{
                            marginLeft: '20px',
                            textDecoration: "None",
                            color: 'blue',
                        }}
                    >Signup</Link>
                    <br />
                    <br />
                    <Link
                        to='/forgot-password'
                        style={{
                            marginLeft: '20px',
                            textDecoration: "None",
                            color: 'blue',
                        }}
                    >Forgot Password?</Link>
                    <br />
                    <div style={{ color: "red", padding: "10px" }}>{this.state.errorMessage}</div>

                </Card>
                <br />
            </div>
        )
    }


    // schooling to the position
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }



    // login
    loginFunction = () => {
        const { email, password } = this.state


if (validator.isEmpty(email + "")) {
            this.setState({
                email_error: "Please enter email"
            })
            var positionEmail = this.email.offsetTop;
            this.scrollToView(positionEmail)
            return;
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                this.setState({
                    email_error: ""
                })
            } else {
                this.setState({
                    email_error: "Please enter valid email"
                })
                var positionEmailchck = this.email.offsetTop;
                this.scrollToView(positionEmailchck)
                return;
            }

        } 


        if (validator.isEmpty(password + "")) {
            this.setState({
                password_error: "Please enter password"
            })
            var positionPass = this.password.offsetTop;
            this.scrollToView(positionPass)
            return;
        } else {
            this.setState({
                password_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        new ApiManager().signIn(
            email,
            password,
        ).then(result => {
            this.setState({
                isLoading: true,
            })
            if (result.no_result) {
                this.setState({
                    isLoading: false,
                    disableBtn: false,
                })
                return
            }
            if (result.data) {
                if (result.data.error) {
                    alert(result.data.error)
                    this.setState({
                        isLoading: false,
                        disableBtn: false,
                    })
                    return
                }




                if (result.data) {
                    const { token } = result.data;
                    var decoded = jwtDecode(token);
                    new LocalStorage().setUserData(JSON.stringify(decoded))
                    new LocalStorage().setUserJwt(token);
                    this.props.userData(decoded, token)
                    this.props.history.push('/user/dashboard');
                }

                this.setState({
                    isLoading: false,
                    disableBtn: false
                })
                console.log("result after adding>>>", result);

            }


        })

    }
}


const mapStateToProps = (state, own_props) => {
    return {
        state
    }
}

const actions = {
    userData
}

export default connect(mapStateToProps, actions)(Login)

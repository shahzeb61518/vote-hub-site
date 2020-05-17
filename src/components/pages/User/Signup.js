import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'

import validator from 'validator';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MyTextField from '../../helper/MyTextField'
import MyDropdown from '../../helper/MyDropdown'

import ApiManager from '../../helper/ApiManager'
import { LocalStorage } from '../../helper/LocalStorage';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            firstname_error: "",

            lastname: "",
            lastname_error: "",

            email: "",
            email_error: "",

            password: "",
            password_error: "",

            confirmPassword: "",
            confirmPassword_error: "",

            orgType: "",
            orgType_error: "",
            orgName: "",
            orgName_error: "",
            orgLoc: "",
            orgLoc_error: "",

            membership: "",
            membership_error: "",

            successMsg: "",
            isLoading: false,
            disableBtn: false

        }
    }

    render() {
        return (
            <div className="container">
                {
                    this.signupBody()
                }
            </div>
        )
    }


    signupBody = () => {
        const {
            firstname, firstname_error,
            lastname, lastname_error,
            email, email_error,
            password, password_error,
            confirmPassword, confirmPassword_error,
            orgType, orgType_error,
            orgName, orgName_error,
            membership, membership_error,
            orgLoc, orgLoc_error } = this.state;

        return (
            <div style={{ width: "50%", marginLeft: '25%' }}>
                <br />
                <br />
                <Card style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <h5>Sign Up</h5>
                    <br />
                    <div className="row">
                        <div className="col" style={{ paddingLeft: '0px' }}>
                            <MyTextField
                                reference={(ref) => this.firstname = ref}
                                label="First Name"
                                placeholder="first name"
                                required={true}
                                type="text"
                                value={firstname}
                                onChange={(e) => {
                                    this.setState({
                                        firstname: e.target.value
                                    });
                                }}
                                helperText={firstname_error ? firstname_error : ""}
                                error={firstname_error ? true : false}
                            />
                        </div>
                        <div className="col" style={{  paddingRight: '0px' }}>
                            <MyTextField
                                reference={(ref) => this.lastname = ref}
                                label="Last Name"
                                placeholder="last name"
                                required={true}
                                type="text"
                                value={lastname}
                                onChange={(e) => {
                                    this.setState({
                                        lastname: e.target.value
                                    });
                                }}
                                helperText={lastname_error ? lastname_error : ""}
                                error={lastname_error ? true : false}
                            />
                        </div>
                    </div>

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

                    <MyTextField
                        reference={(ref) => this.confirmPassword = ref}
                        label="Confirm Password"
                        placeholder="confirm password"
                        required={true}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            this.setState({
                                confirmPassword: e.target.value
                            });
                        }}
                        helperText={confirmPassword_error ? confirmPassword_error : ""}
                        error={confirmPassword_error ? true : false}
                    />


                    <MyDropdown
                        reference={(ref) => this.orgType = ref}
                        required={true}
                        label="Orgnization Type"
                        value={orgType}
                        onChange={(e) => {
                            this.setState({
                                orgType: e.target.value
                            })
                        }}
                        helperText={orgType_error ? orgType_error : ""}
                        error={orgType_error ? true : false}
                    >
                        <MenuItem value={"studentgovt"} >{"Student Govt"}</MenuItem>
                        <MenuItem value={"stafffaculty"} >{"Staff and faculty"}</MenuItem>
                    </MyDropdown>


                    <MyTextField
                        reference={(ref) => this.orgName = ref}
                        label="Orgnization Name"
                        placeholder="Orgnization name"
                        required={true}
                        type="text"
                        value={orgName}
                        onChange={(e) => {
                            this.setState({
                                orgName: e.target.value
                            });
                        }}
                        helperText={orgName_error ? orgName_error : ""}
                        error={orgName_error ? true : false}
                    />


                    <MyDropdown
                        reference={(ref) => this.membership = ref}
                        required={true}
                        label="Membership or Vote list size"
                        value={membership}
                        onChange={(e) => {
                            this.setState({
                                membership: e.target.value
                            })
                        }}
                        helperText={membership_error ? membership_error : ""}
                        error={membership_error ? true : false}
                    >
                        <MenuItem value={"1-20"} >{"1-20"}</MenuItem>
                        <MenuItem value={"21-350"} >{"21-350"}</MenuItem>
                        <MenuItem value={"351-500"} >{"351-500"}</MenuItem>
                    </MyDropdown>

                    <MyTextField
                        reference={(ref) => this.orgLoc = ref}
                        label="Orgnization Location"
                        placeholder="Enter city name"
                        required={true}
                        type="text"
                        value={orgLoc}
                        onChange={(e) => {
                            this.setState({
                                orgLoc: e.target.value
                            });
                        }}
                        helperText={orgLoc_error ? orgLoc_error : ""}
                        error={orgLoc_error ? true : false}
                    />

                    <Button style={{}}
                        variant="contained"
                        className="btn btn-primary"
                        onClick={() => {
                            this.signUpFunction()
                        }}
                        disabled={this.state.disableBtn}>
                        {
                            this.state.disableBtn ?
                                <span class="spinner-border spinner-border-sm"></span>
                                :
                                undefined
                        }
                        Sign Up
                        </Button>


                    <Link
                        to='/login'
                        style={{
                            textDecoration: "None",
                            marginLeft: '20px',
                            color: 'blue',
                        }}
                    >Login</Link>
                </Card>
                <br />
                <br />
                <br />
            </div >
        )
    }


    // schooling to the position
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }



    // Signup
    signUpFunction = () => {
        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            orgType,
            orgName,
            membership,
            orgLoc
        } = this.state;

        if (validator.isEmpty(firstname + "")) {
            this.setState({
                firstname_error: "Please enter your First Name"
            })
            var positionFName = this.firstname.offsetTop;
            this.scrollToView(positionFName)
            return;
        } else {
            this.setState({
                firstname_error: ""
            })
        }

        if (validator.isEmpty(lastname + "")) {
            this.setState({
                lastname_error: "Please enter your Last Name"
            })
            var positionLName = this.lastname.offsetTop;
            this.scrollToView(positionLName)
            return;
        } else {
            this.setState({
                lastname_error: ""
            })
        }


        if (validator.isEmpty(email + "")) {
            this.setState({
                email_error: "Please enter email"
            })
            var positionEmail = this.email.offsetTop;
            this.scrollToView(positionEmail)
            return;
        } else {
            this.setState({
                email_error: ""
            })
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

        if (validator.isEmpty(confirmPassword + "")) {
            this.setState({
                confirmPassword_error: "Please enter Confirm Password"
            })
            var positionConfirmPass = this.confirmPassword.offsetTop;
            this.scrollToView(positionConfirmPass)
            return;
        } else {
            this.setState({
                confirmPassword_error: ""
            })
        }

        if (validator.isEmpty(orgType + "")) {
            this.setState({
                orgType_error: "Please enter Orgnization Type"
            })
            var positionOrgtyp = this.orgType.offsetTop;
            this.scrollToView(positionOrgtyp)
            return;
        } else {
            this.setState({
                orgType_error: ""
            })
        }

        if (validator.isEmpty(orgName + "")) {
            this.setState({
                orgName_error: "Please enter Orgnization Name"
            })
            var positionOrgname = this.orgName.offsetTop;
            this.scrollToView(positionOrgname)
            return;
        } else {
            this.setState({
                orgName_error: ""
            })
        }

        if (validator.isEmpty(membership + "")) {
            this.setState({
                membership_error: "Please enter Membership or Voter size"
            })
            var positionMem = this.membership.offsetTop;
            this.scrollToView(positionMem)
            return;
        } else {
            this.setState({
                membership_error: ""
            })
        }

        if (validator.isEmpty(orgLoc + "")) {
            this.setState({
                orgLoc_error: "Please enter Orgnization Location"
            })
            var positionOrgLoc = this.orgLoc.offsetTop;
            this.scrollToView(positionOrgLoc)
            return;
        } else {
            this.setState({
                orgLoc_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        new ApiManager().singUp(
            firstname,
            lastname,
            email,
            password,
            orgType,
            orgName,
            membership,
            orgLoc
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
            }
            this.props.history.push('/verify-mail',{
            userEmail: email
            });
             new LocalStorage().setUserData(JSON.stringify(email))
            this.setState({
                isLoading: false,
                disableBtn: false
            })
            console.log("result after adding>>>", result);
        })

    }
}

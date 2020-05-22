import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ApiManager from './../../helper/ApiManager'
import { LocalStorage } from '../../helper/LocalStorage';

import MyTextField from './../../helper/MyTextField'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            name_error: "",

            email: "",
            email_error: "",

            membership: "",
            membership_error: "",

            password: "",
            password_error: "",

            confirmPassword: "",
            confirmPassword_error: "",

            currentPassword: "",
            currentPassword_error: "",


            btnLabel: "Edit",
            userData: "",

            successMsg: "",
            isLoading: false,
            disableFields: true,
            userId: ""

        }

    }

    componentDidMount() {
        // this.getUserById()
        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                name: this.userData.firstname + " " + this.userData.lastname,
                email: this.userData.email
            })
        }

    }

    // getUserById = () => {
    //     // console.log("this.props.user.user", this.props.user.user.userId)
    //     let id = this.props.user.user.userId
    //     this.setState({
    //         userId: this.props.user.user.userId
    //     })
    //     return (
    //         new ApiManager().userById(id).then(result => {
    //             if (result.no_result) {
    //                 return
    //             }
    //             if (result.error) {
    //                 return
    //             }
    //             if (result) {
    //                 if (result.data) {
    //                     this.setState({
    //                         userData: result.data
    //                     })
    //                     if (this.state.userData) {
    //                         this.setState({
    //                             name: this.state.userData.name,
    //                             phone: this.state.userData.phone,
    //                             email: this.state.userData.email,
    //                             dob: this.state.userData.dob,
    //                             education: this.state.userData.education,
    //                             job: this.state.userData.job,
    //                             address: this.state.userData.address,
    //                             joinDate: this.state.userData.joinDate,
    //                             image: this.state.userData.image
    //                         })
    //                     }
    //                     console.log("result.data", result.data)
    //                 }
    //             } else {
    //                 this.setState({
    //                     errorMsg: "Check your network..."
    //                 })
    //             }
    //         })
    //     )
    // }


    render() {
        return (
            <div>
                {
                    this.profileBody()
                }
            </div>
        )
    }


    profileBody = () => {
        const {
            name,
            name_error,
            email,
            email_error,
            membership,
            membership_error,
            password,
            password_error,
            confirmPassword,
            confirmPassword_error,
            currentPassword,
            currentPassword_error,

        } = this.state

        return (
            <div
                style={{
                    padding: "50px",
                    marginBottom: "50px"
                }}>

                <br />
                <div className="row">
                    <div className="col" style={{ textAlign: 'left' }}>
                        {/* <Card
                            style={{
                                padding: '50px'
                            }}> */}

                        <h3>Edit User</h3>
                        <br />
                        <div>
                            <MyTextField
                                reference={(ref) => this.name = ref}
                                label="Name"
                                placeholder="name"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={name}
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    });
                                }}
                                helperText={name_error ? name_error : ""}
                                error={name_error ? true : false}
                            />

                            <MyTextField
                                reference={(ref) => this.email = ref}
                                label="Email"
                                placeholder="email"
                                required={true}
                                disabled={this.state.disableFields}
                                type="text"
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
                                reference={(ref) => this.membership = ref}
                                label="Member or Voter Size"
                                placeholder="Member or voter size"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={membership}
                                onChange={(e) => {
                                    this.setState({
                                        membership: e.target.value
                                    });
                                }}
                                helperText={membership_error ? membership_error : ""}
                                error={membership_error ? true : false}
                            />

                            <MyTextField
                                reference={(ref) => this.password = ref}
                                label="Password"
                                placeholder="password"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
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
                                type="text"
                                disabled={this.state.disableFields}
                                value={confirmPassword}
                                onChange={(e) => {
                                    this.setState({
                                        confirmPassword: e.target.value
                                    });
                                }}
                                helperText={confirmPassword_error ? confirmPassword_error : ""}
                                error={confirmPassword_error ? true : false}
                            />

                            <MyTextField
                                reference={(ref) => this.currentPassword = ref}
                                label="Current Password"
                                placeholder="Current password"
                                required={true}
                                type="text"
                                disabled={this.state.disableFields}
                                value={currentPassword}
                                onChange={(e) => {
                                    this.setState({
                                        currentPassword: e.target.value
                                    });
                                }}
                                helperText={currentPassword_error ? currentPassword_error : ""}
                                error={currentPassword_error ? true : false}
                            />
                        </div>
                        <Button style={{ width: '150px', marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                this.editProfile()
                            }}>
                            {this.state.btnLabel}
                        </Button>
                        {/* </Card> */}

                    </div>
                    <div className="col"></div>
                </div>



            </div >
        )
    }


    editProfile = () => {
        const { userId, name, phone, dob, education, job, address, image } = this.state

        this.setState({
            disableFields: false,
            btnLabel: "Update"
        })

        ////
        if (this.state.btnLabel === "Update") {
            new ApiManager().updateUser(
                userId,
                name,
                phone,
                dob,
                education,
                job,
                address,
                image
            ).then(result => {
                this.setState({
                    isLoading: true,
                })
                if (result.no_result) {
                    this.setState({
                        isLoading: false,
                        btnLabel: "Edit",
                        disableFields: true

                    })
                    return
                }
                if (result.data) {
                    if (result.data.error) {
                        alert(result.data.error)
                        this.setState({
                            isLoading: false,
                            btnLabel: "Edit",
                            disableFields: true
                        })
                        return
                    }
                }
                this.setState({
                    isLoading: false,
                    btnLabel: "Edit",
                    disableFields: true
                })
                console.log("result after adding>>>", result);
            })
        }

        ////
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

}

export default withRouter(connect(mapStateToProps, actions)(Profile))
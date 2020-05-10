import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import MyTextField from '../../helper/MyTextField'

import Button from '@material-ui/core/Button';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            email_error: "",
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

    //fotgot main body
    mainBody = () => {
        const { email, email_error } = this.state;

        return (
            <div>
                <br />
                <br />
                <div style={{ width: "50%", marginLeft: '25%' }}>
                    <Card style={{ padding: '50px' }}>
                        <h5>Forgot your password?</h5>
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


                        <Button style={{}}
                            variant="contained"
                            className="btn btn-primary"
                            onClick={() => {
                                // this.forgotPassword()
                            }}
                            disabled={this.state.disableBtn}>
                            {
                                this.state.disableBtn ?
                                    <span className="spinner-border spinner-border-sm"></span>
                                    :
                                    undefined
                            }
                        Send me reset password instruction
                        </Button>
                        <br />
                        <br />
                        <Link
                            to='/login'
                            style={{
                                marginLeft: '20px',
                                textDecoration: "None",
                                color: 'blue',
                            }}
                        >Login</Link>
                        <Link
                            to='/signup'
                            style={{
                                marginLeft: '20px',
                                textDecoration: "None",
                                color: 'blue',
                            }}
                        >Signup</Link>
                        <br />
                    </Card>
                </div>
                <br />
                <br />
            </div>
        )
    }
}

import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import validator from 'validator';
import MyTextField from '../helper/MyTextField'

import Button from '@material-ui/core/Button';
export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accessKey: "",
            accessKey_error: "",
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
        const { accessKey, accessKey_error } = this.state;

        return (
            <div>
                <br />
                <br />
                <div style={{ width: "50%", marginLeft: '25%' }}>
                    <Card style={{ padding: '50px' }}>
                        <h5>Enter Your Access Key</h5>
                        <br />
                        <p>If you don't have a key, contact your organization's election administrator.</p>
                        <MyTextField
                            reference={(ref) => this.accessKey = ref}
                            label="Enter you Access Key"
                            required={true}
                            type="text"
                            value={accessKey}
                            onChange={(e) => {
                                this.setState({
                                    accessKey: e.target.value
                                });
                            }}
                            helperText={accessKey_error ? accessKey_error : ""}
                            error={accessKey_error ? true : false}
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
                        Start Voting
                        </Button>
                        <br />
                        <br />
                    </Card>
                </div>
                <br />
                <br />
            </div>
        )
    }
}

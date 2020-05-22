import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import validator from 'validator';

import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import MyTextField from '../helper/MyTextField'

import { LocalStorage } from '../helper/LocalStorage';
import ApiManager from '../helper/ApiManager'

export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            electionTitle: '',
            orgnization: '',
            candaidatebtn: '',
            candidates: '',
            voteCandidatePage: true,
            isLoading: false,
            isAccessKey: false,

            accessKey: "",
            accessKey_error: "",
            noAccessKeyString: ''
        }
        this.userData = '';

    }


    componentDidMount() {
        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                orgnization: this.userData.organizationName,
            })
        }

        // Get voters data
        // if (title) {
        //     new ApiManager().getCandidatesByTitle(title).then(result => {
        //         if (result.no_result) {
        //             return
        //         }
        //         if (result.data) {
        //             if (result.data.error) {
        //                 alert(result.data.error)
        //                 return
        //             }
        //         }
        //         if (result.data[0]) {
        //             if (result.data) {
        //                 console.log("result getCandidatesByTitle>>>", result.data);
        //                 this.setState({
        //                     candidates: result.data
        //                 })
        //             }
        //         }
        //     })
        // }
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
        const { accessKey, accessKey_error } = this.state;

        const handleChangecandidate = (event) => {
            this.setState({ candaidatebtn: event.target.value });
        };
        return (
            <div>
                <div className="container">
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: 'center', width: '70%', marginLeft: '15%' }}>
                    </div>

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
                                    this.getAccessToVoteFunction()
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
                            <div style={{ width: '100%', textAlign: 'center', color: 'green' }}>
                                <br />
                                <h6>{this.state.noAccessKeyString}</h6>
                            </div>
                            <br />
                        </Card>
                    </div>

                    <br />

                    {
                        this.state.isAccessKey ?
                            <div>
                                {
                                    this.state.voteCandidatePage ?
                                        <div>
                                            <table class="table" style={{ backgroundColor: 'rgb(225, 237, 255)', color: '', textAlign: 'left', width: '70%', marginLeft: '15%' }}>
                                                <thead >
                                                    <tr>
                                                        <th>
                                                            <h6>Candidates</h6>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <FormControl component="fieldset">
                                                                <RadioGroup aria-label="type" name="type" value={this.state.candaidatebtn} onChange={handleChangecandidate}>
                                                                    {
                                                                        this.state.candidates && this.state.candidates.map(function (item, i) {
                                                                            return (
                                                                                <FormControlLabel
                                                                                    style={{ marginBottom: '0px' }}
                                                                                    value={item}
                                                                                    control={<Radio />}
                                                                                    label={item} />
                                                                            )
                                                                        })
                                                                    }
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <Button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    style={{ width: '150px' }}
                                                    onClick={() => {
                                                        // this.props.history.push('/user/dashboard')
                                                        this.voteToCandidateFunction()

                                                    }}
                                                >   Vote   </Button>
                                            </div>
                                        </div>
                                        :
                                        <div style={{ width: '100%', textAlign: 'center', color: 'green' }}>
                                            <br />
                                            <h4>Your Vote has recorded!</h4>
                                        </div>

                                }
                            </div>
                            :
                            undefined
                    }

                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        )
    }

    voteToCandidateFunction = () => {
        console.log("candaidatebtn>", this.state.candaidatebtn)
        if (this.state.candaidatebtn) {

            this.setState({
                isLoading: true
            })

            // Post Vote To Candidate
            new ApiManager().voteToCandidateData(this.state.electionTitle, this.state.candaidatebtn).then(result => {
                if (result.no_result) {
                    this.setState({
                        isLoading: false
                    })
                    return
                }
                if (result.data) {
                    if (result.data.error) {
                        alert(result.data.error)
                        this.setState({
                            isLoading: false
                        })
                        return
                    }
                }

                this.setState({
                    voteCandidatePage: false,
                    isLoading: false
                })

                if (result.data) {
                    console.log("voteToCandidateFunction>>>", result.data);
                }
            })

        }
    }


    getAccessToVoteFunction = () => {
        const { accessKey, electionTitle } = this.state;


        if (validator.isEmpty(accessKey + "")) {
            this.setState({
                accessKey_error: "Please enter your Access Key"
            })
            var positionName = this.accessKey.offsetTop;
            this.scrollToView(positionName)
            return;
        } else {
            this.setState({
                accessKey_error: ""
            })
        }

        new ApiManager().getAccessForVote(electionTitle, accessKey).then(result => {
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
                if (result.data === "Key Matched.. You can vote now") {
                    this.setState({
                        isAccessKey: true,
                    })
                } else {
                    this.setState({
                        noAccessKeyString: result.data
                    })
                }

                console.log("voteToCandidateFunction>>>", result.data);
            }
        })
    }

}

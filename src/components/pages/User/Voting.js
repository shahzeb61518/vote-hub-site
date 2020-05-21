import React, { Component } from 'react'

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

export default class Voting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            electionTitle: '',
            orgnization: '',
            candaidatebtn: '',
            candidates: '',
            voteCandidatePage: true,
            isLoading: false
        }
        this.userData = '';

    }


    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const title = query.get('title')
        this.setState({
            electionTitle: title
        })


        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                orgnization: this.userData.organizationName,
            })
        }

        // Get voters data
        if (title) {
            new ApiManager().getCandidatesByTitle(title).then(result => {
                if (result.no_result) {
                    return
                }
                if (result.data) {
                    if (result.data.error) {
                        alert(result.data.error)
                        return
                    }
                }
                if (result.data[0]) {
                    if (result.data) {
                        console.log("result getCandidatesByTitle>>>", result.data);
                        this.setState({
                            candidates: result.data
                        })
                    }
                }
            })
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
                        <h4>Orgnization: {this.state.orgnization}</h4>
                        <h5>Title of Election: {this.state.electionTitle}</h5>
                    </div>

                    <br />
                    <br />
                    <br />
                    {
                        this.state.isLoading ?
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    position: 'absolute',
                                    marginLeft: '39%'
                                }}
                                class="spinner-border text-primary"></div>
                            :
                            undefined
                    }
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
                                                                return <FormControlLabel style={{ marginBottom: '0px' }} value={item} control={<Radio />} label={item} />
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
                                        class="btn btn-primary"
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
                            <div>
                                <h6>Your Vote has recorded!</h6>
                            </div>

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
                    return
                }
                if (result.data) {
                    if (result.data.error) {
                        alert(result.data.error)
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


}

import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

export default class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultStatus: "0 ballots submitted of 1 possible ballot — 0%",
            resultStatusLink: "Access Link: secure.vote-hub.com/m/RPkUKYQ/nc2ozvqxi3",
            electionTitle: '',
            votersData: '',
            candidatesData: '',
            resultData: []
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
                    // Get Result data
                    new ApiManager().getResult(this.props.location.state.title).then(result => {
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
                            console.log("getResultAndVotes>>>", result.data);
                            this.setState({
                                resultData: result.data
                            })

                        }
                    })


                    // get voters data
                    new ApiManager().getVotersData(this.props.location.state.title).then(result => {
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
                            console.log("result getVotersStepData>>>", result.data[0]);
                            this.setState({
                                votersData: result.data[0]
                            })

                        }
                    })


                    // get Candidates data
                    new ApiManager().getCandidatesByTitle(this.props.location.state.title).then(result => {
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
                            console.log("result getCandidatesByTitle>>>", result.data);
                            this.setState({
                                candidatesData: result.data
                            })

                        }
                    })
                }
            }
        }


    }

    render() {
        return (
            <div className="container">
                {
                    this.resultStep()
                }
            </div>
        )
    }

    // result step
    resultStep = () => {
        return (
            <div>
                <br />
                <br />
                <br />
                <div className="col-xs-12 ">
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist" style={{ width: '30%', float: 'left' }}>
                            <a className="nav-item nav-link active" id="nav-voters-tab" data-toggle="tab" href="#nav-voters" role="tab" aria-controls="nav-home" aria-selected="true">Voters</a>
                            <a className="nav-item nav-link" id="nav-result-tab" data-toggle="tab" href="#nav-result" role="tab" aria-controls="nav-profile" aria-selected="false">Result</a>
                        </div>
                    </nav>
                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-voters" role="tabpanel" aria-labelledby="nav-voters-tab">
                            <div>
                                <br />
                                <br />
                                <br />
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <Alert>
                                        {this.state.resultStatus}
                                    </Alert>
                                    <FormHelperText
                                        style={{ marginTop: '0px' }}
                                    >{this.state.resultStatusLink}
                                    </FormHelperText>
                                </div>



                                <br />
                                <div style={{ width: '100%', textAlign: 'right' }}>
                                    <input
                                        style={{ borderRadius: '5px' }}
                                        type="text"
                                        className="input"
                                        placeholder="Search"
                                    />
                                    <Button class="btn btn-light">Search</Button>

                                    <br />
                                    <Button class="btn btn-light"><li className="fa fa-download"></li>Download</Button>
                                </div>
                                <br />
                                <div style={{ textAlign: 'left', width: '100%' }}>
                                    <h3>Title: {this.state.votersData ? this.state.votersData.title : undefined}</h3>
                                    <br /> <br />


                                </div>
                                <Card style={{ padding: '20px' }}>
                                    <br></br>
                                    <br></br>
                                    <h4>Voters</h4>
                                    <br></br>

                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col"></div>
                                        <div className="col">
                                            <h5>Id</h5>
                                            {
                                                this.state.votersData.voterId && this.state.votersData.voterId.map(function (item, i) {
                                                    return (<p>{item}</p>)
                                                })
                                            }
                                        </div>
                                        <div className="col">
                                            <h5>Email</h5>
                                            {
                                                this.state.votersData.voterEmail && this.state.votersData.voterEmail.map(function (item2, j) {
                                                    return (<p>{item2}</p>)
                                                })
                                            }
                                        </div>
                                        <div className="col">
                                            <h5>Phone</h5>
                                            {
                                                this.state.votersData.voterEmail && this.state.votersData.voterNo.map(function (item3, j) {
                                                    return (<p>{item3}</p>)
                                                })
                                            }
                                        </div>
                                        {/* <div className="col"></div> */}
                                        <div className="col"></div>
                                        <div className="col"></div>
                                    </div>
                                    <br />
                                </Card>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="nav-result" role="tabpanel" aria-labelledby="nav-result-tab">
                            <br />
                            <br />
                            <br />
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <Alert>
                                    {this.state.resultStatus}
                                </Alert>
                                <FormHelperText
                                    style={{ marginTop: '0px' }}
                                >{this.state.resultStatusLink}
                                </FormHelperText>
                            </div>

                            <br />
                            <br />
                            <div style={{ textAlign: 'left', width: '100%' }}>
                                <h3>Title: {this.state.votersData ? this.state.votersData.title : undefined}</h3>
                            </div>
                            <Card style={{ padding: '20px' }}>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col">
                                        <br />

                                        <h4>Candidates & Votes</h4>
                                        <br />

                                        {
                                            this.state.candidatesData && this.state.candidatesData.map((item, i) => {
                                                return (
                                                    <>
                                                        <div className="row" key={i}>
                                                            <div className="col">
                                                                <h5>Name: {item}</h5>
                                                            </div>
                                                            <div className="col">
                                                                <h5>Votes: {this.getOccurrence(this.state.resultData, item)}</h5>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="col"></div>
                                </div>



                                <br />
                                <br />
                                <div className="row">
                                    <div className="col"></div>
                                    {/* <div className="col">
                                        <Alert>
                                            Voters: {this.state.resultData.voterlist ? this.state.resultData.voterlist : undefined}
                                        </Alert>
                                    </div>
                                    <div className="col">
                                        <Alert>
                                            Total Votes:  {this.state.resultData.votescount ? this.state.resultData.votescount : undefined}
                                        </Alert>
                                    </div> */}
                                    <div className="col"></div>
                                </div>
                                <br />
                                <br />
                            </Card>


                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div >
                <br />
                <br />
                <br />

            </div >
        )
    }


    getOccurrence = (array, value) => {
        return array.filter((v) => (v === value)).length;
    }

}

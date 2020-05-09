import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import validator from 'validator';
import MyTextField from '../../helper/MyTextField'

import Button from '@material-ui/core/Button';
import MyDropdown from '../../helper/MyDropdown'
import MaterialUIPickers from '../../helper/MyDatePicker'
import MenuItem from '@material-ui/core/MenuItem';

import Stepper from 'react-js-stepper'

import { Alert, AlertTitle } from '@material-ui/lab';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const steps = [
    { title: 'Details' },
    { title: 'Ballot' },
    { title: 'Notice' },
    { title: 'Voters' },
    { title: 'Review' },
    { title: 'Results' },
]

export default class NewElection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 1,
            btnLabel: 'Next',

            testorlivebtn: '',
            typebtn: '',
            remoteoronsitebtn: '',

            electionTitle: '',
            orgnization: '',
            emai: 'abc@gmail.com',
            voterLanguage: '',
            ballotbtn: '',
            voterbtn: '',
            adminbtn: '',
            viewbtn: '',
            startDateandTime: new Date(),
            endDateandTime: new Date(),

            resultStatus: "0 ballots submitted of 1 possible ballot — 0%",
            resultStatusLink: "Access Link: secure.electionbuddy.com/m/RPkUKYQ/nc2ozvqxi3",
            searchVoters: '',
        }


    }

    handleOnClickStepper = (step) => {
        this.setState({ activeStep: step });
    }

    handleOnClickNext = () => {

        let nextStep = this.state.activeStep + 1;
        this.setState({ activeStep: nextStep })
    }

    handleOnClickBack = () => {
        let prevStep = this.state.activeStep - 1;
        this.setState({ activeStep: prevStep })
    }


    // stepper function steps
    stepperFunction = () => {
        return (
            <React.Fragment >
                <Stepper

                    steps={steps}
                    activeStep={this.state.activeStep}
                    onSelect={this.handleOnClickStepper}
                    showNumber={false}
                />

                <div style={{ marginTop: '40px' }}>
                    {
                        this.state.activeStep === 1 ?
                            <div> {this.detailStep()} </div>
                            :
                            this.state.activeStep === 2 ?
                                <div> {this.ballotStep()}</div>
                                :
                                this.state.activeStep === 3 ?
                                    <div> {this.noticeStep()} </div>
                                    :
                                    this.state.activeStep === 4 ?
                                        <div> {this.votersStep()} </div>
                                        :
                                        this.state.activeStep === 5 ?
                                            <div> {this.reviewStep()} </div>
                                            :
                                            <div> {this.resultStep()} </div>

                    }
                </div>

                <div style={{ marginTop: '40px' }}>
                    {
                        this.state.activeStep === 1 ?
                            ''
                            :
                            <Button
                                class="btn btn-primary"
                                type="button"
                                onClick={this.handleOnClickBack}>Back</Button>
                    }
                    <Button
                        class="btn btn-primary"
                        type="button"
                        style={{ marginLeft: '10px', width: '130px' }}
                        onClick={this.state.activeStep === steps.length+ 1 ?
                            this.props.history.push('/user/dashboard')
                            :
                            this.handleOnClickNext
                        }>{
                            this.state.activeStep === steps.length ?
                                "Finish"
                                :
                                "Next"
                        }
                    </Button>

                </div>
            </React.Fragment>
        )
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

    //New Election main body
    mainBody = () => {

        return (
            <div className="container">
                <br />
                <br />
                {
                    this.stepperFunction()
                }
                <br />
                <br />
            </div>
        )
    }




    // detail step
    detailStep = () => {
        const handleChangeTestLive = (event) => {
            this.setState({ testorlivebtn: event.target.value });
        };

        const handleChangeType = (event) => {
            this.setState({ typebtn: event.target.value });
        };
        const handleChangeRemoteOrOnsite = (event) => {
            this.setState({ remoteoronsitebtn: event.target.value });
        };

        const handleChangeballotbtn = (event) => {
            this.setState({ ballotbtn: event.target.value });
        };
        const handleChangevoterbtn = (event) => {
            this.setState({ voterbtn: event.target.value });
        };
        const handleChangeadminbtn = (event) => {
            this.setState({ adminbtn: event.target.value });
        };
        const handleChangeviewbtn = (event) => {
            this.setState({ viewbtn: event.target.value });
        };


        return (
            <div style={{ textAlign: 'left' }}>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                To begin, start by answering questions about your election.
                </Alert>

                <br />
                <h4>Settings</h4>
                <h6>Test or Live</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="testing" name="testing" value={this.state.testorlivebtn} onChange={handleChangeTestLive}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="test" control={<Radio />} label="Test" />
                        <FormHelperText style={{ marginTop: '0px' }}>Try all our features for up to 5 voters by running a free test election. After you finish the test, duplicate this election and add your full voter list.</FormHelperText>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="live" control={<Radio />} label="Live" />
                        <FormHelperText style={{ marginTop: '0px' }}>Run your actual election: add your entire voter list and add only the features you want. If you are new to VOTE-HUB: An online Election System please choose the test option.</FormHelperText>
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
                <h6>Type</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.typebtn} onChange={handleChangeType}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="electionvote" control={<Radio />} label="Election Vote" />
                        <FormHelperText style={{ marginTop: '0px' }}>Create a ballot with one or more positions or questions, send notifications, gather votes, and collect results.</FormHelperText>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="meetingvote" control={<Radio />} label="Meeting Vote" />
                        <FormHelperText style={{ marginTop: '0px' }}>Voters register and vote on agenda items or motions during a meeting, conference, or class. </FormHelperText>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="announcment" control={<Radio />} label="Announcment" />
                        <FormHelperText style={{ marginTop: '0px' }}>Notify voters of a future election and collect nominations.</FormHelperText>
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
                <h6>Remote or Onsite Voting</h6>
                <span>Define where voters vote. You can send notice, gather votes and tally and collect results with all types.</span>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.remoteoronsitebtn} onChange={handleChangeRemoteOrOnsite}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="remotevot" control={<Radio />} label="Remote Voting — voters vote from their own home or office" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="bothvote" control={<Radio />} label="Both Remote Voting AND Onsite Election Voting" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="onsitevote" control={<Radio />} label="Onsite Voting — voters vote during a meeting or an AGM" />
                    </RadioGroup>
                </FormControl>
                <br />
                <br />

                <h4>Information</h4>
                <br />
                <h6>Election Title</h6>
                <div style={{ width: '40%' }}>
                    <MyTextField
                        reference={(ref) => this.electionTitle = ref}
                        label="ELection Title"
                        placeholder="Example: 2020 Board of Directors Election"
                        required={true}
                        type="text"
                        value={this.state.electionTitle}
                        onChange={(e) => {
                            this.setState({
                                electionTitle: e.target.value
                            });
                        }}
                    />
                </div>

                <FormHelperText style={{ marginTop: '0px' }}>Used in notice, ballots, results and dashboard. </FormHelperText>
                <FormHelperText style={{ marginTop: '0px' }}>Ex. 2022 Board Election, Motion 1 or 2022 Election Announcement. </FormHelperText>
                <br />
                <h6>Orgnization</h6>
                <FormHelperText style={{ marginTop: '0px' }}>Ex. 2022 Board Election, Motion 1 or 2022 Election Announcement.</FormHelperText>

                <div style={{ width: '40%' }}>
                    <MyDropdown
                        reference={(ref) => this.orgnization = ref}
                        required={true}
                        label="Ognization"
                        onChange={(e) => {
                            this.setState({
                                orgnization: e.target.value
                            })
                        }}
                    >
                        <MenuItem value={"None"} >None</MenuItem>
                    </MyDropdown>
                </div>

                <br />
                <br />
                <h6>Primary Election Administrator</h6>
                <p>{this.state.email} <li className="fa fa-pencil">Edit</li></p>
                <p>Ballots will include name and email to facilitate voter questions</p>

                <br />
                <br />
                <h6>Voter Language</h6>
                <div style={{ width: '40%' }}>
                    <MyDropdown
                        required={true}
                        label="Voter Language"
                        onChange={(e) => {
                            this.setState({
                                voterLanguage: e.target.value
                            })
                        }}
                    >
                        <MenuItem value={"english"} >English</MenuItem>
                        <MenuItem value={"italy"} >Italiano</MenuItem>
                        <MenuItem value={"french"} >French</MenuItem>
                        <MenuItem value={"nederlands"} >Nederlands</MenuItem>
                    </MyDropdown>

                </div>

                <br />
                <br />

                <h4>Dates</h4>
                <div style={{ textAlign: 'left', width: '20%' }}>
                    <MaterialUIPickers
                        label="Start Date and Time"
                        format="dd/MM/yyyy hh:mm"
                        value={this.state.startDateandTime}
                        onChange={(e) => {
                            this.setState({
                                startDateandTime: e,
                            })
                        }}
                    />
                    <MaterialUIPickers
                        label="End Date and Time"
                        value={this.state.endDateandTime}
                        format="dd/MM/yyyy hh:mm"
                        onChange={(e) => {
                            this.setState({
                                endDateandTime: e,
                            })
                        }}
                    />
                </div>


                <br />
                <br />

                <h4>Security</h4>
                <h6><li className="fa fa-lock"></li> SSL connection encryption is enabled automatically for all voters.</h6>
                <h6>Integrity and Ballot Access</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.ballotbtn} onChange={handleChangeballotbtn}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="high" control={<Radio />} label="High — VOTE-HUB: An online Election System creates a unique ballot link with a random, secret access key for each voter" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="medium" control={<Radio />} label="Medium — you create a unique election access link, and an access key for each voter" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="low" control={<Radio />} label="Low — you create a unique election access link that allows ballot access without an access key. Anyone can vote, and voters can submit multiple ballots" />
                    </RadioGroup>
                </FormControl>

                <br />
                <br />

                <h6>Voter Anonymity</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.voterbtn} onChange={handleChangevoterbtn}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="secret" control={<Radio />} label="Secret Ballot — voter choices cannot be linked to voters" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="poll" control={<Radio />} label="Poll — voter choices are linked to voters for election administrators only" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="show" control={<Radio />} label="Show of Hands — voter choices are linked to voters and shared with administrators and voters" />
                    </RadioGroup>
                </FormControl>

                <br />
                <br />

                <h6>Election administrator may view the election results</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.adminbtn} onChange={handleChangeadminbtn}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="elecstart" control={<Radio />} label="any time after the election starts" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="elecend" control={<Radio />} label="only after the election has ended" />
                    </RadioGroup>
                </FormControl>

                <br />
                <br />

                <h6>Voters may view the election results</h6>
                <p>Results are never automatically sent to your voters. </p>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.viewbtn} onChange={handleChangeviewbtn}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="elecstart" disabled control={<Radio />} label="any time after the election starts" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="elecend" control={<Radio />} label="only after the election has ended" />
                        <FormControlLabel style={{ marginBottom: '0px' }} value="view" control={<Radio />} label="don't allow voters to view the results" />
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
            </div>
        )
    }

    // ballot step
    ballotStep = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                <Alert severity="info">
                    Design your ballot - add instructions, positions and questions.
                </Alert>
                <br />
                <br />
                <h4>Ballot Information and Instructions</h4>
                <Alert severity="info">
                    Share overall instructions, overall voting guidelines and how winners will be selected. Add website links too! Do not add specific candidate or question information, you will do that when you design each position or question below.
                </Alert>
                <div style={{ width: '100%' }}>
                    <textarea style={{ width: '100%' }} />
                </div>
                <br />
                <br />
                <h4>Positions and Questions</h4>
                <Alert severity="info">
                    Add positions, questions, bylaws or other items being voted on. Edit titles or options by clicking their text boxes and upload documents learn more. To reorder items, click on the blue boxes to the left of each item and drag them up or down. You will add specific candidate or question information when you design each position or question below.
                </Alert>
                <br />
                <br />
                <Button class="btn btn-primary"><li className="fa fa-plus"> </li> Add position or question</Button>
                <br />
                <br />
            </div>
        )
    }

    // notice step
    noticeStep = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                <h4>Notifications</h4>
                <Alert severity="info">
                    Specify how voters will receive notices and access keys — choose any of the following:
                </Alert>

                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox2"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="checkbox2"
                        >Email notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >We email each voter the announcement and a link to the nomination ballot — highest anonymity.
                    </FormHelperText>
                    </div>
                </div>

                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox3"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="checkbox3"
                        >SMS notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >We send each voter the announcement via text message to their mobile phone.
                    </FormHelperText>
                    </div>
                </div>



                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox4"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="checkbox4"
                        >Postal notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >We send each voter the announcement via physical mail.
                    </FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox5"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="checkbox5"
                        >Printed notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >You receive a printable PDF file that includes, for each voter, voting instructions and a link with a access key.
                    </FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox6"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="checkbox6"
                        >Create Notices Yourself</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >You receive a list of access keys that you can add to your own e-newsletter, printed documents or invoices.
                    </FormHelperText>
                    </div>
                </div>

                <br />
                <br />
                <h4>Notice Templates</h4>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox7"

                    />
                    <label
                        className="custom-control-label"
                        htmlFor="checkbox7"
                    >Advanced Notice Customization</label>
                    <FormHelperText
                        style={{ marginTop: '0px' }}
                    >Edit notice messages to fit your organizations standards or to add multilingual support.
                   </FormHelperText>
                    <FormHelperText
                        style={{ marginTop: '0px' }}
                    >This selection impacts your ability to customize reminders and results notifications when your election is live and complete.
                    </FormHelperText>
                </div>
                <br />
                <br />
            </div>
        )
    }

    // voters step
    votersStep = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                <Alert severity="info">
                    Select how each voter accesses their ballot and the number of votes they receive.
            </Alert>
                <br />
                <br />
                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn1"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn1"
                        >Ballot ID</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        > Assign an unique identifier to each voter to better manage voter lists — eg. member ID.</FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn2"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn2"
                        >Voter Label</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >Assign a label to each voter to personalize notices and manage voter lists — eg. name. </FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn3"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn3"
                        >Weighted Ballots</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >Multiple votes per voter — eg. home owner elections use square footage to assign votes. </FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn4"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn4"
                        >Voting Groups</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >Categorize each voter to a group and allow groups to vote on specific questions.</FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn5"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn5"
                        >Two Factor Authentication</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >Increase voter integrity by verifying the voter with a text message or voter password.</FormHelperText>
                    </div>
                </div>


                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkboxn6"
                        /><label
                            className="custom-control-label"
                            htmlFor="checkboxn6"
                        >Reporting Groups</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >Add groups like Gender or Location to your voting list so that your results can be summarized. </FormHelperText>
                    </div>

                </div>

                <br />
                <br />
                <h4>Voter Information</h4>
                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>I would like
                <input style={{ borderRadius : '5px' , padding: '20px', width: '60px' }} value="0" /> manual keys to give to voters that don't have addresses.</div>
                <br />
                <br />
                <h4>Extra Voters</h4>
                <Alert severity="info">
                    If you anticipate new voters will join your election after it starts, reserve extra keys.
                </Alert>
                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    Reserve <input style={{ borderRadius : '5px' , padding: '20px', width: '60px' }} value="1" /> extra keys.
                </div>
                <br />
                <br />
            </div >
        )
    }

    // review step
    reviewStep = () => {
        return (
            <div>
                <Alert severity="info">
                    To start your election, complete the following review tasks.
                </Alert>
                <br />
                <br />
                <table class="table">
                    <thead style={{ backgroundColor: 'black', color: 'white' }}>
                        <tr>
                            <th>Tasks</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <h6>Test the Ballot</h6>
                                <p>See how your voters will vote</p>
                            </td>
                            <td>Test vote is NOT completed</td>
                            <td>
                                <Button class="btn btn-light">Test</Button>
                            </td>
                        </tr>


                        <tr >
                            <td style={{ textAlign: 'left' }}>
                                <h6>Review the Voter List</h6>
                                <p>Confirm the people that can vote</p>
                            </td>
                            <td>Voter list is NOT reviewed</td>
                            <td>
                                <Button class="btn btn-light">Review</Button>
                            </td>
                        </tr>

                        <tr >
                            <td style={{ textAlign: 'left' }}>
                                <h6>Verify Election Details</h6>
                                <p>Certify information, dates & security</p>
                            </td>
                            <td>Election details are NOT verified</td>
                            <td>
                                <Button class="btn btn-light"> Verify</Button>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <h6>Confirm Terms & Conditions</h6>
                                <p>What you CAN & CAN'T do</p>
                            </td>
                            <td>Terms & conditions are NOT confirmed</td>
                            <td>
                                <Button class="btn btn-light"> Confirm</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <Alert severity="info">
                    Before you can start your election, you must complete the above tasks.
                </Alert>
                <br />
            </div>
        )
    }



    // result step
    resultStep = () => {
        return (
            <div>
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
                <table class="table">
                    <thead style={{ backgroundColor: 'black', color: 'white' }}>
                        <tr>
                            <th>Select</th>
                            <th>Label</th>
                            <th>Status</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'left' }}>
                        <tr>
                            <td>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="resultchkbox1"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="resultchkbox1"
                                    ></label>
                                </div>
                            </td>
                            <td>Abc</td>
                            <td>Not Voted</td>
                            <td>Abc@gmail.com</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="resultchkbox2"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="resultchkbox2"
                                    ></label>
                                </div>
                            </td>
                            <td>XYZ</td>
                            <td>Not Voted</td>
                            <td>XYZ@gmail.com</td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}
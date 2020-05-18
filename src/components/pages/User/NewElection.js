import React, { Component } from 'react'

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
import FormHelperText from '@material-ui/core/FormHelperText';

import validator from 'validator';

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

import MyModal, { toggleModal } from '../../helper/MyModal';

const ADDPOSITION_ID = "addpositionmodal"

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
            typebtn: 'electionvote',
            remoteoronsitebtn: 'remotevot',

            electionTitle: '',
            electionTitle_error: '',
            orgnization: '',
            orgnizationLocation: '',
            orgnization_error: '',
            startDateandTime: new Date(),
            endDateandTime: new Date(),

            successMsg: "",
            isLoading: false,
            disableBtn: false,

            electiontitleballot: '',
            ballotInfo: '',
            instructions: '',
            postionorquestion: 'multiple',

            noOfCondidate: '',
            positionOrQuestionsNext: false,
            email: '',
            voterLanguage: 'english',
            ballotbtn: '',
            voterbtn: '',
            adminbtn: '',
            viewbtn: '',

            votersstepemail: false,
            votersstepphone: false,
            phone: '',
            voterInfo: 'copypaste',

            votersstepid: '',
            voterstepemail: '',
            votersstepphone: '',


            textColorReview1: '#c30019',
            textColorReview2: '#c30019',
            textColorReview3: '#c30019',
            textColorReview4: '#c30019',
            reviewText1: 'Test vote is NOT completed',
            reviewText2: 'Voter list is NOT reviewed',
            reviewText3: 'Election details are NOT verified',
            reviewText4: 'Terms & conditions are NOT confirmed',

            resultStatus: "0 ballots submitted of 1 possible ballot — 0%",
            resultStatusLink: "Access Link: secure.electionbuddy.com/m/RPkUKYQ/nc2ozvqxi3",
            searchVoters: '',


            candidateNameObject: {},
            candidateDescriptionObject: {},

        }

        this.userData = '';
        this.counterName = 1;
        this.counterDes = 1;
    }

    componentDidMount() {
        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                orgnization: this.userData.organizationName,
                orgnizationLocation: this.userData.organizationLocation,
                email: this.userData.email
            })
        }
    }

    handleOnClickStepper = (step) => {
        this.setState({ activeStep: step });
    }

    handleOnClickNext = () => {
        if (this.state.activeStep === 1) {
            this.addDetailsStep()

        } else if (this.state.activeStep === 2) {
            this.addBallotStep()

        } else if (this.state.activeStep === 3) {
            let nextStep = this.state.activeStep + 1;
            this.setState({ activeStep: nextStep })

        } else if (this.state.activeStep === 4) {
            this.addVotersStep()

        } else if (this.state.activeStep === 5) {
            let nextStep = this.state.activeStep + 1;
            this.setState({ activeStep: nextStep })

        } else if (this.state.activeStep === 6) {
            // this.()
        }
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
                        style={{ marginLeft: '10px', minwidth: '130px' }}
                        onClick={this.state.activeStep === steps.length + 1 ?
                            this.props.history.push('/user/dashboard')
                            :
                            this.handleOnClickNext
                        }>{
                            this.state.activeStep === steps.length ?
                                "Finish"
                                :
                                "Save and Next"
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




    // detail step DESIGN
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

        const handleChangepositionbtn = (event) => {
            this.setState({ postionorquestion: event.target.value });
        }

        return (
            <div style={{ textAlign: 'left' }}>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                To begin, start by answering questions about your election.
                </Alert>

                <br />
                <h4>Settings</h4>
                {/* <h6>Test or Live</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="testing" name="testing" value={this.state.testorlivebtn} onChange={handleChangeTestLive}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="test" control={<Radio />} label="Test" />
                        <FormHelperText style={{ marginTop: '0px' }}>Try all our features for up to 5 voters by running a free test election. After you finish the test, duplicate this election and add your full voter list.</FormHelperText>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="live" control={<Radio />} label="Live" />
                        <FormHelperText style={{ marginTop: '0px' }}>Run your actual election: add your entire voter list and add only the features you want. If you are new to VOTE-HUB: An online Election System please choose the test option.</FormHelperText>
                    </RadioGroup>
                </FormControl>
                <br /> */}
                <br />
                <h6>Type</h6>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type" value={this.state.typebtn} onChange={handleChangeType}>
                        <FormControlLabel style={{ marginBottom: '0px' }} value="electionvote" control={<Radio />} label="Election Vote" />
                        <FormHelperText style={{ marginTop: '0px' }}>Create a ballot with one or more positions or questions, send notifications, gather votes, and collect results.</FormHelperText>
                        <FormControlLabel disabled style={{ marginBottom: '0px' }} value="meetingvote" control={<Radio />} label="Meeting Vote" />
                        <FormHelperText style={{ marginTop: '0px' }}>Voters register and vote on agenda items or motions during a meeting, conference, or class. </FormHelperText>
                        <FormControlLabel disabled style={{ marginBottom: '0px' }} value="announcment" control={<Radio />} label="Announcment" />
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
                        <FormControlLabel disabled style={{ marginBottom: '0px' }} value="bothvote" control={<Radio />} label="Both Remote Voting AND Onsite Election Voting" />
                        <FormControlLabel disabled style={{ marginBottom: '0px' }} value="onsitevote" control={<Radio />} label="Onsite Voting — voters vote during a meeting or an AGM" />
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
                        value={this.state.orgnization}
                        onChange={(e) => {
                            this.setState({
                                orgnization: e.target.value
                            })
                        }}
                    >
                        <MenuItem value={
                            this.state.orgnization ?
                                this.state.orgnization
                                :
                                "none"
                        } >
                            {
                                this.state.orgnization ?
                                    this.state.orgnization
                                    :
                                    "NONE"
                            }
                        </MenuItem>
                    </MyDropdown>
                </div>
                <h6>Location: {this.state.orgnizationLocation}</h6>

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
                        value={this.state.voterLanguage}
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

                {/* <div>
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
                </div> */}
                <br />
                <br />
            </div>
        )
    }

    // detail step FUNCTION
    addDetailsStep = () => {
        const {
            electionTitle,
            orgnization,
            startDateandTime,
            endDateandTime
        } = this.state;

        if (validator.isEmpty(electionTitle + "")) {
            this.setState({
                electionTitle_error: "Please enter your Election Title"
            })
            var positionelectionTitle = this.electionTitle.offsetTop;
            this.scrollToView(positionelectionTitle)
            return;
        } else {
            this.setState({
                electionTitle_error: ""
            })
        }

        if (validator.isEmpty(orgnization + "")) {
            this.setState({
                orgnization_error: "Please enter your "
            })
            var positionorgnization = this.orgnization.offsetTop;
            this.scrollToView(positionorgnization)
            return;
        } else {
            this.setState({
                orgnization_error: ""
            })
        }



        this.setState({
            disableBtn: true
        })

        new ApiManager().addElection(
            electionTitle,
            orgnization,
            startDateandTime,
            endDateandTime
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
            let nextStep = this.state.activeStep + 1;
            this.setState({
                activeStep: nextStep,
                electiontitleballot: electionTitle
            })
            console.log("result after adding>>>", result);
        })
    }
    // detail step get FUNCTION
    // getDetailsStepData = () => {
    //     new ApiManager().getElectionData().then(result => {
    //         if (result.no_result) {
    //             this.setState({
    //                 isLoading: false,
    //                 disableBtn: false,
    //             })
    //             return
    //         }
    //         if (result.data) {
    //             if (result.data.error) {
    //                 alert(result.data.error)
    //                 this.setState({
    //                     isLoading: false,
    //                     disableBtn: false,
    //                 })
    //                 return
    //             }
    //         }
    //         if (result.data) {
    //             console.log("result after result.data>>>", result.data);

    //         }
    //     })
    // }

    // ballot step

    ballotStep = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                <h5>Election Title: {this.state.electiontitleballot}</h5>
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
                    <textarea
                        style={{
                            width: '100%',
                            padding: '5px',
                            borderRadius: '5px'
                        }}
                        onChange={(e) => this.setState({ ballotInfo: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </div>
                <br />
                <br />
                <h4>Positions and Questions</h4>
                <Alert severity="info">
                    Add positions, questions, bylaws or other items being voted on. Edit titles or options by clicking their text boxes and upload documents learn more. To reorder items, click on the blue boxes to the left of each item and drag them up or down. You will add specific candidate or question information when you design each position or question below.
                </Alert>
                <br />
                <br />
                {this.addPositionModal()}
                <Button
                    class="btn btn-primary"
                    onClick={() => {
                        toggleModal(ADDPOSITION_ID)
                    }}
                >
                    <li className="fa fa-plus">
                    </li> Add position or question</Button>
                <br />
                <br />
            </div>
        )
    }
    // MODAL OF BALLOTS
    addPositionModal = () => {
        return (
            <MyModal
                modal_id={ADDPOSITION_ID}
                title={"Add Positions or Questions"}
                action_btn_title="Create"
                action_btn_color="primary"
                cancelModal="modal"
                large_modal='modal-lg'
            // action={this.actionfucntion}
            >
                <span>
                    <div className="justify-content-center" style={{ padding: '10px' }}>
                        {
                            this.state.positionOrQuestionsNext == false ?
                                <div>
                                    <div style={{ width: '100%' }}>
                                        <h6>Select a position or question type</h6>
                                    </div>
                                    <br />
                                    <div style={{ width: '100%' }}>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="type" name="type" value={this.state.postionorquestion} onChange={this.handleChangepositionbtn}>
                                                <FormControlLabel style={{ marginBottom: '0px' }} value="multiple" control={<Radio />} label="Multiple candidates for 1 vacancy — eg. vote for a President or Vice President" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Multiple candidates for 2 or more vacancies — eg. vote for 3 of 5 directors" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Single candidate for 1 vacancy — eg. ratify or acclaim 1 candidate" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Yes or No — eg. approve or reject a bylaw amendment, budget, contract or a question" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Referendums or Polls — eg. vote for options on initiatives and gather comments" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Surveys — eg. collect information by scoring options on a Likert rating scale" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Nominations — eg. collect names when you don't have candidates running for a position" />
                                                <FormControlLabel
                                                    disabled
                                                    style={{ marginBottom: '0px' }}
                                                    value="elecend"
                                                    control={<Radio />} label="Start with a blank question" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <br />
                                    <hr />
                                    <br />
                                    <h6>Select how many candidates you have</h6>
                                    <Alert severity="info">
                                        If you have more than 20 candidates, you can continue adding candidates after you create this question or position.
                        </Alert>
                                    <h6>Number of candidates</h6>
                                    <div style={{ width: '50%' }}>
                                        <MyDropdown
                                            required={true}
                                            label="No of Condidate"
                                            value={this.state.noOfCondidate}
                                            onChange={(e) => {
                                                this.setState({
                                                    noOfCondidate: e.target.value,
                                                    positionOrQuestionsNext: true
                                                })
                                            }}
                                        >
                                            <MenuItem value={"2"} >2</MenuItem>
                                            <MenuItem value={"3"} >3</MenuItem>
                                            <MenuItem value={"4"} >4</MenuItem>
                                            <MenuItem value={"5"} >5</MenuItem>
                                            <MenuItem value={"6"} >6</MenuItem>
                                            <MenuItem value={"7"} >7</MenuItem>
                                            <MenuItem value={"8"} >8</MenuItem>
                                            <MenuItem value={"9"} >9</MenuItem>
                                            <MenuItem value={"10"} >10</MenuItem>
                                            <MenuItem value={"11"} >11</MenuItem>
                                            <MenuItem value={"12"} >12</MenuItem>
                                            <MenuItem value={"13"} >13</MenuItem>
                                            <MenuItem value={"14"} >14</MenuItem>
                                            <MenuItem value={"15"} >15</MenuItem>
                                            <MenuItem value={"16"} >16</MenuItem>
                                            <MenuItem value={"17"} >17</MenuItem>
                                            <MenuItem value={"18"} >18</MenuItem>
                                            <MenuItem value={"19"} >19</MenuItem>
                                            <MenuItem value={"20"} >20</MenuItem>
                                        </MyDropdown>

                                    </div>
                                </div>
                                :
                                <div>
                                    <br />
                                    <br />
                                    <h5>Position and Questions</h5>
                                    <br />
                                    <div>
                                        <div style={{ width: '60%', marginLeft: '20%' }}>
                                            <MyTextField
                                                label="Position"
                                                required={true}
                                                type="text"
                                                value={this.state.position}
                                                onChange={(e) => {
                                                    this.setState({
                                                        position: e.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <br />

                                    </div>
                                    <div>
                                        <div style={{ width: '60%', marginLeft: '20%' }}>
                                            <label>Candidate Name</label>
                                            <input
                                                style={{
                                                    width: '100%',
                                                    padding: '5px',
                                                    borderRadius: '5px'
                                                }}
                                                ref="input"
                                                placeholder="Candidate Name"
                                            />
                                            <br />
                                            <label>Description</label>
                                            <textarea
                                                ref="textarea"
                                                placeholder="description"
                                                style={{
                                                    width: '100%',
                                                    padding: '5px',
                                                    borderRadius: '5px'
                                                }} />
                                        </div>
                                        <br />
                                        <Button
                                            className="btn btn-primary"
                                            style={{ marginLeft: '40%' }}
                                            onClick={() => {
                                                if (this.refs.input.value.trim() != "") {
                                                    if (this.refs.textarea.value.trim() != "") {
                                                        const candidateNameObject = this.state.candidateNameObject;
                                                        const candidateDescriptionObject = this.state.candidateDescriptionObject;
                                                        candidateNameObject['name' + this.counterName++] = this.refs.input.value;
                                                        candidateDescriptionObject['descriotion' + this.counterDes++] = this.refs.textarea.value;
                                                        this.setState({ candidateNameObject });
                                                        this.setState({ candidateDescriptionObject });
                                                        this.refs.input.select();
                                                        this.refs.textarea.select();
                                                    }
                                                }
                                                console.log("candidateDescriptionObject", this.state.candidateDescriptionObject)
                                            }}>Add Candidate</Button>
                                        <br /><br />
                                        <div>
                                            <ul>{Object.values(this.state.candidateNameObject)
                                                .map(name =>
                                                    <li>
                                                        <Alert severity="info">
                                                            Name: {name}
                                                        </Alert></li>)}
                                            </ul>
                                            <ul>{Object.values(this.state.candidateDescriptionObject)
                                                .map(des =>
                                                    <li>
                                                        <Alert severity="info">
                                                            Description: {des}
                                                        </Alert></li>)}
                                                <br />
                                                <br />
                                            </ul>
                                        </div>
                                        <br />
                                        <br />
                                        <h6>Voter Instructions</h6>
                                        <Alert severity="info">
                                            The settings result in the following instructions:
                                          </Alert>
                                        <div style={{ width: '100%' }}>
                                            <textarea
                                                style={{
                                                    width: '100%',
                                                    padding: '5px',
                                                    borderRadius: '5px'
                                                }}
                                                onChange={(e) => this.setState({ instructions: e.target.value })}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                        {/* <div style={{ width: '60%', marginLeft: '20%' }}>
                                            <MyTextField
                                                label="Candidate Name"
                                                required={true}
                                                type="text"
                                                value={this.state.candidateName}
                                                onChange={(e) => {
                                                    this.setState({
                                                        candidateName: e.target.value
                                                    });
                                                }}
                                            />
                                            <textarea
                                                placeholder="description"
                                                style={{ width: '100%' }} />

                                        </div>
                                     */}
                                    </div>
                                    <div></div>
                                </div>
                        }

                    </div>
                </span>
            </MyModal>
        )
    }
    // BALLOTS step FUNCTION
    addBallotStep = () => {
        const {
            electiontitleballot,
            ballotInfo,
            postionorquestion,
            noOfCondidate,
            details,
            position,
            candidateNameObject,
            candidateDescriptionObject,
            instructions
        } = this.state;


        this.setState({
            disableBtn: true
        })

        new ApiManager().createBallot(
            electiontitleballot,
            ballotInfo,
            postionorquestion,
            noOfCondidate,
            details,
            position,
            candidateNameObject,
            candidateDescriptionObject,
            instructions
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
            let nextStep = this.state.activeStep + 1;
            this.setState({ activeStep: nextStep })
            console.log("result after adding>>>", result);
        })
    }
    // Ballot step get FUNCTION
    // getBallotStepData = () => {
    //     new ApiManager().getBallotData().then(result => {
    //         if (result.no_result) {
    //             this.setState({
    //                 isLoading: false,
    //                 disableBtn: false,
    //             })
    //             return
    //         }
    //         if (result.data) {
    //             if (result.data.error) {
    //                 alert(result.data.error)
    //                 this.setState({
    //                     isLoading: false,
    //                     disableBtn: false,
    //                 })
    //                 return
    //             }
    //         }
    //         if (result.data) {
    //             console.log("result after result.data>>>", result.data);
    //         }
    //     })
    // }

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
                            id="votersstepemail"
                            checked={true}
                            onChange={() => {
                                this.setState({
                                    votersstepemail: true
                                })
                            }
                            }
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="votersstepemail"
                        >Email notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >We email each voter the announcement and a link to the nomination ballot — highest anonymity.
                    </FormHelperText>
                        {this.state.votersstepemail ?
                            <div style={{ width: '40%' }}>
                                <MyTextField
                                    label="Email"
                                    required={true}
                                    type="text"
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.setState({
                                            email: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            :
                            undefined
                        }
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
                            id="votersstepphone"
                            checked={true}
                            onChange={() => {
                                this.setState({
                                    votersstepphone: true
                                })
                            }
                            }
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="votersstepphone"
                        >SMS notices</label>
                        <FormHelperText
                            style={{ marginTop: '0px' }}
                        >We send each voter the announcement via text message to their mobile phone.
                    </FormHelperText>
                        {this.state.votersstepphone ?
                            <div style={{ width: '40%' }}>
                                <MyTextField
                                    label="Phone"
                                    required={true}
                                    type="text"
                                    value={this.state.phone}
                                    onChange={(e) => {
                                        this.setState({
                                            phone: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            :
                            undefined
                        }
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
                            disabled
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
                            disabled
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
                            disabled
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
                        disabled
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
        const handleChangeVoterInfo = (event) => {
            this.setState({ voterInfo: event.target.value });
        };
        return (
            <div style={{ textAlign: 'left' }}>
                <div>
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
                </div>


                <br />
                <br />
                <h4>Voter Information</h4>
                <br />
                <div>
                    <Alert severity="info">
                        Add eligible voters from a previous election, from another application, by copying and pasting from Excel or Google Sheets, or by typing details into each cell. After adding your voters, please validate your voter list using the "Validate" button. For this test election, you can only have 5 voters.
                 </Alert>
                    <br />
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="type" name="type" value={this.state.voterInfo} onChange={handleChangeVoterInfo}>
                            <FormControlLabel disabled style={{ marginBottom: '0px' }} value="usevoterlist" control={<Radio />} label="Use a voter list from a prior election" />
                            <FormControlLabel style={{ marginBottom: '0px' }} value="copypaste" control={<Radio />} label="Copy and paste or type a voter list (use with lists with less than 5,000 voters)" />
                            <FormControlLabel disabled style={{ marginBottom: '0px' }} value="import" control={<Radio />} label="Import from a CSV file (typically only for lists with more than 5,000 voters)" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <br />
                    {/* <div className="row">
                        <div className="col">
                            <p>ID</p>
                        </div>
                        <div className="col">
                            <p>Email</p>

                        </div>
                        <div className="col">
                            <p>Phone</p>

                        </div>
                    </div> */}
                    <table class="table">
                        <thead style={{ backgroundColor: 'black', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="input"
                                        placeholder="Id"
                                    />
                                </td>
                                <td>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="input"
                                        placeholder="Email"
                                    />
                                </td>
                                <td>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="input"
                                        placeholder="Phone"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button
                        className="btn btn-primary"
                        style={{ marginLeft: '40%' }}
                        onClick={() => {
                            if (this.refs.input.value.trim() != "") {
                                const candidateIdObject = this.state.candidateIdObject;
                                const candidateEmailObject = this.state.candidateEmailObject;
                                const candidatePhoneObject = this.state.candidatePhoneObject;
                                candidateIdObject['Id' + this.counterId++] = this.refs.input.value;
                                candidateEmailObject['Email' + this.counterEmail++] = this.refs.input.value;
                                candidatePhoneObject['Phone' + this.counterPhone++] = this.refs.input.value;
                                this.setState({ candidateIdObject });
                                this.setState({ candidateEmailObject });
                                this.setState({ candidatePhoneObject });
                                this.refs.input.select();
                                this.refs.input.select();
                                this.refs.input.select();
                            }
                            console.log("candidateIdObject", this.state.candidateIdObject)
                            console.log("candidateEmailObject", this.state.candidateEmailObject)
                            console.log("candidatePhoneObject", this.state.candidatePhoneObject)
                        }}>Add Candidate</Button>
                    <br />
                </div>

                <div style={{
                    background: '#e8e8e8',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>I would like
                <input style={{ borderRadius: '5px', padding: '20px', width: '60px' }} value="0" /> manual keys to give to voters that don't have addresses.</div>
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
                    Reserve <input style={{ borderRadius: '5px', padding: '20px', width: '60px' }} value="1" /> extra keys.
                </div>
                <br />
                <br />
            </div >
        )
    }
    // voters step FUNCTION
    addVotersStep = () => {
        const {
            email,
            phone,
        } = this.state;

        this.setState({
            disableBtn: true
        })
        var voterId = Math.floor(performance.now() * 10000000000000) + '';
        console.log("voterId>", voterId);

        new ApiManager().addVotersData(
            voterId,
            email,
            phone,
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
            let nextStep = this.state.activeStep + 1;
            this.setState({
                activeStep: nextStep
            })
            console.log("result after adding>>>", result);
        })
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
                            <td style={{ color: this.state.textColorReview1 }}>{this.state.reviewText1}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            reviewText1: 'Test vote is completed',
                                            textColorReview1: '#17BF3C'
                                        })
                                    }}
                                    class="btn btn-light">Test</Button>
                            </td>
                        </tr>


                        <tr >
                            <td style={{ textAlign: 'left' }}>
                                <h6>Review the Voter List</h6>
                                <p>Confirm the people that can vote</p>
                            </td>
                            <td style={{ color: this.state.textColorReview2 }}>{this.state.reviewText2}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            reviewText2: 'Voter list is reviewed',
                                            textColorReview2: '#17BF3C'
                                        })
                                    }}
                                    class="btn btn-light">Review</Button>
                            </td>
                        </tr>
                        <tr >
                            <td style={{ textAlign: 'left' }}>
                                <h6>Verify Election Details</h6>
                                <p >Certify information, dates & security</p>
                            </td>
                            <td style={{ color: this.state.textColorReview3 }}>{this.state.reviewText3}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            reviewText3: 'Election details are verified',
                                            textColorReview3: '#17BF3C'
                                        })
                                    }}
                                    class="btn btn-light"> Verify</Button>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <h6>Confirm Terms & Conditions</h6>
                                <p>What you CAN & CAN'T do</p>
                            </td>
                            <td style={{ color: this.state.textColorReview4 }}>{this.state.reviewText4}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            reviewText4: 'Terms & conditions are confirmed',
                                            textColorReview4: '#17BF3C'
                                        })
                                    }}
                                    class="btn btn-light"> Confirm</Button>
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


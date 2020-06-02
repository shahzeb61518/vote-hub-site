import React, { Component } from 'react'
import moment from 'moment';

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
import { connect } from 'react-redux'

import { LocalStorage } from '../../helper/LocalStorage';
import ApiManager from '../../helper/ApiManager'

import MyModal, { toggleModal } from '../../helper/MyModal';

const ADDPOSITION_ID = "addpositionmodal"
const REVIEWSTEP_TEST_ID = "reviewsteptest"
const REVIEWSTEP_REVIEW_ID = "reviewstepreview"
const REVIEWSTEP_VERIFY_ID = "reviewstepverify"
const REVIEWSTEP_CONFIRM_ID = "reviewstepconfirm"

const steps = [
    { title: 'Details' },
    { title: 'Ballot' },
    { title: 'Notice' },
    { title: 'Voters' },
    { title: 'Review' },
    { title: 'Results' },
]

class NewElection extends Component {
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

            searchVoters: '',


            candidateNameObject: [],
            candidateDescriptionObject: [],

            votersId1: '',
            votersId2: '',
            votersId3: '',
            votersId: '',
            candidateIdObject: [],
            candidateEmailObject: [],
            candidatePhoneObject: [],

            stepFive: '',

            candaidatebtn: 'none',

            electionData: '',
            ballotData: '',
            votersData: '',

            voterEmail_error: '',
        }

        this.userData = '';
        this.counterName = 1;
        this.counterDes = 1;

        this.counterId = 1;
        this.counterEmail = 1;
        this.counterPhone = 1;
    }

    componentDidMount() {

        if (this.props.location) {
            if (this.props.location.state) {
                if (this.props.location.state.stepFive) {
                    console.log("activeStepOfReview>", this.props.location.state.stepFive)
                    this.setState({
                        activeStep: this.props.location.state.stepFive.activeStep,
                        reviewText1: this.props.location.state.stepFive.reviewText1,
                        textColorReview1: this.props.location.state.stepFive.textColorReview1,
                    })
                }
            }
        }

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

        }
        // else if (this.state.activeStep === 6) {
        //     let nextStep = this.state.activeStep + 1;
        //     this.setState({ activeStep: nextStep })
        // }
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
                    // onSelect={this.handleOnClickStepper}
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
                                            <div>
                                                {this.reviewStep()}
                                                {this.reviewStepTestModal()}
                                                {this.reviewStepReviewModal()}
                                                {this.reviewStepVerifyModal()}
                                                {this.reviewStepConfirmModal()}
                                            </div>
                                            :
                                            <div> {this.props.history.push('/user/new-election/ready',
                                                { title: this.state.electionTitle, })} </div>

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
                            let titleHere = e.target.value
                            titleHere = titleHere.split(" ").join("-");

                            this.setState({
                                electionTitle: titleHere
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
                        // maxDate={
                        //     this.state.startDateandTime ?
                        //         this.state.startDateandTimes
                        //         :
                        //         undefined
                        // }
                        onChange={(e) => {
                            let date = e
                            this.setState({
                                startDateandTime: e,

                            })
                        }}
                    />
                    <MaterialUIPickers
                        label="End Date and Time"
                        value={this.state.endDateandTime}
                        minDate={
                            this.state.startDateandTime ?
                                this.state.startDateandTime
                                :
                                undefined
                        }
                        format="dd/MM/yyyy hh:mm"
                        onChange={(e) => {
                            this.setState({
                                endDateandTime: e
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

        let startDate = moment(new Date(startDateandTime)).format('MMMM Do YYYY, h:mm:ss a');
        let endDate = moment(new Date(endDateandTime)).format('MMMM Do YYYY, h:mm:ss a');

        this.setState({
            electionData: {
                title: electionTitle,
                orgnization: orgnization,
                startDateandTime: startDate,
                endDateandTime: endDate,
            }
        })

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
                // electiontitleballot: electionTitle
            })
            console.log("result after adding>>>", result);
            this.getDetailsStepData()
        })
    }
    // detail step get FUNCTION
    getDetailsStepData = () => {
        new ApiManager().getElectionData().then(result => {
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
                console.log("result after result.getDetailsStepData>>>", result.data);
                // this.setState({
                // electionData: result.data,
                // electiontitleballot: result.data[0].title
                // })

            }
        })
    }

    // ballot step

    ballotStep = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                <h5>Election Title: {this.state.electionTitle}</h5>
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
                                        <div className="row" style={{ width: '60%', marginLeft: '20%' }}>
                                            <div className="col">
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
                                                <div>{Object.values(this.state.candidateNameObject)
                                                    .map(name =>
                                                        <Alert>
                                                            {name}
                                                        </Alert>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label>Description</label>
                                                <textarea
                                                    ref="textarea"
                                                    placeholder="description"
                                                    style={{
                                                        width: '100%',
                                                        padding: '5px',
                                                        borderRadius: '5px'
                                                    }} />

                                                {Object.values(this.state.candidateDescriptionObject)
                                                    .map(des =>
                                                        <Alert>
                                                            {des}
                                                        </Alert>
                                                    )}
                                            </div>
                                            <br />
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

                                                        candidateNameObject.push(this.refs.input.value);
                                                        candidateDescriptionObject.push(this.refs.textarea.value);
                                                        this.setState({ candidateNameObject, candidateDescriptionObject });

                                                        this.refs.input.select();
                                                        this.refs.textarea.select();

                                                        this.refs.input.value = '';
                                                        this.refs.textarea.value = '';

                                                    }
                                                }
                                                console.log("candidateDescriptionObject", this.state.candidateDescriptionObject)
                                            }}>Add Candidate</Button>
                                        <br /><br />

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
            </MyModal >
        )
    }
    // BALLOTS step FUNCTION
    addBallotStep = () => {
        const {
            electionTitle,
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
            electionTitle,
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
            this.getBallotStepData()
        })
    }

    // Ballot step get FUNCTION
    getBallotStepData = () => {
        new ApiManager().getBallotData().then(result => {
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
                console.log("result after result.getBallotStepData>>>", result.data);
                this.setState({
                    ballotData: result.data
                })

            }
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
                <h5>Election Title: {this.state.electionTitle}</h5>
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
                <h5>Election Title: {this.state.electionTitle}</h5>

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
                                <td style={{ width: '30%' }}>
                                    <input
                                        style={{
                                            width: '20%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="inputId1"
                                        maxlength="4"
                                    />
                                    <span>-</span>
                                    <input
                                        style={{
                                            width: '15%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="inputId2"
                                        maxlength="3"
                                    />
                                    <span>-</span>
                                    <input
                                        style={{
                                            width: '15%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="inputId3"
                                        maxlength="3"
                                    />
                                    <div>{Object.values(this.state.candidateIdObject)
                                        .map(id =>
                                            <Alert>
                                                {id}
                                            </Alert>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                        ref="inputEmail"
                                        placeholder="Email"
                                        required
                                        onChange={(e) => {
                                            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
                                                this.setState({
                                                    voterEmail_error: ""
                                                })
                                            } else {
                                                this.setState({
                                                    voterEmail_error: "Please enter valid email"
                                                })
                                                return;
                                            }
                                        }}
                                    />
                                    <div>{Object.values(this.state.candidateEmailObject)
                                        .map(email =>
                                            <Alert>
                                                {email}
                                            </Alert>
                                        )}
                                    </div>
                                </td>
                                <p style={{ color: 'red', fontSize: '12px' }}>{this.state.voterEmail_error}</p>
                                <td>
                                    <p style={{ float: 'left', fontSize: '18px' }}>+91</p>
                                    <input
                                        style={{
                                            width: '85%',
                                            padding: '5px',
                                            marginLeft: '10px',
                                            borderRadius: '5px'
                                        }}
                                        type="number"
                                        ref="inputPhone"
                                        placeholder="phone"
                                        required
                                    />
                                    <div>{Object.values(this.state.candidatePhoneObject)
                                        .map(phone =>
                                            <Alert >
                                                {phone}
                                            </Alert>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button
                        className="btn btn-primary"
                        style={{ marginLeft: '40%' }}
                        onClick={() => {
                            if (this.refs.inputId1.value.trim() != ""
                                && this.refs.inputId2.value.trim() != ""
                                && this.refs.inputId3.value.trim() != "") {
                                if (this.refs.inputEmail.value.trim() != "") {
                                    if (this.refs.inputPhone.value.trim() != "") {

                                        const candidateIdObject = this.state.candidateIdObject;
                                        const candidateEmailObject = this.state.candidateEmailObject;
                                        const candidatePhoneObject = this.state.candidatePhoneObject;

                                        candidateIdObject.push(this.refs.inputId1.value + "-" + this.refs.inputId2.value + "-" + this.refs.inputId3.value);
                                        candidateEmailObject.push(this.refs.inputEmail.value);
                                        candidatePhoneObject.push("+91" + this.refs.inputPhone.value);

                                        this.setState({ candidateIdObject, candidateEmailObject, candidatePhoneObject });
                                        this.refs.inputId1.select();
                                        this.refs.inputId2.select();
                                        this.refs.inputId3.select();
                                        this.refs.inputEmail.select();
                                        this.refs.inputPhone.select();

                                        this.refs.inputId1.value = '';
                                        this.refs.inputId2.value = '';
                                        this.refs.inputId3.value = '';
                                        this.refs.inputEmail.value = '';
                                        this.refs.inputPhone.value = '';
                                    }
                                }
                            }

                            console.log("candidateIdObject", this.state.candidateIdObject)
                            console.log("candidateEmailObject", this.state.candidateEmailObject)
                            console.log("candidatePhoneObject", this.state.candidatePhoneObject)
                        }
                        }> Add Voter</Button>
                    <br />
                    <br />
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
            electionTitle,
            candidateIdObject,
            candidateEmailObject,
            candidatePhoneObject,

        } = this.state;




        this.setState({
            disableBtn: true
        })
        // var voterId = Math.floor(performance.now() * 10000000000000) + '';
        // console.log("voterId>", voterId);
        // let id = 23;
        // let email = "abc@gmail.com ";
        // let phone = "1231231312";
        new ApiManager().addVotersData(
            electionTitle,
            candidateIdObject,
            candidateEmailObject,
            candidatePhoneObject,

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
            this.getVotersStepData()
        })
    }

    // Voter step get FUNCTION
    getVotersStepData = () => {
        new ApiManager().getVotersData(this.state.electionTitle).then(result => {
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
                console.log("result after result.getVotersStepData>>>", result.data);
                this.setState({
                    votersData: result.data[0]
                })

            }
        })
    }

    // review step
    reviewStep = () => {
        return (
            <div>
                <div style={{ textAlign: 'left', width: '100%' }}>
                    <h5>Election Title: {this.state.electionTitle}</h5>
                </div>

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
                                        toggleModal(REVIEWSTEP_TEST_ID)
                                        // this.props.history.push('/user/new-election/test', {
                                        //     title: this.state.electionTitle,
                                        //     candidateNames: this.state.candidateNameObject
                                        // })
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
                                        toggleModal(REVIEWSTEP_REVIEW_ID)
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
                                        toggleModal(REVIEWSTEP_VERIFY_ID)
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
                                        toggleModal(REVIEWSTEP_CONFIRM_ID)
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
            </div >
        )
    }




    //////////////////////// MODALS OF Review Step
    reviewStepTestModal = () => {
        const handleChangecandidate = (event) => {
            this.setState({ candaidatebtn: event.target.value });
        };
        return (
            <MyModal
                modal_id={REVIEWSTEP_TEST_ID}
                title={"Vote Testing"}
                action_btn_title="Confirm"
                action_btn_color="primary"
                cancelModal="modal"
                large_modal='modal-lg'
                action={this.reviewStepTestModalFunction}
            >
                <span>
                    <div className="justify-content-center" style={{ padding: '10px' }}>
                        <div className="container">
                            <br />
                            <br />

                            <h3>Orgnization: {
                                this.state.electionData.orgnization ?
                                    this.state.electionData.orgnization
                                    :
                                    ''
                            }</h3>
                            <h4>Election Title: {this.state.electionTitle}</h4>

                            <br />
                            <br />
                            <div style={{ textAlign: 'left', width: '70%', marginLeft: '15%' }}>
                                <h4>Board Speaker</h4>
                                <h5>Select exactly 1 of 2 candidates or choose abstain to vote for none of the candidates.</h5>
                            </div>

                            <br />
                            <table class="table" style={{ backgroundColor: 'rgb(225, 237, 255)', color: '', textAlign: 'left', width: '70%', marginLeft: '15%' }}>
                                <thead >
                                    <tr>
                                        <th>
                                            <h6>Candidate</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="type" name="type" value={this.state.candaidatebtn} onChange={handleChangecandidate}>
                                                    {
                                                        this.state.candidateNameObject && this.state.candidateNameObject.map(function (item, i) {
                                                            return <FormControlLabel style={{ marginBottom: '0px' }} value={item} control={<Radio />} label={item} />
                                                        })
                                                    }
                                                    <FormControlLabel style={{ marginBottom: '0px' }} value="none" control={<Radio />} label="Abstain" />
                                                </RadioGroup>
                                            </FormControl>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                        </div>

                    </div>
                </span>
            </MyModal>
        )
    }
    reviewStepTestModalFunction = () => {
        this.setState({
            reviewText1: 'Test vote is completed',
            textColorReview1: '#17BF3C'
        })
    }



    reviewStepReviewModal = () => {
        return (
            <MyModal
                modal_id={REVIEWSTEP_REVIEW_ID}
                title={"2 Voters"}
                action_btn_title="Confirm"
                action_btn_color="primary"
                cancelModal="modal"
                large_modal='modal-lg'
                action={this.reviewStepReviewModalFunction}
            >
                <span>
                    <div className="justify-content-center" style={{ padding: '10px' }}>
                        <h5>Voter list</h5>
                        <br />
                        <br />
                        {
                            this.state.candidateEmailObject && this.state.candidateEmailObject.map(function (item, i) {
                                return (
                                    <div style={{ textAlign: 'left' }}>

                                        <ul key={i}>
                                            <li>{item}</li>
                                        </ul>

                                    </div>
                                )
                            })
                        }
                        <br />
                        <br />
                        <br />
                    </div>
                </span>
            </MyModal>
        )
    }
    reviewStepReviewModalFunction = () => {
        this.setState({
            reviewText2: 'Voter list is reviewed',
            textColorReview2: '#17BF3C'
        })
    }

    reviewStepVerifyModal = () => {

        return (
            <MyModal
                modal_id={REVIEWSTEP_VERIFY_ID}
                title={"Election Details"}
                action_btn_title="Confirm"
                action_btn_color="primary"
                cancelModal="modal"
                large_modal='modal-lg'
                action={this.reviewStepVerifyModalFunction}
            >

                <span>
                    <div className="justify-content-center" style={{ padding: '10px', paddingLeft: '60px', textAlign: 'left' }}>
                        {
                            this.state.electionData ?
                                <div>
                                    <p>Election Name: <span style={{ fontWeight: '500' }}>
                                        {this.state.electionData.title}</span></p>
                                    <p>Organization: <span style={{ fontWeight: '500' }}>
                                        {this.state.electionData.orgnization}</span></p>
                                    <p>Start and End Date: <span style={{ fontWeight: '500' }}>
                                        {this.state.electionData.startDateandTime}
                                        and
                                        {this.state.electionData.endDateandTime}</span></p>
                                    <p>Anonymity and Integrity: <span style={{ fontWeight: '500' }}>Secret Ballot — High Integrity</span></p>
                                    <p>Voter Results: <span style={{ fontWeight: '500' }}>Visible only after the election has ended</span></p>
                                    <p>Administrator Results: <span style={{ fontWeight: '500' }}>Visible only after the election has ended</span></p>
                                    <p>Positions: <span style={{ fontWeight: '500' }}>1 plurality</span></p>
                                    <p>Voters and Notice: <span style={{ fontWeight: '500' }}>2 (1 email and 1 extra)</span></p>
                                    <p>Reminders: <span style={{ fontWeight: '500' }}>0</span></p>
                                </div>
                                :
                                "No Election Created!"
                        }
                    </div>
                </span>
            </MyModal>
        )
    }
    reviewStepVerifyModalFunction = () => {
        this.setState({
            reviewText3: 'Election details are verified',
            textColorReview3: '#17BF3C'
        })
    }

    reviewStepConfirmModal = () => {
        return (
            <MyModal
                modal_id={REVIEWSTEP_CONFIRM_ID}
                title={"Terms and Conditions"}
                action_btn_title="Confirm"
                action_btn_color="primary"
                cancelModal="modal"
                large_modal='modal-lg'
                action={this.reviewStepConfirmModalFunction}
            >
                <span>
                    <div className="justify-content-center" style={{ padding: '10px', textAlign: 'left' }}>
                        <p>Changes you can and can't make after the election starts</p>
                        <br />
                        <div className="row">
                            <div className="col">
                                <h4>Can Change</h4>
                                <ul>
                                    <li>Edit voter information up to 2 times</li>
                                    <li>Add up to 1 voter</li>
                                    <li>Extend or change the election date</li>
                                    <li>Close or cancel the election</li>
                                </ul>
                                <br />
                                <p>
                                    <h6>Note</h6>Any changes will be shared with your voters and increase the likelihood your election will be challenged.
                                </p>
                            </div>
                            <div className="col">
                                <h4>Can't Change</h4>
                                <ul>
                                    <li>Add more than 1 voter</li>
                                    <li>Add positions or candidates</li>
                                    <li>Edit positions or candidates</li>
                                    <li>Remove positions or candidates</li>
                                </ul>
                                <br />
                                <p>
                                    <h6>Note</h6>If you want to make any of the above changes, cancel the election and recreate or duplicate it
                                     </p>
                            </div>
                        </div>
                    </div>
                </span>
            </MyModal>
        )
    }
    reviewStepConfirmModalFunction = () => {
        this.setState({
            reviewText4: 'Terms & conditions are confirmed',
            textColorReview4: '#17BF3C'
        })
    }
    ////////////////// MODALS OF Review Step




}

const mapStateToProps = (state) => {
    return state
}

const actions = {

}

export default connect(mapStateToProps, actions)(NewElection)



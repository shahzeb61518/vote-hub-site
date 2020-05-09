import React, { Component } from 'react'

import Button from '@material-ui/core/Button';

import backgroundImg from './../../../images/voting.jpg'

import meetingVoting1 from './../../../images/meetingVoting1.PNG'
import meetingVoting2 from './../../../images/meetingVoting2.PNG'
import meetingVoting3 from './../../../images/meetingVoting3.PNG'
import meetingVoting4 from './../../../images/meetingVoting4.PNG'


export default class MeetingVoting extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //main body of meeting voting
    mainBody = () => {
        return (
            <div>
                <div>
                    <div style={{ position: 'absolute', color: 'white' }}>
                        <div style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>VOTE-HUB: An online Election System’s LiveVote Meeting Voting Process</h1>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <h6>
                                        LiveVote helps organizations of any size conduct high integrity votes in meetings. Create, amend and vote on any number of motions. Multiple administrators and multi-chapter organizations are supported too.
                            </h6>
                                </div>
                                <div className="col"></div>
                            </div>

                        </div>
                    </div>
                    <img
                        style={{ height: '350px', width: '100%' }}
                        src={backgroundImg}
                        alt="background-image" />
                </div>



                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 1: Prepare the meeting</h4>
                        <br />
                        <h6>Create your registration process</h6>
                        <p>Include your meeting details, organization branding, dates, and notice methods</p>
                        <h6>Add your voter list and notices</h6>
                        <p>Add voter lists from Microsoft Excel or other systems and send meeting notice by email, SMS, postcard, or letter</p>
                        <h6>Design your meeting votes</h6>
                        <p>Wizards allow you to add agenda items, positions, bylaws or approvals requiring meeting votes. Include documents and candidates with photos and bios too!
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={meetingVoting1}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />


                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 2: Start the meeting</h4>
                        <br />
                        <h6>Voters register and test</h6>
                        <p>Voters access the meeting using their personalized notice with meeting credentials. Start the meeting by running test votes so attendees feel comfortable
</p>
                        <h6>Open motions for voting</h6>
                        <p>Attendees vote, verify choices and receive confirmation. Repeat the process for every vote in the meeting. Even amend votes in a few clicks!
</p>
                        <h6>Share results virtually or onsite</h6>
                        <p>For each vote, results are immediately tabulated. Voters view the results on their device, as part of a video conference or on the meeting room TV
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={meetingVoting2}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 3: Track the meeting</h4>
                        <br />
                        <h6>Multiple methods and reports</h6>
                        <p>More than just yes/no votes, you can use Likert scales, cumulative, scored and ranked voting. Weighting allows votes to reflect ownership too!
</p>
                        <h6>Easy results</h6>
                        <p>View summary or group results. Save results or delete them after sharing: you choose! View numbers and graphs or export them to your Microsoft Office or G Suite applications
</p>
                        <h6>Vote Audit</h6>
                        <p>Voter characteristics and location are tracked and reported. Re-tally the results to allow observation while ensuring anonymity and integrity
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={meetingVoting3}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Vote on anything</h4>
                        <br />
                        <p>With VOTE-HUB: An online Election System LiveVote, you can vote on a wide variety of agenda, motions and meeting items as it’s more than just approvals or yes and not votes. Customize your votes to handle diverse meeting needs or host interactive polls and gather feedback. View the samples for examples of how our online voting system works.
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={meetingVoting4}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />


                <div className="row">
                    <div className="col" style={{ padding: '50px' }}>
                        <h4>See Our Electronic Ballot in Action</h4>
                        <br />
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-light"
                            onClick={() => {
                                // this.watchVideo()
                            }}>
                            Watch our video
                </Button>
                    </div>
                    <div className="col" style={{ padding: '50px' }}>
                        <h4>Ensuring Election Excellence - the Guide to Electronic Elections</h4>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-light"
                            onClick={() => {
                                // this.downloadBook()
                            }}>
                            Download our book
                </Button>
                    </div>
                    <br />
                    <br />
                </div>


                <div>
                    <div style={{ position: 'absolute', color: 'white', width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <h1>Take Your Meeting to the Next Level</h1>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createElection()
                            }}>
                            Test LiveVote Now
                </Button>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <img
                        style={{ height: '350px', width: '100%' }}
                        src={backgroundImg}
                        alt="background-image" />
                </div>


            </div>
        )
    }
}

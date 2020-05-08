import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import backgroundImg from './../../../images/voting.jpg'

export default class ElectionVoting extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }


    //main body of election voting
    mainBody = () => {
        return (
            <div>

                <div>
                    <div className="row" style={{ position: 'absolute', color: 'white' }}>
                        <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>ElectionBuddy's Online Voting Methods and Process</h1>
                            <br />
                            <h6>
                                ElectionBuddy election setup is straightforward and fast, and voting and sharing results is just as easy. But don't let the friendly name fool you;
                        ElectionBuddy can handle complex ballots and voting needs too! </h6>
                        </div>
                        <div className="col">

                        </div>
                    </div>
                    <img
                        style={{ height: '350px', width: '100%' }}
                        src={backgroundImg}
                        alt="background-image" />
                </div>

                <br />
                <br />


                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 1: Setup</h4>
                        <br />
                        <h6>Add election details</h6>
                        <p>Enter your election name, dates and settings</p>
                        <h6>Design your ballot and notices</h6>
                        <p>Add positions, candidates and questions with photos and bios and personalize the email, text and paper notices</p>
                        <h6>Add your voter list</h6>
                        <p>Pull lists from Excel or your contact manager</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        image here
                    </div>
                    <br />
                    <br />
                </div>

                <hr />

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 2: Vote</h4>
                        <br />
                        <h6>One vote per voter the way they want to vote</h6>
                        <p>Voters are notified by email, text message, mail or any way you want. Voters click to vote on their computer or phone.</p>
                        <h6>Voting is anonymous</h6>
                        <p>Choices are confidential and can't be seen by other voters</p>
                        <h6>Increase turnout and monitor receipt</h6>
                        <p>Send reminders and resend bounced notices</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        image here
                    </div>
                    <br />
                    <br />
                </div>


                <hr />
                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 3: Results</h4>
                        <br />
                        <h6>Results are automatically tabulated</h6>
                        <p>View voter summaries, graphs and vote by vote results</p>
                        <h6>Select the winner</h6>
                        <p>Winners are automatically picked or tabulate the results yourself</p>
                        <h6>Share the results</h6>
                        <p>Automatically notify each voter and publish the results to your webpage. Or keep them private - it's up to you!</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        image here
                    </div>
                    <br />
                    <br />
                </div>


                <hr />

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Election and Ballot Types</h4>
                        <br />
                        <p>You can set up ElectionBuddy for use in a wide variety of elections, votes and polls. With our various methods of voting, you can combine ballot types within an election, to simplify the voting process for your voters. View the samples to see details and examples of how our online voting system works.</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        image here
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
                        <h1>Take Your Election to the Next Level</h1>

                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createElection()
                            }}>
                            Create Free Election Now
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

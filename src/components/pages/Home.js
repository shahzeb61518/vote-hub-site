import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

// import ApiManager from '../helper/ApiManager'

import voteLogo from '../../images/vote-logo.PNG'
import backgroundImg from './../../images/voting.jpg'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            title_error: "",
            description: "",
            description_error: "",
            image: "",
            image_error: "",

            wishType: "text",

            successMsg: "",
            isLoading: false,
            disableBtn: false

        }
    }

    render() {
        return (
            <div>
                {
                    this.homeBody()
                }
            </div>
        )
    }


    // Main body of Home page
    homeBody = () => {
        return (
            <div>
                {
                    this.firstPart()
                }
                <hr />
                {
                    this.secondPart()
                }
                <hr />
                {
                    this.thirdPart()
                }
                {/* <hr /> */}
                {
                    this.forthPart()
                }
            </div>
        )
    }


    //1st part of home page
    firstPart = () => {
        return (
            <div>
                <div className="row">
                    <div className="col"
                        style={{
                            padding: '100px',
                            textAlign: 'left'
                        }}>
                        <h1>The Easiest Way to Election Excellence</h1>
                        <br />
                        <h6
                            style={{
                                width: '300px'
                            }}>VOTE-HUB: An online Election System ensures election integrity,
                            saves serious hours and improves turnout for
                            election voting or for meeting voting. It’s
                            free to test and free for under 20 voters
                            </h6>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.tryElectionSite()
                            }}>
                            Try Election-Site for Free
                        </Button>
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px'
                        }}>
                        <img
                            src={voteLogo}
                            alt="vote" />
                    </div>
                </div>
            </div>
        )
    }


    //second part of home page
    secondPart = () => {
        return (
            <div>
                <br />
                <br />
                <h1>Take Elections to the Next Level</h1>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Improve voter turnout</h4>
                        <p>
                            Notify voters through email, mail, text message or with your own systems. Receive undeliverable notice alerts and schedule reminders. Voters vote by phone, computer, mail or in person.
                            </p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Voting integrity</h4>
                        <p>
                            Voter can only vote once and voting choices remain anonymous. Each ballot has one, secure voting key and the vote is auditable, verifiable and can be independently observed.
                        </p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Every type of vote</h4>
                        <p>
                            Ballots are configurable to manage candidate elections, board positions, contract ratifications, bylaw amendments, budget approvals, acclamations, motions and member polls.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Simply automated</h4>
                        <p>
                            Complete setup in 3 steps with extensive online help and email support - spend your time monitoring, not counting. Or engage our experts for dedicated assistance or independent election oversight.
                        </p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Fast results</h4>
                        <p>
                            Winners are immediately calculated using first past the post, cumulative voting, preferential ballot, STV Single transferable vote or approval voting. You can tabulate results yourself too!
                        </p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Election security</h4>
                        <p>
                            256-bit encryption used to safeguard your vote — the same security as major banks. And we don’t share or use voter data — your elections stay private for both you and your voters.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    //third part of home page
    thirdPart = () => {
        return (
            <div>
                <br /> <br />
                <h1>Voters Will Love You for Choosing VOTE-HUB: An online Election System</h1>
                <br />
                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Voting is easy and convenient</h4>
                        <p>
                            One click to vote from wherever and whenever voters want to vote
                        </p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Anonymous and secure voting</h4>
                        <p>Voters vote once, with secret ballots and verifiable results</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Works the way voters do</h4>
                        <p>Email notifications, text messages, printed or mailed ballots, and live voting during meetings</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Speedy results</h4>
                        <p>Share reports, full color graphs, and statistics immediately after the vote is complete</p>
                    </div>
                </div>
            </div>
        )
    }

    //forth part of home page
    forthPart = () => {
        return (
            <div>
                <div style={{ position: 'absolute', color: 'white', width: '100%' }}>
                    <br />
                    <br />
                    <br />
                    <h1>The Best Voting Solution for You and Your Voters</h1>

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
                    alt="background" />
            </div>
        )
    }
    scrollToView = (position) => {
        window.scroll({ top: position - 30, behavior: 'smooth' })
    }


}

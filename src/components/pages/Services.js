import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import backgroundImg from './../../images/voting.jpg'
import services1 from './../../images/services1.PNG'
import services2 from './../../images/services2.PNG'
import services4 from './../../images/services4.PNG'
import services5 from './../../images/services5.PNG'



export default class Services extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //main body of services
    mainBody = () => {
        return (
            <div>
                <div>
                    <div className="row" style={{ position: 'absolute', color: 'white' }}>
                        <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>ElectionBuddy Services</h1>
                            <br />
                            <p>
                                Do it yourself, have ElectionBuddy experts manage everything, or only some components - it's up to you! Along with our online voting system we offer support and services to ensure your election is excellent!
                            </p>
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
                    <div className="col"
                        style={{
                            padding: '50px',
                            textAlign: 'left'
                        }}>
                        <h1>Do It Yourself</h1>
                        <br />
                        <p
                            style={{
                            }}>If you prefer to complete the set up of your election
                            or meeting vote yourself, you, or your designate, will add
                            the election or meeting details and dates, design the ballots
                            and the notices, and create the voter list. You pay, launch
                            the vote and answer voter questions. You can have ElectionBuddy
                            automatically share results with your voters. If you need help,
                            use our knowledge base or ask questions and receive answers via email.

                            Investigate the “Do It Yourself” option by signing up and creating
                            a free test election or watch a video of a meeting vote or election
                            vote in action.
                            </p>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createTestElection()
                            }}>
                            Create a Test Election
                        </Button>
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px'
                        }}>
                        <img
                            src={services1}
                            alt="service-logo" />
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div className="row">
                    <div className="col"
                        style={{
                            padding: '50px',
                        }}>
                        <img
                            src={services2}
                            alt="service-logo" />
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px',
                            textAlign: 'left'
                        }}>
                        <h1>Inquire about Setup Support</h1>
                        <br />
                        <p
                            style={{
                            }}>If you want to do most of it yourself, but want to be sure it’s right, we can do that too. An ElectionBuddy Expert can review your election setup via email or an online meeting. They can consult with you to review your requirements, provide guidance, ensure that you have created the optimal election or meeting flow, and be standing by when the meeting or election opens. Optionally add on-call email support for the duration of your meeting or election.

                            </p>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.dedicatedSetup()
                            }}>
                            Inquire About Dedicated Setup
                        </Button>
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div className="row">
                    <div className="col"
                        style={{
                            padding: '50px',
                            textAlign: 'left'
                        }}>
                        <h1>Dedicated Setup Assistance</h1>
                        <br />
                        <p
                            style={{
                            }}>If you'd like us to do it for you, an ElectionBuddy Expert can complete your election setup. All you have to do is provide us the election details and voter list and we create the election for you. The setup is reviewed by you in an online meeting to ensure it meets your needs. If you have questions or issues, you can always phone or email your ElectionBuddy Expert. You answer voter questions yourself with phone support from your expert. Your Expert works with you to share voting results based on your electoral requirements.

                            </p>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createTestElection()
                            }}>
                            Inquire About Dedicated Setup
                        </Button>
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px'
                        }}>
                        <img
                            src={services2}
                            alt="service-logo" />
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div className="row">
                    <div className="col"
                        style={{
                            padding: '50px',
                        }}>
                        <img
                            src={services4}
                            alt="service-logo" />
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px',
                            textAlign: 'left'
                        }}>
                        <h1>Voter Inquiry Management</h1>
                        <br />
                        <p
                            style={{
                            }}>Dedicated Assistance with Voter Inquiry management is a fully managed election. It provides the highest possible election integrity and independence as it removes the potential for any perceived conflict of interest. In addition to the Dedicated Setup Assistance from your ElectionBuddy Experts, the ElectionBuddy Expert team manages your voter list and interacts directly with your voters during the election. After consultation with you, voter questions are answered by the ElectionBuddy team to ensure voter anonymity is maintained. We also certify and deliver voting results to you, and, if needed, directly to your voters.

                            </p>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.dedicatedSetup()
                            }}>
                            Talk To Us About Running Your Election
                        </Button>
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div className="row">
                    <div className="col"
                        style={{
                            padding: '50px',
                            textAlign: 'left'
                        }}>
                        <h1>Onsite Scrutineering</h1>
                        <br />
                        <p
                            style={{
                            }}>
                            If you are running an Annual General Meeting or special meeting where your members need to vote, ElectionBuddy's expert consultants can provide oversight and assistance to ensure your vote is smooth and certifiable. Using the ElectionBuddy voting platform, you can have our staff create motions, review voting, provide expert advice and assistance to ensure that your voting process is observable, verifiable and certified.
                            </p>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createTestElection()
                            }}>
                            Ask about Scrutineer Services
                        </Button>
                    </div>
                    <div className="col"
                        style={{
                            padding: '50px'
                        }}>
                        <img
                            src={services5}
                            alt="service-logo" />
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div className="row">
                    <div className="col" style={{ padding: '50px' }}>
                        <h4>Ensuring Election Excellence - the Guide to Electronic Elections</h4>
                        <br />
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-light"
                            onClick={() => {
                                // this.downloadBook()
                            }}>
                            Download our book
                </Button>
                    </div>
                    <div className="col" style={{ padding: '50px' }}>
                        <h4>Mix and Match Services to Create Your Own Custom Package</h4>
                        <br />
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-light"
                            onClick={() => {
                                // this.contactUs()
                            }}>
                            Contact Us
                </Button>
                    </div>
                    <br />
                    <br />
                </div>

            </div>
        )
    }
}

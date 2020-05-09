import React, { Component } from 'react'


import Button from '@material-ui/core/Button';

import backgroundImg from './../../../images/voting.jpg'

import anouncment1 from './../../../images/anouncment1.PNG'
import anouncment2 from './../../../images/anouncment2.PNG'
import anouncment3 from './../../../images/anouncment3.PNG'


export default class Announcments extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //main body of annuoncments
    mainBody = () => {
        return (
            <div>
                <div>
                    <div style={{ position: 'absolute', color: 'white' }}>
                        <div style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>VOTE-HUB: An online Election System’s Announcements and Notice Methods</h1>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <h6>
                                        Announcements and notices are great for meeting legislative requirements, ensuring all members receive notice, allowing voters to register to vote, and encouraging members to participate by adding call for candidate forms. Create and send notices, register votes and link to candidate nomination forms </h6>
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
                        <h4>Step 1: Prepare the notice</h4>
                        <br />
                        <h6>Create your notice</h6>
                        <p>Add your election or meeting details and dates. Customize for your own requirements including multiple languages
</p>
                        <h6>Add your list</h6>
                        <p>Add member lists from Microsoft Excel or other systems and send meeting notice by email, SMS, postcard, or letter
</p>
                        <h6>Create forms</h6>
                        <p>Add a voter registration form to confirm attendance. Capture candidates for one or many positions. And poll members too!
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={anouncment1}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />







                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 2: Send the notice</h4>
                        <br />
                        <h6>Members receive notice</h6>
                        <p>Voters are notified by email, text message, postcard, mail or using your own systems. Send multiple notices, for example 90, 60 and 30 days prior to your annual meeting
</p>
                        <h6>Members register</h6>
                        <p>Members confirm their attendance at the meeting or their intention to vote, which certifies they can access the voter form
</p>
                        <h6>Members nominate candidates</h6>
                        <p>Capture candidate names for all your positions. Contact us to collect more candidate information and we’ll create a custom form that can be routed for approval
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={anouncment2}
                            alt="election-voting-image" />
                    </div>
                    <br />
                    <br />
                </div>

                <hr />






                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <h4>Step 3: Track notice</h4>
                        <br />
                        <h6>Receive Confirmations</h6>
                        <p>Your postal addresses are verified and you receive automatic bounce notifications for invalid or changed emails. And if members register, you are notified too!
</p>
                        <h6>View Reports</h6>
                        <p>View member status, responses and candidate details. View numbers, graphs or export them to your Microsoft Office or G Suite applications
</p>
                        <h6>Vote Audit</h6>
                        <p>Voter characteristics and location are tracked and reported. Re-tally the results to allow observation while ensuring anonymity and integrity
</p>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <img
                            style={{}}
                            src={anouncment3}
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
                        <h1>Start Sending Announcements</h1>
                        <Button style={{ marginTop: '30px' }}
                            variant="contained"
                            class="btn btn-primary"
                            onClick={() => {
                                // this.createElection()
                            }}>
                            Create a Free Account Now
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

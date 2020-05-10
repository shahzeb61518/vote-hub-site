import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import backgroundImg from './../../images/voting.jpg'

export default class WhoItsFor extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //this page main body
    mainBody = () => {
        return (
            <div>
                <div>
                    <div className="row" style={{ position: 'absolute', color: 'white' }}>
                        <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>Who It's For</h1>
                            <br />
                            <h6>
                                VOTE-HUB: An online Election System is fully featured to meet the most stringent election organization requirements.
                    </h6>
                        </div>
                        <div className="col">

                        </div>
                    </div>
                    <img
                        style={{ height: '350px', width: '100%' }}
                        src={backgroundImg}
                        alt="background" />
                </div>


            <br />
            <br />
            <div className="row">
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Homeowners' Associations</h4>
                        <p>Simple voting for voters of all ages and technical skills helps you reduce HOA apathy, ensuring you hit quorum for your Board member and bylaw amendment elections.
                            </p>
                    </Card>
                </div>
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Professional and Other Associations</h4>
                        <p>A professional-looking ballot that’s effortless to set up means that you can impress your peers for any board member, contract ratification, and executive officer elections.
                            </p>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Not-for-Profits (NGOs, Societies, Charities, Clubs)</h4>
                        <p>You work hard year-round for a good cause — get a voting platform that works hard to be good for your board of director and budget approval elections, and member feedback surveys.</p>
                    </Card>
                </div>
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>College and University</h4>
                        <p>Spend more time focused on school with a quick setup process, convenient voting, and instant results for your student government, alumni association, and faculty elections.</p>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>K-12 Schools</h4>
                        <p>Excite and educate your students about the democratic process with a simple, cost-effective voting software for student government and instructional/curriculum elections.</p>
                    </Card>
                </div>
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Unions</h4>
                        <p>VOTE-HUB: An online Election System can help you turn your election process into a member engagement process for contract ratifications, leadership votes, and member surveys.</p>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Government or Political Parties</h4>
                        <p>Eliminate the risk of scandalous errors and public backlash with VOTE-HUB: An online Election System’s secure, integrity-focused voting process for your municipal, state/provincial, and federal government elections.</p>
                    </Card>
                </div>
                <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                    <Card style={{ padding: '20px' }}>
                        <h4>Other Organizations</h4>
                        <p>No matter how big or how small your organization is, or what type of organization you are, voting online with VOTE-HUB: An online Election System is the powerful, secure voting software you need to ensure election excellence. </p>
                    </Card>
                </div>

            </div>


            <div>
                <div style={{ position: 'absolute', color: 'white', width: '100%' }}>
                    <br />
                    <br />
                    <br />
                    <h1>Join Thousands of Organizations Using VOTE-HUB: An online Election System</h1>

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

            </div >
        )
    }
}

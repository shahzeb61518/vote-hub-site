import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import backgroundImg from './../../images/voting.jpg'

export default class Features extends Component {
    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }


    //Feature's main body
    mainBody = () => {
        return (
            <div>
                <div>
                    <div className="row" style={{ position: 'absolute', color: 'white' }}>
                        <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                            <h1>ElectionBuddy Voting Features</h1>
                            <br />
                            <h6>
                                ElectionBuddy is fully featured to meet the most stringent election organization requirements.
                    </h6>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <img
                        style={{ height: '350px', width: '100%' }}
                        src={backgroundImg}
                        alt="background-image" />
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Multiple Ways to Vote</h4>
                            <p>Voters can vote remotely or during a meeting using their cellphone, computer, tablet or mail. Voting is completed using a simple, easy to use, tech-friendly ballot.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Multiple Voting Systems</h4>
                            <p>First past the post, cumulative voting, preferential ballot, STV-single transferable vote, scored voting, rating scale or approval voting.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Customizable Ballots</h4>
                            <p>Our customizable ballots allow for multiple vacancies, randomized candidate or question order, editing descriptions, highlighting amendments and striking out words. You can also add documents or website links.
</p>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Personalized Notice</h4>
                            <p>Reach voters by email, mail, text message, or using your own website, e-newsletter or existing systems with a personalized election announcement for each voter.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Voter List Integration</h4>
                            <p>Pull voter information from Gmail, Campaign Monitor, Mailchimp, Microsoft Excel, member management systems and CRM applications.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Candidate Profiles</h4>
                            <p>Help voters choose by including a biography, vision, campaign promises and contact information. Upload a candidate photo or link to a video too!
</p>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Multiple Languages</h4>
                            <p>Notice text, candidate descriptions, options, buttons, verification are customizable to whatever language your voters vote in.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Voting Subgroups</h4>
                            <p>Limit questions to a portion of your voters. For example, only Freshman vote for their class rep, while everyone votes for the school president
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Write-Ins and Comments</h4>
                            <p>Allow voters to add a new candidate to the ballot, or allow voters to provide feedback - great for budget approvals or referendums.
</p>
                        </Card>
                    </div>
                </div>


                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4> Weighted Votes</h4>
                            <p>Allow some voters to get more votes than others. Great for condominium boards or regional representation or proxy voting.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Voter List Management</h4>
                            <p>Receive automatic bounce notifications for invalid or changed emails. Easily view which voters have and haven’t voted.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Voter Reminders</h4>
                            <p>Schedule emails or text messages to voters who haven't voted to increase voter turnout without extra work.
</p>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Voter Security</h4>
                            <p>Personal voting keys are created and used only once. Require a 2nd password or confirm identity by phone. We use 256-bit encryption - the same as major banks.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Anonymous Voting</h4>
                            <p>All voting choices are confidential and cannot be linked to the voter for elections. And results can be hidden until the election ends for further anonymity.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Independent Verification</h4>
                            <p>A neutral third-party staffed by accountants ensures fairness and helps resolve election challenges. Also allows voter and independent review and recount.
</p>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Email Deliverability</h4>
                            <p>DomainKeys and Sender Policy Framework ensure email notices reach each voter and are not marked as spam.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Election Audit</h4>
                            <p>Voter Ballots and results are observable and auditable to verify votes are correctly cast and avoid election fraud.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Reports and Graphs</h4>
                            <p>View winners and results in easy to read summaries, pie charts and bar graphs. Analyze the voter list and conduct a voter audit too.
</p>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Enterprise Features</h4>
                            <p>Multiple election administrators with multi-department election management. Automated signup works great for mutli-chapter organizations.
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Single sign on</h4>
                            <p>Voters can use their organizational username and password to access their ballot, which simplifies voter list management for administrators too!
</p>
                        </Card>
                    </div>
                    <div className="col" style={{ padding: '50px', textAlign: 'left' }}>
                        <Card style={{ padding: '20px' }}>
                            <h4>Member Portal Integration</h4>
                            <p>Encourage voting by adding a voting link and a voter engagement widget to your website. Publish access to voting results on your website too!
</p>
                        </Card>
                    </div>
                </div>


                <div>
                    <div style={{ position: 'absolute', color: 'white', width: '100%'}}>
                        <br />
                        <br />
                        <br />
                        <h1>Test All the Features</h1>
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

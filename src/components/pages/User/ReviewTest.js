import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux'
import ApiManager from '../../helper/ApiManager'
import { LocalStorage } from '../../helper/LocalStorage';

class ReviewTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            electionTitle: '',
            orgnization: '',
            candaidatebtn: 'none',
            item: {
                activeStep: 5,
                textColorReview1: '#17BF3C',
                reviewText1: 'Test vote is completed',
            },
            candidates: '',
            voterData: ''
        }
        this.userData = '';

    }


    componentDidMount() {


        if (this.props.location) {
            if (this.props.location.state) {
                console.log("Title>", this.props.location.state.title)
                console.log("candidateNames>", this.props.location.state.candidateNames)
                this.setState({
                    electionTitle: this.props.location.state.title,
                    candidates: this.props.location.state.candidateNames,

                })
                // Get voters data
                new ApiManager().getVotersData("board").then(result => {
                    if (result.no_result) {
                        return
                    }
                    if (result.data) {
                        if (result.data.error) {
                            alert(result.data.error)
                            return
                        }
                    }
                    if (result.data[0]) {
                        if (result.data[0].voterEmail) {
                            console.log("result getVotersData>>>", result.data[0].voterEmail);
                            this.setState({
                                voterData: result.data[0].voterEmail
                            })
                        }
                    }
                })
            }
        }


        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                orgnization: this.userData.organizationName
            })
        }




    }

    render() {
        const handleChangecandidate = (event) => {
            this.setState({ candaidatebtn: event.target.value });
        };
        return (
            <div>
                <div className="container">
                    <br />
                    <br />
                    <br />
                    <h3>Orgnization: {this.state.orgnization}</h3>
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
                                                this.state.candidates && this.state.candidates.map(function (item, i) {
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
                    <Button
                        class="btn btn-primary"
                        type="button"
                        onClick={() => {
                            this.props.history.push('/user/new-election', { stepFive: this.state.item })

                        }}
                    >   Verify   </Button>

                    <br />
                    <br />
                    <br />
                    <br />

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}

const actions = {

}

export default connect(mapStateToProps, actions)(ReviewTest)
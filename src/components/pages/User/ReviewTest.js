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
            electionTitle: 'test',
            orgnization: '',
            candaidatebtn: 'none',
            item: {
                activeStep: 5,
                textColorReview1: '#17BF3C',
                reviewText1: 'Test vote is completed',
            }
        }
        this.userData='';

    }


    componentDidMount() {

        this.userData = new LocalStorage().getUserData();
        this.userData = JSON.parse(this.userData);
        console.log("this.userData>", this.userData)
        if (this.userData) {
            this.setState({
                orgnization: this.userData.organizationName
            })
        }


        // new ApiManager().getVotersData().then(result => {
        //     if (result.no_result) {
        //         return
        //     }
        //     if (result.data) {
        //         if (result.data.error) {
        //             alert(result.data.error)
        //             return
        //         }
        //     }
        //     if (result.data) {
        //         console.log("result after result.data>>>", result.data);

        //     }
        // })
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
                                            <FormControlLabel style={{ marginBottom: '0px' }} value="name1" control={<Radio />} label="Person1" />
                                            <FormControlLabel style={{ marginBottom: '0px' }} value="name2" control={<Radio />} label="Person2" />
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
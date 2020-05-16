import React, { Component } from 'react'
// import Button from '@material-ui/core/Button';
import ApiManager from '../../helper/ApiManager'

export default class VerifyMail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            successMsg: "",
            isLoading: false,
            disableBtn: false,
            errorMessage: "",
            userEmail: ''

        }
    }

    componentDidMount() {
        // console.log("UserEmail>", this.props.location.state.userEmail)
        // this.setState({ userEmail: this.props.location.state.userEmail })
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3>Welcome to Vote-Hub!</h3>
                <h5>You have signed up successfully. We have emailed you a link to confirm your email address.</h5>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
        )
    }


}

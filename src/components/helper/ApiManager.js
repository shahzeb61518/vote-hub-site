import axios from 'axios';
import { LocalStorage } from './LocalStorage'
import moment from 'moment';



export default class ApiManager {


    // userId = user.userId
    // userName = user.name


    jwt = new LocalStorage().getUserJwt();
    headers = {
        'Authorization': "Bearer " + this.jwt,
    }



    // LocalHost
    // _BASE_URL = "http://localhost:4000/api/"
    _BASE_URL = "https://votehub999.herokuapp.com/"


    //USERS
    _USER_SIGNUP = "signup"
    _USER_LOGIN = "signin"
    _USER_EDIT_STATUS = "signup/editstatus"
    _USER_UPDATE = "user/update"
    _USER_GET_BY_ID = "user/get"

    // ELECTION
    _ELECTION_ADD = "election/add"
    _ELECTION_GET = "election"
    _CREATE_BALLOT = "ballot/create"
    _BALLOT_GET = "ballot"
    _ADD_VOTERS = "voters/add"
    _VOTERS_GET = "voters"
    _SEND_LINK = "voting"
    _GET_CANDIDATES = "voting/getcandidates"
    _VOTE_RESULT = "result"
    _GET_RESULT = "result/show"
    _GET_ACCESS_TO_VOTE = "voting/verify"
    _GET_TITLE_BY_ACCESSKEY= "voting/verify2"
    
    async sendPostRequest(_url, _params, headers) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)

        if (!_params) {
            _params = {}
        }
        if (!headers) {
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        try {
            let response = await axios({
                method: 'post',
                url: _url,
                headers: headers,
                data: _params,
                timeout: 50000
            });
            console.log("API call response", response)
            return response;

        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            console.log("catch error on ", _url, " call fail", err)
            setTimeout(() => {
                alert("Unable to connect with server")
            }, 400)
            return err;
        }
    }


    async sendGetRequest(_url, _params, _headers) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)

        if (!_headers) {
            _headers = {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        try {
            let response = await axios.get(_url, {
                data: _params ? _params : null,
                headers: _headers,
                timeout: 15000
            });

            console.log("API call response", response)
            return response;

        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            console.log("catch error on ", _url, " call fail", err)
            setTimeout(() => {
                alert("Unable to connect with server")
            }, 400)
            return err;
        }
    }


    //USER FUNCTIONS
    //SingUp
    singUp(
        firstname,
        lastname,
        email,
        password,
        orgType,
        orgName,
        membership,
        orgLoc
    ) {
        let url = this._USER_SIGNUP;
        let userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            organizationType: orgType,
            organizationName: orgName,
            voterlistSize: membership,
            organizationLocation: orgLoc
        }
        console.log("data for SignUp>>>>>", userData)
        return this.sendPostRequest(url, userData, '')
    }

    //SignIn
    signIn(
        _email,
        _password) {
        let url = this._USER_LOGIN;

        let userData = {
            email: _email,
            password: _password
        }
        return this.sendPostRequest(url, userData, '')
    }

    editStatus(userEmail) {
        let url = this._USER_EDIT_STATUS;
        let userData = {
            email: userEmail,
        }
        return this.sendPostRequest(url, userData, '')
    }

    //User by ID
    // userById(id) {
    //     let url = this._USER_GET_BY_ID;
    //     let userId = { id: id }
    //     // console.log("getting user by id>>>>", id)
    //     return this.sendPostRequest(url, userId, this.headers)
    // }

    //user update
    updateUser(
        _id,
        _name,
        _phone,
        _dob,
        _education,
        _job,
        _address,
        _image
    ) {
        let url = this._USER_UPDATE;
        if (_image) {
            const formData = new FormData();
            formData.append("id", _id)
            formData.append("name", _name)
            formData.append("phone", _phone)
            formData.append("dob", _dob)
            formData.append("education", _education)
            formData.append("job", _job)
            formData.append("address", _address)
            formData.append("image", _image);
            console.log("formDataformData>>>>>", formData)
            return this.sendPostRequest(url, formData, this.headers)
        } else {
            let userData = {
                id: _id,
                name: _name,
                phone: _phone,
                dob: _dob,
                education: _education,
                job: _job,
                address: _address,
            }
            return this.sendPostRequest(url, userData, this.headers)
        }

    }


    addElection(
        title,
        organization,
        startdate,
        enddate
    ) {



        let url = this._ELECTION_ADD;
        let electionData = {
            title: title,
            organization: organization,
            startdate: startdate,
            enddate: enddate
        }
        console.log("electionData", electionData)

        return this.sendPostRequest(url, electionData, this.headers)
    }
    getElectionData() {
        let url = this._ELECTION_GET;
        return this.sendGetRequest(url, '', this.headers)
    }


    createBallot(
        electiontitle,
        ballotInfo,
        noVacancy,
        noCandidates,
        details,
        position,
        candidatename,
        description,
        instructions
    ) {
        let url = this._CREATE_BALLOT;
        let ballotData = {
            electiontitle: electiontitle,
            ballotInfo: ballotInfo,
            noVacancy: noVacancy,
            noCandidates: noCandidates,
            details: details,
            position: position,
            candidatename: candidatename,
            description: description,
            instructions: instructions
        }
        console.log("ballotData", ballotData)
        return this.sendPostRequest(url, ballotData, this.headers)
    }
    getBallotData() {
        let url = this._BALLOT_GET;
        return this.sendGetRequest(url, '', this.headers)
    }


    addVotersData(
        title,
        voterId,
        email,
        phone,
    ) {
        let url = this._ADD_VOTERS;
        let votersData = {
            title: title,
            voterId: voterId,
            voterEmail: email,
            voterNo: phone,
        }
        console.log("votersData", votersData)
        return this.sendPostRequest(url, votersData, this.headers)
    }
    getVotersData(title) {
        let url = this._VOTERS_GET;
        let voterData = {
            title: title
        }
        console.log("TItlevoterData>>>>", voterData)
        return this.sendPostRequest(url, voterData, this.headers)
    }



    sendLinkWithTitle(title) {
        let url = this._SEND_LINK;
        let sneLinkData = {
            title: title
        }
        console.log("sendLinkWithTitle>>>>", sneLinkData)
        return this.sendPostRequest(url, sneLinkData, this.headers)
    }


    getCandidatesByTitle(title) {
        let url = this._GET_CANDIDATES;
        let candidatesData = {
            title: title
        }
        console.log("GETcandidatesData>>>>", candidatesData)
        return this.sendPostRequest(url, candidatesData, '')
    }



    voteToCandidateData(title, selectedCandidate, accesskey) {
        let url = this._VOTE_RESULT;
        let voterData = {
            title: title,
            selection: selectedCandidate,
            accessKey: accesskey
        }
        console.log("voteToCandidateData>>>>", voterData)
        return this.sendPostRequest(url, voterData, '')
    }


    getResult(title) {
        let url = this._GET_RESULT;
        let getResultTitle = {
            title: title
        }
        console.log("getResultTitle>>>>", getResultTitle)
        return this.sendPostRequest(url, getResultTitle, '')
    }

    getAccessForVote(title, accessKey) {
        let url = this._GET_ACCESS_TO_VOTE;
        let getAccessData = {
            title: title,
            accessKey: accessKey
        }
        console.log("getAccessForVote>>>>", getAccessData)
        return this.sendPostRequest(url, getAccessData, '')
    }


    getTitleByAccessKey(accessKey) {
        let url = this._GET_TITLE_BY_ACCESSKEY;
        let accessData = {
            accessKey: accessKey
        }
        console.log("getTitleByAccessKey>>>>", accessData)
        return this.sendPostRequest(url, accessData, '')
    }

}
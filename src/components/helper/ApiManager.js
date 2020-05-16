import axios from 'axios';
import { LocalStorage } from './LocalStorage'


let user = new LocalStorage().getUserData();
user = JSON.parse(user);

export default class ApiManager {


    // userId = user.userId
    // userName = user.name


    // LocalHost
    // _BASE_URL = "http://localhost:4000/api/"
    _BASE_URL = "https://votehub999.herokuapp.com/"


    //USERS
    _USER_SIGNUP = "signup"
    _USER_LOGIN = "signin"
    _USER_EDIT_STATUS = "signup/editstatus"
    _USER_UPDATE = "user/update"
    _USER_GET_BY_ID = "user/get"




    async sendPostRequest(_url, _params, headers) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)
        // console.log("my jwt token>>>>>>.", headers)

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
        return this.sendPostRequest(url, userData, this.headers)
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
        return this.sendPostRequest(url, userData, this.headers)
    }

    editStatus(userEmail) {
        let url = this._USER_EDIT_STATUS;
        let userData = {
            email: userEmail,
        }
        return this.sendPostRequest(url, userData, this.headers)
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



}
// import React, { Component } from 'react'
// import Button from '@material-ui/core/Button';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import { connect } from 'react-redux'
// import ApiManager from '../../helper/ApiManager'
// import { LocalStorage } from '../../helper/LocalStorage';

// class ReviewTest extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             electionTitle: '',
//             orgnization: '',
//             candaidatebtn: 'none',
//             item: {
//                 activeStep: 5,
         
//             },
//             candidates: '',
//             voterData: ''
//         }
//         this.userData = '';

//     }


//     componentDidMount() {


//         if (this.props.location) {
//             if (this.props.location.state) {
//                 console.log("Title>", this.props.location.state.title)
//                 console.log("candidateNames>", this.props.location.state.candidateNames)
//                 this.setState({
//                     electionTitle: this.props.location.state.title,
//                     candidates: this.props.location.state.candidateNames,

//                 })
//                 // Get voters data
//                 // new ApiManager().getVotersData("board").then(result => {
//                 //     if (result.no_result) {
//                 //         return
//                 //     }
//                 //     if (result.data) {
//                 //         if (result.data.error) {
//                 //             alert(result.data.error)
//                 //             return
//                 //         }
//                 //     }
//                 //     if (result.data[0]) {
//                 //         if (result.data[0].voterEmail) {
//                 //             console.log("result getVotersData>>>", result.data[0].voterEmail);
//                 //             this.setState({
//                 //                 voterData: result.data[0].voterEmail
//                 //             })
//                 //         }
//                 //     }
//                 // })
//             }
//         }


//         this.userData = new LocalStorage().getUserData();
//         this.userData = JSON.parse(this.userData);
//         console.log("this.userData>", this.userData)
//         if (this.userData) {
//             this.setState({
//                 orgnization: this.userData.organizationName
//             })
//         }




//     }

//     render() {
       
//         return (
//             <div>
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return state
// }

// const actions = {

// }

// export default connect(mapStateToProps, actions)(ReviewTest)
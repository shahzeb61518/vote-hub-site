import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import validator from 'validator';
import MyTextField from '../../helper/MyTextField'

import Button from '@material-ui/core/Button';

export default class NewElection extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {
                    this.mainBody()
                }
            </div>
        )
    }

    //New Election main body
    mainBody = () => {

        return (
            <div>
            </div>
        )
    }
}

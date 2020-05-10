import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: '14px'
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <AppBar position="static">
                <br />
                <br />
                <div className="row">
                    <div className="col">
                        < h4>About</ h4>
                        <br />
                        <br />
                        <p>VOTE-HUB: An online Election System 2020</p>
                    </div>
                    <div className="col">
                        < h4>Join Us</ h4>
                        <div
                            style={{ marginTop: '30px', padding: '20px' }}>
                            <li
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#3B5998',
                                    color: 'white',
                                }}
                                href="https://www.facebook.com" class="fa fa-facebook"></li>
                            <li
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#dd4b39',
                                    color: 'white'
                                }}
                                href="https://www.gmail.com" class="fa fa-google"></li>
                            <li
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#007bb5',
                                    color: 'white',
                                }}
                                href="https://www.linkedin.com" class="fa fa-linkedin"></li>
                        </div>

                    </div>
                    <div className="col">
                        < h4>Contact</ h4>
                        <br />
                        <br />
                        <p>+92331-4029829</p>
                        <p>Votehub@election.com</p>
                    </div>

                </div>
                <br />
                <br />
                <br />
                <div >
                    <h6> &copy;VOTE-HUB: An online Election System 2020</h6>
                </div>
                <br />

            </AppBar>
        </div >
    );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
        <div className={classes.root} className="footer">
            <AppBar position="static">
                <br />
                <br />
                <div className="row">
                    <div className="col">
                        < h4>About</ h4>
                        <br />
                        <br />
                        <p>Election-Site</p>
                    </div>
                    <div className="col">
                        < h4>Join Us</ h4>
                        <div
                            style={{ marginTop: '30px', padding: '20px' }}>
                            <a
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#3B5998',
                                    color: 'white',
                                }}
                                href="https://www.facebook.com" class="fa fa-facebook"></a>
                            <a
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#dd4b39',
                                    color: 'white'
                                }}
                                href="https://www.gmail.com" class="fa fa-google"></a>
                            <a
                                style={{
                                    padding: '20px',
                                    textDecoration: 'none',
                                    borderRadius: '50%',
                                    background: '#007bb5',
                                    color: 'white',
                                }}
                                href="https://www.linkedin.com" class="fa fa-linkedin"></a>
                        </div>

                    </div>
                    <div className="col">
                        < h4>Cotact</ h4>
                        <br />
                        <br />
                        <p>123-123-123</p>
                        <p>election@election.com</p>
                    </div>

                </div>
                <br />
                <br />
                <br />
                <div >
                    <h6> &copy; Election Site 2020</h6>
                </div>
                <br />

            </AppBar>
        </div >
    );
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Hidden } from '@material-ui/core';
import { requestWithToken } from '../actions/axios';
import MyMatches from '../components/MyMatches';
import MiniDrawer from '../components/MiniDrawer';
import JobProfile from '../components/JobProfile';
import UserProfile from '../components/UserProfile';

class Profile extends Component {
    state = {
        myProfile: false,
        profile: {},
        profileType: '',
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        let profileType = this.props.match.params.accountType;
        let profileOwner = false;
        let accountType = 'user';
        if (this.props.account.hasOwnProperty('companyName')) {
            accountType = 'company';
        }

        if (
            parseInt(id) === this.props.account.id &&
            profileType === accountType
        ) {
            profileOwner = true;
        }

        let url = `/users/${id}`;
        if (profileType === 'job') {
            url = `/jobs/${id}`;
        } else if (profileType === 'company') {
            url = `/company/${id}`;
        }

        if (profileType === 'user' && profileOwner) {
            url = `/users/info`;
        }

        requestWithToken(this.props.token)
            .get(url)
            .then(res => {
                if (accountType === 'company' && profileType === 'job') {
                    if (res.data.company_id === this.props.account.id) {
                        profileOwner = true;
                    }
                }
                this.setState({
                    profile: res.data,
                    myProfile: profileOwner,
                    profileType,
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden xsDown>
                        <Grid
                            item
                            sm={6}
                            md={4}
                            className={classes.profileFirstGrid}
                        >
                            <MyMatches />
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={classes.profileCenterGrid}
                    >
                        {this.state.profileType === 'job' ? (
                            <JobProfile job={this.state.profile} />
                        ) : (
                            ''
                        )}
                        {this.state.profileType === 'user' ? (
                            <UserProfile
                                profile={this.state.profile}
                                myProfile={this.state.myProfile}
                            />
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={4}>
                            <MiniDrawer />
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
    },
    profileHeading: {
        marginTop: '200px',
    },
    profileCenterGrid: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3rem',
        maxHeight: '70vh',
    },

    profileFirstGrid: {
        marginTop: '5%',
    },
    h1: {
        marginTop: '400px',
    },
};

Profile.propTypes = {};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        account: state.accountReducer.account,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(Profile));

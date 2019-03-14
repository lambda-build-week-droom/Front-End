import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Hidden } from '@material-ui/core';
import MiniDrawer from '../components/MiniDrawer';

class Messages extends Component {
    state = {
        myProfile: false,
        profile: {},
    };

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
                            className={classes.messagesFirstGrid}
                        />
                    </Hidden>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={classes.messagesCenterGrid}
                    >
                        <h1 className={classes.messagesHeading}>Messages</h1>
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
        maxWidth: '1000px',
        justifyContent: 'center',
        height: '100vh',
    },
    messagesHeading: {
        marginTop: '200px',
    },
};

Messages.propTypes = {};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        accountId: state.accountReducer.account.id,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(Messages));

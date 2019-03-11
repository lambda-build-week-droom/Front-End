import React, { Component } from 'react';
import { updateAccountInfo } from '../actions/accountActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import SimpleModal from '../components/SimpleModal';
import AccountForm from '../components/AccountForm';
import Spinner from '../components/Spinner';
import MyMatches from '../components/MyMatches';
import MainStream from '../components/MainStream';
import Navigation from '../components/Navigation';

class Main extends Component {
    state = {
        needsInfo: false,
        updatingUserInfo: false,
        error: null,
        account: {},
    };

    componentDidMount() {
        if (this.compareObjects(this.props.account, {})) {
            this.setState({ needsInfo: true, account: this.props.account });
        }
    }

    compareObjects(o1, o2) {
        for (let p in o1) {
            if (o2.hasOwnProperty(p)) {
                if (typeof o1[p] === 'object') {
                    if (!this.compareObjects(o1[p], o2[p])) {
                        return false;
                    }
                } else if (o1[p] !== o2[p]) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const next = {
            account: nextProps.account,
            updatingAccountInfo: nextProps.updatingAccountInfo,
            error: nextProps.error,
            needsInfo: this.state.needsInfo,
        };

        return !this.compareObjects(next, this.state);
    }

    closeModal = () => {
        this.setState({ needsInfo: false });
    };

    getModalContent = props => {
        if (props.modalType === 'spinner') {
            return <Spinner onClose={props.onClose} />;
        }
        return <AccountForm onClose={props.onClose} />;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={4}>
                        <MyMatches />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <h1>Main</h1>
                        <MainStream />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Navigation />
                    </Grid>
                </Grid>
                <SimpleModal
                    open={this.state.needsInfo}
                    onClose={this.closeModal}
                    getModalContent={this.getModalContent}
                    title={'Account Information'}
                    subtitle={'Please fill out the form below.'}
                    modalType={this.state.updatingUserInfo ? 'spinner' : 'form'}
                />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        // TODO ADD CSS in JS using CamelCase
    }
});

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        account: state.accountReducer.account,
        updatingAccountInfo: state.accountReducer.updatingAccountInfo,
        error: state.accountReducer.error,
    };
}

export default connect(
    mapStateToProps,
    { updateAccountInfo }
)(withStyles(styles)(Main));

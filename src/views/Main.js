import React, { Component } from 'react';
import { updateAccountInfo } from '../actions/accountActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import SimpleModal from '../components/SimpleModal';
import AccountForm from '../components/AccountForm';
import Spinner from '../components/Spinner';

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
        if (this.props.updatingAccountInfo) {
            return (
                <SimpleModal
                    open={this.state.needsInfo}
                    onClose={this.closeModal}
                    getModalContent={this.getModalContent}
                    title={'Updating information.'}
                    subtitle={'Please be patient...'}
                    modalType={'spinner'}
                />
            );
        }

        return (
            <div>
                <SimpleModal
                    open={this.state.needsInfo}
                    onClose={this.closeModal}
                    getModalContent={this.getModalContent}
                    title={'Account Information'}
                    subtitle={'Please fill out the form below.'}
                    modalType={'form'}
                />
                Main
            </div>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
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

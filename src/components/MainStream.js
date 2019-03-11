import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MainStreamCard from './MainStreamCard';
import { requestWithToken } from '../actions/axios';

import faker from 'faker';

class MainStream extends Component {
    state = {
        stream: [],
    };

    componentDidMount() {
        requestWithToken(this.props.token)
            .post('/users')
            .then(res => {
                this.setState(state => {
                    return {
                        stream: res.data,
                    };
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.stream.map((card, index) => {
                    return <MainStreamCard card={card} index={index} />;
                })}
            </div>
        );
    }
}

MainStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        accountId: state.accountReducer.account.id,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MainStream));

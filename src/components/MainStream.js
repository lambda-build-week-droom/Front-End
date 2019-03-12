import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MainStreamCard from './MainStreamCard';
import { requestWithToken } from '../actions/axios';
import { getStream } from '../actions/matchActions';

import faker from 'faker';

class MainStream extends Component {
    componentDidMount() {
        let accountType = 'user';

        if (this.props.account.hasOwnProperty('companyName')) {
            accountType = 'company';
        }
        this.props.getStream(this.props.token, accountType);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.stream !== this.props.stream) {
            return true;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.stream.map((card, index) => {
                    if (index > 5) {
                        return;
                    }
                    return (
                        <MainStreamCard
                            key={card.id}
                            card={card}
                            index={index}
                        />
                    );
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
        account: state.accountReducer.account,
        stream: state.matchReducer.stream,
    };
}

export default connect(
    mapStateToProps,
    { getStream }
)(withStyles(styles)(MainStream));

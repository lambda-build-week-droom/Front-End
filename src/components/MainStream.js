import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MainStreamCard from './MainStreamCard';
import { getStream } from '../actions/matchActions';
import { updateAccountInfo } from '../actions/accountActions';

class MainStream extends Component {
    componentDidMount() {
        this.props;
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

    getCards = () => {
        this.props;
        let cards = [];

        if (this.props.stream.length === 0) {
            return cards;
        }
        let length = 5;
        if (this.props.stream.length < 5) {
            length = this.props.stream.length;
        }

        for (let i = 0; i < length; i++) {
            cards.push(
                <MainStreamCard
                    key={this.props.stream[i].id}
                    account={this.props.stream[i]}
                    index={i}
                />
            );
        }

        return cards;
    };

    render() {
        const { classes } = this.props;
        if (this.props.error) {
            return <h2>{this.props.error.message}</h2>;
        }
        return <div className={classes.root}>{this.getCards()}</div>;
    }
}

MainStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        width: '40vw',
        marginTop: '550px',
        paddingTop: '500px',
    },
};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        account: state.accountReducer.account,
        stream: state.matchReducer.stream,
        error: state.matchReducer.error,
    };
}

export default connect(
    mapStateToProps,
    { getStream, updateAccountInfo }
)(withStyles(styles)(MainStream));

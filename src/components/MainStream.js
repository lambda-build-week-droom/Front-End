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
        let streams = [];
        for (let i = 0; i < 5; i++) {
            streams.push({
                title: faker.fake('{{lorem.words}}'),
                description: faker.fake('{{lorem.sentences}}'),
            });
        }
        requestWithToken(this.props.token)
            .get(url)
            .then(res => this.setState({ stream: res.data }))
            .catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.stream.map((card, index) => {
                    if (index > 5) {
                        return;
                    }
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
    root: { width: '40vw' },
};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        account: state.accountReducer.account,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MainStream));

import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Card,
    CardHeader,
    IconButton,
    Avatar,
    Popover,
    Typography,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import faker from 'faker';
import moment from 'moment';
import { Link } from 'react-router-dom';
import uuid4 from 'uuid4';
import MaterialUiPopOver from './MaterialUiPopOver';

class AvatarComponent extends React.Component {
    state = {
        popOverElement: null,
        popoverOpen: false,
        popoverKey: uuid4(),
    };

    handlePopOverClose = event => {
        if (event.target.value !== this.state.popOverElement) {
            console.log('click outer');
            if (this.state.popoverOpen === true) {
                this.setState(prevState => {
                    return {
                        popoverOpen: false,
                    };
                });
            }
            // this.setState(state => {
            //     console.log('click inner');
            //     return {
            //         popOverElement: null,
            //         popoverOpen: false,
            //     };
            // });
        }
    };

    handleVertIconClick = event => {
        this.setState({
            popOverElement: event.currentTarget,
            popoverOpen: true,
        });
    };

    getPopOverContent = id => {
        if (this.props.avatar.hasOwnProperty('companyName')) {
            return <Link to={`/profile/company/${id}`}>View Profile </Link>;
        }
        return <Link to={`/profile/user/${id}`}>View Profile</Link>;
    };

    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     :
    //     if (nextState.popoverOpen !== this.state.popoverOpen) {
    //         return true;
    //     }
    // }

    render() {
        const { classes } = this.props;

        let url = '';
        if (this.props.avatar) {
            if (this.props.avatar.hasOwnProperty('companyName')) {
                url = `/profile/company/${this.props.avatar.id}`;
            } else if (this.props.avatar.hasOwnProperty('jobTitle')) {
                url = `/profile/jobs/${this.props.avatar.id}`;
            } else {
                url = `/profile/user/${this.props.avatar.id}`;
            }
        }

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label={
                                this.props.avatar && this.props.avatar.title
                            }
                            className={classes.bigAvatar}
                            src={faker.fake('{{image.avatar}}')}
                        />
                    }
                    action={<MaterialUiPopOver url={url} />}
                    title={this.props.avatar && this.props.avatar.title}
                    subheader={moment(faker.fake('{{date.past}}')).format(
                        'dddd, MMMM Do YYYY'
                    )}
                />
            </Card>
        );
    }
}

AvatarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    card: {
        maxWidth: 400,
    },
    avatar: {
        backgroundColor: red[500],
    },
};

export default withStyles(styles)(AvatarComponent);

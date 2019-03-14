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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import faker from 'faker';
import moment from 'moment';
import SimplePopover from './SimplePopOver';
import { Link } from 'react-router-dom';

class AvatarComponent extends React.Component {
    state = {
        popOverElement: null,
    };

    handlePopOverClose = () => {
        this.setState({ popOverElement: null });
    };

    handleVertIconClick = event => {
        this.setState({
            popOverElement: event.currentTarget,
        });
    };

    getPopOverContent = id => {
        return (
            <Link replace={true} to={`/profile/${id}`}>
                View Profile
            </Link>
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label={this.props.avatar.title}
                            className={classes.bigAvatar}
                            src={faker.fake('{{image.avatar}}')}
                        />
                    }
                    action={
                        <IconButton onClick={this.handleVertIconClick}>
                            <MoreVertIcon />
                            <SimplePopover
                                anchorEl={this.state.popOverElement}
                                handleClose={this.handlePopOverClose}
                                getContent={this.getPopOverContent}
                                id={this.props.avatar.id}
                            />
                        </IconButton>
                    }
                    title={this.props.avatar.title}
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

import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Card,
    CardHeader,
    IconButton,
    Avatar,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import faker from 'faker';
import moment from 'moment';

const AvatarComponent = props => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label={props.avatar.title}
                        className={classes.bigAvatar}
                        src={faker.fake('{{image.avatar}}')}
                    />
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.avatar.title}
                subheader={moment(faker.fake('{{date.past}}')).format(
                    'dddd, MMMM Do YYYY'
                )}
            />
        </Card>
    );
};

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

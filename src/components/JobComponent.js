import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MaterialUiPopOver from './AvatarComponent';

class JobComponent extends React.Component {
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
            <Link replace={true} to={`/profile/job/${id}/`}>
                View Profile
            </Link>
        );
    };

    render() {
        const { classes } = this.props;
        let url = `/profile/jobs/${this.props.job.id}`;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader
                        action={<MaterialUiPopOver url={url} />}
                        title={this.props.job.jobTitle}
                        className={classes.cardHeader}
                        subheader={moment(this.props.job.jobOpenDate).format(
                            'dddd, MMMM Do YYYY'
                        )}
                    />
                </Card>
            </div>
        );
    }
}

JobComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,
};

const styles = {
    card: {
        maxWidth: 400,
        fontSize: '1.4rem',
    },
    cardHeader: {
        fontSize: '1.2rem',
    },
};

export default withStyles(styles)(JobComponent);

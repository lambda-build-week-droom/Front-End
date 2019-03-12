import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    withStyles,
    Typography,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    IconButton,
    CardActions,
    Collapse,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import red from '@material-ui/core/colors/red';
import faker from 'faker';
import ControlledExpansionPanel from './ControlledExpansionPanel';
import SimpleBottomNavigation from './SimpleBottomNavigation';
import Chip from './Chip';

const styledBy = (property, mapping) => {
    debugger;
    return props => mapping[props[property]];
};

class MainStreamCard extends React.Component {
    state = {
        expanded: false,
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        debugger;
        const { classes, index } = this.props;
        return (
            <Card
                className={classes.card}
                style={{
                    //TODO: ADD CSS Styles
                    position: 'static',
                    width: '100vw',
                    margin: '0 auto 40px'
                }}
            >
                <CardHeader
                    //TODO change title to first & last name. 
                    //TODO update second line to city
                    title={faker.name.jobTitle()}
                    subheader={`${faker.address.city()}`}
                />
                <CardMedia
                    className={classes.media}
                    image={faker.fake('{{image.avatar}}')}
                    title="Paella dish"
                />
                <Chip />
                <ControlledExpansionPanel />
                <SimpleBottomNavigation />
            </Card>
        );
    }
}

MainStreamCard.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
};

const styles = theme => ({
    card: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        maxWidth: 500,
        transform: `translate(-50%, -50%), rotateZ(2deg)`,
    },
    media: {
        height: 300,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

export default withStyles(styles)(MainStreamCard);

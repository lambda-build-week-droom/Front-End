import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Chip from './Chip';
import { Card, CardHeader, CardMedia } from '@material-ui/core';
import ControlledExpansionPanel from './ControlledExpansionPanel';
import SimpleBottomNavigation from './SimpleBottomNavigation';

const CardDetails = ({
    classes,
    title = '',
    subheader = '',
    image = '',
    imageTitle = '',
    chips = [],
}) => {
    return (
        <>
            <CardHeader
                //TODO change title to first & last name.
                //TODO update second line to city
                title={title}
                subheader={subheader}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={!!imageTitle ? imageTitle : 'No image title.'}
            />
            <Chip chips={chips} />
            <ControlledExpansionPanel />
            <SimpleBottomNavigation />
        </>
    );
};

CardDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    subheader: PropTypes.string,
    image: PropTypes.string,
    imageTitle: PropTypes.string,
    chips: PropTypes.array,
};

const styles = {
    root: {},
    media: {
        height: '200px',
    },
};

export default withStyles(styles)(CardDetails);

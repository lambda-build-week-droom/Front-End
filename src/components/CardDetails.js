import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Chip from './Chip';
import { Card, CardHeader, CardMedia } from '@material-ui/core';
import ControlledExpansionPanel from './ControlledExpansionPanel';
import SimpleBottomNavigation from './SimpleBottomNavigation';

const CardDetails = ({
    classes,
    title,
    subheader,
    image,
    imageTitle = null,
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
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageTitle: PropTypes.string,
    chips: PropTypes.array,
};

const styles = {
    root: {},
};

export default withStyles(styles)(CardDetails);

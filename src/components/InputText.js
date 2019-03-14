import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';

function getName(words) {
    let splitWords = words.toLowerCase().split(' ');
    for (let i = 1; i < splitWords.length; i++) {
        splitWords[i] =
            splitWords[i].charAt(0).toUpperCase() + splitWords[i].slice(1);
    }

    return splitWords.join('');
}

const InputText = ({
    label,
    multiLine = false,
    rows = 5,
    fullWidth = false,
    name = null,
    errors = [],
    classes,
    ...rest
}) => (
    <TextField
        {...rest}
        multiline={multiLine}
        name={!!name ? name : getName(label)}
        label={label}
        className={classes.textField}
        margin="normal"
        rows={rows}
        fullWidth={fullWidth}
        error={errors.includes(getName(label))}
    />
);

InputText.propTypes = {
    label: PropTypes.string,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    fullWidth: PropTypes.bool,
    name: PropTypes.string,
    errors: PropTypes.array,
    classes: PropTypes.object.isRequired,
};

const styles = {
    textField: {},
};
export default withStyles(styles)(InputText);

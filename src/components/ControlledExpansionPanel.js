import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import faker from 'faker';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
        title: [
            faker.fake('{{name.jobDescriptor}}'),
            faker.fake('{{name.jobDescriptor}}'),
            faker.fake('{{name.jobDescriptor}}'),
        ],
        subtitle: [
            faker.fake('{{lorem.words}}'),
            faker.fake('{{lorem.words}}'),
            faker.fake('{{lorem.words}}'),
        ],
        description: [
            faker.fake('{{lorem.paragraphs}}'),
            faker.fake('{{lorem.paragraphs}}'),
            faker.fake('{{lorem.paragraphs}}'),
        ],
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    getExpansionPanels = classes => {
        let panels = [];
        for (let i = 0; i < 3; i++) {
            let panel = (
                <ExpansionPanel
                    expanded={this.state.expanded === `panel${i}`}
                    onChange={this.handleChange(`panel${i}`)}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {this.state.title[i]}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {this.state.subtitle[i]}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.state.description[i]}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );

            panels.push(panel);
        }
        return panels;
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.getExpansionPanels(classes)}
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);

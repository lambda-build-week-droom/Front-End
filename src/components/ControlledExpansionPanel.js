import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Google</Typography>
                        <Typography className={classes.secondaryHeading}>Senior Software Engineer</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <ul>
                                <li style={{ textAlign: 'left' }}>Summary of past job details. Max 3 bullets</li>
                                <li style={{ textAlign: 'left' }} > Success seed round backing conversion freemium traction long tail twitter startup strategy gen-z buyer beta release.Founders funding ownership. Conversion bandwidth influencer return on investment strategy churn rate investor traction crowdsource. Client social media iPad stealth vesting period marketing.</li>
                                <li style={{ textAlign: 'left' }} > Lean startup business-to-consumer funding paradigm shift.Seed money sales hackathon interaction design market buyer iteration infrastructure success. Stealth stock influencer hypotheses assets freemium growth hacking customer holy grail buyer android pivot supply chain first mover advantage.</li>
                                <li style={{ textAlign: 'left' }} > Freemium hackathon partnership alpha growth hacking research & development metrics. Market interaction design partner network launch party social proof beta iPhone sales android product management network effects early adopters business plan. Technology marketing seed money interaction design traction hackathon freemium rockstar success gen-z. </li>
                            </ul>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            AirBNB
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            Software Engineer
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ul>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Summary of past job details. Max 3 bullets
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Success seed round backing conversion freemium
                                traction long tail twitter startup strategy
                                gen-z buyer beta release.Founders funding
                                ownership. Conversion bandwidth influencer
                                return on investment strategy churn rate
                                investor traction crowdsource. Client social
                                media iPad stealth vesting period marketing.
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Lean startup business-to-consumer funding
                                paradigm shift.Seed money sales hackathon
                                interaction design market buyer iteration
                                infrastructure success. Stealth stock influencer
                                hypotheses assets freemium growth hacking
                                customer holy grail buyer android pivot supply
                                chain first mover advantage.
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Freemium hackathon partnership alpha growth
                                hacking research & development metrics. Market
                                interaction design partner network launch party
                                social proof beta iPhone sales android product
                                management network effects early adopters
                                business plan. Technology marketing seed money
                                interaction design traction hackathon freemium
                                rockstar success gen-z.{' '}
                            </li>
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    expanded={expanded === 'panel3'}
                    onChange={this.handleChange('panel3')}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Microsoft
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            Software Engineer Developer
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ul>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Summary of past job details. Max 3 bullets
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Success seed round backing conversion freemium
                                traction long tail twitter startup strategy
                                gen-z buyer beta release.Founders funding
                                ownership. Conversion bandwidth influencer
                                return on investment strategy churn rate
                                investor traction crowdsource. Client social
                                media iPad stealth vesting period marketing.
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Lean startup business-to-consumer funding
                                paradigm shift.Seed money sales hackathon
                                interaction design market buyer iteration
                                infrastructure success. Stealth stock influencer
                                hypotheses assets freemium growth hacking
                                customer holy grail buyer android pivot supply
                                chain first mover advantage.
                            </li>
                            <li style={{ textAlign: 'left' }}>
                                {' '}
                                Freemium hackathon partnership alpha growth
                                hacking research & development metrics. Market
                                interaction design partner network launch party
                                social proof beta iPhone sales android product
                                management network effects early adopters
                                business plan. Technology marketing seed money
                                interaction design traction hackathon freemium
                                rockstar success gen-z.{' '}
                            </li>
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardMedia } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import faker from 'faker';
import Hammer from 'react-hammerjs';
import { connect } from 'react-redux';
import { approveMatch, disApproveMatch } from '../actions/matchActions';
import ControlledExpansionPanel from './ControlledExpansionPanel';
import SimpleBottomNavigation from './SimpleBottomNavigation';
import Chip from './Chip';

class MainStreamCard extends React.Component {
    state = {
        expanded: false,
        cardRef: React.createRef(),
        isDragging: false,
        xPosition: 50,
        title: faker.fake('{{lorem.words}}'),
        imageAvatar: faker.fake('{{image.avatar}}'),
        image: faker.fake('{{image.image}}'),
        city: faker.fake('{{address.city}}'),
    };

    onDoubleTap = () => {
        this.props.approveMatch(this.props.card.id);
    };

    onPanEnd = () => {
        this.setState({ xPosition: 50 });
    };

    onSwipe = props => {
        if (props.direction !== 2) {
            return;
        }
        this.props.disApproveMatch(this.props.card.id);
    };

    onPan = props => {
        let deltaX = props.deltaX / 100;
        console.log(this.state.xPosition);
        if (this.state.xPosition > 90) {
            if (deltaX <= 0) {
                return;
            }
        }

        if (this.state.xPosition < 30) {
            if (deltaX >= 0) {
                return;
            }
        }

        if (props.isFinal) {
            this.onPanEnd();
            return;
        }

        this.setState(state => {
            return {
                xPosition: state.xPosition - deltaX,
            };
        });
    };

    render() {
        const { classes, index } = this.props;
        const options = {
            touchAction: 'compute',
            recognizers: {
                tap: {
                    time: 600,
                    threshold: 100,
                },
            },
        };
        return (
            <Hammer
                onDoubleTap={this.onDoubleTap}
                onSwipe={this.onSwipe}
                onPan={this.onPan}
                onPanEnd={this.onPanEnd}
                options={options}
            >
                <div>
                    <Card
                        className={classes.card}
                        style={{
                            //TODO: ADD CSS Styles
                            width: '100vw',
                            margin: '0 auto 40px',
                            zIndex: `${-index}`,
                            transform: `translate(-${
                                this.state.xPosition
                            }%, -20%) rotateZ(${index})`,
                        }}
                    >
                        <CardHeader
                            //TODO change title to first & last name.
                            //TODO update second line to city
                            title={this.state.title}
                            subheader={this.state.city}
                        />
                        <CardMedia
                            className={classes.media}
                            image={this.state.image}
                            title="Paella dish"
                        />
                        <Chip />
                        <ControlledExpansionPanel />
                        <SimpleBottomNavigation />
                    </Card>
                </div>
            </Hammer>
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
        transition: 'all .5s',
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

export default connect(
    null,
    { approveMatch, disApproveMatch }
)(withStyles(styles)(MainStreamCard));

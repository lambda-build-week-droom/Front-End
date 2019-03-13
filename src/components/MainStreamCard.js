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
import CardDetails from './CardDetails';

class MainStreamCard extends React.Component {
    state = {
        expanded: false,
        xPosition: 0,
        yPosition: 50,
        zRotation: this.props.index,
        removingCard: false,
    };

    onDoubleTap = () => {
        this.props.approveMatch(this.props.card.id);
    };

    onPanEnd = props => {
        if (this.state.removingCard) {
            return;
        }
        this.setState({
            xPosition: 0,
            yPosition: 50,
            zRotation: 0 + this.props.index,
        });
    };

    onSwipe = props => {
        if (props.direction !== 2) {
            return;
        }

        this.setState({
            xPosition: -50,
            yPosition: 60,
            zRotation: -4,
            removingCard: true,
        });
        setTimeout(() => {
            this.props.disApproveMatch(this.props.card.id);
        }, 500);
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.index !== this.props.index) {
            this.setState({ zRotation: nextProps.index });
            return true;
        }
    }

    onPan = props => {
        let deltaX = props.deltaX / 100;

        if (this.state.xPosition < -50) {
            if (deltaX < 0) {
                return;
            }
        }

        if (this.state.xPosition > 40) {
            if (deltaX > 0) {
                this.onPanEnd();
            }
        }

        if (props.isFinal) {
            this.onPanEnd();
            return;
        }
        console.log('x:', this.state.xPosition);
        console.log('y:', this.state.yPosition);
        console.log('z:', this.state.zRotation);
        this.setState(state => {
            return {
                xPosition: state.xPosition + deltaX,
                yPosition: state.yPosition - deltaX / 3,
                zRotation: state.zRotation + deltaX / 10,
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
                            margin: '0 auto 40px',
                            zIndex: `${-index}`,
                            transform: `translate(${this.state.xPosition}px, ${
                                this.state.yPosition
                            }px) rotateZ(${this.state.zRotation}deg)`,
                            opacity: this.state.removingCard ? 0 : 1,
                            backgroundImage: `linear-gradient(to bottom right, rgba(255, 0, 0, ${(this
                                .state.xPosition *
                                -1) /
                                100 -
                                0.5}), rgba(255, 0, 0, ${(this.state.xPosition *
                                -1) /
                                100 -
                                0.2})`,
                        }}
                    >
                        <CardDetails
                            image={this.props.card.image}
                            title={this.props.card.title}
                            subheader={this.props.card.subHeader}
                            chips={this.props.card.tags}
                            discription={this.props.card.description}
                        />
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
        top: '10%',
        maxWidth: 500,
        transition: 'all .5s',
        transformOrigin: 'bottom left',
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

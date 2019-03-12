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
import Hammer from 'react-hammerjs';
import { connect } from 'react-redux';
import { approveMatch, disApproveMatch } from '../actions/matchActions';

const styledBy = (property, mapping) => {
    return props => mapping[props[property]];
};

class MainStreamCard extends React.Component {
    state = {
        expanded: false,
        cardRef: React.createRef(),
        isDragging: false,
        xPosition: 50,
        title: faker.fake('{{lorem.words}}'),
        imageAvatar: faker.fake('{{image.avatar}}'),
        image: faker.fake('{{image.image}}'),
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
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
            <>
                <Hammer
                    onTap={this.handleTap}
                    options={options}
                    onPan={this.onPan}
                    onPanEnd={this.onPanEnd}
                    onDoubleTap={this.onDoubleTap}
                    onSwipe={this.onSwipe}
                >
                    <div>
                        <Card
                            className={classes.card}
                            style={{
                                zIndex: 0 - index,
                                transform: `translate(-${
                                    this.state.xPosition
                                }%, -${50}%) rotateZ(${index}deg)`,
                                transformOrigin: 'top right',
                                backgroundImage: ` linear-gradient(to bottom right, rgba(108, 15, 15, ${(this
                                    .state.xPosition -
                                    100) /
                                    10}), rgb(191, 33, 33,${(this.state
                                    .xPosition -
                                    60) /
                                    10}))`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="Recipe"
                                        className={classes.bigAvatar}
                                        src={this.state.imageAvatar}
                                    />
                                }
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={this.state.title}
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                className={classes.media}
                                image={this.state.image}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography component="p">
                                    {this.props.index}
                                    This impressive paella is a perfect party
                                    dish and a fun meal to cook together with
                                    your guests. Add 1 cup of frozen peas along
                                    with the mussels, if you like.
                                </Typography>
                            </CardContent>
                            <CardActions
                                className={classes.actions}
                                disableActionSpacing
                            >
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state
                                            .expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse
                                in={this.state.expanded}
                                timeout="auto"
                                unmountOnExit
                            >
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until
                                        simmering, add saffron and set aside for
                                        10 minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella
                                        pan or a large, deep skillet over
                                        medium-high heat. Add chicken, shrimp
                                        and chorizo, and cook, stirring
                                        occasionally until lightly browned, 6 to
                                        8 minutes. Transfer shrimp to a large
                                        plate and set aside, leaving chicken and
                                        chorizo in the pan. Add pimentón, bay
                                        leaves, garlic, tomatoes, onion, salt
                                        and pepper, and cook, stirring often
                                        until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining
                                        4 1/2 cups chicken broth; bring to a
                                        boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to
                                        distribute. Top with artichokes and
                                        peppers, and cook without stirring,
                                        until most of the liquid is absorbed, 15
                                        to 18 minutes. Reduce heat to
                                        medium-low, add reserved shrimp and
                                        mussels, tucking them down into the
                                        rice, and cook again without stirring,
                                        until mussels have opened and rice is
                                        just tender, 5 to 7 minutes more.
                                        (Discard any mussels that don’t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest
                                        for 10 minutes, and then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                </Hammer>
            </>
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
        maxWidth: 400,
        transform: `translate(-50%, -50%), rotateZ(2deg)`,
        transition: 'all .5s',
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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

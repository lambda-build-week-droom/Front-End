import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 360,
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
    },
});

class ListItemLink extends React.Component {
    renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

    render() {
        const { icon, primary } = this.props;
        return (
            <li>
                <ListItem button component={this.renderLink}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={primary} />
                </ListItem>
            </li>
        );
    }
}

ListItemLink.propTypes = {
    icon: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

// function ListItemLinkShorthand(props) {
//     const { primary, to } = props;
//     return (
//         <li>
//             <ListItem button component={Link} to={to}>
//                 <ListItemText primary={primary} />
//             </ListItem>
//         </li>
//     );
// }

// ListItemLinkShorthand.propTypes = {
//     primary: PropTypes.node.isRequired,
//     to: PropTypes.string.isRequired,
// };

export default withStyles(styles)(ListItemLink);

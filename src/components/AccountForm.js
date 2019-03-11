import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAccountInfo } from '../actions/accountActions';
import { withStyles } from '@material-ui/core';
import InputText from './InputText';
import DroomButton from './DroomButton';
import uuid4 from 'uuid4';
import SimpleModal from './SimpleModal';

class AccountForm extends Component {
    state = {
        links: [''],
        open: false,
        errors: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        let account = {};
        let errors = [];
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name) {
                if (e.target[i].value === '') {
                    errors.push(e.target[i].name);
                }
                account[e.target[i].name] = e.target[i].value;
            }
        }

        if (errors.length > 0) {
            this.setState({ errors: errors });
            return;
        }

        this.props.updateAccountInfo(account);
        this.props.onClose();
    };

    addLink = e => {
        e.preventDefault();
        let link = '';
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name === 'link') {
                link = e.target[i].value;
            }
        }
        if (link === '') {
            return;
        }
        this.setState(state => {
            return { links: [...state.links, link] };
        });
    };

    showAddLink = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getModalContent = props => {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    e.persist();
                    props.onSubmit(e);
                    props.onClose();
                }}
            >
                <InputText label={'Link'} />
                <DroomButton text={'Submit'} type={'submit'} />
            </form>
        );
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputText
                        label={'First Name'}
                        errors={this.state.errors}
                    />
                    <InputText label={'Last Name'} errors={this.state.errors} />
                    <InputText label={'Headline'} errors={this.state.errors} />
                    <InputText
                        label={'About Me'}
                        multiLine={true}
                        fullWidth={true}
                        errors={this.state.errors}
                    />
                    <p>Links</p>
                    {this.state.links.map(link => {
                        return <p key={uuid4()}>{link}</p>;
                    })}
                    <DroomButton onClick={this.showAddLink} text={'Add Link'} />
                    <DroomButton type={'submit'} text={'submit'} />
                    {this.state.errors > 0 && (
                        <p>"You must fill out the entire form."</p>
                    )}
                </form>
                <SimpleModal
                    open={this.state.open}
                    onClose={this.handleClose}
                    title={'Add Link'}
                    getModalContent={this.getModalContent}
                    onSubmit={this.addLink}
                />
            </div>
        );
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    form: {
        maxWidth: '30rem',
        display: 'flex',
        flexDirection: 'column',
    },
});

const mapStateToProps = state => {
    let error = null;
    if (state.error) {
        error['text'] = state.appReducer.error;
    }
    if (error) {
        return {
            errors: [error],
        };
    }
    return { errors: [] };
};

export default connect(
    mapStateToProps,
    { updateAccountInfo }
)(withStyles(styles)(AccountForm));

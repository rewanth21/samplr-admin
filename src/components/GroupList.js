import React, { Component, PropTypes } from 'react';

export default class GroupList extends Component {

    componentWillMount () {
        this.props.userGetGroups(this.props.user.userId);
    }


    render() {
        const { user, groups } = this.props;

        if (groups.isLoading) {
            return (
                <div className="container">Loading groups...</div>
            );
        }

        if (groups.list.length === 0) {
            return (
                <div className="container">You have no groups.</div>
            );
        }

        return (
            <div className="container">
                You have {groups.list.length} groups!
            </div>
        );
    }

}

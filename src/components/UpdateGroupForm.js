import React, { Component, PropTypes } from 'react';

import { Input, Button } from 'react-bootstrap';

export default class UpdateGroupForm extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        group: PropTypes.object.isRequired
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const { updateGroup } = this.props;

        updateGroup({
            id: this.props.group.id,
            model: {
                name: this.refs.name.getValue()
            }
        });
    }

    render() {

        const { updateGroupForm: { name, isLoading }, group } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type='text'
                    id='name'
                    ref="name"
                    defaultValue={group.name}
                    label="Group name"
                    placeholder="Please enter a new name"/>

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Update Group</span> }
                </Button>
            </form>
        );
    }

}

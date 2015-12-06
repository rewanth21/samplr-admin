import React, { Component, PropTypes } from 'react';

import { Input, Button, Panel } from 'react-bootstrap';

export default class CreateGroupForm extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        createGroup: PropTypes.func.isRequired
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const { createGroup } = this.props;

        createGroup({
            name: this.refs.name.getValue()
        });
    }

    render() {
        const { createGroupForm: { name, isLoading } } = this.props;

        return (
            <div className="container">
                <h1>Create a new user group</h1>
                <Panel>
                    <form onSubmit={this.handleFormSubmit}>
                        <Input type='text'
                            id='name'
                            ref="name"
                            defaultValue={name}
                            label="Group name"
                            placeholder="Please enter a name for this group"/>

                        <Button type="submit"
                            bsStyle="primary"
                            disabled={isLoading}>
                            { isLoading ? <span>Loading...</span> : <span>Create Group</span> }
                        </Button>
                    </form>
                </Panel>
            </div>
        );
    }

}

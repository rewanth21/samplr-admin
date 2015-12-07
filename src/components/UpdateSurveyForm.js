import React, { Component, PropTypes } from 'react';

import { Input, Button } from 'react-bootstrap';

export default class UpdateSurveyForm extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        group: PropTypes.object.isRequired,
        survey: PropTypes.object.isRequired
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const { updateSurvey } = this.props;

        updateSurvey({
            groupId: this.props.group.id,
            surveyId: this.props.survey.id,
            model: {
                name: this.refs.name.getValue()
            }
        });
    }

    render() {

        const { updateSurveyForm: { name, isLoading }, group, survey } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type='text'
                    id='name'
                    ref="name"
                    defaultValue={survey.name}
                    label="Survey name"
                    placeholder="Please enter a new name"/>

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Update Survey</span> }
                </Button>
            </form>
        );
    }

}

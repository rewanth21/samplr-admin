import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button } from 'react-bootstrap';
import _ from 'lodash';

export default class SurveyQuestionsForm extends Component {

    handleFormSubmit = (e) => {
        e.preventDefault();

        //const { addQuestion } = this.props;

        // addQuestion({
        //     name: this.refs.name.getValue(),
        //     groupId: this.props.groupId,
        //     schedule: this.props.addSurveyQuestionForm.schedule
        // });
    }

    render() {
        const { addSurveyQuestionForm: { name, isLoading } } = this.props;
        return <span>FUCK</span>;
        return (
            <form onSubmit={this.handleFormSubmit}>

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Continue</span> }
                </Button>
            </form>
        );
    }

}

import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button } from 'react-bootstrap';
import CheckBoxList from 'react-checkbox-list';
import _ from 'lodash';

export default class CreateGroupForm extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        createSurveyForm: PropTypes.object.isRequired
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const { createSurvey } = this.props;

        createSurvey({
            name: this.refs.name.getValue(),
            groupId: this.props.groupId,
            schedule: this.props.createSurveyForm.schedule
        });
    }

    saveList (values) {
        console.log("values::",values);
        this.props.createSurveyForm.schedule = _.map(values, (x) => {
            return {
                time: x
            }
        });
    }

    render() {
        const { createSurveyForm: { name, isLoading } } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type='text'
                    id='name'
                    ref="name"
                    defaultValue={name}
                    label="Survey name"
                    placeholder="Please enter a name for this survey"/>

                <b>Schedule</b><br />
                <CheckBoxList defaultData={ENUMS.SURVEY_TIMES}
                    onChange={this.saveList.bind(this)}
                    ref="schedule"/>

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Continue</span> }
                </Button>
            </form>
        );
    }

}

import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button, Panel, Well, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';
import {reduxForm} from 'redux-form';

import DateRangePicker from 'react-daterange-picker';

const formFields = [
    'userId',
    'dateRange',
    'start',
    'end'
]

class SurveyUsersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRange: null
        };
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        addSurveyUserForm: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const userId = this.props.fields.userId.value;
        const dateRange = this.state.dateRange;

        if (!userId || !dateRange) {
            alert('User and date range required.');
        }

        let request = {
            surveyId: this.props.surveyId,
            data: {
                userId: this.props.fields.userId.value,
                start: dateRange.start.toDate().getTime(),
                end: dateRange.end.toDate().getTime()
            }
        };
        this.props.addSurveyUser(request);
        this.setState({ dateRange: null});
        this.props.resetForm();
    }

    onDateSelect (range) {
        this.setState({ dateRange: range});
    }

    render() {
        const {
            fields: { userId, dateRange },
            submitting,
            users,
            addSurveyUserForm: { isLoading }
        } = this.props;

        let stateDefinitions = {
            available: {
                color: null,
                label: 'Available',
            }
        }

        if (users.list.length === 0) {
            return (
                <p>
                    You have no users assigned to you
                </p>
            );
        }

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">
                            User
                        </label>
                        <div className="col-sm-10">
                            <select className="form-control" {...userId}>
                                <option></option>
                                {users.list.map((user, index) => {
                                    return (
                                        <option key={index}
                                            value={user.id}>
                                            {user.email}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">
                            Date Range
                        </label>
                        <div className="col-sm-10">
                            <DateRangePicker
                                firstOfWeek={0}
                                numberOfCalendars={2}
                                stateDefinitions={stateDefinitions}
                                defaultState="available"
                                showLegend={true}
                                selectionType="range"
                                minimumDate={new Date()}
                                onSelect={this.onDateSelect.bind(this)}
                                value={this.state.dateRange}/>
                        </div>
                    </div>
                </div>

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Add User</span> }
                </Button>
            </form>
        );
    }

}

export default reduxForm({
    form: 'simple',
    fields: formFields
})(SurveyUsersForm);

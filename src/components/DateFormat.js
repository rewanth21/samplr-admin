import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class DateFormat extends Component {
    static propTypes = {
        date: PropTypes.string.isRequired,
        format: PropTypes.string
    };

    render () {
        const { date } = this.props;
        const formattedDate = moment(date)
            .format(this.props.format || 'MMMM Do YYYY, h:mm:ss a');
        return (
            <span>{formattedDate}</span>
        );
    }
}

import React, { Component } from 'react';
import Spinner from 'react-spinkit';

export default class Loading extends Component {
    render () {
        return (
            <div className="text-center">
                <Spinner style={{width: 'auto'}} spinnerName='wave'/>
                <h2>Loading...</h2>
            </div>
        )
    }
}

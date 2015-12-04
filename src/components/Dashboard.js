import React from 'react';

export default class Dashboard {

    render() {
        const { tokenDeleted, user: { username } } = this.props;

        return (
            <div>
                <button onClick={tokenDeleted}>Log Out</button>
            </div>
        );
    }

}

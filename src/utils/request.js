import superagentDefaults from 'superagent-defaults';

const superagent = superagentDefaults();

superagent
    .set('Content-Type', 'application/json');

export default superagent;

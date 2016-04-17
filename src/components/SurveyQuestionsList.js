import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

function select(state) {
    return {
        surveyQuestions: state.surveyQuestions,
    };
}

class SurveyList extends Component {

    componentWillMount () {
        this.props.getSurveyQuestions(this.props.surveyId);
    }
    
    getBranchQuestions(question) {
    var branchQuestionDropdown = _.filter(this.props.surveyQuestions.list, function(o) { return o.isBranchQuestion == true });

     let filteredQuestions = []; 
    if(question.branches !== null){
        for(var i = 0; i < branchQuestionDropdown.length; i++){
        for(var j = 0; j< question.branches.length ; j++){  
                if(question.branches[j].branchId == branchQuestionDropdown[i].id){
                    filteredQuestions.push(branchQuestionDropdown[i]);
                    
                }
            }
    }
    }

    return filteredQuestions;
            
    }

    getExpectedResponse(question){
        if(question.responses !== null){
            console.log(question.responses);
            for(var i=0; i< question.responses.length ; i++){
                if(question.responses[i].value == question.expectedValue){
                    return question.responses[i].text;
                }
            }
                    return "None";
        } 
    }


    render() {
        const { survey, surveyQuestions , group , groupId} = this.props;

        if (surveyQuestions.isLoading) {
            return (
                <p>Loading survey questions...</p>
        );
        }

        if (surveyQuestions.list.length === 0) {
            return (
                <p>This survey has no questions.</p>
        );
        }
        
        var mainQuestions = _.filter(surveyQuestions.list, function(o) { return o.isBranchQuestion !== true });

        return (
            <ListGroup>
            {mainQuestions.map((question, index) => {
                return (

                    <ListGroupItem key={index}>
                    <div className="row">
                    <div className="col-md-4"><b>{question.title}</b></div>
                <div className="col-md-4 text-right">
                    <Link to={'/group/' + this.props.groupId + '/survey/' +question.surveyId+ '/question/' +question.id}
                className="btn btn-primary btn-sm">
                    Branch Question
                </Link>
                 </div>
                </div>
                <div>
                <ul>
                {question.responses.map((resp, index) => {
                    return (
                        <li key={index}>
                        {resp.value}: {resp.text}
                    </li>
                    );
                })}
                </ul>
                </div>
                <br></br>
                {question.expectedValue !== 0 && 
                  <div>
                    <i> Branch to following questions for response "{this.getExpectedResponse(question)}"</i> 
                  </div>  
                }
                <div>
                 <ListGroup>
                {this.getBranchQuestions(question).map((quest, index) => {
                return (

                    <ListGroupItem key={index}>
                    <div className="row">
                    <div className="col-md-4"><i>{quest.title}</i></div>
                
                </div>
                <div>
                <ul>
                {quest.responses.map((respo, index) => {
                    return (
                        <li key={index}>
                        {respo.value}: {respo.text}
                    </li>
                    );
                })}
                </ul>
                </div>
                </ListGroupItem>

                );
            })}
    </ListGroup>
                </div>
                </ListGroupItem>

                );
            })}
    </ListGroup>
    );
    }

}

export default connect(select)(SurveyList);
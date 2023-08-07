import { useState } from 'react';

const AnswerDisplay = ({sendExpressionToDisplay}) => {

    var displayedExpression = sendExpressionToDisplay;

    return (
        <div id={`answerDisplay`}>
            {displayedExpression}
        </div>
    );
}

export default AnswerDisplay;
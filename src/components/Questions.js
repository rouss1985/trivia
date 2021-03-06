import React, { Component } from 'react';


class Questions extends Component {
    constructor(){
        super();
        this.state= {
            questions: [],
            results: [],
            counter: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

   

    handleClick(event){
        event.target.parentElement.style.display = 'none'
        let newResults = [...this.state.results]
        let selectedAnswer = event.target.innerText
        if(this.state.correct_answer.indexOf(selectedAnswer) === -1){
            newResults.push('incorrect')
            
        } else {
            newResults.push('correct')
            this.setState({counter: this.state.counter + 1})
        }
        this.setState({results: newResults})
    }




    componentDidMount(){
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then((response) => {
            return response.json()
            })
            .then((response) => {
            let correctAnswers = []
            response.results.forEach((element) =>{
                correctAnswers.push(element.correct_answer)
            })
            this.setState({questions: response.results, correct_answer: correctAnswers}, function(){console.log(this.state)})
            })
        }
    render(){
        if(this.state.questions.length > 0){
            return(
                <div>   
                    {this.state.questions.map((item, i) => {
                        let answerArray = [...item.incorrect_answers, item.correct_answer]
                        function shuffle( arr ){
                            return arr.sort( () => Math.random() - 0.5 );
                            }
                        // console.log(answerArray)
                        let sortedAnswer = shuffle( answerArray ) ;
                        // console.log(sortedAnswer)
                        return <div key={i}>
                            <h4>{item.question}</h4>
                            <button onClick={this.handleClick}>{sortedAnswer[0]}</button>
                            <button onClick={this.handleClick}>{sortedAnswer[1]}</button>
                            <button onClick={this.handleClick}>{sortedAnswer[2]}</button>
                            <button onClick={this.handleClick}>{sortedAnswer[3]}</button>

                        </div>
                    })}

                    <p>Respuestas Correctas: {this.state.counter}</p>
                    
                </div>
            )

        } else {
            return <div>Cargando...</div>

        }
    
    }
}

export default Questions;

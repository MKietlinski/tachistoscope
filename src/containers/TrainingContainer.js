import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import ActionForm from "../forms/ActionForm";
import AnswerBlink from "../components/AnswerBlink";

class TrainingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: 0,
      countCorrect: 0,
      countIncorrect: 0,
      currentValue: 0
    };

    this.incrementAnsweredAndCorrectCount = this.incrementAnsweredAndCorrectCount.bind(this);
    this.incrementAnsweredAndIncorrectCount = this.incrementAnsweredAndIncorrectCount.bind(this);
    this.generateAndSetCurrentValue = this.generateAndSetCurrentValue.bind(this);
  }

  componentDidMount() {
    this.generateAndSetCurrentValue();
  }

  generateAndSetCurrentValue() {
    const {length} = this.props.parameters;
    const value = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    this.setState({currentValue: value});
  }

  incrementAnsweredAndCorrectCount() {
    this.setState({
      answered: this.state.answered + 1,
      countCorrect: this.state.countCorrect + 1,
    });
    this.generateAndSetCurrentValue();
  }

  incrementAnsweredAndIncorrectCount() {
    this.setState({
      answered: this.state.answered + 1,
      countIncorrect: this.state.countIncorrect + 1,
    });
    this.generateAndSetCurrentValue();
  }

  render() {
    return (
      <div className="border p-3">
        <h2 className="text-center">Answered {this.state.answered}</h2>
        <h4 className="text-center">
          <span className="text-success">Correct {this.state.countCorrect}</span> / <span className="text-danger">Incorrect {this.state.countIncorrect}</span>
        </h4>
        <AnswerBlink parameters={this.props.parameters} currentValue={this.state.currentValue}/>
        <ActionForm handleCorrectAnswer={this.incrementAnsweredAndCorrectCount} handleIncorrectAnswer={this.incrementAnsweredAndIncorrectCount} correctAnswer={this.state.currentValue}/>
        <Button className="btn-danger mt-4" onClick={this.props.endTraining}>Back to settings</Button>
      </div>
    );
  }
}

TrainingContainer.propTypes = {
  endTraining: PropTypes.func.isRequired,
  parameters: PropTypes.shape({
    size: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  })
};

export default TrainingContainer;

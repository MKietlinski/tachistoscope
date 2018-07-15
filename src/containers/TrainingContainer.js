import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import ActionForm from "../forms/ActionForm";

class TrainingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: 0,
      countCorrect: 0,
      countIncorrect: 0,
      currentValue: ''
    };

    this.incrementAnsweredAndCorrectCount = this.incrementAnsweredAndCorrectCount.bind(this);
    this.incrementAnsweredAndIncorrectCount = this.incrementAnsweredAndIncorrectCount.bind(this);
  }

  incrementAnsweredAndCorrectCount() {
    this.setState({
      answered: this.state.answered + 1,
      countCorrect: this.state.countCorrect + 1,
    })
  }

  incrementAnsweredAndIncorrectCount() {
    this.setState({
      answered: this.state.answered + 1,
      countIncorrect: this.state.countIncorrect + 1,
    })
  }

  render() {
    return (
      <div className="border p-3">
        <Button className="btn-danger position-absolute" onClick={this.props.endTraining}>Back to settings</Button>
        <h2 className="text-center">Answered {this.state.answered}</h2>
        <h4 className="text-center">
          <span className="text-success">Correct {this.state.countCorrect}</span> / <span className="text-danger">Incorrect {this.state.countIncorrect}</span>
        </h4>

        <ActionForm handleCorrectAnswer={this.incrementAnsweredAndCorrectCount} handleIncorrectAnswer={this.incrementAnsweredAndIncorrectCount} correctAnswer={this.state.currentValue}/>
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

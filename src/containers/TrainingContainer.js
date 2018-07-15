import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import ActionForm from "../forms/ActionForm";

class TrainingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      countValid: 0,
      countInvalid: 0,
      currentValue: ''
    };

    this.handleInvalidAction = this.handleInvalidAction.bind(this);
    this.handleValidAction = this.handleValidAction.bind(this);
  }

  handleValidAction() {
    this.setState({
      step: this.state.step + 1,
      countValid: this.state.countValid + 1,
    })
  }

  handleInvalidAction() {
    this.setState({
      step: this.state.step + 1,
      countInvalid: this.state.countInvalid + 1,
    })
  }

  render() {
    return (
      <div className="border p-3">
        <Button className="btn-danger position-absolute" onClick={this.props.endTraining}>Back to settings</Button>
        <h2 className="text-center">Step {this.state.step}</h2>
        <h4 className="text-center"><span className="text-success">Valid {this.state.countValid}</span> / <span className="text-danger">Invalid {this.state.countInvalid}</span></h4>

        <ActionForm handleValidAction={this.handleValidAction} handleInvalidAction={this.handleInvalidAction} validValue={this.state.currentValue}/>
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

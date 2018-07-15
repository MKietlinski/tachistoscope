import React, {Component} from 'react';
import {Form, InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';
import PropTypes from "prop-types";

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isAnswerCorrect = this.isAnswerCorrect.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.isAnswerCorrect()
      ? this.props.handleCorrectAnswer()
      : this.props.handleIncorrectAnswer();
    this.setState({answer: ''});
  }

  onChange(e) {
    this.setState({answer: e.target.value})
  }

  isAnswerCorrect() {
    return this.state.answer === this.props.correctAnswer;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <InputGroup >
          <Input value={this.state.answer} onChange={this.onChange}/>
          <InputGroupAddon addonType="append">
            <Button color="success">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

ActionForm.propTypes = {
  handleCorrectAnswer: PropTypes.func.isRequired,
  handleIncorrectAnswer: PropTypes.func.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default ActionForm;

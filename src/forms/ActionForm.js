import React, {Component} from 'react';
import {Form, InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';
import PropTypes from "prop-types";

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.validValue
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isAnswerValid = this.isAnswerValid.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.isAnswerValid()
      ? this.props.handleValidAction()
      : this.props.handleInvalidAction();
    this.setState({value: ''});
  }

  onChange(e) {
    this.setState({value: e.target.value})
  }

  isAnswerValid() {
    return this.state.value === this.props.validValue;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <InputGroup >
          <Input value={this.state.value} onChange={this.onChange}/>
          <InputGroupAddon addonType="append">
            <Button color="success">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

ActionForm.propTypes = {
  handleValidAction: PropTypes.func.isRequired,
  handleInvalidAction: PropTypes.func.isRequired,
  validValue: PropTypes.string.isRequired,
};

export default ActionForm;

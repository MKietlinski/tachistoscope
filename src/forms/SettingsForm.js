import React, {Component} from 'react';
import {Form, InputGroup, InputGroupAddon, Input, Button, Label} from 'reactstrap';
import PropTypes from "prop-types";

class SettingsForm extends Component {

  constructor(props) {
    super(props);
    this.increaseParameter = this.increaseParameter.bind(this);
    this.decreaseParameter = this.decreaseParameter.bind(this);
    this.validateIncreaseParameter = this.validateIncreaseParameter.bind(this);
    this.validateDecreaseParameter = this.validateDecreaseParameter.bind(this);
  }

  increaseParameter(e) {
    e.preventDefault();
    if (this.validateIncreaseParameter(e.target.name))
      this.props.handleParameterChange(e.target.name, this.props.parameters[e.target.name] + SettingsForm.getShiftForParameter(e.target.name));
  }

  decreaseParameter(e) {
    e.preventDefault();
    if (this.validateDecreaseParameter(e.target.name))
      this.props.handleParameterChange(e.target.name, this.props.parameters[e.target.name] - SettingsForm.getShiftForParameter(e.target.name));
  }

  validateIncreaseParameter(parameter) {
    const max = {
      size: 40,
      speed: 1000,
      length: 20
    };

    return this.props.parameters[parameter] < max[parameter];
  }

  validateDecreaseParameter(parameter) {
    const min = {
      size: 8,
      speed: 25,
      length: 1
    };
    return this.props.parameters[parameter] > min[parameter];
  }

  static getShiftForParameter(parameter) {
    const shift = {
      size: 2,
      speed: 25,
      length: 1
    };
    return shift[parameter];
  }

  render() {
    const {size, speed, length} = this.props.parameters;

    return (
      <Form>
        <Label for="size">Font size</Label>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <Button name="size" color="danger" onClick={this.decreaseParameter}>-</Button>
          </InputGroupAddon>
          <Input id="size" value={size} disabled/>
          <InputGroupAddon addonType="append">
            <Button name="size" color="success" onClick={this.increaseParameter}>+</Button>
          </InputGroupAddon>
        </InputGroup>

        <Label for="speed">Blink speed (thousandth part of a second)</Label>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <Button name="speed" color="danger" onClick={this.decreaseParameter}>-</Button>
          </InputGroupAddon>
          <Input id="speed" value={speed} disabled/>
          <InputGroupAddon addonType="append">
            <Button name="speed" color="success" onClick={this.increaseParameter}>+</Button>
          </InputGroupAddon>
        </InputGroup>

        <Label for="length">Number of digits</Label>
        <InputGroup className="mb-5">
          <InputGroupAddon addonType="prepend">
            <Button name="length" color="danger" onClick={this.decreaseParameter}>-</Button>
          </InputGroupAddon>
          <Input id="length" value={length} disabled/>
          <InputGroupAddon addonType="append">
            <Button name="length" color="success" onClick={this.increaseParameter}>+</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

SettingsForm.propTypes = {
  handleParameterChange: PropTypes.func.isRequired,
  parameters: PropTypes.shape({
    size: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  })
};

export default SettingsForm;

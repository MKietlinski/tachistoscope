import React, {Component} from 'react';
import {Form, InputGroup, InputGroupAddon, Input, Button, Label} from 'reactstrap';
import PropTypes from "prop-types";

class SettingsForm extends Component {

  static MIN_SIZE = 8;
  static MIN_SPEED = 25;
  static MIN_LENGTH = 1;
  static MAX_SIZE = 40;
  static MAX_SPEED = 1000;
  static MAX_LENGTH = 20;
  static SHIFT_SIZE = 2;
  static SHIFT_SPEED = 25;
  static SHIFT_LENGTH = 1;

  constructor(props) {
    super(props);
    this.increaseParameter = this.increaseParameter.bind(this);
    this.decreaseParameter = this.decreaseParameter.bind(this);
    this.canBeIncreased = this.canBeIncreased.bind(this);
    this.canBeDecreased = this.canBeDecreased.bind(this);
  }

  increaseParameter(e) {
    e.preventDefault();
    const parameterType = e.target.name;
    if (this.canBeIncreased(parameterType)) {
      const increasedValue = this.props.parameters[parameterType] + SettingsForm.getShiftForParameter(parameterType);
      this.props.handleParameterChange(parameterType, increasedValue);
    }
  }

  decreaseParameter(e) {
    e.preventDefault();
    const parameterType = e.target.name;
    if (this.canBeDecreased(parameterType)) {
      const decreasedValue = this.props.parameters[parameterType] - SettingsForm.getShiftForParameter(parameterType);
      this.props.handleParameterChange(parameterType, decreasedValue);
    }
  }

  canBeIncreased(parameter) {
    const max = {
      size: SettingsForm.MAX_SIZE,
      speed: SettingsForm.MAX_SPEED,
      length: SettingsForm.MAX_LENGTH
    };

    return this.props.parameters[parameter] < max[parameter];
  }

  canBeDecreased(parameter) {
    const min = {
      size: SettingsForm.MIN_SIZE,
      speed: SettingsForm.MIN_SPEED,
      length: SettingsForm.MIN_LENGTH
    };
    return this.props.parameters[parameter] > min[parameter];
  }

  static getShiftForParameter(parameter) {
    const shift = {
      size: SettingsForm.SHIFT_SIZE,
      speed: SettingsForm.SHIFT_SPEED,
      length: SettingsForm.SHIFT_LENGTH
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

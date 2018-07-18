import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Preview extends Component {

  static BRAKE_BETWEEN_BLINK_MILLISECONDS = 1500;

  constructor(props) {
    super(props);
    this.state = {
      currentValue: null,
      display: 'none',
      numberInterval: null,
      displayInterval: null,
    };

    this.generateAndSetCurrentValue = this.generateAndSetCurrentValue.bind(this);
    this.setBlink = this.setBlink.bind(this);
    this.clearIntervals = this.clearIntervals.bind(this);
    this.setIntervals = this.setIntervals.bind(this);
  }

  componentDidMount() {
    this.setIntervals();
  }

  componentWillUnmount() {
    this.clearIntervals();
  }

  componentWillReceiveProps() {
    this.clearIntervals();
    this.setIntervals();
  }

  clearIntervals() {
    clearInterval(this.state.numberInterval);
    clearInterval(this.state.displayInterval);
  }

  setIntervals() {
    this.setState({
      numberInterval: setInterval(this.generateAndSetCurrentValue, Preview.BRAKE_BETWEEN_BLINK_MILLISECONDS + this.props.parameters.speed),
      displayInterval: setInterval(this.setBlink, Preview.BRAKE_BETWEEN_BLINK_MILLISECONDS + this.props.parameters.speed)
    });
  }

  generateAndSetCurrentValue() {
    const {length} = this.props.parameters;
    const value = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    this.setState({currentValue: value});
  }

  setBlink() {
    this.setState({display: 'inline'});
    setTimeout(() => this.setState({display: 'none'}), this.props.parameters.speed);
  }

  render() {
    const style = {
      fontSize: this.props.parameters.size,
      display: this.state.display,
      wordBreak: 'break-all',
    };

    return (
        <p className="mx-auto text-center" style={style}>{this.state.currentValue}</p>
    );
  }
}

Preview.propTypes = {
  parameters: PropTypes.shape({
    size: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  })
};

export default Preview;

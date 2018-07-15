import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Preview extends Component {

  static BRAKE_BETWEEN_BLINK_MILLISECONDS = 1500;

  constructor(props) {
    super(props);
    this.state = {
      number: null,
      display: 'none',
      numberInterval: null,
      displayInterval: null,
    };

    this.setNumber = this.setNumber.bind(this);
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
      numberInterval: setInterval(this.setNumber, Preview.BRAKE_BETWEEN_BLINK_MILLISECONDS + this.props.parameters.speed),
      displayInterval: setInterval(this.setBlink, Preview.BRAKE_BETWEEN_BLINK_MILLISECONDS + this.props.parameters.speed)
    });
  }

  setNumber() {
    const {length} = this.props.parameters;
    const number = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    this.setState({number: number});
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
      textAlign: 'center',
      margin: '0 auto'
    };

    return (
        <p style={style}>{this.state.number}</p>
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

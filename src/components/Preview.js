import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Preview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: null,
      display: 'none',
      numberInterval: null,
      displayInterval: null,
    };

    this.setNumber = this.setNumber.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
  }

  componentDidMount() {
    this.setState({
      numberInterval: setInterval(this.setNumber, 1500 + this.props.parameters.speed),
      displayInterval: setInterval(this.setDisplay, 1500 + this.props.parameters.speed)
    });
  }

  componentWillReceiveProps(props) {
    clearInterval(this.state.numberInterval);
    clearInterval(this.state.displayInterval);

    this.setState({
      numberInterval: setInterval(this.setNumber, 1500 + props.parameters.speed),
      displayInterval: setInterval(this.setDisplay, 1500 + props.parameters.speed)
    });
  }

  setNumber() {
    const {length} = this.props.parameters;
    const number = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    this.setState({number: number});
  }

  setDisplay() {
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

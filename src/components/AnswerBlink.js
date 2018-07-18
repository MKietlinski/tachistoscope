import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AnswerBlink.css';

class AnswerBlink extends Component {

  static TIME_TO_BLINK_MILLISECONDS = 2000;

  constructor(props) {
    super(props);
    this.state = {
      display: "none"
    };

    this.setBlinkTimeouts = this.setBlinkTimeouts.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.setBlinkTimeouts();
  }

  componentWillReceiveProps() {
    this.setBlinkTimeouts();
  }

  setBlinkTimeouts() {
    setTimeout(this.show, AnswerBlink.TIME_TO_BLINK_MILLISECONDS);
    setTimeout(this.hide, AnswerBlink.TIME_TO_BLINK_MILLISECONDS + this.props.parameters.speed);
  }

  show() {
    this.setState({display: 'block'})
  }

  hide() {
    this.setState({display: 'none'})
  }

  render() {
    const style = {
      fontSize: this.props.parameters.size,
      display: this.state.display,
      wordBreak: 'break-all'
    };

    return (
      <div className="answerBlinkContainer">
        <p className="mx-auto text-center" style={style}>{this.props.currentValue}</p>
      </div>
    );
  }
}

AnswerBlink.propTypes = {
  currentValue: PropTypes.number.isRequired,
  parameters: PropTypes.shape({
    size: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  })
};

export default AnswerBlink;

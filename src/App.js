import React, {Component} from 'react';
import SettingsContainer from './containers/SettingsContainer';
import TrainingContainer from "./containers/TrainingContainer";

class App extends Component {

  static DEFAULT_SIZE = 20;
  static DEFAULT_SPEED = 100;
  static DEFAULT_LENGTH = 4;

  constructor(props) {
    super(props);
    this.state = {
      isTraining: false,
      parameters: {
        size: App.DEFAULT_SIZE,
        speed: App.DEFAULT_SPEED,
        length: App.DEFAULT_LENGTH
      }
    };
    this.changeParameter = this.changeParameter.bind(this);
    this.setIsTraining = this.setIsTraining.bind(this);
  }

  changeParameter(parameter, value) {
    this.setState({
      parameters: {
        ...this.state.parameters,
        [parameter]: value
      }
    });
  }

  setIsTraining(isTraining) {
    this.setState({
      isTraining: isTraining
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-5">Tachistoscope for fast reading training</h2>
        {this.state.isTraining
          ? <TrainingContainer parameters={this.state.parameters} endTraining={() => this.setIsTraining(false)}/>
          : <SettingsContainer parameters={this.state.parameters} handleParameterChange={this.changeParameter} startTraining={() => this.setIsTraining(true)}/>
        }
      </div>
    );
  }
}

export default App;

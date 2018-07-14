import React, {Component} from 'react';
import SettingsContainer from './containers/SettingsContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTraining: false,
      parameters: {
        size: 20,
        speed: 100,
        length: 4
      }
    };
    this.changeParameter = this.changeParameter.bind(this);
  }

  changeParameter(parameter, value) {
    this.setState({
      parameters: {
        ...this.state.parameters,
        [parameter]: value
      }
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-5">Tachistoscope for fast reading training</h2>
        {this.state.isTraining
          ? <SettingsContainer parameters={this.state.parameters} handleParameterChange={this.changeParameter}/>
          : <SettingsContainer parameters={this.state.parameters} handleParameterChange={this.changeParameter}/>
        }
      </div>
    );
  }
}

export default App;

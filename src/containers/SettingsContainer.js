import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import SettingsForm from '../forms/SettingsForm';
import Preview from '../components/Preview';
import PropTypes from 'prop-types';

const SettingsContainer  = ({parameters, handleParameterChange, startTraining}) => {
  return (
    <div className="border p-3">
      <Row>
        <Col sm={12} md={6} lg={7}>
          <h2 className="text-center">Settings</h2>
          <SettingsForm parameters={parameters} handleParameterChange={handleParameterChange}/>
        </Col>
        <Col sm={12} md={6} lg={5} className="d-flex align-items-center" style={{minHeight: 200}}>
          <Preview parameters={parameters}/>
        </Col>
      </Row>
      <Row className="p-3">
        <Button className="w-100 btn-outline-success" onClick={startTraining}>Start</Button>
      </Row>
    </div>
  );
};

SettingsContainer.propTypes = {
  startTraining: PropTypes.func.isRequired,
  handleParameterChange: PropTypes.func.isRequired,
  parameters: PropTypes.shape({
    size: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  })
};

export default SettingsContainer;

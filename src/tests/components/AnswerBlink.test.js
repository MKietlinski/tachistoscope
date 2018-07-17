import React from 'react';
import {shallow} from 'enzyme';
import AnswerBlink from '../../components/AnswerBlink';

describe('<AnswerBlink />', () => {
  let component;
  let parameters = {
    size: 20,
    speed: 100,
    length: 4
  };

  beforeEach(() => {
    component = shallow(<AnswerBlink parameters={parameters} currentValue={12345}/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().state.display).toBe('none');
  });

  it('sets display block on show call', () => {
    component.instance().show();
    expect(component.instance().state.display).toBe('block');
  });

  it('sets display none on hide call', () => {
    component.instance().setState({display: 'block'});
    component.instance().hide();
    expect(component.instance().state.display).toBe('none');
  });
});

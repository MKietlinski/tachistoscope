import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

describe('<App />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<App/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().state.isTraining).toBeFalsy();
    expect(component.instance().state.parameters.size).toBe(20);
    expect(component.instance().state.parameters.speed).toBe(100);
    expect(component.instance().state.parameters.length).toBe(4);
  });

  it('changes parameters in state on changeParameter call', () => {
    component.instance().changeParameter('size', 30);
    expect(component.instance().state.parameters.size).toBe(30);

    component.instance().changeParameter('speed', 300);
    expect(component.instance().state.parameters.speed).toBe(300);

    component.instance().changeParameter('length', 3);
    expect(component.instance().state.parameters.length).toBe(3);
  })
});

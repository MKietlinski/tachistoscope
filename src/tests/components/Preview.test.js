import React from 'react';
import {shallow} from 'enzyme';
import Preview from '../../components/Preview';

describe('<Preview />', () => {
  let component;
  let parameters = {
    size: 20,
    speed: 100,
    length: 4
  };

  beforeEach(() => {
    component = shallow(<Preview parameters={parameters}/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().state.currentValue).toBeNull();
    expect(component.instance().state.display).toBe('none');
    expect(typeof component.instance().state.numberInterval).toBe('number');
    expect(typeof component.instance().state.displayInterval).toBe('number');
  });

  it('sets currentValue on generateAndSetCurrentValue call', () => {
    component.instance().generateAndSetCurrentValue();
    expect(typeof component.instance().state.currentValue).toBe('number');
  });

  it('sets display inline on setBlink call', () => {
    component.instance().setBlink();
    expect(component.instance().state.display).toBe('inline');
  });
});

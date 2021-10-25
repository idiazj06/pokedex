import { shallow } from 'enzyme';
import React from 'react';
import { Home } from '../../Components/Home'




describe('Pruebas <Home/>', () => {

    test('Validar si se renderiza correctamente', () =>{
        const wrapper = shallow(<Home/>)


        expect(wrapper).toMatchSnapshot()
    })
})
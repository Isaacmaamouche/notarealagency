import Card from './';
;import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import {render, screen, fireEvent} from '@testing-library/react'
import PageTheme from '../../utils/PageThemeContext';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Card', () => {
    test('Should render with the profil pic', async () => {
        render(
        <PageTheme>
            <Router>
                <Card
                label = 'TestLabel'
                title= 'TestTitle'
                picture= 'https://im-shiny-agency.herokuapp.com//images/4.jpeg'
                id = '1'
                 />
            </Router>
        </PageTheme>
        , container);
    
        // screen.debug();
        expect(
            document.querySelector('span').textContent
            ).toEqual('TestLabel');
    
    })
})
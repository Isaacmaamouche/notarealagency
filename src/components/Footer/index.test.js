import Footer from './';import React from "react";
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
 
describe('Footer', () => {
    test('Should render without crash', async () => {
        render(
        <PageTheme>
            <Footer />
        </PageTheme>
        , container);
    })
    test('Change theme', async () =>{
        render(
            <PageTheme>
                <Footer />
            </PageTheme>
            , container);
        const nightModeButton = screen.getByRole('link');
        expect(nightModeButton.textContent).toBe('🌙');
        fireEvent.click(nightModeButton);
        expect(nightModeButton.textContent).toBe('🌞');



    })
})
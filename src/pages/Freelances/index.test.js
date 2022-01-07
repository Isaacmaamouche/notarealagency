import Freelances from '../Freelances';
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { unmountComponentAtNode } from "react-dom";
import {render, waitFor, screen, waitForElementToBeRemoved} from '@testing-library/react'
import PageTheme from '../../utils/PageThemeContext';


const freelancesMockedData = [{
    "id": "1",
    "name": "Isaac Maamouche",
    "job": "Soon to be Développeur mobile",
    "picture": "https://im-shiny-agency.herokuapp.com/images/4.jpeg",
    "skills": ["Cooking"],
    "location": "Montpellier",
    "available": true,
    "tjm": 5000
    },{
    "id": "2",
    "name": "Isaac Maamouche again",
    "job": "Soon to be Développeur mobile",
    "picture": "https://im-shiny-agency.herokuapp.com/images/4.jpeg",
    "skills": ["Cooking better than Isaac 1"],
    "location": "Montpellier",
    "available": true,
    "tjm": 7500
    }
]
const server = setupServer(
    rest.get('https://im-shiny-agency.herokuapp.com/freelances', (req, res, ctx)=>{

        return res(ctx.json({freelancersList: freelancesMockedData}))
    })
);


let container = null;

beforeAll(()=>{
    server.listen();
})

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
  server.resetHandlers();
});

afterAll(()=>{
    server.close();
});
 
describe('Freelances', () => {
    test('Should render mockedData', async () => {
        render(
        <PageTheme>
            <Router><Freelances/></Router>
        </PageTheme>
        , container);
            
        // screen.debug();
        // expect(screen.getByTestId('loader')).toBeTruthy();

        // await waitForElementToBeRemoved(()=>screen.getByTestId('loader'));
        await waitFor(()=>{
            // screen.debug();
            // expect(screen.getByText('Isaac Maamouche')).toBeTruthy();
            expect(screen.getByText('Isaac Maamouche').textContent).toContain('Isaac')
        })
    
    })
})
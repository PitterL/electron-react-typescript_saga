import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Application from './components/App';
import store from './store';

// Create main element
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            {/* Using the `component` prop */}
                            <Route path="/" component={Application} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </AppContainer>,
        rootElement
    );
};

render(Application);

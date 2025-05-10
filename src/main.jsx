
import './setImmediatePolyfill.jsx';

import { createRoot } from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

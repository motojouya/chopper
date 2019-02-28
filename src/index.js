import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const search = window.location.search;

const querys = search => {

  if (!search) {
    return;
  }

  return search.slice(1).split('&').map(query => {
    const splited = query.split('=');
    return {
      name: splited[0],
      value: splited[1],
    };
  });
}

ReactDOM.render(<App querys={querys(search)} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

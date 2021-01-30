import React from 'react';
import ReactDOM from 'react-dom';
import storage from './js/storage';
import Taskboard from './js/components/Taskboard';
import './css/index.css';

let data = [];

storage.forEach((item, i) => data[i] = item);

ReactDOM.render(
    <Taskboard initialData = {data} />,
    document.getElementById('board')
);
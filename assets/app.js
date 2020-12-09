import TodoContextProvider from './context/TodoContext';
import TodoTable from './components/TodoTable';
import {CssBaseLine} from '@material-ui/core';
import ReactDOM from 'react-dom';
import React from 'react';
import './styles/app.css';
import './bootstrap';

console.log("app.js loaded");

class App extends React.Component {
	render() {
		return (
			<TodoContextProvider>
				<TodoTable />
			</TodoContextProvider>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
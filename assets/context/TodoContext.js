import React, {createContext} from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
		};
		this.readTodo();
	}

	// create
	async createTodo(e, todo) {
		e.preventDefault();
		try {
			axios.post('/api/todo/create', todo)
				.then((response) => {
					console.log(response.status);
					console.log(response.data);
					this.setState({ todos: [response.data, ...this.state.todos] });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	// read
	async readTodo() {
		try {
			axios.get('/api/todo/read')
				.then((response) => {
					console.log(response);
					this.setState({ todos: response.data, });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	// update
	async updateTodo(data) {
		try {
			axios.put('/api/todo/update/' + data.id, data)
				.then((response) => {
					const todos = [...this.state.todos];
					let todo = todos.find(element => { return element.id === data.id; });
					todo.name = data.name;
					this.setState({ todos: todos, });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	// delete
	async deleteTodo(id) {
		try {
			axios.delete('/api/todo/delete/' + id)
				.then((response) => {
					console.log(response);
					this.setState({ todos: [...this.state.todos].filter(element => { return element.id !== id; }), });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<TodoContext.Provider value={{ 
				...this.state,
				createTodo: this.createTodo.bind(this),
				updateTodo: this.updateTodo.bind(this),
				deleteTodo: this.deleteTodo.bind(this),
			}}>
				{ this.props.children }
			</TodoContext.Provider>
		);
	}
}

export default TodoContextProvider;
import React, {createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [
				{id: 1, name: 'Pasear'},
				{id: 2, name: 'Pasear'},
			],
		};
	}

	// create
	createTodo(e, todo) {
		e.preventDefault();
		const todos = [todo, ...this.state.todos];
		this.setState({ todos });
	}

	// read
	readTodo() { }

	// update
	updateTodo(data) {
		const todos = [...this.state.todos];
		let todo = todos.find(element => { return element.id === data.id; });
		todo.name = data.name;
		this.setState({ todos: todos, });
	}

	// delete
	deleteTodo() { }

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
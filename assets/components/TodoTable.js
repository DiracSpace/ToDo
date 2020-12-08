import {TodoContext} from '../context/TodoContext';
import React, {useContext} from 'react';

function TodoTable() {
	const context = useContext(TodoContext);
	return (
		<div>
			<ul>
				{ context.todos.map(element => ( <li> { element.task } </li> )) }
			</ul>
		</div>
	);
}

export default TodoTable;
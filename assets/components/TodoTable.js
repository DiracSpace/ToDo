import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import {TodoContext} from '../context/TodoContext';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import React, {useContext, useState, Fragment} from 'react';

function TodoTable() {
	const context = useContext(TodoContext);
	const [addTodo, setAddTodo] = useState("");
	const [editIsShown, setEditIsShown] = useState(false);
	const [editTodo, setEditTodo] = useState("");

	return (
		<form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="left">Task</TableCell>
						<TableCell align="right">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<TextField value={addTodo} onChange={(event) => { setAddTodo(event.target.value) }} label="Nueva tarea" fullWidth={true} />
						</TableCell>
						<TableCell align="right">
							<IconButton type="submit">
								<AddIcon />
							</IconButton>
						</TableCell>
					</TableRow>
					{context.todos.map((element, index) => (
						<TableRow key={"element " + index}>
							<TableCell>
								{editIsShown === element.id ? 
									<TextField 
										value={editTodo} 
										onChange={(event) => {
											setEditTodo(event.target.value) 
											}
										} 
										label="Nueva tarea" 
										fullWidth={true}
										InputProps={{
            								endAdornment: <Fragment>
            									<IconButton onClick={() => { setEditIsShown(false); setEditTodo(""); }}><CloseIcon /></IconButton>
            									<IconButton onClick={() => { context.updateTodo({id: element.id, name: editTodo}); setEditIsShown(false); }}><DoneIcon /></IconButton>
            								</Fragment>,
          								}} 
          							/>
									:
									element.name
								}
							</TableCell>
							<TableCell align="right">
								
								<IconButton onClick={() => { setEditIsShown(element.id); setEditTodo(element.name); }}>
									<EditIcon />
								</IconButton>

								<IconButton>
									<DeleteIcon />
								</IconButton>

							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</form>
	);
}

export default TodoTable;
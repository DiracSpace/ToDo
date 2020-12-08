import {TodoContext} from '../context/TodoContext';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import React, {useContext} from 'react';

function TodoTable() {
	const context = useContext(TodoContext);
	return (
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
						<TextField fullWidth={true} />
					</TableCell>
					<TableCell align="right">
						<IconButton>
							<AddIcon />
						</IconButton>
					</TableCell>
				</TableRow>
				{context.todos.map(element => (
					<TableRow>
						<TableCell> {element.name} </TableCell>
						<TableCell align="right">
							<IconButton>
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
	);
}

export default TodoTable;
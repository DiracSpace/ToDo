import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TodoContext} from '../context/TodoContext';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';

function DeleteMsg(props) {
	const context = useContext(TodoContext);
	const hide = () => { props.setDeleteconfirmationIsShown(false); }

	return (
		<Dialog fullWidth={true} open={props.open}>
			<DialogTitle>Deseas eliminar la tarea?</DialogTitle>
			<DialogContent>
				<p>ID: {props.todo.id}</p>
				<p>Nombre: {props.todo.name}</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={hide}>Cancelar</Button>
				<Button onClick={() => { context.deleteTodo(props.todo.id); hide(); }}>Aceptar</Button>
			</DialogActions>
		</Dialog>
	);
}

DeleteMsg.propTypes = {
	open: PropTypes.bool.isRequired,
	setDeleteconfirmationIsShown: PropTypes.func.isRequired,
	todo: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),

};

export default DeleteMsg;
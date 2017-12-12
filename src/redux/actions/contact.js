import axios from 'axios';

export function sendMessage(data) {
	return dispatch => {
		axios.post('/api/contact', data).then(response => {
				dispatch({
					type: 'MESSAGE_SENT',
					payload: response.data
				})
			})
			.catch(fail => {
				dispatch({
					type: 'MESSAGE_NOT_SENT',
					payload: fail.data
				})
			})
	};
}


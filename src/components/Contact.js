import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessage } from '../redux/actions/contact';
import validateInput from '../validations/contact';

class Contact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			message: '',
			errors: {},
			success: false,
			sent: '',
			isLoading: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.getResponse.success) {
			this.setState({
				success: true,
				sent: nextProps.getResponse.message,
				isLoading: false,
				email: '',
				message: '',
			});

			this.refs.email.value = '';
			this.refs.message.value = '';

			this.closeAlert();

		} else {
			this.setState({ errors: nextProps.getResponse.errors, isLoading: false })
		}
	}

	isValid() {

		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors })
		}

		return isValid;
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	submit(event) {
		event.preventDefault();

		if (this.isValid()) {
			this.setState({ success: false, errors: {}, isLoading: true });
			this.props.sendMessage(this.state);
		}
	}

	closeAlert() {
		setTimeout(() => {
			this.setState({ success: false });
		}, 5000)
	}

	render() {
		const { errors } = this.state;
		const { success } = this.state;
		const { sent } = this.state;

		return (
			<div className="App">
				<div className="container">
					<div className="row ">
						<div className="col col-sm-6 mx-auto">
							<h1 className="text-center mb-5">Contact Form</h1>

							{ success && <div className="alert alert-success">{ sent }</div> }

							<form onSubmit={this.submit.bind(this)}>
								<div className="form-group">
									<label htmlFor="email">Email address</label>
									<input type="text" name="email" className="form-control" id="email" placeholder="Enter email" ref="email" onChange={this.onChange.bind(this)}/>
									{ errors.email && <div className="invalid-feedback">{ errors.email }</div> }
								</div>

								<div className="form-group">
									<label htmlFor="message">Message</label>
									<textarea className="form-control" name="message" id="message" placeholder="Enter Message" rows="3" ref="message" onChange={this.onChange.bind(this)} />
									{ errors.message && <div className="invalid-feedback show">{ errors.message }</div> }
								</div>

								<button type="submit" className="btn btn-primary">Send message</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Contact.propTypes = {
	sendMessage: PropTypes.func.isRequired,
};

export default connect(
	state => {
		return {
			getResponse: state.contact.data
		}
	},
	dispatch => ({
		sendMessage: (data) => {
			dispatch(sendMessage(data));
		}
	})
)(Contact)


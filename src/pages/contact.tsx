import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { ToastContainer, ToastMessage } from 'react-toastr';
import {SEO} from '../components/SEO';
import { withLayout } from '../components/layout';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Contact extends Component {
	constructor() {
// @ts-expect-error TS(2554): Expected 1-2 arguments, but got 0.
		super();
		this.state = {
			name: '',
			email: '',
			message: '',
		};
	}

	submitForm = () => {
		if (
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
			this.state.name !== '' &&
// @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
			this.state.email !== '' &&
// @ts-expect-error TS(2339): Property 'message' does not exist on type 'Readonl... Remove this comment to see the full error message
			this.state.message !== ''
		) {
			const formData = new FormData();
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
			formData.append('name', this.state.name);
// @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
			formData.append('email', this.state.email);
// @ts-expect-error TS(2339): Property 'message' does not exist on type 'Readonl... Remove this comment to see the full error message
			formData.append('message', this.state.message);
			fetch('http://dev.beesdesign.net/contact.php', {
				method: 'POST',
				body: formData,
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.inputOK) {
// @ts-expect-error TS(2339): Property 'container' does not exist on type 'Conta... Remove this comment to see the full error message
						this.container.success(result.message, 'Success!', {
							timeOut: 5000,
							extendedTimeOut: 5000,
							preventDuplicates: true,
							positionClass: 'toast-bottom-right',
							showMethod: 'fadeIn',
							hideMethod: 'fadeOut',
						});
						this.setState({
							name: '',
							email: '',
							message: '',
						});
					} else {
// @ts-expect-error TS(2339): Property 'container' does not exist on type 'Conta... Remove this comment to see the full error message
						this.container.error(result.message, 'Error!', {
							timeOut: 5000,
							extendedTimeOut: 5000,
							preventDuplicates: true,
							positionClass: 'toast-bottom-right',
							showMethod: 'fadeIn',
							hideMethod: 'fadeOut',
						});
						this.setState({
							message: '',
						});
					}
				})
				.catch((err) => {
// @ts-expect-error TS(2339): Property 'container' does not exist on type 'Conta... Remove this comment to see the full error message
					this.container.error(err, 'Error!', {
						timeOut: 5000,
						extendedTimeOut: 5000,
						preventDuplicates: true,
						positionClass: 'toast-bottom-right',
						showMethod: 'fadeIn',
						hideMethod: 'fadeOut',
					});
				});
		}
	};

// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const style = {
			contactFilter: {
				margin: 'auto',
				color: {
					color: 'rgb(194, 77, 1)',
				},
				bgcolor: {
					borderColor: 'rgb(194, 77, 1)',
				},
			},
			sendButton: {
				color: 'rgb(194, 77, 1)',
			},
		};
		return (
			<div className="contact">
				<SEO
					title="Contact | Malik Browne"
					description="Get in contact with Malik."
					image="/selfie/about_bg3.jpg"
					url="https://www.malikbrowne.com/contact"
				/>
				<div className="hero">
					<h2>Want to get in contact?</h2>
					<h3>Here are a few ways to get a hold of me.</h3>
				</div>

				<div className="wrapper">
					<div className="contact-form">
						<div className="form-wrapper">
							<div className="form-hero">
								<h4>Feeling formal?</h4>
								<p>(Fill this out, and I'll get back to you.)</p>
							</div>
							<TextField
								floatingLabelFixed
								hintText="Enter your name"
								floatingLabelText="Name"
								className="contact-input"
								style={style.contactFilter}
								floatingLabelFocusStyle={style.contactFilter.color}
								underlineFocusStyle={style.contactFilter.bgcolor}
								onChange={this.onChange}
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
								value={this.state.name}
								name="name"
							/>
							<TextField
								floatingLabelFixed
								hintText="Enter your email"
								floatingLabelText="Email"
								className="contact-input"
								style={style.contactFilter}
								floatingLabelFocusStyle={style.contactFilter.color}
								underlineFocusStyle={style.contactFilter.bgcolor}
								onChange={this.onChange}
// @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
								value={this.state.email}
								name="email"
							/>
							<TextField
								floatingLabelFixed
								multiLine
								rowsMax={3}
								rows={3}
								hintText="Enter your message"
								floatingLabelText="Message"
								className="contact-input"
								style={style.contactFilter}
								floatingLabelFocusStyle={style.contactFilter.color}
								underlineFocusStyle={style.contactFilter.bgcolor}
								onChange={this.onChange}
// @ts-expect-error TS(2339): Property 'message' does not exist on type 'Readonl... Remove this comment to see the full error message
								value={this.state.message}
								name="message"
							/>
							<RaisedButton
								label="Send"
								backgroundColor="rgb(194, 77, 1)"
								labelColor="#fff"
								className="contact-button"
								onClick={this.submitForm}
							/>
						</div>
					</div>
					<div className="other-contact">
						<div className="form-wrapper">
							<div className="other-content">
								<div className="other-hero">
									<h4>Prefer more modern methods?</h4>
									<p>(I have those too.)</p>
								</div>
								<p>Email</p>
								<h5>
									<a href="mailto:malik@malikbrowne.com">
										malik@malikbrowne.com
									</a>
								</h5>
								<p>Social</p>
								<div className="social">
									<a
										href="https://github.com/browne0"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-github" />
									</a>
									<a
										href="https://twitter.com/milkstarz"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-twitter" />
									</a>
									<a
										href="https://youtube.com/milkstarz"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-youtube" />
									</a>
									<a
										href="https://linkedin.com/in/malikbrowne"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-linkedin" />
									</a>
									<a
										href="https://instagram.com/milkstarz"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-instagram" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer
// @ts-expect-error TS(7006): Parameter 'container' implicitly has an 'any' type... Remove this comment to see the full error message
					ref={(container) => {
// @ts-expect-error TS(2339): Property 'container' does not exist on type 'Conta... Remove this comment to see the full error message
						this.container = container;
					}}
					toastMessageFactory={ToastMessageFactory}
					className="toast-bottom-right"
				/>
			</div>
		);
	}
}

export default withLayout(Contact);

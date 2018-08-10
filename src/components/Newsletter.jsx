import React, { PureComponent } from 'react';

class Newsletter extends PureComponent {
	state = {
		email: '',
	};

	onEmailChange = e => {
		e.persist();
		this.setState(() => ({
			email: e.target.value,
		}));
	};

	onNewsletterSubmit = e => {
		e.preventDefault();
		if (this.state.email) {
			window.open(
				'https://tinyletter.com/malikbrowne',
				'popupwindow',
				'scrollbars=yes,width=800,height=600'
			);
		}
	};
	render() {
		return (
			<form
				action="https://tinyletter.com/malikbrowne"
				method="post"
				target="popupwindow"
			>
				<p>
					<span>
						We all know newsletters can get <b>super</b> spammy.
					</span>
					<span>This one's different.</span>
					<span>
						Stay up to date with my weekly posts and videos, as well as my
						favorite links about the JavaScript world.
					</span>
				</p>
				<input
					value={this.state.email}
					onChange={this.onEmailChange}
					type="text"
					name="email"
					id="tlemail"
					placeholder="Email"
				/>
				<input type="hidden" value="1" name="embed" />
				<button disabled={!this.state.email} onClick={this.onNewsletterSubmit}>
					Subscribe
				</button>
			</form>
		);
	}
}

export default Newsletter;

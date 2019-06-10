import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Particles from 'react-particles-js';


import DefaultTheme from '../../themes/default';

import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Rank from '../Rank/Rank';

const GlobalStyle = createGlobalStyle`   
	* {
	  margin: 0;
	  padding: 0; 
	}

	*,
	*::before,
	*::after {
	  box-sizing: inherit; 
	}

    html {
	    font-size: 62.5%;
	    box-sizing: border-box;
    }
    
	body {
	  margin: 0;
	  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
	    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
	    sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	    background: ${props => props.theme.background}
	}
	
	button {
	  cursor: pointer;
	}
	
	code {
	  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
	    monospace;
	}
	
	input, button { 
		width: 100%;
		font-size: 1.6rem;
		padding: 1.6rem;
		margin-bottom: 1.8rem;
		border-radius: ${props => props.theme.borderRadius}
		
		&:focus {
			outline: none;
		}
	}
	
`;

const AppWrapper = styled.main`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
`;

const ParticlesWrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
`;

const particlesOptions = {
	particles: {
		number: {
			value: 40,
			density: {
				enable: true,
				value_area: 500
			}
		}
	}
};

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	},
	theme: DefaultTheme
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	};


	displayFaceBox = (box) => {
		this.setState({
			box
		});
	};

	onInputChange = (event) => {
		this.setState({
			input: event.target.value
		})
	};

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		fetch('http://localhost:3000/imageurl', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							id: this.state.user.id,
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, {entries: count}));
						})
						.catch(console.log);
				}
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch(err => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({
				isSignedIn: true
			})
		}

		this.setState({
			route
		});
	};

	render() {
		const {isSignedIn, imageUrl, route, box, theme} = this.state;
		const {name, entries} = this.state.user;
		return (
			<ThemeProvider theme={theme}>
				<AppWrapper>
					<GlobalStyle/>
					<ParticlesWrapper>
						<Particles className="particles" params={particlesOptions}/>
					</ParticlesWrapper>
					<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
					{route === 'home'
						? <div>
							<Logo/>
							<Rank name={name} entries={entries}/>
							<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
							<FaceRecognition box={box} imageUrl={imageUrl}/>
						</div>
						: (route === 'signin'
								? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
								: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						)
					}
				</AppWrapper>
			</ThemeProvider>
		);
	}
}

export default App;

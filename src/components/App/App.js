import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Particles from 'react-particles-js';


import DefaultTheme from '../../themes/default';

import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import UserForm from '../UserForm/UserForm';
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
	  font-family: 'Montserrat', sans-serif;
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
		padding: 1.6rem;
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
`;

const NavWrapper = styled.header`
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
`;

const ParticlesWrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
`;

const HomeWrapper = styled.section`
	
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
	theme: DefaultTheme,
	baseApi: 'http://localhost:3000'
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = ({id, name, email, entries, joined}) => {
		this.setState({
			user: {
				id: id,
				name: name,
				email: email,
				entries: entries,
				joined: joined
			}
		});
	};

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
		fetch(`${this.state.baseApi}/imageurl`, {
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
					fetch(`${this.state.baseApi}/image`, {
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
		const {isSignedIn, imageUrl, route, box, theme, baseApi} = this.state;
		const {name, entries} = this.state.user;
		return (
			<ThemeProvider theme={theme}>
				<AppWrapper>
					<GlobalStyle/>
					<ParticlesWrapper>
						<Particles className="particles" params={particlesOptions}/>
					</ParticlesWrapper>
					<NavWrapper>
						<Logo/>
						<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
					</NavWrapper>
					{route === 'home'
						? <HomeWrapper>
							<Rank name={name} entries={entries}/>
							<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
							<FaceRecognition box={box} imageUrl={imageUrl}/>
						</HomeWrapper>
						: <UserForm route={route} baseApi={baseApi} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					}
				</AppWrapper>
			</ThemeProvider>
		);
	}
}

export default App;

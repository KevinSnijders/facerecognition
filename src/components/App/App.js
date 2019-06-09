import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

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

const app = new Clarifai.App({
	apiKey: '719faa9c8f1d49ab96f1f93e75e2d02e' // Just here for a working demo
});

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

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			theme: DefaultTheme
		}
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
		this.setState({
			imageUrl: this.state.input
		});
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({
				isSignedIn: false,
			})
		} else if (route === 'home') {
			this.setState({
				isSignedIn: true
			})
		}

		this.setState({
			route
		})
	};

	render() {
		const {isSignedIn, imageUrl, route, box, theme} = this.state;
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
							<Rank/>
							<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
							<FaceRecognition box={box} imageUrl={imageUrl}/>
						</div>
						: (route === 'signin'
								? <Signin onRouteChange={this.onRouteChange}/>
								: <Register onRouteChange={this.onRouteChange}/>
						)
					}
				</AppWrapper>
			</ThemeProvider>
		);
	}
}

export default App;

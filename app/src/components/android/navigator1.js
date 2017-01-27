'use strict';

import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import Audit from './audit';

class SampleApp extends Component {
	constructor(props) {
		super(props);	
		
		this.routes = [
			{title: 'First Scene', index: 0},
			{title: 'Second Scene', index: 1},
			{title: 'Audit', index: 2},
		];
	}
		  
	renderScene0(route, navigator) {
		switch (route.index) {
			case 0: return <PageOne routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <PageTwo routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <Audit routes={this.routes} navigator={navigator} />
					break;
 		}
 	}
	
	renderScene1(route, navigator) {
		return <TouchableHighlight onPress={() => {
			if (route.index === 0) {
				navigator.push(this.routes[1]);
			} else {
				navigator.pop();
			}
			}}>
			<Text>Hello {route.title}!</Text>
		</TouchableHighlight>
	}
	
	render() {
	  return (
		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene0.bind(this)}
/*		  
			renderScene={(route, navigator) =>
				<PageOne routes={this.routes} title={route.title} navigator={navigator} />
			}
*/  
		    navigationBar={
				<Navigator.NavigationBar
				routeMapper={{
					LeftButton: (route, navigator, index, navState) =>
						{ return null;(<Text>Cancel</Text>); },
					RightButton: (route, navigator, index, navState) =>
						{ return null; (<Text>Done</Text>); },
					Title: (route, navigator, index, navState) =>
						{ return (<Text>{route.title}</Text>); },
				}}
				style={{backgroundColor: 'red'}}
				/>
			}
			
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
	  );
	}
}

class PageOne extends Component {
	constructor(props) {
		super(props);
	}
	
	_handlePress() {
		console.log(this.props)
		this.props.navigator.push(this.props.routes[1]);
	}		
	
	_handlePress1() {
		console.log(this.props)
		this.props.navigator.push(this.props.routes[2]);
	}	
	
	render() {
		return (
			<View style={[styles.container, {backgroundColor: 'green'}]}>
				<Text style={styles.welcome}>Greetings!!!</Text>
				<TouchableOpacity onPress={this._handlePress.bind(this)}>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
						<Text style={styles.welcome}>Go to page two</Text>
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={this._handlePress1.bind(this)}>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
						<Text style={styles.welcome}>Go to page three</Text>
					</View>
				</TouchableOpacity>				
			</View>
		)
	}
}

class PageTwo extends Component {
	constructor(props) {
		super(props);	
	}
		
	_handlePress() {
		//this.props.navigator.pop();
		this.props.navigator.push(this.props.routes[2]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
}

class PageThree extends Component {
	constructor(props) {
		super(props);	
	}
		
	_handlePress() {
		this.props.navigator.popToTop(0);
		//this.props.navigator.push(this.props.routes[2]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'red'}]}>
        <Text style={styles.welcome}>This is page three!</Text>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = SampleApp;

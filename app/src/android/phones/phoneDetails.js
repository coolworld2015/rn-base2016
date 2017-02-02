'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			name: ''
		}	
					
		if (props.data) {
			this.state = {
				id: props.data.id,
				name: props.data.name,
				phone: props.data.phone,
				street: props.data.street,
				house: props.data.house,
				apt: props.data.apt,
				index: props.data.index
			};
		}
    }
	
    goBack(rowData) {
		this.props.navigator.pop();
	}
	
    render() {
        return (
            <ScrollView>
				<TouchableHighlight
					onPress={()=> this.goBack()}
					underlayColor='#ddd'
				>
					<View style={{
						flex: 1,
						padding: 10,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>
						<Text style={styles.headder}>
							{this.state.name}
						</Text>

						<Text style={styles.details}>
							Phone: {this.state.phone}
						</Text>

						<Text style={styles.details}>
							Str: {this.state.street}
						</Text>

						<Text style={styles.details}>
							House: {this.state.house}
						</Text>

						<Text style={styles.details}>
							Apt: {this.state.apt}
						</Text>

						<Text style={styles.details}>
							ID: {this.state.id}
						</Text>

						<Text style={styles.details}>
							Zip: {this.state.index}
						</Text>
					</View>
				</TouchableHighlight>	
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headder: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        paddingTop: 10,
        fontWeight: 'bold'
    },
    details: {
        fontSize: 20,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'gray'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

export default PhoneDetails;

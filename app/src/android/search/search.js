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
    TextInput,
    Switch,
	Dimensions
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
			eventSwitchBase: true,
            textSwitchBase: 'Search by number',
			bugANDROID: ''
        }
    }
	
	componentDidMount() {
		this.setState({
			width: Dimensions.get('window').width
        });
	}
	
    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() {
        if (this.state.searchQuery == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }
		 
		this.props.navigator.push({
			index: 1,
			data: {
				searchQuery: this.state.searchQuery,
				searchType: this.state.textSwitchBase
			}
		});
    }
	
    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Search by number'
            });
        } else {
            this.setState({
                textSwitchBase: 'Search by name'
            });
        }
    }
	
    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        var validCtrl = <View />;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={this.clearSearch.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Search phones</Text>
                    </TouchableHighlight>

                    <View style={{
                        height: 50,
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#48BBEC',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                marginTop: 3,
                                flex: 1
                            }}>
                            <Text style={{
                                fontSize: 18,
                            }}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View
                            style={{
                                marginTop: -1
                            }}>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchBase: value
                                    });
                                }}
                                value={this.state.eventSwitchBase}
                            />
                        </View>
                    </View>

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            searchQuery: text,
                            invalidValue: false
                        })}
                        value={this.state.searchQuery}
                        style={{ 
							height: 50,
							width: this.state.width * .94,
							marginTop: 10,
							padding: 4,
							fontSize: 18,
							borderWidth: 3,
							borderColor: '#48BBEC',
							borderRadius: 0,
							color: 'black'
						}} 
                        placeholder="Search phones">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
					
					<Text>{this.state.bugANDROID}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    countHeader1: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
		padding: 10,
        paddingBottom: 210,
        alignItems: 'center',
        flex: 1,
		backgroundColor: 'white',
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
		width: 360,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: 'black'
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
        marginTop: 40
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Search;

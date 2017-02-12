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
	BackAndroid
} from 'react-native';

class SearchResults extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		
		this.state = {
			dataSource: ds.cloneWithRows([])
		}	
		
		if (props.data) {
			this.state = {
				dataSource: ds.cloneWithRows([]),
				searchQueryHttp: props.data.searchQuery,
				searchType: props.data.searchType,
				showProgress: true,
				resultsCount: 0,
				recordsCount: 25,
				positionY: 0
			};
		}
    }
	
	componentDidMount() {
		this.findByPhone();
	}
	
    findByPhone() {
		var webUrl;
		if (this.state.searchType == 'Search by number') {
			webUrl = 'api/items/findByPhone/'
		} else {
			webUrl = 'api/items/findByName/'
		}
		
		fetch(appConfig.url + webUrl + this.state.searchQueryHttp, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 25)),
                    resultsCount: responseData.length,
                    responseData: responseData.sort(this.sort),
                    filteredItems: responseData.sort(this.sort)
                });

            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    showDetails(rowData) {
		this.props.navigator.push({
			index: 2,
			data: rowData
		});
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{backgroundColor: '#fff', color: 'black'}}>
                        {rowData.name} - {rowData.phone}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress == true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.findByPhone()
            }, 300);
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        console.log(positionY + ' - ' + recordsCount + ' - ' + items.length);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            console.log(items.length);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 20,
                positionY: positionY + 1000
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource == undefined) {
            //return;
        }

        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.phone.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
    goBack(rowData) {
		this.props.navigator.pop();
	}
	
    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={{
                justifyContent: 'center',
                height: 100
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true}/>
            </View>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
				<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'darkblue'
							}}>
								 Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								fontWeight: 'bold',
								color: 'black'
							}}>
								{this.state.searchQueryHttp}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'darkblue'
							}}>
								Done 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>

				<View style={{marginTop: 0}}>
					<TextInput style={{
						height: 45,
						marginTop: 4,
						padding: 5,
						backgroundColor: 'whitesmoke',
						borderWidth: 3,
						borderColor: 'whitesmoke',
						borderRadius: 0,
					}}
							   onChangeText={this.onChangeText.bind(this)}
							   value={this.state.searchQuery}
							   placeholder="Search">
					</TextInput>

					{errorCtrl}

				</View>

				{loader}

				<ScrollView
					onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
					<ListView
						enableEmptySections={true}
						style={{marginTop: 0, marginBottom: 0}}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>

				<View style={{marginBottom: 0}}>
					<Text style={styles.countFooter}>
						{this.state.resultsCount} entries were found.
					</Text>
				</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        backgroundColor: 'lightgray',
		color: 'black'
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
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
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
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchResults;

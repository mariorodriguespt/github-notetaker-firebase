import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  PickerIOS
} from 'react-native';

import {
    getBio,
    getRepos
} from '../Utils/api';

import Dashboard from './Dashboard.js';

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

export default class Main extends Component {
    constructor( props ){
        super( props );

        this.state = {
            username : '',
            isLoading : false,
            error : false
        }
    }

    handleChange( event ){
        this.setState({
            username : event.nativeEvent.text
        });
    }

    handleSubmit(){
        //Update NavigatorIOS spinner
        //fetch data from github
        //reroute to next screen with github information

        this.setState({
            isLoading : true
        });

        getBio( this.state.username )
            .then( ( response ) =>{
                if( response.message === 'Not Found' ){
                    this.setState({
                        isLoading: false,
                        error: 'User not found'
                    });
                }
                else {
                    console.log('github response: ' , response );
                    
                    this.setState({
                        isLoading: false
                    });

                    this.props.navigator.push({
                        title : response.name || "Select an option",
                        component: Dashboard,
                        passProps: {
                            userInfo : response
                        }
                    });
                }
            })

        

        console.log( 'SUBMIT username' , this.state.username );

    }

  render() {
    var showError = this.state.error ? <Text>{ this.state.error }</Text> : <View></View>;

    
    return (
      <View style={styles.mainContainer}>
        <Text style={ styles.title }> Search for a Github User </Text>
        <TextInput
            style={ styles.searchInput }
            value={ this.state.username }
            onChange={ this.handleChange.bind(this)}
        />

        <TouchableHighlight
            style={ styles.button }
            onPress={ this.handleSubmit.bind( this )}
            underlayColor={'white'}
        >
            <Text style={ styles.buttonText }> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicator
            animating={ this.state.isLoading }
            color="#111"
            size="large">
        </ActivityIndicator>        
            {showError}
      </View>
    )
  }
}
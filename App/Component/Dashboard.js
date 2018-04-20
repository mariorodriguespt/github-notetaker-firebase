import React, { Component } from 'react';

import {
    Text, 
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';

import { getRepos , getNotes } from '../Utils/api';

var styles = StyleSheet.create({
    container: {
      marginTop: 65,
      flex: 1
    },
    image: {
      height: 350,
    },
    buttonText: {
      fontSize: 24,
      color: 'white',
      alignSelf: 'center'
    }
  });

export default class Dashboard extends Component{
    
    goToProfile(){
        this.props.navigator.push({
            title: 'Profile Page',
            component : Profile,
            passProps: {
                userInfo : this.props.userInfo
            }
        });
    }
    
    goToRepos(){
        const self = this;

        getRepos( this.props.userInfo.login )
            .then( (response) =>{
                this.props.navigator.push({
                    title: 'Repos',
                    component : Repositories,
                    passProps: {
                        repos: response,
                        userInfo : this.props.userInfo
                    }
                });
            });
    }

    goToNotes(){
        getNotes( this.props.userInfo.login )
            .then( ( response ) => {
                response = response || {};

                this.props.navigator.push({
                    title : 'Notes',
                    component : Notes,
                    passProps : {
                        userInfo : this.props.userInfo,
                        notes : response
                    }
                });
            });
    }

    makeBackground( button ){
        const object = {
            flexDirection: 'row',
            alignSelf:'stretch',
            justifyContent:'center',
            flex:1
        }
        switch( button ){
            case 0:
                object.backgroundColor = '#48BBEC'
            break;
            case 1:
                object.backgroundColor = '#E77AAE'
            break;
            default:
                object.backgroundColor = '#758BF4'
        }

        return object
    }

    render(){
        

        return (
            <View style={ styles.container }>
                <Image style={styles.image}
                    source={{
                        uri : this.props.userInfo.avatar_url
                    }}
                />
                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={ this.goToProfile.bind(this)}
                    
                    >
                    <Text style={ styles.buttonText }> View Profile </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={ this.goToRepos.bind(this)}>
                    <Text style={ styles.buttonText }> Repos </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={ this.goToNotes.bind(this)}
                
                    >
                    <Text style={ styles.buttonText }> Notes </Text>
                </TouchableHighlight>
            </View>
        );
    }
}


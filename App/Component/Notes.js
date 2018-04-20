import React     from 'react';
import PropTypes from 'prop-types';

import Separator from '../Helpers/Separator';
import Badge     from './Badge';

import {
    getNotes,
    addNote
} from '../Utils/api';

import {
    View,
    Text,
    TextInput,
    ListView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    buttonText: {
      fontSize: 18,
      color: 'white'
    },
    button: {
      height: 60,
      backgroundColor: '#48BBEC',
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchInput: {
      height: 60,
      padding: 10,
      fontSize: 18,
      color: '#111',
      flex: 10
    },
    rowContainer: {
      padding: 10
    },
    footerContainer: {
      backgroundColor: '#E3E3E3',
      alignItems: 'center',
      flexDirection: 'row'
    }
  });

export default class Notes extends React.Component {
    constructor( props ){
        super( props );

        this.dataSource = new ListView.DataSource({
            rowHasChanged: ( row1 , row2 ) => row1 !== row2
        });

        this.state = {
            dataSource : this.dataSource.cloneWithRows( this.props.notes ),
            note : '',
            error : ''
        }
    }

    handleSubmit(){
        const note = this.state.note;
        
        this.setState({
            note: ''
        });

        addNote( this.props.userInfo.login , note )
            .then( ( data ) => {
                console.log('add note data : ' , data );

                getNotes( this.props.userInfo.login )
                    .then( ( data ) => {
                        this.setState({
                            dataSource : this.dataSource.cloneWithRows( data )
                        });
                    });

            } )
            .catch( ( error ) => {
                console.log('Request failed : ' , error );
                
                this.setState({
                    error
                });
            });
    }

    handleChange( event ){
        this.setState({
            note: event.nativeEvent.text
        });
    }

    footer(){
        return (
            <View style={ styles.footerContainer }>
                <TextInput
                    style={ styles.searchInput }
                    value={ this.state.note }
                    onChange={ this.handleChange.bind( this )}
                    placeholder='New Note'
                />
                <TouchableHighlight 
                    style={ styles.button }
                    onPress={ this.handleSubmit.bind( this ) }
                    underlayColor='#88D4F5'
                >
                    <Text style={ styles.buttonText }> Submit </Text>
                </TouchableHighlight>
            </View>
        );
    }

    renderRow( rowData ){
        return(
            <View style={ styles.rowContainer }>
                <Text>{ rowData }</Text>
                <Separator/>
            </View>
        );
    }
    
    render(){
        return (
            <View style={ styles.container }>
            <ListView
                dataSource={ this.state.dataSource}
                renderHeader={ ()=> <Badge userInfo={ this.props.userInfo}/> }
                renderRow={ this.renderRow }
                />
                { this.footer() }
            </View>

        );
    }
}

Notes.propsTypes = {
    userInfo : PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
};

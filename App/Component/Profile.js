import React from 'react';

import {
    Text, 
    View, 
    StyleSheet,
    ScrollView

} from 'react-native';

import Badge from './Badge.js';
import Separator  from '../Helpers/Separator.js';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    rowContainer: {
      padding: 10
    },
    rowTitle: {
      color: '#48BBEC',
      fontSize: 16
    },
    rowContent: {
      fontSize: 19
    }
  });

class Profile extends React.Component{
    getRowTitle( user , item ){
        item = ( item === 'public_repos' ) ? item.replace( '_' , ' ' ) : item;
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }

    render(){
        const topicArray = [ 'company' , 'location' , 'followers' , 'following' , 'email' , 'bio' , 'public_repo'];
        const list = topicArray.map( ( item , index ) => {
            if( this.props.userInfo[ item ] ){
                return (
                    <View key={ index } style={ styles.rowContainer }>
                        <Text style={ styles.rowTitle }>
                            { this.getRowTitle( this.props.userInfo , item )}
                        </Text>
                        <Text style={ styles.rowContent }>
                            { this.props.userInfo[item] }
                        </Text>
                        <Separator/>
                    </View>
                )
            }
            else{
                return <View key={index} />
            }

        });
        return (
            <ScrollView style={ styles.container }>
                <Badge style={styles.rowContainer} userInfo={ this.props.userInfo } />
                {list}
            </ScrollView>
        );
    }
};

module.exports = Profile;

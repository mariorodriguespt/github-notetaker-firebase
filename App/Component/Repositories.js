import React from 'react';
import {
    ScrollView,
    TouchableHighlight,
    StyleSheet,
    View,
    Text
} from 'react-native';

import Badge from './Badge';
import Separator from '../Helpers/Separator';
import WebBrowserView from '../Helpers/WebView';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:0
      
    },
    rowContainer: {
      flexDirection: 'column',
      flex: 1,
      padding: 10
    },
    name: {
      color: '#48BBEC',
      fontSize: 18,
      paddingBottom: 5
    },
    stars: {
      color: '#48BBEC',
      fontSize: 14,
      paddingBottom: 5
    },
    description: {
      fontSize: 14,
      paddingBottom: 5
    }
  });

export default class repositories extends React.Component{
    openPage( url ){
        this.props.navigator.push({
            component : WebBrowserView,
            title : 'Web View',
            passProps : {
                url
            }
        });
    }

    render(){
        const list = this.props.repos.map( ( item , index ) => {
            const description = item.description ? <Text style={ styles.description}> {item.description}</Text> : <View></View>;

            return (
                <View key={ index }>
                    <View style={ styles.rowContainer }>
                        <TouchableHighlight
                            onPress={ this.openPage.bind( this , item.html_url ) }
                            underlayColor='transparent'                    
                        >
                            <Text style={ styles.name }> { item.name }</Text>
                        </TouchableHighlight>
                        <Text style={ styles.stars }>
                            Stars: { item.stargazers_count }
                        </Text>
                        <Separator />
                    </View>

                </View>
            )
        } );
        return(
            <ScrollView style={ styles.container }>
                <Badge userInfo={ this.props.userInfo } />
                {list}
            </ScrollView>
        )
    }
}
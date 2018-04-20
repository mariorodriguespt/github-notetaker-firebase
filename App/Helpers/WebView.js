import React from 'react';

import {
    View,
    WebView,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F6F6EF',
        flexDirection : 'column'
    }
});

export default class WebBrowserView extends React.Component {
    render(){
        return (
            <View style={ styles.container }>
                <WebView url={ this.props.url } />
            </View>
        )
    }
}

WebBrowserView.propTypes = {
    url : PropTypes.string.isRequired
};

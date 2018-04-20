import React from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});

export default class Badge extends React.Component {
    componentWillMount(){
        this.animatedValue = new Animated.Value(1);
    }

    componentDidMount(){
        Animated.timing( this.animatedValue , {
            toValue: 0.8,
            duration: 3000,
            easing : Easing.bounce
        }).start();
    }

    render(){
        const props = this.props;

        return (
            <Animated.View style={ [ styles.container , { opacity : this.animatedValue } ]}>
              <Image
                style={styles.image}
                source={{uri: props.userInfo.avatar_url}}
              />
              <Text style={styles.name}> {props.userInfo.name} </Text>
              <Text style={styles.handle}> {props.userInfo.login} </Text>
            </Animated.View>
          )
    }
    
  }
Badge.propTypes = {
    userInfo: PropTypes.object.isRequired
}

module.exports = Badge;

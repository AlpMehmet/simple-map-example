import React, { Component}  from 'react';
import {View , StyleSheet}  from 'react-native';
import {Router, Scene, Drawer, Stack} from 'react-native-router-flux';



export default class Root extends Component {
    render()
        {
            return(
                <View style={styles.navBar}>
                    <Text>Menu Ekranı</Text>
                </View>
            );
            }
    }
const styles= StyleSheet.create({
    navBar: {
        backgroundColor: 'blue',
    }
});
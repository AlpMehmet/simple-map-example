import React, { Component}  from 'react';
import {View , StyleSheet}  from 'react-native';
import {Router, Scene, Drawer, Stack} from 'react-native-router-flux';

import Main from './component/Main';
import Menu from './component/Menu';

export default class Root extends Component {
    render()
        {
            return(
                <Router 
                navBarStyle={styles.navBar}>
                    <Scene 
                    key='Root'
                    >
                        <Scene
                        key='Main'
                        component={Main} 
                        initial
                        />
                        <Scene
                        key='Menu'
                        component={Menu} 
                        
                        />
                    
                    </Scene>
                </Router>
            );
            }
    }
const styles= StyleSheet.create({
    navBar: {
        backgroundColor: 'blue',
    }
});
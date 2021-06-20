import React, { Component } from 'react';
import { View, Text, TouchableOpacity , Dimensions } from "react-native";
 const {width, height} = Dimensions.get('window');
class Button extends Component {
    render() {
        return(
            <TouchableOpacity style={{
                width: width*0.30,
                height: height*0.03,
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'blue',
                marginTop: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center' ,
                marginLeft: 55,
            }}
                onPress={() => this.props.onPress()}>
                    <Text style={{color: 'white'}}>{this.props.text}</Text>
                </TouchableOpacity>
        );
    }
}
const styles={};
export default Button;
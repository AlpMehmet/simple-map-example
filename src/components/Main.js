import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Button from '../commons/Button';
import Geolocation from '@react-native-community/geolocation';

//var { width, height } = Dimensions.get('wndow');

export default class Main extends Component {
  
    state = {

      ImageSource: null,
      currentLongitude: 'unknown',//Initial Longitude
      currentLatitude: 'unknown',//Initial Latitude
    
    };
    componentDidMount = () => {
      var that =this;
      //Checking for the permission just after component loaded
      if(Platform.OS === 'ios'){
        this.callLocation(that);
      }else{
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              that.callLocation(that);
            } else {
              alert("Permission Denied");
            }
          } catch (err) {
            alert("err",err);
            console.warn(err)
          }
        }
        requestLocationPermission();
      }    
     }
     callLocation(that){
      //alert("callLocation Called");
        Geolocation.getCurrentPosition(
          //Will give you the current location
           (position) => {
              const currentLongitude = JSON.stringify(position.coords.longitude);
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
              that.setState({ currentLongitude:currentLongitude });
              //Setting state Longitude to re re-render the Longitude Text
              that.setState({ currentLatitude:currentLatitude });
              //Setting state Latitude to re re-render the Longitude Text
           },
           (error) => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
          //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
           that.setState({ currentLongitude:currentLongitude });
           //Setting state Longitude to re re-render the Longitude Text
           that.setState({ currentLatitude:currentLatitude });
           //Setting state Latitude to re re-render the Longitude Text
        });
     }
     componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
     }
    openImagePicker() {
      var options = {
        title: 'Fotoğrafı Belirle',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        },
        takePhotoButtonTitle: 'Kameradan  seç',
        chooseFromLibraryButtonTitle: 'Galeriden Seç',
        canselButtonTitle: 'Kapat',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          //console.log(source);
          this.setState({

            ImageSource: source,

          });
        }
      });
    }

    render() {
      return (

    <View style= {styles.container}>
      {
        this.state.ImageSource !== null ?
        <TouchableOpacity
        onPress= {this.openImagePicker.bind(this)}>
            <Image
              source= {this.state.ImageSource}
              style={styles.ImageContainer}
            /> 
            <Button 
        onPress= { () => Actions.Menu}
        text= {'Paylaş'}
         />
        </TouchableOpacity>
       
        :
        <TouchableOpacity onPress= {this.openImagePicker.bind(this)}>
        <View style={styles.pickerButtonStyle}>
          <Image source={require('../img/camereIcon.png')}/>

        </View>
       </TouchableOpacity>
      }
    </View>
   
      );
    }
  
  }
  
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },

    ImageContainer: {
      borderRadius: 10,
      width: 250,
      height: 250,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',
      
    },
    pickerButtonStyle: {
        //width: width*0.24,
        //height: width*0.24,
        //borderRadius: (width*0.24) / 2,
        borderRadius: 0.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerTextStyle:{
      color: 'red',
      //width: width*0.24,
      textAlign: 'center'
    },
    photoStyle: {
         //width: width*0.24,
        //height: width*0.24,
        //borderRadius: (width*0.24) / 2,
        width: 500,
        height: 500,
        borderRadius: 5,
    }

  });
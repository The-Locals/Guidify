import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';

import {useTheme, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Button } from "@react-native-material/core";

import ImagePicker from 'react-native-image-crop-picker';


export default function EditUser({navigation}) {
    const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();<Button title="Follow" variant='contained' color="black" tintColor='white' titleStyle={{
    fontFamily: 'Lexend-Regular'
  }}/>
  fall = new Animated.Value(1);

  return (
   <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
    }}>
        <View style={{alignItems: 'center', marginBottom: 30}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Avatar.Image
                    source={require('../assets/avatar.png')}
                    size={85}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Button onPress={() => this.bs.current.snapTo(0)} title="Change Profile Picture" variant='outlined' color="black" titleStyle={{
          fontFamily: 'Lexend-Regular',
          fontSize: 15
        }} uppercase={false}/>
        </View>

        <View style={styles.action}>
        <Image source={require('../assets/usericon.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                fontSize: 15,
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Image source={require('../assets/usericon.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                color: colors.text,
                fontSize: 15,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Image source={require('../assets/telephone.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                color: colors.text,
                fontSize: 15,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Image source={require('../assets/email.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                color: colors.text,
                fontSize: 15,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Image source={require('../assets/country.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                color: colors.text,
                fontSize: 15,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Image source={require('../assets/gps.png')} style={{height:20, width:20}}/>
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                fontFamily: 'Lexend-Regular',
                color: colors.text,
                fontSize: 15,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: 'black',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
      fontFamily: 'Lexend-Bold',
      color: 'black'
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'black',
      height: 30,
      marginBottom: 10,
      fontFamily: 'Lexend-Regular'
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: 'black',
      alignItems: 'center',
      marginVertical: 7,
      fontFamily: 'Lexend-Regular'
    },
    panelButtonTitle: {
      fontSize: 17,
      fontFamily: 'Lexend-Regular',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#2e2e2e',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: 'black',
    },
  });
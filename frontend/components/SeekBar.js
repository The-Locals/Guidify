import React, {useState} from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
  import Slider from '@react-native-community/slider';
  import backbutton from '../assets/backward-seek.png';
  import forwardbutton from '../assets/forward-seek.png';
  import SoundPlayer from 'react-native-sound-player';

export default function SeekBar(props) {
    
    return(
        <View style={styles.sliderCardHolder}>
            <View style={styles.sliderCardContentHolder}>
            <TouchableOpacity onPress={SoundPlayer.playUrl()}><Image source={backbutton} style={{width: 30, height: 30, resizeMode: 'cover'}}/></TouchableOpacity>
              <View style={styles.sliderCardSliderHolder}>
            <Slider
                style={{width: 330, height: 20, opacity: 50}}
                minimumValue={0}
                maximumValue={1} 
                minimumTrackTintColor="#b4eb34"
                maximumTrackTintColor="#eb344c"
                />
                
                </View>
                <TouchableOpacity onPress={SoundPlayer.pause()}><Image source={forwardbutton} style={{width: 30, height: 30, resizeMode: 'cover'}}/></TouchableOpacity>
                </View>
        </View>
        )

    }

    const styles = StyleSheet.create({
      sliderCardSliderHolder:
      {
        justifyContent: 'center',
        alignItems: 'center'

      },
        sliderCardHolder: {
          position: 'absolute',
          zIndex: 2,
          width: Dimensions.get('window').width,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 170,
          padding: 10,
        },
        sliderCardContentHolder: {
          position: 'relative',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          backgroundColor: 'black',
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          padding: 10,
          width: '90%',
          height: '100%',
          borderRadius: 15,
          flexDirection: 'row',
        },
        bottomCardImageHolder: {
          flex: 1.2,
          width: '30%',
          height: '100%',
          borderRadius: 10,
        },
        bottomCardInfoHolder: {
          flex: 2,
          paddingLeft: 10,
        },
        bottomCardPlayerHolder: {
          marginTop: 10,
        },
        bottomCardWebView: {
          backgroundColor: 'black',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        },
      });
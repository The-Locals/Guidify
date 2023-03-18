import React, {useState, useEffect} from 'react';
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
const {
  currentAudioTime,
  setAudioTime,
  itiTg,
  tgNumber
}=props;

  const currentTimeMinutes = Math.floor(currentAudioTime % 3600 / 60);
  const currentTimeSeconds = ('0'+Math.floor(currentAudioTime % 3600 % 60)).slice(-2);
  const minutesDuration = itiTg.length > 0 && Math.floor(itiTg[tgNumber].audioLength % 3600 / 60);
  const secondsDuration = itiTg.length > 0 &&('0'+Math.floor(itiTg[tgNumber].audioLength % 3600 % 60)).slice(-2);

    const seekForward = async (time) => {
      
      if ((await SoundPlayer.getInfo()).duration!=null){
        console.log("Seek forward")
        setAudioTime(await SoundPlayer.getInfo().currentTime)
        SoundPlayer.seek(currentAudioTime+time);
        //TODO check if currentaudio time is less than 10 and set to 0 if it is
        setAudioTime(currentAudioTime+time);
      }
      else{
        console.log("Failked seek")
      }
    }

    const seekBackward = async (time) => {
      
      if ((await SoundPlayer.getInfo()).duration!=null){
        console.log("Seek backward")
        setAudioTime(await SoundPlayer.getInfo().currentTime)
        SoundPlayer.seek(currentAudioTime-time);
        if (currentAudioTime-time < 0){
          setAudioTime(0);
        }
        else setAudioTime(currentAudioTime-time);
      }
      else{
        console.log("Failked backward")
      }
    }

    const handleSeekBar = (value) =>{
      seekToTime = value * (itiTg.length > 0 && itiTg[tgNumber].audioLength)
      console.log(seekToTime)
      SoundPlayer.seek(seekToTime)
    }

    calculateSeekBar = (currentAudioTime) =>{
      return currentAudioTime / (itiTg.length > 0 && itiTg[tgNumber].audioLength)
    }

    return(
        <View style={styles.sliderCardHolder}>
            <View style={styles.sliderCardContentHolder}>

              <View style={styles.audioTimer}>
                <Text style={{color:`#fffaf0`, fontWeight:'600'}}>{currentTimeMinutes}:{currentTimeSeconds}</Text>
                <Text style={{color:`#fffaf0`, fontWeight:'600'}}>
                  {minutesDuration}:{secondsDuration}
                </Text>
              </View>
            
            <TouchableOpacity onPress={() => { 
                    seekBackward(10);
                  }}>
              <Image source={backbutton} style={{width: 30, height: 30, resizeMode: 'cover'}}/>
            </TouchableOpacity>
            
{/*TODO Slider use onSlideCOmplete to change currentaduio time and do soundplayer.seek */}
              <View style={styles.sliderCardSliderHolder}>
                <Slider
                style={{width: 250, height: 20, opacity: 50}}
                minimumValue={0}
                maximumValue={1} 
                minimumTrackTintColor="#b4eb34"
                maximumTrackTintColor="#eb344c"
                value={calculateSeekBar(currentAudioTime)}
                onSlidingComplete={(value) => {
                  handleSeekBar(value)
                }}
                />
              </View>

                <TouchableOpacity onPress={() => {
                    seekForward(10);
                  }}>
                    <Image source={forwardbutton} style={{width: 30, height: 30, resizeMode: 'cover'}}/>
                </TouchableOpacity>
                </View>
        </View>
        )

    }

    const styles = StyleSheet.create({
      audioTimer:{
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
      sliderCardSliderHolder:
      {
        justifyContent: 'center',
        alignItems: 'center'

      },
        sliderCardHolder: {
          position: 'absolute',
          zIndex: 2,
          width: Dimensions.get('window').width,
          height: 100,
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
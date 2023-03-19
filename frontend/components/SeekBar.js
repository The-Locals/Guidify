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
  import playIcon from '../assets/play_1.png';
  import pauseIcon from '../assets/pause_1.png';
  import SoundPlayer from 'react-native-sound-player';

export default function SeekBar(props) {
const {
  currentAudioTime,
  setAudioTime,
  itiTg,
  tgNumber
}=props;

  const [isPaused, setPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const currentTimeMinutes = Math.floor(currentAudioTime % 3600 / 60);
  const currentTimeSeconds = ('0'+Math.floor(currentAudioTime % 3600 % 60)).slice(-2);
  const minutesDuration = itiTg.length > 0 && Math.floor(itiTg[tgNumber].audioLength % 3600 / 60);
  const secondsDuration = itiTg.length > 0 &&('0'+Math.floor(itiTg[tgNumber].audioLength % 3600 % 60)).slice(-2);

  function handleAudioButtonPress() {
    if (isPaused){
      SoundPlayer.play()
      setPaused(false)
    }
      else{
      SoundPlayer.pause()
      setPaused(true)
    }
  }
    const seekForward = (time) => {
      if (currentAudioTime != 0){
        if (currentAudioTime+time < (itiTg.length > 0 && itiTg[tgNumber].audioLength) )
          setAudioTime(currentAudioTime+time);

        SoundPlayer.seek(currentAudioTime+time);
      }
      else{
        console.log("No Travel Guide present")
      }
    }

    const seekBackward = (time) => {
      
      if (currentAudioTime != 0){
        SoundPlayer.seek(currentAudioTime-time);
        if (currentAudioTime-time < 0)
          setAudioTime(0);

        else setAudioTime(currentAudioTime-time);
      }
      else{
        console.log("No Travel Guide present")
      }
    }

    //TODO is there a way to make this check not happen with a flag?
    //TODO potential performance enhancement because this check fires off constantly while TG is playing
    const checkIfDisabled = () => {
      console.log("Check")
      if (currentAudioTime == 0)
        return true;
      return false;
    }

    const handleSeekBarChange = (value) =>{
      seekToTime = value * (itiTg.length > 0 && itiTg[tgNumber].audioLength)
      SoundPlayer.seek(seekToTime)
      return 0
    }

    //TODO Is there a way to interval this check? happens too frequently imo
    calculateSeekBar = () =>{
      if (currentTimeMinutes != 0 && secondsDuration != 0 && currentAudioTime != 0)
      {
        console.log(currentAudioTime)
        return currentAudioTime / (itiTg.length > 0 && itiTg[tgNumber].audioLength)
      }
      console.log("Failed if check")
        return 0
    }

    return(
        <View style={styles.sliderCardHolder}>
          
          {/* Everything inside this view is inside the black box
              Anything place outside of it will go outside the box */}
            <View style={styles.sliderCardContentHolder}>

            <TouchableOpacity
            // TODO Figure out a way to disable or hide the button when there is no Travel guide playing
            // For now this button is placeholder
                  disabled={true}
                  style={{
                    flex: 0.3,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    handleAudioButtonPress();
                  }}>
                  <Image
                    source={isPaused ? playIcon : pauseIcon}
                    style={{width: 30, height: 30, resizeMode: 'cover'}}
                  />
                </TouchableOpacity>

              <View style={styles.audioTimer}>
                <Text style={styles.textStyles}>
                  {currentTimeMinutes}:{currentTimeSeconds}
                </Text>
                <Text style={styles.textStyles}>
                  {minutesDuration}:{secondsDuration}
                {/* When a user exits the Travel Guide these 2 variables dont change back to 0 */}
                </Text>
              </View>
            
            <TouchableOpacity onPress={() => { 
                    seekBackward(10);
                  }}>
              <Image source={backbutton} style={{width: 30, height: 30, resizeMode: 'cover'}}/>
            </TouchableOpacity>

              <View style={styles.sliderCardSliderHolder}>
                <Slider
                style={{width: 250, height: 20, opacity: 10}}
                minimumValue={0}
                maximumValue={1} 
                minimumTrackTintColor="#b4eb34"
                maximumTrackTintColor="#eb344c"
                disabled={checkIfDisabled()}
                value={calculateSeekBar()}
                onSlidingComplete={(value) => {
                  handleSeekBarChange(value)
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

      textStyles:{
        color: 'white',
        fontSize: 17,
        letterSpacing: 3,
        fontFamily: 'Lexend-Light',
        fontWeight: 'bold'
      },
      audioTimer:{
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: 8,
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
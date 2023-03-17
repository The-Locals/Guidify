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
  } from 'react-native';
  import Slider from '@react-native-community/slider';

export default function SeekBar(props) {
    
    return(
        <View>
            <Text>
                Slider
            </Text>
            <Slider
                style={{width: 200, height: 50}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#b4eb34"
                maximumTrackTintColor="#eb344c"
                />
        </View>
        )

}
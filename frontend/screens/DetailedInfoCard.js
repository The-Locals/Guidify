import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailedInfoCard = props => {
console.log(props.route.params)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a blank page for the DetailedInfoCard</Text>
      <Text>City Name: {props.route.params.city}</Text>
      <Button
          title="Go to Map Page"
          onPress={() =>  props.navigation.navigate('Map') }
      />
    </View>
  );
};

export default DetailedInfoCard;
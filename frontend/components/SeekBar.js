import React, {useState} from 'react';

export default function BottomInfoCard(props) {
    
    return(
        <View>
            <Slider>
                style={{width:width, height:40}}
                minimumValue={0}
                maximumValue={1}
                value={calculateSeekBar()}
                onValueChange={value => {
                    console.log(value);
                }}
            </Slider>
        </View>
        )

}
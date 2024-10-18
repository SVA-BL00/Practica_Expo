import{ useState, useEffect } from 'react';
import{ Text, View, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const{ height, width } = Dimensions.get('window');

const calculateBrightness = (hexColor: string): string =>{
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 186 ? 'black' : 'white';
};

const rgbToHex = (r: number, g: number, b: number): string =>{
  return '#' + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, '0'))
    .join('');
};

export default function TabLayout(){
  const [sliderValueR, setSliderValueR] = useState(0);
  const [sliderValueG, setSliderValueG] = useState(0);
  const [sliderValueB, setSliderValueB] = useState(0);

  useEffect(() =>{
    loadValues();
  }, []);

  useEffect(() =>{
    saveValues();
  }, [sliderValueR, sliderValueG, sliderValueB]);

  const loadValues = async () =>{
    try{
      const savedR = await AsyncStorage.getItem('sliderR');
      const savedG = await AsyncStorage.getItem('sliderG');
      const savedB = await AsyncStorage.getItem('sliderB');
      
      if (savedR) setSliderValueR(Number(savedR));
      if (savedG) setSliderValueG(Number(savedG));
      if (savedB) setSliderValueB(Number(savedB));
    } catch (error){
      console.log('Error loading values:', error);
    }
  };

  const saveValues = async () =>{
    try{
      await AsyncStorage.setItem('sliderR', sliderValueR.toString());
      await AsyncStorage.setItem('sliderG', sliderValueG.toString());
      await AsyncStorage.setItem('sliderB', sliderValueB.toString());
    } catch (error){
      console.log('Error saving values:', error);
    }
  };

  const backgroundColor = rgbToHex(sliderValueR, sliderValueG, sliderValueB);
  const textColor = calculateBrightness(backgroundColor);
  return (
    <View style={[styles.container,{ backgroundColor }]}>
      <Text style={[styles.text,{ color: textColor }]}>Mueve los sliders para cambiar el color de la pantalla!</Text>
      <View style={styles.sContainer}>
        <Text style={{ color: 'red', margin: 5 }}>Red</Text>
        <Text style={{margin: 5 }}>{sliderValueR}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={255}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValueR}
          onValueChange={setSliderValueR}
        />
        <Text style={{ color: 'green', margin: 5 }}>Green</Text>
        <Text style={{margin: 5 }}>{sliderValueG}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={255}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValueG}
          onValueChange={setSliderValueG}
        />
        <Text style={{ color: 'blue', margin: 5 }}>Blue</Text>
        <Text style={{margin: 5 }}>{sliderValueB}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={255}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValueB}
          onValueChange={setSliderValueB}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  sContainer:{
    backgroundColor: 'white',
    margin: 10,
  }
});
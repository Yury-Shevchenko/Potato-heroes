import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Platform, AsyncStorage, Image } from 'react-native';
import { MonoText } from '../components/StyledText';

const STORAGE_AGE = '@save_age';
const STORAGE_GENDER = '@save_gender';
const STORAGE_LIFESTYLE = '@save_lifestyle';

import DropDownPicker from 'react-native-dropdown-picker';

export default function Settings ({ navigation }) {

  const [userAge, setUserAge] = React.useState(false);
  const [userGender, setUserGender] = React.useState(false);
  const [userLifestyle, setUserLifestyle] = React.useState(false);

  const onChange = (event, selectedTime, mode) => {
    setShowSaveButton(true)
    const time = mode === 'start' ? startTime : endTime;
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    if(mode === 'start'){
      setStartTime(currentTime);
    } else {
      setEndTime(currentTime);
    }
  };

  const fetchData = async () => {
    let ageInStorage, genderInStorage, styleInStorage;
    try {
      ageInStorage = await AsyncStorage.getItem(STORAGE_AGE);
      genderInStorage = await AsyncStorage.getItem(STORAGE_GENDER);
      styleInStorage = await AsyncStorage.getItem(STORAGE_LIFESTYLE);
    } catch (e) {
    }
    if(ageInStorage) setUserAge(ageInStorage)
    if(genderInStorage) setUserGender(genderInStorage)
    if(styleInStorage) setUserLifestyle(styleInStorage)
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem(STORAGE_AGE, String(userAge))
    await AsyncStorage.setItem(STORAGE_GENDER, String(userGender))
    await AsyncStorage.setItem(STORAGE_LIFESTYLE, String(userLifestyle))
  }

  return (
    <View style={styles.container}>

      <View>
        <Image
          source={require("../assets/images/userInfo.png")}
          style={{ width: 350, height: 300, marginBottom: 25 }}
        />
      </View>

      <MonoText style={styles.monotextStyle}>Your gender:</MonoText>
      <DropDownPicker
        items={[
            { label: 'Female', value: 'female' },
            { label: 'Male', value: 'male'  },
        ]}
        defaultValue={'female'}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={gender => setUserGender(gender.value)}
      />

      <MonoText style={styles.monotextStyle}>Your age:</MonoText>
      <TextInput
        placeholder="Your age"
        style={styles.textInput}
        onChangeText={setUserAge}
        value={userAge || ''}
        keyboardType="decimal-pad"
      />


      <MonoText style={styles.monotextStyle}>Your lifestyle: </MonoText>
      <DropDownPicker
        items={[
            {label: 'Sedentary', value: 'sedentary'},
            {label: 'Moderate', value: 'moderate'},
            {label: 'Active', value: 'active' },
        ]}
        defaultValue={'sedentary'}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={lifestyle => setUserLifestyle(lifestyle.value)}
      />


      <Button onPress={save} style={styles.saveBtn} title="Save" />


    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  timePicker: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateTimePicker: {
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fcfdff',
    marginBottom: 10,
  },
  saveBtn: {
    marginTop: 20,
  },
  monotextStyle: {
    fontSize: 20,
  },
})

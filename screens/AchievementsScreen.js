import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet, Text, View, Button, Switch, RefreshControl } from 'react-native';
import { FlatList, RectButton, ScrollView } from 'react-native-gesture-handler';

import * as Linking from 'expo-linking';
import { calculateDayCaloriesLimit } from '../api/calculate';
import { MonoText } from '../components/StyledText';

export default function AchievementsScreen ({ navigation, route }) {

  const [caloriesNumber, setCaloriesNumber] = React.useState(null);

  const fetchData = async () => {
    let ageInStorage, genderInStorage, styleInStorage;
    try {
      ageInStorage = await AsyncStorage.getItem(STORAGE_AGE);
      genderInStorage = await AsyncStorage.getItem(STORAGE_GENDER);
      styleInStorage = await AsyncStorage.getItem(STORAGE_LIFESTYLE);
    } catch (e) {}
    if((ageInStorage && genderInStorage && styleInStorage) || true) {
      const caloriesNumber = calculateDayCaloriesLimit(20, "m", "sedentary");
      // TODO calculate the number of daily calories intake
      setCaloriesNumber(2600);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return(
    <View style={styles.container}>
      <MonoText style={styles.monotextStyle}>Your daily recommended level of calories {caloriesNumber}.</MonoText>
      <MonoText style={styles.monotextStyle}>Your current level of activity is king.</MonoText>
      <Image
        source={require("../assets/images/levels/king.png")}
        style={{ width: 350, height: 300, alignItems: 'center', justifyContent: 'center' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  hasTapped: {
    backgroundColor: '#dadfe6',
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    margin: 5,
  },
  switchToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  monotextStyle: {
    fontSize: 20
  },
});

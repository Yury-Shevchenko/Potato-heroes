import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

import { Tile, Card, Icon } from 'react-native-elements';
import * as Linking from 'expo-linking';

import { MonoText } from '../components/StyledText';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const STORAGE_HISTORY = '@save_records';

const YOUR_SERVER_URL = 'https://api-beta.bite.ai/vision/';

export default function HomeScreen ({ navigation, route }) {

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [recognizedObjects, setRecognizedObjects] = React.useState([]);
  const [nutrition, setNutrition] = React.useState([]);
  const [calories, setCalories] = React.useState(false);
  const [product, setProduct] = React.useState(false);

  async function checkProduct(product) {
    if(product !== 'other'){
      setProduct(product);
      const res = await fetch(`https://api-beta.bite.ai/items/${product.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer c7fbccf2d7a14ada9975bdd810e11882fc319858',
        },
      });
      const json = await res.json();
      if(json?.nutrition_facts.length){
        const calories = json.nutrition_facts[0].nutrition.calories;
        setCalories(calories);
      } else {
        setCalories(false);
      }
    } else {
      setCalories(false);
    }
  }

  async function saveRecord() {
    // get the history
    let oldHistory;
    try {
      oldHistory = await AsyncStorage.getItem(STORAGE_HISTORY);
    } catch (e) {
    }
    const parsedOldHistory = (oldHistory && JSON.parse(oldHistory)) || [];
    const newRecord = {
      uri: image,
      calories: calories,
      date: Date.now(),
      name: product.name,
    }
    const updatedHistory = [...parsedOldHistory, newRecord]

    try {
      await AsyncStorage.setItem(STORAGE_HISTORY, JSON.stringify(updatedHistory));
    } catch (err) {
      alert('Failed to save samply id in the local storage.');
    }

    setImage(false)
    setResult(false)
    setCalories(false)
    setRecognizedObjects([])
  }

  async function takeAndUploadPhotoAsync() {
    // Display the camera to the user and wait for them to take a photo or to cancel the action
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      setLoading(true)
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        return;
      }

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      setImage(localUri);

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('file', { uri: localUri, name: filename, type });

      const res = await fetch(YOUR_SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer c7fbccf2d7a14ada9975bdd810e11882fc319858',
        },
      });
      const json = await res.json();
      const objects = json.items.map(item => item.item);
      let children, recognizedObjects;
      if (objects) {
        children = objects.map(o => o.children)[0];
      }
      if (children){
        setRecognizedObjects(children)
      }
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >

        <View style={styles.helpContainer}>
          <View style={styles.getStartedText}>
            <MonoText style={styles.monotextStyle}>Take the image of what you eat today</MonoText>
            <Button title="Upload image" onPress={() => takeAndUploadPhotoAsync()} />
            {image && <Image source={{ uri: image }} style={{
              alignSelf: 'center',
              height: 250,
              width: 250,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 75
            }} />}
            {
              (calories || calories === 0) ? (
                <View>
                  <Text>
                    Calories {calories}
                  </Text>
                  <Button title='Save in the history' onPress={() => saveRecord()} />
                  </View>
              ): (<Text></Text>)
            }

            { (recognizedObjects && recognizedObjects.length) ?
              (<View style={styles.productsList}>
                <Text>It seems like you are having ...</Text>
                <Text>Please select the type of product</Text>
                { recognizedObjects.map(recognizedObject => (
                  <Button key={recognizedObject.id} title={`${recognizedObject.name}`} onPress={() => checkProduct(recognizedObject)} />
                ))
                }
                <Button title='Not in the list' onPress={() => checkProduct('other')} />
              </View>) :
              (<Text></Text>)
            }

          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {

  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 10,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  productsList: {
    borderWidth: 4,
    borderColor: 'grey',
  },
  monotextStyle: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

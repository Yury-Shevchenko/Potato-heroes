import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, RefreshControl, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
const STORAGE_HISTORY = '@save_records';

export default function GalleryScreen ({ navigation, route }) {

  const [text, setText] = React.useState('');
  const [studies, setStudies] = React.useState([]);
  const [localPhotos, setLocalPhotos] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);

  const fetchData = async () => {
    let oldHistory;
    try {
      oldHistory = await AsyncStorage.getItem(STORAGE_HISTORY);
    } catch (e) {}
    const parsedOldHistory = (oldHistory && JSON.parse(oldHistory)) || [];
    setLocalPhotos(parsedOldHistory);
    setRefreshing(false);
  };

  const onRefresh = () => {
    fetchData();
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >

        <View>
          {localPhotos.map((photo, num) => {
            return(
              <TouchableOpacity
                key={num}
              >
                <Card>
                  <View style={{marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image
                      source={{uri: photo.uri}}
                      style={{
                        alignSelf: 'center',
                        height: 150,
                        width: 150,
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 75
                      }}
                      resizeMode="cover"
                      />
                    <Text style={{marginHorizontal: 10, flex: 1, fontSize: 18}}>
                      In your {photo.name} there was {photo.calories} calories on {new Date(photo.date).getDate()}.{new Date(photo.date).getMonth()}.{new Date(photo.date).getFullYear()} at {new Date(photo.date).getHours()}:{new Date(photo.date).getMinutes()}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          )}
        </View>
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
});

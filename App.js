import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Home } from './components/Home';
import { DeckDetail } from './components/DeckDetail';
import { AddCard } from './components/AddCard';
import { Quiz } from './components/Quiz';
import *as colors from './utils/colors';


function FlashcardStatusBar ({...props}) {
  return (
    <View style={{height: Constants.statusBarHeight}}>
      <StatusBar translucent {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      backgroundColor: colors.black
    },
    headerTintColor: colors.white
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      backgroundColor: colors.black
    },
    headerTintColor: colors.white
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      backgroundColor: colors.black
    },
    headerTintColor: colors.white
  }
})

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlashcardStatusBar />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

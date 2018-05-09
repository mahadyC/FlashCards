import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { getDeck } from '../utils/helpers';
import * as colors from '../utils/colors';

export default class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title
    }
  }

  updateDeck = () => {
    const { deck, updateParent } = this.props.navigation.state.params
    const { setParams } = this.props.navigation
    updateParent()
    return getDeck(deck.title)
      .then(deck => setParams({ deck }))
  }

  render() {
  	const { deck } = this.props.navigation.state.params
    const { navigate } = this.props.navigation

    return(
    	<View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{`${deck.questions.length} cards`}</Text>
        <View style={[styles.buttonContainer, styles.topButtonContainer]}>
          <TouchableOpacity
            style={[styles.button, styles.addCardButton]}
            onPress={() => navigate('AddCard', {
              deck,
              updateParent: this.updateDeck
            })}
          >
            <Text style={styles.darkButtonText}>
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.quizButton]}
            onPress={() => {
              if (deck.questions.length > 0) {
                navigate('Quiz', { deck })
              }
            }}>
            <Text style={styles.lightButtonText}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.black
  },
  topButtonContainer: {
    marginTop: 80
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  button: {
    flex: 0.7,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCardButton: {
    borderWidth: 2,
    borderColor: colors.black,
  },
  quizButton: {
    backgroundColor: colors.black,
  },
  lightButtonText: {
    color: colors.white,
    fontSize: 24
  },
  darkButtonText: {
    color: colors.white,
    fontSize: 24
  }
})
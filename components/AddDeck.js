import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { getDeck, saveDeckTitle } from '../utils/helpers';
import * as colors from '../utils/colors';

export default class AddDeck extends Component {
	constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  addDeck = () => {
    const { updateParent, navigate } = this.props.screenProps
    const { title } = this.state

    if (!title) {
      return
    }

    getDeck(title)
      .then(deck => {
        if (deck) {
          navigate('DeckDetail', {
            deck,
            updateParent
          })
        } else {
          saveDeckTitle(title)
            .then(() => {
              return getDeck(title)
            })
            .then(deck => {
              navigate('DeckDetail', {
                deck,
                updateParent
              })

              this.setState({
                title: ''
              })
            })
        }
    })
  }

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.header}>
          What is the title of your new deck?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({
              title: text
            })}
            value={this.state.title}
            placeholder={'Deck Title'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.addDeck}>
            <Text style={styles.buttonText}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    marginTop: 80,
    alignItems: 'center'
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flex: 0.5,
    height: 80,
    backgroundColor: colors.black,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})

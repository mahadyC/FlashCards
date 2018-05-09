import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { addCardToDeck } from '../utils/helpers';
import * as colors from '../utils/colors';

export default class AddCard extends Component {
	constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  addCard = () => {
    const { goBack } = this.props.navigation
    const { deck, updateParent } = this.props.navigation.state.params
    const { question, answer } = this.state

    if (!question || !answer) {
      return
    }

    addCardToDeck(deck.title, { question, answer })
      .then(() => {
        return updateParent()
      })
      .then(() => {
        goBack()
        this.setState({
          question: '',
          answer: ''
        })
      })
  }

  render() {
  	return(
  		<KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({
              question: text
            })}
            value={this.state.question}
            placeholder={'Question'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({
              answer: text
            })}
            value={this.state.answer}
            placeholder={'Answer'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.addCard}>
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

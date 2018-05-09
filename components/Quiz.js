import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  setLocalNotification,
  clearLocalNotification
} from '../utils/helpers';
import * as colors from '../utils/colors';


export default class Quiz extends Component {
	initialState = {
    showAnswer: false,
    showResults: false,
    questionIndex: 0,
    numberCorrect: 0
  }

  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.initialState)
  }

  restartQuiz = () => {
    this.setState(this.initialState)
  }

  returnToDeck = () => {
    const { goBack } = this.props.navigation

    goBack()
  }

  flipCard = () => {
    const { showAnswer } = this.state

    this.setState({
      showAnswer: !showAnswer
    })
  }

  onAnswer = (correct) => {
    const { deck } = this.props.navigation.state.params
    const { numberCorrect, questionIndex } = this.state

    const totalQuestions = deck.questions.length
    const finalQuestionIndex = totalQuestions - 1

    const newNumberCorrect = correct ? numberCorrect + 1 : numberCorrect
    const newQuestionIndex = Math.min(finalQuestionIndex, questionIndex + 1)
    const showResults = questionIndex === finalQuestionIndex

    if (showResults) {
      clearLocalNotification()
        .then(setLocalNotification)
    }

    this.setState({
      numberCorrect: newNumberCorrect,
      questionIndex: newQuestionIndex,
      showAnswer: false,
      showResults
    })
  }

  render() {
  	const { deck } = this.props.navigation.state.params
    const {
      showAnswer,
      showResults,
      questionIndex,
      numberCorrect
    } = this.state

    const totalQuestions = deck.questions.length
    const currentQuestion = deck.questions[questionIndex]

    return(
    	<View style={styles.bigKahunaContainer}>
        { showResults ?
            <QuizResults
              numberCorrect={numberCorrect}
              totalQuestions={totalQuestions}
              restartQuiz={this.restartQuiz}
              returnToDeck={this.returnToDeck}
            />
          :
            <QuizStep
              card={currentQuestion}
              showAnswer={showAnswer}
              onAnswer={this.onAnswer}
              flipCard={this.flipCard}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
            />
        }
      </View>
    )
  }
}

const QuizStep = ({
  card,
  showAnswer,
  onAnswer,
  flipCard,
  questionIndex,
  totalQuestions
}) => (
  <View style={styles.container}>
    <View style={styles.questionCounter}>
      <Text style={styles.questionCounterText}>
        Question {questionIndex + 1} / {totalQuestions}
      </Text>
    </View>
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>
        { showAnswer ? card.answer : card.question }
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.flipCardButton}
          onPress={flipCard}
        >
          <Text style={styles.flipCardText}>
            { showAnswer ? 'Question' : 'Answer' }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, styles.topButtonContainer]}>
        <TouchableOpacity
          style={[styles.button, styles.correctButton]}
          onPress={() => onAnswer(true)}
        >
          <Text style={styles.lightButtonText}>Correct</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.incorrectButton]}
          onPress={() => onAnswer(false)}
        >
          <Text style={styles.lightButtonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

const QuizResults = ({
  numberCorrect,
  totalQuestions,
  restartQuiz,
  returnToDeck
}) => (
  <View style={styles.mainContainer}>
    <Text style={styles.mainText}>
      {numberCorrect} / {totalQuestions} correct!
    </Text>
    <View style={[styles.buttonContainer, styles.topButtonContainer]}>
      <TouchableOpacity
        style={[styles.button, styles.restartButton]}
        onPress={restartQuiz}
      >
        <Text style={styles.darkButtonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, styles.returnButton]}
        onPress={returnToDeck}
      >
        <Text style={styles.lightButtonText}>Return to Deck</Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  bigKahunaContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  questionCounter: {
    margin: 8,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  questionCounterText: {
    fontSize: 24
  },
  mainContainer: {
    flex: 1,
    margin: 24,
    marginTop: 80,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    textAlign: 'center',
  },
  flipCardText: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.red
  },
  flipCardButton: {
    flex: 1,
    height: 32
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
  correctButton: {
    backgroundColor: colors.green
  },
  incorrectButton: {
    backgroundColor: colors.red
  },
  restartButton: {
    borderWidth: 2,
    borderColor: colors.black,
  },
  returnButton: {
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
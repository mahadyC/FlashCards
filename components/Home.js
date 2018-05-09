import React from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Decks } from './Decks';
import { AddDeck } from './AddDeck';
import { getDecks } from '../utils/helpers';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
})

export default class Home extends Component {
	constructor(props) {
    super(props)
    this.state = {
      decks: []
    }
  }

  componentDidMount() {
    this.updateDecks()
  }

  updateDecks = () => {
    return getDecks()
      .then(decks => {
        this.setState({
          decks: Object.values(decks)
        })
      })
  }

  render() {
  	return(
  		<Tabs screenProps={screenProps} />
  	)
  }
}
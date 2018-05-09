import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS_STORAGE_KEY = 'FlashCards:decks'
const NOTIFICATION_KEY =  'Flashcards:notifications'


export function getDecks () {

	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((decks) => JSON.parse(decks) : {})

}

export function getDeck (deckId) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((decks) => JSON.parse(decks))
	.then((decks) => decks[deckId])
}

export function saveDeckTitle (deckTitle) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[deckTitle]: {
			title: deckTitle,
			questions: []
		}
	}))
}

export function addCardToDeck (deckTitle, cardToAdd) {
	return getDeck(deckTitle)
	.then((deck) => AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[deckTitle]: {
			title: deckTitle,
			questions: [...deck.questions, cardToAdd]
		}
	})))
}

//Notifications

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
  return {
    title: 'Study up!',
    body: 'You haven\'t taken any quizzes yet today.',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

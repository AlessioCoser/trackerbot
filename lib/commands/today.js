const userRepository = require('../user_repository')
const tracker = require('../tracker')
const messages = require('../messages')
const moment = require('moment')

function TodayCommand() {

  this.handleRequest = (request) => {
    return request.text == 'today'
  }

  this.execute = (request) => {
    const username = request.originalRequest.user_name
    return userRepository.findFromUsername(username).then((user) => {
      if (undefined == user ) {
        return messages.userNotFound(username)
      }
      return tracker(user.token).trackDate(moment(), user.project)
        .then(() => {
          return messages.trackedToday(username)
        })
        .catch(() => {
          return messages.trackerError()
        })
    })
  }

  this.help = () => {
    return ["today - Traccia la giornata di oggi sul progetto di default"]
  }
}

module.exports = new TodayCommand()
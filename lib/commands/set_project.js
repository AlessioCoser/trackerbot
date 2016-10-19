const userRepository = require('../user_repository')
const tracker = require('../tracker')
const messages = require('../messages')
const projects = require('../projects')

const REGEX = /project ([\d|\w]+)/g

function SetProjectCommand() {

  this.handleRequest = (request) => {
    return request.text.match(REGEX)
  }

  this.execute = (request) => {
    const username = request.originalRequest.user_name
    return userRepository.findFromUsername(username).then((user) => {
      if (undefined == user ) {
        return messages.userNotFound(username)
      }
      project = projects(extractProjectName(request))
      user.project = project.name
      userRepository.save(user)
      return messages.currentProject(user.project)
    })
  }

  this.help = () => {
    return ["project <project name> - Imposta il progetto di default su cui tracciare"]
  }

  function extractProjectName(request) {

  }
}

module.exports = new SetProjectCommand()
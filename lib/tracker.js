'use strict'
const TogglApi = require('toggl-api')

module.exports = function(token) {
  return new Tracker(token)
}

function Tracker(token) {
  var toggl = new TogglApi({ apiToken: token })

  this.createTimeEntry = function(entry) {
    return new Promise((resolve, reject) => {
      toggl.createTimeEntry(entry, (err, data) => {
        (err) ? reject(err) : resolve(data)
      })
    })
  }

}


// ./src/events/new-order/index.js
let arc = require('@architect/functions')

exports.handler = arc.events.subscribe(handler)

async function handler (event) {
  console.log(event)
  // maybe send an email or charge a credit card
  return
}

// ./src/scheduled/delivery-report/index.js
let arc = require('@architect/functions')

exports.handler = async function scheduled (event) {
  let tables = await arc.tables()

  // look for data in tables.orders
  console.log(JSON.stringify(event, null, 2))

  return
}

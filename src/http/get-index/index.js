let arc = require('@architect/functions')

function handler(request, response) {
  // redirect to the menu
  response({
    statusCode: 301,
    headers: { location: '/menu' }
  })
}

exports.handler = arc.http(handler)

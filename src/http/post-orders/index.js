let arc = require('@architect/functions')
let html = require('@architect/shared/html')

async function handler(request) {
  let today = new Date()
  let tables = await arc.tables()
  // the form-encoded order is already decoded by @architect/functions
  let newOrder = request.body

  // look up the reference meal from the order's meal attribute
  let meal = await tables.meals.get({ mealID: newOrder.meal })

  // set a random string for the order's id -- not for production!
  newOrder.orderID = Math.random().toString(32).slice(2)
  // convert today's date to a string like yyyy-mm-dd
  newOrder.deliveryDate = today.toISOString().split('T')[0]

  // save the new order!
  let order = await tables.orders.put(newOrder)

  // publish a "new-order" event for background processing
  await arc.events.publish({ name: 'new-order', payload: order })

  let view = html`
<!-- show the customer a receipt -->
<h2>Thank you for your order!</h2>
<p>
  <strong>"${meal.name}"</strong> is on the way.<br>
  Delivery: <code>${order.deliveryDate}</code><br>
  Order id: <code>${order.orderID}</code>
</p>
  `

  return { html: view }
}

exports.handler = arc.http.async(handler)

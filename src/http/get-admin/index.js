let arc = require('@architect/functions')
let html = require('@architect/shared/html')

async function handler(request) {
  let today = new Date()
  let tables = await arc.tables()
  // query orders using the "ordersByDate" index to get today's orders
  let todaysOrders = await tables.orders.query({
    IndexName: 'ordersByDate',
    KeyConditionExpression: 'deliveryDate = :today',
    ExpressionAttributeValues: { ':today': today.toISOString().split('T')[0] }
  })

  let view = html`
<h2>Todays Orders (${todaysOrders.Count})</h2>
<table border=1 cellpadding=5>
  <thead>
    <tr>
      <th>customer</th>
      <th>meal</th>
      <th>id</th>
    </tr>
  </thead>
  <tbody>
    ${todaysOrders.Items.map(o => `
      <tr>
      <td>${o.email}</td>
      <td>${o.meal}</td>
      <td>${o.orderID}</td>
      </tr>
    `.trim()).join('')}
  </tbody>
</table>
  `

  return { html: view }
}

exports.handler = arc.http.async(handler)

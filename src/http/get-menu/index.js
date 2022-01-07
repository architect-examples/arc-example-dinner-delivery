let arc = require('@architect/functions')
let html = require('@architect/shared/html')

async function handler() {
  let tables = await arc.tables()

  // query meals where mealType = dinner
  let meals = await tables.meals.query({
    IndexName: 'mealsByType',
    KeyConditionExpression: 'mealType = :type',
    ExpressionAttributeValues: { ':type': 'dinner' },
  })

  let view = html`
<h2>Create an Order</h2>
<!-- A real form! Send a post to our /orders endpoint -->
<form method=post action="/orders">
  <select name=meal required>
    <option value="" selected disabled hidden>Select a meal</option>
    ${meals.Items.map(m => `<option value=${m.mealID}>${m.name}</option>`).join('')}
  </select><br>
  <input type=text name=email required placeholder="Enter your email" /><br>
  <input type=submit value="Place Order" />
</form>
  `

  return { html: view }
}

exports.handler = arc.http.async(handler)

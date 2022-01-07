@app
dinner-delivery

@http
get  / # server root
get  /menu # see today's dinner offerings
get  /admin # see my order history
post /orders # create an order

@static # static asset server

@tables
meals # items on Dinner Delivery's menu
  mealID *String
orders # customer orders
  orderID *String

@tables-indexes
meals # look up meals by type
  mealType *String
  name mealsByType
orders # look up orders by date
  deliveryDate *String
  name ordersByDate

@events
new-order # do "background" work on new orders

@scheduled
delivery-report cron(0 8 ? * FRI *) # 8 AM each Friday

// seed.js requires Sandbox to be running.
// see prefs.arc
let arc = require('@architect/functions')

const MEALS = [
  { mealType: 'dinner', mealID: 'lasagna', name: 'Eggplant Lasagna' },
  { mealType: 'dinner', mealID: 'fish', name: 'Fish filet' },
  { mealType: 'dinner', mealID: 'soup', name: 'Vegetable soup' },
  { mealType: 'dinner', mealID: 'steak', name: 'Garlic butter sirloin' },
];

(async () => {
  let tables = await arc.tables()
  let saved = []

  for (const meal of MEALS) {
    saved.push(await tables.meals.put(meal))
  }

  console.log(`Seeded ${saved.length} meals`)
})()

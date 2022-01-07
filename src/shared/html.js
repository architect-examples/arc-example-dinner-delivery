module.exports = function html(strings, ...values) {
  let body = '';

  strings.forEach((string, i) => {
    let v = values[i]
    body += `${string.trim()}${v || v === 0 ? v.toString().trim() : ''}`
  });

  return `
<html>
<head>
  <title>Arc Dinner Delivery</title>
  <link href="/_static/styles.css" rel="stylesheet">
</head>
<body>
  <main>
    <h1>Dinner Delivery</h1>
    ${body}
  </main>
</body>
</html>
`.trim();
}

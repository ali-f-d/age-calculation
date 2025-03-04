const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Age Calculation</title>
</head>
<body>
    <form action="/submit" method="post">
        <h1>Please submit your birthday</h1><br>
        <input type="date" name="birthday" id="birthday"><br><br>
        <input type="submit">
    </form>
</body>
</html>
  `);
});

app.post("/submit", (req, res) => {
  const birthday = new Date(req.body.birthday);
  console.log(`Received birthday: ${birthday}`);

  const age_stamp = (new Date()).getTime() - birthday.getTime();
  const age = new Date(age_stamp);
  const year = age.getFullYear() - 1970;
  const month = age.getMonth();
  const day = age.getDate() - 1;

  let result = `<h1>You are ${year} year`;
  if (Math.abs(year) > 1) result += 's';
  result += ` and ${month} month`;
  if (Math.abs(month) > 1) result += 's';
  result += ` and ${day} day`;
  if (Math.abs(day) > 1) result += 's';
  result += ` old.</h1>`;
  
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

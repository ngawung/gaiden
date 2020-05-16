const express = require("express");
const app = express();

app.use(express.static('www'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Express running on Port " + listener.address().port);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
  );
    next();
});

router = express.Router();
app.use(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api/", require("./routes/general"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
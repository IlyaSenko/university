const express = require('express');
const path = require('path');
const pug = require('pug');
const dbfict126 = require('./database/commentsfict126.json');
const fict121 = require('./database/fict121.json');
const faks121 = require('./database/faks121.json');
const faks126 = require('./database/faks126.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var port = 8001;

function render(fname) {
  return pug.renderFile(
    path.resolve(__dirname, `../public/tpl/${fname}.pug`)
  );
};

app.listen(port, function()  {
  console.log(`Server is running on the localhost:${port} `);
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/tpl/index.html'))
});

app.get('/FICT_126', function (req, res) {
  res.send(
    pug.renderFile(
        path.resolve(__dirname, `../public/tpl/fict126.pug`), {dbfict126: dbfict126}
    )
  );
});

app.get('/FICT_121', function (req, res) {
  res.send(
    pug.renderFile(
        path.resolve(__dirname, `../public/tpl/fict121.pug`), {fict121: fict121}
    )
  );
});

app.get('/FACS_121', function (req, res) {
  res.send(
    pug.renderFile(
        path.resolve(__dirname, `../public/tpl/faks121.pug`), {faks121: faks121}
    )
  );
});

app.get('/FACS_126', function (req, res) {
  res.send(
    pug.renderFile(
        path.resolve(__dirname, `../public/tpl/faks126.pug`), {faks126: faks126}
    )
  );
});

app.post('/newcom', function (req, res) {
    const message = req.body.comment;
    const name = req.body.name

    dbfict126.comments.push({"comment" : message, "name" : name});

    fs.writeFile('./database/commentsfict126.json', JSON.stringify(dbfict126));

    res.redirect(301, '/FICT_126');
});

app.post('/newcom1', function (req, res) {
    const message = req.body.comment;
    const name = req.body.name

    fict121.comments.push({"comment" : message, "name" : name});

    fs.writeFile('./database/fict121.json', JSON.stringify(fict121));

    res.redirect(301, '/FICT_121');
});

app.post('/newcom2', function (req, res) {
    const message = req.body.comment;
    const name = req.body.name

    faks121.comments.push({"comment" : message, "name" : name});

    fs.writeFile('./database/faks121.json', JSON.stringify(faks121));

    res.redirect(301, '/FACS_121');
});

app.post('/newcom3', function (req, res) {
    const message = req.body.comment;
    const name = req.body.name

    faks126.comments.push({"comment" : message, "name" : name});

    fs.writeFile('./database/faks126.json', JSON.stringify(faks126));

    res.redirect(301, '/FACS_126');
});


app.use('/css', express.static(path.resolve(__dirname, '../public/css')));
app.use('/img', express.static(path.resolve(__dirname, '../img')));

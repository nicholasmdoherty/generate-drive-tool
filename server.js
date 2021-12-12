// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Import Path
const path = require('path');
const drive = require('./api/google-drive.js');

// Static files
app.use(express.static('build'));

app.get('/tag-search/:tag', (req, res) => {
  drive.files.list({
    "q": `fullText contains '${req.params.tag}'`,
    fields: "files(name, description, webViewLink, iconLink)"
  })
      .then(
        (response) => {
            const files = response.data.files;
            if (files.length) {
              
              res.json({
                'files': files
              });
            }
          },
        (err) => { 
          throw err
        });
})


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
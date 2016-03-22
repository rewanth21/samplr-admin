"use strict";

const express = require('express');
const app = express();
const indexFile = require('./middleware/index-file');

let OPTIONS = {
  BUILD_DIR: 'dist'
};

app.use(express.static(OPTIONS.BUILD_DIR));
app.use(indexFile(OPTIONS.BUILD_DIR));

app.listen(process.env.PORT || 3002);

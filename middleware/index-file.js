"use strict";

const express = require('express');
const mime = express.static.mime;
const fs = require('fs');

module.exports = BUILD_DIR => {
  return (req, res, next) => {
    var path = BUILD_DIR + '/index.html';

    res.set('Cache-Control', 'max-age=0, no-cache');
    res.contentType(mime.lookup(path));

    return fs.createReadStream(path)
      .on('error', next)
      .pipe(res);
  };
};

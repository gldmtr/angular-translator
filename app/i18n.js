'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

function parse(json) {
  return Promise.resolve(json)
    .then(JSON.parse)
    .then(data => _.map(data, (value, key) => ({ key, value })));
}

module.exports = {
  parse,
};


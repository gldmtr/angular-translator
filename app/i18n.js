'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

function parse(json) {
  return Promise.resolve(json)
    .then(JSON.parse)
    .then(data => _.map(data, (value, key) => ({ key, value })));
}

function stringify(data) {
  const json = data.reduce((buffer, { key, value }) => (
    Object.assign(buffer, { [key]: value })
  ), {});

  return JSON.stringify(json, null, 4);
}

module.exports = {
  parse,
  stringify,
};


// 'use strict'

// var assert = require('assert')
// var path = require('path')

// var imageInfo = require('.')

// imageInfo(path.join(__dirname, 'fixtures/target.jpg'), function (err, poo) {
//   assert.deepEqual(poo, {
//     latitude: 39.97080555555556,
//     longtitude: 116.32341111111111,
//     orientation: 295.53849425776264,
//     size: 1967245,
//     taken: Sun Apr 24 2016 12:35:01 GMT+0800 (CST)
//   });
// })


import test from 'ava'
import imageInfo from '..'

test(t => {
  imageInfo(`${__dirname}/fixtures/target.jpg`, (err, poo) => {
    t.deepEqual(poo, {
     latitude: 39.97080555555556,
     longtitude: 116.32341111111111,
     orientation: 295.53849425776264,
     size: 1967245,
     taken: 'Sun Apr 24 2016 12:35:01 GMT+0800 (CST)'
   })
  })
})

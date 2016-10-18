'use strict';

var coord = require('coord')
var ExifImage = require('exif').ExifImage
var sizeOf = require('image-size')
var merge = require('merge')
var async = require('async')

var fs = require('fs')
var path = require('path')

module.exports = function (file, callback) {
  async.parallel([
      getGPSInfo,
      getFileStat,
      getGPSInfo
  ], function (err, result) {
    if (err) {
      return callback(err)
    }

    var soFar = {}

    result.forEach(function (poo) {
      merge(soFar, poo)
    })

    callback(null, soFar)

  })

  function getGPSInfo (callback) {
    var canCheck = /^\.jpe?g$/.test(path.extname(file))
      var formattedExif = {
        latitude: 0,
        longitude: 0,
        orientation: 0
      }
    if (canCheck) {
      new ExifImage({ image: file }, function (err, meta) {
        if (err) {
          return callback(err)
        }
        formattedExif = {
          latitude: coord.fromArray(meta.gps.GPSLatitude),
          longtitude: coord.fromArray(meta.gps.GPSLongitude),
          orientation: meta.gps.GPSImgDirection
        }

        callback(null, formattedExif)
      })
    } else {
      callback(null, formattedExif)
    }
  }

  function getDimensions (callback) {
    sizeOf(file, function (err, dimensions) {
      if (err) {
        callback(err)
      }

      callback(null, dimensions);
    })
  }

  function getFileStat (callback) {
    fs.stat(file, function (err, stat) {
      if (err)
        return callback(err)

          callback(null, {
            size: stat.size,
            taken: new Date(stat.birthtime)
          })
    })
  }

}


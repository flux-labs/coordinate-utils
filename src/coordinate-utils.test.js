/**
 * Tests for coordinate-utils blocks.
 *
 * @author Eric Nguyen <eric@flux.io>
 * @version 0.0.1
 */

'use strict';

import test from 'tape';

import bitmaskToCoordinates from './bitmaskToCoordinates.js';
import coordinateOverlaps from './coordinateOverlaps.js';
import coordinatesToPoints from './coordinatesToPoints.js';

test('bitmaskToCoordinates runs correctly.', function(t) {
  function test(matrixMask, expectedOutputCoords) {
    var blockReturn = bitmaskToCoordinates.run(matrixMask);
    t.deepEqual(blockReturn.coordinates, expectedOutputCoords,
        'For ' + matrixMask +
        ', the bitmaskToCoordinates block returns correct coordinates');
  }
  test([[0]], []);
  test([[1]], [[0,0,0]]);
  test([[0,1]], [[1,0,0]]);
  test(
      [[0,0,0,0,1],
       [0,0,0,0,0],
       [0,0,1,0,0],
       [0,0,0,0,0],
       [0,0,0,0,1]],
      [[4,0,0], [2,2,0], [4,4,0]]);

  t.end();
});

test('coordinateOverlaps runs correctly.', function(t) {
  function test(inputCoords, expectedOutputCoords, expectedOutputOverlaps) {
    var blockReturn = coordinateOverlaps.run(inputCoords);
    t.deepEqual(blockReturn.coordinates, expectedOutputCoords,
        'For ' + inputCoords +
        ', the coordinateOverlaps block returns correct coordinates.');
    t.deepEqual(blockReturn.overlaps, expectedOutputOverlaps,
        'For ' + inputCoords +
        ', the coordinateOverlaps block returns correct overlaps');
  }
  test([[0,0]], [[0,0,1]], [[1]]);
  test(
      [[0,0], [0,0]],
      [[0,0,1], [0,0,2]],
      [[2]]);
  test(
      [[0,0], [0,2]],
      [[0,0,1], [0,2,1]],
      [[1,,1]]);
  test(
      [[0,0], [2,0]],
      [[0,0,1], [2,0,1]],
      [[1],,[1]]);

  t.end();
});

test('coordinatesToPoints runs correctly.', function(t) {
  function test(coordinates, scale, expectedOutputPoints) {
    var blockReturn = coordinatesToPoints.run(coordinates, null, scale);
    var outputPoints = [];
    for (var i = 0; i < expectedOutputPoints.length; i += 1) {
      outputPoints.push(blockReturn.points[i].point);
    }
    t.deepEqual(outputPoints, expectedOutputPoints,
        'For ' + coordinates +
        ', the coordinatesToPoints block returns the correct point locations.');
  }

  var blockReturn = coordinatesToPoints.run([[0,0,0]]);
  t.deepEqual(blockReturn.points,
      [{
        "attributes": {"materialProperties": {"color":"#000000", "wireframe":false}},
        "point": [0,0,0],
        "primitive": "point"
      }],
      'The coordinatesToPoints block returns points with the correct structure.');

  test([[1,1,1]], null, [[1,1,1]]);
  test([[2,1,2]], 3, [[6,3,6]]);
  test([[2,1,2], [50,2,2]], 10, [[20,10,20], [500,20,20]]);

  t.end();
});

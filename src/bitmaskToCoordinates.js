'use strict';

/**
 * Turns a 2-dimensional bitmask (1's and 0's) and turns it into an array of
 * [x,y,z] unit coordinates, a coordinate for every position where the value is
 * 1.
 *
 * @param {Array.<Array.<Number>>} matrixMask
 *     2-dimensional bitmask (1's and 0's).
 *
 * @return {Array.<Array.<Number>>} Array of [x,y,z] unit coordinates.
 */
function run(matrixMask) {
  var coordinates = [];
  for (var row = 0; row < matrixMask.length; row += 1) {
    for (var col = 0; col < matrixMask[row].length; col += 1) {
      if (matrixMask[row][col] === 1) {
        coordinates.push([col, row, 0]);
      }
    }
  }

  return {
    coordinates: coordinates
  };
}

module.exports = {
    run: run
};

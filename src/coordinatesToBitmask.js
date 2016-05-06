'use strict';

/**
 * Takes an array of [x,y,z] unit coordinates and turns it into aa 2-dimensional
 * bitmask (1's and 0's), a value of 1 corresponding to the positin of each
 * input coordinate.
 *
 * @param {Array.<Array.<Number>>} coordinates Array of [x,y,z] unit coordinates.
 * @return {Array.<Array.<Number>>} 2-dimensional bitmask (1's and 0's).
 */
function run(coordinates) {
  // Find the extents of all x and y coordinate values.
  var maxX = 0, maxY = 0;

  for (var i = 0; i < coordinates.length; i++) {
    maxX = Math.max(maxX, coordinates[i][0]);
    maxY = Math.max(maxY, coordinates[i][1]);
  }

  // Create a bounding box of 0's.
  var matrixMask = [];
  for (var row = 0; row < (maxY + 1); row += 1) {
    matrixMask[row] = [];
    for (var col = 0; col < (maxX + 1); col += 1) {
      matrixMask[row][col] = 0;
    }
  }

  // Set the coordinates to 1.
  for (var j = 0; j < coordinates.length; j++) {
    var xCoord = coordinates[j][0];
    var yCoord = coordinates[j][1];
    matrixMask[yCoord][xCoord] = 1;
  }

  return {
    matrixMask: matrixMask
  };
}

module.exports = {
    run: run
};

'use strict';

// A safety factor so that really large bitmasks aren't generated.
var MAX_EXTENTS = 500;

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
  var maxX = 0, maxY = 0, minX = 0, minY = 0;
  for (var i = 0; i < coordinates.length; i++) {
    maxX = Math.max(maxX, coordinates[i][0]);
    maxY = Math.max(maxY, coordinates[i][1]);
    minX = Math.min(minX, coordinates[i][0]);
    minY = Math.min(minY, coordinates[i][1]);
  }

  // Create a bounding box of 0's.
  var matrixMask = [];
  var maxRows = maxY - minY + 1;
  var maxCols = maxX - minX + 1;
  if (maxRows > MAX_EXTENTS || maxCols > MAX_EXTENTS) {
    console.warn('The extents of the coordinates generate an over-sized bitmask. '
        + 'For safety, the output has been truncated. '
        + 'Lower the gridRatio until your shapes fit.');
    maxRows = Math.min(maxRows, MAX_EXTENTS);
    maxCols = Math.min(maxCols, MAX_EXTENTS);
  }
  for (var row = 0; row < maxRows; row += 1) {
    matrixMask[row] = [];
    for (var col = 0; col < maxCols; col += 1) {
      matrixMask[row][col] = 0;
    }
  }

  // Set the coordinates to 1.
  for (var j = 0; j < coordinates.length; j++) {
    var xCoord = coordinates[j][0] - minX;
    var yCoord = coordinates[j][1] - minY;
    if (xCoord < MAX_EXTENTS && yCoord < MAX_EXTENTS) {
      matrixMask[yCoord][xCoord] = 1;
    }
  }

  return {
    matrixMask: matrixMask
  };
}

module.exports = {
    run: run
};

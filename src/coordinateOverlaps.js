'use strict';

/**
 * @typedef Overlaps
 * @type Object
 * @property {Array.<Array>} coordinates An array of triples, representing
 *     coordinates in an x/y/z space. The x/y coordinates reflect the
 *     positions in the input array of coordinates, while a z position has
 *     been added to create a "stack" of coordinates as tall as the number of
 *     overlaps at that x/y position. I.e. if there were four coordinates in
 *     the input at a given x/y position, the output will contain four
 *     coordinates at that x/y position, but they will be stacked in the
 *     z-direction at positions 1, 2, 3, and 4.
 * @property {Array.<Array>} overlaps A possibly-sparse (i.e. containing
 *     undefined values) 2-dimensional array representing the x/y plane. An
 *     integer indicates at each position how many overlaps were found there.
 */

/**
 * Given a list of unit coordinates on the x/y plane, records overlaps. Looks
 * over all input coordinates. Counts the number of coordinates for every
 * position on the plane. Returns the information in two formats (see the
 * Overlaps typedef, above.)
 *
 * @param {Array.<Array>} coordinates A list of integer tuples, representing
 *     coordinates on the x/y plane.
 * @return {Overlaps} The return object, including stacked coordinates and
 *     overlaps (see the Overlaps typedef).
 */
function run(coordinates) {
  var overlaps = [];
  for (var i = 0; i < coordinates.length; i += 1) {
    var coordinate = coordinates[i];
    var x = coordinate[0];
    var y = coordinate[1];
    if (!overlaps[x]) {
      overlaps[x] = [];
    }
    if (!overlaps[x][y]) {
      overlaps[x][y] = 1;
    } else {
      overlaps[x][y] += 1;
    }
    coordinate[2] = overlaps[x][y];
  }

  return {
    coordinates: coordinates,
    overlaps: overlaps
  };
}

module.exports = {
    run: run
};

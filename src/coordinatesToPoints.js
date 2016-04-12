'use strict';

/**
 * Turns an array of [x,y,z] unit coordinates into an array of Flux Point
 * objects.
 *
 * @param {Array.<Array.<Number>>} coordinates
 *     Array of [x,y,z] unit coordinates.
 * @param {String} color A color for the points. Defaults to "#000000".
 * @param {Number} scale A scale to scale the unit coordinates by. E.g. a scale
 *     of 10 will cause the unit coordinate at [1,1,1] to be positioned at
 *     [10,10,10].
 * @return {Object} A return object, with a "points" property containing an array
 *     of Flux Point objects.
 */
function run(coordinates, color, scale) {
  color = color || '#000000';
  scale = scale || 1;
  var points = [];
  for (var i = 0; i < coordinates.length; i += 1) {
    points.push({
      "attributes": {
          "materialProperties": {
            "color": color,
            "wireframe": false
          }
      },
      "point": [
        (coordinates[i][0] || 0) * scale,
        (coordinates[i][1] || 0) * scale,
        (coordinates[i][2] || 0) * scale
      ],
      "primitive": "point"
    });
  }

  return {
    points: points
  };
}

module.exports = {
    run: run
};

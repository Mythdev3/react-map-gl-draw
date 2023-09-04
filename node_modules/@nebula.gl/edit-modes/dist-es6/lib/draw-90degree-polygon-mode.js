"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draw90DegreePolygonMode = void 0;

var _destination = _interopRequireDefault(require("@turf/destination"));

var _bearing = _interopRequireDefault(require("@turf/bearing"));

var _lineIntersect = _interopRequireDefault(require("@turf/line-intersect"));

var _distance = _interopRequireDefault(require("@turf/distance"));

var _helpers = require("@turf/helpers");

var _utils = require("../utils");

var _geojsonEditMode = require("./geojson-edit-mode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Draw90DegreePolygonMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(Draw90DegreePolygonMode, _GeoJsonEditMode);

  var _super = _createSuper(Draw90DegreePolygonMode);

  function Draw90DegreePolygonMode() {
    _classCallCheck(this, Draw90DegreePolygonMode);

    return _super.apply(this, arguments);
  }

  _createClass(Draw90DegreePolygonMode, [{
    key: "getGuides",
    value: function getGuides(props) {
      var guides = {
        type: 'FeatureCollection',
        features: []
      };
      var clickSequence = this.getClickSequence();

      if (clickSequence.length === 0 || !props.lastPointerMoveEvent) {
        return guides;
      }

      var mapCoords = props.lastPointerMoveEvent.mapCoords;
      var p3;

      if (clickSequence.length === 1) {
        p3 = mapCoords;
      } else {
        var p1 = clickSequence[clickSequence.length - 2];
        var p2 = clickSequence[clickSequence.length - 1];

        var _generatePointsParall = (0, _utils.generatePointsParallelToLinePoints)(p1, p2, mapCoords);

        var _generatePointsParall2 = _slicedToArray(_generatePointsParall, 1);

        p3 = _generatePointsParall2[0];
      }

      var tentativeFeature;

      if (clickSequence.length < 3) {
        // Draw a LineString connecting all the clicked points with the hovered point
        tentativeFeature = {
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'LineString',
            coordinates: [].concat(_toConsumableArray(clickSequence), [p3])
          }
        };
      } else {
        // Draw a Polygon connecting all the clicked points with the hovered point
        tentativeFeature = {
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[].concat(_toConsumableArray(clickSequence), [p3, clickSequence[0]])]
          }
        };
      }

      guides.features.push(tentativeFeature);
      guides.features = guides.features.concat((0, _utils.getEditHandlesForGeometry)(tentativeFeature.geometry, -1)); // Slice off the handles that are are next to the pointer

      guides.features = guides.features.slice(0, -1);
      return guides;
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(_ref, props) {
      var mapCoords = _ref.mapCoords;
      props.onUpdateCursor('cell');
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, props) {
      var picks = event.picks;
      var tentativeFeature = this.getTentativeGuide(props);
      this.addClickSequence(event);
      var clickSequence = this.getClickSequence();

      if (!tentativeFeature) {
        // nothing else to do
        return;
      }

      if (clickSequence.length === 3 && tentativeFeature.geometry.type === 'LineString') {
        var lineString = tentativeFeature.geometry; // Tweak the clicked position to be the snapped 90 degree point along the polygon

        clickSequence[clickSequence.length - 1] = lineString.coordinates[lineString.coordinates.length - 1];
      } else if (clickSequence.length > 3 && tentativeFeature.geometry.type === 'Polygon') {
        var polygon = tentativeFeature.geometry; // Tweak the clicked position to be the snapped 90 degree point along the polygon

        clickSequence[clickSequence.length - 1] = polygon.coordinates[0][polygon.coordinates[0].length - 2];
        var clickedEditHandle = (0, _utils.getPickedEditHandle)(picks);

        if (clickedEditHandle && Array.isArray(clickedEditHandle.properties.positionIndexes) && (clickedEditHandle.properties.positionIndexes[1] === 0 || clickedEditHandle.properties.positionIndexes[1] === polygon.coordinates[0].length - 3)) {
          // They clicked the first or last point (or double-clicked), so complete the polygon
          var polygonToAdd = {
            type: 'Polygon',
            coordinates: this.finalizedCoordinates(_toConsumableArray(polygon.coordinates[0]))
          };
          this.resetClickSequence();
          var editAction = this.getAddFeatureOrBooleanPolygonAction(polygonToAdd, props);

          if (editAction) {
            props.onEdit(editAction);
          }
        }
      } // Trigger pointer move right away in order for it to update edit handles (to support double-click)


      var fakePointerMoveEvent = {
        screenCoords: [-1, -1],
        mapCoords: event.mapCoords,
        picks: [],
        pointerDownPicks: null,
        pointerDownScreenCoords: null,
        pointerDownMapCoords: null,
        cancelPan: function cancelPan() {},
        sourceEvent: null
      };
      this.handlePointerMove(fakePointerMoveEvent, props);
    }
  }, {
    key: "finalizedCoordinates",
    value: function finalizedCoordinates(coords) {
      // Remove the hovered position
      var coordinates = [[].concat(_toConsumableArray(coords.slice(0, -2)), [coords[0]])];
      var pt = this.getIntermediatePoint(_toConsumableArray(coords));

      if (!pt) {
        // if intermediate point with 90 degree not available
        // try remove the last clicked point and get the intermediate point.
        var tc = _toConsumableArray(coords);

        tc.splice(-3, 1);
        pt = this.getIntermediatePoint(_toConsumableArray(tc));

        if (pt) {
          coordinates = [[].concat(_toConsumableArray(coords.slice(0, -3)), [pt, coords[0]])];
        }
      } else {
        coordinates = [[].concat(_toConsumableArray(coords.slice(0, -2)), [pt, coords[0]])];
      }

      return coordinates;
    }
  }, {
    key: "getIntermediatePoint",
    value: function getIntermediatePoint(coordinates) {
      var pt;

      if (coordinates.length > 4) {
        var _ref2 = _toConsumableArray(coordinates),
            p1 = _ref2[0],
            p2 = _ref2[1];

        var angle1 = (0, _bearing["default"])(p1, p2);
        var p3 = coordinates[coordinates.length - 3];
        var p4 = coordinates[coordinates.length - 4];
        var angle2 = (0, _bearing["default"])(p3, p4);
        var angles = {
          first: [],
          second: []
        }; // calculate 3 right angle points for first and last points in lineString

        [1, 2, 3].forEach(function (factor) {
          var newAngle1 = angle1 + factor * 90; // convert angles to 0 to -180 for anti-clock and 0 to 180 for clock wise

          angles.first.push(newAngle1 > 180 ? newAngle1 - 360 : newAngle1);
          var newAngle2 = angle2 + factor * 90;
          angles.second.push(newAngle2 > 180 ? newAngle2 - 360 : newAngle2);
        });
        var distance = (0, _distance["default"])((0, _helpers.point)(p1), (0, _helpers.point)(p3)); // Draw imaginary right angle lines for both first and last points in lineString
        // If there is intersection point for any 2 lines, will be the 90 degree point.

        [0, 1, 2].forEach(function (indexFirst) {
          var line1 = (0, _helpers.lineString)([p1, (0, _destination["default"])(p1, distance, angles.first[indexFirst]).geometry.coordinates]);
          [0, 1, 2].forEach(function (indexSecond) {
            var line2 = (0, _helpers.lineString)([p3, (0, _destination["default"])(p3, distance, angles.second[indexSecond]).geometry.coordinates]);
            var fc = (0, _lineIntersect["default"])(line1, line2);

            if (fc && fc.features.length) {
              // found the intersect point
              pt = fc.features[0].geometry.coordinates;
            }
          });
        });
      }

      return pt;
    }
  }]);

  return Draw90DegreePolygonMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.Draw90DegreePolygonMode = Draw90DegreePolygonMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZHJhdy05MGRlZ3JlZS1wb2x5Z29uLW1vZGUudHMiXSwibmFtZXMiOlsiRHJhdzkwRGVncmVlUG9seWdvbk1vZGUiLCJwcm9wcyIsImd1aWRlcyIsInR5cGUiLCJmZWF0dXJlcyIsImNsaWNrU2VxdWVuY2UiLCJnZXRDbGlja1NlcXVlbmNlIiwibGVuZ3RoIiwibGFzdFBvaW50ZXJNb3ZlRXZlbnQiLCJtYXBDb29yZHMiLCJwMyIsInAxIiwicDIiLCJ0ZW50YXRpdmVGZWF0dXJlIiwicHJvcGVydGllcyIsImd1aWRlVHlwZSIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJwdXNoIiwiY29uY2F0Iiwic2xpY2UiLCJvblVwZGF0ZUN1cnNvciIsImV2ZW50IiwicGlja3MiLCJnZXRUZW50YXRpdmVHdWlkZSIsImFkZENsaWNrU2VxdWVuY2UiLCJsaW5lU3RyaW5nIiwicG9seWdvbiIsImNsaWNrZWRFZGl0SGFuZGxlIiwiQXJyYXkiLCJpc0FycmF5IiwicG9zaXRpb25JbmRleGVzIiwicG9seWdvblRvQWRkIiwiZmluYWxpemVkQ29vcmRpbmF0ZXMiLCJyZXNldENsaWNrU2VxdWVuY2UiLCJlZGl0QWN0aW9uIiwiZ2V0QWRkRmVhdHVyZU9yQm9vbGVhblBvbHlnb25BY3Rpb24iLCJvbkVkaXQiLCJmYWtlUG9pbnRlck1vdmVFdmVudCIsInNjcmVlbkNvb3JkcyIsInBvaW50ZXJEb3duUGlja3MiLCJwb2ludGVyRG93blNjcmVlbkNvb3JkcyIsInBvaW50ZXJEb3duTWFwQ29vcmRzIiwiY2FuY2VsUGFuIiwic291cmNlRXZlbnQiLCJoYW5kbGVQb2ludGVyTW92ZSIsImNvb3JkcyIsInB0IiwiZ2V0SW50ZXJtZWRpYXRlUG9pbnQiLCJ0YyIsInNwbGljZSIsImFuZ2xlMSIsInA0IiwiYW5nbGUyIiwiYW5nbGVzIiwiZmlyc3QiLCJzZWNvbmQiLCJmb3JFYWNoIiwiZmFjdG9yIiwibmV3QW5nbGUxIiwibmV3QW5nbGUyIiwiZGlzdGFuY2UiLCJpbmRleEZpcnN0IiwibGluZTEiLCJpbmRleFNlY29uZCIsImxpbmUyIiwiZmMiLCJHZW9Kc29uRWRpdE1vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSx1Qjs7Ozs7Ozs7Ozs7Ozs4QkFDREMsSyxFQUE2RDtBQUNyRSxVQUFNQyxNQUE4QixHQUFHO0FBQ3JDQyxRQUFBQSxJQUFJLEVBQUUsbUJBRCtCO0FBRXJDQyxRQUFBQSxRQUFRLEVBQUU7QUFGMkIsT0FBdkM7QUFLQSxVQUFNQyxhQUFhLEdBQUcsS0FBS0MsZ0JBQUwsRUFBdEI7O0FBRUEsVUFBSUQsYUFBYSxDQUFDRSxNQUFkLEtBQXlCLENBQXpCLElBQThCLENBQUNOLEtBQUssQ0FBQ08sb0JBQXpDLEVBQStEO0FBQzdELGVBQU9OLE1BQVA7QUFDRDs7QUFWb0UsVUFXN0RPLFNBWDZELEdBVy9DUixLQUFLLENBQUNPLG9CQVh5QyxDQVc3REMsU0FYNkQ7QUFhckUsVUFBSUMsRUFBSjs7QUFDQSxVQUFJTCxhQUFhLENBQUNFLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJHLFFBQUFBLEVBQUUsR0FBR0QsU0FBTDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQU1FLEVBQUUsR0FBR04sYUFBYSxDQUFDQSxhQUFhLENBQUNFLE1BQWQsR0FBdUIsQ0FBeEIsQ0FBeEI7QUFDQSxZQUFNSyxFQUFFLEdBQUdQLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDRSxNQUFkLEdBQXVCLENBQXhCLENBQXhCOztBQUZLLG9DQUdFLCtDQUFtQ0ksRUFBbkMsRUFBdUNDLEVBQXZDLEVBQTJDSCxTQUEzQyxDQUhGOztBQUFBOztBQUdKQyxRQUFBQSxFQUhJO0FBSU47O0FBRUQsVUFBSUcsZ0JBQUo7O0FBRUEsVUFBSVIsYUFBYSxDQUFDRSxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzVCO0FBQ0FNLFFB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QUMzQnBELEVBRDJCLEVBRTNCLDZCQUFZQSxFQUFaLEVBQWdCa0QsUUFBaEIsRUFBMEJQLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhTyxVQUFiLENBQTFCLEVBQW9EOUMsUUFBcEQsQ0FBNkRDLFdBRmxDLENBQWYsQ0FBZDtBQUlBLFdBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVV3QyxPQUFWLENBQWtCLFVBQUNPLFdBQUQsRUFBaUI7QUFDakMsZ0JBQU1DLEtBQUssR0FBRyx5QkFBZSxDQUMzQnZELEVBRDJCLEVBRTNCLDZCQUFZQSxFQUFaLEVBQWdCbUQsUUFBaEIsRUFBMEJQLE1BQU0sQ0FBQ0UsTUFBUCxDQUFjUSxXQUFkLENBQTFCLEVBQXNEaEQsUUFBdEQsQ0FBK0RDLFdBRnBDLENBQWYsQ0FBZDtBQUlBLGdCQUFNaUQsRUFBRSxHQUFHLCtCQUFjSCxLQUFkLEVBQXFCRSxLQUFyQixDQUFYOztBQUNBLGdCQUFJQyxFQUFFLElBQUlBLEVBQUUsQ0FBQzlELFFBQUgsQ0FBWUcsTUFBdEIsRUFBOEI7QUFDNUI7QUFDQXdDLGNBQUFBLEVBQUUsR0FBR21CLEVBQUUsQ0FBQzlELFFBQUgsQ0FBWSxDQUFaLEVBQWVZLFFBQWYsQ0FBd0JDLFdBQTdCO0FBQ0Q7QUFDRixXQVZEO0FBV0QsU0FoQkQ7QUFpQkQ7O0FBQ0QsYUFBTzhCLEVBQVA7QUFDRDs7OztFQTdMMENvQixnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXN0aW5hdGlvbiBmcm9tICdAdHVyZi9kZXN0aW5hdGlvbic7XG5pbXBvcnQgYmVhcmluZyBmcm9tICdAdHVyZi9iZWFyaW5nJztcbmltcG9ydCBsaW5lSW50ZXJzZWN0IGZyb20gJ0B0dXJmL2xpbmUtaW50ZXJzZWN0JztcbmltcG9ydCB0dXJmRGlzdGFuY2UgZnJvbSAnQHR1cmYvZGlzdGFuY2UnO1xuaW1wb3J0IHsgcG9pbnQsIGxpbmVTdHJpbmcgYXMgdHVyZkxpbmVTdHJpbmcgfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbmltcG9ydCB7XG4gIGdlbmVyYXRlUG9pbnRzUGFyYWxsZWxUb0xpbmVQb2ludHMsXG4gIGdldFBpY2tlZEVkaXRIYW5kbGUsXG4gIGdldEVkaXRIYW5kbGVzRm9yR2VvbWV0cnksXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IENsaWNrRXZlbnQsIFBvaW50ZXJNb3ZlRXZlbnQsIE1vZGVQcm9wcywgR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBvbHlnb24sIExpbmVTdHJpbmcsIFBvc2l0aW9uLCBGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHsgR2VvSnNvbkVkaXRNb2RlIH0gZnJvbSAnLi9nZW9qc29uLWVkaXQtbW9kZSc7XG5cbmV4cG9ydCBjbGFzcyBEcmF3OTBEZWdyZWVQb2x5Z29uTW9kZSBleHRlbmRzIEdlb0pzb25FZGl0TW9kZSB7XG4gIGdldEd1aWRlcyhwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6IEd1aWRlRmVhdHVyZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGd1aWRlczogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiA9IHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICBmZWF0dXJlczogW10sXG4gICAgfTtcblxuICAgIGNvbnN0IGNsaWNrU2VxdWVuY2UgPSB0aGlzLmdldENsaWNrU2VxdWVuY2UoKTtcblxuICAgIGlmIChjbGlja1NlcXVlbmNlLmxlbmd0aCA9PT0gMCB8fCAhcHJvcHMubGFzdFBvaW50ZXJNb3ZlRXZlbnQpIHtcbiAgICAgIHJldHVybiBndWlkZXM7XG4gICAgfVxuICAgIGNvbnN0IHsgbWFwQ29vcmRzIH0gPSBwcm9wcy5sYXN0UG9pbnRlck1vdmVFdmVudDtcblxuICAgIGxldCBwMztcbiAgICBpZiAoY2xpY2tTZXF1ZW5jZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHAzID0gbWFwQ29vcmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwMSA9IGNsaWNrU2VxdWVuY2VbY2xpY2tTZXF1ZW5jZS5sZW5ndGggLSAyXTtcbiAgICAgIGNvbnN0IHAyID0gY2xpY2tTZXF1ZW5jZVtjbGlja1NlcXVlbmNlLmxlbmd0aCAtIDFdO1xuICAgICAgW3AzXSA9IGdlbmVyYXRlUG9pbnRzUGFyYWxsZWxUb0xpbmVQb2ludHMocDEsIHAyLCBtYXBDb29yZHMpO1xuICAgIH1cblxuICAgIGxldCB0ZW50YXRpdmVGZWF0dXJlO1xuXG4gICAgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoIDwgMykge1xuICAgICAgLy8gRHJhdyBhIExpbmVTdHJpbmcgY29ubmVjdGluZyBhbGwgdGhlIGNsaWNrZWQgcG9pbnRzIHdpdGggdGhlIGhvdmVyZWQgcG9pbnRcbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGd1aWRlVHlwZTogJ3RlbnRhdGl2ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbLi4uY2xpY2tTZXF1ZW5jZSwgcDNdLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRHJhdyBhIFBvbHlnb24gY29ubmVjdGluZyBhbGwgdGhlIGNsaWNrZWQgcG9pbnRzIHdpdGggdGhlIGhvdmVyZWQgcG9pbnRcbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGd1aWRlVHlwZTogJ3RlbnRhdGl2ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbWy4uLmNsaWNrU2VxdWVuY2UsIHAzLCBjbGlja1NlcXVlbmNlWzBdXV0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGd1aWRlcy5mZWF0dXJlcy5wdXNoKHRlbnRhdGl2ZUZlYXR1cmUpO1xuXG4gICAgZ3VpZGVzLmZlYXR1cmVzID0gZ3VpZGVzLmZlYXR1cmVzLmNvbmNhdChcbiAgICAgIGdldEVkaXRIYW5kbGVzRm9yR2VvbWV0cnkodGVudGF0aXZlRmVhdHVyZS5nZW9tZXRyeSwgLTEpXG4gICAgKTtcblxuICAgIC8vIFNsaWNlIG9mZiB0aGUgaGFuZGxlcyB0aGF0IGFyZSBhcmUgbmV4dCB0byB0aGUgcG9pbnRlclxuICAgIGd1aWRlcy5mZWF0dXJlcyA9IGd1aWRlcy5mZWF0dXJlcy5zbGljZSgwLCAtMSk7XG5cbiAgICByZXR1cm4gZ3VpZGVzO1xuICB9XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUoeyBtYXBDb29yZHMgfTogUG9pbnRlck1vdmVFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBwcm9wcy5vblVwZGF0ZUN1cnNvcignY2VsbCcpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgY29uc3QgeyBwaWNrcyB9ID0gZXZlbnQ7XG4gICAgY29uc3QgdGVudGF0aXZlRmVhdHVyZSA9IHRoaXMuZ2V0VGVudGF0aXZlR3VpZGUocHJvcHMpO1xuICAgIHRoaXMuYWRkQ2xpY2tTZXF1ZW5jZShldmVudCk7XG4gICAgY29uc3QgY2xpY2tTZXF1ZW5jZSA9IHRoaXMuZ2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgaWYgKCF0ZW50YXRpdmVGZWF0dXJlKSB7XG4gICAgICAvLyBub3RoaW5nIGVsc2UgdG8gZG9cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2xpY2tTZXF1ZW5jZS5sZW5ndGggPT09IDMgJiYgdGVudGF0aXZlRmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycpIHtcbiAgICAgIGNvbnN0IGxpbmVTdHJpbmc6IExpbmVTdHJpbmcgPSB0ZW50YXRpdmVGZWF0dXJlLmdlb21ldHJ5O1xuXG4gICAgICAvLyBUd2VhayB0aGUgY2xpY2tlZCBwb3NpdGlvbiB0byBiZSB0aGUgc25hcHBlZCA5MCBkZWdyZWUgcG9pbnQgYWxvbmcgdGhlIHBvbHlnb25cbiAgICAgIGNsaWNrU2VxdWVuY2VbY2xpY2tTZXF1ZW5jZS5sZW5ndGggLSAxXSA9XG4gICAgICAgIGxpbmVTdHJpbmcuY29vcmRpbmF0ZXNbbGluZVN0cmluZy5jb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICB9IGVsc2UgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoID4gMyAmJiB0ZW50YXRpdmVGZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJykge1xuICAgICAgY29uc3QgcG9seWdvbjogUG9seWdvbiA9IHRlbnRhdGl2ZUZlYXR1cmUuZ2VvbWV0cnk7XG5cbiAgICAgIC8vIFR3ZWFrIHRoZSBjbGlja2VkIHBvc2l0aW9uIHRvIGJlIHRoZSBzbmFwcGVkIDkwIGRlZ3JlZSBwb2ludCBhbG9uZyB0aGUgcG9seWdvblxuICAgICAgY2xpY2tTZXF1ZW5jZVtjbGlja1NlcXVlbmNlLmxlbmd0aCAtIDFdID1cbiAgICAgICAgcG9seWdvbi5jb29yZGluYXRlc1swXVtwb2x5Z29uLmNvb3JkaW5hdGVzWzBdLmxlbmd0aCAtIDJdO1xuXG4gICAgICBjb25zdCBjbGlja2VkRWRpdEhhbmRsZSA9IGdldFBpY2tlZEVkaXRIYW5kbGUocGlja3MpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNsaWNrZWRFZGl0SGFuZGxlICYmXG4gICAgICAgIEFycmF5LmlzQXJyYXkoY2xpY2tlZEVkaXRIYW5kbGUucHJvcGVydGllcy5wb3NpdGlvbkluZGV4ZXMpICYmXG4gICAgICAgIChjbGlja2VkRWRpdEhhbmRsZS5wcm9wZXJ0aWVzLnBvc2l0aW9uSW5kZXhlc1sxXSA9PT0gMCB8fFxuICAgICAgICAgIGNsaWNrZWRFZGl0SGFuZGxlLnByb3BlcnRpZXMucG9zaXRpb25JbmRleGVzWzFdID09PSBwb2x5Z29uLmNvb3JkaW5hdGVzWzBdLmxlbmd0aCAtIDMpXG4gICAgICApIHtcbiAgICAgICAgLy8gVGhleSBjbGlja2VkIHRoZSBmaXJzdCBvciBsYXN0IHBvaW50IChvciBkb3VibGUtY2xpY2tlZCksIHNvIGNvbXBsZXRlIHRoZSBwb2x5Z29uXG4gICAgICAgIGNvbnN0IHBvbHlnb25Ub0FkZDogUG9seWdvbiA9IHtcbiAgICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuZmluYWxpemVkQ29vcmRpbmF0ZXMoWy4uLnBvbHlnb24uY29vcmRpbmF0ZXNbMF1dKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRBY3Rpb24gPSB0aGlzLmdldEFkZEZlYXR1cmVPckJvb2xlYW5Qb2x5Z29uQWN0aW9uKHBvbHlnb25Ub0FkZCwgcHJvcHMpO1xuICAgICAgICBpZiAoZWRpdEFjdGlvbikge1xuICAgICAgICAgIHByb3BzLm9uRWRpdChlZGl0QWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyaWdnZXIgcG9pbnRlciBtb3ZlIHJpZ2h0IGF3YXkgaW4gb3JkZXIgZm9yIGl0IHRvIHVwZGF0ZSBlZGl0IGhhbmRsZXMgKHRvIHN1cHBvcnQgZG91YmxlLWNsaWNrKVxuICAgIGNvbnN0IGZha2VQb2ludGVyTW92ZUV2ZW50OiBQb2ludGVyTW92ZUV2ZW50ID0ge1xuICAgICAgc2NyZWVuQ29vcmRzOiBbLTEsIC0xXSxcbiAgICAgIG1hcENvb3JkczogZXZlbnQubWFwQ29vcmRzLFxuICAgICAgcGlja3M6IFtdLFxuICAgICAgcG9pbnRlckRvd25QaWNrczogbnVsbCxcbiAgICAgIHBvaW50ZXJEb3duU2NyZWVuQ29vcmRzOiBudWxsLFxuICAgICAgcG9pbnRlckRvd25NYXBDb29yZHM6IG51bGwsXG4gICAgICBjYW5jZWxQYW46ICgpID0+IHt9LFxuICAgICAgc291cmNlRXZlbnQ6IG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlUG9pbnRlck1vdmUoZmFrZVBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzKTtcbiAgfVxuXG4gIGZpbmFsaXplZENvb3JkaW5hdGVzKGNvb3JkczogUG9zaXRpb25bXSkge1xuICAgIC8vIFJlbW92ZSB0aGUgaG92ZXJlZCBwb3NpdGlvblxuICAgIGxldCBjb29yZGluYXRlcyA9IFtbLi4uY29vcmRzLnNsaWNlKDAsIC0yKSwgY29vcmRzWzBdXV07XG4gICAgbGV0IHB0ID0gdGhpcy5nZXRJbnRlcm1lZGlhdGVQb2ludChbLi4uY29vcmRzXSk7XG4gICAgaWYgKCFwdCkge1xuICAgICAgLy8gaWYgaW50ZXJtZWRpYXRlIHBvaW50IHdpdGggOTAgZGVncmVlIG5vdCBhdmFpbGFibGVcbiAgICAgIC8vIHRyeSByZW1vdmUgdGhlIGxhc3QgY2xpY2tlZCBwb2ludCBhbmQgZ2V0IHRoZSBpbnRlcm1lZGlhdGUgcG9pbnQuXG4gICAgICBjb25zdCB0YyA9IFsuLi5jb29yZHNdO1xuICAgICAgdGMuc3BsaWNlKC0zLCAxKTtcbiAgICAgIHB0ID0gdGhpcy5nZXRJbnRlcm1lZGlhdGVQb2ludChbLi4udGNdKTtcbiAgICAgIGlmIChwdCkge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtbLi4uY29vcmRzLnNsaWNlKDAsIC0zKSwgcHQsIGNvb3Jkc1swXV1dO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlcyA9IFtbLi4uY29vcmRzLnNsaWNlKDAsIC0yKSwgcHQsIGNvb3Jkc1swXV1dO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXRJbnRlcm1lZGlhdGVQb2ludChjb29yZGluYXRlczogUG9zaXRpb25bXSkge1xuICAgIGxldCBwdDtcbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoID4gNCkge1xuICAgICAgY29uc3QgW3AxLCBwMl0gPSBbLi4uY29vcmRpbmF0ZXNdO1xuICAgICAgY29uc3QgYW5nbGUxID0gYmVhcmluZyhwMSwgcDIpO1xuICAgICAgY29uc3QgcDMgPSBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAzXTtcbiAgICAgIGNvbnN0IHA0ID0gY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gNF07XG4gICAgICBjb25zdCBhbmdsZTIgPSBiZWFyaW5nKHAzLCBwNCk7XG5cbiAgICAgIGNvbnN0IGFuZ2xlcyA9IHsgZmlyc3Q6IFtdLCBzZWNvbmQ6IFtdIH07XG4gICAgICAvLyBjYWxjdWxhdGUgMyByaWdodCBhbmdsZSBwb2ludHMgZm9yIGZpcnN0IGFuZCBsYXN0IHBvaW50cyBpbiBsaW5lU3RyaW5nXG4gICAgICBbMSwgMiwgM10uZm9yRWFjaCgoZmFjdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0FuZ2xlMSA9IGFuZ2xlMSArIGZhY3RvciAqIDkwO1xuICAgICAgICAvLyBjb252ZXJ0IGFuZ2xlcyB0byAwIHRvIC0xODAgZm9yIGFudGktY2xvY2sgYW5kIDAgdG8gMTgwIGZvciBjbG9jayB3aXNlXG4gICAgICAgIGFuZ2xlcy5maXJzdC5wdXNoKG5ld0FuZ2xlMSA+IDE4MCA/IG5ld0FuZ2xlMSAtIDM2MCA6IG5ld0FuZ2xlMSk7XG4gICAgICAgIGNvbnN0IG5ld0FuZ2xlMiA9IGFuZ2xlMiArIGZhY3RvciAqIDkwO1xuICAgICAgICBhbmdsZXMuc2Vjb25kLnB1c2gobmV3QW5nbGUyID4gMTgwID8gbmV3QW5nbGUyIC0gMzYwIDogbmV3QW5nbGUyKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHR1cmZEaXN0YW5jZShwb2ludChwMSksIHBvaW50KHAzKSk7XG4gICAgICAvLyBEcmF3IGltYWdpbmFyeSByaWdodCBhbmdsZSBsaW5lcyBmb3IgYm90aCBmaXJzdCBhbmQgbGFzdCBwb2ludHMgaW4gbGluZVN0cmluZ1xuICAgICAgLy8gSWYgdGhlcmUgaXMgaW50ZXJzZWN0aW9uIHBvaW50IGZvciBhbnkgMiBsaW5lcywgd2lsbCBiZSB0aGUgOTAgZGVncmVlIHBvaW50LlxuICAgICAgWzAsIDEsIDJdLmZvckVhY2goKGluZGV4Rmlyc3QpID0+IHtcbiAgICAgICAgY29uc3QgbGluZTEgPSB0dXJmTGluZVN0cmluZyhbXG4gICAgICAgICAgcDEsXG4gICAgICAgICAgZGVzdGluYXRpb24ocDEsIGRpc3RhbmNlLCBhbmdsZXMuZmlyc3RbaW5kZXhGaXJzdF0pLmdlb21ldHJ5LmNvb3JkaW5hdGVzLFxuICAgICAgICBdKTtcbiAgICAgICAgWzAsIDEsIDJdLmZvckVhY2goKGluZGV4U2Vjb25kKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGluZTIgPSB0dXJmTGluZVN0cmluZyhbXG4gICAgICAgICAgICBwMyxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uKHAzLCBkaXN0YW5jZSwgYW5nbGVzLnNlY29uZFtpbmRleFNlY29uZF0pLmdlb21ldHJ5LmNvb3JkaW5hdGVzLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGNvbnN0IGZjID0gbGluZUludGVyc2VjdChsaW5lMSwgbGluZTIpO1xuICAgICAgICAgIGlmIChmYyAmJiBmYy5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGZvdW5kIHRoZSBpbnRlcnNlY3QgcG9pbnRcbiAgICAgICAgICAgIHB0ID0gZmMuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHQ7XG4gIH1cbn1cbiJdfQ==
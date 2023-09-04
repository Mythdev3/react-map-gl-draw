"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotateMode = void 0;

var _buffer = _interopRequireDefault(require("@turf/buffer"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _centroid = _interopRequireDefault(require("@turf/centroid"));

var _bearing = _interopRequireDefault(require("@turf/bearing"));

var _bboxPolygon = _interopRequireDefault(require("@turf/bbox-polygon"));

var _distance = _interopRequireDefault(require("@turf/distance"));

var _meta = require("@turf/meta");

var _invariant = require("@turf/invariant");

var _helpers = require("@turf/helpers");

var _transformRotate = _interopRequireDefault(require("@turf/transform-rotate"));

var _utils = require("../utils");

var _geojsonEditMode = require("./geojson-edit-mode");

var _immutableFeatureCollection = require("./immutable-feature-collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RotateMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(RotateMode, _GeoJsonEditMode);

  var _super = _createSuper(RotateMode);

  function RotateMode() {
    var _this;

    _classCallCheck(this, RotateMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_selectedEditHandle", void 0);

    _defineProperty(_assertThisInitialized(_this), "_geometryBeingRotated", void 0);

    _defineProperty(_assertThisInitialized(_this), "_isRotating", false);

    _defineProperty(_assertThisInitialized(_this), "_isSinglePointGeometrySelected", function (geometry) {
      var _ref = geometry || {},
          features = _ref.features;

      if (Array.isArray(features) && features.length === 1) {
        // @ts-ignore
        var _getGeom = (0, _invariant.getGeom)(features[0]),
            type = _getGeom.type;

        return type === 'Point';
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsRotating", function () {
      return _this._isRotating;
    });

    return _this;
  }

  _createClass(RotateMode, [{
    key: "getGuides",
    value: function getGuides(props) {
      var selectedGeometry = this._geometryBeingRotated || this.getSelectedFeaturesAsFeatureCollection(props);

      if (this._isRotating) {
        // Display rotate pivot
        return (0, _helpers.featureCollection)([(0, _centroid["default"])(selectedGeometry)]);
      } // Add buffer to the enveloping box if a single Point feature is selected


      var featureWithBuffer = this._isSinglePointGeometrySelected(selectedGeometry) ? // eslint-disable-next-line
      // @ts-ignore
      (0, _buffer["default"])(selectedGeometry, 1) : selectedGeometry;
      var boundingBox = (0, _bboxPolygon["default"])((0, _bbox["default"])(featureWithBuffer));
      var previousCoord = null;
      var topEdgeMidpointCoords = null;
      var longestEdgeLength = 0;
      (0, _meta.coordEach)(boundingBox, function (coord, coordIndex) {
        if (previousCoord) {
          // @ts-ignore
          var edgeMidpoint = (0, _geojsonEditMode.getIntermediatePosition)(coord, previousCoord);

          if (!topEdgeMidpointCoords || edgeMidpoint[1] > topEdgeMidpointCoords[1]) {
            // Get the top edge midpoint of the enveloping box
            topEdgeMidpointCoords = edgeMidpoint;
          } // Get the length of the longest edge of the enveloping box


          var edgeDistance = (0, _distance["default"])(coord, previousCoord);
          longestEdgeLength = Math.max(longestEdgeLength, edgeDistance);
        }

        previousCoord = coord;
      }); // Scale the length of the line between the rotate handler and the enveloping box
      // relative to the length of the longest edge of the enveloping box

      var rotateHandleCoords = topEdgeMidpointCoords && [topEdgeMidpointCoords[0], topEdgeMidpointCoords[1] + longestEdgeLength / 1000];
      var lineFromEnvelopeToRotateHandle = (0, _helpers.lineString)([topEdgeMidpointCoords, rotateHandleCoords]);
      var rotateHandle = (0, _helpers.point)(rotateHandleCoords, {
        guideType: 'editHandle',
        editHandleType: 'rotate'
      }); // @ts-ignore

      return (0, _helpers.featureCollection)([boundingBox, rotateHandle, lineFromEnvelopeToRotateHandle]);
    }
  }, {
    key: "handleDragging",
    value: function handleDragging(event, props) {
      if (!this._isRotating) {
        return;
      }

      var rotateAction = this.getRotateAction(event.pointerDownMapCoords, event.mapCoords, 'rotating', props);

      if (rotateAction) {
        props.onEdit(rotateAction);
      }

      event.cancelPan();
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      if (!this._isRotating) {
        var selectedEditHandle = (0, _utils.getPickedEditHandle)(event.picks);
        this._selectedEditHandle = selectedEditHandle && selectedEditHandle.properties.editHandleType === 'rotate' ? selectedEditHandle : null;
      }

      this.updateCursor(props);
    }
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {
      if (this._selectedEditHandle) {
        this._isRotating = true;
        this._geometryBeingRotated = this.getSelectedFeaturesAsFeatureCollection(props);
      }
    }
  }, {
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {
      if (this._isRotating) {
        // Rotate the geometry
        var rotateAction = this.getRotateAction(event.pointerDownMapCoords, event.mapCoords, 'rotated', props);

        if (rotateAction) {
          props.onEdit(rotateAction);
        }

        this._geometryBeingRotated = null;
        this._selectedEditHandle = null;
        this._isRotating = false;
      }
    }
  }, {
    key: "updateCursor",
    value: function updateCursor(props) {
      if (this._selectedEditHandle) {
        // TODO: look at doing SVG cursors to get a better "rotate" cursor
        props.onUpdateCursor('crosshair');
      } else {
        props.onUpdateCursor(null);
      }
    }
  }, {
    key: "getRotateAction",
    value: function getRotateAction(startDragPoint, currentPoint, editType, props) {
      if (!this._geometryBeingRotated) {
        return null;
      }

      var centroid = (0, _centroid["default"])(this._geometryBeingRotated);
      var angle = getRotationAngle(centroid, startDragPoint, currentPoint); // @ts-ignore

      var rotatedFeatures = (0, _transformRotate["default"])(this._geometryBeingRotated, angle, {
        pivot: centroid
      });
      var updatedData = new _immutableFeatureCollection.ImmutableFeatureCollection(props.data);
      var selectedIndexes = props.selectedIndexes;

      for (var i = 0; i < selectedIndexes.length; i++) {
        var selectedIndex = selectedIndexes[i];
        var movedFeature = rotatedFeatures.features[i];
        updatedData = updatedData.replaceGeometry(selectedIndex, movedFeature.geometry);
      }

      return {
        updatedData: updatedData.getObject(),
        editType: editType,
        editContext: {
          featureIndexes: selectedIndexes
        }
      };
    }
  }]);

  return RotateMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.RotateMode = RotateMode;

function getRotationAngle(centroid, startDragPoint, currentPoint) {
  var bearing1 = (0, _bearing["default"])(centroid, startDragPoint);
  var bearing2 = (0, _bearing["default"])(centroid, currentPoint);
  return bearing2 - bearing1;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcm90YXRlLW1vZGUudHMiXSwibmFtZXMiOlsiUm90YXRlTW9kZSIsImdlb21ldHJ5IiwiZmVhdHVyZXMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJ0eXBlIiwiX2lzUm90YXRpbmciLCJwcm9wcyIsInNlbGVjdGVkR2VvbWV0cnkiLCJfZ2VvbWV0cnlCZWluZ1JvdGF0ZWQiLCJnZXRTZWxlY3RlZEZlYXR1cmVzQXNGZWF0dXJlQ29sbGVjdGlvbiIsImZlYXR1cmVXaXRoQnVmZmVyIiwiX2lzU2luZ2xlUG9pbnRHZW9tZXRyeVNlbGVjdGVkIiwiYm91bmRpbmdCb3giLCJwcmV2aW91c0Nvb3JkIiwidG9wRWRnZU1pZHBvaW50Q29vcmRzIiwibG9uZ2VzdEVkZ2VMZW5ndGgiLCJjb29yZCIsImNvb3JkSW5kZXgiLCJlZGdlTWlkcG9pbnQiLCJlZGdlRGlzdGFuY2UiLCJNYXRoIiwibWF4Iiwicm90YXRlSGFuZGxlQ29vcmRzIiwibGluZUZyb21FbnZlbG9wZVRvUm90YXRlSGFuZGxlIiwicm90YXRlSGFuZGxlIiwiZ3VpZGVUeXBlIiwiZWRpdEhhbmRsZVR5cGUiLCJldmVudCIsInJvdGF0ZUFjdGlvbiIsImdldFJvdGF0ZUFjdGlvbiIsInBvaW50ZXJEb3duTWFwQ29vcmRzIiwibWFwQ29vcmRzIiwib25FZGl0IiwiY2FuY2VsUGFuIiwic2VsZWN0ZWRFZGl0SGFuZGxlIiwicGlja3MiLCJfc2VsZWN0ZWRFZGl0SGFuZGxlIiwicHJvcGVydGllcyIsInVwZGF0ZUN1cnNvciIsIm9uVXBkYXRlQ3Vyc29yIiwic3RhcnREcmFnUG9pbnQiLCJjdXJyZW50UG9pbnQiLCJlZGl0VHlwZSIsImNlbnRyb2lkIiwiYW5nbGUiLCJnZXRSb3RhdGlvbkFuZ2xlIiwicm90YXRlZEZlYXR1cmVzIiwicGl2b3QiLCJ1cGRhdGVkRGF0YSIsIkltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsImkiLCJzZWxlY3RlZEluZGV4IiwibW92ZWRGZWF0dXJlIiwicmVwbGFjZUdlb21ldHJ5IiwiZ2V0T2JqZWN0IiwiZWRpdENvbnRleHQiLCJmZWF0dXJlSW5kZXhlcyIsIkdlb0pzb25FZGl0TW9kZSIsImJlYXJpbmcxIiwiYmVhcmluZzIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFTQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUFHRyxLOztxRkFFbUIsVUFBQ0MsUUFBRCxFQUE2RDtBQUFBLGlCQUN2RUEsUUFBUSxJQUFJLEVBRDJEO0FBQUEsVUFDcEZDLFFBRG9GLFFBQ3BGQSxRQURvRjs7QUFFNUYsVUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNGLFFBQWQsS0FBMkJBLFFBQVEsQ0FBQ0csTUFBVCxLQUFvQixDQUFuRCxFQUFzRDtBQUNwRDtBQURvRCx1QkFFbkMsd0JBQVFILFFBQVEsQ0FBQyxDQUFELENBQWhCLENBRm1DO0FBQUEsWUFFNUNJLElBRjRDLFlBRTVDQSxJQUY0Qzs7QUFHcEQsZUFBT0EsSUFBSSxLQUFLLE9BQWhCO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFQO0FBQ0QsSzs7b0VBRWU7QUFBQSxhQUFNLE1BQUtDLFdBQVg7QUFBQSxLOzs7Ozs7OzhCQUVOQyxLLEVBQXFDO0FBQzdDLFVBQU1DLGdCQUFnQixHQUNwQixLQUFLQyxxQkFBTCxJQUE4QixLQUFLQyxzQ0FBTCxDQUE0Q0gsS0FBNUMsQ0FEaEM7O0FBR0EsVUFBSSxLQUFLRCxXQUFULEVBQXNCO0FBQ3BCO0FBQ0EsZUFBTyxnQ0FBa0IsQ0FBQywwQkFBYUUsZ0JBQWIsQ0FBRCxDQUFsQixDQUFQO0FBQ0QsT0FQNEMsQ0FTN0M7OztBQUNBLFVBQU1HLGlCQUFpQixHQUFHLEtBQUtDLDhCQUFMLENBQW9DSixnQkFBcEMsSUFDdEI7QUFDQTtBQUNBLDhC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LEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxlQUFlLENBQUNoRCxNQUFwQyxFQUE0Q2lELENBQUMsRUFBN0MsRUFBaUQ7QUFDL0MsWUFBTUMsYUFBYSxHQUFHRixlQUFlLENBQUNDLENBQUQsQ0FBckM7QUFDQSxZQUFNRSxZQUFZLEdBQUdSLGVBQWUsQ0FBQzlDLFFBQWhCLENBQXlCb0QsQ0FBekIsQ0FBckI7QUFDQUosUUFBQUEsV0FBVyxHQUFHQSxXQUFXLENBQUNPLGVBQVosQ0FBNEJGLGFBQTVCLEVBQTJDQyxZQUFZLENBQUN2RCxRQUF4RCxDQUFkO0FBQ0Q7O0FBRUQsYUFBTztBQUNMaUQsUUFBQUEsV0FBVyxFQUFFQSxXQUFXLENBQUNRLFNBQVosRUFEUjtBQUVMZCxRQUFBQSxRQUFRLEVBQVJBLFFBRks7QUFHTGUsUUFBQUEsV0FBVyxFQUFFO0FBQ1hDLFVBQUFBLGNBQWMsRUFBRVA7QUFETDtBQUhSLE9BQVA7QUFPRDs7OztFQXpLNkJRLGdDOzs7O0FBNEtoQyxTQUFTZCxnQkFBVCxDQUEwQkYsUUFBMUIsRUFBOENILGNBQTlDLEVBQXdFQyxZQUF4RSxFQUFnRztBQUM5RixNQUFNbUIsUUFBUSxHQUFHLHlCQUFZakIsUUFBWixFQUFzQkgsY0FBdEIsQ0FBakI7QUFDQSxNQUFNcUIsUUFBUSxHQUFHLHlCQUFZbEIsUUFBWixFQUFzQkYsWUFBdEIsQ0FBakI7QUFDQSxTQUFPb0IsUUFBUSxHQUFHRCxRQUFsQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJldHRpZXIvcHJldHRpZXIgKi9cbmltcG9ydCB0dXJmQnVmZmVyIGZyb20gJ0B0dXJmL2J1ZmZlcic7XG5pbXBvcnQgYmJveCBmcm9tICdAdHVyZi9iYm94JztcbmltcG9ydCB0dXJmQ2VudHJvaWQgZnJvbSAnQHR1cmYvY2VudHJvaWQnO1xuaW1wb3J0IHR1cmZCZWFyaW5nIGZyb20gJ0B0dXJmL2JlYXJpbmcnO1xuaW1wb3J0IGJib3hQb2x5Z29uIGZyb20gJ0B0dXJmL2Jib3gtcG9seWdvbic7XG5pbXBvcnQgdHVyZkRpc3RhbmNlIGZyb20gJ0B0dXJmL2Rpc3RhbmNlJztcbmltcG9ydCB7IGNvb3JkRWFjaCB9IGZyb20gJ0B0dXJmL21ldGEnO1xuaW1wb3J0IHsgZ2V0R2VvbSB9IGZyb20gJ0B0dXJmL2ludmFyaWFudCc7XG5pbXBvcnQgeyBwb2ludCwgZmVhdHVyZUNvbGxlY3Rpb24sIGxpbmVTdHJpbmcgfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbmltcG9ydCB0dXJmVHJhbnNmb3JtUm90YXRlIGZyb20gJ0B0dXJmL3RyYW5zZm9ybS1yb3RhdGUnO1xuaW1wb3J0IHtcbiAgUG9pbnRlck1vdmVFdmVudCxcbiAgU3RhcnREcmFnZ2luZ0V2ZW50LFxuICBTdG9wRHJhZ2dpbmdFdmVudCxcbiAgRHJhZ2dpbmdFdmVudCxcbiAgTW9kZVByb3BzLFxuICBFZGl0SGFuZGxlRmVhdHVyZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0UGlja2VkRWRpdEhhbmRsZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZlYXR1cmVDb2xsZWN0aW9uLCBQb3NpdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHsgR2VvSnNvbkVkaXRNb2RlLCBHZW9Kc29uRWRpdEFjdGlvbiwgZ2V0SW50ZXJtZWRpYXRlUG9zaXRpb24gfSBmcm9tICcuL2dlb2pzb24tZWRpdC1tb2RlJztcbmltcG9ydCB7IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnLi9pbW11dGFibGUtZmVhdHVyZS1jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIFJvdGF0ZU1vZGUgZXh0ZW5kcyBHZW9Kc29uRWRpdE1vZGUge1xuICBfc2VsZWN0ZWRFZGl0SGFuZGxlOiBFZGl0SGFuZGxlRmVhdHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIF9nZW9tZXRyeUJlaW5nUm90YXRlZDogRmVhdHVyZUNvbGxlY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBfaXNSb3RhdGluZyA9IGZhbHNlO1xuXG4gIF9pc1NpbmdsZVBvaW50R2VvbWV0cnlTZWxlY3RlZCA9IChnZW9tZXRyeTogRmVhdHVyZUNvbGxlY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBmZWF0dXJlcyB9ID0gZ2VvbWV0cnkgfHwge307XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZXMpICYmIGZlYXR1cmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgeyB0eXBlIH0gPSBnZXRHZW9tKGZlYXR1cmVzWzBdKTtcbiAgICAgIHJldHVybiB0eXBlID09PSAnUG9pbnQnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZ2V0SXNSb3RhdGluZyA9ICgpID0+IHRoaXMuX2lzUm90YXRpbmc7XG5cbiAgZ2V0R3VpZGVzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRHZW9tZXRyeSA9XG4gICAgICB0aGlzLl9nZW9tZXRyeUJlaW5nUm90YXRlZCB8fCB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZXNBc0ZlYXR1cmVDb2xsZWN0aW9uKHByb3BzKTtcblxuICAgIGlmICh0aGlzLl9pc1JvdGF0aW5nKSB7XG4gICAgICAvLyBEaXNwbGF5IHJvdGF0ZSBwaXZvdFxuICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKFt0dXJmQ2VudHJvaWQoc2VsZWN0ZWRHZW9tZXRyeSldKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYnVmZmVyIHRvIHRoZSBlbnZlbG9waW5nIGJveCBpZiBhIHNpbmdsZSBQb2ludCBmZWF0dXJlIGlzIHNlbGVjdGVkXG4gICAgY29uc3QgZmVhdHVyZVdpdGhCdWZmZXIgPSB0aGlzLl9pc1NpbmdsZVBvaW50R2VvbWV0cnlTZWxlY3RlZChzZWxlY3RlZEdlb21ldHJ5KVxuICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0dXJmQnVmZmVyKHNlbGVjdGVkR2VvbWV0cnksIDEpXG4gICAgICA6IHNlbGVjdGVkR2VvbWV0cnk7XG5cbiAgICBjb25zdCBib3VuZGluZ0JveCA9IGJib3hQb2x5Z29uKGJib3goZmVhdHVyZVdpdGhCdWZmZXIpKTtcblxuICAgIGxldCBwcmV2aW91c0Nvb3JkID0gbnVsbDtcbiAgICBsZXQgdG9wRWRnZU1pZHBvaW50Q29vcmRzID0gbnVsbDtcbiAgICBsZXQgbG9uZ2VzdEVkZ2VMZW5ndGggPSAwO1xuXG4gICAgY29vcmRFYWNoKGJvdW5kaW5nQm94LCAoY29vcmQsIGNvb3JkSW5kZXgpID0+IHtcbiAgICAgIGlmIChwcmV2aW91c0Nvb3JkKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgZWRnZU1pZHBvaW50ID0gZ2V0SW50ZXJtZWRpYXRlUG9zaXRpb24oY29vcmQsIHByZXZpb3VzQ29vcmQpO1xuICAgICAgICBpZiAoIXRvcEVkZ2VNaWRwb2ludENvb3JkcyB8fCBlZGdlTWlkcG9pbnRbMV0gPiB0b3BFZGdlTWlkcG9pbnRDb29yZHNbMV0pIHtcbiAgICAgICAgICAvLyBHZXQgdGhlIHRvcCBlZGdlIG1pZHBvaW50IG9mIHRoZSBlbnZlbG9waW5nIGJveFxuICAgICAgICAgIHRvcEVkZ2VNaWRwb2ludENvb3JkcyA9IGVkZ2VNaWRwb2ludDtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBlZGdlIG9mIHRoZSBlbnZlbG9waW5nIGJveFxuICAgICAgICBjb25zdCBlZGdlRGlzdGFuY2UgPSB0dXJmRGlzdGFuY2UoY29vcmQsIHByZXZpb3VzQ29vcmQpO1xuICAgICAgICBsb25nZXN0RWRnZUxlbmd0aCA9IE1hdGgubWF4KGxvbmdlc3RFZGdlTGVuZ3RoLCBlZGdlRGlzdGFuY2UpO1xuICAgICAgfVxuICAgICAgcHJldmlvdXNDb29yZCA9IGNvb3JkO1xuICAgIH0pO1xuXG4gICAgLy8gU2NhbGUgdGhlIGxlbmd0aCBvZiB0aGUgbGluZSBiZXR3ZWVuIHRoZSByb3RhdGUgaGFuZGxlciBhbmQgdGhlIGVudmVsb3BpbmcgYm94XG4gICAgLy8gcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBlZGdlIG9mIHRoZSBlbnZlbG9waW5nIGJveFxuICAgIGNvbnN0IHJvdGF0ZUhhbmRsZUNvb3JkcyA9IHRvcEVkZ2VNaWRwb2ludENvb3JkcyAmJiBbXG4gICAgICB0b3BFZGdlTWlkcG9pbnRDb29yZHNbMF0sXG4gICAgICB0b3BFZGdlTWlkcG9pbnRDb29yZHNbMV0gKyBsb25nZXN0RWRnZUxlbmd0aCAvIDEwMDAsXG4gICAgXTtcblxuICAgIGNvbnN0IGxpbmVGcm9tRW52ZWxvcGVUb1JvdGF0ZUhhbmRsZSA9IGxpbmVTdHJpbmcoW3RvcEVkZ2VNaWRwb2ludENvb3Jkcywgcm90YXRlSGFuZGxlQ29vcmRzXSk7XG4gICAgY29uc3Qgcm90YXRlSGFuZGxlID0gcG9pbnQocm90YXRlSGFuZGxlQ29vcmRzLCB7XG4gICAgICBndWlkZVR5cGU6ICdlZGl0SGFuZGxlJyxcbiAgICAgIGVkaXRIYW5kbGVUeXBlOiAncm90YXRlJyxcbiAgICB9KTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKFtib3VuZGluZ0JveCwgcm90YXRlSGFuZGxlLCBsaW5lRnJvbUVudmVsb3BlVG9Sb3RhdGVIYW5kbGVdKTtcbiAgfVxuXG4gIGhhbmRsZURyYWdnaW5nKGV2ZW50OiBEcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIGlmICghdGhpcy5faXNSb3RhdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJvdGF0ZUFjdGlvbiA9IHRoaXMuZ2V0Um90YXRlQWN0aW9uKFxuICAgICAgZXZlbnQucG9pbnRlckRvd25NYXBDb29yZHMsXG4gICAgICBldmVudC5tYXBDb29yZHMsXG4gICAgICAncm90YXRpbmcnLFxuICAgICAgcHJvcHNcbiAgICApO1xuICAgIGlmIChyb3RhdGVBY3Rpb24pIHtcbiAgICAgIHByb3BzLm9uRWRpdChyb3RhdGVBY3Rpb24pO1xuICAgIH1cblxuICAgIGV2ZW50LmNhbmNlbFBhbigpO1xuICB9XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgaWYgKCF0aGlzLl9pc1JvdGF0aW5nKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEVkaXRIYW5kbGUgPSBnZXRQaWNrZWRFZGl0SGFuZGxlKGV2ZW50LnBpY2tzKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkRWRpdEhhbmRsZSA9XG4gICAgICAgIHNlbGVjdGVkRWRpdEhhbmRsZSAmJiBzZWxlY3RlZEVkaXRIYW5kbGUucHJvcGVydGllcy5lZGl0SGFuZGxlVHlwZSA9PT0gJ3JvdGF0ZSdcbiAgICAgICAgICA/IHNlbGVjdGVkRWRpdEhhbmRsZVxuICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnNvcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVTdGFydERyYWdnaW5nKGV2ZW50OiBTdGFydERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkRWRpdEhhbmRsZSkge1xuICAgICAgdGhpcy5faXNSb3RhdGluZyA9IHRydWU7XG4gICAgICB0aGlzLl9nZW9tZXRyeUJlaW5nUm90YXRlZCA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlc0FzRmVhdHVyZUNvbGxlY3Rpb24ocHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVN0b3BEcmFnZ2luZyhldmVudDogU3RvcERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgaWYgKHRoaXMuX2lzUm90YXRpbmcpIHtcbiAgICAgIC8vIFJvdGF0ZSB0aGUgZ2VvbWV0cnlcbiAgICAgIGNvbnN0IHJvdGF0ZUFjdGlvbiA9IHRoaXMuZ2V0Um90YXRlQWN0aW9uKFxuICAgICAgICBldmVudC5wb2ludGVyRG93bk1hcENvb3JkcyxcbiAgICAgICAgZXZlbnQubWFwQ29vcmRzLFxuICAgICAgICAncm90YXRlZCcsXG4gICAgICAgIHByb3BzXG4gICAgICApO1xuXG4gICAgICBpZiAocm90YXRlQWN0aW9uKSB7XG4gICAgICAgIHByb3BzLm9uRWRpdChyb3RhdGVBY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9nZW9tZXRyeUJlaW5nUm90YXRlZCA9IG51bGw7XG4gICAgICB0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUgPSBudWxsO1xuICAgICAgdGhpcy5faXNSb3RhdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUN1cnNvcihwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUpIHtcbiAgICAgIC8vIFRPRE86IGxvb2sgYXQgZG9pbmcgU1ZHIGN1cnNvcnMgdG8gZ2V0IGEgYmV0dGVyIFwicm90YXRlXCIgY3Vyc29yXG4gICAgICBwcm9wcy5vblVwZGF0ZUN1cnNvcignY3Jvc3NoYWlyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BzLm9uVXBkYXRlQ3Vyc29yKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGdldFJvdGF0ZUFjdGlvbihcbiAgICBzdGFydERyYWdQb2ludDogUG9zaXRpb24sXG4gICAgY3VycmVudFBvaW50OiBQb3NpdGlvbixcbiAgICBlZGl0VHlwZTogc3RyaW5nLFxuICAgIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+XG4gICk6IEdlb0pzb25FZGl0QWN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLl9nZW9tZXRyeUJlaW5nUm90YXRlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY2VudHJvaWQgPSB0dXJmQ2VudHJvaWQodGhpcy5fZ2VvbWV0cnlCZWluZ1JvdGF0ZWQpO1xuICAgIGNvbnN0IGFuZ2xlID0gZ2V0Um90YXRpb25BbmdsZShjZW50cm9pZCwgc3RhcnREcmFnUG9pbnQsIGN1cnJlbnRQb2ludCk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJvdGF0ZWRGZWF0dXJlcyA9IHR1cmZUcmFuc2Zvcm1Sb3RhdGUodGhpcy5fZ2VvbWV0cnlCZWluZ1JvdGF0ZWQsIGFuZ2xlLCB7XG4gICAgICBwaXZvdDogY2VudHJvaWQsXG4gICAgfSk7XG5cbiAgICBsZXQgdXBkYXRlZERhdGEgPSBuZXcgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24ocHJvcHMuZGF0YSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZEluZGV4ZXMgPSBwcm9wcy5zZWxlY3RlZEluZGV4ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEluZGV4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZEluZGV4ZXNbaV07XG4gICAgICBjb25zdCBtb3ZlZEZlYXR1cmUgPSByb3RhdGVkRmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICB1cGRhdGVkRGF0YSA9IHVwZGF0ZWREYXRhLnJlcGxhY2VHZW9tZXRyeShzZWxlY3RlZEluZGV4LCBtb3ZlZEZlYXR1cmUuZ2VvbWV0cnkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGVkRGF0YTogdXBkYXRlZERhdGEuZ2V0T2JqZWN0KCksXG4gICAgICBlZGl0VHlwZSxcbiAgICAgIGVkaXRDb250ZXh0OiB7XG4gICAgICAgIGZlYXR1cmVJbmRleGVzOiBzZWxlY3RlZEluZGV4ZXMsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Um90YXRpb25BbmdsZShjZW50cm9pZDogUG9zaXRpb24sIHN0YXJ0RHJhZ1BvaW50OiBQb3NpdGlvbiwgY3VycmVudFBvaW50OiBQb3NpdGlvbikge1xuICBjb25zdCBiZWFyaW5nMSA9IHR1cmZCZWFyaW5nKGNlbnRyb2lkLCBzdGFydERyYWdQb2ludCk7XG4gIGNvbnN0IGJlYXJpbmcyID0gdHVyZkJlYXJpbmcoY2VudHJvaWQsIGN1cnJlbnRQb2ludCk7XG4gIHJldHVybiBiZWFyaW5nMiAtIGJlYXJpbmcxO1xufVxuIl19
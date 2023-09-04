"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleMode = void 0;

var _buffer = _interopRequireDefault(require("@turf/buffer"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _centroid = _interopRequireDefault(require("@turf/centroid"));

var _bearing = _interopRequireDefault(require("@turf/bearing"));

var _bboxPolygon = _interopRequireDefault(require("@turf/bbox-polygon"));

var _helpers = require("@turf/helpers");

var _meta = require("@turf/meta");

var _distance = _interopRequireDefault(require("@turf/distance"));

var _transformScale = _interopRequireDefault(require("@turf/transform-scale"));

var _invariant = require("@turf/invariant");

var _utils = require("../utils");

var _geojsonEditMode = require("./geojson-edit-mode");

var _immutableFeatureCollection = require("./immutable-feature-collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var ScaleMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(ScaleMode, _GeoJsonEditMode);

  var _super = _createSuper(ScaleMode);

  function ScaleMode() {
    var _this;

    _classCallCheck(this, ScaleMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_geometryBeingScaled", void 0);

    _defineProperty(_assertThisInitialized(_this), "_selectedEditHandle", void 0);

    _defineProperty(_assertThisInitialized(_this), "_cornerGuidePoints", void 0);

    _defineProperty(_assertThisInitialized(_this), "_cursor", void 0);

    _defineProperty(_assertThisInitialized(_this), "_isScaling", false);

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

    _defineProperty(_assertThisInitialized(_this), "_getOppositeScaleHandle", function (selectedHandle) {
      var selectedHandleIndex = selectedHandle && selectedHandle.properties && Array.isArray(selectedHandle.properties.positionIndexes) && selectedHandle.properties.positionIndexes[0];

      if (typeof selectedHandleIndex !== 'number') {
        return null;
      }

      var guidePointCount = _this._cornerGuidePoints.length;
      var oppositeIndex = (selectedHandleIndex + guidePointCount / 2) % guidePointCount;
      return _this._cornerGuidePoints.find(function (p) {
        if (!Array.isArray(p.properties.positionIndexes)) {
          return false;
        }

        return p.properties.positionIndexes[0] === oppositeIndex;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getUpdatedData", function (props, editedData) {
      var updatedData = new _immutableFeatureCollection.ImmutableFeatureCollection(props.data);
      var selectedIndexes = props.selectedIndexes;

      for (var i = 0; i < selectedIndexes.length; i++) {
        var selectedIndex = selectedIndexes[i];
        var movedFeature = editedData.features[i];
        updatedData = updatedData.replaceGeometry(selectedIndex, movedFeature.geometry);
      }

      return updatedData.getObject();
    });

    _defineProperty(_assertThisInitialized(_this), "isEditHandleSelcted", function () {
      return Boolean(_this._selectedEditHandle);
    });

    _defineProperty(_assertThisInitialized(_this), "getScaleAction", function (startDragPoint, currentPoint, editType, props) {
      if (!_this._selectedEditHandle || _this._isSinglePointGeometrySelected(_this._geometryBeingScaled)) {
        return null;
      }

      var oppositeHandle = _this._getOppositeScaleHandle(_this._selectedEditHandle);

      var origin = (0, _invariant.getCoord)(oppositeHandle); // @ts-ignore

      var scaleFactor = getScaleFactor(origin, startDragPoint, currentPoint); // @ts-ignore

      var scaledFeatures = (0, _transformScale["default"])(_this._geometryBeingScaled, scaleFactor, {
        origin: origin
      });
      return {
        updatedData: _this._getUpdatedData(props, scaledFeatures),
        editType: editType,
        editContext: {
          featureIndexes: props.selectedIndexes
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "updateCursor", function (props) {
      if (_this._selectedEditHandle) {
        if (_this._cursor) {
          props.onUpdateCursor(_this._cursor);
        }

        var cursorGeometry = _this.getSelectedFeaturesAsFeatureCollection(props); // Get resize cursor direction from the hovered scale editHandle (e.g. nesw or nwse)


        var centroid = (0, _centroid["default"])(cursorGeometry);
        var bearing = (0, _bearing["default"])(centroid, _this._selectedEditHandle);
        var positiveBearing = bearing < 0 ? bearing + 180 : bearing;

        if (positiveBearing >= 0 && positiveBearing <= 90 || positiveBearing >= 180 && positiveBearing <= 270) {
          _this._cursor = 'nesw-resize';
          props.onUpdateCursor('nesw-resize');
        } else {
          _this._cursor = 'nwse-resize';
          props.onUpdateCursor('nwse-resize');
        }
      } else {
        props.onUpdateCursor(null);
        _this._cursor = null;
      }
    });

    return _this;
  }

  _createClass(ScaleMode, [{
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      if (!this._isScaling) {
        var selectedEditHandle = (0, _utils.getPickedEditHandle)(event.picks);
        this._selectedEditHandle = selectedEditHandle && selectedEditHandle.properties.editHandleType === 'scale' ? selectedEditHandle : null;
      }

      this.updateCursor(props);
    }
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {
      if (this._selectedEditHandle) {
        this._isScaling = true;
        this._geometryBeingScaled = this.getSelectedFeaturesAsFeatureCollection(props);
      }
    }
  }, {
    key: "handleDragging",
    value: function handleDragging(event, props) {
      if (!this._isScaling) {
        return;
      }

      var scaleAction = this.getScaleAction(event.pointerDownMapCoords, event.mapCoords, 'scaling', props);

      if (scaleAction) {
        props.onEdit(scaleAction);
      }

      event.cancelPan();
    }
  }, {
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {
      if (this._isScaling) {
        // Scale the geometry
        var scaleAction = this.getScaleAction(event.pointerDownMapCoords, event.mapCoords, 'scaled', props);

        if (scaleAction) {
          props.onEdit(scaleAction);
        }

        this._geometryBeingScaled = null;
        this._selectedEditHandle = null;
        this._cursor = null;
        this._isScaling = false;
      }
    }
  }, {
    key: "getGuides",
    value: function getGuides(props) {
      this._cornerGuidePoints = [];
      var selectedGeometry = this.getSelectedFeaturesAsFeatureCollection(props); // Add buffer to the enveloping box if a single Point feature is selected

      var featureWithBuffer = this._isSinglePointGeometrySelected(selectedGeometry) ? // eslint-disable-next-line
      // @ts-ignore
      (0, _buffer["default"])(selectedGeometry, 1) : selectedGeometry;
      var boundingBox = (0, _bboxPolygon["default"])((0, _bbox["default"])(featureWithBuffer));
      boundingBox.properties.mode = 'scale';
      var cornerGuidePoints = [];
      (0, _meta.coordEach)(boundingBox, function (coord, coordIndex) {
        if (coordIndex < 4) {
          // Get corner midpoint guides from the enveloping box
          var cornerPoint = (0, _helpers.point)(coord, {
            guideType: 'editHandle',
            editHandleType: 'scale',
            positionIndexes: [coordIndex]
          });
          cornerGuidePoints.push(cornerPoint);
        }
      });
      this._cornerGuidePoints = cornerGuidePoints; // @ts-ignore

      return (0, _helpers.featureCollection)([boundingBox].concat(_toConsumableArray(this._cornerGuidePoints)));
    }
  }]);

  return ScaleMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.ScaleMode = ScaleMode;

function getScaleFactor(centroid, startDragPoint, currentPoint) {
  var startDistance = (0, _distance["default"])(centroid, startDragPoint);
  var endDistance = (0, _distance["default"])(centroid, currentPoint);
  return endDistance / startDistance;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2NhbGUtbW9kZS50cyJdLCJuYW1lcyI6WyJTY2FsZU1vZGUiLCJnZW9tZXRyeSIsImZlYXR1cmVzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwidHlwZSIsInNlbGVjdGVkSGFuZGxlIiwic2VsZWN0ZWRIYW5kbGVJbmRleCIsInByb3BlcnRpZXMiLCJwb3NpdGlvbkluZGV4ZXMiLCJndWlkZVBvaW50Q291bnQiLCJfY29ybmVyR3VpZGVQb2ludHMiLCJvcHBvc2l0ZUluZGV4IiwiZmluZCIsInAiLCJwcm9wcyIsImVkaXRlZERhdGEiLCJ1cGRhdGVkRGF0YSIsIkltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsImkiLCJzZWxlY3RlZEluZGV4IiwibW92ZWRGZWF0dXJlIiwicmVwbGFjZUdlb21ldHJ5IiwiZ2V0T2JqZWN0IiwiQm9vbGVhbiIsIl9zZWxlY3RlZEVkaXRIYW5kbGUiLCJzdGFydERyYWdQb2ludCIsImN1cnJlbnRQb2ludCIsImVkaXRUeXBlIiwiX2lzU2luZ2xlUG9pbnRHZW9tZXRyeVNlbGVjdGVkIiwiX2dlb21ldHJ5QmVpbmdTY2FsZWQiLCJvcHBvc2l0ZUhhbmRsZSIsIl9nZXRPcHBvc2l0ZVNjYWxlSGFuZGxlIiwib3JpZ2luIiwic2NhbGVGYWN0b3IiLCJnZXRTY2FsZUZhY3RvciIsInNjYWxlZEZlYXR1cmVzIiwiX2dldFVwZGF0ZWREYXRhIiwiZWRpdENvbnRleHQiLCJmZWF0dXJlSW5kZXhlcyIsIl9jdXJzb3IiLCJvblVwZGF0ZUN1cnNvciIsImN1cnNvckdlb21ldHJ5IiwiZ2V0U2VsZWN0ZWRGZWF0dXJlc0FzRmVhdHVyZUNvbGxlY3Rpb24iLCJjZW50cm9pZCIsImJlYXJpbmciLCJwb3NpdGl2ZUJlYXJpbmciLCJldmVudCIsIl9pc1NjYWxpbmciLCJzZWxlY3RlZEVkaXRIYW5kbGUiLCJwaWNrcyIsImVkaXRIYW5kbGVUeXBlIiwidXBkYXRlQ3Vyc29yIiwic2NhbGVBY3Rpb24iLCJnZXRTY2FsZUFjdGlvbiIsInBvaW50ZXJEb3duTWFwQ29vcmRzIiwibWFwQ29vcmRzIiwib25FZGl0IiwiY2FuY2VsUGFuIiwic2VsZWN0ZWRHZW9tZXRyeSIsImZlYXR1cmVXaXRoQnVmZmVyIiwiYm91bmRpbmdCb3giLCJtb2RlIiwiY29ybmVyR3VpZGVQb2ludHMiLCJjb29yZCIsImNvb3JkSW5kZXgiLCJjb3JuZXJQb2ludCIsImd1aWRlVHlwZSIsInB1c2giLCJHZW9Kc29uRWRpdE1vZGUiLCJzdGFydERpc3RhbmNlIiwiZW5kRGlzdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFVQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUVBS0UsSzs7cUZBRW9CLFVBQUNDLFFBQUQsRUFBNkQ7QUFBQSxpQkFDdkVBLFFBQVEsSUFBSSxFQUQyRDtBQUFBLFVBQ3BGQyxRQURvRixRQUNwRkEsUUFEb0Y7O0FBRTVGLFVBQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixRQUFkLEtBQTJCQSxRQUFRLENBQUNHLE1BQVQsS0FBb0IsQ0FBbkQsRUFBc0Q7QUFDcEQ7QUFEb0QsdUJBRW5DLHdCQUFRSCxRQUFRLENBQUMsQ0FBRCxDQUFoQixDQUZtQztBQUFBLFlBRTVDSSxJQUY0QyxZQUU1Q0EsSUFGNEM7O0FBR3BELGVBQU9BLElBQUksS0FBSyxPQUFoQjtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNELEs7OzhFQUV5QixVQUFDQyxjQUFELEVBQXVDO0FBQy9ELFVBQU1DLG1CQUFtQixHQUN2QkQsY0FBYyxJQUNkQSxjQUFjLENBQUNFLFVBRGYsSUFFQU4sS0FBSyxDQUFDQyxPQUFOLENBQWNHLGNBQWMsQ0FBQ0UsVUFBZixDQUEwQkMsZUFBeEMsQ0FGQSxJ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O0FBQ0E7QUFDQSw4QkFBV0EsZ0JBQVgsRUFBNkIsQ0FBN0IsQ0FIc0IsR0FJdEJBLGdCQUpKO0FBTUEsVUFBTUUsV0FBVyxHQUFHLDZCQUFZLHNCQUFLRCxpQkFBTCxDQUFaLENBQXBCO0FBQ0FDLE1BQUFBLFdBQVcsQ0FBQ3ZELFVBQVosQ0FBdUJ3RCxJQUF2QixHQUE4QixPQUE5QjtBQUNBLFVBQU1DLGlCQUFpQixHQUFHLEVBQTFCO0FBRUEsMkJBQVVGLFdBQVYsRUFBdUIsVUFBQ0csS0FBRCxFQUFRQyxVQUFSLEVBQXVCO0FBQzVDLFlBQUlBLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNsQjtBQUNBLGNBQU1DLFdBQVcsR0FBRyxvQkFBTUYsS0FBTixFQUFhO0FBQy9CRyxZQUFBQSxTQUFTLEVBQUUsWUFEb0I7QUFFL0JoQixZQUFBQSxjQUFjLEVBQUUsT0FGZTtBQUcvQjVDLFlBQUFBLGVBQWUsRUFBRSxDQUFDMEQsVUFBRDtBQUhjLFdBQWIsQ0FBcEI7QUFLQUYsVUFBQUEsaUJBQWlCLENBQUNLLElBQWxCLENBQXVCRixXQUF2QjtBQUNEO0FBQ0YsT0FWRDtBQVlBLFdBQUt6RCxrQkFBTCxHQUEwQnNELGlCQUExQixDQTNCNkMsQ0E0QjdDOztBQUNBLGFBQU8saUNBQW1CRixXQUFuQiw0QkFBbUMsS0FBS3BELGtCQUF4QyxHQUFQO0FBQ0Q7Ozs7RUFuTTRCNEQsZ0M7Ozs7QUFzTS9CLFNBQVNsQyxjQUFULENBQXdCUyxRQUF4QixFQUE0Q2xCLGNBQTVDLEVBQXNFQyxZQUF0RSxFQUE4RjtBQUM1RixNQUFNMkMsYUFBYSxHQUFHLDBCQUFhMUIsUUFBYixFQUF1QmxCLGNBQXZCLENBQXRCO0FBQ0EsTUFBTTZDLFdBQVcsR0FBRywwQkFBYTNCLFFBQWIsRUFBdUJqQixZQUF2QixDQUFwQjtBQUNBLFNBQU80QyxXQUFXLEdBQUdELGFBQXJCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmV0dGllci9wcmV0dGllciAqL1xuaW1wb3J0IHR1cmZCdWZmZXIgZnJvbSAnQHR1cmYvYnVmZmVyJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IHR1cmZDZW50cm9pZCBmcm9tICdAdHVyZi9jZW50cm9pZCc7XG5pbXBvcnQgdHVyZkJlYXJpbmcgZnJvbSAnQHR1cmYvYmVhcmluZyc7XG5pbXBvcnQgYmJveFBvbHlnb24gZnJvbSAnQHR1cmYvYmJveC1wb2x5Z29uJztcbmltcG9ydCB7IHBvaW50LCBmZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0IHsgY29vcmRFYWNoIH0gZnJvbSAnQHR1cmYvbWV0YSc7XG5pbXBvcnQgdHVyZkRpc3RhbmNlIGZyb20gJ0B0dXJmL2Rpc3RhbmNlJztcbmltcG9ydCB0dXJmVHJhbnNmb3JtU2NhbGUgZnJvbSAnQHR1cmYvdHJhbnNmb3JtLXNjYWxlJztcbmltcG9ydCB7IGdldENvb3JkLCBnZXRHZW9tIH0gZnJvbSAnQHR1cmYvaW52YXJpYW50JztcbmltcG9ydCB7IEZlYXR1cmVDb2xsZWN0aW9uLCBQb3NpdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHtcbiAgTW9kZVByb3BzLFxuICBQb2ludGVyTW92ZUV2ZW50LFxuICBTdGFydERyYWdnaW5nRXZlbnQsXG4gIFN0b3BEcmFnZ2luZ0V2ZW50LFxuICBEcmFnZ2luZ0V2ZW50LFxuICBFZGl0SGFuZGxlRmVhdHVyZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0UGlja2VkRWRpdEhhbmRsZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEdlb0pzb25FZGl0TW9kZSB9IGZyb20gJy4vZ2VvanNvbi1lZGl0LW1vZGUnO1xuaW1wb3J0IHsgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuL2ltbXV0YWJsZS1mZWF0dXJlLWNvbGxlY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgU2NhbGVNb2RlIGV4dGVuZHMgR2VvSnNvbkVkaXRNb2RlIHtcbiAgX2dlb21ldHJ5QmVpbmdTY2FsZWQ6IEZlYXR1cmVDb2xsZWN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgX3NlbGVjdGVkRWRpdEhhbmRsZTogRWRpdEhhbmRsZUZlYXR1cmUgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBfY29ybmVyR3VpZGVQb2ludHM6IEFycmF5PEVkaXRIYW5kbGVGZWF0dXJlPjtcbiAgX2N1cnNvcjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgX2lzU2NhbGluZyA9IGZhbHNlO1xuXG4gIF9pc1NpbmdsZVBvaW50R2VvbWV0cnlTZWxlY3RlZCA9IChnZW9tZXRyeTogRmVhdHVyZUNvbGxlY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBmZWF0dXJlcyB9ID0gZ2VvbWV0cnkgfHwge307XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZXMpICYmIGZlYXR1cmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgeyB0eXBlIH0gPSBnZXRHZW9tKGZlYXR1cmVzWzBdKTtcbiAgICAgIHJldHVybiB0eXBlID09PSAnUG9pbnQnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX2dldE9wcG9zaXRlU2NhbGVIYW5kbGUgPSAoc2VsZWN0ZWRIYW5kbGU6IEVkaXRIYW5kbGVGZWF0dXJlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRIYW5kbGVJbmRleCA9XG4gICAgICBzZWxlY3RlZEhhbmRsZSAmJlxuICAgICAgc2VsZWN0ZWRIYW5kbGUucHJvcGVydGllcyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShzZWxlY3RlZEhhbmRsZS5wcm9wZXJ0aWVzLnBvc2l0aW9uSW5kZXhlcykgJiZcbiAgICAgIHNlbGVjdGVkSGFuZGxlLnByb3BlcnRpZXMucG9zaXRpb25JbmRleGVzWzBdO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RlZEhhbmRsZUluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGd1aWRlUG9pbnRDb3VudCA9IHRoaXMuX2Nvcm5lckd1aWRlUG9pbnRzLmxlbmd0aDtcbiAgICBjb25zdCBvcHBvc2l0ZUluZGV4ID0gKHNlbGVjdGVkSGFuZGxlSW5kZXggKyBndWlkZVBvaW50Q291bnQgLyAyKSAlIGd1aWRlUG9pbnRDb3VudDtcbiAgICByZXR1cm4gdGhpcy5fY29ybmVyR3VpZGVQb2ludHMuZmluZCgocCkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHAucHJvcGVydGllcy5wb3NpdGlvbkluZGV4ZXMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwLnByb3BlcnRpZXMucG9zaXRpb25JbmRleGVzWzBdID09PSBvcHBvc2l0ZUluZGV4O1xuICAgIH0pO1xuICB9O1xuXG4gIF9nZXRVcGRhdGVkRGF0YSA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPiwgZWRpdGVkRGF0YTogRmVhdHVyZUNvbGxlY3Rpb24pID0+IHtcbiAgICBsZXQgdXBkYXRlZERhdGEgPSBuZXcgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24ocHJvcHMuZGF0YSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJbmRleGVzID0gcHJvcHMuc2VsZWN0ZWRJbmRleGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJbmRleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleGVzW2ldO1xuICAgICAgY29uc3QgbW92ZWRGZWF0dXJlID0gZWRpdGVkRGF0YS5mZWF0dXJlc1tpXTtcbiAgICAgIHVwZGF0ZWREYXRhID0gdXBkYXRlZERhdGEucmVwbGFjZUdlb21ldHJ5KHNlbGVjdGVkSW5kZXgsIG1vdmVkRmVhdHVyZS5nZW9tZXRyeSk7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkRGF0YS5nZXRPYmplY3QoKTtcbiAgfTtcblxuICBpc0VkaXRIYW5kbGVTZWxjdGVkID0gKCk6IGJvb2xlYW4gPT4gQm9vbGVhbih0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUpO1xuXG4gIGdldFNjYWxlQWN0aW9uID0gKFxuICAgIHN0YXJ0RHJhZ1BvaW50OiBQb3NpdGlvbixcbiAgICBjdXJyZW50UG9pbnQ6IFBvc2l0aW9uLFxuICAgIGVkaXRUeXBlOiBzdHJpbmcsXG4gICAgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj5cbiAgKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuX3NlbGVjdGVkRWRpdEhhbmRsZSB8fFxuICAgICAgdGhpcy5faXNTaW5nbGVQb2ludEdlb21ldHJ5U2VsZWN0ZWQodGhpcy5fZ2VvbWV0cnlCZWluZ1NjYWxlZClcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG9wcG9zaXRlSGFuZGxlID0gdGhpcy5fZ2V0T3Bwb3NpdGVTY2FsZUhhbmRsZSh0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUpO1xuICAgIGNvbnN0IG9yaWdpbiA9IGdldENvb3JkKG9wcG9zaXRlSGFuZGxlKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgc2NhbGVGYWN0b3IgPSBnZXRTY2FsZUZhY3RvcihvcmlnaW4sIHN0YXJ0RHJhZ1BvaW50LCBjdXJyZW50UG9pbnQpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBzY2FsZWRGZWF0dXJlcyA9IHR1cmZUcmFuc2Zvcm1TY2FsZSh0aGlzLl9nZW9tZXRyeUJlaW5nU2NhbGVkLCBzY2FsZUZhY3Rvciwge1xuICAgICAgb3JpZ2luLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZWREYXRhOiB0aGlzLl9nZXRVcGRhdGVkRGF0YShwcm9wcywgc2NhbGVkRmVhdHVyZXMpLFxuICAgICAgZWRpdFR5cGUsXG4gICAgICBlZGl0Q29udGV4dDoge1xuICAgICAgICBmZWF0dXJlSW5kZXhlczogcHJvcHMuc2VsZWN0ZWRJbmRleGVzLFxuICAgICAgfSxcbiAgICB9O1xuICB9O1xuXG4gIHVwZGF0ZUN1cnNvciA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUpIHtcbiAgICAgIGlmICh0aGlzLl9jdXJzb3IpIHtcbiAgICAgICAgcHJvcHMub25VcGRhdGVDdXJzb3IodGhpcy5fY3Vyc29yKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnNvckdlb21ldHJ5ID0gdGhpcy5nZXRTZWxlY3RlZEZlYXR1cmVzQXNGZWF0dXJlQ29sbGVjdGlvbihwcm9wcyk7XG5cbiAgICAgIC8vIEdldCByZXNpemUgY3Vyc29yIGRpcmVjdGlvbiBmcm9tIHRoZSBob3ZlcmVkIHNjYWxlIGVkaXRIYW5kbGUgKGUuZy4gbmVzdyBvciBud3NlKVxuICAgICAgY29uc3QgY2VudHJvaWQgPSB0dXJmQ2VudHJvaWQoY3Vyc29yR2VvbWV0cnkpO1xuICAgICAgY29uc3QgYmVhcmluZyA9IHR1cmZCZWFyaW5nKGNlbnRyb2lkLCB0aGlzLl9zZWxlY3RlZEVkaXRIYW5kbGUpO1xuICAgICAgY29uc3QgcG9zaXRpdmVCZWFyaW5nID0gYmVhcmluZyA8IDAgPyBiZWFyaW5nICsgMTgwIDogYmVhcmluZztcbiAgICAgIGlmIChcbiAgICAgICAgKHBvc2l0aXZlQmVhcmluZyA+PSAwICYmIHBvc2l0aXZlQmVhcmluZyA8PSA5MCkgfHxcbiAgICAgICAgKHBvc2l0aXZlQmVhcmluZyA+PSAxODAgJiYgcG9zaXRpdmVCZWFyaW5nIDw9IDI3MClcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9jdXJzb3IgPSAnbmVzdy1yZXNpemUnO1xuICAgICAgICBwcm9wcy5vblVwZGF0ZUN1cnNvcignbmVzdy1yZXNpemUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9ICdud3NlLXJlc2l6ZSc7XG4gICAgICAgIHByb3BzLm9uVXBkYXRlQ3Vyc29yKCdud3NlLXJlc2l6ZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5vblVwZGF0ZUN1cnNvcihudWxsKTtcbiAgICAgIHRoaXMuX2N1cnNvciA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVBvaW50ZXJNb3ZlKGV2ZW50OiBQb2ludGVyTW92ZUV2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIGlmICghdGhpcy5faXNTY2FsaW5nKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEVkaXRIYW5kbGUgPSBnZXRQaWNrZWRFZGl0SGFuZGxlKGV2ZW50LnBpY2tzKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkRWRpdEhhbmRsZSA9XG4gICAgICAgIHNlbGVjdGVkRWRpdEhhbmRsZSAmJiBzZWxlY3RlZEVkaXRIYW5kbGUucHJvcGVydGllcy5lZGl0SGFuZGxlVHlwZSA9PT0gJ3NjYWxlJ1xuICAgICAgICAgID8gc2VsZWN0ZWRFZGl0SGFuZGxlXG4gICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQ3Vyc29yKHByb3BzKTtcbiAgfVxuXG4gIGhhbmRsZVN0YXJ0RHJhZ2dpbmcoZXZlbnQ6IFN0YXJ0RHJhZ2dpbmdFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRFZGl0SGFuZGxlKSB7XG4gICAgICB0aGlzLl9pc1NjYWxpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fZ2VvbWV0cnlCZWluZ1NjYWxlZCA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlc0FzRmVhdHVyZUNvbGxlY3Rpb24ocHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURyYWdnaW5nKGV2ZW50OiBEcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIGlmICghdGhpcy5faXNTY2FsaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NhbGVBY3Rpb24gPSB0aGlzLmdldFNjYWxlQWN0aW9uKFxuICAgICAgZXZlbnQucG9pbnRlckRvd25NYXBDb29yZHMsXG4gICAgICBldmVudC5tYXBDb29yZHMsXG4gICAgICAnc2NhbGluZycsXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgaWYgKHNjYWxlQWN0aW9uKSB7XG4gICAgICBwcm9wcy5vbkVkaXQoc2NhbGVBY3Rpb24pO1xuICAgIH1cblxuICAgIGV2ZW50LmNhbmNlbFBhbigpO1xuICB9XG5cbiAgaGFuZGxlU3RvcERyYWdnaW5nKGV2ZW50OiBTdG9wRHJhZ2dpbmdFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBpZiAodGhpcy5faXNTY2FsaW5nKSB7XG4gICAgICAvLyBTY2FsZSB0aGUgZ2VvbWV0cnlcbiAgICAgIGNvbnN0IHNjYWxlQWN0aW9uID0gdGhpcy5nZXRTY2FsZUFjdGlvbihcbiAgICAgICAgZXZlbnQucG9pbnRlckRvd25NYXBDb29yZHMsXG4gICAgICAgIGV2ZW50Lm1hcENvb3JkcyxcbiAgICAgICAgJ3NjYWxlZCcsXG4gICAgICAgIHByb3BzXG4gICAgICApO1xuICAgICAgaWYgKHNjYWxlQWN0aW9uKSB7XG4gICAgICAgIHByb3BzLm9uRWRpdChzY2FsZUFjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2dlb21ldHJ5QmVpbmdTY2FsZWQgPSBudWxsO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRFZGl0SGFuZGxlID0gbnVsbDtcbiAgICAgIHRoaXMuX2N1cnNvciA9IG51bGw7XG4gICAgICB0aGlzLl9pc1NjYWxpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRHdWlkZXMocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICB0aGlzLl9jb3JuZXJHdWlkZVBvaW50cyA9IFtdO1xuICAgIGNvbnN0IHNlbGVjdGVkR2VvbWV0cnkgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZXNBc0ZlYXR1cmVDb2xsZWN0aW9uKHByb3BzKTtcblxuICAgIC8vIEFkZCBidWZmZXIgdG8gdGhlIGVudmVsb3BpbmcgYm94IGlmIGEgc2luZ2xlIFBvaW50IGZlYXR1cmUgaXMgc2VsZWN0ZWRcbiAgICBjb25zdCBmZWF0dXJlV2l0aEJ1ZmZlciA9IHRoaXMuX2lzU2luZ2xlUG9pbnRHZW9tZXRyeVNlbGVjdGVkKHNlbGVjdGVkR2VvbWV0cnkpXG4gICAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHR1cmZCdWZmZXIoc2VsZWN0ZWRHZW9tZXRyeSwgMSlcbiAgICAgIDogc2VsZWN0ZWRHZW9tZXRyeTtcblxuICAgIGNvbnN0IGJvdW5kaW5nQm94ID0gYmJveFBvbHlnb24oYmJveChmZWF0dXJlV2l0aEJ1ZmZlcikpO1xuICAgIGJvdW5kaW5nQm94LnByb3BlcnRpZXMubW9kZSA9ICdzY2FsZSc7XG4gICAgY29uc3QgY29ybmVyR3VpZGVQb2ludHMgPSBbXTtcblxuICAgIGNvb3JkRWFjaChib3VuZGluZ0JveCwgKGNvb3JkLCBjb29yZEluZGV4KSA9PiB7XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDQpIHtcbiAgICAgICAgLy8gR2V0IGNvcm5lciBtaWRwb2ludCBndWlkZXMgZnJvbSB0aGUgZW52ZWxvcGluZyBib3hcbiAgICAgICAgY29uc3QgY29ybmVyUG9pbnQgPSBwb2ludChjb29yZCwge1xuICAgICAgICAgIGd1aWRlVHlwZTogJ2VkaXRIYW5kbGUnLFxuICAgICAgICAgIGVkaXRIYW5kbGVUeXBlOiAnc2NhbGUnLFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXhlczogW2Nvb3JkSW5kZXhdLFxuICAgICAgICB9KTtcbiAgICAgICAgY29ybmVyR3VpZGVQb2ludHMucHVzaChjb3JuZXJQb2ludCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb3JuZXJHdWlkZVBvaW50cyA9IGNvcm5lckd1aWRlUG9pbnRzO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oW2JvdW5kaW5nQm94LCAuLi50aGlzLl9jb3JuZXJHdWlkZVBvaW50c10pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFNjYWxlRmFjdG9yKGNlbnRyb2lkOiBQb3NpdGlvbiwgc3RhcnREcmFnUG9pbnQ6IFBvc2l0aW9uLCBjdXJyZW50UG9pbnQ6IFBvc2l0aW9uKSB7XG4gIGNvbnN0IHN0YXJ0RGlzdGFuY2UgPSB0dXJmRGlzdGFuY2UoY2VudHJvaWQsIHN0YXJ0RHJhZ1BvaW50KTtcbiAgY29uc3QgZW5kRGlzdGFuY2UgPSB0dXJmRGlzdGFuY2UoY2VudHJvaWQsIGN1cnJlbnRQb2ludCk7XG4gIHJldHVybiBlbmREaXN0YW5jZSAvIHN0YXJ0RGlzdGFuY2U7XG59XG4iXX0=
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _editModes = require("@nebula.gl/edit-modes");

var _constants = require("../constants");

var _baseMode = _interopRequireDefault(require("./base-mode"));

var _utils = require("./utils");

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

var EditingMode = /*#__PURE__*/function (_BaseMode) {
  _inherits(EditingMode, _BaseMode);

  var _super = _createSuper(EditingMode);

  function EditingMode() {
    var _this;

    _classCallCheck(this, EditingMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event, props) {
      var picked = event.picks && event.picks[0];
      var selectedFeatureIndex = props.selectedIndexes && props.selectedIndexes[0]; // @ts-ignore

      if (!picked || !picked.object || picked.featureIndex !== selectedFeatureIndex) {
        return;
      } // @ts-ignore


      var objectType = picked.type,
          featureIndex = picked.featureIndex,
          index = picked.index;

      var feature = _this.getSelectedFeature(props, featureIndex);

      if (feature && (feature.geometry.type === _constants.GEOJSON_TYPE.POLYGON || feature.geometry.type === _constants.GEOJSON_TYPE.LINE_STRING) && objectType === _constants.ELEMENT_TYPE.SEGMENT) {
        var coordinates = (0, _utils.getFeatureCoordinates)(feature);

        if (!coordinates) {
          return;
        } // @ts-ignore


        var insertIndex = (index + 1) % coordinates.length;
        var positionIndexes = feature.geometry.type === _constants.SHAPE.POLYGON ? [0, insertIndex] : [insertIndex];

        var insertMapCoords = _this._getPointOnSegment(feature, picked, event.mapCoords);

        var updatedData = new _editModes.ImmutableFeatureCollection(props.data) // @ts-ignore
        .addPosition(featureIndex, positionIndexes, insertMapCoords).getObject();
        props.onEdit({
          editType: _constants.EDIT_TYPE.ADD_POSITION,
          updatedData: updatedData,
          editContext: [{
            featureIndex: featureIndex,
            editHandleIndex: insertIndex,
            // @ts-ignore
            screenCoords: props.viewport && props.viewport.project(insertMapCoords),
            mapCoords: insertMapCoords
          }]
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragging", function (event, props) {
      var onEdit = props.onEdit; // @ts-ignore

      var selectedFeature = _this.getSelectedFeature(props); // nothing clicked
      // @ts-ignore


      var isDragging = event.isDragging,
          pointerDownPicks = event.pointerDownPicks,
          screenCoords = event.screenCoords;
      var lastPointerMoveEvent = props.lastPointerMoveEvent;
      var clicked = pointerDownPicks && pointerDownPicks[0]; // @ts-ignore

      if (!clicked || !clicked.object || !(0, _utils.isNumeric)(clicked.featureIndex)) {
        return;
      } // @ts-ignore


      var objectType = clicked.type,
          editHandleIndex = clicked.index; // not dragging

      var updatedData = null;
      var editType = isDragging ? _constants.EDIT_TYPE.MOVE_POSITION : _constants.EDIT_TYPE.FINISH_MOVE_POSITION;

      switch (objectType) {
        case _constants.ELEMENT_TYPE.FEATURE:
        case _constants.ELEMENT_TYPE.FILL:
        case _constants.ELEMENT_TYPE.SEGMENT:
          if (!props.featuresDraggable) {
            break;
          } // dragging feature


          var dx = screenCoords[0] - lastPointerMoveEvent.screenCoords[0];
          var dy = screenCoords[1] - lastPointerMoveEvent.screenCoords[1];
          updatedData = _this._updateFeature(props, 'feature', {
            dx: dx,
            dy: dy
          });
          onEdit({
            editType: editType,
            updatedData: updatedData,
            editContext: null
          });
          break;

        case _constants.ELEMENT_TYPE.EDIT_HANDLE:
          // dragging editHandle
          // dragging rectangle or other shapes
          var updateType = selectedFeature.properties.shape === _constants.SHAPE.RECTANGLE ? 'rectangle' : 'editHandle';
          updatedData = _this._updateFeature(props, updateType, {
            editHandleIndex: editHandleIndex,
            mapCoords: event.mapCoords
          });
          onEdit({
            editType: editType,
            updatedData: updatedData,
            editContext: null
          });
          break;

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePointerMove", function (event, props) {
      // no selected feature
      // @ts-ignore
      var selectedFeature = _this.getSelectedFeature(props);

      if (!selectedFeature) {
        return;
      } // @ts-ignore


      if (!event.isDragging) {
        return;
      }

      _this._handleDragging(event, props);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateFeature", function (props, type) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = props.data,
          selectedIndexes = props.selectedIndexes,
          viewport = props.viewport;
      var featureIndex = selectedIndexes && selectedIndexes[0];

      var feature = _this.getSelectedFeature(props, featureIndex);

      var geometry = null;
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      var newCoordinates = _toConsumableArray(coordinates);

      switch (type) {
        case 'editHandle':
          var positionIndexes = feature.geometry.type === _constants.GEOJSON_TYPE.POLYGON ? [0, options.editHandleIndex] : [options.editHandleIndex];
          return new _editModes.ImmutableFeatureCollection(data).replacePosition(featureIndex, positionIndexes, options.mapCoords).getObject();

        case 'feature':
          var dx = options.dx,
              dy = options.dy; // @ts-ignore

          newCoordinates = newCoordinates.map(function (mapCoords) {
            // @ts-ignore
            var pixels = viewport && viewport.project(mapCoords);

            if (pixels) {
              pixels[0] += dx;
              pixels[1] += dy;
              return viewport && viewport.unproject(pixels);
            }

            return null;
          }).filter(Boolean);
          geometry = {
            type: feature.geometry.type,
            coordinates: feature.geometry.type === _constants.GEOJSON_TYPE.POLYGON ? [newCoordinates] : feature.geometry.type === _constants.GEOJSON_TYPE.POINT ? newCoordinates[0] : newCoordinates
          };
          return new _editModes.ImmutableFeatureCollection(data).replaceGeometry(featureIndex, geometry).getObject();

        case 'rectangle':
          // moved editHandleIndex and destination mapCoords
          newCoordinates = (0, _utils.updateRectanglePosition)( // @ts-ignore
          feature, options.editHandleIndex, options.mapCoords);
          geometry = {
            type: _constants.GEOJSON_TYPE.POLYGON,
            coordinates: newCoordinates
          };
          return new _editModes.ImmutableFeatureCollection(data).replaceGeometry(featureIndex, geometry).getObject();

        default:
          return data && new _editModes.ImmutableFeatureCollection(data).getObject();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getCursorEditHandle", function (event, feature) {
      // @ts-ignore
      var isDragging = event.isDragging,
          picks = event.picks; // if not pick segment

      var picked = picks && picks[0]; // @ts-ignore

      if (!picked || !(0, _utils.isNumeric)(picked.featureIndex) || picked.type !== _constants.ELEMENT_TYPE.SEGMENT) {
        return null;
      } // if dragging or feature is neither polygon nor line string


      if (isDragging || feature.geometry.type !== _constants.GEOJSON_TYPE.POLYGON && feature.geometry.type !== _constants.GEOJSON_TYPE.LINE_STRING) {
        return null;
      }

      var insertMapCoords = _this._getPointOnSegment(feature, picked, event.mapCoords);

      if (!insertMapCoords) {
        return null;
      }

      return {
        type: 'Feature',
        properties: {
          guideType: _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE,
          shape: feature.properties.shape,
          positionIndexes: [-1],
          editHandleType: 'intermediate'
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.POINT,
          coordinates: insertMapCoords
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getGuides", function (props) {
      // @ts-ignore
      var selectedFeature = _this.getSelectedFeature(props);

      var selectedFeatureIndex = props.selectedIndexes && props.selectedIndexes[0];

      if (!selectedFeature || selectedFeature.geometry.type === _constants.GEOJSON_TYPE.POINT) {
        return null;
      }

      var event = props.lastPointerMoveEvent; // feature editHandles

      var editHandles = _this.getEditHandlesFromFeature(selectedFeature, selectedFeatureIndex) || []; // cursor editHandle

      var cursorEditHandle = _this._getCursorEditHandle(event, selectedFeature);

      if (cursorEditHandle) {
        // @ts-ignore
        editHandles.push(cursorEditHandle);
      }

      return {
        type: 'FeatureCollection',
        features: editHandles.length ? editHandles : null
      };
    });

    return _this;
  }

  _createClass(EditingMode, [{
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {
      // replace point
      var picked = event.picks && event.picks[0]; // @ts-ignore

      if (!picked || !picked.Object || !(0, _utils.isNumeric)(picked.featureIndex)) {
        return;
      }

      var pickedObject = picked.object;

      switch (pickedObject.type) {
        case _constants.ELEMENT_TYPE.FEATURE:
        case _constants.ELEMENT_TYPE.FILL:
        case _constants.ELEMENT_TYPE.EDIT_HANDLE:
          this._handleDragging(event, props);

          break;

        default:
      }
    }
  }, {
    key: "_getPointOnSegment",
    value: function _getPointOnSegment(feature, picked, pickedMapCoords) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      var srcVertexIndex = picked.index;
      var targetVertexIndex = picked.index + 1;
      return (0, _utils.findClosestPointOnLineSegment)( // @ts-ignore
      coordinates[srcVertexIndex], coordinates[targetVertexIndex], pickedMapCoords);
    }
  }]);

  return EditingMode;
}(_baseMode["default"]);

exports["default"] = EditingMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2VkaXRpbmctbW9kZS50cyJdLCJuYW1lcyI6WyJFZGl0aW5nTW9kZSIsImV2ZW50IiwicHJvcHMiLCJwaWNrZWQiLCJwaWNrcyIsInNlbGVjdGVkRmVhdHVyZUluZGV4Iiwic2VsZWN0ZWRJbmRleGVzIiwib2JqZWN0IiwiZmVhdHVyZUluZGV4Iiwib2JqZWN0VHlwZSIsInR5cGUiLCJpbmRleCIsImZlYXR1cmUiLCJnZXRTZWxlY3RlZEZlYXR1cmUiLCJnZW9tZXRyeSIsIkdFT0pTT05fVFlQRSIsIlBPTFlHT04iLCJMSU5FX1NUUklORyIsIkVMRU1FTlRfVFlQRSIsIlNFR01FTlQiLCJjb29yZGluYXRlcyIsImluc2VydEluZGV4IiwibGVuZ3RoIiwicG9zaXRpb25JbmRleGVzIiwiU0hBUEUiLCJpbnNlcnRNYXBDb29yZHMiLCJfZ2V0UG9pbnRPblNlZ21lbnQiLCJtYXBDb29yZHMiLCJ1cGRhdGVkRGF0YSIsIkltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIiwiZGF0YSIsImFkZFBvc2l0aW9uIiwiZ2V0T2JqZWN0Iiwib25FZGl0IiwiZWRpdFR5cGUiLCJFRElUX1RZUEUiLCJBRERfUE9TSVRJT04iLCJlZGl0Q29udGV4dCIsImVkaXRIYW5kbGVJbmRleCIsInNjcmVlbkNvb3JkcyIsInZpZXdwb3J0IiwicHJvamVjdCIsInNlbGVjdGVkRmVhdHVyZSIsImlzRHJhZ2dpbmciLCJwb2ludGVyRG93blBpY2tzIiwibGFzdFBvaW50ZXJNb3ZlRXZlbnQiLCJjbGlja2VkIiwiTU9WRV9QT1NJVElPTiIsIkZJTklTSF9NT1ZFX1BPU0lUSU9OIiwiRkVBVFVSRSIsIkZJTEwiLCJmZWF0dXJlc0RyYWdnYWJsZSIsImR4IiwiZHkiLCJfdXBkYXRlRmVhdHVyZSIsIkVESVRfSEFORExFIiwidXBkYXRlVHlwZSIsInByb3BlcnRpZXMiLCJzaGFwZSIsIlJFQ1RBTkdMRSIsIl9oYW5kbGVEcmFnZ2luZyIsIm9wdGlvbnMiLCJuZXdDb29yZGluYXRlcyIsInJlcGxhY2VQb3NpdGlvbiIsIm1hcCIsInBpeGVscyIsInVucHJvamVjdCIsImZpbHRlciIsIkJvb2xlYW4iLCJQT0lOVCIsInJlcGxhY2VHZW9tZXRyeSIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJDVVJTT1JfRURJVF9IQU5ETEUiLCJlZGl0SGFuZGxlVHlwZSIsImVkaXRIYW5kbGVzIiwiZ2V0RWRpdEhhbmRsZXNGcm9tRmVhdHVyZSIsImN1cnNvckVkaXRIYW5kbGUiLCJfZ2V0Q3Vyc29yRWRpdEhhbmRsZSIsInB1c2giLCJmZWF0dXJlcyIsIk9iamVjdCIsInBpY2tlZE9iamVjdCIsInBpY2tlZE1hcENvb3JkcyIsInNyY1ZlcnRleEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJCYXNlTW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQVdBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCQSxXOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUNMLFVBQUNDLEtBQUQsRUFBb0JDLEtBQXBCLEVBQTREO0FBQ3hFLFVBQU1DLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxLQUFOLElBQWVILEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosQ0FBOUI7QUFDQSxVQUFNQyxvQkFBb0IsR0FBR0gsS0FBSyxDQUFDSSxlQUFOLElBQXlCSixLQUFLLENBQUNJLGVBQU4sQ0FBc0IsQ0FBdEIsQ0FBdEQsQ0FGd0UsQ0FHeEU7O0FBQ0EsVUFBSSxDQUFDSCxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDSSxNQUFuQixJQUE2QkosTUFBTSxDQUFDSyxZQUFQLEtBQXdCSCxvQkFBekQsRUFBK0U7QUFDN0U7QUFDRCxPQU51RSxDQVF4RTs7O0FBUndFLFVBUzFESSxVQVQwRCxHQVN0Qk4sTUFUc0IsQ0FTaEVPLElBVGdFO0FBQUEsVUFTOUNGLFlBVDhDLEdBU3RCTCxNQVRzQixDQVM5Q0ssWUFUOEM7QUFBQSxVQVNoQ0csS0FUZ0MsR0FTdEJSLE1BVHNCLENBU2hDUSxLQVRnQzs7QUFVeEUsVUFBTUMsT0FBTyxHQUFHLE1BQUtDLGtCQUFMLENBQXdCWCxLQUF4QixFQUErQk0sWUFBL0IsQ0FBaEI7O0FBRUEsVUFDRUksT0FBTyxLQUNOQSxPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCSyx3QkFBYUMsT0FBdkMsSUFDQ0osT0FBTyxDQUFDRSxRQUFSLENBQWlCSixJQUFqQixLQUEwQkssd0JBQWFFLFdBRmxDLENBQVAsSUFHQVIsVUFBVSxLQUFLUyx3QkFBYUMsT0FKOUIsRUFLRTtBQUNBLFlBQU1DLFdBQVcsR0FBRyxrQ0FBc0JSLE9BQXRCLENBQXBCOztBQUNBLFlBQUksQ0FBQ1EsV0FBTCxFQUFrQjtBQUNoQjtBQUNELFNBSkQsQ0FLQTs7O0FBQ0EsWUFBTUMsV0FBVyxHQUFHLENBQUNWLEtBQUssR0FBRyxDQUFULElBQWNTLFdBQVcsQ0FBQ0UsTUFBOUM7QUFDQSxZQUFNQyxlQUFlLEdBQ25CWCxPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCYyxpQkFBTVIsT0FBaEMsR0FBMEMsQ0FBQyxDQUFELEVBQUlLLFdBQUosQ0FBMUMsR0FBNkQsQ0FBQ0EsV0FBRCxDQUQvRDs7QUFFQSxZQUFNSSxlQUFlLEdBQUcsTUFBS0Msa0JBQUwsQ0FBd0JkLE9BQXhCLEVBQWlDVCxNQUFqQyxFQUF5Q0YsS0FBSyxDQUFDMEIsU0FBL0MsQ0FBeEI7O0FBRUEsWUFBTUMsV0FBVyxHQUFHLElBQUlDLHFDQUFKLENBQStCM0IsS0FBSyxDQUFDNEIsSUFBckMsRUFDbEI7QUFEa0IsU0FFakJDLFdBRmlCLENBRUx2QixZQUZLLEVBRVNlLGVBRlQsRUFFMEJFLGVBRjFCLEVBR2pCTyxTQUhpQixFQUFwQjtBQUtBOUIsUUFBQUEsS0FBSyxDQUFDK0IsTUFBTixDQUFhO0FBQ1hDLFVBQUFBLFFBQVEsRUFBRUMscUJBQVVDLFlBRFQ7QUFFWFIsVUFBQUEsV0FBVyxFQUFYQSxXQUZXO0FBR1hTLFVBQUFBLFdBQVcsRUFBRSxDQUNYO0FBQ0U3QixZQUFBQSxZQUFZLEVBQVpBLFlBREY7QUFFRThCLFlBQUFBLGVBQWUsRUFBRWpCLFdBRm5CO0FBR0U7QUFDQWtCLFlBQUFBLFlBQVksRUFBRXJDLEtBQUssQ0FBQ3NDLFFBQU4sSUFBa0J0QyxLQUFLLENBQUNzQyxRQUFOLENBQWVDLE9BQWYsQ0FBdUJoQixlQUF2QixDQUpsQztBQUtFRSxZQUFBQSxTQUFTLEVBQUVGO0FBTGIsV0FEVztBQUhGLFNBQWI7QUFhRDtBQUNGLEs7O3NFQXVCaUIsVUFDaEJ4QixLQURnQixFQUVoQkMsS0FGZ0IsRUFHYjtBQUFBLFVBQ0srQixNQURMLEdBQ2dCL0IsS0FEaEIsQ0FDSytCLE1BREwsRUFFSDs7QUFDQSxVQUFNUyxlQUFlLEdBQUcsTUFBSzdCLGtCQUFMLENBQXdCWCxLQUF4QixDQUF4QixDQUhHLENBSUg7QUFDQTs7O0FBTEcsVUFNS3lDLFVBTkwsR0FNb0QxQyxLQU5wRCxDQU1LMEMsVUFOTDtBQUFBLFVBTWlCQyxnQkFOakIsR0FNb0QzQyxLQU5wRCxDQU1pQjJDLGdCQU5qQjtBQUFBLFVBTW1DTCxZQU5uQyxHQU1vRHRDLEtBTnBELENBTW1Dc0MsWUFObkM7QUFBQSxVQU9LTSxvQkFQTCxHQU84QjNDLEtBUDlCLENBT0syQyxvQkFQTDtBQVNILFVBQU1DLE9BQU8sR0FBR0YsZ0JBQWdCLElBQUlBLGdCQUFnQixDQUFDLENBQUQsQ0FBcEQsQ0FURyxDQVVIOztBQUNBLFVBQUksQ0FBQ0UsT0FBRCxJQUFZLENBQUNBLE9BQU8sQ0FBQ3ZDLE1BQXJCLElBQStCLENBQUMsc0JBQVV1QyxPQUFPLENBQUN0QyxZQUFsQixDQUFwQyxFQUFxRTtBQUNuRTtBQUNELE9BYkUsQ0FlSDs7O0FBZkcsVUFnQldDLFVBaEJYLEdBZ0JrRHFDLE9BaEJsRCxDQWdCS3BDLElBaEJMO0FBQUEsVUFnQjhCNEIsZUFoQjlCLEdBZ0JrRFEsT0FoQmxELENBZ0J1Qm5DLEtBaEJ2QixFQWtCSDs7QUFDQSxVQUFJaUIsV0FBVyxHQUFHLElBQWxCO0FBQ0EsVUFBTU0sUUFBUSxHQUFHUyxVQUFVLEdBQUdSLHFCQUFVWSxhQUFiLEdBQTZCWixxQkFBVWEsb0JBQWxFOztBQUVBLGNBQVF2QyxVQUFSO0FBQ0UsYUFBS1Msd0JBQWErQixPQUFsQjtBQUNBLGFBQUsvQix3QkFBYWdDLElBQWxCO0FBQ0EsYUFBS2hDLHdCQUFhQyxPQUFsQjtBQUNFLGNBQUksQ0FBQ2pCLEtBQUssQ0FBQ2lELGlCQUFYLEVBQThCO0FBQzVCO0FBQ0QsV0FISCxDQUdJOzs7QUFFRixjQUFNQyxFQUFFLEdBQUdiLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JNLG9CQUFvQixDQUFDTixZQUFyQixDQUFrQyxDQUFsQyxDQUE3QjtBQUNBLGNBQU1jLEVBQUUsR0FBR2QsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQk0sb0JBQW9CLENBQUNOLFlBQXJCLENBQWtDLENBQWxDLENBQTdCO0FBQ0FYLFVBQUFBLFdBQVcsR0FBRyxNQUFLMEIsY0FBTCxDQUFvQnBELEtBQXBCLEVBQTJCLFNBQTNCLEVBQXNDO0FBQUVrRCxZQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTUMsWUFBQUEsRUFBRSxFQUFGQTtBQUFOLFdBQXRDLENBQWQ7QUFDQXBCLFVBQUFBLE1BQU0sQ0FBQztBQUNMQyxZQUFBQSxRQUFRLEVBQVJBLFFBREs7QUFFTE4sWUFBQUEsV0FBVyxFQUFYQSxXQUZLO0FBR0xTLFlBQUFBLFdBQVcsRUFBRTtBQUhSLFdBQUQsQ0FBTjtBQUtBOztBQUVGLGFBQUtuQix3QkFBYXFDLFdBQWxCO0FBQ0U7QUFDQTtBQUNBLGNBQU1DLFVBQVUsR0FDZGQsZUFBZSxDQUFDZSxVQUFoQixDQUEyQkMsS0FBM0IsS0FBcUNsQyxpQkFBTW1DLFNBQTNDLEdBQXVELFdBQXZELEdBQXFFLFlBRHZFO0FBRUEvQixVQUFBQSxXQUFXLEdBQUcsTUFBSzBCLGNBQUwsQ0FBb0JwRCxLQUFwQixFQUEyQnNELFVBQTNCLEVBQXVDO0FBQ25EbEIsWUFBQUEsZUFBZSxFQUFmQSxlQURtRDtBQUVuRFgsWUFBQUEsU0FBUyxFQUFFMUIsS0FBSyxDQUFDMEI7QUFGa0MsV0FBdkMsQ0FBZDtBQUlBTSxVQUFBQSxNQUFNLENBQUM7QUFDTEMsWUFBQUEsUUFBUSxFQUFSQSxRQURLO0FBRUxOLFlBQUFBLFdBQVcsRUFBWEEsV0FGSztBQUdMUyxZQUFBQSxXQUFXLEVBQUU7QUFIUixXQUFELENBQU47QUFLQTs7QUFFRjtBQWxDRjtBQW9DRCxLOzt3RUFFbUIsVUFBQ3BDLEtBQUQsRUFBMEJDLEtBQTFCLEVBQWtFO0FBQ3BGO0FBQ0E7QUFDQSxVQUFNd0MsZUFBZSxHQUFHLE1BQUs3QixrQkFBTCxDQUF3QlgsS0FBeEIsQ0FBeEI7O0FBQ0EsVUFBSSxDQUFDd0MsZUFBTCxFQUFzQjtBQUNwQjtBQUNELE9BTm1GLENBT3BGOzs7QUFDQSxVQUFJLENBQUN6QyxLQUFLLENBQUMwQyxVQUFYLEVBQXVCO0FBQ3JCO0FBQ0Q7O0FBRUQsWUFBS2lCLGVBQUwsQ0FBcUIzRCxLQUFyQixFQUE0QkMsS0FBNUI7QUFDRCxLOztxRUFHZ0IsVUFBQ0EsS0FBRCxFQUFzQ1EsSUFBdEMsRUFBMEU7QUFBQSxVQUF0Qm1ELE9BQXNCLHVFQUFQLEVBQU87QUFBQSxVQUNqRi9CLElBRGlGLEdBQzdDNUIsS0FENkMsQ0FDakY0QixJQURpRjtBQUFBLFVBQzNFeEIsZUFEMkUsR0FDN0NKLEtBRDZDLENBQzNFSSxlQUQyRTtBQUFBLFVBQzFEa0MsUUFEMEQsR0FDN0N0QyxLQUQ2QyxDQUMxRHNDLFFBRDBEO0FBR3pGLFVBQU1oQyxZQUFZLEdBQUdGLGVBQWUsSUFBSUEsZUFBZSxDQUFDLENBQUQsQ0FBdkQ7O0FBQ0EsVUFBTU0sT0FBTyxHQUFHLE1BQUtDLGtCQUFMLENBQXdCWCxLQUF4QixFQUErQk0sWUFBL0IsQ0FBaEI7O0FBRUEsVUFBSU0sUUFBUSxHQUFHLElBQWY7QUFDQSxVQUFNTSxXQUFXLEdBQUcsa0NBQXNCUixPQUF0QixDQUFwQjs7QUFDQSxVQUFJLENBQUNRLFdBQUwsRUFBa0I7QUFDaEIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSTBDLGNBQWMsc0JBQU8xQyxXQUFQLENBQWxCOztBQUVBLGNBQVFWLElBQVI7QUFDRSxhQUFLLFlBQUw7QUFDRSxjQUFNYSxlQUFlLEdBQ25CWCxPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCSyx3QkFBYUMsT0FBdkMsR0FDSSxDQUFDLENBQUQsRUFBSTZDLE9BQU8sQ0FBQ3ZCLGVBQVosQ0FESixHQUVJLENBQUN1QixPQUFPLENBQUN2QixlQUFULENBSE47QUFLQSxpQkFBTyxJQUFJVCxxQ0FBSixDQUErQkMsSUFBL0IsRUFDSmlDLGVBREksQ0FDWXZELFlBRFosRUFDMEJlLGVBRDFCLEVBQzJDc0MsT0FBTyxDQUFDbEMsU0FEbkQsRUFFSkssU0FGSSxFQUFQOztBQUlGLGFBQUssU0FBTDtBQUFBLGNBQ1VvQixFQURWLEdBQ3FCUyxPQURyQixDQUNVVCxFQURWO0FBQUEsY0FDY0MsRUFEZCxHQUNxQlEsT0FEckIsQ0FDY1IsRUFEZCxFQUdFOztBQUNBUyxVQUFBQSxjQUFjLEdBQUdBLGNBQWMsQ0FDNUJFLEdBRGMsQ0FDVixVQUFDckMsU0FBRCxFQUFlO0FBQ2xCO0FBQ0EsZ0JBQU1zQyxNQUFNLEdBQUd6QixRQUFRLElBQUlBLFFBQVEsQ0FBQ0MsT0FBVCxDQUFpQmQsU0FBakIsQ0FBM0I7O0FBQ0EsZ0JBQUlzQyxNQUFKLEVBQVk7QUFDVkEsY0FBQUEsTUFBTSxDQUFDLENBQUQsQ0FBTixJQUFhYixFQUFiO0FBQ0FhLGNBQUFBLE1BQU0sQ0FBQyxDQUFELENBQU4sSUFBYVosRUFBYjtBQUNBLHFCQUFPYixRQUFRLElBQUlBLFFBQVEsQ0FBQzBCLFNBQVQsQ0FBbUJELE1BQW5CLENBQW5CO0FBQ0Q7O0FBQ0QsbUJBQU8sSUFBUDtBQUNELFdBVmMsRUFXZEUsTUFYYyxDQVdQQyxPQVhPLENBQWpCO0FBWUF0RCxVQUFBQSxRQUFRLEdBQUc7QUFDVEosWUFBQUEsSUFBSSxFQUFFRSxPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBRGQ7QUFFVFUsWUFBQUEsV0FBVyxFQUNUUixPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCSyx3QkFBYUMsT0FBdkMsR0FDSSxDQUFDOEMsY0FBRCxDQURKLEdBRUlsRCxPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCSyx3QkFBYXNELEtBQXZDLEdBQ0FQLGNBQWMsQ0FBQyxDQUFELENBRGQsR0FFQUE7QUFQRyxXQUFYO0FBVUEsaUJBQU8sSUFBSWpDLHFDQUFKLENBQStCQyxJQUEvQixFQUNKd0MsZUFESSxDQUNZOUQsWUFEWixFQUMwQk0sUUFEMUIsRUFFSmtCLFNBRkksRUFBUDs7QUFJRixhQUFLLFdBQUw7QUFDRTtBQUNBOEIsVUFBQUEsY0FBYyxHQUFHLHFDQUNmO0FBQ0FsRCxVQUFBQSxPQUZlLEVBR2ZpRCxPQUFPLENBQUN2QixlQUhPLEVBSWZ1QixPQUFPLENBQUNsQyxTQUpPLENBQWpCO0FBTUFiLFVBQUFBLFFBQVEsR0FBRztBQUNUSixZQUFBQSxJQUFJLEVBQUVLLHdCQUFhQyxPQURWO0FBRVRJLFlBQUFBLFdBQVcsRUFBRTBDO0FBRkosV0FBWDtBQUtBLGlCQUFPLElBQUlqQyxxQ0FBSixDQUErQkMsSUFBL0IsRUFDSndDLGVBREksQ0FDWTlELFlBRFosRUFDMEJNLFFBRDFCLEVBRUprQixTQUZJLEVBQVA7O0FBSUY7QUFDRSxpQkFBT0YsSUFBSSxJQUFJLElBQUlELHFDQUFKLENBQStCQyxJQUEvQixFQUFxQ0UsU0FBckMsRUFBZjtBQTNESjtBQTZERCxLOzsyRUFpQnNCLFVBQUMvQixLQUFELEVBQTBCVyxPQUExQixFQUErQztBQUNwRTtBQURvRSxVQUU1RCtCLFVBRjRELEdBRXRDMUMsS0FGc0MsQ0FFNUQwQyxVQUY0RDtBQUFBLFVBRWhEdkMsS0FGZ0QsR0FFdENILEtBRnNDLENBRWhERyxLQUZnRCxFQUdwRTs7QUFDQSxVQUFNRCxNQUFNLEdBQUdDLEtBQUssSUFBSUEsS0FBSyxDQUFDLENBQUQsQ0FBN0IsQ0FKb0UsQ0FLcEU7O0FBQ0EsVUFBSSxDQUFDRCxNQUFELElBQVcsQ0FBQyxzQkFBVUEsTUFBTSxDQUFDSyxZQUFqQixDQUFaLElBQThDTCxNQUFNLENBQUNPLElBQVAsS0FBZ0JRLHdCQUFhQyxPQUEvRSxFQUF3RjtBQUN0RixlQUFPLElBQVA7QUFDRCxPQVJtRSxDQVVwRTs7O0FBQ0EsVUFDRXdCLFVBQVUsSUFDVC9CLE9BQU8sQ0FBQ0UsUUFBUixDQUFpQkosSUFBakIsS0FBMEJLLHdCQUFhQyxPQUF2QyxJQUNDSixPQUFPLENBQUNFLFFBQVIsQ0FBaUJKLElBQWpCLEtBQTBCSyx3QkFBYUUsV0FIM0MsRUFJRTtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQU1RLGVBQWUsR0FBRyxNQUFLQyxrQkFBTCxDQUF3QmQsT0FBeEIsRUFBaUNULE1BQWpDLEVBQXlDRixLQUFLLENBQUMwQixTQUEvQyxDQUF4Qjs7QUFFQSxVQUFJLENBQUNGLGVBQUwsRUFBc0I7QUFDcEIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTztBQUNMZixRQUFBQSxJQUFJLEVBQUUsU0FERDtBQUVMK0MsUUFBQUEsVUFBVSxFQUFFO0FBQ1ZjLFVBQUFBLFNBQVMsRUFBRUMsc0JBQVdDLGtCQURaO0FBRVZmLFVBQUFBLEtBQUssRUFBRTlDLE9BQU8sQ0FBQzZDLFVBQVIsQ0FBbUJDLEtBRmhCO0FBR1ZuQyxVQUFBQSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUYsQ0FIUDtBQUlWbUQsVUFBQUEsY0FBYyxFQUFFO0FBSk4sU0FGUDtBQVFMNUQsUUFBQUEsUUFBUSxFQUFFO0FBQ1JKLFVBQUFBLElBQUksRUFBRUssd0JBQWFzRCxLQURYO0FBRVJqRCxVQUFBQSxXQUFXLEVBQUVLO0FBRkw7QUFSTCxPQUFQO0FBYUQsSzs7Z0VBRVcsVUFBQ3ZCLEtBQUQsRUFBeUM7QUFDbkQ7QUFDQSxVQUFNd0MsZUFBZSxHQUFHLE1BQUs3QixrQkFBTCxDQUF3QlgsS0FBeEIsQ0FBeEI7O0FBQ0EsVUFBTUcsb0JBQW9CLEdBQUdILEtBQUssQ0FBQ0ksZUFBTixJQUF5QkosS0FBSyxDQUFDSSxlQUFOLENBQXNCLENBQXRCLENBQXREOztBQUVBLFVBQUksQ0FBQ29DLGVBQUQsSUFBb0JBLGVBQWUsQ0FBQzVCLFFBQWhCLENBQXlCSixJQUF6QixLQUFrQ0ssd0JBQWFzRCxLQUF2RSxFQUE4RTtBQUM1RSxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFNcEUsS0FBSyxHQUFHQyxLQUFLLENBQUMyQyxvQkFBcEIsQ0FUbUQsQ0FXbkQ7O0FBQ0EsVUFBTThCLFdBQVcsR0FBRyxNQUFLQyx5QkFBTCxDQUErQmxDLGVBQS9CLEVBQWdEckMsb0JBQWhELEtBQXlFLEVBQTdGLENBWm1ELENBY25EOztBQUNBLFVBQU13RSxnQkFBZ0IsR0FBRyxNQUFLQyxvQkFBTCxDQUEwQjdFLEtBQTFCLEVBQWlDeUMsZUFBakMsQ0FBekI7O0FBQ0EsVUFBSW1DLGdCQUFKLEVBQXNCO0FBQ3BCO0FBQ0FGLFFBQUFBLFdBQVcsQ0FBQ0ksSUFBWixDQUFpQkYsZ0JBQWpCO0FBQ0Q7O0FBRUQsYUFBTztBQUNMbkUsUUFBQUEsSUFBSSxFQUFFLG1CQUREO0FBRUxzRSxRQUFBQSxRQUFRLEVBQUVMLFdBQVcsQ0FBQ3JELE1BQVosR0FBcUJxRCxXQUFyQixHQUFtQztBQUZ4QyxPQUFQO0FBSUQsSzs7Ozs7Ozt1Q0FqUWtCMUUsSyxFQUEwQkMsSyxFQUFxQztBQUNoRjtBQUNBLFVBQU1DLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxLQUFOLElBQWVILEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosQ0FBOUIsQ0FGZ0YsQ0FJaEY7O0FBQ0EsVUFBSSxDQUFDRCxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDOEUsTUFBbkIsSUFBNkIsQ0FBQyxzQkFBVTlFLE1BQU0sQ0FBQ0ssWUFBakIsQ0FBbEMsRUFBa0U7QUFDaEU7QUFDRDs7QUFFRCxVQUFNMEUsWUFBWSxHQUFHL0UsTUFBTSxDQUFDSSxNQUE1Qjs7QUFDQSxjQUFRMkUsWUFBWSxDQUFDeEUsSUFBckI7QUFDRSxhQUFLUSx3QkFBYStCLE9BQWxCO0FBQ0EsYUFBSy9CLHdCQUFhZ0MsSUFBbEI7QUFDQSxhQUFLaEMsd0JBQWFxQyxXQUFsQjtBQUNFLGVBQUtLLGVBQUwsQ0FBcUIzRCxLQUFyQixFQUE0QkMsS0FBNUI7O0FBRUE7O0FBQ0Y7QUFQRjtBQVNEOzs7dUNBOEprQlUsTyxFQUFrQlQsTSxFQUFhZ0YsZSxFQUEyQjtBQUMzRSxVQUFNL0QsV0FBVyxHQUFHLGtDQUFzQlIsT0FBdEIsQ0FBcEI7O0FBQ0EsVUFBSSxDQUFDUSxXQUFMLEVBQWtCO0FBQ2hCLGVBQU8sSUFBUDtBQUNEOztBQUNELFVBQU1nRSxjQUFjLEdBQUdqRixNQUFNLENBQUNRLEtBQTlCO0FBQ0EsVUFBTTBFLGlCQUFpQixHQUFHbEYsTUFBTSxDQUFDUSxLQUFQLEdBQWUsQ0FBekM7QUFDQSxhQUFPLDJDQUNMO0FBQ0FTLE1BQUFBLFdBQVcsQ0FBQ2dFLGNBQUQsQ0FGTixFQUdMaEUsV0FBVyxDQUFDaUUsaUJBQUQsQ0FITixFQUlMRixlQUpLLENBQVA7QUFNRDs7OztFQWhQc0NHLG9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICdAbmVidWxhLmdsL2VkaXQtbW9kZXMnO1xuaW1wb3J0IHR5cGUge1xuICBGZWF0dXJlLFxuICBGZWF0dXJlQ29sbGVjdGlvbixcbiAgQ2xpY2tFdmVudCxcbiAgU3RvcERyYWdnaW5nRXZlbnQsXG4gIFBvaW50ZXJNb3ZlRXZlbnQsXG4gIFBvc2l0aW9uLFxufSBmcm9tICdAbmVidWxhLmdsL2VkaXQtbW9kZXMnO1xuaW1wb3J0IHsgTW9kZVByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBTSEFQRSwgRURJVF9UWVBFLCBFTEVNRU5UX1RZUEUsIEdFT0pTT05fVFlQRSwgR1VJREVfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgQmFzZU1vZGUgZnJvbSAnLi9iYXNlLW1vZGUnO1xuaW1wb3J0IHtcbiAgZmluZENsb3Nlc3RQb2ludE9uTGluZVNlZ21lbnQsXG4gIGdldEZlYXR1cmVDb29yZGluYXRlcyxcbiAgaXNOdW1lcmljLFxuICB1cGRhdGVSZWN0YW5nbGVQb3NpdGlvbixcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRpbmdNb2RlIGV4dGVuZHMgQmFzZU1vZGUge1xuICBoYW5kbGVDbGljayA9IChldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pID0+IHtcbiAgICBjb25zdCBwaWNrZWQgPSBldmVudC5waWNrcyAmJiBldmVudC5waWNrc1swXTtcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVJbmRleCA9IHByb3BzLnNlbGVjdGVkSW5kZXhlcyAmJiBwcm9wcy5zZWxlY3RlZEluZGV4ZXNbMF07XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICghcGlja2VkIHx8ICFwaWNrZWQub2JqZWN0IHx8IHBpY2tlZC5mZWF0dXJlSW5kZXggIT09IHNlbGVjdGVkRmVhdHVyZUluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgdHlwZTogb2JqZWN0VHlwZSwgZmVhdHVyZUluZGV4LCBpbmRleCB9ID0gcGlja2VkO1xuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcywgZmVhdHVyZUluZGV4KTtcblxuICAgIGlmIChcbiAgICAgIGZlYXR1cmUgJiZcbiAgICAgIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0xZR09OIHx8XG4gICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HKSAmJlxuICAgICAgb2JqZWN0VHlwZSA9PT0gRUxFTUVOVF9UWVBFLlNFR01FTlRcbiAgICApIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGZlYXR1cmUpO1xuICAgICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBpbnNlcnRJbmRleCA9IChpbmRleCArIDEpICUgY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgY29uc3QgcG9zaXRpb25JbmRleGVzID1cbiAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBTSEFQRS5QT0xZR09OID8gWzAsIGluc2VydEluZGV4XSA6IFtpbnNlcnRJbmRleF07XG4gICAgICBjb25zdCBpbnNlcnRNYXBDb29yZHMgPSB0aGlzLl9nZXRQb2ludE9uU2VnbWVudChmZWF0dXJlLCBwaWNrZWQsIGV2ZW50Lm1hcENvb3Jkcyk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWREYXRhID0gbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKHByb3BzLmRhdGEpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLmFkZFBvc2l0aW9uKGZlYXR1cmVJbmRleCwgcG9zaXRpb25JbmRleGVzLCBpbnNlcnRNYXBDb29yZHMpXG4gICAgICAgIC5nZXRPYmplY3QoKTtcblxuICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgZWRpdFR5cGU6IEVESVRfVFlQRS5BRERfUE9TSVRJT04sXG4gICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICBlZGl0Q29udGV4dDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIGVkaXRIYW5kbGVJbmRleDogaW5zZXJ0SW5kZXgsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBzY3JlZW5Db29yZHM6IHByb3BzLnZpZXdwb3J0ICYmIHByb3BzLnZpZXdwb3J0LnByb2plY3QoaW5zZXJ0TWFwQ29vcmRzKSxcbiAgICAgICAgICAgIG1hcENvb3JkczogaW5zZXJ0TWFwQ29vcmRzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU3RvcERyYWdnaW5nKGV2ZW50OiBTdG9wRHJhZ2dpbmdFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICAvLyByZXBsYWNlIHBvaW50XG4gICAgY29uc3QgcGlja2VkID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF07XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKCFwaWNrZWQgfHwgIXBpY2tlZC5PYmplY3QgfHwgIWlzTnVtZXJpYyhwaWNrZWQuZmVhdHVyZUluZGV4KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBpY2tlZE9iamVjdCA9IHBpY2tlZC5vYmplY3Q7XG4gICAgc3dpdGNoIChwaWNrZWRPYmplY3QudHlwZSkge1xuICAgICAgY2FzZSBFTEVNRU5UX1RZUEUuRkVBVFVSRTpcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkZJTEw6XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5FRElUX0hBTkRMRTpcbiAgICAgICAgdGhpcy5faGFuZGxlRHJhZ2dpbmcoZXZlbnQsIHByb3BzKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZURyYWdnaW5nID0gKFxuICAgIGV2ZW50OiBQb2ludGVyTW92ZUV2ZW50IHwgU3RvcERyYWdnaW5nRXZlbnQsXG4gICAgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj5cbiAgKSA9PiB7XG4gICAgY29uc3QgeyBvbkVkaXQgfSA9IHByb3BzO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgLy8gbm90aGluZyBjbGlja2VkXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgaXNEcmFnZ2luZywgcG9pbnRlckRvd25QaWNrcywgc2NyZWVuQ29vcmRzIH0gPSBldmVudDtcbiAgICBjb25zdCB7IGxhc3RQb2ludGVyTW92ZUV2ZW50IH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGNsaWNrZWQgPSBwb2ludGVyRG93blBpY2tzICYmIHBvaW50ZXJEb3duUGlja3NbMF07XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICghY2xpY2tlZCB8fCAhY2xpY2tlZC5vYmplY3QgfHwgIWlzTnVtZXJpYyhjbGlja2VkLmZlYXR1cmVJbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyB0eXBlOiBvYmplY3RUeXBlLCBpbmRleDogZWRpdEhhbmRsZUluZGV4IH0gPSBjbGlja2VkO1xuXG4gICAgLy8gbm90IGRyYWdnaW5nXG4gICAgbGV0IHVwZGF0ZWREYXRhID0gbnVsbDtcbiAgICBjb25zdCBlZGl0VHlwZSA9IGlzRHJhZ2dpbmcgPyBFRElUX1RZUEUuTU9WRV9QT1NJVElPTiA6IEVESVRfVFlQRS5GSU5JU0hfTU9WRV9QT1NJVElPTjtcblxuICAgIHN3aXRjaCAob2JqZWN0VHlwZSkge1xuICAgICAgY2FzZSBFTEVNRU5UX1RZUEUuRkVBVFVSRTpcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkZJTEw6XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5TRUdNRU5UOlxuICAgICAgICBpZiAoIXByb3BzLmZlYXR1cmVzRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gLy8gZHJhZ2dpbmcgZmVhdHVyZVxuXG4gICAgICAgIGNvbnN0IGR4ID0gc2NyZWVuQ29vcmRzWzBdIC0gbGFzdFBvaW50ZXJNb3ZlRXZlbnQuc2NyZWVuQ29vcmRzWzBdO1xuICAgICAgICBjb25zdCBkeSA9IHNjcmVlbkNvb3Jkc1sxXSAtIGxhc3RQb2ludGVyTW92ZUV2ZW50LnNjcmVlbkNvb3Jkc1sxXTtcbiAgICAgICAgdXBkYXRlZERhdGEgPSB0aGlzLl91cGRhdGVGZWF0dXJlKHByb3BzLCAnZmVhdHVyZScsIHsgZHgsIGR5IH0pO1xuICAgICAgICBvbkVkaXQoe1xuICAgICAgICAgIGVkaXRUeXBlLFxuICAgICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICAgIGVkaXRDb250ZXh0OiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkVESVRfSEFORExFOlxuICAgICAgICAvLyBkcmFnZ2luZyBlZGl0SGFuZGxlXG4gICAgICAgIC8vIGRyYWdnaW5nIHJlY3RhbmdsZSBvciBvdGhlciBzaGFwZXNcbiAgICAgICAgY29uc3QgdXBkYXRlVHlwZSA9XG4gICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlLnByb3BlcnRpZXMuc2hhcGUgPT09IFNIQVBFLlJFQ1RBTkdMRSA/ICdyZWN0YW5nbGUnIDogJ2VkaXRIYW5kbGUnO1xuICAgICAgICB1cGRhdGVkRGF0YSA9IHRoaXMuX3VwZGF0ZUZlYXR1cmUocHJvcHMsIHVwZGF0ZVR5cGUsIHtcbiAgICAgICAgICBlZGl0SGFuZGxlSW5kZXgsXG4gICAgICAgICAgbWFwQ29vcmRzOiBldmVudC5tYXBDb29yZHMsXG4gICAgICAgIH0pO1xuICAgICAgICBvbkVkaXQoe1xuICAgICAgICAgIGVkaXRUeXBlLFxuICAgICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICAgIGVkaXRDb250ZXh0OiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVBvaW50ZXJNb3ZlID0gKGV2ZW50OiBQb2ludGVyTW92ZUV2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIC8vIG5vIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlID0gdGhpcy5nZXRTZWxlY3RlZEZlYXR1cmUocHJvcHMpO1xuICAgIGlmICghc2VsZWN0ZWRGZWF0dXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoIWV2ZW50LmlzRHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVEcmFnZ2luZyhldmVudCwgcHJvcHMpO1xuICB9O1xuXG4gIC8vIFRPRE8gLSByZWZhY3RvclxuICBfdXBkYXRlRmVhdHVyZSA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPiwgdHlwZTogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSwgc2VsZWN0ZWRJbmRleGVzLCB2aWV3cG9ydCB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBmZWF0dXJlSW5kZXggPSBzZWxlY3RlZEluZGV4ZXMgJiYgc2VsZWN0ZWRJbmRleGVzWzBdO1xuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcywgZmVhdHVyZUluZGV4KTtcblxuICAgIGxldCBnZW9tZXRyeSA9IG51bGw7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IG5ld0Nvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVzXTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZWRpdEhhbmRsZSc6XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSW5kZXhlcyA9XG4gICAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBHRU9KU09OX1RZUEUuUE9MWUdPTlxuICAgICAgICAgICAgPyBbMCwgb3B0aW9ucy5lZGl0SGFuZGxlSW5kZXhdXG4gICAgICAgICAgICA6IFtvcHRpb25zLmVkaXRIYW5kbGVJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbihkYXRhKVxuICAgICAgICAgIC5yZXBsYWNlUG9zaXRpb24oZmVhdHVyZUluZGV4LCBwb3NpdGlvbkluZGV4ZXMsIG9wdGlvbnMubWFwQ29vcmRzKVxuICAgICAgICAgIC5nZXRPYmplY3QoKTtcblxuICAgICAgY2FzZSAnZmVhdHVyZSc6XG4gICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBvcHRpb25zO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXMgPSBuZXdDb29yZGluYXRlc1xuICAgICAgICAgIC5tYXAoKG1hcENvb3JkcykgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgcGl4ZWxzID0gdmlld3BvcnQgJiYgdmlld3BvcnQucHJvamVjdChtYXBDb29yZHMpO1xuICAgICAgICAgICAgaWYgKHBpeGVscykge1xuICAgICAgICAgICAgICBwaXhlbHNbMF0gKz0gZHg7XG4gICAgICAgICAgICAgIHBpeGVsc1sxXSArPSBkeTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdwb3J0ICYmIHZpZXdwb3J0LnVucHJvamVjdChwaXhlbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICBnZW9tZXRyeSA9IHtcbiAgICAgICAgICB0eXBlOiBmZWF0dXJlLmdlb21ldHJ5LnR5cGUsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6XG4gICAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0xZR09OXG4gICAgICAgICAgICAgID8gW25ld0Nvb3JkaW5hdGVzXVxuICAgICAgICAgICAgICA6IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gR0VPSlNPTl9UWVBFLlBPSU5UXG4gICAgICAgICAgICAgID8gbmV3Q29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICAgICAgOiBuZXdDb29yZGluYXRlcyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKGRhdGEpXG4gICAgICAgICAgLnJlcGxhY2VHZW9tZXRyeShmZWF0dXJlSW5kZXgsIGdlb21ldHJ5KVxuICAgICAgICAgIC5nZXRPYmplY3QoKTtcblxuICAgICAgY2FzZSAncmVjdGFuZ2xlJzpcbiAgICAgICAgLy8gbW92ZWQgZWRpdEhhbmRsZUluZGV4IGFuZCBkZXN0aW5hdGlvbiBtYXBDb29yZHNcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXMgPSB1cGRhdGVSZWN0YW5nbGVQb3NpdGlvbihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICBvcHRpb25zLmVkaXRIYW5kbGVJbmRleCxcbiAgICAgICAgICBvcHRpb25zLm1hcENvb3Jkc1xuICAgICAgICApO1xuICAgICAgICBnZW9tZXRyeSA9IHtcbiAgICAgICAgICB0eXBlOiBHRU9KU09OX1RZUEUuUE9MWUdPTixcbiAgICAgICAgICBjb29yZGluYXRlczogbmV3Q29vcmRpbmF0ZXMsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbihkYXRhKVxuICAgICAgICAgIC5yZXBsYWNlR2VvbWV0cnkoZmVhdHVyZUluZGV4LCBnZW9tZXRyeSlcbiAgICAgICAgICAuZ2V0T2JqZWN0KCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRhICYmIG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbihkYXRhKS5nZXRPYmplY3QoKTtcbiAgICB9XG4gIH07XG5cbiAgX2dldFBvaW50T25TZWdtZW50KGZlYXR1cmU6IEZlYXR1cmUsIHBpY2tlZDogYW55LCBwaWNrZWRNYXBDb29yZHM6IFBvc2l0aW9uKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHNyY1ZlcnRleEluZGV4ID0gcGlja2VkLmluZGV4O1xuICAgIGNvbnN0IHRhcmdldFZlcnRleEluZGV4ID0gcGlja2VkLmluZGV4ICsgMTtcbiAgICByZXR1cm4gZmluZENsb3Nlc3RQb2ludE9uTGluZVNlZ21lbnQoXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb29yZGluYXRlc1tzcmNWZXJ0ZXhJbmRleF0sXG4gICAgICBjb29yZGluYXRlc1t0YXJnZXRWZXJ0ZXhJbmRleF0sXG4gICAgICBwaWNrZWRNYXBDb29yZHNcbiAgICApO1xuICB9XG5cbiAgX2dldEN1cnNvckVkaXRIYW5kbGUgPSAoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBpc0RyYWdnaW5nLCBwaWNrcyB9ID0gZXZlbnQ7XG4gICAgLy8gaWYgbm90IHBpY2sgc2VnbWVudFxuICAgIGNvbnN0IHBpY2tlZCA9IHBpY2tzICYmIHBpY2tzWzBdO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoIXBpY2tlZCB8fCAhaXNOdW1lcmljKHBpY2tlZC5mZWF0dXJlSW5kZXgpIHx8IHBpY2tlZC50eXBlICE9PSBFTEVNRU5UX1RZUEUuU0VHTUVOVCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gaWYgZHJhZ2dpbmcgb3IgZmVhdHVyZSBpcyBuZWl0aGVyIHBvbHlnb24gbm9yIGxpbmUgc3RyaW5nXG4gICAgaWYgKFxuICAgICAgaXNEcmFnZ2luZyB8fFxuICAgICAgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSAhPT0gR0VPSlNPTl9UWVBFLlBPTFlHT04gJiZcbiAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlICE9PSBHRU9KU09OX1RZUEUuTElORV9TVFJJTkcpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpbnNlcnRNYXBDb29yZHMgPSB0aGlzLl9nZXRQb2ludE9uU2VnbWVudChmZWF0dXJlLCBwaWNrZWQsIGV2ZW50Lm1hcENvb3Jkcyk7XG5cbiAgICBpZiAoIWluc2VydE1hcENvb3Jkcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZ3VpZGVUeXBlOiBHVUlERV9UWVBFLkNVUlNPUl9FRElUX0hBTkRMRSxcbiAgICAgICAgc2hhcGU6IGZlYXR1cmUucHJvcGVydGllcy5zaGFwZSxcbiAgICAgICAgcG9zaXRpb25JbmRleGVzOiBbLTFdLFxuICAgICAgICBlZGl0SGFuZGxlVHlwZTogJ2ludGVybWVkaWF0ZScsXG4gICAgICB9LFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLlBPSU5ULFxuICAgICAgICBjb29yZGluYXRlczogaW5zZXJ0TWFwQ29vcmRzLFxuICAgICAgfSxcbiAgICB9O1xuICB9O1xuICAvLyBAdHMtaWdub3JlXG4gIGdldEd1aWRlcyA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlSW5kZXggPSBwcm9wcy5zZWxlY3RlZEluZGV4ZXMgJiYgcHJvcHMuc2VsZWN0ZWRJbmRleGVzWzBdO1xuXG4gICAgaWYgKCFzZWxlY3RlZEZlYXR1cmUgfHwgc2VsZWN0ZWRGZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0lOVCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBwcm9wcy5sYXN0UG9pbnRlck1vdmVFdmVudDtcblxuICAgIC8vIGZlYXR1cmUgZWRpdEhhbmRsZXNcbiAgICBjb25zdCBlZGl0SGFuZGxlcyA9IHRoaXMuZ2V0RWRpdEhhbmRsZXNGcm9tRmVhdHVyZShzZWxlY3RlZEZlYXR1cmUsIHNlbGVjdGVkRmVhdHVyZUluZGV4KSB8fCBbXTtcblxuICAgIC8vIGN1cnNvciBlZGl0SGFuZGxlXG4gICAgY29uc3QgY3Vyc29yRWRpdEhhbmRsZSA9IHRoaXMuX2dldEN1cnNvckVkaXRIYW5kbGUoZXZlbnQsIHNlbGVjdGVkRmVhdHVyZSk7XG4gICAgaWYgKGN1cnNvckVkaXRIYW5kbGUpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGVkaXRIYW5kbGVzLnB1c2goY3Vyc29yRWRpdEhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICBmZWF0dXJlczogZWRpdEhhbmRsZXMubGVuZ3RoID8gZWRpdEhhbmRsZXMgOiBudWxsLFxuICAgIH07XG4gIH07XG59XG4iXX0=
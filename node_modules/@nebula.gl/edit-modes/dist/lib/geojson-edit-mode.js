"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntermediatePosition = getIntermediatePosition;
exports.GeoJsonEditMode = void 0;

var _union = _interopRequireDefault(require("@turf/union"));

var _difference = _interopRequireDefault(require("@turf/difference"));

var _intersect = _interopRequireDefault(require("@turf/intersect"));

var _utils = require("../utils");

var _immutableFeatureCollection = require("./immutable-feature-collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_GUIDES = {
  type: 'FeatureCollection',
  features: []
};
var DEFAULT_TOOLTIPS = []; // Main interface for `EditMode`s that edit GeoJSON

var GeoJsonEditMode = /*#__PURE__*/function () {
  function GeoJsonEditMode() {
    _classCallCheck(this, GeoJsonEditMode);

    _defineProperty(this, "_clickSequence", []);
  }

  _createClass(GeoJsonEditMode, [{
    key: "getGuides",
    value: function getGuides(props) {
      return DEFAULT_GUIDES;
    }
  }, {
    key: "getTooltips",
    value: function getTooltips(props) {
      return DEFAULT_TOOLTIPS;
    }
  }, {
    key: "getSelectedFeature",
    value: function getSelectedFeature(props) {
      if (props.selectedIndexes.length === 1) {
        return props.data.features[props.selectedIndexes[0]];
      }

      return null;
    }
  }, {
    key: "getSelectedGeometry",
    value: function getSelectedGeometry(props) {
      var feature = this.getSelectedFeature(props);

      if (feature) {
        return feature.geometry;
      }

      return null;
    }
  }, {
    key: "getSelectedFeaturesAsFeatureCollection",
    value: function getSelectedFeaturesAsFeatureCollection(props) {
      var features = props.data.features;
      var selectedFeatures = props.selectedIndexes.map(function (selectedIndex) {
        return features[selectedIndex];
      });
      return {
        type: 'FeatureCollection',
        features: selectedFeatures
      };
    }
  }, {
    key: "getClickSequence",
    value: function getClickSequence() {
      return this._clickSequence;
    }
  }, {
    key: "addClickSequence",
    value: function addClickSequence(_ref) {
      var mapCoords = _ref.mapCoords;

      this._clickSequence.push(mapCoords);
    }
  }, {
    key: "resetClickSequence",
    value: function resetClickSequence() {
      this._clickSequence = [];
    }
  }, {
    key: "getTentativeGuide",
    value: function getTentativeGuide(props) {
      var guides = this.getGuides(props); // @ts-ignore

      return guides.features.find(function (f) {
        return f.properties && f.properties.guideType === 'tentative';
      });
    }
  }, {
    key: "isSelectionPicked",
    value: function isSelectionPicked(picks, props) {
      if (!picks.length) return false;
      var pickedFeatures = (0, _utils.getNonGuidePicks)(picks).map(function (_ref2) {
        var index = _ref2.index;
        return index;
      });
      var pickedHandles = (0, _utils.getPickedEditHandles)(picks).map(function (_ref3) {
        var properties = _ref3.properties;
        return properties.featureIndex;
      });
      var pickedIndexes = new Set([].concat(_toConsumableArray(pickedFeatures), _toConsumableArray(pickedHandles)));
      return props.selectedIndexes.some(function (index) {
        return pickedIndexes.has(index);
      });
    }
  }, {
    key: "getAddFeatureAction",
    value: function getAddFeatureAction(featureOrGeometry, features) {
      // Unsure why flow can't deal with Geometry type, but there I fixed it
      var featureOrGeometryAsAny = featureOrGeometry;
      var feature = featureOrGeometryAsAny.type === 'Feature' ? featureOrGeometryAsAny : {
        type: 'Feature',
        properties: {},
        geometry: featureOrGeometryAsAny
      };
      var updatedData = new _immutableFeatureCollection.ImmutableFeatureCollection(features).addFeature(feature).getObject();
      return {
        updatedData: updatedData,
        editType: 'addFeature',
        editContext: {
          featureIndexes: [updatedData.features.length - 1]
        }
      };
    }
  }, {
    key: "getAddManyFeaturesAction",
    value: function getAddManyFeaturesAction(_ref4, features) {
      var featuresToAdd = _ref4.features;
      var updatedData = new _immutableFeatureCollection.ImmutableFeatureCollection(features);
      var initialIndex = updatedData.getObject().features.length;
      var updatedIndexes = [];

      var _iterator = _createForOfIteratorHelper(featuresToAdd),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var feature = _step.value;
          var properties = feature.properties,
              geometry = feature.geometry;
          var geometryAsAny = geometry;
          updatedData = updatedData.addFeature({
            type: 'Feature',
            properties: properties,
            geometry: geometryAsAny
          });
          updatedIndexes.push(initialIndex + updatedIndexes.length);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return {
        updatedData: updatedData.getObject(),
        editType: 'addFeature',
        editContext: {
          featureIndexes: updatedIndexes
        }
      };
    }
  }, {
    key: "getAddFeatureOrBooleanPolygonAction",
    value: function getAddFeatureOrBooleanPolygonAction(featureOrGeometry, props) {
      var featureOrGeometryAsAny = featureOrGeometry;
      var selectedFeature = this.getSelectedFeature(props);
      var modeConfig = props.modeConfig;

      if (modeConfig && modeConfig.booleanOperation) {
        if (!selectedFeature || selectedFeature.geometry.type !== 'Polygon' && selectedFeature.geometry.type !== 'MultiPolygon') {
          // eslint-disable-next-line no-console,no-undef
          console.warn('booleanOperation only supported for single Polygon or MultiPolygon selection');
          return null;
        }

        var feature = featureOrGeometryAsAny.type === 'Feature' ? featureOrGeometryAsAny : {
          type: 'Feature',
          geometry: featureOrGeometryAsAny
        };
        var updatedGeometry;

        if (modeConfig.booleanOperation === 'union') {
          updatedGeometry = (0, _union["default"])(selectedFeature, feature);
        } else if (modeConfig.booleanOperation === 'difference') {
          // @ts-ignore
          updatedGeometry = (0, _difference["default"])(selectedFeature, feature);
        } else if (modeConfig.booleanOperation === 'intersection') {
          // @ts-ignore
          updatedGeometry = (0, _intersect["default"])(selectedFeature, feature);
        } else {
          // eslint-disable-next-line no-console,no-undef
          console.warn("Invalid booleanOperation ".concat(modeConfig.booleanOperation));
          return null;
        }

        if (!updatedGeometry) {
          // eslint-disable-next-line no-console,no-undef
          console.warn('Canceling edit. Boolean operation erased entire polygon.');
          return null;
        }

        var featureIndex = props.selectedIndexes[0];
        var updatedData = new _immutableFeatureCollection.ImmutableFeatureCollection(props.data).replaceGeometry(featureIndex, updatedGeometry.geometry).getObject();
        var editAction = {
          updatedData: updatedData,
          editType: 'unionGeometry',
          editContext: {
            featureIndexes: [featureIndex]
          }
        };
        return editAction;
      }

      return this.getAddFeatureAction(featureOrGeometry, props.data);
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, props) {}
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {}
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {}
  }, {
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {}
  }, {
    key: "handleDragging",
    value: function handleDragging(event, props) {}
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event, props) {
      if (event.key === 'Escape') {
        this.resetClickSequence();
        props.onEdit({
          // Because the new drawing feature is dropped, so the data will keep as the same.
          updatedData: props.data,
          editType: 'cancelFeature',
          editContext: {}
        });
      }
    }
  }]);

  return GeoJsonEditMode;
}();

exports.GeoJsonEditMode = GeoJsonEditMode;

function getIntermediatePosition(position1, position2) {
  var intermediatePosition = [(position1[0] + position2[0]) / 2.0, (position1[1] + position2[1]) / 2.0]; // @ts-ignore

  return intermediatePosition;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2VvanNvbi1lZGl0LW1vZGUudHMiXSwibmFtZXMiOlsiREVGQVVMVF9HVUlERVMiLCJ0eXBlIiwiZmVhdHVyZXMiLCJERUZBVUxUX1RPT0xUSVBTIiwiR2VvSnNvbkVkaXRNb2RlIiwicHJvcHMiLCJzZWxlY3RlZEluZGV4ZXMiLCJsZW5ndGgiLCJkYXRhIiwiZmVhdHVyZSIsImdldFNlbGVjdGVkRmVhdHVyZSIsImdlb21ldHJ5Iiwic2VsZWN0ZWRGZWF0dXJlcyIsIm1hcCIsInNlbGVjdGVkSW5kZXgiLCJfY2xpY2tTZXF1ZW5jZSIsIm1hcENvb3JkcyIsInB1c2giLCJndWlkZXMiLCJnZXRHdWlkZXMiLCJmaW5kIiwiZiIsInByb3BlcnRpZXMiLCJndWlkZVR5cGUiLCJwaWNrcyIsInBpY2tlZEZlYXR1cmVzIiwiaW5kZXgiLCJwaWNrZWRIYW5kbGVzIiwiZmVhdHVyZUluZGV4IiwicGlja2VkSW5kZXhlcyIsIlNldCIsInNvbWUiLCJoYXMiLCJmZWF0dXJlT3JHZW9tZXRyeSIsImZlYXR1cmVPckdlb21ldHJ5QXNBbnkiLCJ1cGRhdGVkRGF0YSIsIkltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIiwiYWRkRmVhdHVyZSIsImdldE9iamVjdCIsImVkaXRUeXBlIiwiZWRpdENvbnRleHQiLCJmZWF0dXJlSW5kZXhlcyIsImZlYXR1cmVzVG9BZGQiLCJpbml0aWFsSW5kZXgiLCJ1cGRhdGVkSW5kZXhlcyIsImdlb21ldHJ5QXNBbnkiLCJzZWxlY3RlZEZlYXR1cmUiLCJtb2RlQ29uZmlnIiwiYm9vbGVhbk9wZXJhdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwidXBkYXRlZEdlb21ldHJ5IiwicmVwbGFjZUdlb21ldHJ5IiwiZWRpdEFjdGlvbiIsImdldEFkZEZlYXR1cmVBY3Rpb24iLCJldmVudCIsImtleSIsInJlc2V0Q2xpY2tTZXF1ZW5jZSIsIm9uRWRpdCIsImdldEludGVybWVkaWF0ZVBvc2l0aW9uIiwicG9zaXRpb24xIiwi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QUFBQSxjQUFjLEVBQUUsQ0FBQ2IsWUFBRDtBQURMO0FBSHVCLFNBQXRDO0FBUUEsZUFBT3lCLFVBQVA7QUFDRDs7QUFDRCxhQUFPLEtBQUtDLG1CQUFMLENBQXlCckIsaUJBQXpCLEVBQTRDNUIsS0FBSyxDQUFDRyxJQUFsRCxDQUFQO0FBQ0Q7OztnQ0FFVytDLEssRUFBbUJsRCxLLEVBQTJDLENBQUU7OztzQ0FDMURrRCxLLEVBQXlCbEQsSyxFQUEyQyxDQUFFOzs7d0NBQ3BFa0QsSyxFQUEyQmxELEssRUFBMkMsQ0FBRTs7O3VDQUN6RWtELEssRUFBMEJsRCxLLEVBQTJDLENBQUU7OzttQ0FDM0VrRCxLLEVBQXNCbEQsSyxFQUEyQyxDQUFFOzs7Z0NBRXRFa0QsSyxFQUFzQmxELEssRUFBMkM7QUFDM0UsVUFBSWtELEtBQUssQ0FBQ0MsR0FBTixLQUFjLFFBQWxCLEVBQTRCO0FBQzFCLGFBQUtDLGtCQUFMO0FBQ0FwRCxRQUFBQSxLQUFLLENBQUNxRCxNQUFOLENBQWE7QUFDWDtBQUNBdkIsVUFBQUEsV0FBVyxFQUFFOUIsS0FBSyxDQUFDRyxJQUZSO0FBR1grQixVQUFBQSxRQUFRLEVBQUUsZUFIQztBQUlYQyxVQUFBQSxXQUFXLEVBQUU7QUFKRixTQUFiO0FBTUQ7QUFDRjs7Ozs7Ozs7QUFHSSxTQUFTbUIsdUJBQVQsQ0FBaUNDLFNBQWpDLEVBQXNEQyxTQUF0RCxFQUFxRjtBQUMxRixNQUFNQyxvQkFBb0IsR0FBRyxDQUMzQixDQUFDRixTQUFTLENBQUMsQ0FBRCxDQUFULEdBQWVDLFNBQVMsQ0FBQyxDQUFELENBQXpCLElBQWdDLEdBREwsRUFFM0IsQ0FBQ0QsU0FBUyxDQUFDLENBQUQsQ0FBVCxHQUFlQyxTQUFTLENBQUMsQ0FBRCxDQUF6QixJQUFnQyxHQUZMLENBQTdCLENBRDBGLENBSzFGOztBQUNBLFNBQU9DLG9CQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHVyZlVuaW9uIGZyb20gJ0B0dXJmL3VuaW9uJztcbmltcG9ydCB0dXJmRGlmZmVyZW5jZSBmcm9tICdAdHVyZi9kaWZmZXJlbmNlJztcbmltcG9ydCB0dXJmSW50ZXJzZWN0IGZyb20gJ0B0dXJmL2ludGVyc2VjdCc7XG5cbmltcG9ydCB7XG4gIEVkaXRBY3Rpb24sXG4gIENsaWNrRXZlbnQsXG4gIFBvaW50ZXJNb3ZlRXZlbnQsXG4gIFN0YXJ0RHJhZ2dpbmdFdmVudCxcbiAgU3RvcERyYWdnaW5nRXZlbnQsXG4gIERyYWdnaW5nRXZlbnQsXG4gIFBpY2ssXG4gIFRvb2x0aXAsXG4gIE1vZGVQcm9wcyxcbiAgR3VpZGVGZWF0dXJlQ29sbGVjdGlvbixcbiAgVGVudGF0aXZlRmVhdHVyZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbGxlY3Rpb24sIEZlYXR1cmUsIFBvbHlnb24sIEdlb21ldHJ5LCBQb3NpdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHsgZ2V0UGlja2VkRWRpdEhhbmRsZXMsIGdldE5vbkd1aWRlUGlja3MgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBFZGl0TW9kZSB9IGZyb20gJy4vZWRpdC1tb2RlJztcbmltcG9ydCB7IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnLi9pbW11dGFibGUtZmVhdHVyZS1jb2xsZWN0aW9uJztcblxuZXhwb3J0IHR5cGUgR2VvSnNvbkVkaXRBY3Rpb24gPSBFZGl0QWN0aW9uPEZlYXR1cmVDb2xsZWN0aW9uPjtcblxuY29uc3QgREVGQVVMVF9HVUlERVM6IEd1aWRlRmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gIGZlYXR1cmVzOiBbXSxcbn07XG5jb25zdCBERUZBVUxUX1RPT0xUSVBTOiBUb29sdGlwW10gPSBbXTtcblxuLy8gTWFpbiBpbnRlcmZhY2UgZm9yIGBFZGl0TW9kZWBzIHRoYXQgZWRpdCBHZW9KU09OXG5leHBvcnQgdHlwZSBHZW9Kc29uRWRpdE1vZGVUeXBlID0gRWRpdE1vZGU8RmVhdHVyZUNvbGxlY3Rpb24sIEZlYXR1cmVDb2xsZWN0aW9uPjtcblxuZXhwb3J0IGNsYXNzIEdlb0pzb25FZGl0TW9kZSBpbXBsZW1lbnRzIEVkaXRNb2RlPEZlYXR1cmVDb2xsZWN0aW9uLCBHdWlkZUZlYXR1cmVDb2xsZWN0aW9uPiB7XG4gIF9jbGlja1NlcXVlbmNlOiBQb3NpdGlvbltdID0gW107XG5cbiAgZ2V0R3VpZGVzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgcmV0dXJuIERFRkFVTFRfR1VJREVTO1xuICB9XG5cbiAgZ2V0VG9vbHRpcHMocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiBUb29sdGlwW10ge1xuICAgIHJldHVybiBERUZBVUxUX1RPT0xUSVBTO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogRmVhdHVyZSB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIGlmIChwcm9wcy5zZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcHJvcHMuZGF0YS5mZWF0dXJlc1twcm9wcy5zZWxlY3RlZEluZGV4ZXNbMF1dO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkR2VvbWV0cnkocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiBHZW9tZXRyeSB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgaWYgKGZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLmdlb21ldHJ5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkRmVhdHVyZXNBc0ZlYXR1cmVDb2xsZWN0aW9uKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogRmVhdHVyZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0IHsgZmVhdHVyZXMgfSA9IHByb3BzLmRhdGE7XG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlcyA9IHByb3BzLnNlbGVjdGVkSW5kZXhlcy5tYXAoKHNlbGVjdGVkSW5kZXgpID0+IGZlYXR1cmVzW3NlbGVjdGVkSW5kZXhdKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIGZlYXR1cmVzOiBzZWxlY3RlZEZlYXR1cmVzLFxuICAgIH07XG4gIH1cblxuICBnZXRDbGlja1NlcXVlbmNlKCk6IFBvc2l0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9jbGlja1NlcXVlbmNlO1xuICB9XG5cbiAgYWRkQ2xpY2tTZXF1ZW5jZSh7IG1hcENvb3JkcyB9OiBDbGlja0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY2xpY2tTZXF1ZW5jZS5wdXNoKG1hcENvb3Jkcyk7XG4gIH1cblxuICByZXNldENsaWNrU2VxdWVuY2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY2xpY2tTZXF1ZW5jZSA9IFtdO1xuICB9XG5cbiAgZ2V0VGVudGF0aXZlR3VpZGUocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiBUZW50YXRpdmVGZWF0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3VpZGVzID0gdGhpcy5nZXRHdWlkZXMocHJvcHMpO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBndWlkZXMuZmVhdHVyZXMuZmluZCgoZikgPT4gZi5wcm9wZXJ0aWVzICYmIGYucHJvcGVydGllcy5ndWlkZVR5cGUgPT09ICd0ZW50YXRpdmUnKTtcbiAgfVxuXG4gIGlzU2VsZWN0aW9uUGlja2VkKHBpY2tzOiBQaWNrW10sIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogYm9vbGVhbiB7XG4gICAgaWYgKCFwaWNrcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBwaWNrZWRGZWF0dXJlcyA9IGdldE5vbkd1aWRlUGlja3MocGlja3MpLm1hcCgoeyBpbmRleCB9KSA9PiBpbmRleCk7XG4gICAgY29uc3QgcGlja2VkSGFuZGxlcyA9IGdldFBpY2tlZEVkaXRIYW5kbGVzKHBpY2tzKS5tYXAoXG4gICAgICAoeyBwcm9wZXJ0aWVzIH0pID0+IHByb3BlcnRpZXMuZmVhdHVyZUluZGV4XG4gICAgKTtcbiAgICBjb25zdCBwaWNrZWRJbmRleGVzID0gbmV3IFNldChbLi4ucGlja2VkRmVhdHVyZXMsIC4uLnBpY2tlZEhhbmRsZXNdKTtcbiAgICByZXR1cm4gcHJvcHMuc2VsZWN0ZWRJbmRleGVzLnNvbWUoKGluZGV4KSA9PiBwaWNrZWRJbmRleGVzLmhhcyhpbmRleCkpO1xuICB9XG5cbiAgZ2V0QWRkRmVhdHVyZUFjdGlvbihcbiAgICBmZWF0dXJlT3JHZW9tZXRyeTogR2VvbWV0cnkgfCBGZWF0dXJlLFxuICAgIGZlYXR1cmVzOiBGZWF0dXJlQ29sbGVjdGlvblxuICApOiBHZW9Kc29uRWRpdEFjdGlvbiB7XG4gICAgLy8gVW5zdXJlIHdoeSBmbG93IGNhbid0IGRlYWwgd2l0aCBHZW9tZXRyeSB0eXBlLCBidXQgdGhlcmUgSSBmaXhlZCBpdFxuICAgIGNvbnN0IGZlYXR1cmVPckdlb21ldHJ5QXNBbnk6IGFueSA9IGZlYXR1cmVPckdlb21ldHJ5O1xuXG4gICAgY29uc3QgZmVhdHVyZTogYW55ID1cbiAgICAgIGZlYXR1cmVPckdlb21ldHJ5QXNBbnkudHlwZSA9PT0gJ0ZlYXR1cmUnXG4gICAgICAgID8gZmVhdHVyZU9yR2VvbWV0cnlBc0FueVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHt9LFxuICAgICAgICAgICAgZ2VvbWV0cnk6IGZlYXR1cmVPckdlb21ldHJ5QXNBbnksXG4gICAgICAgICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZWREYXRhID0gbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKS5hZGRGZWF0dXJlKGZlYXR1cmUpLmdldE9iamVjdCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgZWRpdFR5cGU6ICdhZGRGZWF0dXJlJyxcbiAgICAgIGVkaXRDb250ZXh0OiB7XG4gICAgICAgIGZlYXR1cmVJbmRleGVzOiBbdXBkYXRlZERhdGEuZmVhdHVyZXMubGVuZ3RoIC0gMV0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBnZXRBZGRNYW55RmVhdHVyZXNBY3Rpb24oXG4gICAgeyBmZWF0dXJlczogZmVhdHVyZXNUb0FkZCB9OiBGZWF0dXJlQ29sbGVjdGlvbixcbiAgICBmZWF0dXJlczogRmVhdHVyZUNvbGxlY3Rpb25cbiAgKTogR2VvSnNvbkVkaXRBY3Rpb24ge1xuICAgIGxldCB1cGRhdGVkRGF0YSA9IG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbihmZWF0dXJlcyk7XG4gICAgY29uc3QgaW5pdGlhbEluZGV4ID0gdXBkYXRlZERhdGEuZ2V0T2JqZWN0KCkuZmVhdHVyZXMubGVuZ3RoO1xuICAgIGNvbnN0IHVwZGF0ZWRJbmRleGVzID0gW107XG4gICAgZm9yIChjb25zdCBmZWF0dXJlIG9mIGZlYXR1cmVzVG9BZGQpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydGllcywgZ2VvbWV0cnkgfSA9IGZlYXR1cmU7XG4gICAgICBjb25zdCBnZW9tZXRyeUFzQW55OiBhbnkgPSBnZW9tZXRyeTtcbiAgICAgIHVwZGF0ZWREYXRhID0gdXBkYXRlZERhdGEuYWRkRmVhdHVyZSh7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgZ2VvbWV0cnk6IGdlb21ldHJ5QXNBbnksXG4gICAgICB9KTtcbiAgICAgIHVwZGF0ZWRJbmRleGVzLnB1c2goaW5pdGlhbEluZGV4ICsgdXBkYXRlZEluZGV4ZXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlZERhdGE6IHVwZGF0ZWREYXRhLmdldE9iamVjdCgpLFxuICAgICAgZWRpdFR5cGU6ICdhZGRGZWF0dXJlJyxcbiAgICAgIGVkaXRDb250ZXh0OiB7XG4gICAgICAgIGZlYXR1cmVJbmRleGVzOiB1cGRhdGVkSW5kZXhlcyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGdldEFkZEZlYXR1cmVPckJvb2xlYW5Qb2x5Z29uQWN0aW9uKFxuICAgIGZlYXR1cmVPckdlb21ldHJ5OiBQb2x5Z29uIHwgRmVhdHVyZSxcbiAgICBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPlxuICApOiBHZW9Kc29uRWRpdEFjdGlvbiB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGZlYXR1cmVPckdlb21ldHJ5QXNBbnk6IGFueSA9IGZlYXR1cmVPckdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlID0gdGhpcy5nZXRTZWxlY3RlZEZlYXR1cmUocHJvcHMpO1xuICAgIGNvbnN0IHsgbW9kZUNvbmZpZyB9ID0gcHJvcHM7XG4gICAgaWYgKG1vZGVDb25maWcgJiYgbW9kZUNvbmZpZy5ib29sZWFuT3BlcmF0aW9uKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFzZWxlY3RlZEZlYXR1cmUgfHxcbiAgICAgICAgKHNlbGVjdGVkRmVhdHVyZS5nZW9tZXRyeS50eXBlICE9PSAnUG9seWdvbicgJiZcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmUuZ2VvbWV0cnkudHlwZSAhPT0gJ011bHRpUG9seWdvbicpXG4gICAgICApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUsbm8tdW5kZWZcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdib29sZWFuT3BlcmF0aW9uIG9ubHkgc3VwcG9ydGVkIGZvciBzaW5nbGUgUG9seWdvbiBvciBNdWx0aVBvbHlnb24gc2VsZWN0aW9uJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmVhdHVyZSA9XG4gICAgICAgIGZlYXR1cmVPckdlb21ldHJ5QXNBbnkudHlwZSA9PT0gJ0ZlYXR1cmUnXG4gICAgICAgICAgPyBmZWF0dXJlT3JHZW9tZXRyeUFzQW55XG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgZ2VvbWV0cnk6IGZlYXR1cmVPckdlb21ldHJ5QXNBbnksXG4gICAgICAgICAgICB9O1xuXG4gICAgICBsZXQgdXBkYXRlZEdlb21ldHJ5O1xuICAgICAgaWYgKG1vZGVDb25maWcuYm9vbGVhbk9wZXJhdGlvbiA9PT0gJ3VuaW9uJykge1xuICAgICAgICB1cGRhdGVkR2VvbWV0cnkgPSB0dXJmVW5pb24oc2VsZWN0ZWRGZWF0dXJlLCBmZWF0dXJlKTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZUNvbmZpZy5ib29sZWFuT3BlcmF0aW9uID09PSAnZGlmZmVyZW5jZScpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB1cGRhdGVkR2VvbWV0cnkgPSB0dXJmRGlmZmVyZW5jZShzZWxlY3RlZEZlYXR1cmUsIGZlYXR1cmUpO1xuICAgICAgfSBlbHNlIGlmIChtb2RlQ29uZmlnLmJvb2xlYW5PcGVyYXRpb24gPT09ICdpbnRlcnNlY3Rpb24nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdXBkYXRlZEdlb21ldHJ5ID0gdHVyZkludGVyc2VjdChzZWxlY3RlZEZlYXR1cmUsIGZlYXR1cmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUsbm8tdW5kZWZcbiAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIGJvb2xlYW5PcGVyYXRpb24gJHttb2RlQ29uZmlnLmJvb2xlYW5PcGVyYXRpb259YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVwZGF0ZWRHZW9tZXRyeSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSxuby11bmRlZlxuICAgICAgICBjb25zb2xlLndhcm4oJ0NhbmNlbGluZyBlZGl0LiBCb29sZWFuIG9wZXJhdGlvbiBlcmFzZWQgZW50aXJlIHBvbHlnb24uJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmZWF0dXJlSW5kZXggPSBwcm9wcy5zZWxlY3RlZEluZGV4ZXNbMF07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWREYXRhID0gbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKHByb3BzLmRhdGEpXG4gICAgICAgIC5yZXBsYWNlR2VvbWV0cnkoZmVhdHVyZUluZGV4LCB1cGRhdGVkR2VvbWV0cnkuZ2VvbWV0cnkpXG4gICAgICAgIC5nZXRPYmplY3QoKTtcblxuICAgICAgY29uc3QgZWRpdEFjdGlvbjogR2VvSnNvbkVkaXRBY3Rpb24gPSB7XG4gICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICBlZGl0VHlwZTogJ3VuaW9uR2VvbWV0cnknLFxuICAgICAgICBlZGl0Q29udGV4dDoge1xuICAgICAgICAgIGZlYXR1cmVJbmRleGVzOiBbZmVhdHVyZUluZGV4XSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBlZGl0QWN0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRBZGRGZWF0dXJlQWN0aW9uKGZlYXR1cmVPckdlb21ldHJ5LCBwcm9wcy5kYXRhKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBDbGlja0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6IHZvaWQge31cbiAgaGFuZGxlUG9pbnRlck1vdmUoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7fVxuICBoYW5kbGVTdGFydERyYWdnaW5nKGV2ZW50OiBTdGFydERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7fVxuICBoYW5kbGVTdG9wRHJhZ2dpbmcoZXZlbnQ6IFN0b3BEcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6IHZvaWQge31cbiAgaGFuZGxlRHJhZ2dpbmcoZXZlbnQ6IERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7fVxuXG4gIGhhbmRsZUtleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6IHZvaWQge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICB0aGlzLnJlc2V0Q2xpY2tTZXF1ZW5jZSgpO1xuICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgbmV3IGRyYXdpbmcgZmVhdHVyZSBpcyBkcm9wcGVkLCBzbyB0aGUgZGF0YSB3aWxsIGtlZXAgYXMgdGhlIHNhbWUuXG4gICAgICAgIHVwZGF0ZWREYXRhOiBwcm9wcy5kYXRhLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbmNlbEZlYXR1cmUnLFxuICAgICAgICBlZGl0Q29udGV4dDoge30sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVybWVkaWF0ZVBvc2l0aW9uKHBvc2l0aW9uMTogUG9zaXRpb24sIHBvc2l0aW9uMjogUG9zaXRpb24pOiBQb3NpdGlvbiB7XG4gIGNvbnN0IGludGVybWVkaWF0ZVBvc2l0aW9uID0gW1xuICAgIChwb3NpdGlvbjFbMF0gKyBwb3NpdGlvbjJbMF0pIC8gMi4wLFxuICAgIChwb3NpdGlvbjFbMV0gKyBwb3NpdGlvbjJbMV0pIC8gMi4wLFxuICBdO1xuICAvLyBAdHMtaWdub3JlXG4gIHJldHVybiBpbnRlcm1lZGlhdGVQb3NpdGlvbjtcbn1cbiJdfQ==
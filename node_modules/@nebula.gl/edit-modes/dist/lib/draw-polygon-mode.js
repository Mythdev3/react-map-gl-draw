"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawPolygonMode = void 0;

var _utils = require("../utils");

var _geojsonEditMode = require("./geojson-edit-mode");

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

var DrawPolygonMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(DrawPolygonMode, _GeoJsonEditMode);

  var _super = _createSuper(DrawPolygonMode);

  function DrawPolygonMode() {
    _classCallCheck(this, DrawPolygonMode);

    return _super.apply(this, arguments);
  }

  _createClass(DrawPolygonMode, [{
    key: "getGuides",
    value: function getGuides(props) {
      var _guides$features;

      var lastPointerMoveEvent = props.lastPointerMoveEvent;
      var clickSequence = this.getClickSequence();
      var lastCoords = lastPointerMoveEvent ? [lastPointerMoveEvent.mapCoords] : [];
      var guides = {
        type: 'FeatureCollection',
        features: []
      };
      var tentativeFeature;

      if (clickSequence.length === 1 || clickSequence.length === 2) {
        tentativeFeature = {
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'LineString',
            coordinates: [].concat(_toConsumableArray(clickSequence), lastCoords)
          }
        };
      } else if (clickSequence.length > 2) {
        tentativeFeature = {
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[].concat(_toConsumableArray(clickSequence), lastCoords, [clickSequence[0]])]
          }
        };
      }

      if (tentativeFeature) {
        guides.features.push(tentativeFeature);
      }

      var editHandles = clickSequence.map(function (clickedCoord, index) {
        return {
          type: 'Feature',
          properties: {
            guideType: 'editHandle',
            editHandleType: 'existing',
            featureIndex: -1,
            positionIndexes: [index]
          },
          geometry: {
            type: 'Point',
            coordinates: clickedCoord
          }
        };
      });

      (_guides$features = guides.features).push.apply(_guides$features, _toConsumableArray(editHandles)); // @ts-ignore


      return guides;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, props) {
      var picks = event.picks;
      var clickedEditHandle = (0, _utils.getPickedEditHandle)(picks);
      var positionAdded = false;

      if (!clickedEditHandle) {
        // Don't add another point right next to an existing one
        this.addClickSequence(event);
        positionAdded = true;
      }

      var clickSequence = this.getClickSequence();

      if (clickSequence.length > 2 && clickedEditHandle && Array.isArray(clickedEditHandle.properties.positionIndexes) && (clickedEditHandle.properties.positionIndexes[0] === 0 || clickedEditHandle.properties.positionIndexes[0] === clickSequence.length - 1)) {
        // They clicked the first or last point (or double-clicked), so complete the polygon
        // Remove the hovered position
        var polygonToAdd = {
          type: 'Polygon',
          coordinates: [[].concat(_toConsumableArray(clickSequence), [clickSequence[0]])]
        };
        this.resetClickSequence();
        var editAction = this.getAddFeatureOrBooleanPolygonAction(polygonToAdd, props);

        if (editAction) {
          props.onEdit(editAction);
        }
      } else if (positionAdded) {
        // new tentative point
        props.onEdit({
          // data is the same
          updatedData: props.data,
          editType: 'addTentativePosition',
          editContext: {
            position: event.mapCoords
          }
        });
      }
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(_ref, props) {
      var mapCoords = _ref.mapCoords;
      props.onUpdateCursor('cell');
    }
  }]);

  return DrawPolygonMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.DrawPolygonMode = DrawPolygonMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZHJhdy1wb2x5Z29uLW1vZGUudHMiXSwibmFtZXMiOlsiRHJhd1BvbHlnb25Nb2RlIiwicHJvcHMiLCJsYXN0UG9pbnRlck1vdmVFdmVudCIsImNsaWNrU2VxdWVuY2UiLCJnZXRDbGlja1NlcXVlbmNlIiwibGFzdENvb3JkcyIsIm1hcENvb3JkcyIsImd1aWRlcyIsInR5cGUiLCJmZWF0dXJlcyIsInRlbnRhdGl2ZUZlYXR1cmUiLCJsZW5ndGgiLCJwcm9wZXJ0aWVzIiwiZ3VpZGVUeXBlIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsInB1c2giLCJlZGl0SGFuZGxlcyIsIm1hcCIsImNsaWNrZWRDb29yZCIsImluZGV4IiwiZWRpdEhhbmRsZVR5cGUiLCJmZWF0dXJlSW5kZXgiLCJwb3NpdGlvbkluZGV4ZXMiLCJldmVudCIsInBpY2tzIiwiY2xpY2tlZEVkaXRIYW5kbGUiLCJwb3NpdGlvbkFkZGVkIiwiYWRkQ2xpY2tTZXF1ZW5jZSIsIkFycmF5IiwiaXNBcnJheSIsInBvbHlnb25Ub0FkZCIsInJlc2V0Q2xpY2tTZXF1ZW5jZSIsImVkaXRBY3Rpb24iLCJnZXRBZGRGZWF0dXJlT3JCb29sZWFuUG9seWdvbkFjdGlvbiIsIm9uRWRpdCIsInVwZGF0ZWREYXRhIiwiZGF0YSIsImVkaXRUeXBlIiwiZWRpdENvbnRleHQiLCJwb3NpdGlvbiIsIm9uVXBkYXRlQ3Vyc29yIiwiR2VvSnNvbkVkaXRNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxlOzs7Ozs7Ozs7Ozs7OzhCQUNEQyxLLEVBQTZEO0FBQUE7O0FBQUEsVUFDN0RDLG9CQUQ2RCxHQUNwQ0QsS0FEb0MsQ0FDN0RDLG9CQUQ2RDtBQUVyRSxVQUFNQyxhQUFhLEdBQUcsS0FBS0MsZ0JBQUwsRUFBdEI7QUFFQSxVQUFNQyxVQUFVLEdBQUdILG9CQUFvQixHQUFHLENBQUNBLG9CQUFv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YUFBYSxDQUFDUSxNQUFkLEdBQXVCLENBSjdFLENBREYsRUFNRTtBQUNBO0FBRUE7QUFDQSxZQUFNb0IsWUFBcUIsR0FBRztBQUM1QnZCLFVBQUFBLElBQUksRUFBRSxTQURzQjtBQUU1Qk8sVUFBQUEsV0FBVyxFQUFFLDhCQUFLWixhQUFMLElBQW9CQSxhQUFhLENBQUMsQ0FBRCxDQUFqQztBQUZlLFNBQTlCO0FBS0EsYUFBSzZCLGtCQUFMO0FBRUEsWUFBTUMsVUFBVSxHQUFHLEtBQUtDLG1DQUFMLENBQXlDSCxZQUF6QyxFQUF1RDlCLEtBQXZELENBQW5COztBQUNBLFlBQUlnQyxVQUFKLEVBQWdCO0FBQ2RoQyxVQUFBQSxLQUFLLENBQUNrQyxNQUFOLENBQWFGLFVBQWI7QUFDRDtBQUNGLE9BckJELE1BcUJPLElBQUlOLGFBQUosRUFBbUI7QUFDeEI7QUFDQTFCLFFBQUFBLEtBQUssQ0FBQ2tDLE1BQU4sQ0FBYTtBQUNYO0FBQ0FDLFVBQUFBLFdBQVcsRUFBRW5DLEtBQUssQ0FBQ29DLElBRlI7QUFHWEMsVUFBQUEsUUFBUSxFQUFFLHNCQUhDO0FBSVhDLFVBQUFBLFdBQVcsRUFBRTtBQUNYQyxZQUFBQSxRQUFRLEVBQUVoQixLQUFLLENBQUNsQjtBQURMO0FBSkYsU0FBYjtBQVFEO0FBQ0Y7Ozs0Q0FFa0RMLEssRUFBcUM7QUFBQSxVQUFwRUssU0FBb0UsUUFBcEVBLFNBQW9FO0FBQ3RGTCxNQUFBQSxLQUFLLENBQUN3QyxjQUFOLENBQXFCLE1BQXJCO0FBQ0Q7Ozs7RUE1R2tDQyxnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWNrRXZlbnQsIFBvaW50ZXJNb3ZlRXZlbnQsIE1vZGVQcm9wcywgR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBvbHlnb24sIEZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnLi4vZ2VvanNvbi10eXBlcyc7XG5pbXBvcnQgeyBnZXRQaWNrZWRFZGl0SGFuZGxlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgR2VvSnNvbkVkaXRNb2RlIH0gZnJvbSAnLi9nZW9qc29uLWVkaXQtbW9kZSc7XG5cbmV4cG9ydCBjbGFzcyBEcmF3UG9seWdvbk1vZGUgZXh0ZW5kcyBHZW9Kc29uRWRpdE1vZGUge1xuICBnZXRHdWlkZXMocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiBHdWlkZUZlYXR1cmVDb2xsZWN0aW9uIHtcbiAgICBjb25zdCB7IGxhc3RQb2ludGVyTW92ZUV2ZW50IH0gPSBwcm9wcztcbiAgICBjb25zdCBjbGlja1NlcXVlbmNlID0gdGhpcy5nZXRDbGlja1NlcXVlbmNlKCk7XG5cbiAgICBjb25zdCBsYXN0Q29vcmRzID0gbGFzdFBvaW50ZXJNb3ZlRXZlbnQgPyBbbGFzdFBvaW50ZXJNb3ZlRXZlbnQubWFwQ29vcmRzXSA6IFtdO1xuXG4gICAgY29uc3QgZ3VpZGVzID0ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICB9O1xuXG4gICAgbGV0IHRlbnRhdGl2ZUZlYXR1cmU7XG4gICAgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoID09PSAxIHx8IGNsaWNrU2VxdWVuY2UubGVuZ3RoID09PSAyKSB7XG4gICAgICB0ZW50YXRpdmVGZWF0dXJlID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBndWlkZVR5cGU6ICd0ZW50YXRpdmUnLFxuICAgICAgICB9LFxuICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJyxcbiAgICAgICAgICBjb29yZGluYXRlczogWy4uLmNsaWNrU2VxdWVuY2UsIC4uLmxhc3RDb29yZHNdLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoID4gMikge1xuICAgICAgdGVudGF0aXZlRmVhdHVyZSA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZ3VpZGVUeXBlOiAndGVudGF0aXZlJyxcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IFtbLi4uY2xpY2tTZXF1ZW5jZSwgLi4ubGFzdENvb3JkcywgY2xpY2tTZXF1ZW5jZVswXV1dLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGVudGF0aXZlRmVhdHVyZSkge1xuICAgICAgZ3VpZGVzLmZlYXR1cmVzLnB1c2godGVudGF0aXZlRmVhdHVyZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZWRpdEhhbmRsZXMgPSBjbGlja1NlcXVlbmNlLm1hcCgoY2xpY2tlZENvb3JkLCBpbmRleCkgPT4gKHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZ3VpZGVUeXBlOiAnZWRpdEhhbmRsZScsXG4gICAgICAgIGVkaXRIYW5kbGVUeXBlOiAnZXhpc3RpbmcnLFxuICAgICAgICBmZWF0dXJlSW5kZXg6IC0xLFxuICAgICAgICBwb3NpdGlvbkluZGV4ZXM6IFtpbmRleF0sXG4gICAgICB9LFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNsaWNrZWRDb29yZCxcbiAgICAgIH0sXG4gICAgfSkpO1xuXG4gICAgZ3VpZGVzLmZlYXR1cmVzLnB1c2goLi4uZWRpdEhhbmRsZXMpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gZ3VpZGVzO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgY29uc3QgeyBwaWNrcyB9ID0gZXZlbnQ7XG4gICAgY29uc3QgY2xpY2tlZEVkaXRIYW5kbGUgPSBnZXRQaWNrZWRFZGl0SGFuZGxlKHBpY2tzKTtcblxuICAgIGxldCBwb3NpdGlvbkFkZGVkID0gZmFsc2U7XG4gICAgaWYgKCFjbGlja2VkRWRpdEhhbmRsZSkge1xuICAgICAgLy8gRG9uJ3QgYWRkIGFub3RoZXIgcG9pbnQgcmlnaHQgbmV4dCB0byBhbiBleGlzdGluZyBvbmVcbiAgICAgIHRoaXMuYWRkQ2xpY2tTZXF1ZW5jZShldmVudCk7XG4gICAgICBwb3NpdGlvbkFkZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgY2xpY2tTZXF1ZW5jZSA9IHRoaXMuZ2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgaWYgKFxuICAgICAgY2xpY2tTZXF1ZW5jZS5sZW5ndGggPiAyICYmXG4gICAgICBjbGlja2VkRWRpdEhhbmRsZSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjbGlja2VkRWRpdEhhbmRsZS5wcm9wZXJ0aWVzLnBvc2l0aW9uSW5kZXhlcykgJiZcbiAgICAgIChjbGlja2VkRWRpdEhhbmRsZS5wcm9wZXJ0aWVzLnBvc2l0aW9uSW5kZXhlc1swXSA9PT0gMCB8fFxuICAgICAgICBjbGlja2VkRWRpdEhhbmRsZS5wcm9wZXJ0aWVzLnBvc2l0aW9uSW5kZXhlc1swXSA9PT0gY2xpY2tTZXF1ZW5jZS5sZW5ndGggLSAxKVxuICAgICkge1xuICAgICAgLy8gVGhleSBjbGlja2VkIHRoZSBmaXJzdCBvciBsYXN0IHBvaW50IChvciBkb3VibGUtY2xpY2tlZCksIHNvIGNvbXBsZXRlIHRoZSBwb2x5Z29uXG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgaG92ZXJlZCBwb3NpdGlvblxuICAgICAgY29uc3QgcG9seWdvblRvQWRkOiBQb2x5Z29uID0ge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbWy4uLmNsaWNrU2VxdWVuY2UsIGNsaWNrU2VxdWVuY2VbMF1dXSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucmVzZXRDbGlja1NlcXVlbmNlKCk7XG5cbiAgICAgIGNvbnN0IGVkaXRBY3Rpb24gPSB0aGlzLmdldEFkZEZlYXR1cmVPckJvb2xlYW5Qb2x5Z29uQWN0aW9uKHBvbHlnb25Ub0FkZCwgcHJvcHMpO1xuICAgICAgaWYgKGVkaXRBY3Rpb24pIHtcbiAgICAgICAgcHJvcHMub25FZGl0KGVkaXRBY3Rpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocG9zaXRpb25BZGRlZCkge1xuICAgICAgLy8gbmV3IHRlbnRhdGl2ZSBwb2ludFxuICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgLy8gZGF0YSBpcyB0aGUgc2FtZVxuICAgICAgICB1cGRhdGVkRGF0YTogcHJvcHMuZGF0YSxcbiAgICAgICAgZWRpdFR5cGU6ICdhZGRUZW50YXRpdmVQb3NpdGlvbicsXG4gICAgICAgIGVkaXRDb250ZXh0OiB7XG4gICAgICAgICAgcG9zaXRpb246IGV2ZW50Lm1hcENvb3JkcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVBvaW50ZXJNb3ZlKHsgbWFwQ29vcmRzIH06IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgcHJvcHMub25VcGRhdGVDdXJzb3IoJ2NlbGwnKTtcbiAgfVxufVxuIl19
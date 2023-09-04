"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoClickPolygonMode = void 0;

var _geojsonEditMode = require("./geojson-edit-mode");

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

var TwoClickPolygonMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(TwoClickPolygonMode, _GeoJsonEditMode);

  var _super = _createSuper(TwoClickPolygonMode);

  function TwoClickPolygonMode() {
    _classCallCheck(this, TwoClickPolygonMode);

    return _super.apply(this, arguments);
  }

  _createClass(TwoClickPolygonMode, [{
    key: "handleClick",
    value: function handleClick(event, props) {
      if (props.modeConfig && props.modeConfig.dragToDraw) {
        // handled in drag handlers
        return;
      }

      this.addClickSequence(event);
      this.checkAndFinishPolygon(props);
    }
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {
      if (!props.modeConfig || !props.modeConfig.dragToDraw) {
        // handled in click handlers
        return;
      }

      this.addClickSequence(event);
      event.cancelPan();
    }
  }, {
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {
      if (!props.modeConfig || !props.modeConfig.dragToDraw) {
        // handled in click handlers
        return;
      }

      this.addClickSequence(event);
      this.checkAndFinishPolygon(props);
    }
  }, {
    key: "checkAndFinishPolygon",
    value: function checkAndFinishPolygon(props) {
      var clickSequence = this.getClickSequence();
      var tentativeFeature = this.getTentativeGuide(props);

      if (clickSequence.length > 1 && tentativeFeature && tentativeFeature.geometry.type === 'Polygon') {
        var feature = {
          type: 'Feature',
          properties: {
            shape: tentativeFeature.properties.shape
          },
          geometry: {
            type: 'Polygon',
            coordinates: tentativeFeature.geometry.coordinates
          }
        };
        var editAction = this.getAddFeatureOrBooleanPolygonAction(feature, props);
        this.resetClickSequence();

        if (editAction) {
          props.onEdit(editAction);
        }
      }
    }
  }, {
    key: "getGuides",
    value: function getGuides(props) {
      var lastPointerMoveEvent = props.lastPointerMoveEvent,
          modeConfig = props.modeConfig;
      var clickSequence = this.getClickSequence();
      var guides = {
        type: 'FeatureCollection',
        features: []
      };

      if (clickSequence.length === 0) {
        // nothing to do yet
        return guides;
      }

      var corner1 = clickSequence[0];
      var corner2 = lastPointerMoveEvent.mapCoords;
      var polygon = this.getTwoClickPolygon(corner1, corner2, modeConfig);

      if (polygon) {
        guides.features.push({
          type: 'Feature',
          properties: {
            shape: polygon.properties && polygon.properties.shape,
            guideType: 'tentative'
          },
          geometry: polygon.geometry
        });
      }

      return guides;
    }
  }, {
    key: "getTwoClickPolygon",
    value: function getTwoClickPolygon(coord1, coord2, modeConfig) {
      return null;
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      props.onUpdateCursor('cell');
    }
  }]);

  return TwoClickPolygonMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.TwoClickPolygonMode = TwoClickPolygonMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHdvLWNsaWNrLXBvbHlnb24tbW9kZS50cyJdLCJuYW1lcyI6WyJUd29DbGlja1BvbHlnb25Nb2RlIiwiZXZlbnQiLCJwcm9wcyIsIm1vZGVDb25maWciLCJkcmFnVG9EcmF3IiwiYWRkQ2xpY2tTZXF1ZW5jZSIsImNoZWNrQW5kRmluaXNoUG9seWdvbiIsImNhbmNlbFBhbiIsImNsaWNrU2VxdWVuY2UiLCJnZXRDbGlja1NlcXVlbmNlIiwidGVudGF0aXZlRmVhdHVyZSIsImdldFRlbnRhdGl2ZUd1aWRlIiwibGVuZ3RoIiwiZ2VvbWV0cnkiLCJ0eXBlIiwiZmVhdHVyZSIsInByb3BlcnRpZXMiLCJzaGFwZSIsImNvb3JkaW5hdGVzIiwiZWRpdEFjdGlvbiIsImdldEFkZEZlYXR1cmVPckJvb2xlYW5Qb2x5Z29uQWN0aW9uIiwicmVzZXRDbGlja1NlcXVlbmNlIiwib25FZGl0IiwibGFzdFBvaW50ZXJNb3ZlRXZlbnQiLCJndWlkZXMiLCJmZWF0dXJlcyIsImNvcm5lcjEiLCJjb3JuZXIyIiwibWFwQ29vcmRzIiwicG9seWdvbiIsImdldFR3b0NsaWNrUG9seWdvbiIsInB1c2giLCJndWlkZVR5cGUiLCJjb29yZDEiLCJjb29yZDIiLCJvblVwZGF0ZUN1cnNvciIsIkdlb0pzb25FZGl0TW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsbUI7Ozs7Ozs7Ozs7Ozs7Z0NBQ0NDLEssRUFBbUJDLEssRUFBcUM7QUFDbEUsVUFBSUEsS0FBSyxDQUFDQyxVQUFOLElBQW9CRCxLQUFLLENBQUNDLFVBQU4sQ0FBaUJDLFVBQXpDLEVBQXFEO0FBQ25EO0FBQ0E7QUFDRDs7QUFFRCxXQUFLQyxnQkFBTCxDQUFzQkosS0FBdEI7QUFFQSxXQUFLSyxxQkFBTCxDQUEyQkosS0FBM0I7QUFDRDs7O3dDQUVtQkQsSyxFQUEyQkMsSyxFQUEyQztBQUN4RixVQUFJLENBQUNBLEtBQUssQ0FBQ0Ms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QkYsSyxFQUF5QkMsSyxFQUFxQztBQUM5RUEsTUFBQUEsS0FBSyxDQUFDaUMsY0FBTixDQUFxQixNQUFyQjtBQUNEOzs7O0VBdkdzQ0MsZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDbGlja0V2ZW50LFxuICBTdGFydERyYWdnaW5nRXZlbnQsXG4gIFN0b3BEcmFnZ2luZ0V2ZW50LFxuICBQb2ludGVyTW92ZUV2ZW50LFxuICBNb2RlUHJvcHMsXG4gIEd1aWRlRmVhdHVyZUNvbGxlY3Rpb24sXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBvbHlnb24sIEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlT2YsIFBvc2l0aW9uIH0gZnJvbSAnLi4vZ2VvanNvbi10eXBlcyc7XG5pbXBvcnQgeyBHZW9Kc29uRWRpdE1vZGUgfSBmcm9tICcuL2dlb2pzb24tZWRpdC1tb2RlJztcblxuZXhwb3J0IGNsYXNzIFR3b0NsaWNrUG9seWdvbk1vZGUgZXh0ZW5kcyBHZW9Kc29uRWRpdE1vZGUge1xuICBoYW5kbGVDbGljayhldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBpZiAocHJvcHMubW9kZUNvbmZpZyAmJiBwcm9wcy5tb2RlQ29uZmlnLmRyYWdUb0RyYXcpIHtcbiAgICAgIC8vIGhhbmRsZWQgaW4gZHJhZyBoYW5kbGVyc1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xpY2tTZXF1ZW5jZShldmVudCk7XG5cbiAgICB0aGlzLmNoZWNrQW5kRmluaXNoUG9seWdvbihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVTdGFydERyYWdnaW5nKGV2ZW50OiBTdGFydERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7XG4gICAgaWYgKCFwcm9wcy5tb2RlQ29uZmlnIHx8ICFwcm9wcy5tb2RlQ29uZmlnLmRyYWdUb0RyYXcpIHtcbiAgICAgIC8vIGhhbmRsZWQgaW4gY2xpY2sgaGFuZGxlcnNcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsaWNrU2VxdWVuY2UoZXZlbnQpO1xuICAgIGV2ZW50LmNhbmNlbFBhbigpO1xuICB9XG5cbiAgaGFuZGxlU3RvcERyYWdnaW5nKGV2ZW50OiBTdG9wRHJhZ2dpbmdFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiB2b2lkIHtcbiAgICBpZiAoIXByb3BzLm1vZGVDb25maWcgfHwgIXByb3BzLm1vZGVDb25maWcuZHJhZ1RvRHJhdykge1xuICAgICAgLy8gaGFuZGxlZCBpbiBjbGljayBoYW5kbGVyc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkZENsaWNrU2VxdWVuY2UoZXZlbnQpO1xuXG4gICAgdGhpcy5jaGVja0FuZEZpbmlzaFBvbHlnb24ocHJvcHMpO1xuICB9XG5cbiAgY2hlY2tBbmRGaW5pc2hQb2x5Z29uKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgY29uc3QgY2xpY2tTZXF1ZW5jZSA9IHRoaXMuZ2V0Q2xpY2tTZXF1ZW5jZSgpO1xuICAgIGNvbnN0IHRlbnRhdGl2ZUZlYXR1cmUgPSB0aGlzLmdldFRlbnRhdGl2ZUd1aWRlKHByb3BzKTtcblxuICAgIGlmIChcbiAgICAgIGNsaWNrU2VxdWVuY2UubGVuZ3RoID4gMSAmJlxuICAgICAgdGVudGF0aXZlRmVhdHVyZSAmJlxuICAgICAgdGVudGF0aXZlRmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9seWdvbidcbiAgICApIHtcbiAgICAgIGNvbnN0IGZlYXR1cmU6IEZlYXR1cmVPZjxQb2x5Z29uPiA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgc2hhcGU6IHRlbnRhdGl2ZUZlYXR1cmUucHJvcGVydGllcy5zaGFwZSxcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHRlbnRhdGl2ZUZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZWRpdEFjdGlvbiA9IHRoaXMuZ2V0QWRkRmVhdHVyZU9yQm9vbGVhblBvbHlnb25BY3Rpb24oZmVhdHVyZSwgcHJvcHMpO1xuXG4gICAgICB0aGlzLnJlc2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgICBpZiAoZWRpdEFjdGlvbikge1xuICAgICAgICBwcm9wcy5vbkVkaXQoZWRpdEFjdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0R3VpZGVzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgeyBsYXN0UG9pbnRlck1vdmVFdmVudCwgbW9kZUNvbmZpZyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2xpY2tTZXF1ZW5jZSA9IHRoaXMuZ2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgY29uc3QgZ3VpZGVzOiBHdWlkZUZlYXR1cmVDb2xsZWN0aW9uID0ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICB9O1xuXG4gICAgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBub3RoaW5nIHRvIGRvIHlldFxuICAgICAgcmV0dXJuIGd1aWRlcztcbiAgICB9XG5cbiAgICBjb25zdCBjb3JuZXIxID0gY2xpY2tTZXF1ZW5jZVswXTtcbiAgICBjb25zdCBjb3JuZXIyID0gbGFzdFBvaW50ZXJNb3ZlRXZlbnQubWFwQ29vcmRzO1xuXG4gICAgY29uc3QgcG9seWdvbiA9IHRoaXMuZ2V0VHdvQ2xpY2tQb2x5Z29uKGNvcm5lcjEsIGNvcm5lcjIsIG1vZGVDb25maWcpO1xuICAgIGlmIChwb2x5Z29uKSB7XG4gICAgICBndWlkZXMuZmVhdHVyZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHNoYXBlOiBwb2x5Z29uLnByb3BlcnRpZXMgJiYgcG9seWdvbi5wcm9wZXJ0aWVzLnNoYXBlLFxuICAgICAgICAgIGd1aWRlVHlwZTogJ3RlbnRhdGl2ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiBwb2x5Z29uLmdlb21ldHJ5LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGd1aWRlcztcbiAgfVxuXG4gIGdldFR3b0NsaWNrUG9seWdvbihcbiAgICBjb29yZDE6IFBvc2l0aW9uLFxuICAgIGNvb3JkMjogUG9zaXRpb24sXG4gICAgbW9kZUNvbmZpZzogYW55XG4gICk6IEZlYXR1cmVPZjxQb2x5Z29uPiB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgcHJvcHMub25VcGRhdGVDdXJzb3IoJ2NlbGwnKTtcbiAgfVxufVxuIl19
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThreeClickPolygonMode = void 0;

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

var ThreeClickPolygonMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(ThreeClickPolygonMode, _GeoJsonEditMode);

  var _super = _createSuper(ThreeClickPolygonMode);

  function ThreeClickPolygonMode() {
    _classCallCheck(this, ThreeClickPolygonMode);

    return _super.apply(this, arguments);
  }

  _createClass(ThreeClickPolygonMode, [{
    key: "handleClick",
    value: function handleClick(event, props) {
      this.addClickSequence(event);
      var clickSequence = this.getClickSequence();
      var tentativeFeature = this.getTentativeGuide(props);

      if (clickSequence.length > 2 && tentativeFeature && tentativeFeature.geometry.type === 'Polygon') {
        var editAction = this.getAddFeatureOrBooleanPolygonAction(tentativeFeature.geometry, props);
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

      var hoveredCoord = lastPointerMoveEvent.mapCoords;

      if (clickSequence.length === 1) {
        guides.features.push({
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'LineString',
            coordinates: [clickSequence[0], hoveredCoord]
          }
        });
      } else {
        var polygon = this.getThreeClickPolygon(clickSequence[0], clickSequence[1], hoveredCoord, modeConfig);

        if (polygon) {
          guides.features.push({
            type: 'Feature',
            properties: {
              guideType: 'tentative'
            },
            geometry: polygon.geometry
          });
        }
      }

      return guides;
    }
  }, {
    key: "getThreeClickPolygon",
    value: function getThreeClickPolygon(coord1, coord2, coord3, modeConfig) {
      return null;
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      props.onUpdateCursor('cell');
    }
  }]);

  return ThreeClickPolygonMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.ThreeClickPolygonMode = ThreeClickPolygonMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGhyZWUtY2xpY2stcG9seWdvbi1tb2RlLnRzIl0sIm5hbWVzIjpbIlRocmVlQ2xpY2tQb2x5Z29uTW9kZSIsImV2ZW50IiwicHJvcHMiLCJhZGRDbGlja1NlcXVlbmNlIiwiY2xpY2tTZXF1ZW5jZSIsImdldENsaWNrU2VxdWVuY2UiLCJ0ZW50YXRpdmVGZWF0dXJlIiwiZ2V0VGVudGF0aXZlR3VpZGUiLCJsZW5ndGgiLCJnZW9tZXRyeSIsInR5cGUiLCJlZGl0QWN0aW9uIiwiZ2V0QWRkRmVhdHVyZU9yQm9vbGVhblBvbHlnb25BY3Rpb24iLCJyZXNldENsaWNrU2VxdWVuY2UiLCJvbkVkaXQiLCJsYXN0UG9pbnRlck1vdmVFdmVudCIsIm1vZGVDb25maWciLCJndWlkZXMiLCJmZWF0dXJlcyIsImhvdmVyZWRDb29yZCIsIm1hcENvb3JkcyIsInB1c2giLCJwcm9wZXJ0aWVzIiwiZ3VpZGVUeXBlIiwiY29vcmRpbmF0ZXMiLCJwb2x5Z29uIiwiZ2V0VGhyZWVDbGlja1BvbHlnb24iLCJjb29yZDEiLCJjb29yZDIiLCJjb29yZDMiLCJvblVwZGF0ZUN1cnNvciIsIkdlb0pzb25FZGl0TW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEscUI7Ozs7Ozs7Ozs7Ozs7Z0NBQ0NDLEssRUFBbUJDLEssRUFBcUM7QUFDbEUsV0FBS0MsZ0JBQUwsQ0FBc0JGLEtBQXRCO0FBQ0EsVUFBTUcsYUFBYSxHQUFHLEtBQUtDLGdCQUFMLEVBQXRCO0FBQ0EsVUFBTUMsZ0JBQWdCLEdBQUcsS0FBS0MsaUJBQUwsQ0FBdUJMLEtBQXZCLENBQXpCOztBQUVBLFVBQ0VFLGFBQWEsQ0FBQ0ksTUFBZCxHQUF1QixDQUF2QixJQUNBRixnQkFEQSxJQUVBQSxnQkFBZ0IsQ0FBQ0csUUFBakIsQ0FBMEJDLElBQTFCLEtBQW1DLFNBSHJDLEVBSUU7QUFDQSxZQUFNQyxVQUFVLEdBQUcsS0FBS0MsbUNBQUwsQ0FBeUNOLGdCQUFnQixDQUFDRyxRQUExRCxFQUFvRVAsS0FBcEUsQ0FBbkI7QUFDQSxhQUFLVyxrQkFBTDs7QUFFQSxZQUFJRixVQUFKLEVBQWdCO0FBQ2RULFVBQUFBLEtBQUssQ0FBQ1ksTUFBTixDQUFhSCxVQUFiO0FBQ0Q7QUFDRjtBQUNGOzs7OEJBRVNULEssRUFBNkQ7QUFBQSxVQUM3RGEsb0JBRDZELEdBQ3hCYixLQUR3QixDQUM3RGEsb0JBRDZEO0FBQUEsVUFDdkNDLFVBRHVDLEdBQ3hCZCxLQUR3QixDQUN2Q2MsVUFEdUM7QUFFckUsVUFBTVosYUFBYSxHQUFHLEtBQUtDLGdCQUFMLEVBQXRCO0FBRUEsVUFBTVksTUFBOEIsR0FBRztBQUNyQ1AsUUFBQUEsSUFBSSxFQUFFLG1CQUQrQjtBQUVyQ1EsUUFBQUEsUUFBUSxFQUFFO0FBRjJCLE9BQXZDOztBQUtBLFVBQUlkLGFBQWEsQ0FBQ0ksTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM5QjtBQUNBLGVBQU9TLE1BQVA7QUFDRDs7QUFFRCxVQUFNRSxZQUFZLEdBQUdKLG9CQUFvQixDQUFDSyxTQUExQzs7QUFFQSxVQUFJaEIsYUFBYSxDQUFDSSxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCUyxRQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JHLElBQWhCLENBQXFCO0FBQ25CWCxVQUFBQSxJQUFJLEVBQUUsU0FEYTtBQUVuQlksVUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFlBQUFBLFNBQVMsRUFBRTtBQURELFdBRk87QUFLbkJkLFVBQUFBLFFBQVEsRUFBRTtBQUNSQyxZQUFBQSxJQUFJLEVBQUUsWUFERTtBQUVSYyxZQUFBQSxXQUFXLEVBQUUsQ0FBQ3BCLGFBQWEsQ0FBQyxDQUFELENBQWQsRUFBbUJlLFlBQW5CO0FBRkw7QUFMUyxTQUFyQjtBQVVELE9BWEQsTUFXTztBQUNMLFlBQU1NLE9BQU8sR0FBRyxLQUFLQyxvQkFBTCxDQUNkdEIsYUFBYSxDQUFDLENBQUQsQ0FEQyxFQUVkQSxhQUFhLENBQUMsQ0FBRCxDQUZDLEVBR2RlLFlBSGMsRUFJZEgsVUFKYyxDQUFoQjs7QUFNQSxZQUFJUyxPQUFKLEVBQWE7QUFDWFIsVUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCRyxJQUFoQixDQUFxQjtBQUNuQlgsWUFBQUEsSUFBSSxFQUFFLFNBRGE7QUFFbkJZLFlBQUFBLFVBQVUsRUFBRTtBQUNWQyxjQUFBQSxTQUFTLEVBQUU7QUFERCxhQUZPO0FBS25CZCxZQUFBQSxRQUFRLEVBQUVnQixPQUFPLENBQUNoQjtBQUxDLFdBQXJCO0FBT0Q7QUFDRjs7QUFFRCxhQUFPUSxNQUFQO0FBQ0Q7Ozt5Q0FHQ1UsTSxFQUNBQyxNLEVBQ0FDLE0sRUFDQWIsVSxFQUN1QztBQUN2QyxhQUFPLElBQVA7QUFDRDs7O3NDQUVpQmYsSyxFQUF5QkMsSyxFQUFxQztBQUM5RUEsTUFBQUEsS0FBSyxDQUFDNEIsY0FBTixDQUFxQixNQUFyQjtBQUNEOzs7O0VBL0V3Q0MsZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGlja0V2ZW50LCBQb2ludGVyTW92ZUV2ZW50LCBNb2RlUHJvcHMsIEd1aWRlRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBQb3NpdGlvbiwgUG9seWdvbiwgRmVhdHVyZU9mLCBGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHsgR2VvSnNvbkVkaXRNb2RlIH0gZnJvbSAnLi9nZW9qc29uLWVkaXQtbW9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUaHJlZUNsaWNrUG9seWdvbk1vZGUgZXh0ZW5kcyBHZW9Kc29uRWRpdE1vZGUge1xuICBoYW5kbGVDbGljayhldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICB0aGlzLmFkZENsaWNrU2VxdWVuY2UoZXZlbnQpO1xuICAgIGNvbnN0IGNsaWNrU2VxdWVuY2UgPSB0aGlzLmdldENsaWNrU2VxdWVuY2UoKTtcbiAgICBjb25zdCB0ZW50YXRpdmVGZWF0dXJlID0gdGhpcy5nZXRUZW50YXRpdmVHdWlkZShwcm9wcyk7XG5cbiAgICBpZiAoXG4gICAgICBjbGlja1NlcXVlbmNlLmxlbmd0aCA+IDIgJiZcbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUgJiZcbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nXG4gICAgKSB7XG4gICAgICBjb25zdCBlZGl0QWN0aW9uID0gdGhpcy5nZXRBZGRGZWF0dXJlT3JCb29sZWFuUG9seWdvbkFjdGlvbih0ZW50YXRpdmVGZWF0dXJlLmdlb21ldHJ5LCBwcm9wcyk7XG4gICAgICB0aGlzLnJlc2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgICBpZiAoZWRpdEFjdGlvbikge1xuICAgICAgICBwcm9wcy5vbkVkaXQoZWRpdEFjdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0R3VpZGVzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgeyBsYXN0UG9pbnRlck1vdmVFdmVudCwgbW9kZUNvbmZpZyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2xpY2tTZXF1ZW5jZSA9IHRoaXMuZ2V0Q2xpY2tTZXF1ZW5jZSgpO1xuXG4gICAgY29uc3QgZ3VpZGVzOiBHdWlkZUZlYXR1cmVDb2xsZWN0aW9uID0ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICB9O1xuXG4gICAgaWYgKGNsaWNrU2VxdWVuY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBub3RoaW5nIHRvIGRvIHlldFxuICAgICAgcmV0dXJuIGd1aWRlcztcbiAgICB9XG5cbiAgICBjb25zdCBob3ZlcmVkQ29vcmQgPSBsYXN0UG9pbnRlck1vdmVFdmVudC5tYXBDb29yZHM7XG5cbiAgICBpZiAoY2xpY2tTZXF1ZW5jZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGd1aWRlcy5mZWF0dXJlcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZ3VpZGVUeXBlOiAndGVudGF0aXZlJyxcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IFtjbGlja1NlcXVlbmNlWzBdLCBob3ZlcmVkQ29vcmRdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBvbHlnb24gPSB0aGlzLmdldFRocmVlQ2xpY2tQb2x5Z29uKFxuICAgICAgICBjbGlja1NlcXVlbmNlWzBdLFxuICAgICAgICBjbGlja1NlcXVlbmNlWzFdLFxuICAgICAgICBob3ZlcmVkQ29vcmQsXG4gICAgICAgIG1vZGVDb25maWdcbiAgICAgICk7XG4gICAgICBpZiAocG9seWdvbikge1xuICAgICAgICBndWlkZXMuZmVhdHVyZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGd1aWRlVHlwZTogJ3RlbnRhdGl2ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZW9tZXRyeTogcG9seWdvbi5nZW9tZXRyeSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGd1aWRlcztcbiAgfVxuXG4gIGdldFRocmVlQ2xpY2tQb2x5Z29uKFxuICAgIGNvb3JkMTogUG9zaXRpb24sXG4gICAgY29vcmQyOiBQb3NpdGlvbixcbiAgICBjb29yZDM6IFBvc2l0aW9uLFxuICAgIG1vZGVDb25maWc6IGFueVxuICApOiBGZWF0dXJlT2Y8UG9seWdvbj4gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGhhbmRsZVBvaW50ZXJNb3ZlKGV2ZW50OiBQb2ludGVyTW92ZUV2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIHByb3BzLm9uVXBkYXRlQ3Vyc29yKCdjZWxsJyk7XG4gIH1cbn1cbiJdfQ==
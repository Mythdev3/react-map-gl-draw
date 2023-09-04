"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawPointMode = void 0;

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

var DrawPointMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(DrawPointMode, _GeoJsonEditMode);

  var _super = _createSuper(DrawPointMode);

  function DrawPointMode() {
    _classCallCheck(this, DrawPointMode);

    return _super.apply(this, arguments);
  }

  _createClass(DrawPointMode, [{
    key: "handleClick",
    value: function handleClick(_ref, props) {
      var mapCoords = _ref.mapCoords;
      var geometry = {
        type: 'Point',
        coordinates: mapCoords
      }; // @ts-ignore

      props.onEdit(this.getAddFeatureAction(geometry, props.data));
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      props.onUpdateCursor('cell');
    }
  }]);

  return DrawPointMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.DrawPointMode = DrawPointMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZHJhdy1wb2ludC1tb2RlLnRzIl0sIm5hbWVzIjpbIkRyYXdQb2ludE1vZGUiLCJwcm9wcyIsIm1hcENvb3JkcyIsImdlb21ldHJ5IiwidHlwZSIsImNvb3JkaW5hdGVzIiwib25FZGl0IiwiZ2V0QWRkRmVhdHVyZUFjdGlvbiIsImRhdGEiLCJldmVudCIsIm9uVXBkYXRlQ3Vyc29yIiwiR2VvSnNvbkVkaXRNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxhOzs7Ozs7Ozs7Ozs7O3NDQUM0QkMsSyxFQUEyQztBQUFBLFVBQXBFQyxTQUFvRSxRQUFwRUEsU0FBb0U7QUFDaEYsVUFBTUMsUUFBUSxHQUFHO0FBQ2ZDLFFBQUFBLElBQUksRUFBRSxPQURTO0FBRWZDLFFBQUFBLFdBQVcsRUFBRUg7QUFGRSxPQUFqQixDQURnRixDQUtoRjs7QUFDQUQsTUFBQUEsS0FBSyxDQUFDSyxNQUFOLENBQWEsS0FBS0MsbUJBQUwsQ0FBeUJKLFFBQXpCLEVBQW1DRixLQUFLLENBQUNPLElBQXpDLENBQWI7QUFDRDs7O3NDQUVpQkMsSyxFQUF5QlIsSyxFQUFxQztBQUM5RUEsTUFBQUEsS0FBSyxDQUFDUyxjQUFOLENBQXFCLE1BQXJCO0FBQ0Q7Ozs7RUFaZ0NDLGdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpY2tFdmVudCwgUG9pbnRlck1vdmVFdmVudCwgTW9kZVByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9nZW9qc29uLXR5cGVzJztcbmltcG9ydCB7IEdlb0pzb25FZGl0TW9kZSB9IGZyb20gJy4vZ2VvanNvbi1lZGl0LW1vZGUnO1xuXG5leHBvcnQgY2xhc3MgRHJhd1BvaW50TW9kZSBleHRlbmRzIEdlb0pzb25FZGl0TW9kZSB7XG4gIGhhbmRsZUNsaWNrKHsgbWFwQ29vcmRzIH06IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IG1hcENvb3JkcyxcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcm9wcy5vbkVkaXQodGhpcy5nZXRBZGRGZWF0dXJlQWN0aW9uKGdlb21ldHJ5LCBwcm9wcy5kYXRhKSk7XG4gIH1cblxuICBoYW5kbGVQb2ludGVyTW92ZShldmVudDogUG9pbnRlck1vdmVFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBwcm9wcy5vblVwZGF0ZUN1cnNvcignY2VsbCcpO1xuICB9XG59XG4iXX0=
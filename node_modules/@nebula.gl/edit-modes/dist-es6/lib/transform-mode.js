"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformMode = void 0;

var _helpers = require("@turf/helpers");

var _translateMode = require("./translate-mode");

var _scaleMode = require("./scale-mode");

var _rotateMode = require("./rotate-mode");

var _compositeMode = require("./composite-mode");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TransformMode = /*#__PURE__*/function (_CompositeMode) {
  _inherits(TransformMode, _CompositeMode);

  var _super = _createSuper(TransformMode);

  function TransformMode() {
    _classCallCheck(this, TransformMode);

    return _super.call(this, [new _translateMode.TranslateMode(), new _scaleMode.ScaleMode(), new _rotateMode.RotateMode()]);
  }

  _createClass(TransformMode, [{
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      var updatedCursor = null;

      _get(_getPrototypeOf(TransformMode.prototype), "handlePointerMove", this).call(this, event, _objectSpread({}, props, {
        onUpdateCursor: function onUpdateCursor(cursor) {
          updatedCursor = cursor || updatedCursor;
        }
      }));

      props.onUpdateCursor(updatedCursor);
    }
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {
      var scaleMode = null;
      var translateMode = null;
      var filteredModes = []; // If the user selects a scaling edit handle that overlaps with part of the selected feature,
      // it is possible for both scale and translate actions to be triggered. This logic prevents
      // this simultaneous action trigger from happening by putting a higher priority on scaling
      // since the user needs to be more precise to hover over a scaling edit handle.

      this._modes.forEach(function (mode) {
        if (mode instanceof _translateMode.TranslateMode) {
          translateMode = mode;
        } else {
          if (mode instanceof _scaleMode.ScaleMode) {
            scaleMode = mode;
          }

          filteredModes.push(mode);
        }
      });

      if (scaleMode instanceof _scaleMode.ScaleMode && !scaleMode.isEditHandleSelcted()) {
        filteredModes.push(translateMode);
      }

      filteredModes.filter(Boolean).forEach(function (mode) {
        return mode.handleStartDragging(event, props);
      });
    }
  }, {
    key: "getGuides",
    value: function getGuides(props) {
      var compositeGuides = _get(_getPrototypeOf(TransformMode.prototype), "getGuides", this).call(this, props);

      var rotateMode = (this._modes || []).find(function (mode) {
        return mode instanceof _rotateMode.RotateMode;
      });

      if (rotateMode instanceof _rotateMode.RotateMode) {
        var nonEnvelopeGuides = compositeGuides.features.filter(function (guide) {
          var _ref = guide.properties || {},
              editHandleType = _ref.editHandleType,
              mode = _ref.mode; // Both scale and rotate modes have the same enveloping box as a guide - only need one


          var guidesToFilterOut = [mode]; // Do not render scaling edit handles if rotating

          if (rotateMode.getIsRotating()) {
            guidesToFilterOut.push(editHandleType);
          }

          return !guidesToFilterOut.includes('scale');
        }); // @ts-ignore

        compositeGuides = (0, _helpers.featureCollection)(nonEnvelopeGuides);
      }

      return compositeGuides;
    }
  }]);

  return TransformMode;
}(_compositeMode.CompositeMode);

exports.TransformMode = TransformMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdHJhbnNmb3JtLW1vZGUudHMiXSwibmFtZXMiOlsiVHJhbnNmb3JtTW9kZSIsIlRyYW5zbGF0ZU1vZGUiLCJTY2FsZU1vZGUiLCJSb3RhdGVNb2RlIiwiZXZlbnQiLCJwcm9wcyIsInVwZGF0ZWRDdXJzb3IiLCJvblVwZGF0ZUN1cnNvciIsImN1cnNvciIsInNjYWxlTW9kZSIsInRyYW5zbGF0ZU1vZGUiLCJmaWx0ZXJlZE1vZGVzIiwiX21vZGVzIiwiZm9yRWFjaCIsIm1vZGUiLCJwdXNoIiwiaXNFZGl0SGFuZGxlU2VsY3RlZCIsImZpbHRlciIsIkJvb2xlYW4iLCJoYW5kbGVTdGFydERyYWdnaW5nIiwiY29tcG9zaXRlR3VpZGVzIiwicm90YXRlTW9kZSIsImZpbmQiLCJub25FbnZlbG9wZUd1aWRlcyIsImZlYXR1cmVzIiwiZ3VpZGUiLCJwcm9wZXJ0aWVzIiwiZWRpdEhhbmRsZVR5cGUiLCJndWlkZXNUb0ZpbHRlck91dCIsImdldElzUm90YXRpbmciLCJpbmNsdWRlcyIsIkNvbXBvc2l0ZU1vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxhOzs7OztBQUNYLDJCQUFjO0FBQUE7O0FBQUEsNkJBQ04sQ0FBQyxJQUFJQyw0QkFBSixFQUFELEVBQXNCLElBQUlDLG9CQUFKLEVBQXRCLEVBQXVDLElBQUlDLHNCQUFKLEVBQXZDLENBRE07QUFFYjs7OztzQ0FFaUJDLEssRUFBeUJDLEssRUFBcUM7QUFDOUUsVUFBSUMsYUFBYSxHQUFHLElBQXBCOztBQUNBLDJGQUF3QkYsS0FBeEIsb0JBQ0tDLEtBREw7QUFFRUUsUUFBQUEsY0FBYyxFQUFFLHdCQUFDQyxNQUFELEVBQVk7QUFDMUJGLFVBQUFBLGFBQWEsR0FBR0UsTUFBTSxJQUFJRixhQUExQjtBQUNEO0FBSkg7O0FBTUFELE1BQUFBLEtBQUssQ0FBQ0UsY0FBTixDQUFxQkQsYUFBckI7QUFDRDs7O3dDQUVtQkYsSyxFQUEyQkMsSyxFQUFxQztBQUNsRixVQUFJSSxTQUFTLEdBQUcsSUFBaEI7QUFDQSxVQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxVQUFNQyxhQUFhLEdBQUcsRUFBdEIsQ0FIa0YsQ0FLbEY7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsV0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CLFVBQUNDLElBQUQsRUFBVTtBQUM1QixZQUFJQSxJQUFJLFlBQVliLDRCQUFwQixFQUFtQztBQUNqQ1MsVUFBQUEsYUFBYSxHQUFHSSxJQUFoQjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlBLElBQUksWUFBWVosb0JBQXBCLEVBQStCO0FBQzdCTyxZQUFBQSxTQUFTLEdBQUdLLElBQVo7QUFDRDs7QUFDREgsVUFBQUEsYUFBYSxDQUFDSSxJQUFkLENBQW1CRCxJQUFuQjtBQUNEO0FBQ0YsT0FURDs7QUFXQSxVQUFJTCxTQUFTLFlBQVlQLG9CQUFyQixJQUFrQyxDQUFDTyxTQUFTLENBQUNPLG1CQUFWLEVBQXZDLEVBQXdFO0FBQ3RFTCxRQUFBQSxhQUFhLENBQUNJLElBQWQsQ0FBbUJMLGFBQW5CO0FBQ0Q7O0FBRURDLE1BQUFBLGFBQWEsQ0FBQ00sTUFBZCxDQUFxQkMsT0FBckIsRUFBOEJMLE9BQTlCLENBQXNDLFVBQUNDLElBQUQ7QUFBQSxlQUFVQSxJQUFJLENBQUNLLG1CQUFMLENBQXlCZixLQUF6QixFQUFnQ0MsS0FBaEMsQ0FBVjtBQUFBLE9BQXRDO0FBQ0Q7Ozs4QkFFU0EsSyxFQUFxQztBQUM3QyxVQUFJZSxlQUFlLGdGQUFtQmYsS0FBbkIsQ0FBbkI7O0FBQ0EsVUFBTWdCLFVBQVUsR0FBRyxDQUFDLEtBQUtULE1BQUwsSUFBZSxFQUFoQixFQUFvQlUsSUFBcEIsQ0FBeUIsVUFBQ1IsSUFBRDtBQUFBLGVBQVVBLElBQUksWUFBWVgsc0JBQTFCO0FBQUEsT0FBekIsQ0FBbkI7O0FBRUEsVUFBSWtCLFVBQVUsWUFBWWxCLHNCQUExQixFQUFzQztBQUNwQyxZQUFNb0IsaUJBQWlCLEdBQUdILGVBQWUsQ0FBQ0ksUUFBaEIsQ0FBeUJQLE1BQXpCLENBQWdDLFVBQUNRLEtBQUQsRUFBVztBQUFBLHFCQUNqQ0EsS0FBSyxDQUFDQyxVQUFQLElBQTZCLEVBREs7QUFBQSxjQUMzREMsY0FEMkQsUUFDM0RBLGNBRDJEO0FBQUEsY0FDM0NiLElBRDJDLFFBQzNDQSxJQUQyQyxFQUVuRTs7O0FBQ0EsY0FBTWMsaUJBQWlCLEdBQUcsQ0FBQ2QsSUFBRCxDQUExQixDQUhtRSxDQUluRTs7QUFDQSxjQUFJTyxVQUFVLENBQUNRLGFBQVgsRUFBSixFQUFnQztBQUM5QkQsWUFBQUEsaUJBQWlCLENBQUNiLElBQWxCLENBQXVCWSxjQUF2QjtBQUNEOztBQUNELGlCQUFPLENBQUNDLGlCQUFpQixDQUFDRSxRQUFsQixDQUEyQixPQUEzQixDQUFSO0FBQ0QsU0FUeUIsQ0FBMUIsQ0FEb0MsQ0FXcEM7O0FBQ0FWLFFBQUFBLGVBQWUsR0FBRyxnQ0FBa0JHLGlCQUFsQixDQUFsQjtBQUNEOztBQUNELGFBQU9ILGVBQVA7QUFDRDs7OztFQTlEZ0NXLDRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbmltcG9ydCB7IFBvaW50ZXJNb3ZlRXZlbnQsIE1vZGVQcm9wcywgU3RhcnREcmFnZ2luZ0V2ZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9nZW9qc29uLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZGUgfSBmcm9tICcuL3RyYW5zbGF0ZS1tb2RlJztcbmltcG9ydCB7IFNjYWxlTW9kZSB9IGZyb20gJy4vc2NhbGUtbW9kZSc7XG5pbXBvcnQgeyBSb3RhdGVNb2RlIH0gZnJvbSAnLi9yb3RhdGUtbW9kZSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZU1vZGUgfSBmcm9tICcuL2NvbXBvc2l0ZS1tb2RlJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybU1vZGUgZXh0ZW5kcyBDb21wb3NpdGVNb2RlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoW25ldyBUcmFuc2xhdGVNb2RlKCksIG5ldyBTY2FsZU1vZGUoKSwgbmV3IFJvdGF0ZU1vZGUoKV0pO1xuICB9XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgbGV0IHVwZGF0ZWRDdXJzb3IgPSBudWxsO1xuICAgIHN1cGVyLmhhbmRsZVBvaW50ZXJNb3ZlKGV2ZW50LCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG9uVXBkYXRlQ3Vyc29yOiAoY3Vyc29yKSA9PiB7XG4gICAgICAgIHVwZGF0ZWRDdXJzb3IgPSBjdXJzb3IgfHwgdXBkYXRlZEN1cnNvcjtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcHJvcHMub25VcGRhdGVDdXJzb3IodXBkYXRlZEN1cnNvcik7XG4gIH1cblxuICBoYW5kbGVTdGFydERyYWdnaW5nKGV2ZW50OiBTdGFydERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7XG4gICAgbGV0IHNjYWxlTW9kZSA9IG51bGw7XG4gICAgbGV0IHRyYW5zbGF0ZU1vZGUgPSBudWxsO1xuICAgIGNvbnN0IGZpbHRlcmVkTW9kZXMgPSBbXTtcblxuICAgIC8vIElmIHRoZSB1c2VyIHNlbGVjdHMgYSBzY2FsaW5nIGVkaXQgaGFuZGxlIHRoYXQgb3ZlcmxhcHMgd2l0aCBwYXJ0IG9mIHRoZSBzZWxlY3RlZCBmZWF0dXJlLFxuICAgIC8vIGl0IGlzIHBvc3NpYmxlIGZvciBib3RoIHNjYWxlIGFuZCB0cmFuc2xhdGUgYWN0aW9ucyB0byBiZSB0cmlnZ2VyZWQuIFRoaXMgbG9naWMgcHJldmVudHNcbiAgICAvLyB0aGlzIHNpbXVsdGFuZW91cyBhY3Rpb24gdHJpZ2dlciBmcm9tIGhhcHBlbmluZyBieSBwdXR0aW5nIGEgaGlnaGVyIHByaW9yaXR5IG9uIHNjYWxpbmdcbiAgICAvLyBzaW5jZSB0aGUgdXNlciBuZWVkcyB0byBiZSBtb3JlIHByZWNpc2UgdG8gaG92ZXIgb3ZlciBhIHNjYWxpbmcgZWRpdCBoYW5kbGUuXG4gICAgdGhpcy5fbW9kZXMuZm9yRWFjaCgobW9kZSkgPT4ge1xuICAgICAgaWYgKG1vZGUgaW5zdGFuY2VvZiBUcmFuc2xhdGVNb2RlKSB7XG4gICAgICAgIHRyYW5zbGF0ZU1vZGUgPSBtb2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1vZGUgaW5zdGFuY2VvZiBTY2FsZU1vZGUpIHtcbiAgICAgICAgICBzY2FsZU1vZGUgPSBtb2RlO1xuICAgICAgICB9XG4gICAgICAgIGZpbHRlcmVkTW9kZXMucHVzaChtb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzY2FsZU1vZGUgaW5zdGFuY2VvZiBTY2FsZU1vZGUgJiYgIXNjYWxlTW9kZS5pc0VkaXRIYW5kbGVTZWxjdGVkKCkpIHtcbiAgICAgIGZpbHRlcmVkTW9kZXMucHVzaCh0cmFuc2xhdGVNb2RlKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJlZE1vZGVzLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKChtb2RlKSA9PiBtb2RlLmhhbmRsZVN0YXJ0RHJhZ2dpbmcoZXZlbnQsIHByb3BzKSk7XG4gIH1cblxuICBnZXRHdWlkZXMocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICBsZXQgY29tcG9zaXRlR3VpZGVzID0gc3VwZXIuZ2V0R3VpZGVzKHByb3BzKTtcbiAgICBjb25zdCByb3RhdGVNb2RlID0gKHRoaXMuX21vZGVzIHx8IFtdKS5maW5kKChtb2RlKSA9PiBtb2RlIGluc3RhbmNlb2YgUm90YXRlTW9kZSk7XG5cbiAgICBpZiAocm90YXRlTW9kZSBpbnN0YW5jZW9mIFJvdGF0ZU1vZGUpIHtcbiAgICAgIGNvbnN0IG5vbkVudmVsb3BlR3VpZGVzID0gY29tcG9zaXRlR3VpZGVzLmZlYXR1cmVzLmZpbHRlcigoZ3VpZGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBlZGl0SGFuZGxlVHlwZSwgbW9kZSB9ID0gKGd1aWRlLnByb3BlcnRpZXMgYXMgYW55KSB8fCB7fTtcbiAgICAgICAgLy8gQm90aCBzY2FsZSBhbmQgcm90YXRlIG1vZGVzIGhhdmUgdGhlIHNhbWUgZW52ZWxvcGluZyBib3ggYXMgYSBndWlkZSAtIG9ubHkgbmVlZCBvbmVcbiAgICAgICAgY29uc3QgZ3VpZGVzVG9GaWx0ZXJPdXQgPSBbbW9kZV07XG4gICAgICAgIC8vIERvIG5vdCByZW5kZXIgc2NhbGluZyBlZGl0IGhhbmRsZXMgaWYgcm90YXRpbmdcbiAgICAgICAgaWYgKHJvdGF0ZU1vZGUuZ2V0SXNSb3RhdGluZygpKSB7XG4gICAgICAgICAgZ3VpZGVzVG9GaWx0ZXJPdXQucHVzaChlZGl0SGFuZGxlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFndWlkZXNUb0ZpbHRlck91dC5pbmNsdWRlcygnc2NhbGUnKTtcbiAgICAgIH0pO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29tcG9zaXRlR3VpZGVzID0gZmVhdHVyZUNvbGxlY3Rpb24obm9uRW52ZWxvcGVHdWlkZXMpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9zaXRlR3VpZGVzO1xuICB9XG59XG4iXX0=
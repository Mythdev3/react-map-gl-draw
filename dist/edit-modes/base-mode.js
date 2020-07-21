"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseMode = /*#__PURE__*/function () {
  function BaseMode() {
    var _this = this;

    _classCallCheck(this, BaseMode);

    _defineProperty(this, "_tentativeFeature", void 0);

    _defineProperty(this, "_editHandles", void 0);

    _defineProperty(this, "getTentativeFeature", function () {
      return _this._tentativeFeature;
    });

    _defineProperty(this, "getEditHandles", function () {
      return _this._editHandles;
    });

    _defineProperty(this, "setTentativeFeature", function (feature) {
      _this._tentativeFeature = feature;
    });

    _defineProperty(this, "getSelectedFeature", function (props, featureIndex) {
      var data = props.data,
          selectedIndexes = props.selectedIndexes; // @ts-ignore

      var features = data && data.features;
      var selectedIndex = (0, _utils.isNumeric)(featureIndex) ? Number(featureIndex) : selectedIndexes && selectedIndexes[0];
      return features && features[selectedIndex];
    });

    this._tentativeFeature = null;
    this._editHandles = null;
  }

  _createClass(BaseMode, [{
    key: "handlePan",
    value: function handlePan(event, props) {}
  }, {
    key: "handleClick",
    value: function handleClick(event, props) {}
  }, {
    key: "handleDblClick",
    value: function handleDblClick(event, props) {}
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
    key: "handleKeyUp",
    value: function handleKeyUp(event, props) {}
  }, {
    key: "getGuides",
    value: function getGuides(props) {
      return null;
    }
  }, {
    key: "getTooltips",
    value: function getTooltips(props) {
      return [];
    }
  }, {
    key: "handleDragging",
    value: function handleDragging(event, props) {}
  }, {
    key: "getEditHandlesFromFeature",
    value: function getEditHandlesFromFeature(feature, featureIndex) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      } // @ts-ignore


      return coordinates.map(function (coord, i) {
        return {
          type: 'Feature',
          properties: {
            // TODO deprecate renderType
            renderType: feature.properties.renderType,
            guideType: _constants.GUIDE_TYPE.EDIT_HANDLE,
            editHandleType: 'existing',
            featureIndex: featureIndex,
            positionIndexes: [i]
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.POINT,
            coordinates: coord
          }
        };
      });
    }
  }]);

  return BaseMode;
}();

exports["default"] = BaseMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2Jhc2UtbW9kZS50cyJdLCJuYW1lcyI6WyJCYXNlTW9kZSIsIl90ZW50YXRpdmVGZWF0dXJlIiwiX2VkaXRIYW5kbGVzIiwiZmVhdHVyZSIsInByb3BzIiwiZmVhdHVyZUluZGV4IiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsImZlYXR1cmVzIiwic2VsZWN0ZWRJbmRleCIsIk51bWJlciIsImV2ZW50IiwiY29vcmRpbmF0ZXMiLCJtYXAiLCJjb29yZCIsImkiLCJ0eXBlIiwicHJvcGVydGllcyIsInJlbmRlclR5cGUiLCJndWlkZVR5cGUiLCJHVUlERV9UWVBFIiwiRURJVF9IQU5ETEUiLCJlZGl0SGFuZGxlVHlwZSIsInBvc2l0aW9uSW5kZXhlcyIsImdlb21ldHJ5IiwiR0VPSlNPTl9UWVBFIiwiUE9JTlQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUTtBQUluQixzQkFBYztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLGlEQTJCUSxZQUFNO0FBQzFCLGFBQU8sS0FBSSxDQUFDQyxpQkFBWjtBQUNELEtBN0JhOztBQUFBLDRDQStCRyxZQUFNO0FBQ3JCLGFBQU8sS0FBSSxDQUFDQyxZQUFaO0FBQ0QsS0FqQ2E7O0FBQUEsaURBbUNRLFVBQUNDLE9BQUQsRUFBc0I7QUFDMUMsTUFBQSxLQUFJLENBQUNGLGlCQUFMLEdBQXlCRSxPQUF6QjtBQUNELEtBckNhOztBQUFBLGdEQWdFTyxVQUNuQkMsS0FEbUIsRUFFbkJDLFlBRm1CLEVBR2hCO0FBQUEsVUFDS0MsSUFETCxHQUMrQkYsS0FEL0IsQ0FDS0UsSUFETDtBQUFBLFVBQ1dDLGVBRFgsR0FDK0JILEtBRC9CLENBQ1dHLGVBRFgsRUFFSDs7QUFDQSxVQUFNQyxRQUFRLEdBQUdGLElBQUksSUFBSUEsSUFBSSxDQUFDRSxRQUE5QjtBQUVBLFVBQU1DLGFBQWEsR0FBRyxzQkFBVUosWUFBVixJQUNsQkssTUFBTSxDQUFDTCxZQUFELENBRFksR0FFbEJFLGVBQWUsSUFBSUEsZUFBZSxDQUFDLENBQUQsQ0FGdEM7QUFJQSxhQUFPQyxRQUFRLElBQUlBLFFBQVEsQ0FBQ0MsYUFBRCxDQUEzQjtBQUNELEtBN0VhOztBQUNaLFNBQUtSLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNEOzs7OzhCQUVTUyxLLEVBQW1CUCxLLEVBQXFDLENBQUU7OztnQ0FFeERPLEssRUFBbUJQLEssRUFBcUMsQ0FBRTs7O21DQUV2RE8sSyxFQUFtQlAsSyxFQUFxQyxDQUFFOzs7c0NBRXZETyxLLEVBQXlCUCxLLEVBQXFDLENBQUU7Ozt3Q0FFOURPLEssRUFBMkJQLEssRUFBcUMsQ0FBRTs7O3VDQUVuRU8sSyxFQUEwQlAsSyxFQUFxQyxDQUFFOzs7Z0NBRXhFTyxLLEVBQXNCUCxLLEVBQTJDLENBQUU7Ozs4QkFFckVBLEssRUFBZ0Y7QUFDeEYsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FDV0EsSyxFQUFnRDtBQUMxRCxhQUFPLEVBQVA7QUFDRDs7O21DQUNjTyxLLEVBQXNCUCxLLEVBQTJDLENBQUU7Ozs4Q0FjeERELE8sRUFBa0JFLFksRUFBeUM7QUFDbkYsVUFBTU8sV0FBVyxHQUFHLGtDQUFzQlQsT0FBdEIsQ0FBcEI7O0FBQ0EsVUFBSSxDQUFDUyxXQUFMLEVBQWtCO0FBQ2hCLGVBQU8sSUFBUDtBQUNELE9BSmtGLENBS25GOzs7QUFDQSxhQUFPQSxXQUFXLENBQUNDLEdBQVosQ0FBZ0IsVUFBQ0MsS0FBRCxFQUFRQyxDQUFSLEVBQWM7QUFDbkMsZUFBTztBQUNMQyxVQUFBQSxJQUFJLEVBQUUsU0FERDtBQUVMQyxVQUFBQSxVQUFVLEVBQUU7QUFDVjtBQUNBQyxZQUFBQSxVQUFVLEVBQUVmLE9BQU8sQ0FBQ2MsVUFBUixDQUFtQkMsVUFGckI7QUFHVkMsWUFBQUEsU0FBUyxFQUFFQyxzQkFBV0MsV0FIWjtBQUlWQyxZQUFBQSxjQUFjLEVBQUUsVUFKTjtBQUtWakIsWUFBQUEsWUFBWSxFQUFaQSxZQUxVO0FBTVZrQixZQUFBQSxlQUFlLEVBQUUsQ0FBQ1IsQ0FBRDtBQU5QLFdBRlA7QUFVTFMsVUFBQUEsUUFBUSxFQUFFO0FBQ1JSLFlBQUFBLElBQUksRUFBRVMsd0JBQWFDLEtBRFg7QUFFUmQsWUFBQUEsV0FBVyxFQUFFRTtBQUZMO0FBVkwsU0FBUDtBQWVELE9BaEJNLENBQVA7QUFpQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFZGl0TW9kZSxcbiAgR3VpZGVGZWF0dXJlQ29sbGVjdGlvbixcbiAgRmVhdHVyZSxcbiAgQ2xpY2tFdmVudCxcbiAgUG9pbnRlck1vdmVFdmVudCxcbiAgU3RhcnREcmFnZ2luZ0V2ZW50LFxuICBTdG9wRHJhZ2dpbmdFdmVudCxcbiAgRmVhdHVyZUNvbGxlY3Rpb24sXG4gIFRvb2x0aXAsXG4gIERyYWdnaW5nRXZlbnQsXG59IGZyb20gJ0BuZWJ1bGEuZ2wvZWRpdC1tb2Rlcyc7XG5pbXBvcnQgeyBNb2RlUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IEdFT0pTT05fVFlQRSwgR1VJREVfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMsIGlzTnVtZXJpYyB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlTW9kZSBpbXBsZW1lbnRzIEVkaXRNb2RlPEZlYXR1cmVDb2xsZWN0aW9uLCBHdWlkZUZlYXR1cmVDb2xsZWN0aW9uPiB7XG4gIF90ZW50YXRpdmVGZWF0dXJlOiBGZWF0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgX2VkaXRIYW5kbGVzOiBGZWF0dXJlW10gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3RlbnRhdGl2ZUZlYXR1cmUgPSBudWxsO1xuICAgIHRoaXMuX2VkaXRIYW5kbGVzID0gbnVsbDtcbiAgfVxuXG4gIGhhbmRsZVBhbihldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHt9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7fVxuXG4gIGhhbmRsZURibENsaWNrKGV2ZW50OiBDbGlja0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge31cblxuICBoYW5kbGVQb2ludGVyTW92ZShldmVudDogUG9pbnRlck1vdmVFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHt9XG5cbiAgaGFuZGxlU3RhcnREcmFnZ2luZyhldmVudDogU3RhcnREcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge31cblxuICBoYW5kbGVTdG9wRHJhZ2dpbmcoZXZlbnQ6IFN0b3BEcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge31cblxuICBoYW5kbGVLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiB2b2lkIHt9XG5cbiAgZ2V0R3VpZGVzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldFRvb2x0aXBzKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogVG9vbHRpcFtdIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaGFuZGxlRHJhZ2dpbmcoZXZlbnQ6IERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KTogdm9pZCB7fVxuXG4gIGdldFRlbnRhdGl2ZUZlYXR1cmUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbnRhdGl2ZUZlYXR1cmU7XG4gIH07XG5cbiAgZ2V0RWRpdEhhbmRsZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRIYW5kbGVzO1xuICB9O1xuXG4gIHNldFRlbnRhdGl2ZUZlYXR1cmUgPSAoZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xuICAgIHRoaXMuX3RlbnRhdGl2ZUZlYXR1cmUgPSBmZWF0dXJlO1xuICB9O1xuXG4gIGdldEVkaXRIYW5kbGVzRnJvbUZlYXR1cmUoZmVhdHVyZTogRmVhdHVyZSwgZmVhdHVyZUluZGV4OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gY29vcmRpbmF0ZXMubWFwKChjb29yZCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLy8gVE9ETyBkZXByZWNhdGUgcmVuZGVyVHlwZVxuICAgICAgICAgIHJlbmRlclR5cGU6IGZlYXR1cmUucHJvcGVydGllcy5yZW5kZXJUeXBlLFxuICAgICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5FRElUX0hBTkRMRSxcbiAgICAgICAgICBlZGl0SGFuZGxlVHlwZTogJ2V4aXN0aW5nJyxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgcG9zaXRpb25JbmRleGVzOiBbaV0sXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLlBPSU5ULFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRTZWxlY3RlZEZlYXR1cmUgPSAoXG4gICAgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4sXG4gICAgZmVhdHVyZUluZGV4OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkXG4gICkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSwgc2VsZWN0ZWRJbmRleGVzIH0gPSBwcm9wcztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZmVhdHVyZXMgPSBkYXRhICYmIGRhdGEuZmVhdHVyZXM7XG5cbiAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gaXNOdW1lcmljKGZlYXR1cmVJbmRleClcbiAgICAgID8gTnVtYmVyKGZlYXR1cmVJbmRleClcbiAgICAgIDogc2VsZWN0ZWRJbmRleGVzICYmIHNlbGVjdGVkSW5kZXhlc1swXTtcblxuICAgIHJldHVybiBmZWF0dXJlcyAmJiBmZWF0dXJlc1tzZWxlY3RlZEluZGV4XTtcbiAgfTtcbn1cbiJdfQ==
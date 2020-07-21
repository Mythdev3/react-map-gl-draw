"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactMapGl = require("react-map-gl");

var React = _interopRequireWildcard(require("react"));

var _editModes = require("@nebula.gl/edit-modes");

var _editingMode = _interopRequireDefault(require("./edit-modes/editing-mode"));

var _utils = require("./edit-modes/utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var defaultProps = {
  selectable: true,
  mode: null,
  features: null,
  onSelect: null,
  onUpdate: null,
  onUpdateCursor: function onUpdateCursor() {}
};
var defaultState = {
  featureCollection: new _editModes.ImmutableFeatureCollection({
    type: 'FeatureCollection',
    features: []
  }),
  selectedFeatureIndex: null,
  // index, isGuide, mapCoords, screenCoords
  hovered: null,
  isDragging: false,
  didDrag: false,
  lastPointerMoveEvent: null,
  pointerDownPicks: null,
  pointerDownScreenCoords: null,
  pointerDownMapCoords: null
};

var ModeHandler = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModeHandler, _React$PureComponent);

  var _super = _createSuper(ModeHandler);

  function ModeHandler(props) {
    var _this;

    _classCallCheck(this, ModeHandler);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_events", void 0);

    _defineProperty(_assertThisInitialized(_this), "_eventsRegistered", void 0);

    _defineProperty(_assertThisInitialized(_this), "_modeHandler", void 0);

    _defineProperty(_assertThisInitialized(_this), "_context", void 0);

    _defineProperty(_assertThisInitialized(_this), "_containerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "getFeatures", function () {
      var featureCollection = _this._getFeatureCollection();

      featureCollection = featureCollection && featureCollection.getObject();
      return featureCollection && featureCollection.features;
    });

    _defineProperty(_assertThisInitialized(_this), "addFeatures", function (features) {
      var featureCollection = _this._getFeatureCollection();

      if (featureCollection) {
        if (!Array.isArray(features)) {
          features = [features];
        }

        featureCollection = featureCollection.addFeatures(features);

        _this.setState({
          featureCollection: featureCollection
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "deleteFeatures", function (featureIndexes) {
      var featureCollection = _this._getFeatureCollection();

      var selectedFeatureIndex = _this._getSelectedFeatureIndex();

      if (featureCollection) {
        if (!Array.isArray(featureIndexes)) {
          featureIndexes = [featureIndexes];
        }

        featureCollection = featureCollection.deleteFeatures(featureIndexes);
        var newState = {
          featureCollection: featureCollection
        };

        if (featureIndexes.findIndex(function (index) {
          return selectedFeatureIndex === index;
        }) >= 0) {
          newState.selectedFeatureIndex = null;
        }

        _this.setState(newState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getMemorizedFeatureCollection", (0, _editModes._memoize)(function (_ref) {
      var propsFeatures = _ref.propsFeatures,
          stateFeatures = _ref.stateFeatures;
      var features = propsFeatures || stateFeatures; // Any changes in ImmutableFeatureCollection will create a new object

      if (features instanceof _editModes.ImmutableFeatureCollection) {
        return features;
      }

      if (features && features.type === 'FeatureCollection') {
        return new _editModes.ImmutableFeatureCollection({
          type: 'FeatureCollection',
          features: features.features
        });
      }

      return new _editModes.ImmutableFeatureCollection({
        type: 'FeatureCollection',
        features: features || []
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "_getFeatureCollection", function () {
      return _this._getMemorizedFeatureCollection({
        propsFeatures: _this.props.features,
        stateFeatures: _this.state.featureCollection
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_setupModeHandler", function () {
      var mode = _this.props.mode;
      _this._modeHandler = mode;

      if (!mode) {
        _this._degregisterEvents();

        return;
      }

      _this._registerEvents();
    });

    _defineProperty(_assertThisInitialized(_this), "_clearEditingState", function () {
      _this.setState({
        selectedFeatureIndex: null,
        hovered: null,
        pointerDownPicks: null,
        pointerDownScreenCoords: null,
        pointerDownMapCoords: null,
        isDragging: false,
        didDrag: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getSelectedFeatureIndex", function () {
      if ('selectedFeatureIndex' in _this.props) {
        return _this.props.selectedFeatureIndex;
      }

      return _this.state.selectedFeatureIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "_onSelect", function (selected) {
      _this.setState({
        selectedFeatureIndex: selected && selected.selectedFeatureIndex
      });

      if (_this.props.onSelect) {
        _this.props.onSelect(selected);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onEdit", function (editAction) {
      var editType = editAction.editType,
          updatedData = editAction.updatedData,
          editContext = editAction.editContext;

      _this.setState({
        featureCollection: new _editModes.ImmutableFeatureCollection(updatedData)
      });

      switch (editType) {
        case _constants.EDIT_TYPE.ADD_FEATURE:
          _this._onSelect({
            selectedFeature: null,
            selectedFeatureIndex: null,
            selectedEditHandleIndex: null,
            screenCoords: editContext && editContext.screenCoords,
            mapCoords: editContext && editContext.mapCoords
          });

          break;

        default:
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate({
          data: updatedData && updatedData.features,
          editType: editType,
          editContext: editContext
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_degregisterEvents", function () {
      var eventManager = _this._context && _this._context.eventManager;

      if (!_this._events || !eventManager) {
        return;
      }

      if (_this._eventsRegistered) {
        eventManager.off(_this._events);
        _this._eventsRegistered = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_registerEvents", function () {
      var ref = _this._containerRef;
      var eventManager = _this._context && _this._context.eventManager;

      if (!_this._events || !ref || !eventManager) {
        return;
      }

      if (_this._eventsRegistered) {
        return;
      }

      eventManager.on(_this._events, ref);
      _this._eventsRegistered = true;
    });

    _defineProperty(_assertThisInitialized(_this), "_onEvent", function (handler, evt, stopPropagation) {
      var event = _this._getEvent(evt);

      handler(event);

      if (stopPropagation) {
        evt.stopImmediatePropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (event) {
      var modeProps = _this.getModeProps(); // TODO refactor EditingMode
      // @ts-ignore


      if (_this._modeHandler instanceof _editingMode["default"] || _this.props.selectable) {
        var mapCoords = event.mapCoords,
            screenCoords = event.screenCoords;
        var pickedObject = event.picks && event.picks[0]; // @ts-ignore

        if (pickedObject && (0, _utils.isNumeric)(pickedObject.featureIndex)) {
          // @ts-ignore
          var selectedFeatureIndex = pickedObject.featureIndex;

          _this._onSelect({
            selectedFeature: pickedObject.object,
            selectedFeatureIndex: selectedFeatureIndex,
            selectedEditHandleIndex: // @ts-ignore
            pickedObject.type === _constants.ELEMENT_TYPE.EDIT_HANDLE ? pickedObject.index : null,
            // @ts-ignore
            mapCoords: mapCoords,
            screenCoords: screenCoords
          });
        } else {
          _this._onSelect({
            selectedFeature: null,
            selectedFeatureIndex: null,
            selectedEditHandleIndex: null,
            // @ts-ignore
            mapCoords: mapCoords,
            screenCoords: screenCoords
          });
        }
      }

      _this._modeHandler.handleClick(event, modeProps);
    });

    _defineProperty(_assertThisInitialized(_this), "_onDblclick", function (event) {
      if ((0, _utils.isNumeric)(_this._getSelectedFeatureIndex())) {
        event.sourceEvent.stopImmediatePropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerMove", function (event) {
      // hovering
      var hovered = _this._getHoverState(event);

      var _this$state = _this.state,
          isDragging = _this$state.isDragging,
          didDrag = _this$state.didDrag,
          pointerDownPicks = _this$state.pointerDownPicks,
          pointerDownScreenCoords = _this$state.pointerDownScreenCoords,
          pointerDownMapCoords = _this$state.pointerDownMapCoords;

      if (isDragging && !didDrag && pointerDownScreenCoords) {
        var dx = event.screenCoords[0] - pointerDownScreenCoords[0];
        var dy = event.screenCoords[1] - pointerDownScreenCoords[1];

        if (dx * dx + dy * dy > 5) {
          _this.setState({
            didDrag: true
          });
        }
      }

      var pointerMoveEvent = _objectSpread({}, event, {
        isDragging: isDragging,
        pointerDownPicks: pointerDownPicks,
        pointerDownScreenCoords: pointerDownScreenCoords,
        pointerDownMapCoords: pointerDownMapCoords
      });

      if (_this.state.didDrag) {
        var modeProps = _this.getModeProps();

        _this._modeHandler.handlePointerMove(pointerMoveEvent, modeProps);
      }

      _this.setState({
        hovered: hovered,
        // @ts-ignore
        lastPointerMoveEvent: pointerMoveEvent
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerDown", function (event) {
      var dragToDraw = _this.props.modeConfig && _this.props.modeConfig.dragToDraw;
      var isDragging = Boolean(event.picks && event.picks[0]) || dragToDraw;

      var startDraggingEvent = _objectSpread({}, event, {
        isDragging: isDragging,
        pointerDownScreenCoords: event.screenCoords,
        pointerDownMapCoords: event.mapCoords,
        cancelPan: event.sourceEvent.stopImmediatePropagation
      });

      var newState = {
        isDragging: isDragging,
        pointerDownPicks: event.picks,
        pointerDownScreenCoords: event.screenCoords,
        pointerDownMapCoords: event.mapCoords
      }; // @ts-ignore

      _this.setState(newState);

      var modeProps = _this.getModeProps();

      _this._modeHandler.handleStartDragging(startDraggingEvent, modeProps);
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerUp", function (event) {
      var _this$state2 = _this.state,
          didDrag = _this$state2.didDrag,
          pointerDownPicks = _this$state2.pointerDownPicks,
          pointerDownScreenCoords = _this$state2.pointerDownScreenCoords,
          pointerDownMapCoords = _this$state2.pointerDownMapCoords;

      var stopDraggingEvent = _objectSpread({}, event, {
        isDragging: false,
        pointerDownPicks: didDrag ? pointerDownPicks : null,
        pointerDownScreenCoords: didDrag ? pointerDownScreenCoords : null,
        pointerDownMapCoords: didDrag ? pointerDownMapCoords : null,
        cancelPan: event.sourceEvent.cancelPan
      });

      var newState = {
        isDragging: false,
        didDrag: false,
        pointerDownPicks: null,
        pointerDownScreenCoords: null,
        pointerDownMapCoords: null
      };

      _this.setState(newState);

      var modeProps = _this.getModeProps();

      if (didDrag) {
        _this._modeHandler.handleStopDragging(stopDraggingEvent, modeProps);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPan", function (event) {
      var isDragging = _this.state.isDragging;

      if (isDragging) {
        event.sourceEvent.stopImmediatePropagation();
      }

      if (_this._modeHandler.handlePan) {
        _this._modeHandler.handlePan(event, _this.getModeProps());
      }
    });

    _defineProperty(_assertThisInitialized(_this), "project", function (pt) {
      var viewport = _this._context && _this._context.viewport;
      return viewport && viewport.project(pt);
    });

    _defineProperty(_assertThisInitialized(_this), "unproject", function (pt) {
      var viewport = _this._context && _this._context.viewport;
      return viewport && viewport.unproject(pt);
    });

    _defineProperty(_assertThisInitialized(_this), "_getHoverState", function (event) {
      var object = event.picks && event.picks[0];

      if (!object) {
        return null;
      }

      return _objectSpread({
        screenCoords: event.screenCoords,
        mapCoords: event.mapCoords
      }, object);
    });

    _this.state = defaultState;
    _this._eventsRegistered = false;
    _this._events = {
      anyclick: function anyclick(evt) {
        return _this._onEvent(_this._onClick, evt, true);
      },
      dblclick: function dblclick(evt) {
        return _this._onEvent(_this._onDblclick, evt, false);
      },
      click: function click(evt) {
        return evt.stopImmediatePropagation();
      },
      pointermove: function pointermove(evt) {
        return _this._onEvent(_this._onPointerMove, evt, false);
      },
      pointerdown: function pointerdown(evt) {
        return _this._onEvent(_this._onPointerDown, evt, true);
      },
      pointerup: function pointerup(evt) {
        return _this._onEvent(_this._onPointerUp, evt, true);
      },
      panmove: function panmove(evt) {
        return _this._onEvent(_this._onPan, evt, false);
      },
      panstart: function panstart(evt) {
        return _this._onEvent(_this._onPan, evt, false);
      },
      panend: function panend(evt) {
        return _this._onEvent(_this._onPan, evt, false);
      }
    };
    return _this;
  }

  _createClass(ModeHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setupModeHandler();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.mode !== this.props.mode) {
        this._clearEditingState();

        this._setupModeHandler();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._degregisterEvents();
    }
  }, {
    key: "getModeProps",
    value: function getModeProps() {
      var featureCollection = this._getFeatureCollection();

      var lastPointerMoveEvent = this.state.lastPointerMoveEvent;

      var selectedFeatureIndex = this._getSelectedFeatureIndex();

      var viewport = this._context && this._context.viewport;
      return {
        data: featureCollection && featureCollection.featureCollection,
        selectedIndexes: (0, _utils.isNumeric)(selectedFeatureIndex) ? [selectedFeatureIndex] : [],
        lastPointerMoveEvent: lastPointerMoveEvent,
        viewport: viewport,
        featuresDraggable: this.props.featuresDraggable,
        onEdit: this._onEdit,
        onUpdateCursor: this.props.onUpdateCursor,
        modeConfig: this.props.modeConfig
      };
    }
    /* MEMORIZERS */

  }, {
    key: "_getEvent",
    value: function _getEvent(evt) {
      var features = this.getFeatures();

      var guides = this._modeHandler.getGuides(this.getModeProps());

      var picked = (0, _utils.parseEventElement)(evt, features, guides && guides.features);
      var screenCoords = (0, _utils.getScreenCoords)(evt); // @ts-ignore

      var mapCoords = this.unproject(screenCoords);
      return {
        picks: picked ? [picked] : null,
        screenCoords: screenCoords,
        mapCoords: mapCoords,
        sourceEvent: evt
      };
    }
  }, {
    key: "_render",
    value: function _render() {
      return /*#__PURE__*/React.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(_reactMapGl._MapContext.Consumer, null, function (context) {
        _this2._context = context;
        var viewport = context && context.viewport;

        if (!viewport || viewport.height <= 0 || viewport.width <= 0) {
          return null;
        }

        return _this2._render();
      });
    }
  }]);

  return ModeHandler;
}(React.PureComponent);

exports["default"] = ModeHandler;

_defineProperty(ModeHandler, "displayName", 'ModeHandler');

_defineProperty(ModeHandler, "defaultProps", defaultProps);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlLWhhbmRsZXIudHN4Il0sIm5hbWVzIjpbImRlZmF1bHRQcm9wcyIsInNlbGVjdGFibGUiLCJtb2RlIiwiZmVhdHVyZXMiLCJvblNlbGVjdCIsIm9uVXBkYXRlIiwib25VcGRhdGVDdXJzb3IiLCJkZWZhdWx0U3RhdGUiLCJmZWF0dXJlQ29sbGVjdGlvbiIsIkltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIiwidHlwZSIsInNlbGVjdGVkRmVhdHVyZUluZGV4IiwiaG92ZXJlZCIsImlzRHJhZ2dpbmciLCJkaWREcmFnIiwibGFzdFBvaW50ZXJNb3ZlRXZlbnQiLCJwb2ludGVyRG93blBpY2tzIiwicG9pbnRlckRvd25TY3JlZW5Db29yZHMiLCJwb2ludGVyRG93bk1hcENvb3JkcyIsIk1vZGVIYW5kbGVyIiwicHJvcHMiLCJfZ2V0RmVhdHVyZUNvbGxlY3Rpb24iLCJnZXRPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJhZGRGZWF0dXJlcyIsInNldFN0YXRlIiwiZmVhdHVyZUluZGV4ZXMiLCJfZ2V0U2VsZWN0ZWRGZWF0dXJlSW5kZXgiLCJkZWxldGVGZWF0dXJlcyIsIm5ld1N0YXRlIiwiZmluZEluZGV4IiwiaW5kZXgiLCJwcm9wc0ZlYXR1cmVzIiwic3RhdGVGZWF0dXJlcyIsIl9nZXRNZW1vcml6ZWRGZWF0dXJlQ29sbGVjdGlvbiIsInN0YXRlIiwiX21vZGVIYW5kbGVyIiwiX2RlZ3JlZ2lzdGVyRXZlbnRzIiwiX3JlZ2lzdGVyRXZlbnRzIiwic2VsZWN0ZWQiLCJlZGl0QWN0aW9uIiwiZWRpdFR5cGUiLCJ1cGRhdGVkRGF0YSIsImVkaXRDb250ZXh0IiwiRURJVF9UWVBFIiwiQUREX0ZFQVRVUkUiLCJfb25TZWxlY3QiLCJzZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEVkaXRIYW5kbGVJbmRleCIsInNjcmVlbkNvb3JkcyIsIm1hcENvb3JkcyIsImRhdGEiLCJldmVudE1hbmFnZXIiLCJfY29udGV4dCIsIl9ldmVudHMiLCJfZXZlbnRzUmVnaXN0ZXJlZCIsIm9mZiIsInJlZiIsIl9jb250YWluZXJSZWYiLCJvbiIsImhhbmRsZXIiLCJldnQiLCJzdG9wUHJvcGFnYXRpb24iLCJldmVudCIsIl9nZXRFdmVudCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsIm1vZGVQcm9wcyIsImdldE1vZGVQcm9wcyIsIkVkaXRpbmdNb2RlIiwicGlja2VkT2JqZWN0IiwicGlja3MiLCJmZWF0dXJlSW5kZXgiLCJvYmplY3QiLCJFTEVNRU5UX1RZUEUiLCJFRElUX0hBTkRMRSIsImhhbmRsZUNsaWNrIiwic291cmNlRXZlbnQiLCJfZ2V0SG92ZXJTdGF0ZSIsImR4IiwiZHkiLCJwb2ludGVyTW92ZUV2ZW50IiwiaGFuZGxlUG9pbnRlck1vdmUiLCJkcmFnVG9EcmF3IiwibW9kZUNvbmZpZyIsIkJvb2xlYW4iLCJzdGFydERyYWdnaW5nRXZlbnQiLCJjYW5jZWxQYW4iLCJoYW5kbGVTdGFydERyYWdnaW5nIiwic3RvcERyYWdnaW5nRXZlbnQiLCJoYW5kbGVTdG9wRHJhZ2dpbmciLCJoYW5kbGVQYW4iLCJwdCIsInZpZXdwb3J0IiwicHJvamVjdCIsInVucHJvamVjdCIsImFueWNsaWNrIiwiX29uRXZlbnQiLCJfb25DbGljayIsImRibGNsaWNrIiwiX29uRGJsY2xpY2siLCJjbGljayIsInBvaW50ZXJtb3ZlIiwiX29uUG9pbnRlck1vdmUiLCJwb2ludGVyZG93biIsIl9vblBvaW50ZXJEb3duIiwicG9pbnRlcnVwIiwiX29uUG9pbnRlclVwIiwicGFubW92ZSIsIl9vblBhbiIsInBhbnN0YXJ0IiwicGFuZW5kIiwiX3NldHVwTW9kZUhhbmRsZXIiLCJwcmV2UHJvcHMiLCJfY2xlYXJFZGl0aW5nU3RhdGUiLCJzZWxlY3RlZEluZGV4ZXMiLCJmZWF0dXJlc0RyYWdnYWJsZSIsIm9uRWRpdCIsIl9vbkVkaXQiLCJnZXRGZWF0dXJlcyIsImd1aWRlcyIsImdldEd1aWRlcyIsInBpY2tlZCIsImNvbnRleHQiLCJoZWlnaHQiLCJ3aWR0aCIs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QUFDQSxVQUFNK0MsWUFBWSxHQUFHLDRCQUFnQlksR0FBaEIsQ0FBckIsQ0FKMkIsQ0FLM0I7O0FBQ0EsVUFBTVgsU0FBUyxHQUFHLEtBQUs0QyxTQUFMLENBQWU3QyxZQUFmLENBQWxCO0FBRUEsYUFBTztBQUNMcUIsUUFBQUEsS0FBSyxFQUFFbUQsTUFBTSxHQUFHLENBQUNBLE1BQUQsQ0FBSCxHQUFjLElBRHRCO0FBRUx4RSxRQUFBQSxZQUFZLEVBQVpBLFlBRks7QUFHTEMsUUFBQUEsU0FBUyxFQUFUQSxTQUhLO0FBSUwwQixRQUFBQSxXQUFXLEVBQUVmO0FBSlIsT0FBUDtBQU1EOzs7OEJBZVM7QUFDUiwwQkFBTyxnQ0FBUDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCwwQkFDRSxvQkFBQyx1QkFBRCxDQUFZLFFBQVosUUFDRyxVQUFDNkQsT0FBRCxFQUFhO0FBQ1osUUFBQSxNQUFJLENBQUNyRSxRQUFMLEdBQWdCcUUsT0FBaEI7QUFDQSxZQUFNOUIsUUFBUSxHQUFHOEIsT0FBTyxJQUFJQSxPQUFPLENBQUM5QixRQUFwQzs7QUFFQSxZQUFJLENBQUNBLFFBQUQsSUFBYUEsUUFBUSxDQUFDK0IsTUFBVCxJQUFtQixDQUFoQyxJQUFxQy9CLFFBQVEsQ0FBQ2dDLEtBQVQsSUFBa0IsQ0FBM0QsRUFBOEQ7QUFDNUQsaUJBQU8sSUFBUDtBQUNEOztBQUVELGVBQU8sTUFBSSxDQUFDQyxPQUFMLEVBQVA7QUFDRCxPQVZILENBREY7QUFjRDs7OztFQTlhc0NDLEtBQUssQ0FBQ0MsYTs7OztnQkFBMUI3RyxXLGlCQUNFLGE7O2dCQURGQSxXLGtCQUVHbkIsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9NYXBDb250ZXh0IGFzIE1hcENvbnRleHQsIE1hcENvbnRleHRQcm9wcyB9IGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbixcbiAgRmVhdHVyZSxcbiAgRWRpdEFjdGlvbixcbiAgX21lbW9pemUgYXMgbWVtb2l6ZSxcbn0gZnJvbSAnQG5lYnVsYS5nbC9lZGl0LW1vZGVzJztcbmltcG9ydCB7IE1qb2xuaXJFdmVudCB9IGZyb20gJ21qb2xuaXIuanMnO1xuaW1wb3J0IHsgQmFzZUV2ZW50LCBFZGl0b3JQcm9wcywgRWRpdG9yU3RhdGUsIFNlbGVjdEFjdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgRWRpdGluZ01vZGUgZnJvbSAnLi9lZGl0LW1vZGVzL2VkaXRpbmctbW9kZSc7XG5pbXBvcnQgeyBnZXRTY3JlZW5Db29yZHMsIHBhcnNlRXZlbnRFbGVtZW50LCBpc051bWVyaWMgfSBmcm9tICcuL2VkaXQtbW9kZXMvdXRpbHMnO1xuaW1wb3J0IHsgRURJVF9UWVBFLCBFTEVNRU5UX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgbW9kZTogbnVsbCxcbiAgZmVhdHVyZXM6IG51bGwsXG4gIG9uU2VsZWN0OiBudWxsLFxuICBvblVwZGF0ZTogbnVsbCxcbiAgb25VcGRhdGVDdXJzb3I6ICgpID0+IHt9LFxufTtcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICBmZWF0dXJlQ29sbGVjdGlvbjogbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBbXSxcbiAgfSksXG5cbiAgc2VsZWN0ZWRGZWF0dXJlSW5kZXg6IG51bGwsXG5cbiAgLy8gaW5kZXgsIGlzR3VpZGUsIG1hcENvb3Jkcywgc2NyZWVuQ29vcmRzXG4gIGhvdmVyZWQ6IG51bGwsXG5cbiAgaXNEcmFnZ2luZzogZmFsc2UsXG4gIGRpZERyYWc6IGZhbHNlLFxuXG4gIGxhc3RQb2ludGVyTW92ZUV2ZW50OiBudWxsLFxuXG4gIHBvaW50ZXJEb3duUGlja3M6IG51bGwsXG4gIHBvaW50ZXJEb3duU2NyZWVuQ29vcmRzOiBudWxsLFxuICBwb2ludGVyRG93bk1hcENvb3JkczogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVIYW5kbGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxFZGl0b3JQcm9wcywgRWRpdG9yU3RhdGU+IHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ01vZGVIYW5kbGVyJztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogRWRpdG9yUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGRlZmF1bHRTdGF0ZTtcbiAgICB0aGlzLl9ldmVudHNSZWdpc3RlcmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9ldmVudHMgPSB7XG4gICAgICBhbnljbGljazogKGV2dCkgPT4gdGhpcy5fb25FdmVudCh0aGlzLl9vbkNsaWNrLCBldnQsIHRydWUpLFxuICAgICAgZGJsY2xpY2s6IChldnQpID0+IHRoaXMuX29uRXZlbnQodGhpcy5fb25EYmxjbGljaywgZXZ0LCBmYWxzZSksXG4gICAgICBjbGljazogKGV2dCkgPT4gZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpLFxuICAgICAgcG9pbnRlcm1vdmU6IChldnQpID0+IHRoaXMuX29uRXZlbnQodGhpcy5fb25Qb2ludGVyTW92ZSwgZXZ0LCBmYWxzZSksXG4gICAgICBwb2ludGVyZG93bjogKGV2dCkgPT4gdGhpcy5fb25FdmVudCh0aGlzLl9vblBvaW50ZXJEb3duLCBldnQsIHRydWUpLFxuICAgICAgcG9pbnRlcnVwOiAoZXZ0KSA9PiB0aGlzLl9vbkV2ZW50KHRoaXMuX29uUG9pbnRlclVwLCBldnQsIHRydWUpLFxuICAgICAgcGFubW92ZTogKGV2dCkgPT4gdGhpcy5fb25FdmVudCh0aGlzLl9vblBhbiwgZXZ0LCBmYWxzZSksXG4gICAgICBwYW5zdGFydDogKGV2dCkgPT4gdGhpcy5fb25FdmVudCh0aGlzLl9vblBhbiwgZXZ0LCBmYWxzZSksXG4gICAgICBwYW5lbmQ6IChldnQpID0+IHRoaXMuX29uRXZlbnQodGhpcy5fb25QYW4sIGV2dCwgZmFsc2UpLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9zZXR1cE1vZGVIYW5kbGVyKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBFZGl0b3JQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMubW9kZSAhPT0gdGhpcy5wcm9wcy5tb2RlKSB7XG4gICAgICB0aGlzLl9jbGVhckVkaXRpbmdTdGF0ZSgpO1xuICAgICAgdGhpcy5fc2V0dXBNb2RlSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2RlZ3JlZ2lzdGVyRXZlbnRzKCk7XG4gIH1cblxuICBfZXZlbnRzOiBhbnk7XG4gIF9ldmVudHNSZWdpc3RlcmVkOiBib29sZWFuO1xuICBfbW9kZUhhbmRsZXI6IGFueTtcbiAgX2NvbnRleHQ6IE1hcENvbnRleHRQcm9wcyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIF9jb250YWluZXJSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBnZXRGZWF0dXJlcyA9ICgpID0+IHtcbiAgICBsZXQgZmVhdHVyZUNvbGxlY3Rpb24gPSB0aGlzLl9nZXRGZWF0dXJlQ29sbGVjdGlvbigpO1xuICAgIGZlYXR1cmVDb2xsZWN0aW9uID0gZmVhdHVyZUNvbGxlY3Rpb24gJiYgZmVhdHVyZUNvbGxlY3Rpb24uZ2V0T2JqZWN0KCk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uICYmIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzO1xuICB9O1xuXG4gIGFkZEZlYXR1cmVzID0gKGZlYXR1cmVzOiBGZWF0dXJlIHwgRmVhdHVyZVtdKSA9PiB7XG4gICAgbGV0IGZlYXR1cmVDb2xsZWN0aW9uID0gdGhpcy5fZ2V0RmVhdHVyZUNvbGxlY3Rpb24oKTtcbiAgICBpZiAoZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShmZWF0dXJlcykpIHtcbiAgICAgICAgZmVhdHVyZXMgPSBbZmVhdHVyZXNdO1xuICAgICAgfVxuXG4gICAgICBmZWF0dXJlQ29sbGVjdGlvbiA9IGZlYXR1cmVDb2xsZWN0aW9uLmFkZEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmZWF0dXJlQ29sbGVjdGlvbiB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlRmVhdHVyZXMgPSAoZmVhdHVyZUluZGV4ZXM6IG51bWJlciB8IG51bWJlcltdKSA9PiB7XG4gICAgbGV0IGZlYXR1cmVDb2xsZWN0aW9uID0gdGhpcy5fZ2V0RmVhdHVyZUNvbGxlY3Rpb24oKTtcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVJbmRleCA9IHRoaXMuX2dldFNlbGVjdGVkRmVhdHVyZUluZGV4KCk7XG4gICAgaWYgKGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmVhdHVyZUluZGV4ZXMpKSB7XG4gICAgICAgIGZlYXR1cmVJbmRleGVzID0gW2ZlYXR1cmVJbmRleGVzXTtcbiAgICAgIH1cbiAgICAgIGZlYXR1cmVDb2xsZWN0aW9uID0gZmVhdHVyZUNvbGxlY3Rpb24uZGVsZXRlRmVhdHVyZXMoZmVhdHVyZUluZGV4ZXMpO1xuICAgICAgY29uc3QgbmV3U3RhdGU6IGFueSA9IHsgZmVhdHVyZUNvbGxlY3Rpb24gfTtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXhlcy5maW5kSW5kZXgoKGluZGV4KSA9PiBzZWxlY3RlZEZlYXR1cmVJbmRleCA9PT0gaW5kZXgpID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRGZWF0dXJlSW5kZXggPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGdldE1vZGVQcm9wcygpIHtcbiAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IHRoaXMuX2dldEZlYXR1cmVDb2xsZWN0aW9uKCk7XG5cbiAgICBjb25zdCB7IGxhc3RQb2ludGVyTW92ZUV2ZW50IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gdGhpcy5fZ2V0U2VsZWN0ZWRGZWF0dXJlSW5kZXgoKTtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC52aWV3cG9ydDtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBmZWF0dXJlQ29sbGVjdGlvbiAmJiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgIHNlbGVjdGVkSW5kZXhlczogaXNOdW1lcmljKHNlbGVjdGVkRmVhdHVyZUluZGV4KSA/IFtzZWxlY3RlZEZlYXR1cmVJbmRleF0gOiBbXSxcbiAgICAgIGxhc3RQb2ludGVyTW92ZUV2ZW50LFxuICAgICAgdmlld3BvcnQsXG4gICAgICBmZWF0dXJlc0RyYWdnYWJsZTogdGhpcy5wcm9wcy5mZWF0dXJlc0RyYWdnYWJsZSxcbiAgICAgIG9uRWRpdDogdGhpcy5fb25FZGl0LFxuICAgICAgb25VcGRhdGVDdXJzb3I6IHRoaXMucHJvcHMub25VcGRhdGVDdXJzb3IsXG4gICAgICBtb2RlQ29uZmlnOiB0aGlzLnByb3BzLm1vZGVDb25maWcsXG4gICAgfTtcbiAgfVxuXG4gIC8qIE1FTU9SSVpFUlMgKi9cbiAgX2dldE1lbW9yaXplZEZlYXR1cmVDb2xsZWN0aW9uID0gbWVtb2l6ZSgoeyBwcm9wc0ZlYXR1cmVzLCBzdGF0ZUZlYXR1cmVzIH06IGFueSkgPT4ge1xuICAgIGNvbnN0IGZlYXR1cmVzID0gcHJvcHNGZWF0dXJlcyB8fCBzdGF0ZUZlYXR1cmVzO1xuICAgIC8vIEFueSBjaGFuZ2VzIGluIEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdFxuICAgIGlmIChmZWF0dXJlcyBpbnN0YW5jZW9mIEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuXG4gICAgaWYgKGZlYXR1cmVzICYmIGZlYXR1cmVzLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24oe1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogZmVhdHVyZXMuZmVhdHVyZXMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uKHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICBmZWF0dXJlczogZmVhdHVyZXMgfHwgW10sXG4gICAgfSk7XG4gIH0pO1xuXG4gIF9nZXRGZWF0dXJlQ29sbGVjdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0TWVtb3JpemVkRmVhdHVyZUNvbGxlY3Rpb24oe1xuICAgICAgcHJvcHNGZWF0dXJlczogdGhpcy5wcm9wcy5mZWF0dXJlcyxcbiAgICAgIHN0YXRlRmVhdHVyZXM6IHRoaXMuc3RhdGUuZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgfSk7XG4gIH07XG5cbiAgX3NldHVwTW9kZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMucHJvcHMubW9kZTtcbiAgICB0aGlzLl9tb2RlSGFuZGxlciA9IG1vZGU7XG5cbiAgICBpZiAoIW1vZGUpIHtcbiAgICAgIHRoaXMuX2RlZ3JlZ2lzdGVyRXZlbnRzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudHMoKTtcbiAgfTtcblxuICAvKiBFRElUSU5HIE9QRVJBVElPTlMgKi9cbiAgX2NsZWFyRWRpdGluZ1N0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRGZWF0dXJlSW5kZXg6IG51bGwsXG5cbiAgICAgIGhvdmVyZWQ6IG51bGwsXG5cbiAgICAgIHBvaW50ZXJEb3duUGlja3M6IG51bGwsXG4gICAgICBwb2ludGVyRG93blNjcmVlbkNvb3JkczogbnVsbCxcbiAgICAgIHBvaW50ZXJEb3duTWFwQ29vcmRzOiBudWxsLFxuXG4gICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGRpZERyYWc6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIF9nZXRTZWxlY3RlZEZlYXR1cmVJbmRleCA9ICgpID0+IHtcbiAgICBpZiAoJ3NlbGVjdGVkRmVhdHVyZUluZGV4JyBpbiB0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZEZlYXR1cmVJbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRGZWF0dXJlSW5kZXg7XG4gIH07XG5cbiAgX29uU2VsZWN0ID0gKHNlbGVjdGVkOiBTZWxlY3RBY3Rpb24pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRGZWF0dXJlSW5kZXg6IHNlbGVjdGVkICYmIHNlbGVjdGVkLnNlbGVjdGVkRmVhdHVyZUluZGV4IH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkKTtcbiAgICB9XG4gIH07XG5cbiAgX29uRWRpdCA9IChlZGl0QWN0aW9uOiBFZGl0QWN0aW9uPGFueT4pID0+IHtcbiAgICBjb25zdCB7IGVkaXRUeXBlLCB1cGRhdGVkRGF0YSwgZWRpdENvbnRleHQgfSA9IGVkaXRBY3Rpb247XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZlYXR1cmVDb2xsZWN0aW9uOiBuZXcgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24odXBkYXRlZERhdGEpIH0pO1xuXG4gICAgc3dpdGNoIChlZGl0VHlwZSkge1xuICAgICAgY2FzZSBFRElUX1RZUEUuQUREX0ZFQVRVUkU6XG4gICAgICAgIHRoaXMuX29uU2VsZWN0KHtcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGwsXG4gICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlSW5kZXg6IG51bGwsXG4gICAgICAgICAgc2VsZWN0ZWRFZGl0SGFuZGxlSW5kZXg6IG51bGwsXG4gICAgICAgICAgc2NyZWVuQ29vcmRzOiBlZGl0Q29udGV4dCAmJiBlZGl0Q29udGV4dC5zY3JlZW5Db29yZHMsXG4gICAgICAgICAgbWFwQ29vcmRzOiBlZGl0Q29udGV4dCAmJiBlZGl0Q29udGV4dC5tYXBDb29yZHMsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGUoe1xuICAgICAgICBkYXRhOiB1cGRhdGVkRGF0YSAmJiB1cGRhdGVkRGF0YS5mZWF0dXJlcyxcbiAgICAgICAgZWRpdFR5cGUsXG4gICAgICAgIGVkaXRDb250ZXh0LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qIEVWRU5UUyAqL1xuICBfZGVncmVnaXN0ZXJFdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZXZlbnRNYW5hZ2VyID0gdGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LmV2ZW50TWFuYWdlcjtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRNYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50c1JlZ2lzdGVyZWQpIHtcbiAgICAgIGV2ZW50TWFuYWdlci5vZmYodGhpcy5fZXZlbnRzKTtcbiAgICAgIHRoaXMuX2V2ZW50c1JlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgX3JlZ2lzdGVyRXZlbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlZiA9IHRoaXMuX2NvbnRhaW5lclJlZjtcbiAgICBjb25zdCBldmVudE1hbmFnZXIgPSB0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQuZXZlbnRNYW5hZ2VyO1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFyZWYgfHwgIWV2ZW50TWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHNSZWdpc3RlcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnRNYW5hZ2VyLm9uKHRoaXMuX2V2ZW50cywgcmVmKTtcbiAgICB0aGlzLl9ldmVudHNSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgfTtcblxuICBfb25FdmVudCA9IChoYW5kbGVyOiBGdW5jdGlvbiwgZXZ0OiBNam9sbmlyRXZlbnQsIHN0b3BQcm9wYWdhdGlvbjogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5fZ2V0RXZlbnQoZXZ0KTtcbiAgICBoYW5kbGVyKGV2ZW50KTtcblxuICAgIGlmIChzdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgX29uQ2xpY2sgPSAoZXZlbnQ6IEJhc2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IG1vZGVQcm9wcyA9IHRoaXMuZ2V0TW9kZVByb3BzKCk7XG4gICAgLy8gVE9ETyByZWZhY3RvciBFZGl0aW5nTW9kZVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodGhpcy5fbW9kZUhhbmRsZXIgaW5zdGFuY2VvZiBFZGl0aW5nTW9kZSB8fCB0aGlzLnByb3BzLnNlbGVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHsgbWFwQ29vcmRzLCBzY3JlZW5Db29yZHMgfSA9IGV2ZW50O1xuICAgICAgY29uc3QgcGlja2VkT2JqZWN0ID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF07XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpZiAocGlja2VkT2JqZWN0ICYmIGlzTnVtZXJpYyhwaWNrZWRPYmplY3QuZmVhdHVyZUluZGV4KSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gcGlja2VkT2JqZWN0LmZlYXR1cmVJbmRleDtcbiAgICAgICAgdGhpcy5fb25TZWxlY3Qoe1xuICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZTogcGlja2VkT2JqZWN0Lm9iamVjdCxcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmVJbmRleCxcbiAgICAgICAgICBzZWxlY3RlZEVkaXRIYW5kbGVJbmRleDpcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHBpY2tlZE9iamVjdC50eXBlID09PSBFTEVNRU5UX1RZUEUuRURJVF9IQU5ETEUgPyBwaWNrZWRPYmplY3QuaW5kZXggOiBudWxsLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBtYXBDb29yZHMsXG4gICAgICAgICAgc2NyZWVuQ29vcmRzLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX29uU2VsZWN0KHtcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGwsXG4gICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlSW5kZXg6IG51bGwsXG4gICAgICAgICAgc2VsZWN0ZWRFZGl0SGFuZGxlSW5kZXg6IG51bGwsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIG1hcENvb3JkcyxcbiAgICAgICAgICBzY3JlZW5Db29yZHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX21vZGVIYW5kbGVyLmhhbmRsZUNsaWNrKGV2ZW50LCBtb2RlUHJvcHMpO1xuICB9O1xuXG4gIF9vbkRibGNsaWNrID0gKGV2ZW50OiBCYXNlRXZlbnQpID0+IHtcbiAgICBpZiAoaXNOdW1lcmljKHRoaXMuX2dldFNlbGVjdGVkRmVhdHVyZUluZGV4KCkpKSB7XG4gICAgICBldmVudC5zb3VyY2VFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgX29uUG9pbnRlck1vdmUgPSAoZXZlbnQ6IEJhc2VFdmVudCkgPT4ge1xuICAgIC8vIGhvdmVyaW5nXG4gICAgY29uc3QgaG92ZXJlZCA9IHRoaXMuX2dldEhvdmVyU3RhdGUoZXZlbnQpO1xuICAgIGNvbnN0IHtcbiAgICAgIGlzRHJhZ2dpbmcsXG4gICAgICBkaWREcmFnLFxuICAgICAgcG9pbnRlckRvd25QaWNrcyxcbiAgICAgIHBvaW50ZXJEb3duU2NyZWVuQ29vcmRzLFxuICAgICAgcG9pbnRlckRvd25NYXBDb29yZHMsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoaXNEcmFnZ2luZyAmJiAhZGlkRHJhZyAmJiBwb2ludGVyRG93blNjcmVlbkNvb3Jkcykge1xuICAgICAgY29uc3QgZHggPSBldmVudC5zY3JlZW5Db29yZHNbMF0gLSBwb2ludGVyRG93blNjcmVlbkNvb3Jkc1swXTtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQuc2NyZWVuQ29vcmRzWzFdIC0gcG9pbnRlckRvd25TY3JlZW5Db29yZHNbMV07XG4gICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiA1KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaWREcmFnOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvaW50ZXJNb3ZlRXZlbnQgPSB7XG4gICAgICAuLi5ldmVudCxcbiAgICAgIGlzRHJhZ2dpbmcsXG4gICAgICBwb2ludGVyRG93blBpY2tzLFxuICAgICAgcG9pbnRlckRvd25TY3JlZW5Db29yZHMsXG4gICAgICBwb2ludGVyRG93bk1hcENvb3JkcyxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuZGlkRHJhZykge1xuICAgICAgY29uc3QgbW9kZVByb3BzID0gdGhpcy5nZXRNb2RlUHJvcHMoKTtcbiAgICAgIHRoaXMuX21vZGVIYW5kbGVyLmhhbmRsZVBvaW50ZXJNb3ZlKHBvaW50ZXJNb3ZlRXZlbnQsIG1vZGVQcm9wcyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBob3ZlcmVkLFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbGFzdFBvaW50ZXJNb3ZlRXZlbnQ6IHBvaW50ZXJNb3ZlRXZlbnQsXG4gICAgfSk7XG4gIH07XG5cbiAgX29uUG9pbnRlckRvd24gPSAoZXZlbnQ6IEJhc2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGRyYWdUb0RyYXcgPSB0aGlzLnByb3BzLm1vZGVDb25maWcgJiYgdGhpcy5wcm9wcy5tb2RlQ29uZmlnLmRyYWdUb0RyYXc7XG4gICAgY29uc3QgaXNEcmFnZ2luZyA9IEJvb2xlYW4oZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF0pIHx8IGRyYWdUb0RyYXc7XG4gICAgY29uc3Qgc3RhcnREcmFnZ2luZ0V2ZW50ID0ge1xuICAgICAgLi4uZXZlbnQsXG4gICAgICBpc0RyYWdnaW5nLFxuICAgICAgcG9pbnRlckRvd25TY3JlZW5Db29yZHM6IGV2ZW50LnNjcmVlbkNvb3JkcyxcbiAgICAgIHBvaW50ZXJEb3duTWFwQ29vcmRzOiBldmVudC5tYXBDb29yZHMsXG4gICAgICBjYW5jZWxQYW46IGV2ZW50LnNvdXJjZUV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbixcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICBpc0RyYWdnaW5nLFxuICAgICAgcG9pbnRlckRvd25QaWNrczogZXZlbnQucGlja3MsXG4gICAgICBwb2ludGVyRG93blNjcmVlbkNvb3JkczogZXZlbnQuc2NyZWVuQ29vcmRzLFxuICAgICAgcG9pbnRlckRvd25NYXBDb29yZHM6IGV2ZW50Lm1hcENvb3JkcyxcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblxuICAgIGNvbnN0IG1vZGVQcm9wcyA9IHRoaXMuZ2V0TW9kZVByb3BzKCk7XG4gICAgdGhpcy5fbW9kZUhhbmRsZXIuaGFuZGxlU3RhcnREcmFnZ2luZyhzdGFydERyYWdnaW5nRXZlbnQsIG1vZGVQcm9wcyk7XG4gIH07XG5cbiAgX29uUG9pbnRlclVwID0gKGV2ZW50OiBCYXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGRpZERyYWcsIHBvaW50ZXJEb3duUGlja3MsIHBvaW50ZXJEb3duU2NyZWVuQ29vcmRzLCBwb2ludGVyRG93bk1hcENvb3JkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdG9wRHJhZ2dpbmdFdmVudCA9IHtcbiAgICAgIC4uLmV2ZW50LFxuICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICBwb2ludGVyRG93blBpY2tzOiBkaWREcmFnID8gcG9pbnRlckRvd25QaWNrcyA6IG51bGwsXG4gICAgICBwb2ludGVyRG93blNjcmVlbkNvb3JkczogZGlkRHJhZyA/IHBvaW50ZXJEb3duU2NyZWVuQ29vcmRzIDogbnVsbCxcbiAgICAgIHBvaW50ZXJEb3duTWFwQ29vcmRzOiBkaWREcmFnID8gcG9pbnRlckRvd25NYXBDb29yZHMgOiBudWxsLFxuICAgICAgY2FuY2VsUGFuOiBldmVudC5zb3VyY2VFdmVudC5jYW5jZWxQYW4sXG4gICAgfTtcblxuICAgIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICBkaWREcmFnOiBmYWxzZSxcbiAgICAgIHBvaW50ZXJEb3duUGlja3M6IG51bGwsXG4gICAgICBwb2ludGVyRG93blNjcmVlbkNvb3JkczogbnVsbCxcbiAgICAgIHBvaW50ZXJEb3duTWFwQ29vcmRzOiBudWxsLFxuICAgIH07XG5cbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgICBjb25zdCBtb2RlUHJvcHMgPSB0aGlzLmdldE1vZGVQcm9wcygpO1xuXG4gICAgaWYgKGRpZERyYWcpIHtcbiAgICAgIHRoaXMuX21vZGVIYW5kbGVyLmhhbmRsZVN0b3BEcmFnZ2luZyhzdG9wRHJhZ2dpbmdFdmVudCwgbW9kZVByb3BzKTtcbiAgICB9XG4gIH07XG5cbiAgX29uUGFuID0gKGV2ZW50OiBCYXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGlzRHJhZ2dpbmcgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgIGV2ZW50LnNvdXJjZUV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbW9kZUhhbmRsZXIuaGFuZGxlUGFuKSB7XG4gICAgICB0aGlzLl9tb2RlSGFuZGxlci5oYW5kbGVQYW4oZXZlbnQsIHRoaXMuZ2V0TW9kZVByb3BzKCkpO1xuICAgIH1cbiAgfTtcblxuICAvKiBIRUxQRVJTICovXG4gIHByb2plY3QgPSAocHQ6IFtudW1iZXIsIG51bWJlcl0pID0+IHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC52aWV3cG9ydDtcbiAgICByZXR1cm4gdmlld3BvcnQgJiYgdmlld3BvcnQucHJvamVjdChwdCk7XG4gIH07XG5cbiAgdW5wcm9qZWN0ID0gKHB0OiBbbnVtYmVyLCBudW1iZXJdKSA9PiB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQudmlld3BvcnQ7XG4gICAgcmV0dXJuIHZpZXdwb3J0ICYmIHZpZXdwb3J0LnVucHJvamVjdChwdCk7XG4gIH07XG5cbiAgX2dldEV2ZW50KGV2dDogTWpvbG5pckV2ZW50KSB7XG4gICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLmdldEZlYXR1cmVzKCk7XG4gICAgY29uc3QgZ3VpZGVzID0gdGhpcy5fbW9kZUhhbmRsZXIuZ2V0R3VpZGVzKHRoaXMuZ2V0TW9kZVByb3BzKCkpO1xuICAgIGNvbnN0IHBpY2tlZCA9IHBhcnNlRXZlbnRFbGVtZW50KGV2dCwgZmVhdHVyZXMsIGd1aWRlcyAmJiBndWlkZXMuZmVhdHVyZXMpO1xuICAgIGNvbnN0IHNjcmVlbkNvb3JkcyA9IGdldFNjcmVlbkNvb3JkcyhldnQpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBtYXBDb29yZHMgPSB0aGlzLnVucHJvamVjdChzY3JlZW5Db29yZHMpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBpY2tzOiBwaWNrZWQgPyBbcGlja2VkXSA6IG51bGwsXG4gICAgICBzY3JlZW5Db29yZHMsXG4gICAgICBtYXBDb29yZHMsXG4gICAgICBzb3VyY2VFdmVudDogZXZ0LFxuICAgIH07XG4gIH1cblxuICBfZ2V0SG92ZXJTdGF0ZSA9IChldmVudDogQmFzZUV2ZW50KSA9PiB7XG4gICAgY29uc3Qgb2JqZWN0ID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF07XG4gICAgaWYgKCFvYmplY3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzY3JlZW5Db29yZHM6IGV2ZW50LnNjcmVlbkNvb3JkcyxcbiAgICAgIG1hcENvb3JkczogZXZlbnQubWFwQ29vcmRzLFxuICAgICAgLi4ub2JqZWN0LFxuICAgIH07XG4gIH07XG5cbiAgX3JlbmRlcigpIHtcbiAgICByZXR1cm4gPGRpdiAvPjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1hcENvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgIHsoY29udGV4dCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gY29udGV4dCAmJiBjb250ZXh0LnZpZXdwb3J0O1xuXG4gICAgICAgICAgaWYgKCF2aWV3cG9ydCB8fCB2aWV3cG9ydC5oZWlnaHQgPD0gMCB8fCB2aWV3cG9ydC53aWR0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgIH19XG4gICAgICA8L01hcENvbnRleHQuQ29uc3VtZXI+XG4gICAgKTtcbiAgfVxufVxuIl19
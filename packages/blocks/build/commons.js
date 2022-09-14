(self["webpackChunkpaymentplugins_plaid_gateway"] = self["webpackChunkpaymentplugins_plaid_gateway"] || []).push([["commons"],{

/***/ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadStripe": () => (/* binding */ loadStripe)
/* harmony export */ });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.36.0",
    startTime: startTime
  });
};

var stripePromise = null;
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }

  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }

    try {
      var script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener('load', function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load Stripe.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }

  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

// own script injection.

var stripePromise$1 = Promise.resolve().then(function () {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function (err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};




/***/ }),

/***/ "./packages/blocks/assets/js/components/checkout/index.js":
/*!****************************************************************!*\
  !*** ./packages/blocks/assets/js/components/checkout/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _paymentMethodLabel = __webpack_require__(/*! ./payment-method-label */ "./packages/blocks/assets/js/components/checkout/payment-method-label/index.js");

Object.keys(_paymentMethodLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paymentMethodLabel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paymentMethodLabel[key];
    }
  });
});

var _paymentMethod = __webpack_require__(/*! ./payment-method */ "./packages/blocks/assets/js/components/checkout/payment-method/index.js");

Object.keys(_paymentMethod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paymentMethod[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paymentMethod[key];
    }
  });
});

/***/ }),

/***/ "./packages/blocks/assets/js/components/checkout/payment-method-label/index.js":
/*!*************************************************************************************!*\
  !*** ./packages/blocks/assets/js/components/checkout/payment-method-label/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var React = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PaymentMethodLabel = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

__webpack_require__(/*! ./style.scss */ "./packages/blocks/assets/js/components/checkout/payment-method-label/style.scss");

var _excluded = ["title", "icons", "paymentMethod"];

var PaymentMethodLabel = function PaymentMethodLabel(_ref) {
  var title = _ref.title,
      icons = _ref.icons,
      paymentMethod = _ref.paymentMethod,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _props$components = props.components,
      Label = _props$components.PaymentMethodLabel,
      Icons = _props$components.PaymentMethodIcons;

  if (!Array.isArray(icons)) {
    icons = [icons];
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "wc-stripe-label-container ".concat(paymentMethod)
  }, /*#__PURE__*/React.createElement(Label, {
    text: title
  }), /*#__PURE__*/React.createElement(Icons, {
    icons: icons,
    align: "left"
  }));
};

exports.PaymentMethodLabel = PaymentMethodLabel;

/***/ }),

/***/ "./packages/blocks/assets/js/components/checkout/payment-method/index.js":
/*!*******************************************************************************!*\
  !*** ./packages/blocks/assets/js/components/checkout/payment-method/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var React = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PaymentMethod = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _excluded = ["getData", "content"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var PaymentMethod = function PaymentMethod(_ref) {
  var getData = _ref.getData,
      content = _ref.content,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var Content = content;
  var desc = getData('description');
  var el = (0, _element.useRef)(null);
  (0, _element.useEffect)(function () {
    if (el.current && el.current.childNodes.length == 0) {
      el.current.classList.add('no-content');
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, desc && /*#__PURE__*/React.createElement(Description, {
    desc: desc,
    payment_method: getData('name')
  }), /*#__PURE__*/React.createElement("div", {
    ref: el,
    className: "wc-stripe-blocks-payment-method-content"
  }, /*#__PURE__*/React.createElement(Content, _objectSpread(_objectSpread({}, props), {}, {
    getData: getData
  }))));
};

exports.PaymentMethod = PaymentMethod;

var Description = function Description(_ref2) {
  var desc = _ref2.desc,
      payment_method = _ref2.payment_method;
  return /*#__PURE__*/React.createElement("div", {
    className: "wc-stripe-blocks-payment-method__desc ".concat(payment_method)
  }, /*#__PURE__*/React.createElement("p", null, desc));
};

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/hooks/index.js":
/*!******************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/hooks/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _useProcessCheckoutError = __webpack_require__(/*! ./use-process-checkout-error */ "./packages/blocks/assets/js/payment-methods/hooks/use-process-checkout-error.js");

Object.keys(_useProcessCheckoutError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useProcessCheckoutError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useProcessCheckoutError[key];
    }
  });
});

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/hooks/use-process-checkout-error.js":
/*!***************************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/hooks/use-process-checkout-error.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useProcessCheckoutError = void 0;

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var useProcessCheckoutError = function useProcessCheckoutError(_ref) {
  var responseTypes = _ref.responseTypes,
      subscriber = _ref.subscriber,
      _ref$messageContext = _ref.messageContext,
      messageContext = _ref$messageContext === void 0 ? null : _ref$messageContext;
  (0, _element.useEffect)(function () {
    var unsubscribe = subscriber(function (data) {
      var _data$processingRespo;

      if (data !== null && data !== void 0 && (_data$processingRespo = data.processingResponse.paymentDetails) !== null && _data$processingRespo !== void 0 && _data$processingRespo.stripeErrorMessage) {
        console.log(data.processingResponse.paymentDetails.stripeErrorMessage);
        return {
          type: responseTypes.ERROR,
          message: data.processingResponse.paymentDetails.stripeErrorMessage,
          messageContext: messageContext
        };
      }

      return null;
    });
    return function () {
      return unsubscribe();
    };
  }, [responseTypes, subscriber]);
};

exports.useProcessCheckoutError = useProcessCheckoutError;

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/hooks/index.js":
/*!************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/hooks/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _useCreateLinkToken = __webpack_require__(/*! ./use-create-link-token */ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-create-link-token.js");

Object.keys(_useCreateLinkToken).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCreateLinkToken[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCreateLinkToken[key];
    }
  });
});

var _useInitializePlaid = __webpack_require__(/*! ./use-initialize-plaid */ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-initialize-plaid.js");

Object.keys(_useInitializePlaid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useInitializePlaid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useInitializePlaid[key];
    }
  });
});

var _useProcessPayment = __webpack_require__(/*! ./use-process-payment */ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-process-payment.js");

Object.keys(_useProcessPayment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useProcessPayment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useProcessPayment[key];
    }
  });
});

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-create-link-token.js":
/*!****************************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/hooks/use-create-link-token.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useCreateLinkToken = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _apiFetch = _interopRequireDefault(__webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch"));

var _util = __webpack_require__(/*! ../../util */ "./packages/blocks/assets/js/payment-methods/util.js");

var useCreateLinkToken = function useCreateLinkToken(_ref) {
  var setValidationError = _ref.setValidationError;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      linkToken = _useState2[0],
      setLinkToken = _useState2[1];

  var createToken = (0, _element.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _apiFetch.default)({
              url: (0, _util.getRoute)('create/linkToken'),
              method: 'POST',
              data: {}
            });

          case 3:
            response = _context.sent;

            if (response.token) {
              (0, _util.storeInCache)('linkToken', response.token);
              setLinkToken(response.token);
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            setValidationError(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  })), []);
  (0, _element.useEffect)(function () {
    if (!linkToken) {
      var token = (0, _util.getFromCache)('linkToken');

      if (token) {
        // cached token exist so use it
        setLinkToken(token);
      } else {
        // create the Plaid Link token
        createToken();
      }
    }
  }, [linkToken, setLinkToken]);
  return linkToken;
};

exports.useCreateLinkToken = useCreateLinkToken;

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-initialize-plaid.js":
/*!***************************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/hooks/use-initialize-plaid.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useInitializePlaid = void 0;

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _plaid = _interopRequireDefault(__webpack_require__(/*! @plaid */ "@plaid"));

var _util = __webpack_require__(/*! ../../util */ "./packages/blocks/assets/js/payment-methods/util.js");

var useInitializePlaid = function useInitializePlaid(_ref) {
  var getData = _ref.getData,
      linkToken = _ref.linkToken;
  var linkHandler = (0, _element.useRef)(null);
  var resolvePopup = (0, _element.useRef)(null);
  var openLinkPopup = (0, _element.useCallback)(function () {
    return new Promise(function (resolve, reject) {
      resolvePopup.current = {
        resolve: resolve,
        reject: reject
      };
      linkHandler.current.open();
    });
  }, []); // if the token exists, initialize Plaid's link handler

  (0, _element.useEffect)(function () {
    if (linkToken) {
      linkHandler.current = _plaid.default.create({
        clientName: getData('clientName'),
        env: getData('plaidEnvironment'),
        product: ['auth'],
        token: linkToken,
        selectAccount: true,
        countryCodes: ['US'],
        onSuccess: function onSuccess(publicToken, metaData) {
          resolvePopup.current.resolve({
            publicToken: publicToken,
            metaData: metaData
          });
        },
        onExit: function onExit(err) {
          resolvePopup.current.reject(err ? (0, _util.getErrorMessage)(err.error_message) : false);
        }
      });
    }
  }, [linkToken]);
  return openLinkPopup;
};

exports.useInitializePlaid = useInitializePlaid;

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/hooks/use-process-payment.js":
/*!**************************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/hooks/use-process-payment.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useProcessPayment = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _util = __webpack_require__(/*! ../../util */ "./packages/blocks/assets/js/payment-methods/util.js");

var useProcessPayment = function useProcessPayment(_ref) {
  var openLinkPopup = _ref.openLinkPopup,
      onPaymentProcessing = _ref.onPaymentProcessing,
      responseTypes = _ref.responseTypes,
      paymentMethod = _ref.paymentMethod;
  (0, _element.useEffect)(function () {
    var unsubscribe = onPaymentProcessing( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _paymentMethodData, result, publicToken, metaData;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return openLinkPopup();

            case 3:
              result = _context.sent;
              publicToken = result.publicToken, metaData = result.metaData; // remove the cached link token.

              (0, _util.deleteFromCache)('linkToken');
              return _context.abrupt("return", (0, _util.ensureSuccessResponse)(responseTypes, {
                meta: {
                  paymentMethodData: (_paymentMethodData = {}, (0, _defineProperty2.default)(_paymentMethodData, "".concat(paymentMethod, "_token_key"), publicToken), (0, _defineProperty2.default)(_paymentMethodData, "".concat(paymentMethod, "_metadata"), JSON.stringify(metaData)), _paymentMethodData)
                }
              }));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _util.ensureErrorResponse)(responseTypes, _context.t0));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    })));
    return function () {
      return unsubscribe();
    };
  }, [onPaymentProcessing, responseTypes, openLinkPopup]);
};

exports.useProcessPayment = useProcessPayment;

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/index.js":
/*!******************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./styles.scss */ "./packages/blocks/assets/js/payment-methods/plaid/styles.scss");

__webpack_require__(/*! ./payment-method */ "./packages/blocks/assets/js/payment-methods/plaid/payment-method.js");

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/payment-method.js":
/*!***************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/payment-method.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var React = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _blocksRegistry = __webpack_require__(/*! @woocommerce/blocks-registry */ "@woocommerce/blocks-registry");

var _util = __webpack_require__(/*! ../util */ "./packages/blocks/assets/js/payment-methods/util.js");

var _checkout = __webpack_require__(/*! ../../components/checkout */ "./packages/blocks/assets/js/components/checkout/index.js");

var _savedCardComponent = _interopRequireDefault(__webpack_require__(/*! ../saved-card-component */ "./packages/blocks/assets/js/payment-methods/saved-card-component.js"));

var _hooks = __webpack_require__(/*! ./hooks */ "./packages/blocks/assets/js/payment-methods/plaid/hooks/index.js");

var _hooks2 = __webpack_require__(/*! ../hooks */ "./packages/blocks/assets/js/payment-methods/hooks/index.js");

var _i18n = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");

var _excluded = ["getData", "eventRegistration", "components", "emitResponse", "onSubmit"];
var getData = (0, _util.getSettings)('stripe_plaid_data');

var ACHPaymentContent = function ACHPaymentContent(_ref) {
  var getData = _ref.getData,
      eventRegistration = _ref.eventRegistration,
      components = _ref.components,
      emitResponse = _ref.emitResponse,
      onSubmit = _ref.onSubmit,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var responseTypes = emitResponse.responseTypes;
  var onPaymentProcessing = eventRegistration.onPaymentProcessing,
      onCheckoutAfterProcessingWithError = eventRegistration.onCheckoutAfterProcessingWithError;
  var ValidationInputError = components.ValidationInputError,
      LoadingMask = components.LoadingMask;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      validationError = _useState2[0],
      setValidationError = _useState2[1];

  var linkToken = (0, _hooks.useCreateLinkToken)({
    setValidationError: setValidationError
  });
  (0, _hooks2.useProcessCheckoutError)({
    responseTypes: responseTypes,
    subscriber: onCheckoutAfterProcessingWithError
  });
  var openLinkPopup = (0, _hooks.useInitializePlaid)({
    getData: getData,
    linkToken: linkToken,
    onSubmit: onSubmit
  });
  (0, _hooks.useProcessPayment)({
    openLinkPopup: openLinkPopup,
    onPaymentProcessing: onPaymentProcessing,
    responseTypes: responseTypes,
    paymentMethod: getData('name')
  });
  return /*#__PURE__*/React.createElement(LoadingMask, {
    isLoading: !validationError && !linkToken,
    showSpinner: true
  }, _util.isTestMode && /*#__PURE__*/React.createElement(ACHTestModeCredentials, null), validationError && /*#__PURE__*/React.createElement(ValidationInputError, {
    errorMessage: validationError
  }));
};

var ACHTestModeCredentials = function ACHTestModeCredentials() {
  return /*#__PURE__*/React.createElement("div", {
    className: "wc-stripe-blocks-ach__creds"
  }, /*#__PURE__*/React.createElement("label", {
    className: "wc-stripe-blocks-ach__creds-label"
  }, (0, _i18n.__)('Test Credentials', 'woo-stripe-payment')), /*#__PURE__*/React.createElement("div", {
    className: "wc-stripe-blocks-ach__username"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, (0, _i18n.__)('username', 'woo-stripe-payment')), ": user_good"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, (0, _i18n.__)('password', 'woo-stripe-payment')), ": pass_good"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, (0, _i18n.__)('pin', 'woo-stripe-payment')), ": credential_good")));
};

(0, _blocksRegistry.registerPaymentMethod)({
  name: getData('name'),
  label: /*#__PURE__*/React.createElement(_checkout.PaymentMethodLabel, {
    title: getData('title'),
    paymentMethod: getData('name'),
    icons: getData('icons')
  }),
  ariaLabel: 'ACH Payment',
  canMakePayment: function canMakePayment(_ref2) {
    var cartTotals = _ref2.cartTotals;
    return cartTotals.currency_code === 'USD';
  },
  content: /*#__PURE__*/React.createElement(_checkout.PaymentMethod, {
    getData: getData,
    content: ACHPaymentContent
  }),
  savedTokenComponent: /*#__PURE__*/React.createElement(_savedCardComponent.default, {
    getData: getData
  }),
  edit: /*#__PURE__*/React.createElement(ACHPaymentContent, {
    getData: getData
  }),
  placeOrderButtonLabel: getData('placeOrderButtonLabel'),
  supports: {
    showSavedCards: getData('showSavedCards'),
    showSaveOption: false,
    features: getData('features')
  }
});

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/saved-card-component.js":
/*!***************************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/saved-card-component.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _element = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

var _util = __webpack_require__(/*! ./util */ "./packages/blocks/assets/js/payment-methods/util.js");

var _hooks = __webpack_require__(/*! ./hooks */ "./packages/blocks/assets/js/payment-methods/hooks/index.js");

var SavedCardComponent = function SavedCardComponent(_ref) {
  var eventRegistration = _ref.eventRegistration,
      emitResponse = _ref.emitResponse,
      getData = _ref.getData,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'handleCardAction' : _ref$method;
  var onCheckoutAfterProcessingWithSuccess = eventRegistration.onCheckoutAfterProcessingWithSuccess,
      onCheckoutAfterProcessingWithError = eventRegistration.onCheckoutAfterProcessingWithError;
  var responseTypes = emitResponse.responseTypes;
  (0, _hooks.useProcessCheckoutError)({
    responseTypes: responseTypes,
    subscriber: onCheckoutAfterProcessingWithError,
    messageContext: emitResponse.noticeContexts.PAYMENTS
  });
  var handleSuccessResult = (0, _element.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref2) {
      var redirectUrl;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              redirectUrl = _ref2.redirectUrl;
              _context.next = 3;
              return (0, _util.handleCardAction)({
                redirectUrl: redirectUrl,
                getData: getData,
                responseTypes: responseTypes,
                method: method
              });

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  (0, _element.useEffect)(function () {
    var unsubscribe = onCheckoutAfterProcessingWithSuccess(handleSuccessResult);
    return function () {
      return unsubscribe();
    };
  }, [onCheckoutAfterProcessingWithSuccess, handleSuccessResult]);
  return null;
};

var _default = SavedCardComponent;
exports["default"] = _default;

/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/util.js":
/*!***********************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/util.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.versionCompare = exports.toCartAddress = exports.storeInCache = exports.removeNumberPrecision = exports.registerLocalPaymentMethod = exports.registerCreditCardForm = exports.isUserLoggedIn = exports.isTestMode = exports.isNextActionRequired = exports.isFieldRequired = exports.isEmpty = exports.isCheckoutPage = exports.isCartPage = exports.isAddressValid = exports.initStripe = exports.hasShippingRates = exports.handleCardAction = exports.getShippingOptions = exports.getShippingOptionId = exports.getSettings = exports.getSelectedShippingOption = exports.getRoute = exports.getLocaleFields = exports.getLocalPaymentMethods = exports.getIntermediateAddress = exports.getFromCache = exports.getErrorMessage = exports.getDisplayItems = exports.getDefaultSourceArgs = exports.getCreditCardForm = exports.getBillingDetailsFromAddress = exports.formatPrice = exports.filterEmptyValues = exports.ensureSuccessResponse = exports.ensureErrorResponse = exports.deleteFromCache = exports.cartContainsSubscription = exports.cartContainsPreOrder = exports.canMakePayment = exports.StripeError = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _stripeJs = __webpack_require__(/*! @stripe/stripe-js */ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js");

var _settings = __webpack_require__(/*! @woocommerce/settings */ "@woocommerce/settings");

var _apiFetch = _interopRequireDefault(__webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch"));

var _priceFormat = __webpack_require__(/*! @woocommerce/price-format */ "@woocommerce/price-format");

var _excluded = ["id"];

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _getSetting = (0, _settings.getSetting)('stripeGeneralData'),
    publishableKey = _getSetting.publishableKey,
    stripeParams = _getSetting.stripeParams;

var messages = (0, _settings.getSetting)('stripeErrorMessages');
var countryLocale = (0, _settings.getSetting)('countryLocale', {});
var SHIPPING_OPTION_REGEX = /^([\w]+)\:(.+)$/;
var routes = (0, _settings.getSetting)('stripeGeneralData').routes;
var creditCardForms = {};
var localPaymentMethods = [];
var CACHE_PREFIX = 'stripe:';
var PAYMENT_REQUEST_ADDRESS_MAPPINGS = {
  recipient: function recipient(address, name) {
    address.first_name = name.split(' ').slice(0, -1).join(' ');
    address.last_name = name.split(' ').pop();
    return address;
  },
  payerName: function payerName(address, name) {
    address.first_name = name.split(' ').slice(0, -1).join(' ');
    address.last_name = name.split(' ').pop();
    return address;
  },
  country: 'country',
  addressLine: function addressLine(address, value) {
    if (value[0]) {
      address.address_1 = value[0];
    }

    if (value[1]) {
      address.address_2 = value[1];
    }

    return address;
  },
  line1: 'address_1',
  line2: 'address_2',
  city: 'city',
  region: 'state',
  state: 'state',
  postalCode: 'postcode',
  postal_code: 'postcode',
  payerEmail: 'email',
  payerPhone: 'phone'
};
var initStripe = new Promise(function (resolve, reject) {
  (0, _stripeJs.loadStripe)(publishableKey, stripeParams).then(function (stripe) {
    resolve(stripe);
  }).catch(function (err) {
    resolve({
      error: err
    });
  });
});
exports.initStripe = initStripe;

var registerCreditCardForm = function registerCreditCardForm(_ref) {
  var id = _ref.id,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  creditCardForms[id] = props;
};

exports.registerCreditCardForm = registerCreditCardForm;

var getCreditCardForm = function getCreditCardForm(id) {
  return creditCardForms.hasOwnProperty(id) ? creditCardForms[id] : {};
};

exports.getCreditCardForm = getCreditCardForm;

var getRoute = function getRoute(route) {
  return routes !== null && routes !== void 0 && routes[route] ? routes[route] : console.log("".concat(route, " is not a valid route"));
};

exports.getRoute = getRoute;

var ensureSuccessResponse = function ensureSuccessResponse(responseTypes) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread({
    type: responseTypes.SUCCESS
  }, data);
};
/**
 * Returns a formatted error object used by observers
 * @param responseTypes
 * @param error
 * @returns {{type: *, message: *}}
 */


exports.ensureSuccessResponse = ensureSuccessResponse;

var ensureErrorResponse = function ensureErrorResponse(responseTypes, error) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread({
    type: responseTypes.ERROR,
    message: getErrorMessage(error)
  }, options);
};
/**
 * Return a customized error message.
 * @param error
 */


exports.ensureErrorResponse = ensureErrorResponse;

var getErrorMessage = function getErrorMessage(error) {
  if (typeof error == 'string') {
    return error;
  }

  if (error !== null && error !== void 0 && error.code && messages !== null && messages !== void 0 && messages[error.code]) {
    return messages[error.code];
  }

  if (error !== null && error !== void 0 && error.statusCode) {
    return messages !== null && messages !== void 0 && messages[error.statusCode] ? messages[error.statusCode] : error.statusMessage;
  }

  return error.message;
};
/**
 * Return a Stripe formatted billing_details object from a WC address
 * @param billingAddress
 */


exports.getErrorMessage = getErrorMessage;

var getBillingDetailsFromAddress = function getBillingDetailsFromAddress(billingAddress) {
  var billing_details = {
    name: "".concat(billingAddress.first_name, " ").concat(billingAddress.last_name),
    address: {
      city: billingAddress.city || null,
      country: billingAddress.country || null,
      line1: billingAddress.address_1 || null,
      line2: billingAddress.address_2 || null,
      postal_code: billingAddress.postcode || null,
      state: billingAddress.state || null
    }
  };

  if (billingAddress !== null && billingAddress !== void 0 && billingAddress.phone) {
    billing_details.phone = billingAddress.phone;
  }

  if (billingAddress !== null && billingAddress !== void 0 && billingAddress.email) {
    billing_details.email = billingAddress.email;
  }

  return billing_details;
};

exports.getBillingDetailsFromAddress = getBillingDetailsFromAddress;

var getSettings = function getSettings(name) {
  return function (key) {
    if (key) {
      return (0, _settings.getSetting)(name)[key];
    }

    return (0, _settings.getSetting)(name);
  };
};

exports.getSettings = getSettings;

var StripeError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(StripeError, _Error);

  var _super = _createSuper(StripeError);

  function StripeError(error) {
    var _this;

    (0, _classCallCheck2.default)(this, StripeError);
    _this = _super.call(this, error.message);
    _this.error = error;
    return _this;
  }

  return (0, _createClass2.default)(StripeError);
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
/**
 * Returns true if the provided value is empty.
 * @param value
 * @returns {boolean}
 */


exports.StripeError = StripeError;

var isEmpty = function isEmpty(value) {
  if (typeof value === 'string') {
    return value.length == 0 || value == '';
  }

  if (Array.isArray(value)) {
    return array.length == 0;
  }

  if ((0, _typeof2.default)(value) === 'object') {
    return Object.keys(value).length == 0;
  }

  if (typeof value === 'undefined') {
    return true;
  }

  return true;
};

exports.isEmpty = isEmpty;

var removeNumberPrecision = function removeNumberPrecision(value, unit) {
  return value / Math.pow(10, unit);
};
/**
 *
 * @param address
 * @param country
 */


exports.removeNumberPrecision = removeNumberPrecision;

var isAddressValid = function isAddressValid(address) {
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fields = getLocaleFields(address.country);

  for (var _i = 0, _Object$entries = Object.entries(address); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!exclude.includes(key) && fields !== null && fields !== void 0 && fields[key] && fields[key].required) {
      if (isEmpty(value)) {
        return false;
      }
    }
  }

  return true;
};

exports.isAddressValid = isAddressValid;

var getLocaleFields = function getLocaleFields(country) {
  var localeFields = _objectSpread({}, countryLocale.default);

  if (country && countryLocale !== null && countryLocale !== void 0 && countryLocale[country]) {
    localeFields = Object.entries(countryLocale[country]).reduce(function (locale, _ref2) {
      var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      locale[key] = _objectSpread(_objectSpread({}, locale[key]), value);
      return locale;
    }, localeFields);
    ['phone', 'shipping-phone', 'email'].forEach(function (key) {
      var node = document.getElementById(key);

      if (node) {
        localeFields[key] = {
          required: node.required
        };
      }
    });
  }

  return localeFields;
};
/**
 * Return true if the field is required by the cart
 * @param field
 * @param country
 * @returns {boolean|*}
 */


exports.getLocaleFields = getLocaleFields;

var isFieldRequired = function isFieldRequired(field) {
  var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var fields = getLocaleFields(country);
  return [field] in fields && fields[field].required;
};

exports.isFieldRequired = isFieldRequired;

var getSelectedShippingOption = function getSelectedShippingOption(id) {
  var result = id.match(SHIPPING_OPTION_REGEX);

  if (result) {
    var packageIdx = result[1],
        rate = result[2];
    return [rate, packageIdx];
  }

  return [];
};

exports.getSelectedShippingOption = getSelectedShippingOption;

var hasShippingRates = function hasShippingRates(shippingRates) {
  return shippingRates.map(function (rate) {
    return rate.shipping_rates.length > 0;
  }).filter(Boolean).length > 0;
};
/**
 * Return true if the customer is logged in.
 * @param customerId
 * @returns {boolean}
 */


exports.hasShippingRates = hasShippingRates;

var isUserLoggedIn = function isUserLoggedIn(customerId) {
  return customerId > 0;
};

exports.isUserLoggedIn = isUserLoggedIn;

var syncPaymentIntentWithOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(order_id, client_secret) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _apiFetch.default)({
              url: routes['sync/intent'],
              method: 'POST',
              data: {
                order_id: order_id,
                client_secret: client_secret
              }
            });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function syncPaymentIntentWithOrder(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();

var handleCardAction = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref5) {
    var redirectUrl, responseTypes, name, _ref5$method, method, _ref5$savePaymentMeth, savePaymentMethod, match, _JSON$parse, client_secret, order_id, order_key, stripe, result, data, response;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            redirectUrl = _ref5.redirectUrl, responseTypes = _ref5.responseTypes, name = _ref5.name, _ref5$method = _ref5.method, method = _ref5$method === void 0 ? 'handleCardAction' : _ref5$method, _ref5$savePaymentMeth = _ref5.savePaymentMethod, savePaymentMethod = _ref5$savePaymentMeth === void 0 ? false : _ref5$savePaymentMeth;
            _context2.prev = 1;
            match = redirectUrl.match(/#response=(.+)/);

            if (!match) {
              _context2.next = 22;
              break;
            }

            _JSON$parse = JSON.parse(window.atob(decodeURIComponent(match[1]))), client_secret = _JSON$parse.client_secret, order_id = _JSON$parse.order_id, order_key = _JSON$parse.order_key;
            _context2.next = 7;
            return initStripe;

          case 7:
            stripe = _context2.sent;
            _context2.next = 10;
            return stripe[method](client_secret);

          case 10:
            result = _context2.sent;

            if (!result.error) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", ensureErrorResponse(responseTypes, result.error));

          case 13:
            // success so finish processing order then redirect to thank you page
            data = (0, _defineProperty2.default)({
              order_id: order_id,
              order_key: order_key
            }, "".concat(name, "_save_source_key"), savePaymentMethod);
            _context2.next = 16;
            return (0, _apiFetch.default)({
              url: getRoute('process/payment'),
              method: 'POST',
              data: data
            });

          case 16:
            response = _context2.sent;

            if (!response.messages) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", ensureErrorResponse(responseTypes, response.messages));

          case 19:
            return _context2.abrupt("return", ensureSuccessResponse(responseTypes, {
              redirectUrl: response.redirect
            }));

          case 22:
            return _context2.abrupt("return", ensureSuccessResponse(responseTypes));

          case 23:
            _context2.next = 29;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            return _context2.abrupt("return", ensureErrorResponse(responseTypes, _context2.t0));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 25]]);
  }));

  return function handleCardAction(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Convert a payment wallet address to a WC cart address.
 * @param address_mappings
 * @returns {function(*, *=): {}}
 */


exports.handleCardAction = handleCardAction;

var toCartAddress = function toCartAddress() {
  var address_mappings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PAYMENT_REQUEST_ADDRESS_MAPPINGS;
  return function (address) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cartAddress = {};
    address = _objectSpread(_objectSpread({}, address), filterEmptyValues(args));

    for (var _i2 = 0, _Object$entries2 = Object.entries(address_mappings); _i2 < _Object$entries2.length; _i2++) {
      var _address;

      var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          cartKey = _Object$entries2$_i[1];

      if ((_address = address) !== null && _address !== void 0 && _address[key]) {
        if (typeof cartKey === 'function') {
          cartKey(cartAddress, address[key]);
        } else {
          cartAddress[cartKey] = address[key];
        }
      }
    }

    return cartAddress;
  };
};
/**
 * Given a WC formatted address, return only the intermediate address values
 * @param address
 * @param fields
 */


exports.toCartAddress = toCartAddress;

var getIntermediateAddress = function getIntermediateAddress(address) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['city', 'postcode', 'state', 'country'];
  var intermediateAddress = {};

  var _iterator = _createForOfIteratorHelper(fields),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      intermediateAddress[key] = address[key];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return intermediateAddress;
};
/**
 *
 * @param values
 * @returns {{}|{[p: string]: *}}
 */


exports.getIntermediateAddress = getIntermediateAddress;

var filterEmptyValues = function filterEmptyValues(values) {
  return Object.keys(values).filter(function (key) {
    return Boolean(values[key]);
  }).reduce(function (obj, key) {
    return _objectSpread(_objectSpread({}, obj), {}, (0, _defineProperty2.default)({}, key, values[key]));
  }, {});
};

exports.filterEmptyValues = filterEmptyValues;

var formatPrice = function formatPrice(price, currencyCode) {
  var _fractional;

  var _getCurrency = (0, _priceFormat.getCurrency)(currencyCode),
      prefix = _getCurrency.prefix,
      suffix = _getCurrency.suffix,
      decimalSeparator = _getCurrency.decimalSeparator,
      minorUnit = _getCurrency.minorUnit,
      thousandSeparator = _getCurrency.thousandSeparator;

  if (price == '' || price === undefined) {
    return price;
  }

  price = typeof price === 'string' ? parseInt(price, 10) : price;
  price = price / Math.pow(10, minorUnit);
  price = price.toString().replace('.', decimalSeparator);
  var fractional = '';
  var index = price.indexOf(decimalSeparator);

  if (index < 0) {
    if (minorUnit > 0) {
      price += "".concat(decimalSeparator).concat(new Array(minorUnit + 1).join('0'));
    }
  } else {
    fractional = price.substr(index + 1);

    if (fractional.length < minorUnit) {
      price += new Array(minorUnit - fractional.length + 1).join('0');
    }
  } // separate out price and decimals so thousands separator can be added.


  var match = price.match(new RegExp("(\\d+)\\".concat(decimalSeparator, "(\\d+)")));

  if (match) {
    price = match[1];
    fractional = match[2];
  }

  price = price.replace(new RegExp("\\B(?=(\\d{3})+(?!\\d))", 'g'), "".concat(thousandSeparator));
  price = ((_fractional = fractional) === null || _fractional === void 0 ? void 0 : _fractional.length) > 0 ? price + decimalSeparator + fractional : price;
  price = prefix + price + suffix;
  return price;
};

exports.formatPrice = formatPrice;

var getShippingOptions = function getShippingOptions(shippingRates) {
  var options = [];
  shippingRates.forEach(function (shippingPackage, idx) {
    // sort by selected rate
    shippingPackage.shipping_rates.sort(function (rate) {
      return rate.selected ? -1 : 1;
    });
    var rates = shippingPackage.shipping_rates.map(function (rate) {
      var txt = document.createElement('textarea');
      txt.innerHTML = rate.name;
      var price = formatPrice(rate.price, rate.currency_code);
      return {
        id: getShippingOptionId(idx, rate.rate_id),
        label: txt.value,
        //detail: `${price}`,
        amount: parseInt(rate.price, 10)
      };
    });
    options = [].concat((0, _toConsumableArray2.default)(options), (0, _toConsumableArray2.default)(rates));
  });
  return options;
};

exports.getShippingOptions = getShippingOptions;

var getShippingOptionId = function getShippingOptionId(packageId, rateId) {
  return "".concat(packageId, ":").concat(rateId);
};

exports.getShippingOptionId = getShippingOptionId;

var getDisplayItems = function getDisplayItems(cartItems, _ref7) {
  var minorUnit = _ref7.minorUnit;
  var items = [];
  var keys = ['total_tax', 'total_shipping'];
  cartItems.forEach(function (item) {
    if (0 < item.value || item.key && keys.includes(item.key)) {
      items.push({
        label: item.label,
        pending: false,
        amount: item.value
      });
    }
  });
  return items;
};

exports.getDisplayItems = getDisplayItems;
var canPay = {};

var canMakePayment = function canMakePayment(_ref8, callback) {
  var country = _ref8.country,
      currency = _ref8.currency,
      total = _ref8.total;
  return new Promise(function (resolve, reject) {
    var key = [country, currency, total.amount].reduce(function (key, value) {
      return "".concat(key, "-").concat(value);
    });

    if (!currency) {
      return resolve(false);
    }

    if (key in canPay) {
      return resolve(canPay[key]);
    }

    return initStripe.then(function (stripe) {
      if (stripe.error) {
        return reject(stripe.error);
      }

      var request = stripe.paymentRequest({
        country: country,
        currency: currency,
        total: total
      });
      request.canMakePayment().then(function (result) {
        canPay[key] = callback(result);
        return resolve(canPay[key]);
      });
    }).catch(reject);
  });
};

exports.canMakePayment = canMakePayment;

var registerLocalPaymentMethod = function registerLocalPaymentMethod(paymentMethod) {
  localPaymentMethods.push(paymentMethod);
};

exports.registerLocalPaymentMethod = registerLocalPaymentMethod;

var getLocalPaymentMethods = function getLocalPaymentMethods() {
  return localPaymentMethods;
};

exports.getLocalPaymentMethods = getLocalPaymentMethods;

var cartContainsPreOrder = function cartContainsPreOrder() {
  var data = (0, _settings.getSetting)('stripePaymentData');
  return data && data.pre_order;
};

exports.cartContainsPreOrder = cartContainsPreOrder;

var cartContainsSubscription = function cartContainsSubscription() {
  var data = (0, _settings.getSetting)('stripePaymentData');
  return data && data.subscription;
};

exports.cartContainsSubscription = cartContainsSubscription;

var getDefaultSourceArgs = function getDefaultSourceArgs(_ref9) {
  var type = _ref9.type,
      amount = _ref9.amount,
      billingData = _ref9.billingData,
      currency = _ref9.currency,
      returnUrl = _ref9.returnUrl;
  return {
    type: type,
    amount: amount,
    currency: currency,
    owner: getBillingDetailsFromAddress(billingData),
    redirect: {
      return_url: returnUrl
    }
  };
};

exports.getDefaultSourceArgs = getDefaultSourceArgs;

var isTestMode = function isTestMode() {
  return (0, _settings.getSetting)('stripeGeneralData').mode === 'test';
};

exports.isTestMode = isTestMode;

var getCacheKey = function getCacheKey(key) {
  return "".concat(CACHE_PREFIX).concat(key);
};

var storeInCache = function storeInCache(key, value) {
  var exp = Math.floor(new Date().getTime() / 1000) + 60 * 15;

  if ('sessionStorage' in window) {
    sessionStorage.setItem(getCacheKey(key), JSON.stringify({
      value: value,
      exp: exp
    }));
  }
};

exports.storeInCache = storeInCache;

var getFromCache = function getFromCache(key) {
  if ('sessionStorage' in window) {
    try {
      var item = JSON.parse(sessionStorage.getItem(getCacheKey(key)));

      if (item) {
        var value = item.value,
            exp = item.exp;

        if (Math.floor(new Date().getTime() / 1000) > exp) {
          deleteFromCache(getCacheKey(key));
        } else {
          return value;
        }
      }
    } catch (err) {}
  }

  return null;
};

exports.getFromCache = getFromCache;

var deleteFromCache = function deleteFromCache(key) {
  if ('sessionStorage' in window) {
    sessionStorage.removeItem(getCacheKey(key));
  }
};

exports.deleteFromCache = deleteFromCache;

var versionCompare = function versionCompare(ver1, ver2, compare) {
  switch (compare) {
    case '<':
      return ver1 < ver2;

    case '>':
      return ver1 > ver2;

    case '<=':
      return ver1 <= ver2;

    case '>=':
      return ver1 >= ver2;

    case '=':
      return ver1 == ver2;
  }

  return false;
};

exports.versionCompare = versionCompare;

var isCartPage = function isCartPage() {
  return (0, _settings.getSetting)('stripeGeneralData').page === 'cart';
};

exports.isCartPage = isCartPage;

var isCheckoutPage = function isCheckoutPage() {
  return (0, _settings.getSetting)('stripeGeneralData').page === 'checkout';
};

exports.isCheckoutPage = isCheckoutPage;

var isNextActionRequired = function isNextActionRequired(url) {
  var match = url.match(/#response=(.+)/);
  var args = null;

  if (match) {
    args = JSON.parse(window.atob(decodeURIComponent(match[1])));
  }

  return args;
};

exports.isNextActionRequired = isNextActionRequired;

/***/ }),

/***/ "./packages/blocks/assets/js/components/checkout/payment-method-label/style.scss":
/*!***************************************************************************************!*\
  !*** ./packages/blocks/assets/js/components/checkout/payment-method-label/style.scss ***!
  \***************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./packages/blocks/assets/js/payment-methods/plaid/styles.scss":
/*!*********************************************************************!*\
  !*** ./packages/blocks/assets/js/payment-methods/plaid/styles.scss ***!
  \*********************************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/construct.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module) => {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/***/ ((module) => {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/***/ ((module) => {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ "./node_modules/@babel/runtime/helpers/isNativeFunction.js");

var construct = __webpack_require__(/*! ./construct.js */ "./node_modules/@babel/runtime/helpers/construct.js");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

}]);
//# sourceMappingURL=commons.js.map
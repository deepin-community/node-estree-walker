"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _tsinterfacechecker = require('ts-interface-checker');
var _Optionsgentypes = require('./Options-gen-types'); var _Optionsgentypes2 = _interopRequireDefault(_Optionsgentypes);

const {Options: OptionsChecker} = _tsinterfacechecker.createCheckers.call(void 0, _Optionsgentypes2.default);













































 function validateOptions(options) {
  OptionsChecker.strictCheck(options);
} exports.validateOptions = validateOptions;

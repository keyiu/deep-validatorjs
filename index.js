const validator = require('validator');
const moment = require('./moment');
const _ = require('lodash');
/**
 * 校验数据对象是否符合校验规则
 * @param {Array/Object} params 校验对象
 * @param {Array/Object} rules 校验规则
 * @return {Object/Boolean}
 */
function _pvs(params, rules) {
  let data = _.reduce(rules, (res, rule, i) => {
    res[i] = _pv(params[i], rule);
    if (res[i] !== true) {
      console.error({data: params[i], rule});
      console.error(res[i]);
    }
    return res;
  }, {});
  if (hasValidationErroror(data)) {
    return new ValidationError('不符合校验规则', data);
  }
  return true;
}
/**
 * 单个校验规则对象
 * @param {Object} param 校验对象
 * @param {Object} rule 规则对象象
 * @return {Object/Boolean}
 */
function _pv(param, {type, required, options} = {}) {
  if ((_.isUndefined(param) || _.isNull(param)) && required) {
    return new ValidationError('必填参数不能为空');
  }
  if (_.isUndefined(param) || _.isNull(param)) {
    return true;
  }
  let res = false;
  switch (type) {
    case 'String': {
      res = _.isString(param);
      break;
    }
    case 'Object': {
      res = _isObject(param, options);
      break;
    }
    case 'Date': {
      res = moment.isDate(param);
      break;
    }
    case 'moment': {
      res = moment.isMoment(param);
      break;
    }
    case 'Array': {
      res = _isArray(param, options);
      break;
    }
    case 'After': {
      res = moment(param).isAfter(options.date);
      break;
    }
    case 'Before': {
      res = moment(param).isBefore(options.date);
      break;
    }
    case 'Alpha': {
      res = validator.isAlpha(param, options.locale);
      break;
    }
    case 'Alphanumeric': {
      res = validator.isAlpha(param, options.locale);
      break;
    }
    case 'Ascii': {
      res = validator.isAlpha(param);
      break;
    }
    case 'Base64': {
      res = validator.isBase64(param);
      break;
    }
    case 'Boolean': {
      res = validator.isBoolean(String(param));
      break;
    }
    case 'ByteLength': {
      res = validator.isByteLength(param, {
        min: options.min,
        max: options.max,
      });
      break;
    }
    case 'CreditCard': {
      res = validator.isCreditCard(param);
      break;
    }
    case 'Currency': {
      res = validator.isCurrency(param);
      break;
    }
    case 'DataURI': {
      res = validator.isDataURI(param);
      break;
    }
    case 'Decimal': {
      res = validator.isDecimal(param, {
        locale: options.locale,
      });
      break;
    }
    case 'DivisibleBy': {
      res = validator.isDivisibleBy(param, options.number);
      break;
    }
    case 'Email': {
      res = validator.isEmail(param, options);
      break;
    }
    case 'Empty': {
      res = _.isEmpty(param);
      break;
    }
    case 'FQDN': {
      res = validator.isFQDN(param, options);
      break;
    }
    case 'Float': {
      res = validator.isFloat(String(param), options);
      break;
    }
    case 'FullWidth': {
      res = validator.isFullWidth(param);
      break;
    }
    case 'HalfWidth': {
      res = validator.isHalfWidth(param);
      break;
    }
    case 'Hash': {
      res = validator.isHash(param, options.algorithm);
      break;
    }
    case 'HexColor': {
      res = validator.isHexColor(param);
      break;
    }
    case 'Hexadecimal': {
      res = validator.isHexadecimal(param);
      break;
    }
    res = validator.isISBN(param, options.version);
    case 'IP': {
      res = validator.isIP(param, options.version);
      break;
    }
    case 'ISBN': {
      break;
    }
    case 'ISSN': {
      res = validator.isISSN(param, options);
      break;
    }
    case 'ISIN': {
      res = validator.isISIN(param);
      break;
    }
    case 'ISO8601': {
      res = validator.isISO8601(param);
      break;
    }
    case 'ISO31661Alpha2': {
      res = validator.isISO31661Alpha2(param);
      break;
    }
    case 'ISRC': {
      res = validator.isISRC(param);
      break;
    }
    case 'In': {
      res = _.includes(options.values, param);
      break;
    }
    case 'Integer':
    case 'Int': {
      res = validator.isInt(String(param), options);
      break;
    }
    case 'JSON': {
      res = validator.isJSON(param);
      break;
    }
    case 'LatLong': {
      res = validator.isLatLong(param);
      break;
    }
    case 'Length': {
      res = validator.isLength(param, options);
      break;
    }
    case 'Lowercase': {
      res = validator.isLowercase(param);
      break;
    }
    case 'MACAddress': {
      res = validator.isMACAddress(param);
      break;
    }
    case 'MD5': {
      res = validator.isMD5(param);
      break;
    }
    case 'MobilePhone': {
      res = validator.isMobilePhone(param, options.locale);
      break;
    }
    case 'MongoId': {
      res = validator.isMongoId(param);
      break;
    }
    case 'Multibyte': {
      res = validator.isMultibyte(param);
      break;
    }
    case 'Numeric': {
      res = validator.isNumeric(String(param));
      break;
    }
    case 'Port': {
      res = validator.isPort(String(param));
      break;
    }
    case 'PostalCode': {
      res = validator.isPostalCode(param, options.locale);
      break;
    }
    case 'SurrogatePair': {
      res = validator.isSurrogatePair(param);
      break;
    }
    case 'URL': {
      res = validator.isURL(param, options);
      break;
    }
    case 'UUID': {
      res = validator.isUUID(param, options.version);
      break;
    }
    case 'Uppercase': {
      res = validator.isUppercase(param);
      break;
    }
    case 'VariableWidth': {
      res = validator.isVariableWidth(param);
      break;
    }
    case 'Whitelisted': {
      res = validator.isWhitelisted(param, options.chars);
      break;
    }
    case 'matches': {
      res = validator.matches(param, options.pattern, options.modifiers);
      break;
    }
    case 'equals': {
      res = validator.equals(param, options.comparison);
      break;
    }
    case 'contains': {
      res = validator.equals(param, options.seed);
      break;
    }
    default: {
      res = new ValidationError(`不支持的类型-${type}`);
    }
  }
  if (res === true) {
    return true;
  }
  if (res === false) {
    return new ValidationError('不符合校验规则');
  }
  return res;
}
/**
 * 定义的错误类
 */
class ValidationError {
  /**
   * 初始化错误类
   * @param {String} desc 错误描述
   * @param {Array} ValidatorValidationErrors 错误信息
   */
  constructor(desc, ValidatorValidationErrors) {
    this.name = 'ValidatorValidationError';
    this.message = desc;
    this.ValidatorValidationErrors = ValidatorValidationErrors;
  }
}
/**
 * 判断对象中是否有错误信息
 * @param {Object} p 对象
 * @return {Boolean}
 */
function hasValidationErroror(p) {
  return _.reduce(p, (r, d) => {
    if (isValidationErroror(d)) {
      r = true;
    }
    return r;
  }, false);
}
/**
 * 判断一个对象是否是ValidationError
 * @param {ValidationError} p ValidationError
 * @return {Boolean}
 */
function isValidationErroror(p) {
  return p instanceof ValidationError;
}
/**
 * 判断目标是否是对象
 * @param {Object} params 参数
 * @param {Object} options 辅助对象
 * @return {Object/Boolean}
 */
function _isObject(params, {baseClass = Object, properties} = {}) {
  if (!(params instanceof baseClass)) {
    return new ValidationError('类型错误');
  }
  if (!_.isEmpty(properties)) {
    return _pvs(params, properties);
  }
  return true;
}
/**
 * 判断目标是否是一个符合要求的数组
 * @param {Array} params 判断一个是否是一个参数
 * @param {Object} options 附加参数
 * @return {Object}
 */
function _isArray(params, {baseClass = Array, properties} = {}) {
  if (!(params instanceof baseClass)) {
    return new ValidationError('类型错误');
  }
  // 如果properties是一个数组，那么只校验数组的指定的部分
  if (_.isArray(properties)) {
    const res = _.reduce(properties, (res, property, i) => {
      const param = params[i];
      res[i] = _pv(param, property);
      if (res[i] !== true) {
        console.error({data: params[i], rule: property});
        console.error(res[i]);
      }
      return res;
    }, {});
    if (hasValidationErroror(res)) {
      return new ValidationError('不符合校验规则', res);
    }
    return true;
  }
  // 如果properties是一个对象的话那么它必须是一个校验的规则，直接校验所有的数组中的属性
  if (_.isObject(properties)) {
    const res = _.reduce(params, (res, param, i) => {
      let rule = properties;
      res[i] = _pv(param, rule);
      if (res[i] !== true) {
        console.error({data: params[i], rule});
        console.error(res[i]);
      }
      return res;
    }, {});
    if (hasValidationErroror(res)) {
      return new ValidationError('不符合校验规则', res);
    }
    return true;
  }
  return true;
}
/**
 * 校验数据是否符合规则,如果错则返回错误对象
 * @param {Any} param 等待校验参数
 * @param {*} options 校验规则
 */
module.exports = _pv;
/**
 * 校验数据是否符合规则,如果错误则抛出错误
 * @param {Any} param 等待校验参数
 * @param {*} options 校验规则
 */
module.exports.throw = function(param, options) {
  let pvRes = _pv(param, options);
  if (pvRes !== true) {
    console.error({data: param, rule: options});
    console.error(pvRes);
    throw pvRes;
  }
};
/**
 * 获取默认的对象校验规则
 * @param {Array/Object} properties 校验规则
 * @param {Object} options 附加规则
 * @return {object} 校验规则
 */
module.exports.getDefaultObjectRule = function _getDefaultObjectRule(properties, options = {
  required: true,
  baseClass: Object,
}) {
  return {
    type: 'Object',
    required: _.isBoolean(options.required) ? options.required : true,
    options: {
      baseClass: options.baseClass,
      properties,
    },
  };
};
/**
 * 获取默认的对象校验规则
 * @param {Array/Object} properties 校验规则
 * @param {Object} options 附加规则
 * @return {object} 校验规则
 * @return {object} 校验规则
 */
module.exports.getDefaultArrayRule = function _getDefaultArrayRule(properties, options = {
  required: true, baseClass: Array,
}) {
  return {
    type: 'Array',
    required: _.isBoolean(options.required) ? options.required : true,
    options: {
      baseClass: options.baseClass,
      properties,
    },
  };
};
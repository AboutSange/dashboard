import * as R from 'ramda'
import _ from 'lodash'
import i18n from '@/locales'

let tIndex = 0

export const UNITS = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

export function camel2Words (camel) {
  let tmp = ''
  for (let i = 0; i < camel.length; i++) {
    const ch = camel.charAt(i)
    if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
      if (tmp.length > 0) {
        tmp += '-'
      }
      tmp += ch.toLowerCase()
    } else {
      tmp += ch
    }
  }
  return tmp.split('-')
}

export function uuid (len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

class Sizestr {
  sizestr (sz, unit, base, precision = 2, end = UNITS[UNITS.length - 1]) {
    if (!sz) return '0B'
    const nsz = this.normalizeSize(sz, unit, base)
    if (nsz < base) {
      return '' + nsz
    }
    let nbase = base
    if (end === UNITS[0]) {
      return '' + sz + UNITS[0]
    }
    for (let i = 1; i < UNITS.length; i++) {
      nbase *= base
      if (nsz < nbase || UNITS[i] === end) {
        return '' + this.round(nsz * base / nbase, precision) + UNITS[i]
      }
    }
    return 'NaN'
  }

  // 在 sizestr 上加上 B 结尾
  sizestrWithUnit (...args) {
    const res = this.sizestr(...args)
    const letterReg = /[A-Z]/g
    if (res.startsWith('NaN') || res === '0B') return '0 B'
    if (res.endsWith('B')) return res.slice(0, -1) + ' B'
    if (!letterReg.test(res)) return `${res} B`
    const reg = /(\d+\.?\d*)([A-Z])/ // 12T 1.5G
    const matched = res.match(reg) // ['111T', '111', 'T']
    return `${matched[1]} ${matched[2]}B`
  }

  unitBase (unit, base) {
    if (!unit) {
      return base
    }
    let unitbase = 1
    for (let i = 0; i < UNITS.length; i++) {
      if (unit.toUpperCase() === UNITS[i]) {
        return unitbase
      }
      unitbase *= base
    }
    return Math.NaN
  }

  normalizeSize (sz, unit, base) {
    return sz * this.unitBase(unit, base)
  }

  numScale (num) {
    if (parseInt(num) === 0) {
      return 0
    }
    if (num < 0) {
      num = -num
    }
    let width = 0
    while (num >= 1.0) {
      num = num / 10.0
      width += 1
    }
    while (num < 0.1) {
      num = num * 10.0
      width -= 1
    }
    return width
  }

  round (num, bits) {
    const scale = this.numScale(num)
    if (scale > bits) {
      bits = 0
    } else {
      bits -= scale
    }
    let base = 1
    for (let i = 0; i < bits; i++) {
      base *= 10
    }
    return Math.floor(num * base + 0.5) / base
  }

  percentStr (val) {
    return '' + this.round(val * 100, 0) + '%'
  }
}
const sizestrInstance = new Sizestr()

export const sizestr = sizestrInstance.sizestr.bind(sizestrInstance) // -> 12G  4.5T
export const sizestrWithUnit = sizestrInstance.sizestrWithUnit.bind(sizestrInstance) // -> 12 GB   4.5 TB
export const percentstr = sizestrInstance.percentStr.bind(sizestrInstance)

export const arrayToObj = (arr, itemKey = 'id') => {
  const obj = {}
  arr.forEach(item => {
    obj[item[itemKey]] = item
  })
  return obj
}

export const changeToArr = R.unless(
  R.is(Array),
  R.of,
)

export function isChrome () {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

export function download (data, filename = 'download', mime = 'application/octet-stream', bom) {
  const blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime })

  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}

/**
 * @description 限制文字最大长度
 * @param {String} text 文字内容
 * @param {Number} maxLen 限制的最大长度
 * @returns {String} text
 */
export const maxTextLength = (text, maxLen) => {
  if (text && text.length > maxLen) {
    return text.substr(0, maxLen) + '...'
  } else {
    return text
  }
}

/**
 * @description 将数组变为对象，[{id: 'name', value: 'xx'}, {id: 'server', value: 'xc'}] => {name: {id: 'name', value: 'xx'}, server:{id: 'server', value: 'xc'}}
 * @param {Array} arr
 * @param {String} key
 * @param {String} itemKey
 */
export const arrToObjByKey = (arr, key, itemKey) => {
  const target = {}
  arr.reduce((obj, item) => {
    if (itemKey) {
      obj[item[key]] = item[itemKey]
    } else {
      obj[item[key]] = { data: item }
    }
    return obj
  }, target)
  return target
}

/**
 * 解析 influxdb 数据，主要把 series.values 的数据单位缩进
 * @param {Object} series 结构如下：
 * @param {Array} series.columns 列
 * @param {String} series.name 名称
 * @param {Array} series.values 二维数组，表示每列的数据
 */
export const autoComputeUnit = (series, sourceUnit = 'bps', base = 1000) => { // 单位自动缩进
  let { values } = series
  let unit = 'b'
  const deleteTimeValues = values.map(arr => arr.slice(1))
  let valueArr = deleteTimeValues.reduce((a, b) => a.concat(b))
  valueArr = valueArr.filter(val => val) // 过滤掉 0
  const maxValue = Math.max.apply(null, valueArr)
  if (maxValue >= 1000 && valueArr && valueArr.length > 0) {
    const maxValueStr = sizestr(maxValue, 'B', base)
    unit = maxValueStr.slice(-1) // 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
    let scaleIndex = UNITS.findIndex(val => val === unit.charAt(0))
    scaleIndex = scaleIndex || UNITS[UNITS.length - 1]
    scaleIndex = scaleIndex < 0 ? 0 : scaleIndex
    const scale = Math.pow(base, scaleIndex)
    values = values.map(arr => {
      return arr.map((item, i) => {
        if (i === 0) { // time
          return item
        }
        return item / scale
      })
    })
  }
  if (unit.toLowerCase() === 'b') {
    unit = 'b'
  } else {
    unit += 'b'
  }
  if (sourceUnit === 'bps') unit += '/s'
  return { // 主要作用是 改变 values(单位缩进), 加入当前单位 unit
    ...series,
    values,
    unit,
  }
}

/**
 * @description 美化作用：把 【133Bps】 这种字符串分离成 【133 Bps】
 * @param {String} value 要分离单位的字符串，如：11Kbps
 * @returns {String} 返回分离后的结果，如：11 Kbps
 */
export const splitUnit = value => {
  const reg = /^(\d+\.?\d?)([a-zA-Z]+|%)/
  value = String(value)
  const groupsArr = value.match(reg)
  if (groupsArr && groupsArr.length >= 3) {
    const num = groupsArr[1]
    let unit = groupsArr[2]
    if (num === '0' || num === 0) { // 0M => 0B
      if (UNITS.includes(unit)) unit = UNITS[0]
    }
    return {
      text: `${num} ${unit}`,
      value: num,
      unit,
    }
  }
  return {
    text: value,
    value,
    unit: '',
  }
}

function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
};

export function toObject (arr) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
};

// 在 sizestr 上加上 B 结尾
export function sizestrC (...args) {
  const res = sizestr(...args)
  const letterReg = /[A-Z]/g
  if (res.startsWith('NaN') || res === '0B') return '0 B'
  if (res.endsWith('B')) return res.slice(0, -1) + ' B'
  if (!letterReg.test(res)) return `${res} B`
  const reg = /(\d+\.?\d*)([A-Z])/ // 12T 1.5G
  const matched = res.match(reg) // ['111T', '111', 'T']
  return `${matched[1]} ${matched[2]}B`
}

/**
 * @description 找到数组某一项并提前到第一项
 * @param {Array} arr
 * @param {Function} condition 满足找到目标值的条件函数
 */
export const findAndUnshift = (arr, condition) => {
  const ret = arr.slice(0)
  if (!condition || !R.is(Function, condition)) return ret
  let firstValue = ret[0]
  for (var i = 0; i < ret.length; i++) {
    if (condition(ret[i])) {
      firstValue = ret[i]
      ret.splice(i, 1)
      break
    }
  }
  ret.unshift(firstValue)
  return ret
}

/**
 * @description 找到数组某一项并提前到最后一项
 * @param {Array} arr
 * @param {Function} condition 满足找到目标值的条件函数
 */
export const findAndPush = (arr, condition) => {
  const ret = arr.slice(0)
  if (!condition || !R.is(Function, condition)) return ret
  if (!ret || R.type(arr) !== 'Array' || ret.length === 0) return ret
  let firstValue
  for (var i = 0; i < ret.length; i++) {
    if (condition(ret[i])) {
      firstValue = ret[i]
      ret.splice(i, 1)
      break
    }
  }
  if (firstValue) {
    ret.push(firstValue)
  }
  return ret
}

export const i18nSetProperty = ({
  obj,
  key,
  i18nKey,
  props,
  perfix = '',
  suffix = '',
}) => {
  Object.defineProperty(obj, key, {
    ...props,
    enumerable: true,
    get () {
      return `${perfix}${i18n.t(i18nKey)}${suffix}`
    },
  })
}

export const getRequestT = () => {
  return ++tIndex
}

export const formatSeconds = value => {
  let theTime = parseInt(value) // 需要转换的时间秒
  let theTime1 = 0 // 分
  let theTime2 = 0 // 小时
  let theTime3 = 0 // 天
  let theTime4 = 0 // 月
  let theTime5 = 0 // 年
  if (theTime >= 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 >= 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
      if (theTime2 >= 24) {
        // 大于24小时
        theTime3 = parseInt(theTime2 / 24)
        theTime2 = parseInt(theTime2 % 24)
        // 大于30天
        if (theTime3 >= 30) {
          theTime4 = parseInt(theTime3 / 30)
          theTime3 = parseInt(theTime3 % 30)
          // 大于12月
          if (theTime4 >= 12) {
            theTime5 = parseInt(theTime4 / 12)
            theTime4 = parseInt(theTime4 % 12)
          }
        }
      }
    }
  }
  let str = ''
  const obj = {
    seconds: theTime,
    minutes: theTime1,
    hours: theTime2,
    days: theTime3,
    months: theTime4,
    years: theTime5,
  }
  const arr = [
    [theTime5, 'years'],
    [theTime4, 'months'],
    [theTime3, 'days'],
    [theTime2, 'hours'],
    [theTime1, 'minutes'],
    [theTime, 'seconds'],
  ]
  if (theTime > 0) {
    str = '' + parseInt(theTime) + '秒'
  }
  if (theTime1 > 0) {
    str = '' + parseInt(theTime1) + '分' + str
  }
  if (theTime2 > 0) {
    str = '' + parseInt(theTime2) + '小时' + str
  }
  if (theTime3 > 0) {
    str = '' + parseInt(theTime3) + '天' + str
  }
  if (theTime4 > 0) {
    str = '' + parseInt(theTime4) + '月' + str
  }
  if (theTime5 > 0) {
    str = '' + parseInt(theTime5) + '年' + str
  }
  return {
    str,
    obj,
    arr,
  }
}

/**
 * @description 配合 <a-auto-complete /> 使用
 * @param {Object} obj e.g. { a: { a1: { b: 'bbb', c: 'ccc' } } }
 * @param {String} path e.g. a.a1
 * @returns e.g. ['a.a1.b', 'a.a1.c']
 */
export const objAutoComplete = (obj, path) => {
  if (R.isEmpty(obj) || !path) return []
  const _genObjKeys = (resObj, objKeyPath, prefixPath = '') => {
    const keys = Object.keys(resObj).map(val => prefixPath + val)
    const opts = keys.filter(val => val.toLowerCase().includes(objKeyPath.toLowerCase()))
    return opts
  }
  const objKeys = path.split('.')
  if (objKeys.length === 1) {
    return _genObjKeys(obj, path)
  } else if (objKeys.length > 1) {
    const dropLastArr = R.dropLast(1, objKeys)
    const lastPath = R.last(objKeys)
    const readyPath = dropLastArr.join('.')
    const readyValue = _.get(obj, readyPath)
    if (readyValue && R.is(Object, readyValue)) {
      return _genObjKeys(readyValue, lastPath, `${readyPath}.`)
    }
    return []
  }
}

/**
 * [过滤对象]
 * @param Function 过滤函数
 * @param Object 被过滤对象
 */
export const filterObj = (fn, obj) => {
  if (!R.is(Function, fn) || !R.is(Object, obj)) {
    throw new Error('filterObj 参数格式不正确')
  }
  const result = {}
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const val = obj[k]
      if (fn(val, k)) {
        result[k] = val
      }
    }
  }
  return result
}

/**
 * [城市code中文映射]
 * @param cities 城市list
 * @param val 被映射的城市code
 */
export const cityMap = (cities, val) => {
  let result = ''
  if (val) {
    const valPrefix = val.slice(0, 3)
    cities.map(item => {
      const itemPrefix = item.value.slice(0, 3)
      if (valPrefix === itemPrefix && item.children && item.children.length) {
        item.children.map(chilItem => {
          if (val === chilItem.value) {
            result = item.label + chilItem.label
          }
        })
      }
    })
  }
  return result
}

export const genReferRouteQuery = (route) => {
  const query = {
    pathAuthPage: route.meta.authPage,
    pathAuth: route.meta.auth || true,
    path: route.path,
  }
  if (!R.isNil(route.query) && !R.isEmpty(route.query)) {
    query.pathQuery = JSON.stringify(route.query)
  }
  return query
}

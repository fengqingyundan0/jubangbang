function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// 设定二级数据

function mergeObject(to, source) {
  var from;
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};
module.exports.mergeObject = mergeObject;

// for循环输出二维数组值

function getArrValue(arr1, arr2) {
  var a = [],b = [];
  for (var i = 0; i < arr1.length-2; i++) {
    (function (i) {
       a.push(arr2[i][arr1[i]]);
    })(i)
  }

  for (var i = 3; i < arr1.length; i++) {
    (function (i) {
      b.push(arr2[i][arr1[i]]);
    })(i)
  }
 
  return a.join('-') + " " + b.join(':');
}

module.exports.getArrValue = getArrValue;
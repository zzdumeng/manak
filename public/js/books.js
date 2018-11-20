/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

$ = document.querySelector.bind(document);

bookList = $('#books-list');
bookDetail = $('.content');

function stringify(data) {
  res = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var element = data[key];
      res.push(key + '=' + element);
    }
  }
  return res.join("&");
}
function makeRequest(method /* string */, url, opts, success, error) {
  method = method.toUpperCase();

  var xhr = new XMLHttpRequest();
  actions = ['POST', 'DELETE', 'PATCH', 'PUT'];
  if (actions.indexOf(method) > -1) {
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify());
  } else {

    xhr.open(method, url + '?' + stringify(opts));
  }
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        success(xhr.responseText);
      } else {
        error = error || function () {};
        error(xhr.responseText);
      }
    }
  };
}

var request = {};

request.get = makeRequest.bind(this, 'GET');
request.post = makeRequest.bind(this, 'POST');

// make a request 
request.post('/manak/api/book/all', {}, function (res) {
  json = JSON.parse(res);
  if (!json.error) {
    json.forEach(function (book) {
      var li = document.createElement('li');
      li.innerHTML = '<b>' + book.title + '</b>  <span>' + book.author + ' </span>';
      li.dataset['title'] = book.title;
      li.addEventListener('click', function (e) {
        // 
        request.post('/manak/api/book/' + li.dataset['title'], {}, function (res) {
          var detail = JSON.parse(res);
          bookDetail.innerHTML = '<pre> ' + detail.content + '</pre>';
        });
      });
      bookList.appendChild(li);
    });
  } else {
    alert("error occured: ", json.error);
  }
});

/***/ })

/******/ });
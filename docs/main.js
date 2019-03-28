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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _near_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _near_points__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_near_points__WEBPACK_IMPORTED_MODULE_1__);




/***/ }),
/* 1 */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
    let canvElm = document.getElementById('nearPointsCanvas');
    canvElm.setAttribute('width', window.innerWidth * 2);
    canvElm.setAttribute('height', window.innerHeight * 2);

    let ctx = canvElm.getContext('2d');

    const elms = [];
    const lines = [];
    const width = canvElm.offsetWidth * 2;
    const height = canvElm.offsetHeight * 2;
    let pointsToInit = 500;

    while (pointsToInit--) {
        elms.push(
            [
                Math.floor(Math.random() * width),
                Math.floor(Math.random() * height)
            ]);
    }

    function draw() {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height );

        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#535353';
        ctx.lineWidth = .5;


        if (lines.length) {

            let linesCount = 5;

            while(--linesCount) {





                let nearestPoints = 1;

                while(nearestPoints < 6 ) {

                    ctx.beginPath();

                    ctx.moveTo(lines[linesCount][0], lines[linesCount][1]);

                    ctx.lineTo(lines[linesCount * 5 + nearestPoints][0], lines[linesCount * 5 + nearestPoints][1]);

                    ctx.stroke();

                    nearestPoints++;
                }
            }


        }


        elms.forEach(p => {
            ctx.fillRect(p[0], p[1], 2, 2);
            //pointMove(p);
        });
        window.requestAnimationFrame(draw);
    }

    function pointMove(point) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;

        point[0] = point[0] + x;
        point[1] = point[1] + y;
    }

    canvElm.onmousemove = function (event) {
        let x = event.x * 2;
        let y = event.y * 2;

        lines.length = 0;
        let linesCount = 0;

        while (linesCount <= 4) {

            lines.push(nearestPoint(x, y, lines));

            linesCount++;
        }

        linesCount = 0;

        while (linesCount <= 4) {
            let p2 = lines[linesCount];

            let fromPoint = 0;

            while (fromPoint <= 4) {
                lines.push(nearestPoint(p2[0], p2[1], lines));
                fromPoint++;
            }


            linesCount++;
        }
    };

    function nearestPoint(x, y, without) {
        let minDist = Infinity;
        let nearest = null;

        elms.forEach(p => {

            if (p[0] !== x && p[1] !== y && without.indexOf(p) === -1) {
                let dist = Math.sqrt((p[0] - x) ** 2 + (p[1] - y) ** 2);

                if (minDist > dist) {
                    minDist = dist;
                    nearest = p;
                }
            }

        });

        return nearest;
    }

    draw();
});




/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
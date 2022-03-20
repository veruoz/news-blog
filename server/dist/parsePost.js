"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

// universal function
var parsePost = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, elems) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new _promise2.default(function (resolve, reject) {

                            _unirest2.default.get(url).end(function (_ref2) {
                                var body = _ref2.body,
                                    error = _ref2.error;


                                if (error) reject(error);

                                var $ = _cheerio2.default.load(body);

                                var domain = url.match(/\/\/(.*?)\//)[1];
                                var title = $(elems.title).text().trim();
                                var image = $(elems.image).attr('src');
                                image = image.indexOf('http') >= 0 ? image : "https://" + domain + image;
                                var text = $(elems.text).text().trim();
                                var views = $(elems.views).text().trim();
                                var link = url;

                                var post = {
                                    title: title,
                                    image: image,
                                    text: text,
                                    views: views,
                                    link: link
                                };

                                resolve(post);
                            });
                        });

                    case 2:
                        return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function parsePost(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// async function fetchLinks(links){
//     for (let i = 0; i < links.length; i++) {
//         // console.log(links[i])
//        const post = await parsePost(
//             links[i],
//             elems.samsungHabr
//         ).then(post => post)
//         console.log(post)
//     }
// }

var getPosts = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(links, elems) {
        var posts, count, i, post;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        posts = [];
                        count = links.length;
                        i = 0;

                    case 3:
                        if (!(i < count)) {
                            _context2.next = 13;
                            break;
                        }

                        _context2.next = 6;
                        return parsePost(links[i], elems).then(function (post) {
                            return post;
                        });

                    case 6:
                        post = _context2.sent;

                        posts.push(post);
                        // console.log(post)
                        _context2.next = 10;
                        return log(i + 1, count, 2000);

                    case 10:
                        i++;
                        _context2.next = 3;
                        break;

                    case 13:
                        return _context2.abrupt("return", new _promise2.default(function (resolve, reject) {

                            if (!posts.length) reject({ error: 'empty links' });
                            resolve(posts);
                        }));

                    case 14:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getPosts(_x4, _x5) {
        return _ref4.apply(this, arguments);
    };
}();

// export universal function Node.js
// module.exports = parsePost


var _unirest = require("unirest");

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function samsungHabr() {
//     unirest.get('https://habr.com/ru/company/samsung/blog/652957/')
//         // unirest.get()
//         .end(function (response) {
//             const body = response.body
//             const $ = cheerio.load(body)
//             const title = $('h1.tm-article-snippet__title.tm-article-snippet__title_h1 span').text().trim()
//             const image = $('figure.full-width img').attr('src')
//             const text = $('p').text()
//             const views = $('.tm-icon-counter__value').text()
//
//
//             const post = {
//                 title: title,
//                 image: image,
//                 text:  text,
//                 views: views,
//             }
//
//             console.log(post)
//
//         })
// }

var log = function log(i, count, ms) {
    return new _promise2.default(function (r) {
        return setTimeout(function () {
            console.log("\n    \u0418\u043D\u0434\u0435\u043A\u0441: " + i + "\n    \u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439: " + count + "\n    ");
            r();
        }, ms);
    });
};

function parseLinks(url, className) {
    var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;


    return new _promise2.default(function (resolve, reject) {
        var links = [];

        _unirest2.default.get(url).end(function (_ref3) {
            var body = _ref3.body,
                error = _ref3.error;

            if (error) reject(error);

            var $ = _cheerio2.default.load(body);
            var domain = url.match(/\/\/(.*?)\//)[1];

            $(className).each(function (i, e) {
                // if (i + 1 <= maxLinks) links.push('https://' + domain + $(e).attr('href'))
                if (i + 1 <= maxLinks) links.push('https://' + domain + $(e).attr('href'));
            });
            resolve(links);
            // console.log(links)
        });
        if (links.length) reject({ error: 'empty links' });
    });
}exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;
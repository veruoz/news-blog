'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require('./parsePost');

var _configs = require('./configs');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveResult = function saveResult(json) {
    _fs2.default.writeFile('result.json', json, function (err) {
        if (err) console.log('Not saved');
    });
}; // const parsePost = require("./parsePost");


var urlPage = 'https://habr.com/ru/company/samsung/news/';

// const Post = parsePost(
//     'https://habr.com/ru/company/samsung/blog/652957/',
//     elems.samsungHabr
// )

(0, _parsePost.parseLinks)(urlPage, '.tm-article-snippet__title-link').then(function (links) {
    (0, _parsePost.getPosts)(links, _configs.elems.samsungHabr).then(function (posts) {
        return saveResult((0, _stringify2.default)(posts, 0, 4));
    });
}).catch(function (e) {
    return console.log(e);
});

// Post.then(data => console.log(data))


// const getPost = async () => {
//     return Post.then(data => console.log(data))
// }

// es6
// const getPost = async () => await Post.then(data => console.log(data))
// console.log(getPost())
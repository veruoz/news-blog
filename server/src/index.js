// const parsePost = require("./parsePost");
import {parseLinks, parsePost, getPosts} from './parsePost'
import {elems} from './configs';
import fs from 'fs'

const saveResult = (json) => {
    fs.writeFile('result.json', json, err => {
        if (err) console.log('Not saved')
    })
}

const urlPage = 'https://habr.com/ru/company/samsung/news/'

// const Post = parsePost(
//     'https://habr.com/ru/company/samsung/blog/652957/',
//     elems.samsungHabr
// )

parseLinks(urlPage, '.tm-article-snippet__title-link')
    .then(links => {
        getPosts(links, elems.samsungHabr)
            .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
    })
    .catch(e => console.log(e))



// Post.then(data => console.log(data))


// const getPost = async () => {
//     return Post.then(data => console.log(data))
// }

// es6
// const getPost = async () => await Post.then(data => console.log(data))
// console.log(getPost())

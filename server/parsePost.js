// универсальная функция
const unirest = require("unirest");
const cheerio = require("cheerio");

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

// universal function
function parsePost(url, elems) {
    unirest.get(url)
        .end(function (response) {
            const body = response.body
            const $ = cheerio.load(body)

            const domain = url.match(/\/\/(.*?)\//)[1]
            const title = $(elems.title).text().trim()
            let image = $(elems.image).attr('src')
            image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`
            const text = $(elems.text).text().trim()
            const views = $(elems.views).text().trim()


            const post = {
                title: title,
                image: image,
                text:  text,
                views: views,
            }

            console.log(post)

        })
}

// export universal function Node.js
module.exports = parsePost


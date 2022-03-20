import unirest from "unirest";
import cheerio from "cheerio";

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

const log = (i, count, ms) => {
    return new Promise(r => setTimeout(() => {
        console.log(`
    Индекс: ${i}
    Всего записей: ${count}
    `)
    r()
    }, ms),)
}

// universal function
async function parsePost(url, elems) {
    return await new Promise((resolve, reject) => {

        unirest.get(url)
            .end(function ({ body, error}) {

                if (error) reject(error)

                const $ = cheerio.load(body)

                const domain = url.match(/\/\/(.*?)\//)[1]
                const title = $(elems.title).text().trim()
                let image = $(elems.image).attr('src')
                image = image.indexOf('http') >= 0 ? image : `https://${domain}${image}`
                const text = $(elems.text).text().trim()
                const views = $(elems.views).text().trim()
                const link = url

                const post = {
                    title: title,
                    image: image,
                    text:  text,
                    views: views,
                    link: link,
                }

                resolve(post)
            })
    })
}

function parseLinks(url, className, maxLinks = 5) {

    return new Promise((resolve, reject) => {
        let links = []

        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error)

            const $ = cheerio.load(body)
            const domain = url.match(/\/\/(.*?)\//)[1]

            $(className).each((i, e) => {
                // if (i + 1 <= maxLinks) links.push('https://' + domain + $(e).attr('href'))
                if (i + 1 <= maxLinks) links.push('https://' + domain + $(e).attr('href'))
            })
            resolve(links)
            // console.log(links)
        })
        if (links.length) reject({ error: 'empty links' })
    })
}

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

async function getPosts(links, elems){
    let posts = []
    let count = links.length
    for (let i = 0; i < count; i++) {
        // console.log(links[i])
        const post = await parsePost(
            links[i],
            elems
        ).then(post => post)
        posts.push(post)
        // console.log(post)
        await log(i + 1, count, 2000)
    }
    return new Promise((resolve, reject) => {

        if (!posts.length) reject({ error: 'empty links' })
        resolve(posts)
    })
}

// export universal function Node.js
// module.exports = parsePost
export {parsePost, parseLinks, getPosts}


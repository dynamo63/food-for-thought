/**
 * GET A DATA FROM RSS FEED
 * @param {String} RSS_URL - Url for RSS FEED
 * 
 */
async function getDatas (RSS_URL) {
    const items = await fetch(RSS_URL, { headers:new Headers() })
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(data => data.querySelectorAll('item'))
    .catch(error => console.error(error))

    return items;
}


/**
 * Parse String To HTML Element
 * @param {String} HTMLString  - HTML String Text
 * @returns {HTMLDivElement} - Returns an HTML Element
 */
function createHTMLFromString (HTMLString) {
    const div = document.createElement('div')
    div.innerHTML = HTMLString
    return div
}

/**
 * Create an card String Element
 * @param {Object} card 
 */
function createCardElement ({ title, link, imgUrl }) {
    return `<div class="card">
                <div class="card-img">
                    <img src="${imgUrl}" alt="Elevage">
                </div>
                <div class="card-content">
                    <h3>${title}</h3>
                </div>
                <div class="card-footer">
                    <a href="${link}">Voir Plus</a>
                </div>
            </div>`;
}


const RSS_URL = 'http://www.fao.org/nems/rss/rss_nems_results2.asp?owner=1&official=1&status=10&lang=en&maintype=2';

const container = document.querySelector('.container');

// getRSSInfo(`https://cors-anywhere.herokuapp.com/${RSS_URL}`);

async function LoadData () {
    const items = await getDatas(`https://cors-anywhere.herokuapp.com/${RSS_URL}`);
    
    items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const descriptionHTMLString = item.querySelector('description').textContent;
        const descriptionElt = createHTMLFromString(descriptionHTMLString);
        const imgUrl = descriptionElt.querySelector('img') ? descriptionElt.querySelector('img').src : './assets/img/covid19.png';

        container.insertAdjacentHTML('beforeend', createCardElement({ link, title, imgUrl }))
        // console.log(createCardElement({link, title, imgUrl }))
        // console.log(imgUrl)
    })
}

LoadData();
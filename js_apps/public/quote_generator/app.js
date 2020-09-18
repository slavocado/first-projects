const quoteTextContainer = document.querySelector('.quote-text')
const quoteAuthorContainer = document.querySelector('.author')
const quoteGenreContainer = document.querySelector('.genre')
const container = document.querySelector('.container')

let arrayOfQuotes = [];

async function getRandomQuoteData() {
    const api_url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
    const response = await fetch(api_url);
    const data = await response.json();
    quoteTextContainer.innerText = data.quote.quoteText;
    quoteAuthorContainer.innerText = data.quote.quoteAuthor;
    quoteGenreContainer.innerText = data.quote.quoteGenre;
}

document.addEventListener("DOMContentLoaded", getRandomQuoteData);

async function addMoreQuotes() {
    const author = quoteAuthorContainer.innerText;

    const api_url = `https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=1&limit=3`;
    const response = await fetch(api_url);
    const data = await response.json();

    arrayOfQuotes = data.quotes;
    console.log(arrayOfQuotes);
    putQuotes();
}

function putQuotes(){
    arrayOfQuotes.forEach(quote => {
        container.innerHTML += `<p class="quote-text">${quote.quoteText}</p>`
        console.log(quote.quoteText)
    })
}
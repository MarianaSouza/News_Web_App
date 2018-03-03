// Page Elements

const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=60317a01bc5042edbc80c4d73b38a33b';
const engadgetUrl = 'https://newsapi.org/v2/top-headlines?sources=engadget';
const recodeUrl = 'https://newsapi.org/v2/top-headlines?sources=recode';
const nextWebUrl = 'https://newsapi.org/v2/top-headlines?sources=the-next-web';

// Request News Function

async function getNews(url){
  let response = await fetch(apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0, 6);
  return articlesArray;
}

// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/@maricaldassouza" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>' +
      '<footer><p class="copyright">&copy; <a href="http://www.marianacaldas.com/" target="_blank">Mariana Caldas</a> 2018.</p></footer>';

    main.innerHTML += articleRow;
    footer.innerHTML += copyright;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(engadgetUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(nextWebUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

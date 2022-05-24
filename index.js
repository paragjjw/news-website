document.getElementById('searchTxt').value = '';
let source = 'bbc-news';
let apiKey = '00898d5618fc4adfb63ae8dc13b51a44';
//Grab the news container
let newsAccordian = document.getElementById('newsAccordian');
class News{
  constructor(title, content, date) {
    this.title = title;
    this.summary = content;
    this.published_date = date;
  }
}
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
    let articles = JSON.parse(this.responseText).articles;
    console.log(articles);
    let newsHTML = '';
    // let news = localStorage.getItem('latest_news');
    let newsArr = [];
    // if (news == null)
    //   newsArr = [];
    // else
    //   newsArr = JSON.parse(news);
    articles.forEach(function (element, index) {
      let newsObj = new News(element['title'], element['summary'], element['published_date']);
      newsArr.push(newsObj);
      newsHTML += `<div class="accordion-item" id="newsitem${index}">
          <h2 class="accordion-header" id="heading${index}">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse${index}"
              aria-expanded="true"
              aria-controls="collapse${index}"
            >
             <b>Breaking news ${index+1}: </b> ${element['title']}
            </button>
          </h2>
          <div
            id="collapse${index}"
            class="accordion-collapse collapse"
            aria-labelledby="heading${index}"
            data-bs-parent="#newsAccordian"
          >
            <div class="accordion-body position-relative">${element['summary']} <a href="${element['link']}" target="_blank">Read more here</a>
            <div class="position-absolute bottom-0 end-0" style="color:rgb(142, 147, 151);"><i>${element['published_date']}</i></div>
            </div>
          </div>
        </div>`
    })
    localStorage.setItem('news', JSON.stringify(newsArr));
    newsAccordian.innerHTML = newsHTML;
	}
});

xhr.open("GET", "https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=news&lang=en&country=IN&media=True");
xhr.setRequestHeader("X-RapidAPI-Host", "newscatcher.p.rapidapi.com");
xhr.setRequestHeader("X-RapidAPI-Key", "7d4fdbd69fmshc352cc23c93e4a2p115bb7jsn32f1fe52d41b");

xhr.send(data);

document.getElementById('searchBtn').addEventListener('click', function (e) {
  e.preventDefault();
  let newsTxt = document.getElementById('searchTxt').value.toLowerCase();
  let news = localStorage.getItem('news');
  let newsArr = [];
  if (news != null)
    newsArr = JSON.parse(news);
  newsArr.forEach(function (element,index) {
    let newsitem = document.getElementById(`newsitem${index}`);
    if (element['title'].toLowerCase().includes(newsTxt) || element['summary'].toLowerCase().includes(newsTxt) || element['published_date'].toLowerCase().includes(newsTxt))
      newsitem.style.display = 'block';
    else
       newsitem.style.display = 'none';
  })
});
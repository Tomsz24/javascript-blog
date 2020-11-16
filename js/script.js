'use strict'
{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  const articles = document.querySelectorAll(optArticleSelector);

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);

  function geneateTitleLink() {

    titleList.innerHTML = '';
    for (const article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

  }
  geneateTitleLink();

  const titleClickHandler = function (event) {
    event.preventDefault();

    // remove class 'active' from all article links
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    // add class 'active' to clicked link
    this.classList.add('active');

    // remove class 'active' from all articles
    const activeArticles = document.querySelectorAll('.post');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    // get 'href' attribute from clicked link
    const articleSelector = this.getAttribute('href');

    // find the correct article using the selector (value of 'href' attribute)
    const targetArticle = document.querySelector(articleSelector);

    // add class 'active to the correct article
    targetArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }



}


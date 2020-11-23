'use strict'

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassPrefix = 'tag-size-',
    optCloudClassCount = 5;


  const titleList = document.querySelector(optTitleListSelector);

  function generateTitleLinks(customSelector = '') {
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    titleList.innerHTML = '';
    for (const article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      titleList.innerHTML += linkHTML;
    }

  }
  generateTitleLinks();

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

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    }

    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.max);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber
  };

  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (const article of articles) {
      const titleList = article.querySelector(optArticleTagSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      articleTagsArray.map(tag => {
        let htmlCode = `<li><a href="tag-${tag}">${tag}</a></li> `;
        titleList.innerHTML += htmlCode;
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      })
    }
    const tagsParams = calculateTagsParams(allTags);
    const tagList = document.querySelector('.tags');
    let allTagsHTML = '';


    for (let tag in allTags) {
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      allTagsHTML += `<li><a class="${tagLinkHTML}" href="tag-${tag}">${tag}</a><span>(${allTags[tag]})</span></li>`;
    }
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();


  function tagClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const tag = href.replace('tag-', '');
    const activeLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(activeLinks);

    for (const activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    const allTagsLinks = document.querySelectorAll(href);
    console.log(allTagsLinks);

    for (const tagArticle of allTagsLinks) {
      tagArticle.classList('active');
    }
    generateTitleLinks(`[data-tags~="${tag}"]`);
  }

  function addClickListenersToTags() {
    const activeLinks = document.querySelectorAll(`${optArticleTagSelector} a`);
    for (const activeLink of activeLinks) {
      activeLink.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();


  function generateAuthors() {

    const allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (const article of articles) {
      const authorTitle = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');
      authorTitle.innerHTML = `by <a href="author-${author}">${author}</a>`;
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      const authorList = document.querySelector('.list.authors');
      let allAuthorsHTML = '';
      for (const author in allAuthors) {
        allAuthorsHTML += `
        <li><a href="#">${author}</a><span>(${allAuthors[author]})</span></li>`;
      }
      authorList.innerHTML = allAuthorsHTML;
    }
  }
  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const author = href.replace('author-', '');
    const activeLinks = document.querySelectorAll(`a[href="${href}"]`);
    for (const activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    const allAuthorsLinks = document.querySelectorAll(href);
    for (const authorLink of allAuthorsLinks) {
      authorLink.classList('active');
    }
    generateTitleLinks(`[data-author="${author}"]`);
  }

  function addClickListenersAuthors() {
    const activeLinks = document.querySelectorAll(`${optArticleAuthorSelector} a`);
    for (const activeLink of activeLinks) {
      activeLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersAuthors();
}





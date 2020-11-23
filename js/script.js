'use strict'
{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorsLinksList: Handlebars.compile(document.querySelector('#template-authors-links').innerHTML)
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassPrefix = 'tag-size-',
    optCloudClassCount = 5,
    optCloudAllTags = '.list.tags',
    optAuthorsListSelector = '.list.authors';



  const titleList = document.querySelector(optTitleListSelector);

  const generateTitleLinks = function (customSelector = '') {
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    titleList.innerHTML = '';
    for (const article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      // const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      const linkHTMLData = { id: articleId, title: articleTitle }
      const linkHTML = templates.articleLink(linkHTMLData);
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

  const calculateTagsParams = function (tags) {
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

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber
  };

  const generateTags = function () {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (const article of articles) {
      const titleList = article.querySelector(optArticleTagSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      articleTagsArray.map(tag => {
        const tagHTMLData = { articleTag: tag };
        let htmlCode = templates.articleTag(tagHTMLData);
        // let htmlCode = `<li><a href="tag-${tag}">${tag}</a></li> `;
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
    // let allTagsHTML = '';
    const allTagsData = { tags: [] };

    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      // allTagsHTML += `<li><a class="${tagLinkHTML}" href="tag-${tag}">${tag}</a><span>(${allTags[tag]})</span></li>`;
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
  generateTags();


  const tagClickHandler = function (event) {
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
    const allCloudTags = document.querySelectorAll(`${optCloudAllTags} a`);
    for (const cloudTag of allCloudTags) {
      cloudTag.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();


  const generateAuthors = function () {

    const allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (const article of articles) {
      const authorTitle = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');

      const authorArticleData = { articleAuthor: author };
      const authorArticleHTML = templates.articleAuthor(authorArticleData);

      // authorTitle.innerHTML = `by <a href="author-${author}">${author}</a>`;
      authorTitle.innerHTML = authorArticleHTML;
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      const authorList = document.querySelector(optAuthorsListSelector);
      // let allAuthorsHTML = '';
      let allAuthorsHTML = [];
      const allAuthorsData = { authors: [] };
      for (const author in allAuthors) {
        // allAuthorsHTML += `
        // <li><a href="#">${author}</a><span>(${allAuthors[author]})</span></li>`;
        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author]
        })
      }
      // authorList.innerHTML = allAuthorsHTML;

      authorList.innerHTML = templates.authorsLinksList(allAuthorsData);
      console.log(allAuthorsData);
    }

  }
  generateAuthors();

  const authorClickHandler = function (event) {
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

  const addClickListenersAuthors = function () {
    const activeLinks = document.querySelectorAll(`${optArticleAuthorSelector} a`);
    for (const activeLink of activeLinks) {
      activeLink.addEventListener('click', authorClickHandler);
    }
    const authorsLink = document.querySelectorAll(`${optAuthorsListSelector} a`);
    console.log(authorsLink);
    for (const authorLink of authorsLink) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersAuthors();
}
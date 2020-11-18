'use strict'
{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list';
  const articles = document.querySelectorAll(optArticleSelector);

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);

  function geneateTitleLink() {

    titleList.innerHTML = '';
    for (const article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      titleList.innerHTML += linkHTML;
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


  function generateTags() {
    let html = '';
    for (const article of articles) {
      const titleList = article.querySelector(optArticleTagSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for (let tag of articleTagsArray) {
        let tagHTML = `<li><a href="tag-${tag}">${tag}</a></li> `;
        html += tagHTML;
      }
      titleList.innerHTML = html;
    }
  }
  generateTags();










  function tagClickHandler(event) {
    /* prevent default action for this event */

    /* make new constant named "clickedElement" and give it the value of "this" */

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    /* make a new constant "tag" and extract tag from the "href" constant */

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
  }

  function addClickListenersToTags() {
    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  }

  addClickListenersToTags();
}


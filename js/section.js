// section.js
//
// adjusts each section to match viewport height and vertically
// centers content within; if the content exceeds the section
// height, padding is applied to the top and bottom; otherwise,
// the content is vertically centered in the section

//var sections = document.querySelectorAll("section");
//var articles = document.querySelectorAll("article");
//
//for (i = 1; i < sections.length; i++) {
//
//  var height = window.innerHeight + "px";
//
//  sections[i].style.minHeight = height;
//
//  for (j = 1; j < articles.length; j++) {
//
//    var sectionHeight = sections[i].clientHeight;
//    var articleHeight = articles[j].clientHeight;
//
//    // if the article is within 20 pixels of the section height
//    if (sectionHeight - articleHeight < 20) {
//      // apply padding to the article
//      articles[j].style.padding = "3em 0";
//    } else {
//      // adjust the article to appear vertically centered
//      articles[j].style.top = ((sectionHeight - articleHeight) / 2) + "px";
//    }
//  }
//}

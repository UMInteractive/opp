// policy-builder.js

// if a policy requires multiple items from the key's array, iterate
// over selected items and create a paragraph for each.

function constructPolicy(array) {
  var string = "";
  for (i = 0; i < array.length; i++) {
    string += "<p>" + array[i] + "</p>";
  }

  return string;
}


// take the text we've pieced together from policy.js and append
// it to the #policy section

function htmlBuilder(text) {
  var newArticle = document.createElement("article")
  newArticle.innerHTML = text;
  document.getElementById("policy").appendChild(newArticle)
}



// Ugly-ass logic for going through each of the user's answers and
// determining which parts of policy.js apply.

// NOTE: some results are generated from instances where multple
// answers from different questions are needed to add a policy
// statement. Example: If a site's users include minors, we must
// include the COPPA statement in the information retention section.

// Policy sections are broken down as follows:
// - dataCollectionPolicy
// - siteChangesPolicy
// - userRightsPolicy

function generate(opt) {
  // opt = user-generated answers


  // DATA COLLECTION POLICY
  var dataCollectionPolicy = "";

  // question 0: allUsers, adultsOnly, minorsOnly
  if (opt.indexOf("adultsOnly") != -1) {
    dataCollectionPolicy += "<h2>Information We Collect About You</h2>";
    dataCollectionPolicy += "<p>" + dataCollection["general"][0] + "</p>";
    dataCollectionPolicy += "<p>" + dataCollection["general"][2] + "</p>";
  } else {
    // data is being collected no matter what, so declare a general statement
    // this section also accounts for minors
    dataCollectionPolicy += "<h2>Information We Collect About You</h2>";
    dataCollectionPolicy += constructPolicy(dataCollection["general"]);
  }

  // question 1: personalSite, personalThird
  if (opt.indexOf("personalSite") != -1 || opt.indexOf("personalThird") != -1) {
    dataCollectionPolicy += "<h3>Personal Information</h3>";
    dataCollectionPolicy += "<p>" + dataCollection["personal"][0] + "</p>" // define
    if (opt.indexOf("personalSite") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["personal"][1] + "</p>" // site only
    } else {
      dataCollectionPolicy += "<p>" + dataCollection["personal"][2] + "</p>" // third party
    }
  }

  // question 2: demographicSite, demographicThird
  if (opt.indexOf("demographicSite") != -1 || opt.indexOf("demographicThird") != -1) {
    dataCollectionPolicy += "<h3>General &amp; Demographic Information</h3>";
    dataCollectionPolicy += "<p>" + dataCollection["demographic"][0] + "</p>" // define
    if (opt.indexOf("demographicSite") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["demographic"][1] + "</p>" // site only
    } else {
      dataCollectionPolicy += "<p>" + dataCollection["demographic"][2] + "</p>" // third party
    }
  }

  // question 3: transactionalSite, transactionalThird
  if (opt.indexOf("transactionalSite") != -1 || opt.indexOf("transactionalThird") != -1) {
    dataCollectionPolicy += "<h3>Transactional Information</h3>";
    dataCollectionPolicy += "<p>" + dataCollection["transactional"][0] + "</p>" // define
    if (opt.indexOf("transactionalSite") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["transactional"][1] + "</p>" // site only
    } else {
      dataCollectionPolicy += "<p>" + dataCollection["transactional"][2] + "</p>" // third party
    }
  }

  // question 4 & 5: friendsAuth; friendsSite, friendsThird
  if (opt.indexOf("friendsAuth") != -1 || opt.indexOf("friendsNoAuth") != -1) {
    dataCollectionPolicy += "<h3>Friends &amp; Contacts Information</h3>";
    dataCollectionPolicy += "<p>" + dataCollection["friends"][0] + "</p>" // define

    // with user authorization?
    if (opt.indexOf("friendsAuth") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["friends"][1] + "</p>" // user auth
    } else {
      dataCollectionPolicy += "<p>" + dataCollection["friends"][2] + "</p>" // no auth
    }

    // how is it used?
    if (opt.indexOf("friendsSite") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["friends"][3] + "</p>" // site only
    } else if (opt.indexOf("friendsThird") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["friends"][4] + "</p>" // third party
    }
  }

  // question 6: retainIndefinite, retainRegistered, retainSpecified
  // - also check for allUsers, minorsOnly to post COPPA statement
  if (opt.indexOf("retainIndef") != -1 || opt.indexOf("retainRegis") != -1 || opt.indexOf("retainLimit") != -1) {
    dataCollectionPolicy += "<h3>Retention of Information</h3>";
    dataCollectionPolicy += "<p>" + dataCollection["retention"][0] + "</p>" // define

    if (opt.indexOf("retainIndef") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["retention"][1] + "</p>" // indefinitely
    } else if (opt.indexOf("retainRegis") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["retention"][2] + "</p>" // as long as registered
      dataCollectionPolicy += "<p>" + dataCollection["retention"][4] + "</p>" // legal retention
    } else if (opt.indexOf("retainLimit") != -1) {
      dataCollectionPolicy += "<p>" + dataCollection["retention"][3] + "</p>" // as long as registered
      dataCollectionPolicy += "<p>" + dataCollection["retention"][4] + "</p>" // legal retention
    }

    if (opt.indexOf("allUsers") != 1 || opt.indexOf("minorsOnly")) {
      dataCollectionPolicy += "<p>" + dataCollection["retention"][5] + "</p>" // COPPA
    }
  }



  // SITE AND PRIVACY POLICY CHANGES
  var siteChangesPolicy = "";
  siteChangesPolicy += "<h2>Site &amp; Policy Changes</h2>";
  siteChangesPolicy += constructPolicy(siteChanges["general"]);

  // question 7: userNotified
  if (opt.indexOf("userNotified") != -1) {
    siteChangesPolicy += "<p>" + siteChanges["userNotified"][0] + "</p>" // user notified
  } else {
    siteChangesPolicy += "<p>" + siteChanges["userNotified"][1] + "</p>" // no notification
  }

  // question 9: oldData, newData
  if (opt.indexOf("oldData") != -1) {
    siteChangesPolicy += "<p>" + siteChanges["oldData"][0] + "</p>" // user consent
  } else if (opt.indexOf("newData") != -1) {
    siteChangesPolicy += "<p>" + siteChanges["newData"][0] + "</p>" // no consent
  }

  // question 9: transferConsent, transferNoConsent
  if (opt.indexOf("transferConsent") != -1) {
    siteChangesPolicy += "<p>" + siteChanges["userConsent"][0] + "</p>" // user consent
  } else if (opt.indexOf("transferNoConsent") != -1) {
    siteChangesPolicy += "<p>" + siteChanges["userConsent"][1] + "</p>" // no consent
  }



  // USER RIGHTS POLICY
  var userRightsPolicy = ""
  userRightsPolicy += "<h2>User Rights</h2>";
  userRightsPolicy += "<h3>Editing Your Information</h3>";

  if (opt.indexOf("userEdit") != -1) {
    userRightsPolicy += "<p>" + userRights["userEdit"][0] + "</p>"; // edit away!
  } else {
    userRightsPolicy += "<p>" + userRights["userEdit"][1] + "</p>"; // no editing process
  }


  userRightsPolicy += "<h3>Opting Out of Communication</h3>";

  if (opt.indexOf("userOptOut") != -1) {
    userRightsPolicy += "<p>" + userRights["optOut"][0] + "</p>"; // opt out
    if (opt.indexOf("userEdit") != -1) {
      userRightsPolicy += "<p>" + userRights["optOut"][1] + "</p>"; // opt out & edit
    }
  } else if (opt.indexOf("noOptOut") != -1) {
    userRightsPolicy += "<p>" + userRights["optOut"][2] + "</p>"; // no opt out
  }


  userRightsPolicy += "<h3>Security Practices</h3>";
  userRightsPolicy += constructPolicy(userRights["security"].slice(0,3));

  if (opt.indexOf("secPassword") != -1) {
    userRightsPolicy += "<p>" + userRights["security"][3] + "</p>"
  }

  if (opt.indexOf("secEncrypt") != -1) {
    userRightsPolicy += "<p>" + userRights["security"][4] + "</p>"
  }



  // PRINT IT OUT!

  // print dataCollectionPolicy
  htmlBuilder(dataCollectionPolicy)

  // print siteChangesPolicy
  htmlBuilder(siteChangesPolicy)

  // print userRightsPolicy
  htmlBuilder(userRightsPolicy)

  // add custom badge link

  document.getElementsByTagName("textarea")[0].value =
  '<a href="http://openprivacypolicy.me/policy.html?' + answers.join("&") + '>Open Privacy Policy</a>'

}

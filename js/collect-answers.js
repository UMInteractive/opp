function collectAnswers(form) {
  for (var i = 0; i < form.elements.length; i++) {
    // radio
    if (form.elements[i].type == "radio") {
      if (form.elements[i].checked == true && form.elements[i].value != "null") {
        answers.push(form.elements[i].value);
      }
    }

  // checkboxes
    if (form.elements[i].type == "checkbox") {
      if (form.elements[i].checked == true) {
        answers.push(form.elements[i].value);
      }
    }
  }

  return answers
}

var answers = [];
var form = document.getElementById("questions");
var submit = document.getElementById("submit");

submit.addEventListener("click", function() {
  event.preventDefault();
  var myAnswers = collectAnswers(form);
  //console.log(myAnswers);
  window.location.href = "your-policy.html?" + myAnswers.join("&");
});

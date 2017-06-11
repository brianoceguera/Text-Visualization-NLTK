//References:
//https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
//Allows one to upload files via AJAX without using jQuery

var form = document.forms.namedItem("fileupload");
form.addEventListener('submit', function(ev) {

  var formresult = document.querySelector("div"),
      data = new FormData(form);

  data.append("CustomField", "This is some extra data");

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);
  xhr.onload = function(ev) {
    if (xhr.status == 200) {
      var result = xhr.responseText;
      console.log(result);
      formresult.innerHTML = result;
    }
 
    else {
      formresult.innerHTML = "Error " + xhr.status + " occurred when trying to upload your file.";
    }
  };

  xhr.send(data);
  ev.preventDefault();
}, false);

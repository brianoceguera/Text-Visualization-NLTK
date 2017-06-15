//References:
//https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
//http://sahandsaba.com/visualizing-philosophers-and-scientists-by-the-words-they-used-with-d3js-and-python.html
//https://stackoverflow.com/questions/11142884/fast-way-to-get-the-min-max-values-among-properties-of-object

var form = document.forms.namedItem("fileupload");
var fileinput = document.getElementById("fin");

//Function to compute max value across an object's values
//Used to normalize text size of all words
function find_max(obj) {
  var arr = Object.keys(obj).map(function (key) { return obj[key]; });
  return Math.max.apply(null, arr);
}

fileinput.addEventListener('change', function() {
  document.getElementById("fname").innerHTML = fileinput.files[0].name;
}, false);

//Event listener for when form is submitted by user
form.addEventListener('submit', function(ev) {

  var formresult = document.getElementById("fresult"),
      data = new FormData(form);
  formresult.innerHTML = "Processing file. Please wait...";
  
  //Clear out word-cloud if it already exists
  var word_div = document.getElementById("word-cloud");
  word_div.innerHTML = "";

  //Proceed with asynchronous request to server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);
  xhr.onload = function(ev) {
    if (xhr.status == 200) {
      var result = xhr.responseText;
      var json;
      //Uncomment to see result in div
      //formresult.innerHTML = result;

      try {
        var json = JSON.parse(result);
        //console.log("Parser worked!");
      } catch (e) {
        //console.log("Uh-oh");
        formresult.innerHTML = result;
        return false;
      }

      drawWordCloud(150, json);
      formresult.innerHTML = "Ta-da! Finished.";
    }
 
    else {
      formresult.innerHTML = "Error " + xhr.status + " occurred when trying to upload your file.";
    }
  };

  xhr.send(data);
  ev.preventDefault();
}, false);


function drawWordCloud(rescale = 30, json_words) {
    //console.log("Starting to draw...  " + json_words);
    height = width = 700;
    fontFamily = "Open Sans";
    var fill = d3.scale.category20();
    d3.layout.cloud().size([width, height])
        .words(Object.keys(json_words).map( function(d) { 
            return {
                text: d,
                size: ( json_words[d] / find_max(json_words) ) * rescale
            };
        }))
        .padding(1)
        .rotate( function() {
            // Uncomment and change this line if you want the words to
            // be rotated. Returning 0 makes all the words horizontal.
            // return ~~(Math.random() * 2) * 90;
            return 0;
        })
        .font(fontFamily)
        .fontSize(function(d) {
            return d.size;
        })
        .on("end", draw)
        .start();

    function draw(words) {
        //console.log("Entered Draw function");
        d3.select("#word-cloud").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("font-family", fontFamily)
            .style("fill", function(d, i) {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
                return d.text;
            });
    }

//console.log("Word cloud finished");
}

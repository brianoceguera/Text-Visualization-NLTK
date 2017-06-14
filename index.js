//References:
//https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
//http://sahandsaba.com/visualizing-philosophers-and-scientists-by-the-words-they-used-with-d3js-and-python.html


var form = document.forms.namedItem("fileupload");

//Function to compute sum accross an object's values
//Used to calculate the mean frequency of words
function sum( obj ) {
  return Object.keys( obj )
               .reduce( function( sum, key ){
                 return sum + parseFloat( obj[key] );
               }, 0 );
}

//Event listener for when form is submitted by user
form.addEventListener('submit', function(ev) {

  var formresult = document.querySelector("div"),
      data = new FormData(form);
  formresult.innerHTML = "Please wait...";
  
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
      //formresult.innerHTML = result;

      try {
        var json = JSON.parse(result);
        console.log("Parser worked!");
      } catch (e) {
        console.log("Uh-oh");
        return false;
      }

      drawWordCloud(1, json);
      formresult.innerHTML = "Ta-da~!";
    }
 
    else {
      formresult.innerHTML = "Error " + xhr.status + " occurred when trying to upload your file.";
    }
  };

  xhr.send(data);
  ev.preventDefault();
}, false);


function drawWordCloud(rescale = 2, json_words)
{   //console.log("Starting to draw...  " + json_words);
    height = width = 30 * sum(json_words) / Object.keys(json_words).length;
    //console.log(height + "  " + width);
    fontFamily = "Open Sans";
    var fill = d3.scale.category20();
    d3.layout.cloud().size([width, height])
        .words(Object.keys(json_words).map(function(d)
        { 
            return {
                text: d,
                size: 1 + json_words[d] * rescale
            };
        }))
        .padding(1)
        .rotate(function()
        {
            // Uncomment and change this line if you want the words to
            // be rotated. Returning 0 makes all the words horizontal.
            // return ~~(Math.random() * 2) * 90;
            return 0;
        })
        .font(fontFamily)
        .fontSize(function(d)
        {
            return d.size;
        })
        .on("end", draw)
        .start();

    function draw(words)
    {   console.log("Entered Draw function");
        d3.select("#word-cloud").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d)
            {
                return d.size + "px";
            })
            .style("font-family", fontFamily)
            .style("fill", function(d, i)
            {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d)
            {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d)
            {
                return d.text;
            });
    }
//console.log("Word cloud finished");
}

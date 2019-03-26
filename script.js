/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
var container="";
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 0}
  },

  init: function () {
    var data = this.data;
    var el = this.el;


    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
          if(data.src==="search"){
             search();
          }else if(data.src=="back"){
              
                container = container.substring(0, container.length-1);
          }
          else if(container.length<25)
          container=container+data.src;
          document.getElementById("searchbox").setAttribute('value',container);
       // data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  }
});
var path;

function fetchbeforehand(){
      var xhttp1 = new XMLHttpRequest();
        
          xhttp1.onloadend = function() {
            if (this.readyState == 4 && this.status == 200) {
              path=this.responseText;
              var startindex=path.indexOf("&");
              var startindex2=path.indexOf("url+'")+5;
              path=path.substr(startindex,path.indexOf("';",startindex)-startindex)+path.substr(startindex2,path.indexOf("';",startindex2)-startindex2);
              
            }else{
                alert(this.responseText);
            }
          };
          xhttp1.open("GET", "https://www.gigablast.com/search?q=hello", true);
          xhttp1.send();
}
function search(){
  
   document.getElementById("SearchArea").setAttribute('visible',"false");
    console.log(path);
  
        var xhttp = new XMLHttpRequest();
        
          xhttp.onloadend = function() {
              //alert(this.responseText);
            if (this.readyState == 4 && this.status == 200) {
              showresult(this.responseText);
              console.log(path);
            }else{
                alert(this.responseText);
            }
          };
          xhttp.open("GET", "https://www.gigablast.com/search?q="+container+"&n=20"+path, true);
          xhttp.send();
}
var el = document.createElement( 'html' );

function showresult(msg){
  el.innerHTML=msg;
  var title= el.getElementsByClassName("title");
  var desc=el.getElementsByClassName("title");
  console.log("lel");
  for(var i=0;i<20;i++){
    var description=desc[i].parentElement.innerText.split("\n\n")[2];
    description= description.replace(/(\r\n|\n|\r)/gm, "");
    var ti=title[i].innerText;
    document.getElementsByClassName("result_title")[i].setAttribute('value',ti.substr(0,25).trim()+"...");
     document.getElementsByClassName("result_desc")[i].setAttribute('value',description.substr(0,150)+"...");
  }
  
  document.getElementById("searchresults").setAttribute('visible',"true");
  
}

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
              document.getElementById("SearchArea").setAttribute('visible',"false");
            document.getElementById("searchresults").setAttribute('visible',"true");
          }else if(data.src=="back"){
              
                container = container.substring(0, container.length-1);
          }
          else
          container=container+data.src;
          document.getElementById("searchbox").setAttribute('value',container);
       // data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  }
});

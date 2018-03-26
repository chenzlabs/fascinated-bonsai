// FIXME: currently expects variable tourXML to contain the unparsed XML string...
  
AFRAME.registerComponent('tour-scene', {
  schema: {
    //tour: {type: 'string'},
    id: {type: 'string'},
    title: {type: 'string'},
    name: {type: 'string'},
    description: {type: 'string'},
    npot: {type: 'boolean', default: true}
  },
  
  init: function () {
    this.parsedTour = new DOMParser().parseFromString(tourXML, "text/xml");
      // FIXME
    
    var boxholder = this.boxholder = document.createElement('a-entity');
    var imagebox = this.imagebox = document.createElement('a-entity');
    boxholder.appendChild(imagebox);
    imagebox.insertAdjacentHTML('beforeEnd', 
`
<a-plane class="left" position="-500 0 0" width="1000" height="1000" rotation="0 90 0"></a-plane>
<a-plane class="front" position="0 0 -500" width="1000" height="1000" rotation="0 0 0"></a-plane>
<a-plane class="right" position="500 0 0" width="1000" height="1000" rotation="0 -90 0"></a-plane>
<a-plane class="back" position="0 0 500" width="1000" height="1000" rotation="0 180 0"></a-plane>
<a-plane class="up" position="0 500 0" width="1000" height="1000" rotation="90 0 0"></a-plane>
<a-plane class="down" position="0 -500 0" width="1000" height="1000" rotation="-90 0 0"></a-plane>
`);
    
    var nodeholder = this.nodeholder = document.createElement('a-entity');
    boxholder.appendChild(nodeholder);
    
    this.el.appendChild(boxholder);
  },
  
  update: function (oldData) {        
    // remove old nodes
    var nodeholder = this.nodeholder;    
    var nodes = Array.prototype.slice.call(nodeholder.querySelectorAll('.node'));
    for (var i=0; i<nodes.length; i++) {
      var node = nodes[i];
      node.parentElement.removeChild(node);
    }

    // find correct scene, or bail
    this.tourScene = this.parsedTour.getElementById(this.data.id)
      || this.parsedTour.querySelector('scene[title="' + this.data.title + '"]') 
      || this.parsedTour.querySelector('scene[name="' + this.data.name + '"]') 
      || this.parsedTour.querySelector('scene[description="' + this.data.description + '"]');
    if (!this.tourScene) { return; }
    
    var imagebox = this.imagebox;    
    var sceneImage = this.sceneImage = this.tourScene.querySelector('image');
    
    var rotations = this.sceneImage.getAttribute('prealign').split('|');
    var rotationString = rotations[0] + ' ' + (360 - rotations[1]) + ' ' + rotations[2];
    imagebox.setAttribute('rotation', rotationString);
    
    var menu_fov = this.tourScene.getAttribute('menu_fov');
    // HACK: there seems to be a bug (#74, #55, #51, #124) where menu_fov of 248+ is off by 90...
    // #113 is 147, but seems off by a different amount.
    // #255 is 171, but seems off by a different amount (should be zero).
    // #258 is 174, but seems off by a different amount (should be zero).
    // #271 is 179.something, but seems off by a different amount (should be zero).
    if (menu_fov > 180) { menu_fov -= 270; } // fixes #74, #55, #51, #124...
    else if (menu_fov > 170 && menu_fov <= 180) { menu_fov = 0; } // fixes #255, #258, #271...
    else if (menu_fov > 90) { menu_fov += 90; } // fixes #113...
    nodeholder.setAttribute('rotation', '0 ' + (360 - menu_fov) + ' 0');
    
    var npot = this.data.npot;

    // free the previous textures
    ['left','front','right','back','up','down'].map(function(which) {
      var plane = imagebox.querySelector('.' + which);
      plane.setAttribute('material', { src: '' });
    });

    // assign the new textures    
    setTimeout(function() {
      ['left','front','right','back','up','down'].map(function(which) {
        var plane = imagebox.querySelector('.' + which);
        plane.setAttribute('material', {
          src: sceneImage.querySelector(which).getAttribute('url'),
          shader: 'flat',
          npot: npot
        });
      });
    });

    // create new nodes
    var sceneNodes = this.sceneNodes = this.tourScene.querySelectorAll('node');
    Array.prototype.slice.call(sceneNodes).forEach(function (node) {
      nodeholder.insertAdjacentHTML('beforeEnd',
'<a-entity class="node" rotation="0 -' + node.getAttribute('pt_bear') 
+ ' 0"><a-text align="center" position="0 -6 -12" wrap-count="15" rotation="-90 0 0" value="' + node.getAttribute('pt') 
+ '"></a-text><a-entity position="0 -6 -12" rotation="-90 0 0" link="href:#' + node.getAttribute('pt') 
+ ';title:."></a-entity></a-entity>');
    });
  }
});
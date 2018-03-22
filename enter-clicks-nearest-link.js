AFRAME.registerComponent('enter-clicks-nearest-link', {
  schema: {
    enabled: {default: true},
  },
  init: function () {
    //this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  },
  play: function () {
    //window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  pause: function () {
    //window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);          
  },
  onKeyUp: function (evt) {
    switch (evt.keyCode) {
      case 13: 
        if (!this.data.enabled) { return; }
        var links = this.el.sceneEl.querySelectorAll('[link]');
        if (links && links.length) {
          var camWorldDir = this.el.sceneEl.camera.getWorldDirection();
          var camWorldPos = this.el.sceneEl.camera.getWorldPosition();
          var tempPos = new THREE.Vector3(); 
          var dot = 0;
          var nearest = null;
          for (var i=0; i<links.length; i++) {
            links[i].object3D.getWorldPosition(tempPos);
            tempPos.sub(camWorldPos).normalize();            
            var thisdot = camWorldDir.dot(tempPos);
            console.log(i, ' (', links[i].components.link.data.href, ') ', thisdot); 
            if (thisdot > dot) {
              dot = thisdot;
              nearest = links[i];
              console.log('... nearest');
            }
          }
          if (nearest) { nearest.components.link.navigate(); }
        }
        break;
    }          
  }
});

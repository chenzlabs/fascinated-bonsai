AFRAME.registerComponent('arrow-key-rotation', {
  schema: {
    enabled: {default: true},
    dx: {default: 2.0},
    dy: {default: 2.0},
  },
  init: function () {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.directionX = 0;
    this.directionY = 0;
  },
  play: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  pause: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);          
  },
  onKeyDown: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 1; break;
      case 38: this.directionY = 1; break;
      case 39: this.directionX = -1; break;
      case 40: this.directionY = -1; break;
    }
  },
  onKeyUp: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 0; break;
      case 38: this.directionY = 0; break;
      case 39: this.directionX = 0; break;
      case 40: this.directionY = 0; break;
    }          
  },
  tick: function (t, dt) {
    if (!this.data.enabled) { return; }
    // With latest master, it is recommended to manipulate object3D rotation directly.
    var rotation = this.el.object3D.rotation;
    // FIX: with A-Frame 0.8.x, need to modify pitchObject and yawObject of look-controls, if present.
    var lookControls = this.el.components['look-controls'];
    if (lookControls) { rotation = lookControls.pitchObject.rotation; }
    if (!rotation) { return; }
    if (this.directionX || this.directionY) {
      // Remember, object3D rotation is in radians!
      rotation.x += this.data.dx * THREE.Math.DEG2RAD * this.directionY;
      if (lookControls) { rotation = lookControls.yawObject.rotation; }
      rotation.y += this.data.dy * THREE.Math.DEG2RAD * this.directionX;
    }
  }
});

  AFRAME.registerComponent('teleprompter', {
    schema: {
      script: {type: 'string'},
      interval: {default: 8000},
      from: {default: 0},
      lengthScale: {default: 0},
      opacity: {default: 1},
      fadetime: {default: 2000}
    },
    
    update: function (oldData) {
      if (this.animTimeout) { clearTimeout(this.animTimeout); }
      
      // allow text wrapping within url(...)
      if (this.data.script.startsWith('url(') && this.data.script.endsWith(')')) {
        this.data.script = this.data.script.substring(4, this.data.script.length - 5);
      }
      
      var newlinepos = this.data.script.indexOf('\n');
      var now, later;
      if (newlinepos < 0) {
        now = this.data.script.replace(/<<EOF$/,'');
        later = '';
      } else {      
        now = this.data.script.substring(0, newlinepos).replace(/<<EOF$/,'');
        later = this.data.script.substring(newlinepos+1);
      }
      
      // TODO: optional fade-out
      this.el.setAttribute('text', 'opacity', this.data.from);
      this.el.setAttribute('text', 'value', now);
      
      var self = this;
      if (later) {
        this.animTimeout = setTimeout(function () {
          self.animTimeout = null;
          // BUG: loses trailing whitespace!  self.el.setAttribute('burma-shave', {script: later}); 
          self.data.script = later; 
          self.update(self.data);
        }, self.data.interval + self.data.lengthScale * now.length);
      }
      
      if (!this.animEl) {
        // create animation which will auto-trigger
        this.animEl = document.createElement('a-animation');
        this.animEl.setAttribute('attribute', 'text.opacity');
        this.animEl.setAttribute('to', this.data.opacity);
        this.animEl.setAttribute('dur', this.data.fadetime);
        this.el.appendChild(this.animEl);
      } else {
        // retrigger animation
        this.animEl.stop();
        this.animEl.start();
      }      
    }
  });
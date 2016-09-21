// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {

  this.$node = $('<span class="dancer"></span>');
  
  //Timing properties
  this.timeBetweenSteps = timeBetweenSteps;

  //Positional properties
  this.top = top;
  this.left = left;
  this.setPosition(top, left);

  //Booleans
  this.dance = true;
  this.canMouseOver = true;

  //Start dancing
  if (this.constructor === makeDancer) {
    this.step(); 
  }
};

makeDancer.prototype.step = function(time) {
  if (!this.dance) {
    return;
  }

  //Time delay between dancing
  var interval = time || this.timeBetweenSteps;
  setTimeout(this.step.bind(this), interval);
};

makeDancer.prototype.setPosition = function(top, left) {
  //Hard set position
  this.top = top;
  this.left = left;

  var styleSettings = {
    top: this.top,
    left: this.left
  };
  //Css position
  this.$node.css(styleSettings);
};

makeDancer.prototype.stopDancing = function() {
  this.dance = false;
};

makeDancer.prototype.startDancing = function() {
  this.dance = true;
  this.canMouseOver = true;
  var x = parseFloat(this.$node.css('left'));
  var y = parseFloat(this.$node.css('top'));
  this.setPosition(y, x);
  this.step();
};

makeDancer.prototype.continueDancing = function() {
  this.dance = true;
  this.step();
};

makeDancer.prototype.lineUp = function(top, left, time) {
  time = time || 1;
  this.stopDancing();
  this.canMouseOver = false;
  var cssPosition = {
    top: '' + top,
    left: '' + left
  };

  this.$node.animate(cssPosition, time, this.setPosition.bind(this, top, left));
};

makeDancer.prototype.getPosition = function() {
  var top = parseFloat(this.$node.css('top'));
  var left = parseFloat(this.$node.css('left'));

  return {top: top, left: left};
};

makeDancer.prototype.isDancing = function() {
  return this.dance;
};






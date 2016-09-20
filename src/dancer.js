// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.dance = true;
  this.top = top;
  this.left = left;
  this.setPosition(top, left);
  this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  if (this.dance) {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }
};

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  this.top = top;
  this.left = left;
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};

makeDancer.prototype.stopDancing = function() {
  this.dance = false;
};

makeDancer.prototype.startDancing = function() {
  this.dance = true;
  var x = parseFloat(this.$node.css('left'));
  var y = parseFloat(this.$node.css('top'));
  this.setPosition(y, x);
  this.step();
};
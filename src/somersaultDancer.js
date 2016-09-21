var makeSomersaultDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  
  //Gif assignment
  this.$node.addClass('somersault');

  //Circle Properties
  this.t = 0;
  this.groupDancing = false;
  this.setRadius(Math.random() * 100 + 50);

  if (this.constructor === makeSomersaultDancer) {
    this.step();
  }
};

makeSomersaultDancer.prototype = Object.create(makeDancer.prototype);
makeSomersaultDancer.prototype.constructor = makeSomersaultDancer;

makeSomersaultDancer.prototype.step = function(time) {
  if (!this.isDancing()) {
    return;
  }

  //Circle Position Math
  var xCenter = this.left;
  var yCenter = this.top - this.r;
  this.t += 0.1;
  var newLeft = Math.floor(xCenter + (this.r * Math.sin(this.t)));
  var newTop = Math.floor(yCenter + (this.r * Math.cos(this.t)));

  //Time interval
  var timeInterval = time || 20 + 10 * Math.random();

  this.$node.animate({top: newTop, left: newLeft}, 
                      timeInterval, 
                      this.step.bind(this, timeInterval));
};

makeSomersaultDancer.prototype.setRadius = function(radius) {
  this.r = radius;
};

makeSomersaultDancer.prototype.startDancing = function() {
  this.resetProperties();
  makeDancer.prototype.startDancing.call(this);
};

makeSomersaultDancer.prototype.continueDancing = function() {
  makeDancer.prototype.continueDancing.call(this);
};

makeSomersaultDancer.prototype.resetProperties = function() {
  this.t = 0;
  this.groupDancing = false;
};

makeSomersaultDancer.prototype.fadeOut = function(time) {
  time = time || 2000;
  this.$node.fadeOut(time);
};

makeSomersaultDancer.prototype.groupDance = function() {
  //this.$node.addClass('move')
  if (!this.groupDancing) {
    this.t = Math.PI * 0.7322795;
  }
  this.groupDancing = true;
  this.limaconDance(100);
};

makeSomersaultDancer.prototype.limaconDance = function(time) {
  if (!this.groupDancing) {
    return;
  }

  var xCenter = this.left;
  var yCenter = this.top;
  this.t += 0.1;
  var r = 200 + 300 * Math.cos(this.t);
  var newLeft = Math.floor(xCenter - (r * Math.sin(this.t)));
  var newTop = Math.floor(yCenter - (r * Math.cos(this.t)));

  //Time interval
  var timeInterval = time;

  this.$node.animate({top: newTop, left: newLeft}, 
                      timeInterval, 
                      this.limaconDance.bind(this, timeInterval));

};

makeSomersaultDancer.prototype.lineUp = function(top, left, time) {
  makeDancer.prototype.lineUp.call(this, top, left, time);
  this.groupDancing = false;

};
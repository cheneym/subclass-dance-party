var makeSomersaultDancer = function(top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.t = 0;
  this.r = Math.random() * 100 + 50;
  this.xCenter = parseFloat(this.$node.css('left'));
  this.yCenter = parseFloat(this.$node.css('top')) - this.r;
};

makeSomersaultDancer.prototype = Object.create(makeDancer.prototype);
makeSomersaultDancer.prototype.constructor = makeSomersaultDancer;
makeSomersaultDancer.prototype.step = function() {
  // this.oldStep();

  this.t += 0.1;
  
  var newLeft = Math.floor(this.xCenter + (this.r * Math.cos(this.t)));
  var newTop = Math.floor(this.yCenter + (this.r * Math.sin(this.t)));

  this.$node.animate({top: newTop, left: newLeft}, 1, this.step.bind(this));
};
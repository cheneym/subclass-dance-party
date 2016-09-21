var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);

  this.$node.addClass('blinky');

  if (this.constructor === makeBlinkyDancer) {
    this.step(); 
  }
};

makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);
makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;

makeBlinkyDancer.prototype.step = function(time) {
  if (!this.isDancing) {
    return;
  }

  makeDancer.prototype.step.call(this, time);
  // this.$node.toggle();


};
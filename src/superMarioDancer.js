var makeSuperMarioDancer = function(top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  makeDancer.call(this, top, left, timeBetweenSteps);
};

makeSuperMarioDancer.prototype = Object.create(makeDancer.prototype);

makeSuperMarioDancer.prototype.constructor = makeSuperMarioDancer;

makeSuperMarioDancer.prototype.step = function() {
  this.oldStep();
  this.$node.toggle();
};
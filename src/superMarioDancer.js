var makeSuperMarioDancer = function(top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.jump = false;
  this.$node.addClass('superMario');
};

makeSuperMarioDancer.prototype = Object.create(makeDancer.prototype);

makeSuperMarioDancer.prototype.constructor = makeSuperMarioDancer;

makeSuperMarioDancer.prototype.step = function() {
  this.oldStep();
  this.jump = !this.jump;
  var offset = 100;
  var positionString = this.$node.css('top');
  var position = parseFloat(positionString.slice(0, positionString.length - 2));
  position = this.jump ? position - offset : position + offset;
  var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  this.$node.animate({top: position}, interval);
};
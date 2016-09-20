var makeSuperMarioDancer = function(top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  this.jump = false;
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('superMario');
  //this.$node.append($('<img src="Images/Marios-power-jump.gif" alt="Mario" style="width:100px;height:125px;">'));
  // this.timeBetweenSteps = 3000;
};

makeSuperMarioDancer.prototype = Object.create(makeDancer.prototype);
makeSuperMarioDancer.prototype.constructor = makeSuperMarioDancer;

makeSuperMarioDancer.prototype.step = function() {
  if (!this.dance) {
    return;
  }
  this.jump = !this.jump;
  var offset = 100;
  // var positionString = this.$node.css('top');
  var top = parseFloat(this.$node.css('top'));
  top = this.jump ? top - offset : top + offset;
  // var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  // this.$node.animate({top: position}, interval);
  // var currTop = this.jump ? top - offset : top;
  var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  this.$node.animate({top: top}, interval, this.step.bind(this));
};

makeSuperMarioDancer.prototype.startDancing = function() {
  this.jump = false;
  makeDancer.prototype.startDancing.call(this);
};

makeSuperMarioDancer.prototype.continueDancing = function() {
  makeDancer.prototype.continueDancing.call(this);
};

makeSuperMarioDancer.prototype.checkDistance = function(top, left) {
  // body...
};
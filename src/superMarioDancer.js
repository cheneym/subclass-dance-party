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
  this.jump = !this.jump;
  var offset = 100;
  // var positionString = this.$node.css('top');
  // var position = parseFloat(positionString.slice(0, positionString.length - 2));
  // position = this.jump ? position - offset : position + offset;
  // var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  // this.$node.animate({top: position}, interval);
  var currTop = this.jump ? this.top - offset : this.top;
  var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  this.$node.animate({top: currTop}, interval, this.step.bind(this));
};
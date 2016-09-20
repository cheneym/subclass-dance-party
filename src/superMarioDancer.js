var makeSuperMarioDancer = function(top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  this.jump = false;
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('superMario');
  //this.$node.append($('<img src="Images/Marios-power-jump.gif" alt="Mario" style="width:100px;height:125px;">'));
  // this.timeBetweenSteps = 3000;
  this.hasJumped = false;
};

makeSuperMarioDancer.prototype = Object.create(makeDancer.prototype);
makeSuperMarioDancer.prototype.constructor = makeSuperMarioDancer;

makeSuperMarioDancer.prototype.step = function(height, timeDelay) {
  if (!this.dance) {
    return;
  }
  this.jump = !this.jump;
  var offset = height || 100;
  
  // var positionString = this.$node.css('top');
  var top = parseFloat(this.$node.css('top'));
  top = this.jump ? top - offset : top + offset;
  // var interval = this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  // this.$node.animate({top: position}, interval);
  // var currTop = this.jump ? top - offset : top;
  var interval = timeDelay || this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  this.$node.animate({top: top}, interval, this.step.bind(this, height, timeDelay));
};

makeSuperMarioDancer.prototype.startDancing = function() {
  this.jump = false;
  makeDancer.prototype.startDancing.call(this);
};

makeSuperMarioDancer.prototype.continueDancing = function() {
  makeDancer.prototype.continueDancing.call(this);
};

makeSuperMarioDancer.prototype.groupDance = function(height, timeDelay, maxDistance) {
  var marios = window.dancers.filter(function(dancer) {
    return dancer.constructor === makeSuperMarioDancer;
  });
  this.dance = true;
  this.jump = false;
  this.hasJumped = true;
  this.step(height, timeDelay);
  var currMario = this;
  var setCount = 0;
  marios.forEach(function(mario) {
    var distance = Math.sqrt(Math.pow((currMario.top - mario.top), 2) + Math.pow((currMario.left - mario.left), 2));
    if (distance < maxDistance && !mario.hasJumped) {
      setTimeout(mario.groupDance.bind(mario, height, timeDelay, maxDistance), timeDelay / 3);
      setCount++;
      console.log(setCount);
    }
  });
};
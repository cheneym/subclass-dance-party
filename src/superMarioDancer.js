var makeSuperMarioDancer = function(top, left, timeBetweenSteps) {
  this.jump = false;
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('superMario');
  this.hasJumped = false;
  if (this.constructor === makeSuperMarioDancer) {
    this.step(); 
  }
};

makeSuperMarioDancer.prototype = Object.create(makeDancer.prototype);
makeSuperMarioDancer.prototype.constructor = makeSuperMarioDancer;

makeSuperMarioDancer.prototype.step = function(height, timeDelay) {
  if (!this.isDancing()) {
    return;
  }
  this.jump = !this.jump;
  var offset = height || 100;
  var top = parseFloat(this.getPosition().top);
  top = this.jump ? top - offset : top + offset;
  var interval = timeDelay || this.timeBetweenSteps - (!this.jump ? this.timeBetweenSteps / 3 : 0);
  this.$node.animate({top: top}, interval, this.step.bind(this, height, timeDelay));
};

makeSuperMarioDancer.prototype.startDancing = function() {
  this.resetJump();
  makeDancer.prototype.startDancing.call(this);
};

makeSuperMarioDancer.prototype.continueDancing = function() {
  makeDancer.prototype.continueDancing.call(this);
};

makeSuperMarioDancer.prototype.groupDance = function(height, timeDelay, maxDistance) {
  if (this.isDancing()) {
    return;
  }
  this.stopDancing();
  this.setPosition(this.getPosition().top, this.getPosition().left);
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
    }
  });

  if (setCount === 0) {
    marios.forEach(function(mario) {
      mario.resetGroupJump();
    });
  }
};

makeSuperMarioDancer.prototype.resetJump = function() {
  this.jump = false;
};

makeSuperMarioDancer.prototype.resetGroupJump = function() {
  this.hasJumped = false;
};






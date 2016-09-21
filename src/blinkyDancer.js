var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);

  this.$node.addClass('blinky');
  this.$node.addClass('rotation-continuous');
  this.spun = false;

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

makeBlinkyDancer.prototype.startDancing = function() {
  makeDancer.prototype.startDancing.call(this);
  this.dropClass();
  this.addRotationCont();
};

makeBlinkyDancer.prototype.groupDance = function(timeDelay, maxDistance) {
  if (this.isDancing()) {
    return;
  }
  this.dropClass();
  this.addRotation();
  this.setPosition(this.getPosition().top, this.getPosition().left);
  var stars = window.dancers.filter(function(dancer) {
    return dancer.constructor === makeBlinkyDancer;
  });

  this.spun = true;
  var currStar = this;
  var setCount = 0;
  stars.forEach(function(star) {
    var distance = Math.sqrt(Math.pow((currStar.top - star.top), 2) + Math.pow((currStar.left - star.left), 2));
    if (distance < maxDistance && !star.spun) {
      setTimeout(star.groupDance.bind(star, timeDelay, maxDistance), timeDelay / 3);
      setCount++;
    }
  });

  if (setCount === 0) {
    stars.forEach(function(star) {
      star.spun = false;
    });
  }
};

makeBlinkyDancer.prototype.addRotation = function() {
  this.$node.addClass('rotation');
};

makeBlinkyDancer.prototype.addRotationCont = function() {
  this.$node.addClass('rotation-continuous');
};

makeBlinkyDancer.prototype.dropClass = function() {
  this.$node.removeClass('rotation-continuous');
  this.$node.removeClass('rotation');
};

makeBlinkyDancer.prototype.lineUp = function(top, left, time) {
  makeDancer.prototype.lineUp.call(this, top, left, time);
  this.dropClass();
};






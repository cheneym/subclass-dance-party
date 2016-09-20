$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * 1 / 6 + ($('body').height() * 4 / 6) * Math.random(),
      $('body').width() * 1 / 6 + ($('body').width() * 4 / 6) * Math.random(),
      Math.random() * 1500 + 500
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $('.lineUpButton').on('click', function(event) {
    // window.dancers.forEach(function(dancer) {
    //   dancer.left = 500;
    //   dancer.top = 500;
    //   dancer.$node.animate({left: 500, top: 500}, 1000);
    // });
    var marioSpot = {
      top: $('body').height() / 2,
      left: $('body').width() * 1 / 6
    };
    var somersaultSpot = {
      top: $('body').height() / 4,
      left: $('body').width() * 1 / 6
    };
    var blinkySpot = {
      top: $('body').height() * 3 / 4,
      left: $('body').width() * 1 / 6
    };
    
    window.dancers.forEach(function(dancer) {
      var time = 1000;
      if (dancer.constructor === makeSuperMarioDancer) {
        dancer.lineUp(marioSpot.top, marioSpot.left, time);
        marioSpot.left += 100;
      } else if (dancer.constructor === makeSomersaultDancer) {
        dancer.lineUp(somersaultSpot.top, somersaultSpot.left, time);
        somersaultSpot.left += 100;
      } else {
        dancer.lineUp(blinkySpot.top, blinkySpot.left, time);
        blinkySpot.left += 100;
      }
    });
  });

  $('.startDanceButton').on('click', function(event) {
    window.dancers.forEach(function(dancer) {
      if (!dancer.dance) {
        dancer.startDancing();
      }
    });
  });

  $('body').on('mouseover', '.somersault', function(event) {
    var node = this;
    window.dancers.forEach(function(dancer) {
      if (dancer.$node.get(0) === node) {
        dancer.stopDancing();
      }
    });
  });

  $('body').on('mouseleave', '.somersault', function(event) {
    var node = this;
    window.dancers.forEach(function(dancer) {
      if (dancer.$node.get(0) === node) {
        dancer.continueDancing();
      }
    });
  });

  $('.groupDance').on('click', function(event) {
    for (var i = 0; i < dancers.length; i++) {
      if (dancers[i].constructor === makeSuperMarioDancer) {
        dancers[i].groupDance(100, 1000, 150);
        console.log('Found 1 mario');
        break;
      }
    }
  });

});


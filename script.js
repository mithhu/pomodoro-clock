$(document).ready(function() {
  //music
  var audio = new Audio(),
    i = 0;
var playlist = new Array('http://res.cloudinary.com/dqhjydoyb/video/upload/v1513531957/Noble_Oak_-_Hold_gtiekb.mp3');
  /*------*/
  var counter, startBreak;
  $("#start").click(function() {
    audio.addEventListener('ended', function () {
    i = ++i < playlist.length ? i : 0;
    console.log(i)
    audio.src = playlist[i];
    audio.play();
    audio.currentTime = 0;
    }, true);
    audio.volume = 0.3;
    audio.loop = true;
    audio.src = playlist[0];
    audio.play();
    $("#stroke").addClass('stroke');
    //    clear old interval
    clearInterval(counter);
    clearInterval(startBreak);

    var workT = parseInt($("#workT").html());
    var breakT = parseInt($("#breakT").html());

    workT *= 60;

    if (workT % 60 >= 10) {
      $("#timer").html(Math.floor(workT / 60) + ":" + workT % 60);
    } else {
      $("#timer").html(Math.floor(workT / 60) + ":" + "0" + workT % 60);
    }

    counter = setInterval(timer, 1000);

    function timer() {
      workT -= 1;

      if (workT === 0) {
        $("#stroke").removeClass('stroke');
        $("#stroke").addClass('strokes');
        audio.pause();
        audio.currentTime = 0;
        clearInterval(counter);
        startBreak = setInterval(breakTimer, 1000);
        breakT *= 60;

        if (breakT % 60 >= 10) {
          $("#timer").html(Math.floor(breakT / 60) + ":" + breakT % 60);
        } else {
          $("#timer").html(Math.floor(breakT / 60) + ":" + "0" + breakT % 60);
        }
      } else if (workT % 60 >= 10) {
        $("#timer").html(Math.floor(workT / 60) + ":" + workT % 60);
      } else {
        $("#timer").html(Math.floor(workT / 60) + ":" + "0" + workT % 60);
      }

      function breakTimer() {
        breakT -= 1;
        if (breakT === 0) {
          
          $("#stroke").removeClass('strokes');
          clearInterval(startBreak);
          $("#timer").html("00:00");
        } else if (breakT % 60 >= 10) {
          $("#timer").html(Math.floor(breakT / 60) + ":" + breakT % 60);
        } else {
          $("#timer").html(Math.floor(breakT / 60) + ":" + "0" + breakT % 60);
        }
      }
    }
  });

  $("#reset").click(function() {
    audio.pause();
    audio.currentTime = 0;
    $("#stroke").removeClass('stroke');
    $("#breakT").html("5");
    $("#workT").html("25");
    $("#timer").html("25:00");
    clearInterval(counter);
    clearInterval(startBreak);
  });

  $("#lessBreak").on("click", function() {
    var breakT = parseInt($("#breakT").html());

    if (breakT > 5) {
      breakT -= 1;
    }

    $("#breakT").html(breakT);
  });

  $("#moreBreak").on("click", function() {
    var breakT = parseInt($("#breakT").html());
    if (breakT < 30) {
      breakT += 1;
    }
    // breakT += 1;
    $('#breakT').html(breakT);
  });

  $("#lessWork").on("click", function() {
    var workT = parseInt($("#workT").html());
    if (workT > 25) {
      $("#timer").html(workT-5 + ":00");
      workT -= 5;
    }
    $("#workT").html(workT);
  });

  $("#moreWork").on("click", function() {
    var workT = parseInt($("#workT").html());
    if (workT < 60) {
    $("#timer").html(workT+5 + ":00");
    workT += 5;
    }
    $("#workT").html(workT);
  });
});

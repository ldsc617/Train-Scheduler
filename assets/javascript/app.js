//Firebase stuff

var config = {
    apiKey: "AIzaSyB3a-ngcH-ifMaaHCJoRAR2l5j5ZMnfsg8",
    authDomain: "train-scheduler-dedca.firebaseapp.com",
    databaseURL: "https://train-scheduler-dedca.firebaseio.com",
    projectId: "train-scheduler-dedca",
    storageBucket: "train-scheduler-dedca.appspot.com",
    messagingSenderId: "916429112960"
    
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  //Butts

  $("#add-train-btn").on("click", function(e) {
    e.preventDefault();
  
    var trainName = $("#train-name-input").val().trim(),
        destination = $("#destination-input").val().trim(),
        startTrain = moment($("#start-train-input").val().trim(), "HH:mm").format("HH:mm");
        frequency = $("#frequency-rate-input").val().trim(),
        
        newTrain = {
            name: trainName,
            destination: destination, 
            firstTrain: startTrain,
            frequency: frequency
          };

//DB shtuff

database.ref().push(newTrain);

//For Forms

$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-train-input").val("");
$("#frequency-rate-input").val("");

}); 

database.ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());
  
    var trainName = childSnapShot.val().name,
        destination = childSnapShot.val().destination,
        startTrain = childSnapShot.val().firstTrain,
        frequency = childSnapShot.val().frequency;
  
    var convertedTime = moment(startTrain, "HH:mm").subtract(1, "years"),
        diffTime = moment().diff(moment(convertedTime), "minutes"),
        timeRemain = diffTime % frequency,
        minAway = frequency - timeRemain,
        nextTrain = moment().add(minAway, "minutes").format("HH:mm");             
        console.log(convertedTime);
        console.log(diffTime);
        console.log(timeRemain);
        console.log(minAway);
        
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minAway)
    );
  
    $("#train-table > tbody").append(newRow);
});
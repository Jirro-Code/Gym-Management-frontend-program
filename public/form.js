import { Workout } from "./workout.js";

const form = document.querySelector(".form");
const workoutTypeChoices2 = document.querySelector(".workoutTypeChoices2");
const workoutTypeChoices = document.querySelector(".workoutTypeChoices");
const form1 = document.getElementById("form1");
const form3 = document.getElementById("form3");
const mainSubmit = document.getElementById("mainSubmit");
const form1Submit = document.getElementById("form1Submit");
const close = document.getElementById("close");
const downButton = document.getElementById("downButton");
const upButton = document.getElementById("upButton");
const downButton2 = document.getElementById("downButton2");
const upButton2 = document.getElementById("upButton2");
const curtain = document.getElementById("curtain");
let selectedWorkout = "";

//shows the main form and receives the values and throws it to the Workout class
export function formSubmit(workoutList, calendar) {
  //open form function
  form.classList.add("visible");
  curtain.classList.add("visible");
  //close form using close button function
  close.onclick = function () {
    form.classList.remove("visible");
    curtain.classList.remove("visible");
  };
  //close form using curtain function
  curtain.onclick = function () {
    form.classList.remove("visible");
    curtain.classList.remove("visible");
  };

  //up and down buttons that opens and closes the workout choices
  downButton.onclick = function (e) {
    e.preventDefault();
    workoutTypeChoices.classList.add("visible");
    upButton.classList.add("visible");
    downButton.classList.add("invisible");
  };
  upButton.onclick = function (e) {
    e.preventDefault();
    workoutTypeChoices.classList.remove("visible");
    upButton.classList.remove("visible");
    downButton.classList.remove("invisible");
  };
  downButton2.onclick = function (e) {
    e.preventDefault();
    workoutTypeChoices2.classList.add("visible");
    upButton2.classList.add("visible");
    downButton2.classList.add("invisible");
  };
  upButton2.onclick = function (e) {
    e.preventDefault();
    workoutTypeChoices2.classList.remove("visible");
    upButton2.classList.remove("visible");
    downButton2.classList.remove("invisible");
  };

  //workout type form submition
  form1Submit.onclick = function (e) {
    e.preventDefault();
    workoutTypeChoices.classList.remove("visible");
    upButton.classList.remove("visible");
    downButton.classList.remove("invisible");
    let workoutType = document.querySelector(
      'input[name="workoutType"]:checked',
    ).value;

    //switch condition on which workout to show on the second choixes box
    switch (workoutType) {
      case "Chest":
        workoutTypeChoices2.replaceChildren();
        const chestForm = `
        <input type="radio" name="chestType" value="Incline Chest Press">
        <label>Incline Chest Press</label><br>
        <input type="radio" name="chestType" value="Decline Chest Press">
        <label>Decline Chest Press</label><br>
        <input type="radio" name="chestType" value="Flat Chest Press">
        <label>Flat Chest Press</label><br>
        <input type="radio" name="chestType" value="Pec Deck Fly">
        <label>Pec Deck Fly</label><br>
        <input type="radio" name="chestType" value="Low-to-High Cable Crossover">
        <label>Low-to-High Cable Crossover</label><br>  
        <input type="submit" id="chestSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, chestForm);
        const chestSubmit = document.getElementById("chestSubmit");
        chestSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.querySelector(
            'input[name="chestType"]:checked',
          ).value;
          workoutInput.textContent = selectedWorkout;
        };
        break;

      case "Back":
        workoutTypeChoices2.replaceChildren();
        const backForm = `
        <input type="radio" name="backType" value="Lat Pulldown">
        <label>Lat Pulldown</label><br>
        <input type="radio" name="backType" value="Bent Over Barbell Row">
        <label>Bent Over Barbell Row</label><br>
        <input type="radio" name="backType" value="Single Arm Dumbbell Row">
        <label>Single Arm Dumbbell Row</label><br>
        <input type="radio" name="backType" value="Seated Cable Row">
        <label>Seated Cable Row</label><br>
        <input type="radio" name="backType" value="Machine Row">
        <label>Machine Row</label><br>  
        <input type="submit" id="backSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, backForm);
        const backSubmit = document.getElementById("backSubmit");
        backSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.querySelector(
            'input[name="backType"]:checked',
          ).value;
          workoutInput.textContent = selectedWorkout;
        };
        break;

      case "Shoulders":
        workoutTypeChoices2.replaceChildren();
        const shoulderForm = `
        <input type="radio" name="shoulderType" value="Overhead Press">
        <label>Overhead Press</label><br>
        <input type="radio" name="shoulderType" value="Lateral Raise">
        <label>Lateral Raise</label><br>
        <input type="radio" name="shoulderType" value="Reverse Pec Deck Fly">
        <label>Reverse Pec Deck Fly</label><br>
        <input type="radio" name="shoulderType" value="Face Pull">
        <label>Face Pull</label><br>
        <input type="radio" name="shoulderType" value="Dumbbell Shoulder Press">
        <label>Dumbbell Shoulder Press</label><br>  
        <input type="submit" id="shoulderSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, shoulderForm);
        const shoulderSubmit = document.getElementById("shoulderSubmit");
        shoulderSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.querySelector(
            'input[name="shoulderType"]:checked',
          ).value;
          workoutInput.textContent = selectedWorkout;
        };
        break;

      case "Arms":
        workoutTypeChoices2.replaceChildren();
        const armForm = `
        <input type="radio" name="armType" value="Barbell Curl">
        <label>Barbell Curl</label><br>
        <input type="radio" name="armType" value="Tricep Dips">
        <label>Tricep Dips</label><br>
        <input type="radio" name="armType" value="Dumbbell Curl">
        <label>Dumbbell Curl</label><br>
        <input type="radio" name="armType" value="Rope Pushdown">
        <label>Rope Pushdown</label><br>
        <input type="radio" name="armType" value="Hammer Curl">
        <label>Hammer Curl</label><br>  
        <input type="submit" id="armSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, armForm);
        const armSubmit = document.getElementById("armSubmit");
        armSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.querySelector(
            'input[name="armType"]:checked',
          ).value;
          workoutInput.textContent = selectedWorkout;
        };
        break;

      case "Legs":
        workoutTypeChoices2.replaceChildren();
        const legForm = `
        <input type="radio" name="legType" value="Back Squat">
        <label>Back Squat</label><br>
        <input type="radio" name="legType" value="Leg Press">
        <label>Leg Press</label><br>
        <input type="radio" name="legType" value="Leg Curl">
        <label>Leg Curl</label><br>
        <input type="radio" name="legType" value="Leg Extension">
        <label>Leg Extension</label><br>
        <input type="radio" name="legType" value="Calf Raise">
        <label>Calf Raise</label><br>  
        <input type="submit" id="legSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, legForm);
        const legSubmit = document.getElementById("legSubmit");
        legSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.querySelector(
            'input[name="legType"]:checked',
          ).value;
          workoutInput.textContent = selectedWorkout;
        };
        break;

      case "Custom":
        workoutTypeChoices2.replaceChildren();
        const customForm = `
          <label>Custom Workout</label><br>
          <input type="textbox" id="customWorkout">
          <input type="submit" id="customSubmit">`;
        workoutTypeChoices2.insertAdjacentHTML(`beforeend`, customForm);
        const customSubmit = document.getElementById("customSubmit");
        customSubmit.onclick = function (e) {
          e.preventDefault();
          workoutTypeChoices2.classList.remove("visible");
          upButton2.classList.remove("visible");
          downButton2.classList.remove("invisible");
          let workoutInput = document.getElementById("workout");
          selectedWorkout = document.getElementById("customWorkout").value;
          workoutInput.textContent = selectedWorkout;
        };
        break;
    }
  };

  //submit the values and pushes it to the Workout class function
  mainSubmit.onclick = () => {
    //close form function
    form.classList.remove("visible");
    curtain.classList.remove("visible");
    //receives the form values
    let sets = document.getElementById("sets").value;
    let reps = document.getElementById("reps").value;
    let weight = document.getElementById("weight").value;
    let weightUnit = document.querySelector(
      'input[name="weightUnit"]:checked',
    ).value;
    let date = new Date(document.getElementById("date").value);
    const workoutValue = selectedWorkout;
    //pushes the form values to the Workout class and adds a new card to the history section
    workoutList.push(
      new Workout(workoutValue, sets, reps, date, weight, weightUnit),
    );
    workoutList[workoutList.length - 1].addNewCard();
    let workoutInput = document.getElementById("workout");
    workoutInput.textContent = ``;

    form1.reset();
    selectedWorkout = "";
    workoutTypeChoices2.replaceChildren(`Choose a workout type first`);
    form3.reset();
    calendar.renderCalendar();
    return workoutList;
  };
}

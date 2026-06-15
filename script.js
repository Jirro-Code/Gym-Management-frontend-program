const form = document.querySelector(".form");
const workoutTypeChoices2 = document.querySelector(".workoutTypeChoices2");
const workoutHistory = document.querySelector(".workoutHistory");
const popUpContainer = document.querySelector(".popUpContainer");
const workoutTypeChoices = document.querySelector(".workoutTypeChoices");
const form1 = document.getElementById("form1");
const form3 = document.getElementById("form3");
const mainSubmit = document.getElementById("mainSubmit");
const form1Submit = document.getElementById("form1Submit");
const enter = document.getElementById("enter");
const close = document.getElementById("close");
const downButton = document.getElementById("downButton");
const upButton = document.getElementById("upButton");
const downButton2 = document.getElementById("downButton2");
const upButton2 = document.getElementById("upButton2");
const closeHistory = document.getElementById("closeHistory");
const showData = document.getElementById("showData");
const curtain = document.getElementById("curtain");
const monthYearCalendar = document.getElementById("monthYear");
const daysCalendar = document.getElementById("days");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
let totalWorkouts = 0;
let workoutList = [];
let selectedWorkout = "";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
class Calendar {
  constructor() {
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
  }
  renderCalendar() {
    monthYearCalendar.innerHTML = `
      <h1>${months[this.month]}     ${this.year}</h1>`;
    //removes the previous days
    daysCalendar.innerHTML = "";
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("button");
      // align days to the correct day of the week
      if (i === 1) dayElement.style.gridColumnStart = firstDay + 1;
      dayElement.innerHTML = `<span class="day-number">${i}</span>`;
      ``;
      daysCalendar.appendChild(dayElement);
      if (
        i === new Date().getDate() &&
        this.month === new Date().getMonth() &&
        this.year === new Date().getFullYear()
      ) {
        dayElement.classList.add("today");
      }
      for (let j = 0; j < workoutList.length; j++) {
        const workout = workoutList[j];
        if (
          i === workout.date.getDate() &&
          this.month === workout.date.getMonth() &&
          this.year === workout.date.getFullYear()
        ) {
          dayElement.classList.add("workoutDayRecorded");
          dayElement.dataset.date = workout.date.toISOString();
        }
      }
    }
  }
}

class Workout {
  constructor(workout, sets, reps, date, weight, weightUnit) {
    this.id = crypto.randomUUID();
    this.set("workout", workout);
    this.set("sets", sets);
    this.set("reps", reps);
    this.set("date", date);
    this.set("weight", weight);
    this.set("weightUnit", weightUnit);
  }
  // validation and throws an error once the user input invalid value
  set(variable, value) {
    if (variable === "workout" || variable === "weightUnit") {
      if (value === "" || !isNaN(value)) {
        throw new Error(`Input Error at workout ${variable}!!`);
      }
    } else if (variable === "sets" || variable === "reps") {
      if (value === "" || isNaN(value)) {
        throw new Error(`Input Error at ${variable} section!!`);
      }
    } else if (variable === "date") {
      if (
        value === "" ||
        (!(value instanceof Date) && isNaN(Date.parse(value))) ||
        (value instanceof Date && isNaN(value.getTime()))
      ) {
        throw new Error("Invalid Date Input!!");
      }
      this.date = value instanceof Date ? value : new Date(value);
      return;
    }
    this[variable] = value;
  }
  get(variable) {
    return this[variable];
  }
  //Card output function
  addNewCard() {
    const wordDate = new Date(this.date);
    const workoutCards = workoutHistory.querySelectorAll(".workoutCard");
    const workoutCardNumber = this.id;
    let isAdded = false;
    //checks if there is an existing card in the history and if there are zero card, system will make one
    if (workoutHistory && workoutCards.length > 0) {
      workoutCards.forEach((card) => {
        const cardDate = card.dataset.date;
        //checks if the card has the same date, if it is, the system will just add the new card to the existing card
        if (
          new Date(card.dataset.date).toDateString() ===
          this.date.toDateString()
        ) {
          const additionalWorkout = `
          <div card-number=${this.id}>
            <p><strong>${this.workout}</strong></p>
            <p>${this.sets} sets</p>
            <p>${this.reps} reps</p>
            <p>${this.weight} ${this.weightUnit}</p>
          </div>`;
          const mainCard = document.querySelector(".mainCard");
          mainCard.insertAdjacentHTML("beforeend", additionalWorkout);
          isAdded = true;
        }
      });
    } else if (!isAdded) {
      const newCard = document.createElement("div");
      newCard.classList.add("workoutCard");
      newCard.dataset.date = this.date.toDateString();
      newCard.id = `workoutCard${this.id}`;
      newCard.innerHTML = `
      <div class="mainCard" data-date="${this.date.toDateString()}">
        <h2>${months[wordDate.getMonth()]} ${wordDate.getDate()}, ${wordDate.getFullYear()}</h2>
        <h3>${days[wordDate.getDay()]}</h3>
        <div card-number=${this.id}>
          <p><strong>${this.workout}</strong></p>
          <p>${this.sets} sets</p>
          <p>${this.reps} reps</p>
          <p>${this.weight} ${this.weightUnit}</p>
        </div>
      </div>`;
      workoutHistory.prepend(newCard);
    }
  }
  popUpCard(workoutId) {
    this.workoutId = workoutId;
    curtain.onclick = function () {
      popUpContainer.classList.remove("visible");
      curtain.classList.remove("visible");
    };
    const wordDate = new Date(this.date);
    const popUpCardHTML = `
      <div class="popUpCard" data-number=${this.workoutId}>
        <h2>${months[wordDate.getMonth()]} ${wordDate.getDate()}, ${wordDate.getFullYear()}</h2>
        <h3>${days[wordDate.getDay()]}</h3>
        <p><strong>${this.workout}</strong></p>
        <p>${this.sets} sets</p>
        <p>${this.reps} reps</p>
        <p>${this.weight} ${this.weightUnit}</p>
        <button class="deleteWorkoutButton" data-id=${this.workoutId}>Delete</button>
      </div>
    `;
    popUpContainer.insertAdjacentHTML("beforeend", popUpCardHTML);
    const targetPopUpToDelete = document.querySelector(
      `[data-number="${this.workoutId}"]`,
    );
    const targetWorkoutInsideCard = document.querySelector(
      `[card-number="${this.workoutId}"]`,
    );
    const targetCardToDelete = document.querySelector(
      `[data-date="${this.date.toDateString()}"]`,
    );
    const deleteWorkoutButton = targetPopUpToDelete.querySelector(
      ".deleteWorkoutButton",
    );
    deleteWorkoutButton.onclick = () => {
      targetPopUpToDelete.remove();
      targetWorkoutInsideCard.remove();
      const workoutIndex = workoutList.findIndex(
        (workout) => workout.id === this.workoutId,
      );
      if (workoutIndex !== -1) {
        workoutList.splice(workoutIndex, 1);
      }
      const workoutsLeft =
        targetCardToDelete.querySelectorAll("[card-number]").length;
      if (workoutsLeft === 0) {
        targetCardToDelete.remove();
        calendar.renderCalendar();
      }
    };
  }
}

//shows the calendar when the page loads
const calendar = new Calendar();
calendar.renderCalendar();

// makes the dayElement clickable which shows the pop up workout card
daysCalendar.addEventListener("click", function (event) {
  // Check if click target is inside a button
  const button = event.target.closest("button");
  if (!button) return;
  // If it has workout record, show the popup
  if (button.classList.contains("workoutDayRecorded") && button.dataset.date) {
    popUpContainer.replaceChildren(``);
    for (let i = 0; i < workoutList.length; i++) {
      const workout = workoutList[i];
      if (
        new Date(button.dataset.date).toDateString() ===
        workout.date.toDateString()
      ) {
        curtain.classList.add("visible");
        popUpContainer.classList.add("visible");
        workout.popUpCard(workout.id);
        continue;
      }
    }
  }
});
//functions for navigating between months
//prev month function
prevMonth.onclick = function () {
  calendar.month--;
  if (calendar.month < 0) {
    calendar.month = 11;
    calendar.year--;
  }
  calendar.renderCalendar();
};
//next month function
nextMonth.onclick = function () {
  calendar.month++;
  if (calendar.month > 11) {
    calendar.month = 0;
    calendar.year++;
  }
  calendar.renderCalendar();
};

//close and open history function
showData.onclick = function () {
  //open history function
  workoutHistory.classList.add("visible");
  closeHistory.classList.add("visible");
  curtain.classList.add("visible");
  //close history using curtain function
  curtain.onclick = function () {
    workoutHistory.classList.remove("visible");
    closeHistory.classList.remove("visible");
    curtain.classList.remove("visible");
  };
  //close history function
  closeHistory.onclick = function () {
    workoutHistory.classList.remove("visible");
    closeHistory.classList.remove("visible");
    curtain.classList.remove("visible");
  };
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

//shows the main form and receives the values and throws it to the Workout class
enter.onclick = function () {
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
  mainSubmit.onclick = function () {
    totalWorkouts++;
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
  };
};

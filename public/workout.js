const workoutHistory = document.querySelector(".workoutHistory");
const popUpContainer = document.querySelector(".popUpContainer");
const curtain = document.getElementById("curtain");
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

export class Workout {
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
          return;
        }
      });
    }

    if (!isAdded) {
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
      return;
    }
  }

  popUpCard(workoutId, workoutList) {
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
        curtain.classList.remove("visible");
        popUpContainer.classList.remove("visible");
        targetCardToDelete.remove();
      }
      return;
    };
    return;
  }
}

export function showHistory() {
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
}

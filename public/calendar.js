const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const monthYearCalendar = document.getElementById("monthYear");
const daysCalendar = document.getElementById("days");
const popUpContainer = document.querySelector(".popUpContainer");

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

export class Calendar {
  constructor(workoutList) {
    this.workoutList = workoutList;
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.initEvents();
  }

  //initializes the this.month and this.year variables when navigating
  initEvents() {
    prevMonth.onclick = () => {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      this.renderCalendar();
      return;
    };

    nextMonth.onclick = () => {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      this.renderCalendar();
      return;
    };
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
      daysCalendar.appendChild(dayElement);

      if (
        i === new Date().getDate() &&
        this.month === new Date().getMonth() &&
        this.year === new Date().getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      for (let j = 0; j < this.workoutList.length; j++) {
        const workout = this.workoutList[j];

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

    // makes the dayElement clickable which shows the pop up workout card
    daysCalendar.addEventListener("click", (event) => {
      // Check if click target is inside a button
      const button = event.target.closest("button");
      if (!button) return;
      // If it has workout record, show the popup
      if (
        button.classList.contains("workoutDayRecorded") &&
        button.dataset.date
      ) {
        popUpContainer.replaceChildren(``);
        for (let i = 0; i < this.workoutList.length; i++) {
          const workout = this.workoutList[i];
          if (
            new Date(button.dataset.date).toDateString() ===
            workout.date.toDateString()
          ) {
            curtain.classList.add("visible");
            popUpContainer.classList.add("visible");
            workout.popUpCard(workout.id, this.workoutList);
            continue;
          }
        }
      }
    });
  }
}

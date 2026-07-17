import { Calendar } from "./calendar.js";
import { Workout, showHistory } from "./workout.js";
import { workoutList } from "./workoutList.js";
import * as Form from "./form.js";

const enter = document.getElementById("enter");
const historyBtn = document.getElementById("historyBtn");

//shows the calendar when the page loads
const calendar = new Calendar(workoutList);
calendar.renderCalendar();
console.log("workoutList in script.js", workoutList);

//close and open history function
historyBtn.onclick = function () {
  showHistory();
};

enter.onclick = (e) => {
  e.preventDefault();
  Form.formSubmit(workoutList, calendar);
};

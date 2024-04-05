// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $('#project-form');
const projectNameInputEl = $('#project-name-input');
const projectDateInputEl = $('#taskDueDate');
const projectTypeInputEl = $("#message-text");


// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
projectFormEl.on('submit', handleProjectFormSubmit);

// ? Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();
  console.log('Entrou aqui');

  // ? Read user input from the form
  const projectName = projectNameInputEl.val().trim();
  const projectType = projectTypeInputEl.val(); // don't need to trim select input
  const projectDate = projectDateInputEl.val(); // yyyy-mm-dd format
 

  const newProject = {
  // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    name: projectName,
    type: projectType,
    dueDate: projectDate,
    status: 'to-do',
  };
}

$('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });






















// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


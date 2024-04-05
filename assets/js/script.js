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
  const projectType = projectTypeInputEl.val(); 
  const projectDate = projectDateInputEl.val(); 
 
  const newProject = {
  // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    name: projectName,
    type: projectType,
    dueDate: projectDate,
    status: 'to-do',
  };

    // ? Pull the projects from localStorage and push the new project to the array
    const projects = readProjectsFromStorage();
    projects.push(newProject);
  
    // ? Save the updated projects array to localStorage
    saveProjectsToStorage(projects);
  
    // ? Print project data back to the screen
    printProjectData();
  
    // ? Clear the form inputs
    projectNameInputEl.val('');
    projectTypeInputEl.val('');
    projectDateInputEl.val('');
  
}

function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}


// ? Reads projects from local storage and returns array of project objects.
// ? If there are no projects in localStorage, it initializes an empty array ([]) and returns it.
function readProjectsFromStorage() {
  console.log('Entrou aqui agora');

  // ? Retrieve projects from localStorage and parse the JSON to an array.
  // ? We use `let` here because there is a chance that there are no projects in localStorage (which means the projects variable will be equal to `null`) and we will need it to be initialized to an empty array.
  let projects = JSON.parse(localStorage.getItem('projects'));

  // ? If no projects were retrieved from localStorage, assign projects to a new empty array to push to later.
  if (!projects) {
    projects = [];
  }

  // ? Return the projects array either empty or with data in it whichever it was determined to be by the logic right above.
  return projects;
}


//Data Picker for due date task
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


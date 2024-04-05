// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $('#project-form');
const projectNameInputEl = $('#project-name-input');
const projectDateInputEl = $('#taskDueDate');
const projectTypeInputEl = $("#message-text");


function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}


// ? Reads projects from local storage and returns array of project objects.
// ? If there are no projects in localStorage, it initializes an empty array ([]) and returns it.
function readProjectsFromStorage() {
  
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

// ? Creates a project card from the information passed in `project` parameter and returns it.
function createProjectCard(project) {
  console.log("entrou aqui createProjectCard");
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', project.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(project.type);
  const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteProject);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}

function printProjectData() {
  const projects = readProjectsFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // ? Loop through projects and create project cards for each status
  for (let project of projects) {
    if (project.status === 'to-do') {
      todoList.append(createProjectCard(project));
    } else if (project.status === 'in-progress') {
      inProgressList.append(createProjectCard(project));
    } else if (project.status === 'done') {
      doneList.append(createProjectCard(project));
    }
  }

  // ? Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// ? Removes a project from local storage and prints the project data back to the page
function handleDeleteProject() {
  const projectId = $(this).attr('data-project-id');
  const projects = readProjectsFromStorage();

  // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  projects.forEach((project) => {
    if (project.id === projectId) {
      projects.splice(projects.indexOf(project), 1);
    }
  });

  // ? We will use our helper function to save the projects to localStorage
  saveProjectsToStorage(projects);

  // ? Here we use our other function to print projects back to the screen
  printProjectData();
}

// ? Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();

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

// ? This function is called when a card is dropped into a lane. It updates the status of the project and saves it to localStorage. You can see this function is called in the `droppable` method below.
function handleDrop(event, ui) {
  // ? Read projects from localStorage
  const projects = readProjectsFromStorage();

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.projectId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let project of projects) {
    // ? Find the project card by the `id` and update the project status.
    if (project.id === taskId) {
      project.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('projects', JSON.stringify(projects));
  printProjectData();
}


// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
projectFormEl.on('submit', handleProjectFormSubmit);

// // ? Call the `displayTime` function once on page load and then every second after that.
// displayTime();
// setInterval(displayTime, 1000);

// // ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
// $(document).ready(function () {
//   // ? Print project data to the screen on page load if there is any
//   printProjectData();

//   $('#taskDueDate').datepicker({
//     changeMonth: true,
//     changeYear: true,
//   });

//   // ? Make lanes droppable
//   $('.lane').droppable({
//     accept: '.draggable',
//     drop: handleDrop,
//   });
// });


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


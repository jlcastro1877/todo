GIVEN a task board to manage a project
WHEN I open the task board
You can see a button to add task and if you already have tasks in progress or done you will be able to see them.
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
Each column has the titles making easy for the user to identify each task status 
WHEN I view the task board for the project
You will be able to identify by date and status each tasks
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
The application is showing yellow for nearing the deadline (yellow), overdue (red) and done white.
WHEN I click on the button to define a new task
A form is pop up and the user can create a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
There are Title, date and task description
WHEN I click the save button for that task
It store all data in the localstorage retrieve the data when the form close and creating a new task
THEN the properties for that task are saved in localStorage
and retrieve to the bord task
WHEN I drag a task to a different progress column
Each task obey the command and go to the specific column 
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
The task is delete right away and will not be retrieve and the task board is loaded again
THEN the task is removed from the task board and will not be added back after refreshing

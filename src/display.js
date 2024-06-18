import {retrieveStoredProjects, 
    getWorkingProject, 
    setWorkingProject, 
    setWorkingTask, 
    deleteTask,
    createEmptyActiveTask,
    getWorkingTask,
    deleteProject,  
    updateWorkingTask
} from './projects.js'; 

const ProjectsListElement = document.getElementById("projects");
const ProjectNameElement = document.getElementById("projectName");
const taskCardsElement = document.getElementById("taskCards");
const workSpaceElement = document.getElementById("workSpace");

const updateDisplay = () => {
    cleanProjectList(); 
    cleanTaskCards();
    clearWorkingSpace();   
    populateProjectList(retrieveStoredProjects()); 
    console.log("getWorkingProject"); 
    console.log(getWorkingProject()); 
    populateTaskCards(getWorkingProject());
    updateProjectName(); 
}

function updateProjectName(){
    ProjectNameElement.textContent = getWorkingProject().name; 

    let deleteProjectButtonElement = document.createElement("button"); 
    deleteProjectButtonElement.textContent = "Delete project"; 
    deleteProjectButtonElement.addEventListener('click', ()=> {
        deleteProject();
        updateDisplay(); 
    });
    ProjectNameElement.appendChild(deleteProjectButtonElement);
}

function populateProjectList (projects){
    for (let i = 0; i<projects.length; i++){
        let listItem = document.createElement("li");
        listItem.textContent = projects[i].name; 
        listItem.addEventListener('click', () => {
            setWorkingProject(projects[i]);   
            updateDisplay(); 
        })
        ProjectsListElement.appendChild(listItem); 
    } 
}

function populateTaskCards(project){
    for (let i=0; i<project.projectTasks.length; i++){
        let taskCardElement = document.createElement("ul"); 

        addTaskValue(project.projectTasks[i], 'taskName', taskCardElement); 
        addTaskValue(project.projectTasks[i], 'dueDate', taskCardElement); 
        addTaskValue(project.projectTasks[i], 'priorityRate', taskCardElement); 
        let editButtonElement = document.createElement("button"); 
        editButtonElement.textContent = "edit"; 
        editButtonElement.addEventListener('click', ()=> {
            setWorkingTask(project.projectTasks[i]); 
            updateWorkingSpace();
        });
        taskCardElement.appendChild(editButtonElement);

        let deleteButtonElement = document.createElement("button"); 
        deleteButtonElement.textContent = "Delete"; 
        deleteButtonElement.addEventListener('click', ()=> {
            deleteTask(project.projectTasks[i]);
            updateDisplay(); 
        });
        taskCardElement.appendChild(deleteButtonElement);

        taskCardsElement.appendChild(taskCardElement); 
    }
}

function addTaskValue (task, property, cardElement){
    let listItem = document.createElement("li");
    listItem.textContent = task[[property]]; 
    cardElement.appendChild(listItem);
}

function updateWorkingSpace() {
    clearWorkingSpace(); 
    const elements = [];

    const taskNameField = createLabel('Task Name: ');
    taskNameField.appendChild(createInput('text', 'taskNameInput', getWorkingTask().taskName));
    elements.push(taskNameField);

    const taskDescriptionField = createLabel('Task Description: ');
    taskDescriptionField.appendChild(createInput('text', 'taskDescriptionInput', getWorkingTask().taskDescription));
    elements.push(taskDescriptionField);

    const dueDateField = createLabel('Due Date: ');
    dueDateField.appendChild(createInput('date', 'dueDateInput', getWorkingTask().dueDate));
    elements.push(dueDateField);

    const priorityRateField = createLabel('Level of priority: ');
    const priorityRateSelect = createSelect('priorityRateSelect', ['High', 'Middle', 'Low']);
    priorityRateField.appendChild(priorityRateSelect);
    elements.push(priorityRateField);

    const saveButton = document.createElement('button'); 
    saveButton.textContent = "Save"; 
    saveButton.type = "submit";  
    elements.push(saveButton); 

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation(); 
        updateWorkingTask(getFieldTaskValues()); 

        function getFieldTaskValues() {
            const taskNameInput = document.querySelector('input[name="taskNameInput"]');
            const taskDescriptionInput = document.querySelector('input[name="taskDescriptionInput"]');
            const dueDateInput = document.querySelector('input[name="dueDateInput"]');
            const priorityRateSelect = document.querySelector('select[name="priorityRateSelect"]');
  
            const fieldTaskValues = {
                taskName: taskNameInput.value,
                taskDescription: taskDescriptionInput.value,
                dueDate: dueDateInput.value,
                priorityRate: priorityRateSelect.value
            };
            return fieldTaskValues;
        }
        updateDisplay(); 
    };

    const workSpaceElement = document.getElementById('workSpace');
    workSpaceElement.addEventListener('submit', handleSubmit);

    appendElementsToWorkspace(elements);
}  

function createLabel(text) {
    const label = document.createElement('label');
    label.textContent = text;
    return label;
}

function createInput(type, name, value) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;
    return input;
}

function createOptionElement(value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    return option;
}

function createSelect(name, options) {
    const select = document.createElement('select');
    select.name = name;
    options.forEach(optionValue => {
        const optionElement = createOptionElement(optionValue);
        select.appendChild(optionElement);
    });
    return select;
}

function appendElementsToWorkspace(elements) {
    const workSpaceElement = document.getElementById('workSpace'); // Ensure this element exists
    elements.forEach(element => {
        workSpaceElement.appendChild(element);
    });
}


function clearWorkingSpace() {
    while (workSpaceElement.firstChild) {
        workSpaceElement.removeChild(workSpaceElement.firstChild);
    }
}


function addTheAddTaskCard(){
    const addTaskCardElement = document.createElement('button'); 
    addTaskCardElement.textContent = "+"; 
    addTaskCardElement.addEventListener('click', ()=>{
        createEmptyActiveTask();   
        updateWorkingSpace();  
    })
    taskCardsElement.appendChild(addTaskCardElement); 
}

function cleanTaskCards(){
    while(taskCardsElement.firstChild){
        taskCardsElement.removeChild(taskCardsElement.firstChild)
    }
    addTheAddTaskCard(); 
}

function cleanProjectList(){ 
    while(ProjectsListElement.firstChild){
        ProjectsListElement.removeChild(ProjectsListElement.firstChild); 
    }
}



export {updateDisplay}; 

/*
original function written by me without chatgpt 

function updateWorkingSpace(task){
    const taskNameFieldElement = document.createElement("label");
    const taskNameFieldLabelText = document.createTextNode('Task Name : ');
    taskNameFieldElement.appendChild(taskNameFieldLabelText);
    const taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.name = 'taskNameInput';
    taskNameInput.value = task.taskName ; 
    taskNameFieldElement.appendChild(taskNameInput);
    workSpaceElement.appendChild(taskNameFieldElement); 

    const taskDescriptionFieldElement = document.createElement("label");
    const taskDescriptionFieldLabelText = document.createTextNode('Task Description : ');
    taskDescriptionFieldElement.appendChild(taskDescriptionFieldLabelText);
    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.type = 'text';
    taskDescriptionInput.name = 'taskNameInput';
    taskDescriptionInput.value = task.taskDescription ; 
    taskDescriptionFieldElement.appendChild(taskDescriptionInput);
    workSpaceElement.appendChild(taskDescriptionFieldElement); 

    const dueDateFieldElement = document.createElement("label");
    const dueDateFieldLabelText = document.createTextNode('Due Date : ');
    dueDateFieldElement.appendChild(dueDateFieldLabelText);
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'dueDateInput';
    dueDateInput.value = task.dueDate; 
    dueDateFieldElement.appendChild(dueDateInput);
    workSpaceElement.appendChild(dueDateFieldElement); 

    
    const priorityRateElement = document.createElement("label"); 
    const priorityRateLabelText = document.createTextNode('Level of priority :'); 
    priorityRateElement.appendChild(priorityRateLabelText); 
    const priorityRateSelect = document.createElement('select'); 
    priorityRateSelect.name = 'priorityRateSelect'; 
    const PriorityLevelOptions =['High', 'Middle', 'Low']; 
    PriorityLevelOptions.forEach(optionValue => {
        const optionElement = createOptionElement(optionValue);
        priorityRateSelect.appendChild(optionElement);
    });
    priorityRateElement.appendChild(priorityRateSelect); 
    workSpaceElement.appendChild(priorityRateElement); 
    



    function createOptionElement(value) {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.textContent = value;
        return optionElement;
    }
}

*/

  /*
    const saveButton = document.createElement('button'); 
    saveButton.textContent = "Save"; 
    saveButton.type = "submit";  
    elements.push(saveButton); 
    
    workSpaceElement.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation(); 
        console.log(task.taskName); 
        if(task.taskName == ""){
            console.log("creating a new task with save button"); 
            saveWorkingTaskInWorkingProjectAnsdStoredProjects();
        } else {
            console.log("updating a task with save button"); 
            upDateWorkingTaskInWorkingProjectAndStoredProjects(task); 
        }

        updateDisplay(); 
    });
    */

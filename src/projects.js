import { format} from "date-fns";

class Project {
    constructor(name, projectTasks){
        this.name = name; 
        this.projectTasks = projectTasks; 
    }
}

class Task {
    constructor(
        projectName, 
        taskName, 
        taskDescription, 
        dueDate,
        priorityRate
        ) {
        this.projectName = projectName; 
        this.taskName = taskName; 
        this.taskDescription = taskDescription; 
        this.dueDate = dueDate;
        this.priorityRate = priorityRate; 
    } 
}

var projects = []; 
const DefaultProject = new Project("Main", []);
const DefaultProject1 = new Project("Main1", []);
const DefaultTask = new Task ("Main", "First Task", "This is the default task initialized", format(new Date(2022, 0, 22), "yyyy-MM-dd"), "Low"); 
const DefaultTask1 = new Task ("Main", "seconde Task", "This is the default task initialized", format(new Date(2022, 0, 24), "yyyy-MM-dd"), "High"); 

var workingProject = new Project(); 

const initializeProjects = () => { 
    addTaskToProject(DefaultTask, DefaultProject); 
    addTaskToProject(DefaultTask1, DefaultProject); 
    addTaskToProject(DefaultTask, DefaultProject1); 
    addTaskToProject(DefaultTask1, DefaultProject1); 
    saveProject(DefaultProject); 
    saveProject(DefaultProject1); 

    storeProjects();  
    setWorkingProject(DefaultProject); 
}
const getWorkingProject = () => {
    return workingProject; 
}
const setWorkingProject = (project) =>{
    workingProject = project; 
}

function retrieveStoredProjects(){
    return JSON.parse(localStorage.getItem("StoredProjects"));
}

function storeProjects() {
    localStorage.setItem("StoredProjects", JSON.stringify(projects));
}

function addTaskToProject(task, project){
    project.projectTasks.push(task); 
}

function saveProject(project){
    projects.push(project); 
}


export {initializeProjects, retrieveStoredProjects, getWorkingProject, setWorkingProject}; 
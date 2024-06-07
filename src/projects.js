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
        priorityRate, 
        checkListItensNames, 
        checkListItensStatus
        ) {
        this.projectName = projectName; 
        this.taskName = taskName; 
        this.taskDescription = taskDescription; 
        this.dueDate = dueDate;
        this.priorityRate = priorityRate; 
        this.checkListItensNames = checkListItensNames;
        this.checkListItensStatus = checkListItensStatus; 
    } 
}

const Projects = []; 
const DefaultProject = new Project("Main", []);
const DefaultTask = new Task ("Main", "First Task", "This is the default task initialized", format(new Date(2014, 1, 11), "dd/MM/yyyy"), "High", ["item1", "item2", "item3"], [false, true, false]); 
    
const initializeProjects = () => { 
    addTaskToProject(DefaultTask, DefaultProject); 
    saveProject(DefaultProject); 
    storeProjects();  
    console.log(retrieveStoredProjects() == Projects); 
}

function retrieveStoredProjects(){
    return localStorage.getItem("StoredProjects");
}

function storeProjects() {
    localStorage.setItem("StoredProjects", Projects);
}

function addTaskToProject(task, project){
    project.projectTasks.push(task); 
}

function saveProject(project){
    Projects.push(project); 
}


export default initializeProjects; 
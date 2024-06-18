import { format} from "date-fns";

const createUniqueID = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

class Project {
    constructor(name, projectTasks){
        this.name = name; 
        this.projectTasks = projectTasks; 
        this.id = createUniqueID(); 
        this.isActive = false; 
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
        this.id = createUniqueID(); 
        this.isActive = false; 
    } 
}

const ProjectMain = new Project("Main", []);
const ProjectMain1 = new Project("Main1", []);
const DefaultTask = new Task ("Main", "First Task", "This is the default task initialized", format(new Date(2022, 0, 22), "yyyy-MM-dd"), "Low"); 
const DefaultTask1 = new Task ("Main1", "seconde Task", "This is the default task initialized", format(new Date(2022, 0, 24), "yyyy-MM-dd"), "High"); 
 

const initializeProjects = () => { 

    clearStoredProjects(); 
    saveProject(ProjectMain); 
    saveProject(ProjectMain1);
    addTaskToProject(DefaultTask, ProjectMain); 
    addTaskToProject(DefaultTask1, ProjectMain1); 
    setWorkingProject(ProjectMain1);
    setWorkingTask(DefaultTask); 
}

function clearStoredProjects(){
    storeLocal([]); 
}


const setWorkingProject = (project) =>{ 
    unactiveAllProjects(); 
    let bufferProjects =  retrieveStoredProjects(); 
    bufferProjects.forEach( proj => { 
        if( proj.id === project.id){
            proj.isActive = true; 

        }
    });
    storeLocal(bufferProjects);  
}

function unactiveAllProjects(){
    let bufferProjects =  retrieveStoredProjects(); 
    bufferProjects.forEach( proj => {
        proj.isActive = false; 
    });
    storeLocal(bufferProjects);
}

const setWorkingTask = (task) => {
    unactiveAllTasks(); 
    let bufferProjects = retrieveStoredProjects(); 
    bufferProjects.forEach( proj =>{
        if(proj.isActive === true){
            proj.projectTasks.forEach(projectTask =>{
                if(projectTask.id == task.id){
                    projectTask.isActive = true;
                }
            })
        }
    })
    storeLocal(bufferProjects); 
}

function unactiveAllTasks(){
    let bufferProjects = retrieveStoredProjects();
    const activeProject = bufferProjects.find(proj => proj.isActive === true); 
    if(activeProject){
        for(let i=0; i<activeProject.projectTasks.length; i++){ 
            activeProject.projectTasks[i].isActive = false; 
        }
    }
    storeLocal(bufferProjects); 
}





const getWorkingProject = () =>{
    let bufferProjects = retrieveStoredProjects();
    return bufferProjects.find(proj => proj.isActive === true);
}

const getWorkingTask = () => {
    let bufferProjects = retrieveStoredProjects();
    const activeProject = bufferProjects.find(proj => proj.isActive === true);
    if (activeProject) {
        return activeProject.projectTasks.find(task => task.isActive === true);
    }
    return null; 
}

const getEmptyTask = () => {
    return new Task("", "", "", "", "High"); 
}
 
const updateWorkingTask = (fieldTaskValues) => {
    let bufferProjects = retrieveStoredProjects(); 
    bufferProjects.forEach( proj =>{
        if(proj.isActive === true){
            proj.projectTasks.forEach(projectTask =>{
                if(projectTask.isActive == true){
                    projectTask.taskName = fieldTaskValues.taskName; 
                    projectTask.taskDescription = fieldTaskValues.taskDescription; 
                    projectTask.dueDate = fieldTaskValues.dueDate; 
                    projectTask.priorityRate = fieldTaskValues.priorityRate; 
                }
            })
        }
    })
    storeLocal(bufferProjects); 
}

function retrieveStoredProjects(){
    return JSON.parse(localStorage.getItem("StoredProjects"));
}

function storeLocal(projects){
    localStorage.setItem("StoredProjects", JSON.stringify(projects));
}

function addTaskToProject(task, project){
    let bufferProjects =  retrieveStoredProjects(); 
    bufferProjects.forEach( proj => {
        if( proj.id === project.id){
            proj.projectTasks.push(task); 
        }
    });
    storeLocal(bufferProjects); 
}

function saveProject(project){
    let bufferProjects = retrieveStoredProjects(); 
    bufferProjects.push(project);
    storeLocal(bufferProjects);  
}

const createEmptyActiveTask = () =>{
    let emptyTask = new Task(getWorkingProject().name, "brandNEw", "let's write"); 
    addTaskToProject(emptyTask, getWorkingProject()); 
    setWorkingTask(emptyTask); 
}

const deleteTask = (task) => {
    let bufferProjects = retrieveStoredProjects();
    bufferProjects.forEach(proj => {
        proj.projectTasks = proj.projectTasks.filter(projTask => projTask.id !== task.id);
    });
    storeLocal(bufferProjects);
}

const deleteProject = () => {
    let bufferProjects = retrieveStoredProjects(); 
    const activeProject = getWorkingProject(); 
    bufferProjects = bufferProjects.filter(proj => proj.id !== activeProject.id);
    storeLocal(bufferProjects);
    setWorkingProject(bufferProjects[0]); 
    console.log(getWorkingProject());
}

/*
const deleteProject = () =>{
    let bufferProjects = retrieveStoredProjects(); 
    bufferProjects.forEach(proj => {
        if(proj.id == getWorkingProject().id){

        }
    })
    
    storeLocal(bufferProjects); 
}

*/


export {
    initializeProjects, 
    retrieveStoredProjects, 
    getWorkingProject, 
    setWorkingProject, 
    setWorkingTask, 
    getEmptyTask, 
    deleteTask,
    deleteProject,
    getWorkingTask, 
    updateWorkingTask, 
    createEmptyActiveTask
}; 
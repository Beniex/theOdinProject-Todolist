const initializeProjects = () => {
    const DefaultTask = new Task ("Main", "First Task", "This is the default task initialized", dueDate, "High", ["item1", "item2", "item3"], [false, true, false]); 
    
}
class Task {
    constructor() {
        this.projectName = projectName; 
        this.taskName = taskName; 
        this.taskDescription = taskDescription; 
        this.dueDate = dueDate;
        this.priorityRate = priorityRate; 
        this.checkListItensNames = checkListItensNames;
        this.checkListItensStatus = checkListItensStatus; 
    } 
}

export default initializeProjects; 
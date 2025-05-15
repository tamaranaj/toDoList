const htmlElements = {
  addTaskButton: document.getElementById("button-addon2"),
  addTaskInput: document.getElementById("input"),
  todosList: document.getElementById("todosList"),
  errorAdd: document.getElementById("errorAdd"),
  deleteTaskButton: document.getElementsByClassName("deleteBtn"),
  filters: document.getElementById('selectInput'),
  ascBtn: document.getElementById('asc'),
  descBtn: document.getElementById('desc')
};

let testingTasks = [
  {id: 1, title: "Wash the dishes", status: 'new task', createdAt: 
    'Wed May 12 2025 17:45:41 GMT+0200 (Central European Summer Time)'},

  {id:2, title:"Go in the park with friends", status: 'in progress', createdAt: 
   'Wed May 13 2025 17:45:41 GMT+0200 (Central European Summer Time)',  },
    {id:3, title:"Write homework", status: 'done', createdAt: 
      'Wed May 14 2025 17:45:41 GMT+0200 (Central European Summer Time)',  }
]
const displayTasksService = {
  tasks: ["Wash the dishes", "Go in the park with friends", "Write homework"],
  setTasksLC: (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasksService.displayTasks(tasks);
  },
  getTasksLC: () => {
    return JSON.parse(localStorage.getItem("tasks"));
  },
  displayTasks: (tasks) => {
    htmlElements.todosList.innerHTML = "";
    
    
    htmlElements.todosList.innerHTML = ""
    for (let index = 0; index < tasks.length; index++) {
      let newElement = `
                <tr class="rowItems">
                    <td class="listItem" >${tasks[index].title}</td>
                
               <td>${tasks[index].status}</td>
                <td>${new Date(tasks[index].createdAt).toDateString()}</td>
               <td>
                    <button type="button" data-item= ${tasks[index].id} class="btn btn-outline-danger deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708"/>
</svg></button>
                    </td>                
                   
                    
                </tr>

            `;

            htmlElements.todosList.innerHTML +=newElement
    }

    displayTasksService.deleteButtonsEvent();
    sortingService.ascEvent(tasks)
    sortingService.descEvent(tasks)
  },
  deleteButtonsEvent: () => {
    for (let i = 0; i < htmlElements.deleteTaskButton.length; i++) {
      htmlElements.deleteTaskButton[i].addEventListener("click", () => {
        let taskId =
          htmlElements.deleteTaskButton[i].getAttribute("data-item");
          console.log('taskIndex',taskId)
        let newTasks = displayTasksService
          .getTasksLC()
          .filter((item) => item.id != taskId);
  
        displayTasksService.setTasksLC(newTasks);
      });
    }
  },
  addTaskEvent: () => {
    htmlElements.addTaskButton.addEventListener("click", () => {
      let newTaskTitle = htmlElements.addTaskInput.value;
      if (!newTaskTitle || newTaskTitle === "") {
        htmlElements.errorAdd.innerText = "Enter task.";
        return;
      }

      let newTask = {
        id:displayTasksService.getTasksLC().length +1,
        title: newTaskTitle,
        status: "new task",
        createdAt: new Date()
      }
      
      let newTasks = [...displayTasksService.getTasksLC(), newTask];
      htmlElements.addTaskInput.value = "";
      displayTasksService.setTasksLC(newTasks);
    });
  },

  filtersEvent: ()=>{
    htmlElements.filters.addEventListener('change', ()=>{
      let filterValue = htmlElements.filters.value
      console.log('filters',filterValue)
      let tasks =  displayTasksService.getTasksLC()
      let taskToDisplay
    if(filterValue==='done'){
      taskToDisplay =tasks.filter(i=>i.status === 'done')
      console.log('done', taskToDisplay)
    }else if(filterValue==='in progress'){
      taskToDisplay = tasks.filter(i=>i.status === 'in progress')
      console.log('in progress', taskToDisplay)
    }else if(filterValue==='new task'){
      taskToDisplay = tasks.filter(i=>i.status === 'new task')
      console.log('in progress', taskToDisplay)
    }else{
      taskToDisplay=[...tasks]
    }
      displayTasksService.displayTasks(taskToDisplay)
    })
  },

  
  
};


const sortingService={
  ascEvent: (tasks)=>{
    htmlElements.ascBtn.addEventListener('click', ()=>{
      
      let sorted =tasks.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))
      displayTasksService.displayTasks(sorted)
      
    })
    
  },
  descEvent:(tasks)=>{
    htmlElements.descBtn.addEventListener('click', ()=>{
      let sorted =tasks.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
      displayTasksService.displayTasks(sorted)
    })
  }
}

displayTasksService.setTasksLC(testingTasks);
displayTasksService.addTaskEvent();
displayTasksService.filtersEvent()
sortingService.ascEvent(testingTasks)

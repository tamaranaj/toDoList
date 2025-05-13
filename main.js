const htmlElements = {
  addTaskButton: document.getElementById("button-addon2"),
  addTaskInput: document.getElementById("input"),
  todosList: document.getElementById("todosList"),
  errorAdd: document.getElementById("errorAdd"),
  deleteTaskButton: document.getElementsByClassName("deleteBtn"),
};
const displayTasksService = {
  tasks: ["Wash the dishes", "Go in the park with friends", "Write homework"],
  setTasksLC: (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasksService.displayTasks();
  },
  getTasksLC: () => {
    return JSON.parse(localStorage.getItem("tasks"));
  },
  displayTasks: () => {
    htmlElements.todosList.innerHTML = "";
    let tasks = displayTasksService.getTasksLC();
    for (let index = 0; index < tasks.length; index++) {
      let newElement = `
                <div class="rowItems">
                    <p class="listItem" >${tasks[index]}</p>
                    
                
                    <button type="button" data-item= ${index} class="btn btn-outline-danger deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708"/>
</svg></button>
                </div>
                
            `;

      htmlElements.todosList.innerHTML += newElement;
    }

    displayTasksService.deleteButtonsEvent();
  },
  deleteButtonsEvent: () => {
    for (let i = 0; i < htmlElements.deleteTaskButton.length; i++) {
      htmlElements.deleteTaskButton[i].addEventListener("click", () => {
        let taskIndex =
          htmlElements.deleteTaskButton[i].getAttribute("data-item");
        let newTasks = displayTasksService
          .getTasksLC()
          .filter((item, index) => {
            return item[index] !== item[taskIndex];
          });
        displayTasksService.setTasksLC(newTasks);
      });
    }
  },
  addTaskEvent: () => {
    htmlElements.addTaskButton.addEventListener("click", () => {
      let newAddedTask = htmlElements.addTaskInput.value;
      if (!newAddedTask || newAddedTask === "") {
        htmlElements.errorAdd.innerText = "Enter task.";
        return;
      }

      let newTasks = [...displayTasksService.getTasksLC(), newAddedTask];
      htmlElements.addTaskInput.value = "";
      displayTasksService.setTasksLC(newTasks);

      console.log(test);
    });
  },
};

displayTasksService.setTasksLC(displayTasksService.tasks);

displayTasksService.addTaskEvent();

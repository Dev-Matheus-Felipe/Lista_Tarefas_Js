package com.ToDoListBackEnd.ToDoList.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ToDoListBackEnd.ToDoList.Entitys.Task;
import com.ToDoListBackEnd.ToDoList.Entitys.TaskDTO;
import com.ToDoListBackEnd.ToDoList.Repositorys.TaskRepository;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173/")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;
    
    @GetMapping
    public List<Task> showTasks (){
        return taskRepository.findAll();
    }

    @PostMapping    
    public List<Task> addTask(@RequestBody TaskDTO taskDTO){
        taskRepository.save(new Task(taskDTO.name(), false));
        return showTasks();
    }

    @DeleteMapping
    public List<Task> deleteTask(@RequestBody  TaskDTO taskDTO){
        taskRepository.deleteById(taskDTO.id());
        return showTasks();
    }

    @PutMapping
    public List<Task> changeTask(@RequestBody TaskDTO taskDTO){
        Task singleTask = taskRepository.findById(taskDTO.id())
        .orElseThrow();

        singleTask.setComplet(taskDTO.complet());

        if( singleTask.getName() != taskDTO.name() ){
            singleTask.setName(taskDTO.name());
        }

        taskRepository.save(singleTask);
        return showTasks();
    }
}

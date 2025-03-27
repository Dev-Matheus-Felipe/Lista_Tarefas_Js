package com.ToDoListBackEnd.ToDoList.Repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ToDoListBackEnd.ToDoList.Entitys.Task;

@Repository
public interface TaskRepository  extends JpaRepository<Task, Long> {
    
}

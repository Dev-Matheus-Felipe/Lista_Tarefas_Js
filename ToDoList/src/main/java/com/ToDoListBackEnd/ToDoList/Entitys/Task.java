package com.ToDoListBackEnd.ToDoList.Entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private long id;

    private String name;
    private boolean complet;

    public Task (String name, boolean complet ){
        this.name = name;
        this.complet =  complet;
    }
}





var button_adicionar_tarefa = document.querySelector('#button_adicionar_tarefa');
var button_editar_tarefas = document.querySelector('#button_editar_tarefas');
var selector = document.querySelector('#selector');
var tarefas_container = document.querySelector('.tarefas');
var indice_tarefa_editada = 0;

var tarefasArray = [];
var arrayFilter = [];
var indiceTarefa = 0;

var button_pesquisar_tarefa = document.querySelector('#button_pesquisar_tarefa');



/* ----------------------------------- EVENTOS  ----------------------------------- */

button_adicionar_tarefa.addEventListener('click',(e)=>{
    e.preventDefault();

    let input_adicionar_tarefa = document.querySelector('#texto_adicionar_tarefa').value;
    if(input_adicionar_tarefa === ''){
        alert('Insira uma tarefa válida!');
        return;
    }

    tarefasArray.push({name: input_adicionar_tarefa, check: false,indice: indiceTarefa});
    indiceTarefa++;

    document.querySelector('#texto_adicionar_tarefa').value = '';
    
    exibir_tarefas(tarefasArray);
})

button_pesquisar_tarefa.addEventListener('click',(e)=>{
    e.preventDefault();
    let input_pesquisar_tarefa = document.querySelector('#input_pesquisar_tarefa').value;
    arrayFilter = tarefasArray.filter(item => item.name.includes(input_pesquisar_tarefa));
    exibir_tarefas(arrayFilter);
})


button_editar_tarefas.addEventListener('click',(e)=>{
    let input_editar_tarefas = document.querySelector('#input_editar_tarefas').value;
    let modal = document.querySelector('.editar_tarefas');
    let tarefas = document.querySelector('.tarefas');

    modal.style.display = 'none';
    tarefas.style.display = 'block';
    e.preventDefault();

    tarefasArray.map((e)=>{
        if(e.indice === indice_tarefa_editada){
            e.name = input_editar_tarefas;
        }
    })

    if(arrayFilter.length > 0){
        arrayFilter.map((e)=>{
            if(e.indice === indice_tarefa_editada){
                e.name = input_editar_tarefas;
            }
        })
    }

    exibir_tarefas( arrayFilter.length > 0 ? arrayFilter : tarefasArray);
})

selector.addEventListener('change',(e)=>{
    e.preventDefault();
    let valores = e.target.value;
    
    if(valores === 'todos'){
        exibir_tarefas( arrayFilter.length > 0 ? arrayFilter : tarefasArray);

        
    }else if(valores === 'afazer'){
        if(arrayFilter.length > 0){
            let arrayFilter2 = arrayFilter.filter(item => item.check === false);
            exibir_tarefas(arrayFilter2);
        }else{
            let arrayFilter2 = tarefasArray.filter(item => item.check === false);
            exibir_tarefas(arrayFilter2);
        }
    }else{
        if(arrayFilter.length > 0){
            let arrayFilter2 = arrayFilter.filter(item => item.check === true);
            exibir_tarefas(arrayFilter2);
        }else{
            let arrayFilter2 = tarefasArray.filter(item => item.check === true);
            exibir_tarefas(arrayFilter2);
        }
    }
})



/* ----------------------------------- FUNÇÕES  ----------------------------------- */

function exibir_tarefas(tarefas){
    tarefas_container.innerHTML = '';

    tarefas.map((e)=>{
        if(e.check === true){
            tarefas_container.innerHTML += `
            <div class="tarefa_single check" id='${e.indice}'>
                <p>${e.name}</p>
                <div class="buttons">
                    <button onclick="checkTarefa(${e.indice})" id="checkTarefa"><i class="fa-solid fa-check"></i></button>
                    <button onclick="editarTarefa(${e.indice},'${e.name}')" id="editTarefa"><i class="fa-solid fa-pencil"></i></button>
                    <button onclick="remove(${e.indice})" id="removeTarefa"><i class="fa-solid fa-xmark" ></i></button>
                </div>
            </div>`;
        }else{
            tarefas_container.innerHTML += `
            <div class="tarefa_single" id='${e.indice}'>
                <p>${e.name}</p>
                <div class="buttons">
                    <button onclick="checkTarefa(${e.indice})" id="checkTarefa"><i class="fa-solid fa-check"></i></button>
                    <button onclick="editarTarefa(${e.indice},'${e.name}')" id="editTarefa"><i class="fa-solid fa-pencil"></i></button>
                    <button onclick="remove(${e.indice})" id="removeTarefa"><i class="fa-solid fa-xmark" ></i></button>
                </div>
            </div>`;
        }
        
    })
}


function checkTarefa(indicee){
    
    tarefasArray.map((e)=>{
        if(e.indice === indicee){
            e.check === false ? e.check = true : e.check = false;
        }
    })
   
    
    exibir_tarefas( arrayFilter.length > 0 ? arrayFilter : tarefasArray);
}

function remove(indicee){
    
    tarefasArray.map((e)=>{
        if(e.indice === indicee){
            tarefasArray =  tarefasArray.filter(item => item.indice !== indicee);
        }
    })

    if(arrayFilter.length > 0){
        arrayFilter.map((e)=>{
            if(e.indice === indicee){
                arrayFilter =  arrayFilter.filter(item => item.indice !== indicee);
            }
        })
    }


    exibir_tarefas( arrayFilter.length > 0 ? arrayFilter : tarefasArray);
}



function editarTarefa(indice,nome){
    let modal = document.querySelector('.editar_tarefas');
    let input_editar_tarefas = document.querySelector('#input_editar_tarefas');
    let tarefas = document.querySelector('.tarefas');

    modal.style.display = 'block';
    tarefas.style.display = 'none';
    input_editar_tarefas.value = nome;
    indice_tarefa_editada = indice;
}



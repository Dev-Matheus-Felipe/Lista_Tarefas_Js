import { useEffect, useReducer, useState  } from 'react'
import './App.css'
import Api, { Tarefa } from './api/api'
import Tarefas from './tarefas/tarefas'

type Send = {
  method: string,
  id? : number,
  e? : any
}

type InitialStatus = {
  newTask : string,
  filtro: 'todos' | boolean,
  search : string,
  screen: boolean,
  tarefas: Tarefa[]
}

const initialStatus : InitialStatus = {
  newTask: '',
  filtro : 'todos',
  search: '',
  screen: false,

  tarefas : []

}

const changeReducer = (status : InitialStatus, action : any  ) => {
  switch(action.type){
    case 'newTask':
      return {...status, newTask: action.value };
    
    case 'filtro':
      return {...status, filtro: action.value};

    case 'search':
      return {...status, search: action.value};
      
    case 'screen':
      return {...status, screen: action.value};

    case 'tarefa':
      return {...status, tarefas: action.value}

    default:
      return status;
  }
}

export default function App() {

  const [ changeSingleTask, setChangeSingleTask ] = useState<Tarefa>();
  const [ status, dispath ] = useReducer(changeReducer, initialStatus);


  // ------------------------------------------------------------------------------- //

  async function changeTask(send : Send) : Promise<void> {
    if(send.e) send.e.preventDefault();

    let singleTask : Tarefa  | undefined;

    if(send.method == 'POST'){
      singleTask = { name: status.newTask, complet: false, id: status.tarefas.length };
      dispath({type: 'newTask', value: '' });

    }else if(send.method == 'PUT' || send.method == 'DELETE'){
      singleTask = status.tarefas[send.id!];
      if(singleTask) singleTask.complet = !singleTask.complet;

    }
    
    dispath({type: 'tarefa', value: await Api({method: send.method, body: singleTask})});
  }

  // ------------------------------------------------------------------------------- //

  async function edit_task(e : any) : Promise<void> {
    e.preventDefault();


    if(changeSingleTask?.name !== '' && changeSingleTask){
      dispath({type: 'tarefa', value: await Api({method: 'PUT', body: changeSingleTask })});
      dispath({type: 'screen', value: false });
      setChangeSingleTask(undefined);
    }

  }


  // ------------------------------------------------------------------------------- //


  useEffect(()=>{
    async function showTasks(){ dispath({type: 'tarefa', value: await Api({method: 'GET'})}) }
    showTasks();
  },[])

  return (
   <>
    <video className='background' autoPlay loop muted>
      <source  src="/background.mp4" type="video/mp4" />
    </video>  

    <div className="flex">
    <div className="toDo">
        <h1>Lista de tarefas</h1>
        <div className="container">

          <div className="adicionar_tarefa">
            <h2>Adicione sua tarefa</h2>
            <form  >
                <input 
                type="text" 
                id="texto_adicionar_tarefa"  
                placeholder="O que você vai fazer?" 
                value = {status.newTask}
                onChange={(e) =>  dispath({type: 'newTask', value: e.target.value })
              }

                />

                <button id="button_adicionar_tarefa" onClick={(e)=>{if(status.newTask.match(/[a-z]/gi)) changeTask({method: 'POST', e: e}) }} >+</button>
            </form>
          </div>
    
          <div className="d-flex">
            <div className="pesquisa">
                <h2>Pesquisar</h2>
                <form>
                    <input id='input_pesquisar_tarefa' 
                    type="text"  
                    placeholder="Buscar..."
                    value={status.search}
                    onChange={(e) =>  dispath({type: 'search', value: e.target.value }) } 
                    />
                   
                </form>
            </div>
    
            <div className="filtrar">
                <h2>Filtrar:</h2>
                <select 
                id="selector" 
                value={status.filtro}
                onChange={(e)=> dispath({type: 'filtro', value: e.target.value })}
                >
                    <option value="todos">Todos</option>
                    <option value="feitos">Feitos</option>
                    <option value="afazer">A fazer</option>

                </select>
            </div>
          </div>

          <div className="tarefas">
            {
              (status.screen)

              ? 
              <div className="edit_task">
                <form onSubmit={(e)=> edit_task(e)} >
                  <input type='text' name="text"  value={changeSingleTask!.name} onChange =  {

                    (e) => setChangeSingleTask(prev =>{
                      if(prev){ return {...prev, name: e.target.value } }
                    } )
                    } />

                  <input type='submit' value="EDITAR" />
                </form>
              </div>

              : <Tarefas
                status={status}
                dispath={dispath} 
                changeTask={changeTask} 
                setChangeSingleTask={setChangeSingleTask}/>
            } 
          </div>

        </div>
      </div>
    </div>
   </>

  )
}

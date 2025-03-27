import { Tarefa } from "../api/api";


export default function tarefa({status, dispath, setChangeSingleTask, changeTask} : any){

    let filtro : boolean;
    if(status.filtro == 'aFazer') filtro = false
    else if(status.filtro == 'feitos') filtro = true

    const pesquisaValue = status.tarefas.filter((e: Tarefa) => 
        e.name.toLowerCase().includes(status.search.toLowerCase()) &&
        (status.filtro === "todos" || e.complet == filtro)
      );

    return(
        <>
            {
              pesquisaValue.map((e : Tarefa, index : number) => (
                <div className={"tarefa " +  (e.complet ?  "completed" : "pedding") } key={e.name + index} >
                  <p>{e.name}</p>
                  <div className="icones">
                    <i className="fas fa-pencil-alt"  onClick={()=>{
                      setChangeSingleTask({name: e.name, complet: e.complet, id: e.id});
                      dispath({type:'screen', value: true});
                    } } ></i>
                    <i className="fas fa-times" onClick={()=> changeTask({method: 'DELETE', id: index})}></i>
                    <i className="fas fa-check" onClick={()=> changeTask({method: 'PUT', id: index})} ></i>
                  </div>
                </div>
              )) 

              
            } 
        </>
    )
}
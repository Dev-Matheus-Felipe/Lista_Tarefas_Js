export type Tarefa = {
    name: string,
    complet: boolean
    id: number 
}

type Call = {
    method: string,
    body?: Tarefa
}

type Infos = {
    method: string,
    headers:  { 'Content-Type': 'application/json' },
    body?: string 
}

export default async function Api(call: Call) {
    let infos: Infos = {
        method: call.method,
        headers: { 'Content-Type': 'application/json' }
    }

    if(call.body){
        infos = {...infos, body: JSON.stringify(call.body)};
    }

    return fetch('http://localhost:8080/', infos).then(res => res.json());
     
}

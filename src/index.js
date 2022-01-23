import React from 'react';
import ReactDOM from 'react-dom';
// import ItemlList from './components/ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    togglecompleted = () => {
        console.log("togglecompleted: " + this.props.task.id);
    }
    clone = () => {
        this.props.cloneTask(this.props.task)
    }
    edit = () => {
        this.props.editTask(this.props.task);
    }
    delete = () => {
        this.props.deleteTask(this.props.task)
    }
    sendEditTask=()=>{
        this.props.rewriteTask(this.props.task, document.getElementById('input__editTask').value);
    }
    render=()=>{
        if(this.props.task.editing!=true){
            return (
                <div className='task__element d-flex p-3 justify-content-between'>
                    <div onMouseUp={this.togglecompleted}>
                        {this.props.task.content}
                    </div>
                    <div>
                        <button onMouseUp={this.clone}>clone</button>
                        <button onMouseUp={this.edit}>edit</button>
                        <button onMouseUp={this.delete}>delete</button>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='task__element d-flex p-3 justify-content-between'>
                    <div className="input-group">
                        <input type="text" id="input__editTask" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                        <button className="btn btn-outline-secondary" onClick={this.sendEditTask} type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            )
        }
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    newtask=()=>{
        const content=document.getElementById("input__newtask").value;
        document.getElementById("input__newtask").value="";
        if(content!=""){
            this.props.createNewTask(content);
        }
    }

    createTasks(tasks) {
        const taskToRender = [];
        for (let i = 0; i < tasks.length; i++) {
            taskToRender.push(<Task key={i} task={tasks[i]} rewriteTask={this.props.rewriteTask} editTask={this.props.editTask} deleteTask={this.props.deleteTask} cloneTask={this.props.cloneTask}></Task>);
        }
        return taskToRender;
    }

    render() {
        const status = 'Next player: X';
        return (
            <div className="container">
                <h1 className="">TodoList</h1>
                <div className="input-group mb-3">
                    <input type="text" id="input__newtask" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    <button className="btn btn-outline-secondary" onClick={this.newtask} type="button" id="button-addon2">Button</button>
                </div>
                {this.createTasks(this.props.tasks)}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        // this.setState() renderizza nuovamente il documento
        // se modifico solo la variabile invece il componente non viene reinderizzato
        this.state = {
            nextId: 7,
            alReadyEditing:false,
            tasks: [{
                id: 1,
                todo: true,
                editing: false,
                content: "primo task della giornata"
            },
            {
                id: 2,
                todo: true,
                editing: false,
                content: "secondo task della giornata"
            },
            {
                id: 3,
                todo: true,
                editing: false,
                content: "terzo task della giornata"
            },
            {
                id: 4,
                todo: true,
                editing: false,
                content: "quarto task della giornata"
            },
            {
                id: 5,
                todo: true,
                editing: false,
                content: "quinto task della giornata"
            },
            {
                id: 6,
                todo: true,
                editing: false,
                content: "sesto task della giornata"
            }]
        };
    }
    createNewTask=(content)=>{
        console.log('ok');
        const task={
            id: this.state.nextId,
            todo: true,
            editing: false,
            content: content
        };
        const tasks=(this.state.tasks.slice());
        tasks.push(task);
        this.setState(
            {
                nextId:this.state.nextId+1,
                tasks:tasks
            }
        );
    }
    cloneTask=(taskTarget)=>{
        const task={...taskTarget};
        task.id=this.state.nextId;
        const tasks=(this.state.tasks.slice());
        tasks.push(task);
        console.log(tasks);
        this.setState(
            {
                nextId:this.state.nextId+1,
                tasks:tasks
            }
        );
    }
    editTask=(task)=>{
        if(this.state.alReadyEditing==false){
            const tasks=this.state.tasks.slice();
            for(let i=0;i<tasks.length;i++){
                if(task.id==tasks[i].id){
                    tasks[i].editing=true;
                    this.setState({
                        tasks:tasks,
                        alReadyEditing:true
                    });
                    return;
                }
            }
        }
    }
    deleteTask=(taskTarget)=>{
        const tasks=this.state.tasks.slice();
        for(let i=0;i<tasks.length;i++){
            if(taskTarget.id==tasks[i].id){
                tasks.splice(i,1);
                this.setState({
                    tasks:tasks
                });
                return;
            }
        }
    }
    rewriteTask=(taskTarget,content)=>{
        const tasks=this.state.tasks.slice();
        const task={...taskTarget};
        task.content=content;
        task.editing=false;
        for(let i=0;i<tasks.length;i++){
            if(taskTarget.id==tasks[i].id){
                tasks.splice(i,1,task);
                this.setState({
                    tasks:tasks,
                    alReadyEditing:false
                });
                return;
            }
        }
        console.log('shouldrewrite'+content);
    }
    render() {
        return (
            <div className="container-fluid">
                <TodoList tasks={this.state.tasks} nextId={this.state.nextId} rewriteTask={this.rewriteTask} editTask={this.editTask} deleteTask={this.deleteTask} cloneTask={this.cloneTask} createNewTask={this.createNewTask}></TodoList>
                <div className="game-info">
                    <div>{this.status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
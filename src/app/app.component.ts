import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: String = 'Meu ToDo List';
  public mode = 'list'
  public todos: Todo[] = this.getTodos()
  public form!: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
  }

  add() {
    const title = this.form.controls['title'].value

    const id = this.todos.length + 1
    const todo = new Todo(id, title, false)
    this.todos.push(todo)

    this.save()
    this.clearForm()
  }

  clearForm(){
    this.form.reset()
  }

  remover(todo: Todo){
    const index = this.todos.indexOf(todo)

    if(index !== -1) this.todos.splice(index, 1)
    this.save()
  }

  markAsDone(todo: Todo){
    todo.done = true
    this.save()
  }

  markAsUndone(todo: Todo){
    todo.done = false
    this.save()
  }

  save(){
    const data = JSON.stringify(this.todos)

    localStorage.setItem('todos', data)

    this.mode = 'list'
  }

  getTodos(): Todo[] | [] {
    let localData = localStorage.getItem('todos')

    if(localData === null) return []

    const data = JSON.parse(localData)
    const todos: Todo[] = data
    return todos
  }

  changeMode(mode: string){
    this.mode = mode
  }

}

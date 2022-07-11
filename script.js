const app = Vue.createApp({
  data() {
    return {
      newTask: null,
      error: null,
      tasks: [],
      done: [],
      trash: [],
      nextTaskId: 0
    }
  },
  computed: {
    taskCount() {
      return this.tasks.length
    },
    doneCount() {
      return this.done.length
    },
    trashCount() {
      return this.trash.length
    }
  },
  methods: {
    addNewTask() {
      if (this.newTask) {
        this.tasks.push({
          id: this.nextTaskId++,
          title: this.newTask,
          completed: false
        })
        if (this.error) {
          this.error = null
        }
      } else {
        this.error = "Input field can't be empty!"
      }

      this.newTask = "";
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    completeTask(task, index) {
      task.completed = true
      this.done.push(task)
      this.tasks.splice(index, 1)
    },
    sendToTrash(index) {
      task = this.done[index]
      this.trash.push(task)
      this.done.splice(index, 1)
    },
    deleteFromTrash(index) {
      this.trash.splice(index, 1)
    },
    markIncomplete(task, index) {
      this.tasks.push({
        id: task.id,
        title: task.title,
        completed: false
      })
      this.done.splice(index, 1)
    },
    restoreTask(task, index){
      this.tasks.push({
        id: task.id,
        title: task.title,
        completed: false
      })
      this.trash.splice(index, 1)
    }
  },


})

app.component("todo-item", {
  template: `
<li  class="list-group-item">
<input id="{{key}}" type="checkbox" @click="$emit('complete')" title="toggle mark complete/incomplete "> <label  for="{{ key}} " :class="{'text-decoration-line-through text-muted':completed}" > {{title}}</label>
<button class="btn btn-close float-end" @click="$emit('remove')" title="remove item"></button></li>

`,
  props: ['title', 'completed'],
})

const myapp = app.mount("#app")

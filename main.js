const app = Vue.createApp({
    data(){
        return {
            tasks: [],
            done: [],
            trash: []
        }
    },
    computed: {
        taskCount(){
            return this.tasks.length
        },
        doneCount(){
            return this.done.length 
        },
        trashCount(){
            return this.trash.length
        }
    },
    methods: {
        addNewTask(newTask){
            this.tasks.push(newTask)
        },
        removeTask(task){
            if (this.tasks.indexOf(task) >= 0){
                index = this.tasks.indexOf(task)
                this.tasks.splice(index, 1)
                this.trash.push(task)
            } else if(this.done.indexOf(task) >= 0)  {
                index = this.done.indexOf(task)
                this.done.splice(index, 1)
                this.trash.push(task)
            } else {
                index = this.trash.indexOf(task)
                this.trash.splice(index, 1)
            }
            
            
        },
        completeTask(task){
            index = this.tasks.indexOf(task)
            this.done.push(task)
            this.tasks.splice(index, 1)
        },
        restoreTask(task){
            index = this.trash.indexOf(task)
            this.tasks.push(task)
            this.trash.splice(index, 1)
        }
         
    }
});

app.component("to-do", {
    emits:['add-task', 'remove-task', 'complete-task', 'restore-task'],
    props:{
        tasks:{
            type:Array,
            required:true 
        },
        done: {
            type: Array,
            required:true
        },
        trash: {
            type:Array,
            required:true
        },
        active: {
            type: Number,
            required: true
        },
        completed: {
            type: Number,
            required: true
        },
        trashed: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            error:null,
            newTask: null
        }
    },
    methods:{
        submitTask(newTask){
            if (this.newTask){
                this.$emit('add-task', this.newTask)
                if(this.error){
                    this.error = null
                }
                this.newTask = null
            } else {
                this.error = "The input field can't be empty!"
            }
        },
        completeTask(task){
             this.$emit("complete-task", task)
        },
        removeTask(task){
             this.$emit("remove-task", task)
        },
        restoreTask(task){
            this.$emit("restore-task", task)
        }
    },
    template:`
       <div class="row">
            <div class="col-12">

            <div class="input-group input-group-lg mb-0  py-0">
            <div class="input-group-prepend">
              <span class="h1 bg-white border-0 text-info py-0">&plus;</span>
            </div>
            <input v-model="newTask"
                                type="text" name="newTask"
                        id="newTask" class="form-control form-control-lg border-0 shadow-none mb-0"
                        placeholder="type new task and press enter"
                        @keyup.enter="submitTask">
                
          </div>
          <hr class="mt-0">


                    
            </div>
        </div>

        <!-- end header start list -->
         <div class="row">
          <div class="col-8">
          
            <div class="card border-0">
               <div class="card-header">
               <h6>
               <ul class="list-inline">
               <li class="list-inline-item"><i class="bi bi-activity"></i> &nbsp;Active tasks: {{active}}</li>
               <li class="list-inline-item"><span class="text-danger">{{error}}</span></li>
               </ul>
               </h6>
               
               </div>
               <div class="card-body ">
                    <div v-for="task in tasks" 
                            class="alert alert-success alert-dismissible fade show" 
                            role="alert"
                            title="Click on text to mark as complete"
                            >
                            <span @click="completeTask(task)" >{{ task }}</span>
                            <button @click="removeTask(task)" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
               </div>
            </div><!-- end card -->

          </div><!-- end col-8 -->

          <!-- completed tasks column -->
            <div class="col-4">
                <div class="card border-0" style="width: 18rem;">
                    <div class="card-header"><i class="bi" v-bind:class="{'bi-check-circle':!completed, 'bi-check-circle-fill':completed}"> &nbsp;</i>Completed: {{ completed }}</div>
                        <ul class="list-group list-group-flush">
                            <li v-for="task in done" 
                            class="list-group-item py-0">{{ task }}
                            <span type="button" @click="removeTask(task)" class="float-right" title="send to trash">&times;</span></li>
                        </ul>
                </div>
                <div class="card border-0" style="width: 18rem;">
                    <div class="card-header"><i class="bi bi-recycle"></i> Trash: {{ trashed }}</div>
                        <ul class="list-group list-group-flush">
                            <li v-for="item in trash" 
                            class="list-group-item py-0"> 
                            <span type="button" @click="restoreTask(item)" class="float-left" title="restore as new task"><i class="bi bi-box-arrow-up"></i></span>
                            &nbsp;{{ item }}
                            <span type="button" @click="removeTask(item)" class="float-right" title="delete forever"><i class="bi bi-trash"></i></span>
                            </li>
                        </ul>
                </div>
            </div>
        
      </div>
    `
})

const mountedApp = app.mount("#app")

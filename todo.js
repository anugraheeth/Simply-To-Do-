document.addEventListener("DOMContentLoaded" , () => {
    const stored = JSON.parse(localStorage.getItem('tasks'))

    if(stored){
        stored.forEach((task) => tasks.push(task))
        updatelist()
        update()
    }
})

let tasks=[]


function save(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addtask = () => {
    const ipt = document.getElementById('ip')
    const text = ipt.value.trim()

    if(text) {
        tasks.push({text: text, complete: false})
        ipt.value = ""
        updatelist()
        update()
        save()
    }

    
}
function toggleTaskComplete( index) {
    tasks[index].complete = !tasks[index].complete
    updatelist()
    update()
    save()
}

function deletetask(index){
    tasks.splice(index,1)
    updatelist()
    update()
    save()

}
 function edit(index){
    const taskinput = document.getElementById('ip')
    taskinput.value=tasks[index].text

    tasks.splice(index,1)
    updatelist()
    update()
    save()
 }

 function update(){
    const completedtask =tasks.filter(task => task.complete ).length
    const total = tasks.length

    const percentage = (completedtask/total)*100

    const pbar = document.getElementById('progress')
    
    document.getElementById('number').innerHTML = `${completedtask }/${ total}`

    pbar.style.width =`${percentage}%`
    
    if(percentage>=50 && percentage!=100){
        document.getElementById('p').innerHTML = `You Can Do It !!`
    }
    else if(percentage==100){
        document.getElementById('p').innerHTML = `Yay  You Did It ! 🥳`
    }
    else{
        document.getElementById('p').innerHTML = `Keep It UP!!`
    }
 }

function updatelist(){
    const tasklist = document.getElementById('task')
    tasklist.innerHTML = " "

    tasks.forEach( (task, index) =>{
        const listitems = document.createElement('li')

        listitems.innerHTML =  `
        <div class="taskitems">
                <div class="tsk ${task.complete ? "complete" : ""}">
                    <input type="checkbox" class="checkbox" ${task.complete ? "checked" : ""}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./images/icons8-edit-32.png" onClick = "edit(${index})" />
                    <img src="./images/icons8-delete-50.png" onClick = "deletetask(${index})" />
                </div>
        </div>`
        listitems.addEventListener('change',() => toggleTaskComplete(index))
        tasklist.appendChild(listitems)
    })
}

document.getElementById('new').addEventListener("click", function(e){
    e.preventDefault()

    addtask()
})
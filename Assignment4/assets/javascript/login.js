
    const form = document.getElementById("regs");
    const errorElement = document.getElementById("error");

    form.addEventListener('submit', (e) =>{
    let messages = []
    var pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
    // if (password.match(pattern)){
    //     messages.push('Password must be 8-12 Character long andcontains at least one lowercase letter, uppercase letter, number and a symbol.');
    // }

    if (password.value.length < 8){
        messages.push('Password must be atleast 8 characters')
    }

    if (password.value.length > 16){
        messages.push('Password must be less than 16 characters')
    }

    if (messages.length > 0 ){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})
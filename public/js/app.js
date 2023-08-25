
const url = `http://localhost:3000/weather?address=+`


const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = input.value
    
    message1.textContent = 'your message is loading'
    message2.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=`+location).then((response) => {
        response.json().then((data) => {
    
            if (data.error) return message1.textContent =  data.error
            message1.textContent =data.forecast
            message2.textContent = data.longitude+' '+ data.latitude+' '+ data.location
    
        })
    })
})
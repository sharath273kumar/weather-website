console.log('Server Start-up')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //console.log('Testing!')
    e.preventDefault()

    const location = search.value
    message1.textContent = 'Fetching...'
    message2.textContent = ''

    fetch('http://localhost:8000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                message1.textContent = data.place
                message2.textContent = data.forecastData.description
                console.log(data.forecastData)
                console.log(data.place)
            }
            
        })  
    })
})
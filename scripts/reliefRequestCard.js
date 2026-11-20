const form = document.getElementById('relief-request-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())

    addToLocalStorage(data)

    addCard(data.category, data.description, data.priority, data.status, data.location, data.people)

    e.target.reset()
})

const addToLocalStorage = reliefRequest => {
    const reliefRequests = JSON.parse(localStorage.getItem('reliefRequests')) || []

    reliefRequests.push(reliefRequest)

    localStorage.setItem('reliefRequests', JSON.stringify(reliefRequests))
}

const addCard = (category, description, priority, status, location, people) => {

    const parentDiv = document.createElement('div')
    parentDiv.classList.add('relief-requests')

    const infoDiv = document.createElement('div')
    infoDiv.classList.add('info')

    const infoFirstDiv = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerHTML = category

    const p1 = document.createElement('p')
    p1.innerHTML = description

    infoFirstDiv.appendChild(h2)
    infoFirstDiv.appendChild(p1)

    const infoSecondDiv = document.createElement('div')

    const prioritySpan = document.createElement('span')
    prioritySpan.innerHTML = priority

    if (priority.toLowerCase().includes('high')) {
        prioritySpan.classList.add('red')
    } else if (priority.toLowerCase().includes('medium')) {
        prioritySpan.classList.add('yellow')
    } else {
        prioritySpan.classList.add('green')
    }

    const statusSpan = document.createElement('span')
    statusSpan.innerHTML = status

    if (status.toLowerCase().includes('pending')) {
        statusSpan.classList.add('yellow')
    } else {
        statusSpan.classList.add('green')
    }

    infoSecondDiv.appendChild(prioritySpan)
    infoSecondDiv.appendChild(statusSpan)

    const locationAndPeopleDiv = document.createElement('div')

    const p2 = document.createElement('p')
    p2.classList.add('location')
    p2.innerHTML = location

    const p3 = document.createElement('p')
    p3.classList.add('people')
    p3.innerHTML = people + " people"

    locationAndPeopleDiv.appendChild(p2)
    locationAndPeopleDiv.appendChild(p3)

    infoDiv.appendChild(infoFirstDiv)
    infoDiv.appendChild(infoSecondDiv)

    parentDiv.appendChild(infoDiv)
    parentDiv.appendChild(locationAndPeopleDiv)

    const requestsSection = document.getElementById('requests')
    requestsSection.appendChild(parentDiv)

}

const reliefRequests = JSON.parse(localStorage.getItem('reliefRequests')) || []

reliefRequests.forEach(reliefRequest => {

    addCard(reliefRequest.category, reliefRequest.description, reliefRequest.priority, reliefRequest.status, reliefRequest.location, reliefRequest.people)

})
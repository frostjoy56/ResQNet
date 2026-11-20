const getDate = (date) => {

    const newDate = date.split('-')

    const month = newDate[1]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return `${newDate[2]} ${months[month-1]} ${newDate[0]}`

}

const createCard = (disasterType, location, severity, status, peopleAffected, date) => {

    const parentDiv = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerHTML = disasterType

    const locationP = document.createElement('p')
    locationP.innerHTML = location

    const statusDiv = document.createElement('div')
    statusDiv.classList.add('status')

    const severityP = document.createElement('p')
    severityP.innerHTML = severity

    if (severity.toLowerCase().includes("high")) {
        severityP.classList.add('red')
    } else if (severity.toLowerCase().includes("medium")) {
        severityP.classList.add('yellow')
    } else {
        severityP.classList.add('green')
    }

    const statusP = document.createElement('p')
    statusP.innerHTML = status

    if (status === "Pending") {
        statusP.classList.add('yellow')
    } else {
        statusP.classList.add('green')
    }

    statusDiv.appendChild(severityP)
    statusDiv.appendChild(statusP)

    const secondDiv = document.createElement('div')
    secondDiv.classList.add('extra-info')

    const peopleP = document.createElement('p')
    peopleP.innerHTML = peopleAffected + " people affected"

    const dateP = document.createElement('p')
    dateP.innerHTML = getDate(date)

    secondDiv.appendChild(peopleP)
    secondDiv.appendChild(dateP)

    const a = document.createElement('a')
    a.classList.add('details')
    a.innerHTML = "View Details"

    parentDiv.appendChild(h2)
    parentDiv.appendChild(locationP)
    parentDiv.appendChild(statusDiv)
    parentDiv.appendChild(secondDiv)
    parentDiv.appendChild(a)

    document.getElementById('incidents').appendChild(parentDiv)

}

const incidents = JSON.parse(localStorage.getItem('incidents')) || []

incidents.forEach(incident => {
    createCard(incident.disaster_type, incident.location, incident.severity, incident.status, incident.people_affected, incident.date)
})
const stats = {
    activeIncidents: 0,
    pendingRequests: 0,
    resolvedIncidents: 0,
    resourcesAvailable: 0
}

const incidents = JSON.parse(localStorage.getItem('incidents')) || []

incidents.forEach(incident => {

    if (incident.status.toLowerCase().includes('pending')) {
        stats.activeIncidents++
    } else {
        stats.resolvedIncidents++
    }
})

const reliefRequests = JSON.parse(localStorage.getItem('reliefRequests')) || []

reliefRequests.forEach(request => {

    if (request.status.toLowerCase().includes('pending')) {
        stats.pendingRequests++
    }

})

const resources = JSON.parse(localStorage.getItem('resources')) || []

resources.forEach(resource => {
    stats.resourcesAvailable += Number(resource.quantity)
})

document.getElementById('active-incidents').innerHTML = stats.activeIncidents
document.getElementById('pending-requests').innerHTML = stats.pendingRequests
document.getElementById('resolved-incidents').innerHTML = stats.resolvedIncidents
document.getElementById('resources-available').innerHTML = stats.resourcesAvailable

const incidentTable = document.getElementById('incidents-table')

const addItemToTable = (incident, location, severity, status) => {

    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    td1.innerHTML = incident

    const td2 = document.createElement('td')
    td2.innerHTML = location

    const td3 = document.createElement('td')
    const severitySpan = document.createElement('span')
    severitySpan.innerHTML = severity.split(' ')[0]

    if (severity.toLowerCase().includes('high')) {
        severitySpan.classList.add('red')
    } else if (severity.toLowerCase().includes('medium')) {
        severitySpan.classList.add('yellow')
    } else {
        severitySpan.classList.add('green')
    }

    td3.appendChild(severitySpan)

    const td4 = document.createElement('td')
    const statusSpan = document.createElement('span')
    statusSpan.innerHTML = status

    if (status.toLowerCase().includes('pending')) {
        statusSpan.classList.add('yellow')
    } else {
        statusSpan.classList.add('green')
    }

    td4.appendChild(statusSpan)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    incidentTable.appendChild(tr)

}

let a = true

incidents.toReversed().forEach(incident => {

    if (a) {
        addItemToTable(incident.disaster_type, incident.location, incident.severity, incident.status)
    }

    if (incident === incidents[incidents.length - 4]) {
        a = false
    }
})
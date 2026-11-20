const form = document.getElementById('report_incident')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())

    addToLocalStorage(data)

    e.target.reset()
})

const addToLocalStorage = incident => {
    const incidents = JSON.parse(localStorage.getItem('incidents')) || []

    incidents.push(incident)

    localStorage.setItem('incidents', JSON.stringify(incidents))
}
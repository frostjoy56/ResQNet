const form = document.getElementById('add-resource')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())

    addToLocalStorage(data)

    addToTable(data)

    console.log(data)

    if (data.category.toLowerCase().includes('food')) {
        resourceCount.food += Number(data.quantity)
    } else if (data.category.toLowerCase().includes('water')) {
        resourceCount.water += Number(data.quantity)
    } else if (data.category.toLowerCase().includes('medical')) {
        resourceCount.medical += Number(data.quantity)
    } else if (data.category.toLowerCase().includes('shelter')) {
        resourceCount.shelter += Number(data.quantity)
    } else if (data.category.toLowerCase().includes('transport')) {
        resourceCount.transport += Number(data.quantity)
    } else if (data.category.toLowerCase().includes('other')) {
        resourceCount.others += Number(data.quantity)
    }

    loadResourceCards(resourceCount)

    e.target.reset()
})

const addToLocalStorage = resource => {
    const resources = JSON.parse(localStorage.getItem('resources')) || []

    resources.push(resource)

    localStorage.setItem('resources', JSON.stringify(resources))
}

const addToTable = resource => {
    const table = document.getElementById('tbody')

    const tr = document.createElement('tr')

    const name = document.createElement('td')
    name.innerHTML = resource.name

    const category = document.createElement('td')
    category.innerHTML = resource.category

    const quantity = document.createElement('td')
    quantity.innerHTML = resource.quantity

    const location = document.createElement('td')
    location.innerHTML = resource.location

    const available = document.createElement('td')

    if (resource.quantity <= 10) {
        available.classList.add('red')
        available.innerHTML = 'Limited'
    } else {
        available.classList.add('green')
        available.innerHTML = 'Available'
    }

    tr.appendChild(name)
    tr.appendChild(category)
    tr.appendChild(quantity)
    tr.appendChild(location)
    tr.appendChild(available)

    table.appendChild(tr)
}

const loadResourceCards = resourceCount => {

    document.getElementById('food').innerHTML = resourceCount.food

    document.getElementById('water').innerHTML = resourceCount.water

    document.getElementById('medical').innerHTML = resourceCount.medical

    document.getElementById('shelter').innerHTML = resourceCount.shelter

    document.getElementById('transport').innerHTML = resourceCount.transport

    document.getElementById('others').innerHTML = resourceCount.others

}

const resources = JSON.parse(localStorage.getItem('resources')) || []

const resourceCount = {
    food: 0,
    water: 0,
    medical: 0,
    shelter: 0,
    transport: 0,
    others: 0,
}

resources.forEach(resource => {

    resource.quantity = Number(resource.quantity)

    if (resource.category.toLowerCase().includes('food')) {
        resourceCount.food += resource.quantity
    } else if (resource.category.toLowerCase().includes('water')) {
        resourceCount.water += resource.quantity
    } else if (resource.category.toLowerCase().includes('medical')) {
        resourceCount.medical += resource.quantity
    } else if (resource.category.toLowerCase().includes('shelter')) {
        resourceCount.shelter += resource.quantity
    } else if (resource.category.toLowerCase().includes('transport')) {
        resourceCount.transport += resource.quantity
    } else if (resource.category.toLowerCase().includes('others')) {
        resourceCount.others += resource.quantity
    }

    if (resources[resources.length - 1] === resource) {
        loadResourceCards(resourceCount)
    }

    addToTable(resource)
})
const createItemFromURL = (title, url, resourceName) => {
    const wrapper = createContentWrapper()

    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const header = document.createElement("h5")
                header.classList.add("card-subtitle")
                header.classList.add("mb-1")
                header.innerHTML = title

                const p = document.createElement("p")
                p.classList.add("user-select-none")
                p.classList.add("p-link")
                p.innerHTML = data.name

                wrapper.appendChild(header)
                wrapper.appendChild(p)

                p.addEventListener("click", () => {
                    clearResultList()
                    renderItem(resourceName, url)
                })
            })
    }
    return wrapper
}

const createItemListFromURL = (title, array, resourceName) => {
    const wrapper = createContentWrapper()
    if (array.length !== 0) {
        const header = document.createElement("h5")
        header.classList.add("card-subtitle")
        header.classList.add("mb-1")
        header.innerHTML = title

        wrapper.appendChild(header)

        array.forEach(item => {
            fetch(item)
                .then(response => response.json())
                .then(data => {
                    const p = document.createElement("p")
                    p.classList.add("user-select-none")
                    p.classList.add("p-link")
                    p.innerHTML = data.title ? data.title : data.name
                    wrapper.appendChild(p)
                    p.addEventListener("click", () => {
                        clearResultList()
                        renderItem(resourceName, item)
                    })
                })
        })
    }
    return wrapper
}

const getResourceItem = (resourceName, data) => {
    if (resourceName === "people") return createPeopleItem(data)
    else if (resourceName === "planets") return createPlanetItem(data)
    else if (resourceName === "starships") return createShipItem(data)
    else if (resourceName === "vehicles") return createVehicleItem(data)
    else if (resourceName === "species") return createSpeciesItem(data)
    else if (resourceName === "films") return createFilmItem(data)
}

const renderItem = (resourceName, url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const wrapper = createSearchItemWrapper(data)

                wrapper.appendChild(getResourceItem(resourceName, data))

                resultList.appendChild(wrapper)
            }
        })
}

const clearResultList = () => {
    while (resultList.firstChild) {
        resultList.removeChild(resultList.lastChild)
    }
}

const renderSearchResult = (resourceName, results) => {
    const wrapper = document.createElement("div")
    const header = document.createElement("h3")
    header.innerHTML = resourceName.toUpperCase()
    wrapper.appendChild(header)
    results.forEach(item => {

        const p = document.createElement("p")
        p.classList.add("user-select-none")
        p.classList.add("p-link")
        p.innerHTML = item.name ? item.name : item.title

        wrapper.appendChild(p)

        p.addEventListener("click", () => {
            clearResultList()
            renderItem(resourceName, item.url)
        })

        resultList.appendChild(wrapper)
    })
}

const search = searchterm => {
    clearResultList()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach(resource => {
                const resourceName = resource[0]
                fetch(`${url}${resourceName}/?search=${searchterm}`)
                    .then(res => res.json())
                    .then(data => {
                        renderSearchResult(resourceName, data.results)
                    })
            })
        })
}

const resultList = document.getElementById("resultList")
const input = document.getElementById("input")
const btn = document.getElementById("btn")
const url = "https://swapi.dev/api/"

btn.addEventListener("click", () => {
    const searchterm = input.value

    clearResultList()

    if (searchterm) {
        search(searchterm)
    }

    input.value = ""
})
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
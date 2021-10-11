const createSearchItemWrapper = data => {
    const wrapper = document.createElement("div")
    const header = document.createElement("h2")
    header.classList.add("card-title")
    header.classList.add("mb-3")
    header.innerHTML = data.name ? data.name : data.title
    wrapper.appendChild(header)
    return wrapper
}

const createContentWrapper = () => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("mb-4")

    return wrapper
}

const createContentItem = (title, content) => {
    const wrapper = createContentWrapper(title)
    const header = document.createElement("h5")
    header.classList.add("card-subtitle")
    header.classList.add("mb-1")
    header.innerText = title

    const p = document.createElement("p")
    // p.classList.add("card-text")
    p.innerText = content

    wrapper.appendChild(header)
    wrapper.appendChild(p)

    return wrapper
}

const createPeopleItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Gender", data.gender))
    wrapper.appendChild(createContentItem("Height", data.height))
    wrapper.appendChild(createItemFromURL("Homeworld", data.homeworld, resourceName = "planets"))
    wrapper.appendChild(createItemListFromURL("Species", data.species, resourceName = "species"))
    wrapper.appendChild(createItemListFromURL("Starships", data.starships, resourceName = "starships"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, resourceName = "films"))

    return wrapper
}

const createPlanetItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Climate", data.climate))
    wrapper.appendChild(createContentItem("Terrain", data.terrain))
    wrapper.appendChild(createContentItem("Gravity", data.gravity))
    wrapper.appendChild(createContentItem("Population", data.population))
    wrapper.appendChild(createItemListFromURL("Residents", data.residents, resourceName = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, resourceName = "films"))

    return wrapper
}

const createShipItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Model", data.model))
    wrapper.appendChild(createContentItem("Manufacturer", data.manufacturer))
    wrapper.appendChild(createContentItem("Crew", data.crew))
    wrapper.appendChild(createContentItem("Passengers", data.passengers))
    wrapper.appendChild(createItemListFromURL("Pilots", data.pilots, resourceName = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, resourceName = "films"))

    return wrapper
}

const createVehicleItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Model", data.model))
    wrapper.appendChild(createContentItem("Manufacturer", data.manufacturer))
    wrapper.appendChild(createContentItem("Length", data.length))
    wrapper.appendChild(createContentItem("Crew", data.crew))
    wrapper.appendChild(createContentItem("Vehicle Class", data.vehicle_class))
    wrapper.appendChild(createContentItem("Passengers", data.passengers))
    wrapper.appendChild(createItemListFromURL("Pilots", data.pilots, resourceName = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, resourceName = "films"))

    return wrapper
}

const createSpeciesItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Classification", data.classification))
    wrapper.appendChild(createContentItem("Language", data.language))
    wrapper.appendChild(createContentItem("Average Height", data.average_height))
    wrapper.appendChild(createContentItem("Average Lifespan", data.average_lifespan))
    wrapper.appendChild(createContentItem("Eye Colors", data.eye_colors))
    wrapper.appendChild(createContentItem("Hair Colors", data.hair_colors))
    wrapper.appendChild(createContentItem("Skin Colors", data.skin_colors))
    wrapper.appendChild(createItemFromURL("Homeworld", data.homeworld, resourceName = "planets"))
    wrapper.appendChild(createItemListFromURL("People", data.people, resourceName = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, resourceName = "films"))

    return wrapper
}

const createFilmItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Director", data.director))
    wrapper.appendChild(createContentItem("Opening Crawl", data.opening_crawl))
    wrapper.appendChild(createContentItem("Producer", data.producer))
    wrapper.appendChild(createContentItem("Release Date", data.release_date))
    wrapper.appendChild(createItemListFromURL("Characters", data.characters, resourceName = "people"))
    wrapper.appendChild(createItemListFromURL("Planets", data.planets, resourceName = "planets"))
    wrapper.appendChild(createItemListFromURL("Species", data.species, resourceName = "species"))
    wrapper.appendChild(createItemListFromURL("Starships", data.starships, resourceName = "starships"))
    wrapper.appendChild(createItemListFromURL("Vehicles", data.vehicles, resourceName = "vehicles"))

    return wrapper
}

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
    clearResultList() //FLYTTA!!
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
    // console.log(resources)
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
            renderItem(resourceName, item.url)
        })

        resultList.appendChild(wrapper)
    })
}
// const resources = []
const search = searchterm => {
    clearResultList()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach(resource => {
                const resourceName = resource[0]
                // resources.push(name)
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

    if (searchterm) {
        search(searchterm)
    }

    input.value = ""
})
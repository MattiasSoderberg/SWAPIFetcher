const createSearchItemWrapper = data => {
    const wrapper = document.createElement("div")
    const header = document.createElement("h2")
    header.classList.add("card-title")
    header.classList.add("mb-3")
    header.innerHTML = data.name ? data.name : data.title
    wrapper.appendChild(header)
    return wrapper
}

const createContentWrapper = (title) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("mb-5")

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

const createItemFromURL = (title, url, name) => {
    const wrapper = createContentWrapper()

    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const header = document.createElement("h5")
                header.classList.add("card-subtitle")
                header.classList.add("mb-1")
                header.innerHTML = title

                const content = document.createElement("p")
                // content.classList.add("card-text")
                content.innerHTML = data.name

                wrapper.appendChild(header)
                wrapper.appendChild(content)

                content.addEventListener("click", () => {
                    renderItem(name, url)
                })
            })
    }
    return wrapper
}

const createItemListFromURL = (title, array, name) => {
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
                    // p.classList.add("card-text")
                    p.innerHTML = data.title ? data.title : data.name
                    wrapper.appendChild(p)
                    p.addEventListener("click", () => {
                        renderItem(name, item)
                    })
                })
        })
    }
    return wrapper
}

const createPeopleItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Gender", data.gender))
    wrapper.appendChild(createContentItem("Height", data.height))
    wrapper.appendChild(createItemFromURL("Homeworld", data.homeworld, name = "planets"))
    wrapper.appendChild(createItemListFromURL("Starships", data.starships, name = "starships"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, name = "films"))

    return wrapper
}

const createPlanetItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Climate", data.climate))
    wrapper.appendChild(createContentItem("Terrain", data.terrain))
    wrapper.appendChild(createContentItem("Gravity", data.gravity))
    wrapper.appendChild(createContentItem("Population", data.population))
    wrapper.appendChild(createItemListFromURL("Residents", data.residents, name = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, name = "films"))

    return wrapper
}

const createShipItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Model", data.model))
    wrapper.appendChild(createContentItem("Manufacturer", data.manufacturer))
    wrapper.appendChild(createContentItem("Crew", data.crew))
    wrapper.appendChild(createContentItem("Passengers", data.passengers))
    wrapper.appendChild(createItemListFromURL("Pilots", data.pilots, name = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, name = "films"))

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
    wrapper.appendChild(createItemListFromURL("Pilots", data.pilots, name = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, name = "films"))

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
    wrapper.appendChild(createItemFromURL("Homeworld", data.people, name = "planets"))
    wrapper.appendChild(createItemListFromURL("People", data.people, name = "people"))
    wrapper.appendChild(createItemListFromURL("Films", data.films, name = "films"))

    return wrapper
}

const createFilmItem = data => {
    const wrapper = document.createElement("div")

    wrapper.appendChild(createContentItem("Director", data.director))
    wrapper.appendChild(createContentItem("Opening Crawl", data.opening_crawl))
    wrapper.appendChild(createContentItem("Producer", data.producer))
    wrapper.appendChild(createContentItem("Release Date", data.release_date))
    wrapper.appendChild(createItemListFromURL("Characters", data.characters, name = "people"))
    wrapper.appendChild(createItemListFromURL("Planets", data.planets, name = "planets"))
    wrapper.appendChild(createItemListFromURL("Species", data.species, name = "species"))
    wrapper.appendChild(createItemListFromURL("Starships", data.starships, name = "starships"))
    wrapper.appendChild(createItemListFromURL("Vehicles", data.vehicles, name = "vehicles"))

    return wrapper
}

const getResourceItem = (name, data) => {
    if (name === "people") return createPeopleItem(name, data)
    else if (name === "planets") return createPlanetItem(name, data)
    else if (name === "starships") return createShipItem(name, data)
    else if (name === "vehicles") return createVehicleItem(name, data)
    else if (name === "species") return createSpeciesItem(name, data)
    else if (name === "films") return createFilmItem(name, data)
}

const renderItem = (name, url) => {
    clearResultList() //FLYTTA!!
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const wrapper = createSearchItemWrapper(data)

                wrapper.appendChild(getResourceItem(name, data))

                resultList.appendChild(wrapper)
            }
        })
}

const clearResultList = () => {
    while (resultList.firstChild) {
        resultList.removeChild(resultList.lastChild)
    }
}

const renderSearchResult = (name, results) => {
    // console.log(resources)
    const wrapper = document.createElement("div")
    const header = document.createElement("h3")
    header.innerHTML = name.toUpperCase()
    wrapper.appendChild(header)
    results.forEach(item => {

        const p = document.createElement("p")
        p.innerHTML = item.name ? item.name : item.title

        wrapper.appendChild(p)

        p.addEventListener("click", () => {
            renderItem(name, item.url)
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
                const name = resource[0]
                // resources.push(name)
                fetch(`${url}${name}/?search=${searchterm}`)
                    .then(res => res.json())
                    .then(data => {
                        renderSearchResult(name, data.results)
                    })
            })
        })
}

const resultList = document.getElementById("resultList")
const input = document.getElementById("input")
const btn = document.getElementById("btn")
// const resultListRoot = document.getElementById("resultListContainer")
const url = "https://swapi.dev/api/"

btn.addEventListener("click", () => {
    const searchterm = input.value

    if (searchterm) {
        search(searchterm)
    }
})
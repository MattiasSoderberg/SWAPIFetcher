const createItemWrapper = (data) => {
    const wrapper = document.createElement("div")
    const header = document.createElement("h2")
    header.classList.add("card-title")
    header.classList.add("mb-3")
    header.innerHTML = data.name
    wrapper.appendChild(header)
    return wrapper
}

const createPeopleItem = (data) => {
    const contentWrapper = document.createElement("div")
    contentWrapper.classList.add("mb-3")
    const genderHeader = document.createElement("h5")
    genderHeader.classList.add("card-subtitle")
    genderHeader.innerHTML = "Gender"

    const gender = document.createElement("p")
    gender.classList.add("card-text")
    gender.innerHTML = data.gender

    const heightHeader = document.createElement("h5")
    heightHeader.classList.add("card-subtitle")
    heightHeader.innerHTML = "Height"

    const height = document.createElement("p")
    height.classList.add("card-text")
    height.innerHTML = `${data.height} cm`

    contentWrapper.appendChild(genderHeader)
    contentWrapper.appendChild(gender)
    contentWrapper.appendChild(heightHeader)
    contentWrapper.appendChild(height)

    return contentWrapper
}

const createItemFromURL = (title, url) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("mb-3")

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const header = document.createElement("h5")
            header.classList.add("card-subtitle")
            header.innerHTML = title

            const content = document.createElement("p")
            content.classList.add("card-text")
            content.innerHTML = data.name

            wrapper.appendChild(header)
            wrapper.appendChild(content)

            content.addEventListener("click", () => {
                // renderItem(data.url)
                console.log(data.url)
            })
        })
    return wrapper
}

const createItemListFromURL = (title, array) => {
    const wrapper = document.createElement("div")
    wrapper.classList.add("mb-3")

    const header = document.createElement("h5")
    header.classList.add("card-subtitle")
    header.innerHTML = title

    wrapper.appendChild(header)

    array.forEach(item => {
        fetch(item)
            .then(response => response.json())
            .then(data => {
                const p = document.createElement("p")
                p.classList.add("card-text")
                p.innerHTML = data.name
                wrapper.appendChild(p)
                p.addEventListener("click", () => {
                    // renderItem(item)
                    console.log(item)
                })
            })
    })
    return wrapper
}

const renderItem = url => {
    clearResultList()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const wrapper = createItemWrapper(data)

                wrapper.appendChild(createPeopleItem(data))
                wrapper.appendChild(createItemFromURL("Homeworld", data.homeworld))
                wrapper.appendChild(createItemListFromURL("Starships", data.starships))

                resultList.appendChild(wrapper)
            }
        })
}

const clearResultList = () => {
    // resultListRoot.classList.add("visually-hidden")
    while (resultList.firstChild) {
        resultList.removeChild(resultList.lastChild)
    }
}

const renderSearchResult = (name, results) => {
    // resultListRoot.classList.remove("visually-hidden")
    const wrapper = document.createElement("div")
    const header = document.createElement("h3")
    header.innerHTML = name.toUpperCase()
    wrapper.appendChild(header)
    results.forEach(item => {

        const name = document.createElement("p")
        name.innerHTML = item.name

        wrapper.appendChild(name)

        name.addEventListener("click", () => {
            clearResultList()
            renderItem(item.url)
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
                const name = resource[0]
                fetch(`${url}${name}/?search=${searchterm}`)
                    .then(res => res.json())
                    .then(data => {
                        const results = data.results
                        console.log(results)
                        renderSearchResult(name, results)
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
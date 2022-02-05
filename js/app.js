//toggles the collapse menu after clicking on collapse toggle icon
function showCollapseMenu() {
    const collapseMenu = document.getElementById('collapse-menu')
    collapseMenu.classList.toggle('show')
}

//#region set the right navigation
function navigate(target) {
    const section = document.getElementById(target)
    section?.scrollIntoView({
        behavior: "smooth"
    })
}

//adds class of name "activeNav" to the right button
function setActiveNav(id) {
    const collapseMenu = document.getElementById('collapse-menu')
    const buttons = document.getElementById('collapse-menu').childNodes
    buttons.forEach(button => {
        button.classList?.remove('activeNav')
    })
    const clicked = document.getElementById(id)
    clicked?.classList?.add('activeNav')
    collapseMenu.classList?.remove('show')
}

//adds class of name "active" to the right section
function setActiveSection(section) {
    const sections = document.querySelector('.main-body').childNodes
    sections.forEach(section => {
        section.classList?.remove('active')
    })
    section?.classList?.add('active')
}
//#endregion


//#region Event listeners

//#region create Navs on page load
window.addEventListener("DOMContentLoaded", loadNavs)

//set active section on first load
function firstLoad(id, target) {
    setActiveNav(id)
    const section = document.getElementById(target)
    setActiveSection(section)
    section?.scrollIntoView({
        behavior: "smooth"
    })
}

function loadNavs() {
    const collapseMenu = document.getElementById('collapse-menu')
    const sections = [].slice.call(document.querySelector('.main-body').children)
    sections?.forEach((section, index) => {
        const newChild = document.createElement('li')
        const newChildContent = document.createElement('a')
        newChildContent.appendChild(document.createTextNode(`Section ${index + 1}`))
        newChild.appendChild(newChildContent)
        newChild.id = `button-${index + 1}`
        newChild.onclick = function () {
            navigate(section.id)
        }
        collapseMenu.appendChild(newChild)
    })
    //to mark the first section in view as selected section
    window.addEventListener("DOMContentLoaded", firstLoad('button-1', 'section-1'))
    //calling at the end to ensure everything is loaded first
    activeInView(sections)
}
//#endregion

//#region to close the collapse after the page is resized and collapse is no longer needed
window.addEventListener("resize", checkCollapse)

function checkCollapse() {
    const collapseToggle = document.getElementById('collapse-toggle')
    const collapseMenu = document.getElementById('collapse-menu')
    if (!collapseToggle.style.display) {
        collapseMenu.classList.remove('show')
    }
}
//#endregion

//adds event listeners to each section to check if it is in view port
function activeInView(sections) {
    sections.forEach(section => {
        window.addEventListener("scroll", () => {
            if (isInViewport(section)) {
                setActiveSection(section)
                setActiveNav(`button-${section.id.split('-')[1]}`)
            }
        })
    })
}

//#endregion

//helper function to check if at least 2/3 of the element is in view port
function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
        document.documentElement.clientHeight > (rect.y + (rect.height * (2 / 3)))
    )
}
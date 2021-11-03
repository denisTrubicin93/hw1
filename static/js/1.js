import ContentVidget from '/static/js/components/ContentVidget.js'
import sendRequest from '/static/js/xhr.js'

const requestURL = 'https://boring-fe.herokuapp.com/react-hw-1'
let vidgetList
let currentVidget = 0
sendRequest('GET', requestURL)
    .then(data => getVidgetList(data))
    .catch(err => console.log(err))

const getVidgetList = (data) => {
    vidgetList = data
    console.log(vidgetList)
    router()
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const viewContent = (current, symbol) => {
    if (symbol === "minus" && currentVidget !== 0) currentVidget = current - 1
    else if (symbol === "plus" && currentVidget !== 3) currentVidget = current + 1
    else currentVidget = current

    let view = new ContentVidget(vidgetList[currentVidget])
    console.log(view.getHTML())
    return view
}

const router = async () => {
    const routes = [
        { path: "/", view: viewContent(0, null) },
        { path: "/prev", view: viewContent(currentVidget, "minus") },
        { path: "/next", view: viewContent(currentVidget, "plus") },
        { path: "/end", view: viewContent(3, null) }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        }
    }

    const view = match.route.view
    document.querySelector('#content-app').innerHTML = await view.getHTML()

};

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches("[data-link")) {
            e.preventDefault
            navigateTo(e.target.href)
        }
    })
    if (vidgetList) router()
});
// create function desable zoom
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheeZoom: false,
    zoomControl: false
}
//get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

//create map
const map = L.map('mapid', options).setView([ lat, lng ], 13);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon (popup)
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
})

//createa and add marker
L
.marker([ lat, lng ], { icon })
.addTo(map);

// image Gallery

function selectImage(event){
    const button = event.currentTarget;
    //console.log(event.currentTarget);

    // remover todas as classes .active
    const buttons = document.querySelectorAll(".images button");
    //console.log(buttons); //todos os buttons
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove("active")
    }

    //selecionar a image clicada
    const image = button.children[0]
    //console.log(button.children)
    const imageContainer = document.querySelector(".orphanage-datails > img")

    //atualizar o container de image
    imageContainer.src = image.src


    //adicionar a classe .active para este botão clicado
    button.classList.add("active")
}
//create map
const map = L.map('mapid').setView([-22.6692493,-43.4349233], 13);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon (popup)
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
})

function addMarker({id, name, lat, lng}){

    //create popup overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"><img src="/images/arrow-white.svg"> </a>`) 
    //para substituir palavras usando variaveis precisa trocar "" por crase `` e colocar o ${}

    //createa and add marker
    L
    .marker([lat,lng], { icon })
    .addTo(map)
    .bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll('.orphanages span')
// console.log(orphanages) //vai mostrar que é um nodelist
orphanagesSpan.forEach( orphanagesElementSpan => {
    const orphanage = {
        id: orphanagesElementSpan.dataset.id,
        name: orphanagesElementSpan.dataset.name,
        lat: orphanagesElementSpan.dataset.lat,
        lng: orphanagesElementSpan.dataset.lng
    }
    //dataset faz parte de um objeto do tipo html dentro de span
    addMarker(orphanage)
})
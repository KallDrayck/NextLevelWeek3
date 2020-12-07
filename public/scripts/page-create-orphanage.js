//create map
const map = L.map('mapid').setView([-22.6692493,-43.4349233], 13);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon (popup)
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68]
})

let marker;

//createa and add markers
map.on('click', (event) => {
    // console.log(event); //vai ver o objeto
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker);

    //add icon layer
    marker = L.marker([lat,lng], { icon })
    .addTo(map);
})

//photos upload
function addPhotoField(){
    // console.log(addPhotoField);
    //pegar o container de fotos #images
    const container = document.querySelector('#images');
    
    //pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');

    //realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    
    //verificar se o campo esta vazio, se sim, não adicionar ao container de images
    const input = newFieldContainer.children[0];
    if(input.value == ""){return}

    // limpar o campo antes de adicionar ao container de imagens
    // console.log(newFieldContainer.children);
    input.value = "";

    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer);
}

function deleteField(event){
    // console.log(event.currentTarget);
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if(fieldsContainer.length < 2){
        //limpar o valor do campo
        span.parentNode.children[0].value = "";
        return
    }
    
    //deletar o campo
    console.log(span.parentNode); //vai pegar o pai dele
    span.parentNode.remove(); //vai remover o new-upload
}

//selecionar sim ou Não
function toggleSelect(event){
    //retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')
    .forEach(function (button){
        button.classList.remove('active')
    })
    
    //colocar a class .active
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    //verificar se é sim ou noAuto
    input.value = button.dataset.value
}

function validate(event) {

    //validar se lat e lng estao preenchidos
    const needsLatAndLng = false; //DESAFIO
    if(needsLatAndLng) {    
        event.preventDefault()
        alert("Selecione um ponto no mapa")
    }
}
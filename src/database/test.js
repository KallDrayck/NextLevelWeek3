const db = require('./db.js');
const Database = require('./db.js');
const saveOrphanage = require('./saveOrphanage.js');

Database.then(async function(db) {
    // async vai dar a opção de você colocar o await que tem a função do then. Ele vai esperar todo o comando rodar para poder comerçar o proximo
    // inserir dados na tabela
    await saveOrphanage(db, {
        lat: "-22.6692493",
        lng: "-43.4349233",
        name: "Lar dos meninos",
        about: "Preste assistência a crianças que se encontram em situação de risco e/ou vulnerabilidade social",
        whatsapp: "21 99999-9888",
        images: [
            "https://source.unsplash.com/random?id=2",
            "https://source.unsplash.com/random?id=4"
        ].toString(),
        instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar",
        opening_hours: "Horário de visitas das 18h até 8h",
        open_on_weekends: "0"
    })
    

    // consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages");
    console.log(selectedOrphanages)

    // // consultar somente 1 orphanato, pelo id
    // const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "2"')
    // console.log(orphanage)

    // //deletar dado da tabela
    //Se colocar apanas DELETE FROM orphanages, vai delatar tudo
    // console.log(await db.run("DELETE FROM orphanages WHERE id = '4'")) 
    // console.log(await db.run("DELETE FROM orphanages"))
})
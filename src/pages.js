const Database = require('./database/db.js');
const saveOrphanage = require('./database/saveOrphanage.js');
module.exports = {

    index(requeste, response) {
        return response.render('index')
    },

    async orphanage(requeste, response) {

        const id = requeste.query.id;

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]
            // console.log(orphanage[0])

            orphanage.images = orphanage.images.split(",");
            // images esta como string precisamos transformar por array 
            // o split vai dividir sempre que achar nesse casa uma virgula
            orphanage.firstImage =orphanage.images[0];

            if(orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false 
            } else {
                orphanage.open_on_weekends = true
            }

            return response.render('orphanage', { orphanage })
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    },

    async orphanages(requeste, response) {
        //async antes porque temos o await
        //try{} catch (error) {} para caso de erro, tipo erro no servidor off, ou algum erro de sintaxe, erro de sql
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages")
            return response.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    },

    createOrphanages(requeste, response) {
        return response.render('create-orphanage')
    },
    
    async saveOrphanage(requeste, response){
        console.log(requeste.body)
        const fields = requeste.body

        //validade se todos os campos estão preenchidos
        console.log(Object.values(fields).includes('')) //se ele achar algo vazio vai retornar true
        if(Object.values(fields).includes('')){
            return response.send("Todos os campos devem ser preenchidos!")
        }

        try {
            //salvar um orfanato
            const db = await Database
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            //redirecionamento
            return response.redirect('/orphanages')

        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
        
    }
}
const Database = require('sqlite-async');
//importando na variavel, Database é um objeto
// Database.open(__dirname + '/database.sqlite').then(execute);
//estou pedindo para meu banco de dados sqlite, abra o dirname que é o database e vai criar o arquivo no diretorio
//só posso continuar depois que abrir a primeira vez o banco de dados
//.then significa então, apos abrir o tadabase "entao" .... no caso chama a function que é abrir o banco de dados
function execute(db){
    // console.log('Entrei nessa função')
    // linguagem sqlite dento do db.exec()
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `)
    //INTEGER é inteiro
    //db é um obejto, ele espera receber uma string, podendo ser '' "" ``.
    //O bom da crase é que ela permite variaveis e quebra de linhas
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute);
//module é um objeto que tem uma propriedade exports que vai pegar o resultado Database e jogar pra fora que é o db
import Dexie from "dexie";

const db = new Dexie("DbAthemes");
db.version(1).stores({
    data:'id,residence,dossier,prestation,edls',
});

export default db;
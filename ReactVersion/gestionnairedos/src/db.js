import Dexie from "dexie";

const db = new Dexie("DbAthemes");
db.version(1).stores({
    edl:'id,residence,dossier,prestation,edls',
    diag:'id,residence,dossier,prestation,diags',
});

export default db;
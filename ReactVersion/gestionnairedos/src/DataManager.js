import db from './db';

export const createClasseur = async (id,residence,dossier,prestation,edls) => {
  try {
    await db.data.add({id,residence,dossier,prestation,edls});
    console.log('Résidence créée');
  } catch (error) {
    console.error('Erreur création résidence :', error);
  }
};

export const getAllClasseurs = async () => {
  try {
    const data = await db.data.toArray();
    return data;
  } catch (error) {
    console.error('Erreur getAllClasseur :', error);
  }
};

export const getClasseur = async (id) => {
  try {
    const data = await db.data.get(id);
    return data;
  } catch (error) {
    console.error('Erreur getClasseur :', error);
  }
};

export const deleteClasseur = async (id) => {
  try {
    await db.data.delete(id);
    console.log('Data deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export const updateNomsClasseurs = async (id,residence,dossier,prestation) => {
  try {
    await db.data.update(id,{residence,dossier,prestation});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export const updateEdl = async (idResidence,id,numeroAppartement,typeAppartement,numeroBat,numeroEtage,pieces,observationsGenerales,observationsGeneralesOpr) => {
  try {
    const result = await getClasseur(idResidence);
    if (result.edls.findIndex((edl) => edl.id === id) !== -1) {
      const index = result.edls.findIndex((edl) => edl.id === id);
      result.edls[index] = {id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales,observationsGeneralesOpr:observationsGeneralesOpr};
    } else {
      result.edls.push({id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales,observationsGeneralesOpr:observationsGeneralesOpr});
    }
    await db.data.update(idResidence,{edls:result.edls});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

export const deleteEdl = async(idResidence,id) => {
  try {
    const result = await getClasseur(idResidence);
    const index = result.edls.findIndex((edl) => edl.id === id);
    result.edls.remove(result.edls[index]);
    await db.data.update(idResidence,{edls:result});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
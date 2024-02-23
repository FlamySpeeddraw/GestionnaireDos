import db from './db';

export const createClasseurEdl = async (id,residence,dossier,prestation,edls) => {
  try {
    await db.edl.add({id,residence,dossier,prestation,edls});
    console.log('Résidence créée');
  } catch (error) {
    console.error('Erreur création résidence :', error);
  }
};

export const getAllClasseursEdl = async () => {
  try {
    const data = await db.edl.toArray();
    return data;
  } catch (error) {
    console.error('Erreur getAllClasseur :', error);
  }
};

export const getClasseurEdl = async (id) => {
  try {
    const data = await db.edl.get(id);
    return data;
  } catch (error) {
    console.error('Erreur getClasseur :', error);
  }
};

export const deleteClasseurEdl = async (id) => {
  try {
    await db.edl.delete(id);
    console.log('Data deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export const updateNomsClasseursEdl = async (id,residence,dossier,prestation) => {
  try {
    await db.edl.update(id,{residence,dossier,prestation});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export const updateEdl = async (idResidence,id,numeroAppartement,typeAppartement,numeroBat,numeroEtage,pieces,observationsGenerales,observationsGeneralesOpr) => {
  try {
    const result = await getClasseurEdl(idResidence);
    if (result.edls.findIndex((edl) => edl.id === id) !== -1) {
      const index = result.edls.findIndex((edl) => edl.id === id);
      result.edls[index] = {id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales,observationsGeneralesOpr:observationsGeneralesOpr};
    } else {
      result.edls.push({id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales,observationsGeneralesOpr:observationsGeneralesOpr});
    }
    await db.edl.update(idResidence,{edls:result.edls});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

export const deleteEdl = async (idResidence,id) => {
  try {
    const result = await getClasseurEdl(idResidence);
    const index = result.edls.findIndex((edl) => edl.id === id);
    result.edls.splice(index,1);
    await db.edl.update(idResidence,result);
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

export const createClasseurDiag = async (id,residence,dossier,prestation,diags) => {
  try {
    await db.diag.add({id,residence,dossier,prestation,diags});
    console.log('Résidence créée');
  } catch (error) {
    console.error('Erreur création résidence :', error);
  }
};

export const getAllClasseursDiag = async () => {
  try {
    const data = await db.diag.toArray();
    return data;
  } catch (error) {
    console.error('Erreur getAllClasseur :', error);
  }
};

export const getClasseurDiag = async (id) => {
  try {
    const data = await db.diag.get(id);
    return data;
  } catch (error) {
    console.error('Erreur getClasseur :', error);
  }
};

export const deleteClasseurDiag = async (id) => {
  try {
    await db.diag.delete(id);
    console.log('Data deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export const updateNomsClasseursDiag = async (id,residence,dossier,prestation) => {
  try {
    await db.diag.update(id,{residence,dossier,prestation});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export const updateDiag = async (idResidence,id,numeroAppartement,typeAppartement,numeroBat,numeroEtage,pieces,observationsGenerales) => {
  try {
    const result = await getClasseurDiag(idResidence);
    if (result.diags.findIndex((diag) => diag.id === id) !== -1) {
      const index = result.diags.findIndex((diag) => diag.id === id);
      result.diags[index] = {id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales};
    } else {
      result.diags.push({id:id,numeroAppartement:numeroAppartement,typeAppartement:typeAppartement,numeroBat:numeroBat,numeroEtage:numeroEtage,pieces:pieces,observationsGenerales:observationsGenerales});
    }
    await db.diag.update(idResidence,{diags:result.diags});
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

export const deleteDiag = async(idResidence,id) => {
  try {
    const result = await getClasseurDiag(idResidence);
    const index = result.diags.findIndex((diag) => diag.id === id);
    result.diags.splice(index,1);
    await db.diag.update(idResidence,result);
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
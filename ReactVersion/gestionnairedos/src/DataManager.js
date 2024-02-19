import db from './db';

export const insertData = async (name, message) => {
  try {
    await db.data.add({ name, message });
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

export const getAllData = async () => {
  try {
    const data = await db.data.toArray();
    return data;
  } catch (error) {
    console.error('Error getting data:', error);
    return [];
  }
};

export const updateData = async (id, name, message) => {
  try {
    await db.data.update(id, { name, message });
    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export const deleteData = async (id) => {
  try {
    await db.data.delete(id);
    console.log('Data deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
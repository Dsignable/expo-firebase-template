import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

/**
 * Add a document to a collection
 * @param {string} collectionName - Collection name
 * @param {object} data - Document data
 * @returns {Promise<string>} Document ID
 */
export const addDocument = async (collectionName, data) => {
  try {
    // Add timestamp fields
    const dataWithTimestamp = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

/**
 * Set a document (create or replace) with a specific ID
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {object} data - Document data
 * @returns {Promise<void>}
 */
export const setDocument = async (collectionName, documentId, data) => {
  try {
    // Add timestamp fields
    const dataWithTimestamp = {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(doc(db, collectionName, documentId), dataWithTimestamp);
  } catch (error) {
    throw error;
  }
};

/**
 * Get a document by ID
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise<object|null>} Document data or null
 */
export const getDocument = async (collectionName, documentId) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, documentId));
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} Array of documents
 */
export const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

/**
 * Update a document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {object} data - Document data to update
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: serverTimestamp()
    };

    await updateDoc(doc(db, collectionName, documentId), dataWithTimestamp);
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    throw error;
  }
};

/**
 * Query documents from a collection
 * @param {string} collectionName - Collection name
 * @param {Array} conditions - Array of condition arrays [field, operator, value]
 * @param {Array} sortBy - Array of sort fields and directions [field, direction]
 * @param {number} limitCount - Number of documents to limit to
 * @param {object} startAfterDoc - Document to start after for pagination
 * @returns {Promise<Array>} Array of documents
 */
export const queryDocuments = async (
  collectionName,
  conditions = [],
  sortBy = [],
  limitCount = 100,
  startAfterDoc = null
) => {
  try {
    let q = collection(db, collectionName);
    
    // Add conditions
    if (conditions.length > 0) {
      const whereConditions = conditions.map(([field, operator, value]) => 
        where(field, operator, value)
      );
      q = query(q, ...whereConditions);
    }
    
    // Add sorting
    if (sortBy.length > 0) {
      const orderByConditions = sortBy.map(([field, direction]) => 
        orderBy(field, direction)
      );
      q = query(q, ...orderByConditions);
    }
    
    // Add limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    // Add pagination
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

/**
 * Subscribe to real-time updates on a document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {function} callback - Function to call when document updates
 * @returns {function} Unsubscribe function
 */
export const subscribeToDocument = (collectionName, documentId, callback) => {
  const unsubscribe = onSnapshot(doc(db, collectionName, documentId), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
  
  return unsubscribe;
};

/**
 * Subscribe to real-time updates on a collection
 * @param {string} collectionName - Collection name
 * @param {function} callback - Function to call when collection updates
 * @param {Array} conditions - Optional query conditions
 * @returns {function} Unsubscribe function
 */
export const subscribeToCollection = (collectionName, callback, conditions = []) => {
  let ref = collection(db, collectionName);
  
  if (conditions.length > 0) {
    const whereConditions = conditions.map(([field, operator, value]) => 
      where(field, operator, value)
    );
    ref = query(ref, ...whereConditions);
  }
  
  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(docs);
  });
  
  return unsubscribe;
}; 
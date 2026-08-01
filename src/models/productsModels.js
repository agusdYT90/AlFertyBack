import { db } from '../config/firebase.js';
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';
const colRef = collection(db, PRODUCTS_COLLECTION);

const mapProductDoc = (docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
});

export const ProductsModels = {

    async productsAll() {

        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(mapProductDoc);

    },

    async productsId(id) {

        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }

        return mapProductDoc(docSnap);
    },

    async productsDelete(id) {

        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }

        await deleteDoc(docRef);
        return { id };
    },

    async productsCreate(productData) {
        const requiere = ["name", "price", "stock"];
        const filtro = requiere.filter((x) => productData[x] === undefined);

        if (filtro.length) {
            const error = new Error(`Campos requeridos faltantes: ${filtro.join(", ")}`);
            error.status = 400;
            throw error;
        }

        let docRefNew;

        if (productData.id) {
            const docRef = doc(db, PRODUCTS_COLLECTION, productData.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const error = new Error("Ya existe un producto con ese ID");
                error.status = 409;
                throw error;
            }

            await setDoc(docRef, {
                name: String(productData.name),
                price: Number(productData.price),
                stock: Number(productData.stock),
                description: productData.description ? String(productData.description) : "",
                createdAt: new Date().toISOString()
            });

            docRefNew = docRef;

        }
        else {
            docRefNew = await addDoc(colRef, {
                name: String(productData.name),
                price: Number(productData.price),
                stock: Number(productData.stock),
                description: productData.description ? String(productData.description) : "",
                createdAt: new Date().toISOString()
            });
        }

        const created = await getDoc(docRefNew);
        return mapProductDoc(created);
    },

    async productsUpdate(productData) {
        if (!productData.id) {
            const error = new Error("Se requiere un id para actualizar");
            error.status = 400;
            throw error;
        }

        const docRef = doc(db, PRODUCTS_COLLECTION, productData.id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }

        const updateData = {
            ...productData,
            updatedAt: new Date().toISOString()
        };
        
        delete updateData.id;

        await updateDoc(docRef, updateData);

        const updated = await getDoc(docRef);
        return mapProductDoc(updated);
    }

};

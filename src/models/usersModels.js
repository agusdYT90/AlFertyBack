import { db } from '../config/firebase.js';
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';

const USERS_COLLECTION = 'usuarios';
const colRef = collection(db, USERS_COLLECTION);

const mapUserDoc = (docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
});

export const UsersModels = {

    async usersAll() {
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(mapUserDoc);
    },

    async usersId(email) {
        const docRef = doc(db, USERS_COLLECTION, email);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Usuario no encontrado");
            error.status = 404;
            throw error;
        }

        return mapUserDoc(docSnap);
    },

    async usersDelete(email) {
        const docRef = doc(db, USERS_COLLECTION, email);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Usuario no encontrado");
            error.status = 404;
            throw error;
        }

        await deleteDoc(docRef);
        return { email };
    },

    async usersCreate(userData) {
        const requiere = ["name", "email", "password"];
        const filtro = requiere.filter((x) => userData[x] === undefined);

        if (filtro.length) {
            const error = new Error(`Campos requeridos faltantes: ${filtro.join(", ")}`);
            error.status = 400;
            throw error;
        }

        let docRefNew;

        if (userData.email) {
            const docRef = doc(db, USERS_COLLECTION, userData.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const error = new Error("Ya existe un usuario con ese email");
                error.status = 409;
                throw error;
            }

            await setDoc(docRef, {
                name: String(userData.name),
                email: String(userData.email),
                password: String(userData.password),
                createdAt: new Date().toISOString()
            });

            docRefNew = docRef;

        }
        else {
            docRefNew = await addDoc(colRef, {
                name: String(userData.name),
                email: String(userData.email),
                password: String(userData.password),
                createdAt: new Date().toISOString()
            });
        }
        const created = await getDoc(docRefNew);
        return mapUserDoc(created);
    },

    async usersUpdate(userData) {
        if (!userData.email) {
            const error = new Error("Se requiere un email para actualizar");
            error.status = 400;
            throw error;
        }

        const docRef = doc(db, USERS_COLLECTION, userData.email);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const error = new Error("Usuario no encontrado");
            error.status = 404;
            throw error;
        }

        const updateData = {
            ...userData,
            updatedAt: new Date().toISOString()
        };
        
        delete updateData.email;

        await updateDoc(docRef, updateData);

        const updated = await getDoc(docRef);
        return mapUserDoc(updated);
    }

};

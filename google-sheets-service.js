// firebase-config.js - Configuración de Firebase (OPCIONAL)
const firebaseConfig = {
    apiKey: "AIzaSyA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    authDomain: "f1-2026-cup.firebaseapp.com",
    databaseURL: "https://f1-2026-cup-default-rtdb.firebaseio.com",
    projectId: "f1-2026-cup",
    storageBucket: "f1-2026-cup.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Inicializar Firebase si no está ya inicializado
if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    window.firebaseApp = firebase;
}

// Funciones de Firebase
const FirebaseService = {
    // Guardar datos en Firebase
    async saveData(path, data) {
        try {
            const db = firebase.database();
            const ref = db.ref(path).push();
            await ref.set(data);
            return { success: true, key: ref.key };
        } catch (error) {
            console.error('Error saving to Firebase:', error);
            return { success: false, error: error.message };
        }
    },

    // Obtener datos de Firebase
    async getData(path) {
        try {
            const db = firebase.database();
            const snapshot = await db.ref(path).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error getting from Firebase:', error);
            return null;
        }
    },

    // Actualizar datos en Firebase
    async updateData(path, data) {
        try {
            const db = firebase.database();
            await db.ref(path).update(data);
            return { success: true };
        } catch (error) {
            console.error('Error updating Firebase:', error);
            return { success: false, error: error.message };
        }
    },

    // Escuchar cambios en tiempo real
    listenToChanges(path, callback) {
        try {
            const db = firebase.database();
            return db.ref(path).on('value', (snapshot) => {
                callback(snapshot.val());
            });
        } catch (error) {
            console.error('Error listening to Firebase:', error);
            return null;
        }
    },

    // Dejar de escuchar
    stopListening(path, listener) {
        try {
            const db = firebase.database();
            db.ref(path).off('value', listener);
        } catch (error) {
            console.error('Error stopping Firebase listener:', error);
        }
    }
};

// Exportar para usar en app.js
window.FirebaseService = FirebaseService;
// service-worker.js
const CACHE_NAME = 'f1-2026-cup-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './firebase-config.js',
    './manifest.json',
    
    // Assets principales
    './assets/icon-192.png',
    './assets/icon-512.png',
    
    // Fuentes
    'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    
    // Firebase SDKs
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[Service Worker] Install completed');
                return self.skipWaiting();
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activation completed');
            return self.clients.claim();
        })
    );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
    // Ignorar peticiones de Firebase
    if (event.request.url.includes('firebaseio.com') ||
        event.request.url.includes('googleapis.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // No cache - fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the new resource
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Fallback para imágenes
                        if (event.request.destination === 'image') {
                            return caches.match('./assets/icon-192.png');
                        }
                        
                        // Fallback para páginas
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Manejar notificaciones push (opcional para futuras features)
self.addEventListener('push', (event) => {
    const title = 'F1 2026 Cup';
    const options = {
        body: event.data.text(),
        icon: './assets/icon-192.png',
        badge: './assets/icon-72.png',
        vibrate: [200, 100, 200],
        tag: 'f1-notification'
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
    );
});
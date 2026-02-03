const CACHE_NAME = 'f1-2026-cup-firebase-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    
    // Assets principales
    './assets/icon-192.png',
    './assets/icon-512.png',
    
    // Fuentes
    'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    
    // Firebase SDKs (usando la versión 10.7.1 que tienes en index.html)
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Firebase version...');
    
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
    console.log('[Service Worker] Activating Firebase version...');
    
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

// Interceptar peticiones de red - CORRECCIÓN IMPORTANTE
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // DEJAR PASAR las peticiones a Firebase (websockets y APIs)
    if (url.hostname.includes('firebaseio.com') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('gstatic.com')) {
        // Para Firebase, no usar cache, ir directamente a red
        return;
    }
    
    // Estrategia Cache First para los assets de la app
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si encontramos en cache, devolverlo
                if (cachedResponse) {
                    console.log('[SW] Cache hit:', event.request.url);
                    return cachedResponse;
                }
                
                // Si no está en cache, hacer fetch a la red
                console.log('[SW] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Verificar si es una respuesta válida
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clonar la respuesta para cachear
                        const responseToCache = networkResponse.clone();
                        
                        // Guardar en cache para futuras peticiones
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Solo cachear requests del mismo origen
                                if (event.request.url.startsWith(self.location.origin)) {
                                    cache.put(event.request, responseToCache);
                                }
                            });
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.log('[SW] Fetch failed:', error);
                        
                        // Fallbacks específicos
                        if (event.request.destination === 'image') {
                            return caches.match('./assets/icon-192.png');
                        }
                        
                        // Para páginas HTML, devolver la app shell
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                        
                        // Para CSS y JS, intentar cache
                        if (event.request.url.includes('.css') || event.request.url.includes('.js')) {
                            return caches.match(event.request);
                        }
                        
                        // En último caso, devolver página de error offline
                        return new Response(
                            '<h1>Offline</h1><p>La aplicación F1 2026 Cup está offline.</p>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    });
            })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE') {
        caches.keys().then(cacheNames => {
            event.ports[0].postMessage(cacheNames);
        });
    }
});

// Manejar notificaciones push (opcional)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const title = data.title || 'F1 2026 Cup';
    const options = {
        body: data.body || 'Nueva actualización',
        icon: './assets/icon-192.png',
        badge: './assets/icon-72.png',
        vibrate: [200, 100, 200],
        tag: 'f1-notification',
        data: data.url || './'
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data || './';
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // Buscar ventana abierta
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // Si no hay ventana abierta, abrir una nueva
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
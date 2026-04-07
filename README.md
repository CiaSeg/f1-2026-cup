# F1 2026 Cup

Una Aplicación Web Progresiva (PWA) diseñada para gestionar una competición privada de pronósticos de Fórmula 1 durante la temporada 2026. La aplicación está configurada para un duelo directo entre dos jugadores ("Varo" y "Cía") y permite llevar el seguimiento de las predicciones carrera a carrera y del campeonato mundial.

## Características Principales

* **Predicciones por Carrera:** Permite a los usuarios seleccionar su podio (1º, 2º y 3º) para cada uno de los 24 Grandes Premios de la temporada.
* **Apuestas del Mundial:** Sección dedicada para predecir el Top 3 final del Mundial de Pilotos y el Top 3 del Mundial de Constructores.
* **Panel de Administrador Protegido:** Un área exclusiva para introducir los resultados oficiales de la carrera (posiciones 1 a 22) y calcular los puntos de forma automatizada.
* **Sistema de Puntuación Dinámico:** Algoritmo personalizado que calcula puntos por aciertos exactos, posiciones en podio y un punto extra de "consolación" por cercanía.
* **Historial y Estadísticas:** Tablas de clasificación en tiempo real y un desglose detallado de los puntos obtenidos en cada Gran Premio.
* **PWA (Progressive Web App):** Instalable en dispositivos móviles para una experiencia nativa.
* **Base de datos en la Nube:** Integración con Firebase Realtime Database para almacenar pronósticos y resultados al instante.

## Sistema de Puntuación

La aplicación cuenta con un sistema de puntos automatizado y exhaustivo:

### Puntos por Carrera (Grandes Premios)
* **Acierto Exacto:**
  * 1º Posición: **5 puntos**
  * 2º Posición: **4 puntos**
  * 3º Posición: **3 puntos**
* **Acierto de Podio (Posición incorrecta):** Si el piloto termina en el podio pero no en la posición apostada, otorga **2 puntos**.
* **Punto de Cercanía (Extra):** Se otorga **1 punto** al jugador cuya apuesta tenga la menor diferencia matemática respecto a las posiciones reales de los pilotos al finalizar la carrera (solo aplicable si ambos jugadores han apostado).

### Puntos del Mundial (Final de Temporada)
* **Mundial de Pilotos:** * Acierto exacto: **15 pts** (1º), **12 pts** (2º), **9 pts** (3º).
  * Acierto en Top 3 (posición incorrecta): **6 pts**.
* **Mundial de Constructores:** * Acierto exacto: **10 pts** (1º), **8 pts** (2º), **6 pts** (3º).
  * Acierto en Top 3 (posición incorrecta): **4 pts**.

## Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6).
* **Backend / Base de Datos:** Firebase Realtime Database.
* **Diseño / UI:** FontAwesome Icons, diseño Mobile-First.

## Estructura del Proyecto

* `/assets/`: Contiene todas las imágenes de los pilotos (`/pilotos/`), escuderías (`/equipos/`) y mapas/banderas de los circuitos (`/circuitos/`).
* `app.js`: Archivo principal que contiene toda la lógica de negocio (clase `F1CupApp`), cálculos matemáticos y conexión a Firebase.
* `index.html`: Estructura base de la aplicación y modales.
* `style.css`: Estilos de la aplicación y diseño adaptativo.
* `manifest.json` y `service-worker.js`: Archivos de configuración para el funcionamiento como PWA.

---
*Desarrollado para la temporada 2026 de Fórmula 1.*

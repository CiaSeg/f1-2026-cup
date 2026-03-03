// app.js - VERSIÓN REFACTORIZADA, CORREGIDA Y MEJORADA
class F1CupApp {
    constructor() {
        console.log('🔄 Constructor F1CupApp iniciado');
        
        // Verificar que Firebase está disponible
        if (!window.db) {
            console.error('❌ CRÍTICO: Firebase no está inicializado');
            alert('Error: Firebase no está configurado. Recarga la página.');
            return;
        }
        
        this.db = window.db;
        console.log('✅ Firebase DB disponible');
        
        this.state = {
            currentUser: localStorage.getItem('f1_user') || 'Varo',
            currentPage: 'landing',
            currentTab: 'race',
            selectedGP: 2,
            selectedPodium: ['', '', ''],
            isAdmin: localStorage.getItem('f1_admin') === 'true',
            dataLoaded: false
        };

        // Datos estáticos
        this.data = {
            circuits: {
                "TEST Barcelona (26-30 Ene)": { 
                    nombre: "Circuit de Barcelona-Catalunya - Shakedown", 
                    bandera: "./assets/circuitos/es.png", 
                    mapa: "./assets/circuitos/barcelona.png",
                    fecha: "26-30 Enero"
                },
                "TEST Bahrein (11-13 Feb)": { 
                    nombre: "Sakhir - Preseason Testing", 
                    bandera: "./assets/circuitos/bh.png", 
                    mapa: "./assets/circuitos/bahrain.png",
                    fecha: "11-13 Feb"
                },
                "GP Australia (06-08 Mar)": { 
                    nombre: "Albert Park", 
                    bandera: "./assets/circuitos/au.png", 
                    mapa: "./assets/circuitos/australia.png",
                    fecha: "06-08 Mar"
                },
                "GP China (13-15 Mar)": { 
                    nombre: "Shanghai", 
                    bandera: "./assets/circuitos/cn.png", 
                    mapa: "./assets/circuitos/china.png",
                    fecha: "13-15 Mar"
                },
                "GP Japón (27-29 Mar)": { 
                    nombre: "Suzuka", 
                    bandera: "./assets/circuitos/jp.png", 
                    mapa: "./assets/circuitos/japan.png",
                    fecha: "27-29 Mar"
                },
                "GP Bahrein (10-12 Apr)": { 
                    nombre: "Bahrain Int.", 
                    bandera: "./assets/circuitos/bh.png", 
                    mapa: "./assets/circuitos/bahrain.png",
                    fecha: "10-12 Apr"
                },
                "GP Arabia Saudí (17-19 Apr)": { 
                    nombre: "Jeddah", 
                    bandera: "./assets/circuitos/sa.png", 
                    mapa: "./assets/circuitos/saudi.png",
                    fecha: "17-19 Apr"
                },
                "GP Miami (01-03 May)": { 
                    nombre: "Miami", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/miami.png",
                    fecha: "01-03 May"
                },
                "GP Canadá (22-24 May)": { 
                    nombre: "Gilles-Villeneuve", 
                    bandera: "./assets/circuitos/ca.png", 
                    mapa: "./assets/circuitos/canada.png",
                    fecha: "22-24 May"
                },
                "GP Mónaco (05-07 Jun)": { 
                    nombre: "Monaco", 
                    bandera: "./assets/circuitos/mc.png", 
                    mapa: "./assets/circuitos/monaco.png",
                    fecha: "05-07 Jun"
                },
                "GP Barcelona (12-14 Jun)": { 
                    nombre: "Catalunya", 
                    bandera: "./assets/circuitos/es.png", 
                    mapa: "./assets/circuitos/barcelona.png",
                    fecha: "12-14 Jun"
                },
                "GP Austria (26-28 Jun)": { 
                    nombre: "Red Bull Ring", 
                    bandera: "./assets/circuitos/at.png", 
                    mapa: "./assets/circuitos/austria.png",
                    fecha: "26-28 Jun"
                },
                "GP Gran Bretaña (03-05 Jul)": { 
                    nombre: "Silverstone", 
                    bandera: "./assets/circuitos/gb.png", 
                    mapa: "./assets/circuitos/britain.png",
                    fecha: "03-05 Jul"
                },
                "GP Bélgica (17-19 Jul)": { 
                    nombre: "Spa", 
                    bandera: "./assets/circuitos/be.png", 
                    mapa: "./assets/circuitos/belgium.png",
                    fecha: "17-19 Jul"
                },
                "GP Hungría (24-26 Jul)": { 
                    nombre: "Hungaroring", 
                    bandera: "./assets/circuitos/hu.png", 
                    mapa: "./assets/circuitos/hungary.png",
                    fecha: "24-26 Jul"
                },
                "GP Países Bajos (21-23 Aug)": { 
                    nombre: "Zandvoort", 
                    bandera: "./assets/circuitos/nl.png", 
                    mapa: "./assets/circuitos/dutch.png",
                    fecha: "21-23 Aug"
                },
                "GP Italia (04-06 Sep)": { 
                    nombre: "Monza", 
                    bandera: "./assets/circuitos/it.png", 
                    mapa: "./assets/circuitos/italy.png",
                    fecha: "04-06 Sep"
                },
                "GP España - Madrid (11-13 Sep)": { 
                    nombre: "IFEMA Madrid", 
                    bandera: "./assets/circuitos/es.png", 
                    mapa: "./assets/circuitos/madrid.png",
                    fecha: "11-13 Sep"
                },
                "GP Azerbaiyán (24-26 Sep)": { 
                    nombre: "Baku", 
                    bandera: "./assets/circuitos/az.png", 
                    mapa: "./assets/circuitos/baku.png",
                    fecha: "24-26 Sep"
                },
                "GP Singapur (09-11 Oct)": { 
                    nombre: "Marina Bay", 
                    bandera: "./assets/circuitos/sg.png", 
                    mapa: "./assets/circuitos/singapore.png",
                    fecha: "09-11 Oct"
                },
                "GP Austin USA (23-25 Oct)": { 
                    nombre: "COTA", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/austin.png",
                    fecha: "23-25 Oct"
                },
                "GP México (30 Oct - 01 Nov)": { 
                    nombre: "Hermanos Rodríguez", 
                    bandera: "./assets/circuitos/mx.png", 
                    mapa: "./assets/circuitos/mexico.png",
                    fecha: "30 Oct - 01 Nov"
                },
                "GP Brasil (06-08 Nov)": { 
                    nombre: "Interlagos", 
                    bandera: "./assets/circuitos/br.png", 
                    mapa: "./assets/circuitos/brazil.png",
                    fecha: "06-08 Nov"
                },
                "GP Las Vegas (19-21 Nov)": { 
                    nombre: "Las Vegas", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/vegas.png",
                    fecha: "19-21 Nov"
                },
                "GP Qatar (27-29 Nov)": { 
                    nombre: "Lusail", 
                    bandera: "./assets/circuitos/qa.png", 
                    mapa: "./assets/circuitos/qatar.png",
                    fecha: "27-29 Nov"
                },
                "GP Abu Dhabi (04-06 Dec)": { 
                    nombre: "Yas Marina", 
                    bandera: "./assets/circuitos/ae.png", 
                    mapa: "./assets/circuitos/abudhabi.png",
                    fecha: "04-06 Dec"
                }
            },
            drivers: {
                "Albon": { foto: "./assets/pilotos/albon.png", equipo: "Williams" },
                "Alonso": { foto: "./assets/pilotos/alonso.png", equipo: "Aston Martin" },
                "Antonelli": { foto: "./assets/pilotos/antonelli.png", equipo: "Mercedes" },
                "Bearman": { foto: "./assets/pilotos/bearman.png", equipo: "Haas" },
                "Bortoleto": { foto: "./assets/pilotos/bortoleto.png", equipo: "Audi" },
                "Bottas": { foto: "./assets/pilotos/bottas.png", equipo: "Cadillac" },
                "Colapinto": { foto: "./assets/pilotos/colapinto.png", equipo: "Alpine" },
                "Gasly": { foto: "./assets/pilotos/gasly.png", equipo: "Alpine" },
                "Hadjar": { foto: "./assets/pilotos/hadjar.png", equipo: "Red Bull" },
                "Hamilton": { foto: "./assets/pilotos/hamilton.png", equipo: "Ferrari" },
                "Hulkenberg": { foto: "./assets/pilotos/hulkenberg.png", equipo: "Audi" },
                "Lawson": { foto: "./assets/pilotos/lawson.png", equipo: "Racing Bulls" },
                "Leclerc": { foto: "./assets/pilotos/leclerc.png", equipo: "Ferrari" },
                "Lindblad": { foto: "./assets/pilotos/lindblad.png", equipo: "Racing Bulls" },
                "Norris": { foto: "./assets/pilotos/norris.png", equipo: "McLaren" },
                "Ocon": { foto: "./assets/pilotos/ocon.png", equipo: "Haas" },
                "Perez": { foto: "./assets/pilotos/perez.png", equipo: "Cadillac" },
                "Piastri": { foto: "./assets/pilotos/piastri.png", equipo: "McLaren" },
                "Russell": { foto: "./assets/pilotos/russell.png", equipo: "Mercedes" },
                "Sainz": { foto: "./assets/pilotos/sainz.png", equipo: "Williams" },
                "Stroll": { foto: "./assets/pilotos/stroll.png", equipo: "Aston Martin" },
                "Verstappen": { foto: "./assets/pilotos/verstappen.png", equipo: "Red Bull" }
            },
            constructors: [
                "Ferrari", "Mercedes", "Red Bull", "McLaren", 
                "Aston Martin", "Alpine", "Williams", "Haas",
                "Audi", "Cadillac", "Racing Bulls"
            ]
        };

        this.circuitsList = Object.keys(this.data.circuits);
        this.driversList = Object.keys(this.data.drivers).sort();
        
        // Datos cargados de Firebase
        this.firebaseData = {
            bets: [],
            results: [],
            seasonBets: [],
            points: { Varo: 0, Cía: 0 },
            finalResults: null
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando app...');
        
        // Configurar event listeners primero
        this.setupEventListeners();
        
        // Cargar datos de Firebase
        await this.loadFirebaseData();
        
        // Establecer un GP por defecto (el primer GP real si estamos en el valor inicial)
        const firstRealGP = this.circuitsList.findIndex(c => !c.includes('TEST'));
        if (firstRealGP !== -1 && this.state.selectedGP === 2) {
            this.state.selectedGP = firstRealGP;
        }
        
        // Mostrar la app
        setTimeout(() => {
            const loading = document.getElementById('loading');
            const app = document.getElementById('app');
            
            if (loading) loading.style.display = 'none';
            if (app) app.style.display = 'block';
            
            this.updateUI();
            this.scrollToTop();
            this.checkAdminStatus();
            
        }, 500);
    }

    // ==================== FIREBASE - MÉTODOS PRINCIPALES ====================
    
    async loadFirebaseData() {
        console.log('📥 Cargando datos de Firebase...');
        
        try {
            // Cargar todos los datos en paralelo para mayor eficiencia
            const [betsSnapshot, resultsSnapshot, seasonSnapshot, finalSnapshot] = await Promise.all([
                this.db.ref('bets').once('value'),
                this.db.ref('results').once('value'),
                this.db.ref('seasonBets').once('value'),
                this.db.ref('finalResults').once('value')
            ]);

            const betsData = betsSnapshot.val();
            this.firebaseData.bets = betsData ? Object.values(betsData) : [];
            
            const resultsData = resultsSnapshot.val();
            this.firebaseData.results = resultsData ? Object.values(resultsData) : [];
            
            const seasonData = seasonSnapshot.val();
            this.firebaseData.seasonBets = seasonData ? Object.values(seasonData) : [];
            
            this.firebaseData.finalResults = finalSnapshot.val() || null;
            
            console.log(`✅ Datos cargados: ${this.firebaseData.bets.length} apuestas, ${this.firebaseData.results.length} resultados`);
            this.state.dataLoaded = true;
            
        } catch (error) {
            console.error('❌ Error CRÍTICO cargando datos de Firebase:', error);
            this.state.dataLoaded = false;
            this.showNotification('⚠️ Error de conexión. Los datos podrían no estar actualizados.', 'error');
        }
    }

    async saveCurrentBet() {
        console.log('💾 Intentando guardar apuesta...');
        
        const currentGP = this.circuitsList[this.state.selectedGP];

        // Validación para sesiones de TEST
        if (currentGP.includes('TEST')) {
            this.showNotification('🚫 No se permiten apuestas en sesiones de TEST', 'error');
            return;
        }

        const user = this.state.currentUser;
        const selected = this.state.selectedPodium;
        
        // Validaciones
        if (!selected[0] || !selected[1] || !selected[2]) {
            this.showNotification('❌ Debes seleccionar 3 pilotos', 'error');
            return;
        }
        
        if (new Set(selected).size !== 3) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }
        
        // Crear ID único
        const betId = `bet_${user}_${currentGP.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
        
        const betData = {
            id: betId,
            Carrera: currentGP,
            Jugador: user,
            P1: selected[0],
            P2: selected[1],
            P3: selected[2],
            Fecha: new Date().toLocaleString('es-ES'),
            timestamp: Date.now()
        };
        
        try {
            // Guardar en Firebase
            await this.db.ref(`bets/${betId}`).set(betData);
            
            // Actualizar datos locales
            const existingIndex = this.firebaseData.bets.findIndex(b => 
                b.Carrera === currentGP && b.Jugador === user
            );
            
            if (existingIndex !== -1) {
                this.firebaseData.bets[existingIndex] = betData;
                this.showNotification('✅ Apuesta actualizada', 'success');
            } else {
                this.firebaseData.bets.push(betData);
                this.showNotification('✅ Apuesta guardada', 'success');
            }
            
            // Actualizar UI
            this.loadLastUserBet();
            this.loadUserBetForCurrentGP();
            
        } catch (error) {
            console.error('❌ Error guardando apuesta:', error);
            this.showNotification('❌ Error: ' + error.message, 'error');
        }
    }

    async saveSeasonBet() {
        const user = this.state.currentUser;
        
        const seasonData = {
            Jugador: user,
            D_P1: document.getElementById('season-p1').value,
            D_P2: document.getElementById('season-p2').value,
            D_P3: document.getElementById('season-p3').value,
            C_P1: document.getElementById('season-c1').value,
            C_P2: document.getElementById('season-c2').value,
            C_P3: document.getElementById('season-c3').value,
            Fecha: new Date().toLocaleString('es-ES'),
            timestamp: Date.now()
        };
        
        const drivers = [seasonData.D_P1, seasonData.D_P2, seasonData.D_P3];
        const constructors = [seasonData.C_P1, seasonData.C_P2, seasonData.C_P3];
        
        if (drivers.includes('') || constructors.includes('')) {
            this.showNotification('❌ Debes completar todas las selecciones', 'error');
            return;
        }
        
        if (new Set(drivers).size !== 3) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }
        
        if (new Set(constructors).size !== 3) {
            this.showNotification('❌ Los constructores deben ser diferentes', 'error');
            return;
        }
        
        const seasonId = `${user}_season`;
        
        try {
            await this.db.ref(`seasonBets/${seasonId}`).set(seasonData);
            
            const existingIndex = this.firebaseData.seasonBets.findIndex(bet => bet.Jugador === user);
            
            if (existingIndex !== -1) {
                this.firebaseData.seasonBets[existingIndex] = { id: seasonId, ...seasonData };
                this.showNotification('✅ Apuesta mundial actualizada', 'success');
            } else {
                this.firebaseData.seasonBets.push({ id: seasonId, ...seasonData });
                this.showNotification('✅ Apuesta mundial guardada', 'success');
            }
            
        } catch (error) {
            console.error('❌ Error guardando apuesta mundial:', error);
            this.showNotification('❌ Error guardando apuesta mundial', 'error');
        }
    }

    async publishFullResults() {
        console.log('🏁 Publicando resultados...');
        
        const gpSelect = document.getElementById('admin-gp-select');
        if (!gpSelect) {
            console.error('❌ Selector de carrera no encontrado');
            return;
        }
        
        const gpIndex = parseInt(gpSelect.value);
        const circuit = this.circuitsList[gpIndex];
        
        if (!circuit) {
            this.showNotification('❌ Debes seleccionar una carrera', 'error');
            return;
        }
        
        // Recoger resultados
        const results = {};
        const resultData = {
            Carrera: circuit,
            timestamp: Date.now(),
            publicadoPor: this.state.currentUser,
            fechaPublicacion: new Date().toLocaleString('es-ES')
        };
        
        let hasErrors = false;
        
        for (let i = 1; i <= 22; i++) {
            const select = document.querySelector(`[data-position="${i}"]`);
            const driver = select ? select.value : '';
            
            if (!driver) {
                this.showNotification(`❌ Falta seleccionar piloto para P${i}`, 'error');
                hasErrors = true;
                break;
            }
            
            results[i] = driver;
            resultData[`P${i}`] = driver;
        }
        
        if (hasErrors) return;
        
        // Verificar que todos los pilotos sean diferentes
        const drivers = Object.values(results);
        if (new Set(drivers).size !== 22) {
            this.showNotification('❌ Todos los pilotos deben ser diferentes', 'error');
            return;
        }
        
        const resultId = `result_${circuit.replace(/[^a-zA-Z0-9]/g, '_')}`;
        
        try {
            await this.db.ref(`results/${resultId}`).set(resultData);
            
            // Actualizar datos locales
            const existingIndex = this.firebaseData.results.findIndex(r => r.Carrera === circuit);
            if (existingIndex !== -1) {
                this.firebaseData.results[existingIndex] = { id: resultId, ...resultData };
            } else {
                this.firebaseData.results.push({ id: resultId, ...resultData });
            }
            
            this.showNotification('✅ Resultados publicados correctamente', 'success');
            
            // Calcular puntos automáticamente
            this.calculateAllPoints();
            
        } catch (error) {
            console.error('❌ Error publicando resultados:', error);
            this.showNotification('❌ Error: ' + error.message, 'error');
        }
    }

    async saveFinalResults() {
        const finalData = {
            D1: document.getElementById('final-d1').value,
            D2: document.getElementById('final-d2').value,
            D3: document.getElementById('final-d3').value,
            C1: document.getElementById('final-c1').value,
            C2: document.getElementById('final-c2').value,
            C3: document.getElementById('final-c3').value
        };

        // Validaciones básicas
        if (!finalData.D1 || !finalData.D2 || !finalData.D3 || !finalData.C1 || !finalData.C2 || !finalData.C3) {
            this.showNotification('❌ Debes completar todas las selecciones', 'error');
            return;
        }

        const drivers = [finalData.D1, finalData.D2, finalData.D3];
        const constructors = [finalData.C1, finalData.C2, finalData.C3];

        if (new Set(drivers).size !== 3) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }

        if (new Set(constructors).size !== 3) {
            this.showNotification('❌ Los constructores deben ser diferentes', 'error');
            return;
        }

        try {
            await this.db.ref('finalResults').set(finalData);
            this.firebaseData.finalResults = finalData;
            this.showNotification('🏆 Resultados finales guardados y puntos actualizados', 'success');
            this.calculateAllPoints(); // Recalcular puntos con los nuevos resultados
            this.refreshData(); // Recargar UI
        } catch (e) {
            console.error('Error guardando resultados finales:', e);
            this.showNotification('Error al guardar', 'error');
        }
    }

    // Busca el siguiente GP que NO sea TEST y que el usuario NO haya votado
    findNextUnvotedGP(user) {
        const nextGPIndex = this.circuitsList.findIndex(circuitName => {
            // 1. Ignorar tests
            if (circuitName.includes('TEST')) return false;

            // 2. Verificar si ya votó
            const alreadyBet = this.firebaseData.bets.some(bet => 
                bet.Carrera === circuitName && bet.Jugador === user
            );
            
            return !alreadyBet; // true = no ha votado
        });

        return nextGPIndex; // Devuelve -1 si no encuentra
    }

    // ==================== MÉTODOS BÁSICOS DE LA APP ====================
    
    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        
        // Botones principales
        const btnVaro = document.getElementById('btn-varo');
        if (btnVaro) btnVaro.onclick = () => this.selectUser('Varo');
        
        const btnCia = document.getElementById('btn-cia');
        if (btnCia) btnCia.onclick = () => this.selectUser('Cía');
        
        const btnBack = document.getElementById('btn-back');
        if (btnBack) btnBack.onclick = () => this.goToLanding();
        
        const btnRefresh = document.getElementById('btn-refresh');
        if (btnRefresh) btnRefresh.onclick = () => this.refreshData();
        
        const btnSaveBet = document.getElementById('btn-save-bet');
        if (btnSaveBet) btnSaveBet.onclick = () => this.saveCurrentBet();

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
                const tab = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tab);
            };
        });

        // Selector de GP
        const gpSelect = document.getElementById('gp-select');
        if (gpSelect) {
            gpSelect.onchange = (e) => {
                this.state.selectedGP = parseInt(e.target.value);
                this.updateCircuitInfo();
                this.loadUserBetForCurrentGP();
            };
        }

        // Selectores de pilotos
        ['p1', 'p2', 'p3'].forEach((pos, index) => {
            const select = document.getElementById(`${pos}-select`);
            if (select) {
                select.onchange = (e) => {
                    this.updatePodiumSelection(index, e.target.value);
                    this.updateDriverImage(`${pos}-img`, e.target.value);
                };
            }
        });

        // Botón admin
        const btnAdmin = document.getElementById('btn-admin');
        if (btnAdmin) {
            btnAdmin.onclick = () => this.toggleAdminMode();
        }
        
        const globalAdminBtn = document.getElementById('global-admin-btn');
        if (globalAdminBtn) {
            globalAdminBtn.onclick = () => {
                if (this.state.isAdmin) {
                    this.toggleAdminMode();
                } else {
                    document.getElementById('admin-overlay').style.display = 'flex';
                }
            };
        }
    }
    
    selectUser(user) {
        console.log(`👤 Seleccionando usuario: ${user}`);
        
        this.state.currentUser = user;
        localStorage.setItem('f1_user', user);
        
        const display = document.getElementById('current-user');
        if (display) {
            display.textContent = user.toUpperCase();
        }

        // Buscar el siguiente GP no votado
        const nextGPIndex = this.findNextUnvotedGP(user);

        if (nextGPIndex !== -1) {
            this.state.selectedGP = nextGPIndex;
            console.log(`🎯 Saltando automáticamente al GP: ${this.circuitsList[nextGPIndex]}`);
        } else {
            // Si ya votó todos, mostrar el último GP de la lista
            this.state.selectedGP = this.circuitsList.length - 1;
            console.log(`🏁 Ya votaste todos los GPs, mostrando el último`);
        }

        this.state.currentPage = 'main';
        this.updateUI();
        
        this.loadLastUserBet();
        // loadUserBetForCurrentGP se llamará dentro de loadMainApp
    }

    goToLanding() {
        console.log('🔙 Volviendo a landing page');
        this.state.currentPage = 'landing';
        this.updateUI();
    }

    updateUI() {
        const landing = document.getElementById('landing-page');
        const main = document.getElementById('main-page');
        
        if (landing && main) {
            if (this.state.currentPage === 'landing') {
                landing.style.display = 'flex';
                main.style.display = 'none';
            } else {
                landing.style.display = 'none';
                main.style.display = 'block';
                this.loadMainApp();
            }
        }
    }

    loadMainApp() {
        console.log(`🏁 Cargando MainApp para GP: ${this.circuitsList[this.state.selectedGP]}`);
        
        this.loadGPSelector();
        this.updateCircuitInfo();
        this.loadLastUserBet();
        this.loadDriverSelectors();
        this.loadUserBetForCurrentGP();
        this.loadTabContent(this.state.currentTab);
        
        this.updateAdminButton();
    }

    // ==================== SELECTORES Y FORMULARIOS ====================
    
    loadGPSelector() {
        const select = document.getElementById('gp-select');
        if (!select) return;
        
        select.innerHTML = '';
        
        this.circuitsList.forEach((circuit, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = circuit;
            select.appendChild(opt);
        });
        
        select.value = this.state.selectedGP;
    }

    updateCircuitInfo() {
        const circuitKey = this.circuitsList[this.state.selectedGP];
        const info = this.data.circuits[circuitKey];
        
        if (!info) return;
        
        // Actualizar elementos visuales del circuito
        const name = document.getElementById('circuit-name');
        const flag = document.getElementById('circuit-flag');
        const map = document.getElementById('circuit-map');
        const fecha = document.getElementById('circuit-fecha');
        
        if (name) name.textContent = info.nombre;
        if (flag) flag.src = info.bandera;
        if (map) map.src = info.mapa;
        if (fecha) fecha.textContent = info.fecha;

        // Control del botón de guardar para sesiones de TEST
        const currentGP = this.circuitsList[this.state.selectedGP];
        const saveBtn = document.getElementById('btn-save-bet');

        if (saveBtn) {
            if (currentGP.includes('TEST')) {
                saveBtn.style.opacity = '0.5';
                saveBtn.style.pointerEvents = 'none';
                saveBtn.innerHTML = '<i class="fas fa-ban"></i> APUESTAS CERRADAS';
            } else {
                saveBtn.style.opacity = '1';
                saveBtn.style.pointerEvents = 'auto';
                // El texto del botón se restaurará en loadUserBetForCurrentGP()
            }
        }
    }

    loadDriverSelectors() {
        ['p1', 'p2', 'p3'].forEach(pos => {
            const select = document.getElementById(`${pos}-select`);
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecciona piloto</option>';
            
            this.driversList.forEach(driver => {
                const opt = document.createElement('option');
                opt.value = driver;
                opt.textContent = driver;
                select.appendChild(opt);
            });
        });
    }

    updateDriverImage(imgId, driverName) {
        const img = document.getElementById(imgId);
        if (!img) return;
        
        if (driverName && this.data.drivers[driverName]) {
            img.src = this.data.drivers[driverName].foto;
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    }

    updatePodiumSelection(position, driver) {
        this.state.selectedPodium[position] = driver;
    }

    // ==================== GESTIÓN DE APUESTAS ====================
    
    loadLastUserBet() {
        const user = this.state.currentUser;
        const userBets = this.firebaseData.bets.filter(bet => bet.Jugador === user);
        
        if (userBets.length > 0) {
            // Ordenar por timestamp y obtener la más reciente
            const lastBet = userBets.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0];
            this.state.lastUserBet = lastBet;
            
            const card = document.getElementById('last-bet-card');
            if (card) {
                card.style.display = 'block';
                
                const raceName = document.getElementById('last-bet-race');
                if (raceName) {
                    raceName.textContent = lastBet.Carrera.split(' (')[0];
                }
                
                const drivers = [
                    { id: 'last-bet-p1-img', name: lastBet.P1 },
                    { id: 'last-bet-p2-img', name: lastBet.P2 },
                    { id: 'last-bet-p3-img', name: lastBet.P3 }
                ];
                
                drivers.forEach(driver => {
                    const img = document.getElementById(driver.id);
                    if (img && driver.name && this.data.drivers[driver.name]) {
                        img.src = this.data.drivers[driver.name].foto;
                        img.alt = driver.name;
                        img.style.display = 'block';
                    }
                });
            }
        } else {
            const card = document.getElementById('last-bet-card');
            if (card) {
                card.style.display = 'none';
            }
        }
    }

    loadUserBetForCurrentGP() {
        const currentGP = this.circuitsList[this.state.selectedGP];
        const user = this.state.currentUser;
        
        const existingBet = this.firebaseData.bets.find(bet => 
            bet.Carrera === currentGP && bet.Jugador === user
        );
        
        if (existingBet) {
            this.state.selectedPodium = [
                existingBet.P1,
                existingBet.P2,
                existingBet.P3
            ];
            
            ['p1', 'p2', 'p3'].forEach((pos, index) => {
                const select = document.getElementById(`${pos}-select`);
                const img = document.getElementById(`${pos}-img`);
                
                if (select) select.value = this.state.selectedPodium[index];
                if (img && this.state.selectedPodium[index]) {
                    const driverData = this.data.drivers[this.state.selectedPodium[index]];
                    if (driverData && driverData.foto) {
                        img.src = driverData.foto;
                        img.style.display = 'block';
                    }
                }
            });
            
            const saveBtn = document.getElementById('btn-save-bet');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ACTUALIZAR APUESTA';
            }
        } else {
            this.state.selectedPodium = ['', '', ''];
            
            ['p1', 'p2', 'p3'].forEach(pos => {
                const select = document.getElementById(`${pos}-select`);
                const img = document.getElementById(`${pos}-img`);
                
                if (select) select.value = '';
                if (img) img.style.display = 'none';
            });
            
            const saveBtn = document.getElementById('btn-save-bet');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> GUARDAR APUESTA';
            }
        }
    }

    // ==================== GESTIÓN DE TABS ====================
    
    switchTab(tab) {
        this.state.currentTab = tab;
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tab}`);
        });
        
        this.loadTabContent(tab);
        this.scrollToTop();
    }

    loadTabContent(tab) {
        switch(tab) {
            case 'race':
                // Ya está cargado
                break;
            case 'season':
                this.loadSeasonTab();
                break;
            case 'points':
                this.loadPointsTab();
                break;
            case 'admin':
                this.loadAdminPanel();
                break;
            case 'history':
                this.loadHistoryTab();
                break;
        }
    }

    // ==================== PESTAÑA TEMPORADA ====================
    
    loadSeasonTab() {
        const tabContent = document.getElementById('tab-season');
        if (!tabContent) return;
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🏆 APUESTAS MUNDIALES 2026</p>
                
                <div class="season-section">
                    <h4><i class="fas fa-user"></i> PILOTOS</h4>
                    <div class="podium-item">
                        <div class="driver-image-container">
                            <img id="season-p1-img" src="" class="driver-img" style="display:none">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CAMPEÓN DEL MUNDO (15 pts)</label>
                            <select id="season-p1" class="form-select">
                                <option value="">Selecciona piloto</option>
                                ${this.driversList.map(driver => `<option value="${driver}">${driver}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="podium-item mt-20">
                        <div class="driver-image-container">
                            <img id="season-p2-img" src="" class="driver-img" style="display:none">
                        </div>
                        <div class="form-group">
                            <label class="form-label">SUBCAMPEÓN (12 pts)</label>
                            <select id="season-p2" class="form-select">
                                <option value="">Selecciona piloto</option>
                                ${this.driversList.map(driver => `<option value="${driver}">${driver}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="podium-item mt-20">
                        <div class="driver-image-container">
                            <img id="season-p3-img" src="" class="driver-img" style="display:none">
                        </div>
                        <div class="form-group">
                            <label class="form-label">TERCER LUGAR (9 pts)</label>
                            <select id="season-p3" class="form-select">
                                <option value="">Selecciona piloto</option>
                                ${this.driversList.map(driver => `<option value="${driver}">${driver}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="season-section mt-20">
                    <h4><i class="fas fa-car"></i> CONSTRUCTORES</h4>
                    <div class="podium-item">
                        <div class="driver-image-container team-container">
                            <img id="season-c1-img" src="" class="driver-img" style="display:none; object-fit: contain; padding: 10px;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CAMPEÓN (10 pts)</label>
                            <select id="season-c1" class="form-select">
                                <option value="">Selecciona equipo</option>
                                ${this.data.constructors.map(team => `<option value="${team}">${team}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="podium-item mt-20">
                        <div class="driver-image-container team-container">
                            <img id="season-c2-img" src="" class="driver-img" style="display:none; object-fit: contain; padding: 10px;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">SUBCAMPEÓN (8 pts)</label>
                            <select id="season-c2" class="form-select">
                                <option value="">Selecciona equipo</option>
                                ${this.data.constructors.map(team => `<option value="${team}">${team}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="podium-item mt-20">
                        <div class="driver-image-container team-container">
                            <img id="season-c3-img" src="" class="driver-img" style="display:none; object-fit: contain; padding: 10px;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">TERCER LUGAR (6 pts)</label>
                            <select id="season-c3" class="form-select">
                                <option value="">Selecciona equipo</option>
                                ${this.data.constructors.map(team => `<option value="${team}">${team}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                
                <button id="btn-save-season" class="btn btn-primary w-100 mt-20">
                    <i class="fas fa-trophy"></i> GUARDAR APUESTA MUNDIAL
                </button>
            </div>
        `;
        
        // Asignar event listeners
        document.getElementById('season-p1').addEventListener('change', (e) => this.updateSeasonImage('season-p1-img', e.target.value, 'driver'));
        document.getElementById('season-p2').addEventListener('change', (e) => this.updateSeasonImage('season-p2-img', e.target.value, 'driver'));
        document.getElementById('season-p3').addEventListener('change', (e) => this.updateSeasonImage('season-p3-img', e.target.value, 'driver'));
        document.getElementById('season-c1').addEventListener('change', (e) => this.updateSeasonImage('season-c1-img', e.target.value, 'team'));
        document.getElementById('season-c2').addEventListener('change', (e) => this.updateSeasonImage('season-c2-img', e.target.value, 'team'));
        document.getElementById('season-c3').addEventListener('change', (e) => this.updateSeasonImage('season-c3-img', e.target.value, 'team'));
        document.getElementById('btn-save-season').onclick = () => this.saveSeasonBet();
        
        this.loadExistingSeasonBet();
    }

    loadExistingSeasonBet() {
        const user = this.state.currentUser;
        const existingBet = this.firebaseData.seasonBets.find(bet => bet.Jugador === user);
        
        if (existingBet) {
            const fields = [
                { id: 'season-p1', val: existingBet.D_P1, img: 'season-p1-img', type: 'driver' },
                { id: 'season-p2', val: existingBet.D_P2, img: 'season-p2-img', type: 'driver' },
                { id: 'season-p3', val: existingBet.D_P3, img: 'season-p3-img', type: 'driver' },
                { id: 'season-c1', val: existingBet.C_P1, img: 'season-c1-img', type: 'team' },
                { id: 'season-c2', val: existingBet.C_P2, img: 'season-c2-img', type: 'team' },
                { id: 'season-c3', val: existingBet.C_P3, img: 'season-c3-img', type: 'team' }
            ];

            fields.forEach(field => {
                const el = document.getElementById(field.id);
                if (el) {
                    el.value = field.val || '';
                    this.updateSeasonImage(field.img, field.val, field.type);
                }
            });
            
            const saveBtn = document.getElementById('btn-save-season');
            if (saveBtn) saveBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ACTUALIZAR APUESTA MUNDIAL';
        }
    }

    updateSeasonImage(imgId, value, type) {
        const img = document.getElementById(imgId);
        if (!img) return;

        if (!value) {
            img.style.display = 'none';
            return;
        }

        if (type === 'driver') {
            const driverData = this.data.drivers[value];
            if (driverData && driverData.foto) {
                img.src = driverData.foto;
                img.style.display = 'block';
            }
        } else if (type === 'team') {
            // Intenta cargar la imagen del equipo (convierte el nombre a formato de archivo)
            const teamFileName = value.toLowerCase().replace(/\s+/g, '-');
            img.src = `./assets/equipos/${teamFileName}.png`;
            img.style.display = 'block';
            img.onerror = () => { 
                img.style.display = 'none';
                console.log(`Imagen no encontrada para equipo: ${value}`);
            };
        }
    }

    // ==================== CÁLCULO DE RENDIMIENTO Y PUNTOS ====================

    calculateRacePerformance(bet, result) {
        const realPodium = [result.P1, result.P2, result.P3];
        const betPodium = [bet.P1, bet.P2, bet.P3];
        
        let exactMatches = 0;
        let podioIncorrecto = 0;
        let positionDifference = 0;

        // 1 & 2. Aciertos Exactos y Podio Incorrecto (Lógica Exclusiva)
        for (let i = 0; i < 3; i++) {
            if (betPodium[i] === realPodium[i]) {
                exactMatches++;
            } else if (realPodium.includes(betPodium[i])) {
                podioIncorrecto++;
            }
        }

        // 3. Diferencia Real con TODOS los puestos (1-22)
        betPodium.forEach((piloto, index) => {
            const posicionApostada = index + 1; // 1, 2 o 3
            let posicionReal = 22; // Por defecto 22 si no se encuentra
            
            // Buscar en QUÉ PUESTO REAL terminó el piloto (P1 a P22)
            for (let p = 1; p <= 22; p++) {
                if (result[`P${p}`] === piloto) {
                    posicionReal = p;
                    break;
                }
            }
            
            // Diferencia absoluta: |posición apostada - posición real|
            const diferencia = Math.abs(posicionApostada - posicionReal);
            positionDifference += diferencia;
        });

        // 4. Cálculo de Puntos
        let pExactos = 0;
        if (exactMatches === 1) pExactos = 5;
        else if (exactMatches === 2) pExactos = 4;
        else if (exactMatches === 3) pExactos = 3;

        const pPodio = podioIncorrecto * 2;

        return {
            exactMatches,
            podioIncorrecto,
            positionDifference,
            puntosExactos: pExactos,
            puntosPodio: pPodio,
            puntosTotales: pExactos + pPodio
        };
    }

    calculateAllPoints() {
        // 1. Reiniciar puntos de los jugadores
        this.firebaseData.points = { Varo: 0, Cía: 0 };
        
        // 2. CÁLCULO DE PUNTOS POR CARRERAS INDIVIDUALES
        this.firebaseData.results.forEach(result => {
            const carrera = result.Carrera;
            
            // Buscar apuestas para esta carrera
            const betsForRace = this.firebaseData.bets.filter(bet => bet.Carrera === carrera);
            let diffs = {};

            betsForRace.forEach(bet => {
                const stats = this.calculateRacePerformance(bet, result);
                this.firebaseData.points[bet.Jugador] += stats.puntosTotales;
                diffs[bet.Jugador] = stats.positionDifference;
            });

            // Punto extra por cercanía (Diferencia menor)
            if (diffs.Varo !== undefined && diffs.Cía !== undefined) {
                if (diffs.Varo < diffs.Cía) this.firebaseData.points.Varo += 1;
                else if (diffs.Cía < diffs.Varo) this.firebaseData.points.Cía += 1;
            }
        });

        // 3. CÁLCULO DE PUNTOS POR MUNDIAL (SISTEMA EXCLUSIVO)
        const final = this.firebaseData.finalResults;
        if (final) {
            this.firebaseData.seasonBets.forEach(bet => {
                const player = bet.Jugador;
                
                // --- MUNDIAL PILOTOS ---
                const realDrivers = [final.D1, final.D2, final.D3];
                const betDrivers = [bet.D_P1, bet.D_P2, bet.D_P3];

                betDrivers.forEach((driver, index) => {
                    if (!driver) return;
                    
                    if (driver === realDrivers[index]) {
                        // Si acierta posición exacta
                        if (index === 0) this.firebaseData.points[player] += 15;
                        else if (index === 1) this.firebaseData.points[player] += 12;
                        else if (index === 2) this.firebaseData.points[player] += 9;
                    } 
                    else if (realDrivers.includes(driver)) {
                        // Si está en el podio pero en lugar equivocado
                        this.firebaseData.points[player] += 6;
                    }
                });

                // --- MUNDIAL CONSTRUCTORES ---
                const realTeams = [final.C1, final.C2, final.C3];
                const betTeams = [bet.C_P1, bet.C_P2, bet.C_P3];

                betTeams.forEach((team, index) => {
                    if (!team) return;

                    if (team === realTeams[index]) {
                        // Si acierta posición exacta
                        if (index === 0) this.firebaseData.points[player] += 10;
                        else if (index === 1) this.firebaseData.points[player] += 8;
                        else if (index === 2) this.firebaseData.points[player] += 6;
                    } 
                    else if (realTeams.includes(team)) {
                        // Si está en el podio pero en lugar equivocado
                        this.firebaseData.points[player] += 4;
                    }
                });
            });
        }
        
        console.log("📊 Puntos recalculados correctamente:", this.firebaseData.points);
    }

    // ==================== PESTAÑA HISTORIAL ====================

    loadHistoryTab() {
        const tabContent = document.getElementById('tab-history');
        if (!tabContent) return;

        // Calcular estadísticas de jugadores
        const playerStats = this.calculateAllPlayerStats();

        // Generar HTML de detalles de carreras
        const raceDetailsHTML = this.generateRaceDetailsHTML();

        // Renderizar
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">📊 TABLA DE PUNTOS ACUMULADOS</p>
                ${this.renderPointsTable(playerStats)}
                
                <p class="sub-text mt-30">🏁 DETALLE DE CARRERAS</p>
                <div class="history-races-container" style="margin-top: 15px;">
                    ${raceDetailsHTML || '<div class="no-results">Esperando resultados oficiales...</div>'}
                </div>
                
                <button onclick="window.f1App.refreshData()" class="btn btn-secondary w-100 mt-20">
                    <i class="fas fa-redo"></i> ACTUALIZAR DATOS
                </button>
            </div>
        `;
    }

    calculateAllPlayerStats() {
        const desglose = {
            Varo: { exactos: 0, podio: 0, diferencia: 0, mundial: 0, total: 0 },
            Cía: { exactos: 0, podio: 0, diferencia: 0, mundial: 0, total: 0 }
        };

        // Puntos por carrera
        this.firebaseData.results.forEach(result => {
            const carrera = result.Carrera;
            const betsForRace = this.firebaseData.bets.filter(bet => bet.Carrera === carrera);
            let diffs = {};

            betsForRace.forEach(bet => {
                const stats = this.calculateRacePerformance(bet, result);
                desglose[bet.Jugador].exactos += stats.puntosExactos;
                desglose[bet.Jugador].podio += stats.puntosPodio;
                diffs[bet.Jugador] = stats.positionDifference;
            });

            // Punto extra por cercanía
            if (diffs.Varo !== undefined && diffs.Cía !== undefined) {
                if (diffs.Varo < diffs.Cía) desglose.Varo.diferencia += 1;
                else if (diffs.Cía < diffs.Varo) desglose.Cía.diferencia += 1;
            }
        });

        // Puntos del mundial (si existen)
        if (this.firebaseData.finalResults) {
            const final = this.firebaseData.finalResults;
            this.firebaseData.seasonBets.forEach(bet => {
                const player = bet.Jugador;
                let ptsM = 0;
                
                // Pilotos
                const rD = [final.D1, final.D2, final.D3];
                const bD = [bet.D_P1, bet.D_P2, bet.D_P3];
                bD.forEach((d, i) => {
                    if (!d) return;
                    if (d === rD[i]) ptsM += (i===0?15:i===1?12:9);
                    else if (rD.includes(d)) ptsM += 6;
                });
                
                // Constructores
                const rC = [final.C1, final.C2, final.C3];
                const bC = [bet.C_P1, bet.C_P2, bet.C_P3];
                bC.forEach((c, i) => {
                    if (!c) return;
                    if (c === rC[i]) ptsM += (i===0?10:i===1?8:6);
                    else if (rC.includes(c)) ptsM += 4;
                });
                
                desglose[player].mundial = ptsM;
            });
        }

        // Calcular totales
        Object.keys(desglose).forEach(p => {
            desglose[p].total = desglose[p].exactos + desglose[p].podio + desglose[p].diferencia + desglose[p].mundial;
        });

        return desglose;
    }

    generateRaceDetailsHTML() {
        let html = '';
        const resultados = [...this.firebaseData.results].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        resultados.forEach(result => {
            const carrera = result.Carrera;
            const carreraNombre = carrera.split(' (')[0];
            const betsForRace = this.firebaseData.bets.filter(bet => bet.Carrera === carrera);
            
            let infoPlayers = { Varo: null, Cía: null };
            let diffs = {};

            betsForRace.forEach(bet => {
                const stats = this.calculateRacePerformance(bet, result);
                const player = bet.Jugador;
                
                infoPlayers[player] = {
                    voto: [bet.P1, bet.P2, bet.P3].join(' - '),
                    resumen: `🎯 ${stats.exactMatches} exactos (${stats.puntosExactos}pts) | 🥉 ${stats.podioIncorrecto} podio inc. (${stats.puntosPodio}pts) | 📏 Dif: ${stats.positionDifference}`,
                    diff: stats.positionDifference,
                    puntos: stats.puntosTotales
                };
                diffs[player] = stats.positionDifference;
            });

            // Añadir indicador de punto extra si corresponde
            if (infoPlayers.Varo && infoPlayers.Cía) {
                if (diffs.Varo < diffs.Cía) infoPlayers.Varo.resumen += " ⭐ (+1 Dif)";
                else if (diffs.Cía < diffs.Varo) infoPlayers.Cía.resumen += " ⭐ (+1 Dif)";
            }

            html += `
                <div class="history-race-card" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 15px; border-left: 4px solid var(--f1-red);">
                    <div style="font-weight: 900; color: var(--f1-red); text-transform: uppercase; margin-bottom: 10px; font-size: 1rem;">${carreraNombre}</div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; margin-bottom: 12px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.1);">
                        <span style="color: #aaa;">🏁 PODIO REAL:</span> <strong style="color: #fff;">${result.P1} - ${result.P2} - ${result.P3}</strong>
                    </div>

                    <div style="display: grid; gap: 10px;">
                        <div style="padding-left: 10px; border-left: 3px solid #FFD700; background: rgba(255, 215, 0, 0.03); padding-top: 5px; padding-bottom: 5px;">
                            <div style="font-size: 0.85rem; color: #FFD700; font-weight: bold; margin-bottom: 2px;">VARO APOSTÓ: <span style="color: #eee; font-weight: normal;">${infoPlayers.Varo ? infoPlayers.Varo.voto : '---'}</span></div>
                            <div style="font-size: 0.75rem; color: #bbb;">${infoPlayers.Varo ? infoPlayers.Varo.resumen : 'Sin apuesta'}</div>
                        </div>
                        
                        <div style="padding-left: 10px; border-left: 3px solid #00D4FF; background: rgba(0, 212, 255, 0.03); padding-top: 5px; padding-bottom: 5px;">
                            <div style="font-size: 0.85rem; color: #00D4FF; font-weight: bold; margin-bottom: 2px;">CÍA APOSTÓ: <span style="color: #eee; font-weight: normal;">${infoPlayers.Cía ? infoPlayers.Cía.voto : '---'}</span></div>
                            <div style="font-size: 0.75rem; color: #bbb;">${infoPlayers.Cía ? infoPlayers.Cía.resumen : 'Sin apuesta'}</div>
                        </div>
                    </div>

                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; color: var(--f1-red); font-weight: bold; text-align: right; letter-spacing: 0.5px;">
                        PUNTOS CARRERA: VARO ${infoPlayers.Varo ? infoPlayers.Varo.puntos : 0} | CÍA ${infoPlayers.Cía ? infoPlayers.Cía.puntos : 0}
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    renderPointsTable(desglose) {
        return `
            <table class="bets-table" style="width: 100%; border-collapse: collapse; margin: 15px 0; background: rgba(255,255,255,0.03); border-radius: 10px; overflow: hidden;">
                <thead>
                    <tr>
                        <th style="background: rgba(225,6,0,0.2); color: var(--f1-red); padding: 15px; text-align: left; font-weight: 700; text-transform: uppercase; font-size: 0.9rem;">Concepto</th>
                        <th style="color: #FFD700; text-align: center;">VARO</th>
                        <th style="color: #00D4FF; text-align: center;">CÍA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Aciertos Exactos</td>
                        <td style="text-align: center; color: #FFD700; font-weight: bold;">${desglose.Varo.exactos} pts</td>
                        <td style="text-align: center; color: #00D4FF; font-weight: bold;">${desglose.Cía.exactos} pts</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Podio (Lugar Inc.)</td>
                        <td style="text-align: center; color: #FFD700; font-weight: bold;">${desglose.Varo.podio} pts</td>
                        <td style="text-align: center; color: #00D4FF; font-weight: bold;">${desglose.Cía.podio} pts</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Puntos Extra Dif.</td>
                        <td style="text-align: center; color: #FFD700; font-weight: bold;">${desglose.Varo.diferencia} pts</td>
                        <td style="text-align: center; color: #00D4FF; font-weight: bold;">${desglose.Cía.diferencia} pts</td>
                    </tr>
                    ${desglose.Varo.mundial > 0 || desglose.Cía.mundial > 0 ? `
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Mundial (Season)</td>
                        <td style="text-align: center; color: #FFD700; font-weight: bold;">${desglose.Varo.mundial} pts</td>
                        <td style="text-align: center; color: #00D4FF; font-weight: bold;">${desglose.Cía.mundial} pts</td>
                    </tr>
                    ` : ''}
                    <tr style="background: rgba(225,6,0,0.15);">
                        <td style="padding: 15px; font-weight: 900;">TOTAL</td>
                        <td style="text-align: center; font-weight: 900; color: #FFD700; font-size: 1.1rem;">${desglose.Varo.total} pts</td>
                        <td style="text-align: center; font-weight: 900; color: #00D4FF; font-size: 1.1rem;">${desglose.Cía.total} pts</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    // ==================== PESTAÑA PUNTOS ====================
    
    loadPointsTab() {
        this.calculateAllPoints();
        
        const tabContent = document.getElementById('tab-points');
        if (!tabContent) return;
        
        const sortedPlayers = Object.entries(this.firebaseData.points)
            .sort((a, b) => b[1] - a[1]);
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">📊 CLASIFICACIÓN 2026</p>
                <div class="points-table mt-20">
                    ${sortedPlayers.map(([player, points], index) => `
                        <div class="points-row ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}">
                            <div class="position">${index + 1}º</div>
                            <div class="player-name">${player}</div>
                            <div class="points">${points} pts</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="points-info mt-20">
                    <p class="sub-text" style="font-size: 0.8rem; margin-bottom: 10px;">SISTEMA DE PUNTOS</p>
                    <div class="points-rules">
                        <div class="rule-item">
                            <span class="rule-point">5 pts</span>
                            <span class="rule-text">1 acierto exacto</span>
                        </div>
                        <div class="rule-item">
                            <span class="rule-point">4 pts</span>
                            <span class="rule-text">2 aciertos exactos</span>
                        </div>
                        <div class="rule-item">
                            <span class="rule-point">3 pts</span>
                            <span class="rule-text">3 aciertos exactos</span>
                        </div>
                        <div class="rule-item">
                            <span class="rule-point">2 pts</span>
                            <span class="rule-text">Cada piloto en podio</span>
                        </div>
                        <div class="rule-item">
                            <span class="rule-point">1 pt</span>
                            <span class="rule-text">Menor diferencia de posiciones</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== ADMIN ====================
    
    updateAdminButton() {
        const adminBtn = document.getElementById('btn-admin');
        if (adminBtn) {
            adminBtn.style.display = this.state.isAdmin ? 'inline-block' : 'none';
        }
        
        const adminTab = document.querySelector('[data-tab="admin"]');
        if (adminTab) {
            adminTab.style.display = this.state.isAdmin ? 'flex' : 'none';
        }
        
        const globalAdminBtn = document.getElementById('global-admin-btn');
        if (globalAdminBtn) {
            if (this.state.isAdmin) {
                globalAdminBtn.classList.add('active');
                globalAdminBtn.innerHTML = '<i class="fas fa-crown"></i><span>ADMIN ACTIVO</span>';
            } else {
                globalAdminBtn.classList.remove('active');
                globalAdminBtn.innerHTML = '<i class="fas fa-crown"></i><span>ADMIN</span>';
            }
        }
    }

    checkAdminStatus() {
        const isAdmin = localStorage.getItem('f1_admin') === 'true';
        const adminTab = document.querySelector('[data-tab="admin"]');
        const adminBtn = document.getElementById('global-admin-btn');
        
        if (isAdmin) {
            if (adminTab) adminTab.style.display = 'flex';
            if (adminBtn) adminBtn.classList.add('active');
        } else {
            if (adminTab) adminTab.style.display = 'none';
            if (adminBtn) adminBtn.classList.remove('active');
        }
        
        this.state.isAdmin = isAdmin;
    }

    toggleAdminMode() {
        this.state.isAdmin = !this.state.isAdmin;
        localStorage.setItem('f1_admin', this.state.isAdmin);
        this.updateAdminButton();
        
        if (this.state.isAdmin) {
            this.showNotification('🔧 Modo administrador activado', 'success');
        } else {
            this.showNotification('👤 Modo usuario activado', 'info');
        }
    }

    loadAdminPanel() {
        const tabContent = document.getElementById('tab-admin');
        if (!tabContent) return;
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🔧 PANEL ADMINISTRADOR</p>
                
                <div class="admin-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>PUBLICAR RESULTADOS OFICIALES</h4>
                    <p>Completa TODOS los puestos (1-22) y publica resultados.</p>
                </div>
                
                <div class="admin-section mt-20">
                    <h4><i class="fas fa-flag-checkered"></i> RESULTADOS DE CARRERA</h4>
                    
                    <div class="form-group">
                        <label class="form-label">SELECCIONA CARRERA</label>
                        <select id="admin-gp-select" class="form-select">
                            ${this.circuitsList.map((circuit, index) => 
                                `<option value="${index}">${circuit}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div id="results-container" class="results-grid mt-20">
                        ${Array.from({length: 22}, (_, i) => `
                            <div class="result-row">
                                <div class="position-label">P${i+1}</div>
                                <select class="result-select" data-position="${i+1}">
                                    <option value="">Selecciona piloto</option>
                                    ${this.driversList.map(driver => 
                                        `<option value="${driver}">${driver}</option>`
                                    ).join('')}
                                </select>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button id="btn-publish-results" class="btn btn-primary w-100 mt-20">
                        <i class="fas fa-paper-plane"></i> PUBLICAR RESULTADOS
                    </button>
                </div>

                <div class="admin-section mt-30" style="border: 2px solid gold; padding: 15px; border-radius: 10px; background: rgba(255, 215, 0, 0.05);">
                    <h4><i class="fas fa-trophy"></i> RESULTADOS FINALES DEL MUNDIAL</h4>
                    <p class="sub-text" style="color: gold;">Introduce el Top 3 final para cerrar la temporada</p>
                    
                    <div class="results-grid mt-10">
                        <label class="form-label">PILOTOS TOP 3:</label>
                        <select id="final-d1" class="form-select mt-5">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                        <select id="final-d2" class="form-select mt-5">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                        <select id="final-d3" class="form-select mt-5">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                        
                        <label class="form-label mt-15">CONSTRUCTORES TOP 3:</label>
                        <select id="final-c1" class="form-select mt-5">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                        <select id="final-c2" class="form-select mt-5">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                        <select id="final-c3" class="form-select mt-5">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    
                    <button id="btn-save-final" class="btn btn-primary w-100 mt-20" style="background: gold; color: black; font-weight: bold; border: none;">
                        <i class="fas fa-check-double"></i> GUARDAR RESULTADOS FINALES
                    </button>
                </div>
                
                <div class="admin-section mt-30">
                    <h4><i class="fas fa-chart-line"></i> ESTADÍSTICAS</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${this.firebaseData.bets.length}</div>
                            <div class="stat-label">Apuestas totales</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.firebaseData.results.length}</div>
                            <div class="stat-label">Carreras con resultados</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">2</div>
                            <div class="stat-label">Jugadores activos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.firebaseData.points.Varo + this.firebaseData.points.Cía}</div>
                            <div class="stat-label">Puntos totales</div>
                        </div>
                    </div>
                    
                    <button id="btn-refresh-admin" class="btn btn-secondary w-100 mt-20">
                        <i class="fas fa-redo"></i> ACTUALIZAR DATOS
                    </button>
                </div>
            </div>
        `;
        
        // Configurar listeners de botones
        const publishBtn = document.getElementById('btn-publish-results');
        if (publishBtn) publishBtn.onclick = () => this.publishFullResults();
        
        const saveFinalBtn = document.getElementById('btn-save-final');
        if (saveFinalBtn) saveFinalBtn.onclick = () => this.saveFinalResults();
        
        const refreshBtn = document.getElementById('btn-refresh-admin');
        if (refreshBtn) refreshBtn.onclick = () => this.refreshData();
        
        // Cargar resultados existentes si los hay
        this.loadExistingResults();
    }

    loadExistingResults() {
        const gpSelect = document.getElementById('admin-gp-select');
        if (!gpSelect) return;
        
        const gpIndex = parseInt(gpSelect.value);
        const circuit = this.circuitsList[gpIndex];
        
        const existingResult = this.firebaseData.results.find(r => r.Carrera === circuit);
        
        if (existingResult) {
            for (let i = 1; i <= 22; i++) {
                const select = document.querySelector(`[data-position="${i}"]`);
                if (select && existingResult[`P${i}`]) {
                    select.value = existingResult[`P${i}`];
                }
            }
        }
        
        // Cargar resultados finales si existen
        if (this.firebaseData.finalResults) {
            const final = this.firebaseData.finalResults;
            document.getElementById('final-d1').value = final.D1 || '';
            document.getElementById('final-d2').value = final.D2 || '';
            document.getElementById('final-d3').value = final.D3 || '';
            document.getElementById('final-c1').value = final.C1 || '';
            document.getElementById('final-c2').value = final.C2 || '';
            document.getElementById('final-c3').value = final.C3 || '';
        }
    }

    // ==================== REFRESH Y NOTIFICACIONES ====================
    
    async refreshData() {
        console.log('🔄 Actualizando datos...');
        
        const refreshBtn = document.getElementById('btn-refresh');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }
        
        await this.loadFirebaseData();
        
        // Actualizar todas las pestañas visibles
        this.loadLastUserBet();
        this.loadUserBetForCurrentGP();
        this.updateCircuitInfo();
        
        if (this.state.currentTab === 'points') this.loadPointsTab();
        if (this.state.currentTab === 'season') this.loadSeasonTab();
        if (this.state.currentTab === 'history') this.loadHistoryTab();
        if (this.state.currentTab === 'admin') this.loadAdminPanel();
        
        this.showNotification('✅ Datos actualizados', 'success');
        
        if (refreshBtn) {
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-redo"></i>';
                refreshBtn.disabled = false;
            }, 1000);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        
        notification.innerHTML = `${icon} ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Añadir animaciones CSS si no existen
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== FUNCIONES GLOBALES ====================

window.loginAdmin = function() {
    const password = document.getElementById('admin-password').value;
    const ADMIN_PASSWORD = "F12026";
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('f1_admin', 'true');
        
        if (window.f1App) {
            window.f1App.showNotification('✅ Modo administrador activado', 'success');
        }
        
        setTimeout(() => location.reload(), 1000);
    } else {
        if (window.f1App) {
            window.f1App.showNotification('❌ Contraseña incorrecta', 'error');
        }
    }
};

window.logoutAdmin = function() {
    localStorage.removeItem('f1_admin');
    
    if (window.f1App) {
        window.f1App.showNotification('👤 Modo administrador desactivado', 'info');
    }
    
    setTimeout(() => location.reload(), 1000);
};

window.closeAdminModal = function() {
    document.getElementById('admin-overlay').style.display = 'none';
};

// ==================== INICIALIZACIÓN ====================

window.addEventListener('load', () => {
    console.log('🌍 Página cargada, inicializando app...');
    window.f1App = new F1CupApp();
});
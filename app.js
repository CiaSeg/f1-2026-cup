// app.js - VERSIÓN COMPLETA CON TODAS LAS FUNCIONES
class F1CupApp {
        constructor() {
        
        // ELIMINA estas líneas:
        // this.sheetId = "1MH-qdPD-urFE5zO-_14nPZw54nTr1zTiGV3hpBHpwbw";
        // this.apiKey = "AIzaSyCoUGiDREyQNzMWggWKD9D_k6qA-FEk4go";
        
        // Añade referencia a Firebase
        this.db = window.db; // Accede a la instancia global de Firebase
        
        // Resto del constructor permanece igual...
        
        this.state = {
            currentUser: localStorage.getItem('f1_user') || 'Varo',
            currentPage: 'landing',
            currentTab: 'race',
            selectedGP: 0,
            selectedPodium: ['', '', ''],
            selectedConstructors: ['', '', ''],
            seasonBet: null,
            isAdmin: localStorage.getItem('f1_admin') === 'true',
            dataLoaded: false,
            lastUserBet: null,
            userBetData: {},
            gpResults: {},
            waitingForResults: [],
            adminPassword: "F12026",
            lastUpdateTime: null,
            autoRefresh: true,
            refreshInterval: null
        };

        this.data = {
            circuits: {
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
        
        this.sheetsData = {
            bets: [],
            results: [],
            seasonBets: [],
            points: { Varo: 0, Cía: 0 },
            lastNumberResults: {}
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando F1 Cup App...');
        
        await this.loadAllData();
        
        setTimeout(() => {
            const loading = document.getElementById('loading');
            const app = document.getElementById('app');
            
            if (loading) loading.style.display = 'none';
            if (app) app.style.display = 'block';
            
            this.setupEventListeners();
            this.updateUI();
            this.scrollToTop();
            this.checkAdminStatus();
            
            if (this.state.isAdmin) {
                this.startAutoRefresh();
            }
            
        }, 1000);
    }

    // ==================== FIREBASE METHODS ====================
    
    async loadAllData() {
    console.log('📥 Conectando con Firebase...');
    
    try {
        // Escuchar apuestas en tiempo real
        db.ref('bets').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convertir objeto Firebase en array
                this.sheetsData.bets = Object.keys(data).map(key => ({
                    id: key, // Guardamos el ID de Firebase
                    ...data[key]
                }));
            } else {
                this.sheetsData.bets = [];
            }
            console.log(`✅ ${this.sheetsData.bets.length} apuestas cargadas`);
            this.updateUI(); // Refrescar UI automáticamente
        });

        // Escuchar resultados en tiempo real
        db.ref('results').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.sheetsData.results = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                this.processGPResults();
                this.calculateAllPoints();
            } else {
                this.sheetsData.results = [];
            }
            console.log(`✅ ${this.sheetsData.results.length} resultados cargados`);
        });

        // Escuchar apuestas de mundial
        db.ref('seasonBets').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.sheetsData.seasonBets = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                this.sheetsData.seasonBets = [];
            }
            console.log(`✅ ${this.sheetsData.seasonBets.length} apuestas mundial cargadas`);
        });

        // Escuchar último número
        db.ref('lastNumber').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.sheetsData.lastNumberResults = data;
            } else {
                this.sheetsData.lastNumberResults = {};
            }
            console.log(`✅ Último número cargado`);
        });

        this.state.dataLoaded = true;
        
    } catch (error) {
        console.error('❌ Error cargando datos de Firebase:', error);
        this.showNotification('⚠️ Error conectando con Firebase', 'error');
    }
}

    async saveCurrentBet() {
    const currentGP = this.circuitsList[this.state.selectedGP];
    const user = this.state.currentUser;
    const selected = this.state.selectedPodium;
    
    if (!selected[0] || !selected[1] || !selected[2]) {
        this.showNotification('❌ Debes seleccionar 3 pilotos', 'error');
        return;
    }
    
    if (selected[0] === selected[1] || selected[0] === selected[2] || selected[1] === selected[2]) {
        this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
        return;
    }
    
    // Crear ID único (usuario + carrera sin espacios)
    const betId = `${user}_${currentGP.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    const betData = {
        Carrera: currentGP,
        Jugador: user,
        P1: selected[0],
        P2: selected[1],
        P3: selected[2],
        Fecha: new Date().toLocaleString('es-ES'),
        timestamp: Date.now()
    };
    
    try {
        // Guardar en Firebase (sobrescribe si ya existe)
        await db.ref(`bets/${betId}`).set(betData);
        
        // Actualizar datos locales
        const existingIndex = this.sheetsData.bets.findIndex(bet => 
            bet.Carrera === currentGP && bet.Jugador === user
        );
        
        if (existingIndex !== -1) {
            this.sheetsData.bets[existingIndex] = { id: betId, ...betData };
            this.showNotification('✅ Apuesta actualizada en tiempo real', 'success');
        } else {
            this.sheetsData.bets.push({ id: betId, ...betData });
            this.showNotification('✅ Apuesta guardada en tiempo real', 'success');
        }
        
        this.loadLastUserBet();
        this.loadUserBetForCurrentGP();
        
    } catch (error) {
        console.error('❌ Error guardando en Firebase:', error);
        this.showNotification('❌ Error guardando apuesta', 'error');
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
        await db.ref(`seasonBets/${seasonId}`).set(seasonData);
        
        const existingIndex = this.sheetsData.seasonBets.findIndex(bet => bet.Jugador === user);
        
        if (existingIndex !== -1) {
            this.sheetsData.seasonBets[existingIndex] = { id: seasonId, ...seasonData };
            this.showNotification('✅ Apuesta mundial actualizada en tiempo real', 'success');
        } else {
            this.sheetsData.seasonBets.push({ id: seasonId, ...seasonData });
            this.showNotification('✅ Apuesta mundial guardada en tiempo real', 'success');
        }
        
    } catch (error) {
        console.error('❌ Error guardando apuesta mundial:', error);
        this.showNotification('❌ Error guardando apuesta mundial', 'error');
    }
}
async publishFullResults() {
    const gpIndex = document.getElementById('admin-gp-select').value;
    const circuit = this.circuitsList[gpIndex];
    
    const results = {};
    const resultData = {
        Carrera: circuit,
        timestamp: Date.now(),
        publicadoPor: this.state.currentUser,
        fechaPublicacion: new Date().toLocaleString('es-ES')
    };
    
    // Recoger resultados de P1 a P22
    for (let i = 1; i <= 22; i++) {
        const select = document.querySelector(`[data-position="${i}"]`);
        const driver = select ? select.value : '';
        
        if (!driver) {
            this.showNotification(`❌ Falta seleccionar piloto para P${i}`, 'error');
            return;
        }
        
        results[i] = driver;
        resultData[`P${i}`] = driver;
    }
    
    const drivers = Object.values(results);
    if (new Set(drivers).size !== 22) {
        this.showNotification('❌ Todos los pilotos deben ser diferentes', 'error');
        return;
    }
    
    const resultId = `result_${circuit.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    try {
        await db.ref(`results/${resultId}`).set(resultData);
        
        this.state.gpResults[circuit] = results;
        
        // Actualizar localmente
        const existingIndex = this.sheetsData.results.findIndex(r => r.Carrera === circuit);
        if (existingIndex !== -1) {
            this.sheetsData.results[existingIndex] = { id: resultId, ...resultData };
        } else {
            this.sheetsData.results.push({ id: resultId, ...resultData });
        }
        
        this.showNotification('✅ Resultados publicados en tiempo real', 'success');
        
        this.calculateAllPoints();
        
        if (this.state.currentTab === 'points') {
            this.loadPointsTab();
        }
        
    } catch (error) {
        console.error('❌ Error publicando resultados:', error);
        this.showNotification('❌ Error publicando resultados', 'error');
    }
}
async saveLastNumber() {
    const gpIndex = document.getElementById('last-number-gp').value;
    const circuit = this.circuitsList[gpIndex];
    const lastNumber = parseInt(document.getElementById('last-number-input').value);
    
    if (!lastNumber || lastNumber < 1 || lastNumber > 22) {
        this.showNotification('❌ El último número debe estar entre 1 y 22', 'error');
        return;
    }
    
    const lastNumberId = `lastnum_${circuit.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    const data = {
        carrera: circuit,
        numero: lastNumber,
        jugador: this.state.currentUser,
        fecha: new Date().toLocaleString('es-ES'),
        timestamp: Date.now()
    };
    
    try {
        await db.ref(`lastNumber/${lastNumberId}`).set(data);
        
        this.sheetsData.lastNumberResults[circuit] = lastNumber;
        this.showNotification('✅ Último número guardado en tiempo real', 'success');
        
    } catch (error) {
        console.error('❌ Error guardando último número:', error);
        this.showNotification('❌ Error guardando último número', 'error');
    }
}
async refreshData() {
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        refreshBtn.disabled = true;
    }
    
    // Forzar recarga de datos escuchando de nuevo
    this.loadAllData();
    
    this.showNotification('✅ Datos sincronizados', 'success');
    
    if (refreshBtn) {
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="fas fa-redo"></i>';
            refreshBtn.disabled = false;
        }, 1000);
    }
}
    // ==================== CORE APP METHODS ====================
    
    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        
        const btnVaro = document.getElementById('btn-varo');
        const btnCia = document.getElementById('btn-cia');
        const btnBack = document.getElementById('btn-back');
        const btnRefresh = document.getElementById('btn-refresh');
        const btnSaveBet = document.getElementById('btn-save-bet');

        if (btnVaro) btnVaro.onclick = () => this.selectUser('Varo');
        if (btnCia) btnCia.onclick = () => this.selectUser('Cía');
        if (btnBack) btnBack.onclick = () => this.goToLanding();
        if (btnRefresh) btnRefresh.onclick = () => this.refreshData();
        if (btnSaveBet) btnSaveBet.onclick = () => this.saveCurrentBet();

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
                const tab = e.target.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                    this.scrollToTop();
                }
            };
        });

        const gpSelect = document.getElementById('gp-select');
        if (gpSelect) {
            gpSelect.onchange = (e) => {
                this.state.selectedGP = parseInt(e.target.value);
                this.updateCircuitInfo();
                this.loadUserBetForCurrentGP();
                this.scrollToTop();
            };
        }

        ['p1', 'p2', 'p3'].forEach((pos, index) => {
            const select = document.getElementById(`${pos}-select`);
            if (select) {
                select.onchange = (e) => {
                    this.updatePodiumSelection(index, e.target.value);
                    this.updateDriverImage(`${pos}-img`, e.target.value);
                };
            }
        });

        const btnAdmin = document.getElementById('btn-admin');
        if (btnAdmin) {
            btnAdmin.onclick = () => this.toggleAdminMode();
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

        this.state.currentPage = 'main';
        this.updateUI();
        this.scrollToTop();
        
        this.loadLastUserBet();
        this.loadUserBetForCurrentGP();
    }

    goToLanding() {
        console.log('🔙 Volviendo a landing page');
        this.state.currentPage = 'landing';
        this.updateUI();
        this.scrollToTop();
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
        
        this.scrollToTop();
    }

    loadMainApp() {
        console.log('📱 Cargando aplicación principal...');
        
        this.loadGPSelector();
        this.updateCircuitInfo();
        this.loadLastUserBet();
        this.loadDriverSelectors();
        this.loadUserBetForCurrentGP();
        this.loadTabContent(this.state.currentTab);
        
        this.updateAdminButton();
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }

    // ==================== GP SELECTOR METHODS ====================
    
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
        
        const name = document.getElementById('circuit-name');
        const flag = document.getElementById('circuit-flag');
        const map = document.getElementById('circuit-map');
        const fecha = document.getElementById('circuit-fecha');
        
        if (name) name.textContent = info.nombre;
        if (flag) flag.src = info.bandera;
        if (map) map.src = info.mapa;
        if (fecha) fecha.textContent = info.fecha;
    }

    // ==================== DRIVER SELECTION METHODS ====================
    
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
        if (!img || !driverName) return;
        
        const driverData = this.data.drivers[driverName];
        if (driverData && driverData.foto) {
            img.src = driverData.foto;
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    }

    updatePodiumSelection(position, driver) {
        this.state.selectedPodium[position] = driver;
    }

    // ==================== BET METHODS ====================
    
    loadLastUserBet() {
        const user = this.state.currentUser;
        const userBets = this.sheetsData.bets.filter(bet => bet.Jugador === user);
        
        if (userBets.length > 0) {
            const lastBet = userBets[userBets.length - 1];
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
        
        const existingBet = this.sheetsData.bets.find(bet => 
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

    async saveCurrentBet() {
        const currentGP = this.circuitsList[this.state.selectedGP];
        const user = this.state.currentUser;
        const selected = this.state.selectedPodium;
        
        if (!selected[0] || !selected[1] || !selected[2]) {
            this.showNotification('❌ Debes seleccionar 3 pilotos', 'error');
            return;
        }
        
        if (selected[0] === selected[1] || selected[0] === selected[2] || selected[1] === selected[2]) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }
        
        const betData = {
            Carrera: currentGP,
            Jugador: user,
            P1: selected[0],
            P2: selected[1],
            P3: selected[2],
            Fecha: new Date().toLocaleString('es-ES')
        };
        
        const rowData = [
            betData.Carrera,
            betData.Jugador,
            betData.P1,
            betData.P2,
            betData.P3,
            betData.Fecha
        ];
        
        const success = await this.saveToGoogleSheet('Apuestas', rowData);
        
        if (success) {
            const existingIndex = this.sheetsData.bets.findIndex(bet => 
                bet.Carrera === currentGP && bet.Jugador === user
            );
            
            if (existingIndex !== -1) {
                this.sheetsData.bets[existingIndex] = betData;
                this.showNotification('✅ Apuesta actualizada', 'success');
            } else {
                this.sheetsData.bets.push(betData);
                this.showNotification('✅ Apuesta guardada', 'success');
            }
            
            this.loadLastUserBet();
            this.loadUserBetForCurrentGP();
        } else {
            this.showNotification('❌ Error guardando apuesta', 'error');
        }
    }

    // ==================== TAB METHODS ====================
    
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
            case 'lastNumber':
                this.loadLastNumberTab();
                break;
        }
    }

    // ==================== SEASON TAB METHODS ====================
    
    loadSeasonTab() {
        const tabContent = document.getElementById('tab-season');
        if (!tabContent) return;
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🏆 APUESTAS MUNDIALES 2026</p>
                
                <div class="season-section">
                    <h4><i class="fas fa-user"></i> PILOTOS</h4>
                    <div class="form-group">
                        <label class="form-label">CAMPEÓN DEL MUNDIO</label>
                        <select id="season-p1" class="form-select">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(driver => 
                                `<option value="${driver}">${driver}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">SUBCAMPEÓN</label>
                        <select id="season-p2" class="form-select">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(driver => 
                                `<option value="${driver}">${driver}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">TERCER LUGAR</label>
                        <select id="season-p3" class="form-select">
                            <option value="">Selecciona piloto</option>
                            ${this.driversList.map(driver => 
                                `<option value="${driver}">${driver}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="season-section mt-20">
                    <h4><i class="fas fa-car"></i> CONSTRUCTORES</h4>
                    <div class="form-group">
                        <label class="form-label">CAMPEÓN DE CONSTRUCTORES</label>
                        <select id="season-c1" class="form-select">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(team => 
                                `<option value="${team}">${team}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">SUBCAMPEÓN</label>
                        <select id="season-c2" class="form-select">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(team => 
                                `<option value="${team}">${team}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">TERCER LUGAR</label>
                        <select id="season-c3" class="form-select">
                            <option value="">Selecciona equipo</option>
                            ${this.data.constructors.map(team => 
                                `<option value="${team}">${team}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <button id="btn-save-season" class="btn btn-primary w-100 mt-20">
                    <i class="fas fa-trophy"></i> GUARDAR APUESTA MUNDIAL
                </button>
            </div>
        `;
        
        const saveBtn = document.getElementById('btn-save-season');
        if (saveBtn) {
            saveBtn.onclick = () => this.saveSeasonBet();
        }
        
        this.loadExistingSeasonBet();
    }

    loadExistingSeasonBet() {
        const user = this.state.currentUser;
        const existingBet = this.sheetsData.seasonBets.find(bet => bet.Jugador === user);
        
        if (existingBet) {
            document.getElementById('season-p1').value = existingBet.D_P1 || '';
            document.getElementById('season-p2').value = existingBet.D_P2 || '';
            document.getElementById('season-p3').value = existingBet.D_P3 || '';
            document.getElementById('season-c1').value = existingBet.C_P1 || '';
            document.getElementById('season-c2').value = existingBet.C_P2 || '';
            document.getElementById('season-c3').value = existingBet.C_P3 || '';
            
            const saveBtn = document.getElementById('btn-save-season');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ACTUALIZAR APUESTA MUNDIAL';
            }
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
            Fecha: new Date().toLocaleString('es-ES')
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
        
        const rowData = [
            seasonData.Jugador,
            seasonData.D_P1,
            seasonData.D_P2,
            seasonData.D_P3,
            seasonData.C_P1,
            seasonData.C_P2,
            seasonData.C_P3,
            seasonData.Fecha
        ];
        
        const success = await this.saveToGoogleSheet('Mundial', rowData);
        
        if (success) {
            const existingIndex = this.sheetsData.seasonBets.findIndex(bet => bet.Jugador === user);
            
            if (existingIndex !== -1) {
                this.sheetsData.seasonBets[existingIndex] = seasonData;
                this.showNotification('✅ Apuesta mundial actualizada', 'success');
            } else {
                this.sheetsData.seasonBets.push(seasonData);
                this.showNotification('✅ Apuesta mundial guardada', 'success');
            }
        } else {
            this.showNotification('❌ Error guardando apuesta mundial', 'error');
        }
    }

    // ==================== POINTS TAB METHODS ====================
    
    loadPointsTab() {
        this.calculateAllPoints();
        
        const tabContent = document.getElementById('tab-points');
        if (!tabContent) return;
        
        const sortedPlayers = Object.entries(this.sheetsData.points)
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

    // ==================== POINTS CALCULATION METHODS ====================
    
    processGPResults() {
        this.sheetsData.results.forEach(result => {
            const carrera = result.Carrera;
            if (!this.state.gpResults[carrera]) {
                this.state.gpResults[carrera] = {};
            }
            
            for (let i = 1; i <= 22; i++) {
                const posKey = `P${i}`;
                if (result[posKey]) {
                    this.state.gpResults[carrera][i] = result[posKey];
                }
            }
        });
    }

    calculateAllPoints() {
        this.sheetsData.points = { Varo: 0, Cía: 0 };
        
        Object.keys(this.state.gpResults).forEach(carrera => {
            const results = this.state.gpResults[carrera];
            const betsForRace = this.sheetsData.bets.filter(bet => bet.Carrera === carrera);
            
            if (betsForRace.length > 0 && Object.keys(results).length >= 3) {
                this.calculatePointsForRace(carrera, results, betsForRace);
            }
        });
    }

    calculatePointsForRace(carrera, results, bets) {
        const realPodium = [results[1], results[2], results[3]];
        
        bets.forEach(bet => {
            const betPodium = [bet.P1, bet.P2, bet.P3];
            let points = 0;
            let exactMatches = 0;
            let podioMatches = 0;
            
            for (let i = 0; i < 3; i++) {
                if (betPodium[i] === realPodium[i]) {
                    exactMatches++;
                }
            }
            
            betPodium.forEach(piloto => {
                if (realPodium.includes(piloto)) {
                    podioMatches++;
                }
            });
            
            switch(exactMatches) {
                case 1: points += 5; break;
                case 2: points += 4; break;
                case 3: points += 3; break;
            }
            
            points += (podioMatches * 2);
            
            let positionDifference = 0;
            betPodium.forEach((piloto, index) => {
                const realIndex = realPodium.indexOf(piloto);
                if (realIndex !== -1) {
                    positionDifference += Math.abs(index - realIndex);
                } else {
                    positionDifference += 3;
                }
            });
            
            bet.tempPoints = points;
            bet.positionDifference = positionDifference;
        });
        
        if (bets.length > 1) {
            let minDifference = Infinity;
            let winner = null;
            
            bets.forEach(bet => {
                if (bet.positionDifference < minDifference) {
                    minDifference = bet.positionDifference;
                    winner = bet.Jugador;
                }
            });
            
            if (winner) {
                const winnerBet = bets.find(b => b.Jugador === winner);
                if (winnerBet) {
                    winnerBet.tempPoints += 1;
                }
            }
        }
        
        bets.forEach(bet => {
            this.sheetsData.points[bet.Jugador] = (this.sheetsData.points[bet.Jugador] || 0) + bet.tempPoints;
        });
    }

    // ==================== LAST NUMBER TAB METHODS ====================
    
    loadLastNumberTab() {
        const tabContent = document.getElementById('tab-lastNumber');
        if (!tabContent) return;
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🔢 ÚLTIMO NÚMERO POR CARRERA</p>
                <div class="last-number-list mt-20">
                    ${Object.entries(this.sheetsData.lastNumberResults).map(([carrera, numero]) => `
                        <div class="last-number-item">
                            <div class="circuit-name">${carrera.split(' (')[0]}</div>
                            <div class="last-number">${numero}</div>
                        </div>
                    `).join('') || '<p class="text-center">No hay datos de último número</p>'}
                </div>
            </div>
        `;
    }

    // ==================== ADMIN METHODS ====================
    
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
            this.startAutoRefresh();
        } else {
            this.showNotification('👤 Modo usuario activado', 'info');
            this.stopAutoRefresh();
        }
    }

    startAutoRefresh() {
        if (this.state.refreshInterval) {
            clearInterval(this.state.refreshInterval);
        }
        
        this.state.refreshInterval = setInterval(() => {
            this.checkForUpdates();
        }, 30000);
        
        console.log('🔄 Auto-refresh iniciado (cada 30 segundos)');
    }

    stopAutoRefresh() {
        if (this.state.refreshInterval) {
            clearInterval(this.state.refreshInterval);
            this.state.refreshInterval = null;
            console.log('🛑 Auto-refresh detenido');
        }
    }

    async checkForUpdates() {
        if (!this.state.isAdmin) return;
        
        try {
            console.log('🔄 Verificando actualizaciones...');
            
            const lastBets = this.sheetsData.bets.length;
            const lastResults = this.sheetsData.results.length;
            
            await this.loadAllData();
            
            if (this.sheetsData.bets.length !== lastBets || 
                this.sheetsData.results.length !== lastResults) {
                this.showUpdateNotification();
            }
            
            this.state.lastUpdateTime = new Date();
            
        } catch (error) {
            console.error('Error verificando updates:', error);
        }
    }

    showUpdateNotification() {
        const indicator = document.createElement('div');
        indicator.className = 'update-indicator show';
        indicator.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Datos actualizados desde Google Sheets</span>
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => indicator.remove(), 300);
        }, 3000);
    }

    getRecentBetsHTML() {
        const recentBets = this.sheetsData.bets.slice(-5).reverse();
        
        if (recentBets.length === 0) {
            return '<p class="text-center">No hay apuestas recientes</p>';
        }
        
        return `
            <table class="bets-table">
                <thead>
                    <tr>
                        <th>Carrera</th>
                        <th>Jugador</th>
                        <th>Apuesta</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentBets.map(bet => `
                        <tr>
                            <td>${bet.Carrera.split(' (')[0]}</td>
                            <td>
                                <span class="player-badge ${bet.Jugador.toLowerCase()}">
                                    ${bet.Jugador}
                                </span>
                            </td>
                            <td>${bet.P1} - ${bet.P2} - ${bet.P3}</td>
                            <td>${bet.Fecha ? bet.Fecha.split(' ')[0] : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    getTotalPoints() {
        return Object.values(this.sheetsData.points).reduce((a, b) => a + b, 0);
    }

    loadAdminPanel() {
        const tabContent = document.getElementById('tab-admin');
        if (!tabContent) return;
        
        const lastGP = this.circuitsList[0];
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🔧 PANEL ADMINISTRADOR COMPARTIDO</p>
                
                <div class="admin-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>MODO ADMINISTRADOR</h4>
                    <p>Todos los cambios que hagas aquí serán visibles para ambos jugadores en tiempo real.</p>
                </div>
                
                <div class="sync-status">
                    <i class="fas fa-sync-alt"></i>
                    <span>Sincronizado con Google Sheets</span>
                </div>
                
                <div class="admin-section mt-20">
                    <h4><i class="fas fa-flag-checkered"></i> RESULTADOS OFICIALES</h4>
                    <p class="sub-text" style="text-align: left; margin-bottom: 15px;">
                        Última carrera: <strong>${lastGP}</strong>
                    </p>
                    
                    <div class="form-group">
                        <label class="form-label">CARRERA</label>
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
                
                <div class="admin-section mt-30">
                    <h4><i class="fas fa-calculator"></i> ÚLTIMO NÚMERO</h4>
                    <div class="form-group">
                        <label class="form-label">CARRERA</label>
                        <select id="last-number-gp" class="form-select">
                            ${this.circuitsList.map((circuit, index) => 
                                `<option value="${index}">${circuit}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">ÚLTIMO NÚMERO (1-22)</label>
                        <input type="number" id="last-number-input" class="form-input" 
                               min="1" max="22" placeholder="Ej: 12">
                    </div>
                    <button id="btn-save-last-number" class="btn btn-primary w-100 mt-20">
                        <i class="fas fa-save"></i> GUARDAR ÚLTIMO NÚMERO
                    </button>
                </div>
                
                <div class="admin-section mt-30">
                    <h4><i class="fas fa-clipboard-list"></i> APUESTAS RECIENTES</h4>
                    <div class="recent-bets">
                        ${this.getRecentBetsHTML()}
                    </div>
                </div>
                
                <div class="admin-section mt-30">
                    <h4><i class="fas fa-chart-line"></i> ESTADÍSTICAS</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${this.sheetsData.bets.length}</div>
                            <div class="stat-label">Apuestas totales</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${Object.keys(this.state.gpResults).length}</div>
                            <div class="stat-label">Carreras con resultados</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${Object.keys(this.sheetsData.points).length}</div>
                            <div class="stat-label">Jugadores activos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.getTotalPoints()}</div>
                            <div class="stat-label">Puntos totales</div>
                        </div>
                    </div>
                    
                    <button onclick="window.f1App.refreshData()" class="btn btn-secondary w-100 mt-20">
                        <i class="fas fa-redo"></i> FORZAR ACTUALIZACIÓN
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('btn-publish-results').onclick = () => this.publishFullResults();
        document.getElementById('btn-save-last-number').onclick = () => this.saveLastNumber();
    }

    async publishFullResults() {
        const gpIndex = document.getElementById('admin-gp-select').value;
        const circuit = this.circuitsList[gpIndex];
        
        const results = {};
        const rowData = [circuit];
        
        for (let i = 1; i <= 22; i++) {
            const select = document.querySelector(`[data-position="${i}"]`);
            const driver = select ? select.value : '';
            
            if (!driver) {
                this.showNotification(`❌ Falta seleccionar piloto para P${i}`, 'error');
                return;
            }
            
            results[i] = driver;
            rowData.push(driver);
        }
        
        const drivers = Object.values(results);
        if (new Set(drivers).size !== 22) {
            this.showNotification('❌ Todos los pilotos deben ser diferentes', 'error');
            return;
        }
        
        const success = await this.saveToGoogleSheet('Resultados', rowData);
        
        if (success) {
            this.state.gpResults[circuit] = results;
            this.sheetsData.results.push({
                Carrera: circuit,
                ...results
            });
            
            this.showNotification('✅ Resultados publicados correctamente', 'success');
            
            this.calculateAllPoints();
            
            if (this.state.currentTab === 'points') {
                this.loadPointsTab();
            }
        } else {
            this.showNotification('❌ Error publicando resultados', 'error');
        }
    }

    async saveLastNumber() {
        const gpIndex = document.getElementById('last-number-gp').value;
        const circuit = this.circuitsList[gpIndex];
        const lastNumber = parseInt(document.getElementById('last-number-input').value);
        
        if (!lastNumber || lastNumber < 1 || lastNumber > 22) {
            this.showNotification('❌ El último número debe estar entre 1 y 22', 'error');
            return;
        }
        
        const rowData = [
            circuit,
            this.state.currentUser,
            lastNumber.toString()
        ];
        
        const success = await this.saveToGoogleSheet('UltimoNumero', rowData);
        
        if (success) {
            this.sheetsData.lastNumberResults[circuit] = lastNumber;
            this.showNotification('✅ Último número guardado', 'success');
        } else {
            this.showNotification('❌ Error guardando último número', 'error');
        }
    }

    // ==================== REFRESH & NOTIFICATION METHODS ====================
    
    async refreshData() {
        const refreshBtn = document.getElementById('btn-refresh');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }
        
        await this.loadAllData();
        
        this.loadLastUserBet();
        this.loadUserBetForCurrentGP();
        
        if (this.state.currentTab === 'points') {
            this.loadPointsTab();
        }
        
        if (this.state.currentTab === 'lastNumber') {
            this.loadLastNumberTab();
        }
        
        if (this.state.currentTab === 'admin') {
            this.loadAdminPanel();
        }
        
        if (this.state.currentTab === 'season') {
            this.loadSeasonTab();
        }
        
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-redo"></i>';
            refreshBtn.disabled = false;
        }
        
        this.showNotification('✅ Datos actualizados desde Google Sheets', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
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
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        
        notification.innerHTML = `${icon} ${message}`;
        
        document.body.appendChild(notification);
        
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
}

// ==================== GLOBAL FUNCTIONS ====================

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

// ==================== INITIALIZATION ====================

window.addEventListener('load', () => {
    window.f1App = new F1CupApp();
});

document.addEventListener('DOMContentLoaded', function() {
    const globalAdminBtn = document.getElementById('global-admin-btn');
    if (globalAdminBtn) {
        globalAdminBtn.addEventListener('click', function() {
            document.getElementById('admin-overlay').style.display = 'flex';
            
            const isAdmin = localStorage.getItem('f1_admin') === 'true';
            if (isAdmin) {
                document.querySelector('.admin-login').style.display = 'none';
                document.querySelector('.admin-status').style.display = 'block';
            } else {
                document.querySelector('.admin-login').style.display = 'block';
                document.querySelector('.admin-status').style.display = 'none';
            }
        });
    }
});
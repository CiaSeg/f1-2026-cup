// app.js - VERSIÓN DEFINITIVA Y FUNCIONAL
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
            selectedGP: 0,
            selectedPodium: ['', '', ''],
            isAdmin: localStorage.getItem('f1_admin') === 'true',
            dataLoaded: false
        };

        // Datos estáticos
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
        
        // Datos cargados de Firebase
        this.firebaseData = {
            bets: [],
            results: [],
            seasonBets: [],
            points: { Varo: 0, Cía: 0 }
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando app...');
        
        // Configurar event listeners primero
        this.setupEventListeners();
        
        // Cargar datos de Firebase
        await this.loadFirebaseData();
        
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
            // Cargar apuestas
            const betsSnapshot = await this.db.ref('bets').once('value');
            const betsData = betsSnapshot.val();
            this.firebaseData.bets = betsData ? Object.values(betsData) : [];
            console.log(`✅ ${this.firebaseData.bets.length} apuestas cargadas`);
            
            // Cargar resultados
            const resultsSnapshot = await this.db.ref('results').once('value');
            const resultsData = resultsSnapshot.val();
            this.firebaseData.results = resultsData ? Object.values(resultsData) : [];
            console.log(`✅ ${this.firebaseData.results.length} resultados cargados`);
            
            // Cargar apuestas de temporada
            const seasonSnapshot = await this.db.ref('seasonBets').once('value');
            const seasonData = seasonSnapshot.val();
            this.firebaseData.seasonBets = seasonData ? Object.values(seasonData) : [];
            console.log(`✅ ${this.firebaseData.seasonBets.length} apuestas de temporada cargadas`);
            
            this.state.dataLoaded = true;
            
        } catch (error) {
            console.error('❌ Error cargando datos de Firebase:', error);
            this.showNotification('⚠️ Error conectando con la base de datos', 'error');
        }
    }

    async saveCurrentBet() {
        console.log('💾 Intentando guardar apuesta...');
        
        const currentGP = this.circuitsList[this.state.selectedGP];
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

    // ==================== MÉTODOS BÁSICOS DE LA APP ====================
    
    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        
        // Botones principales
        document.getElementById('btn-varo').onclick = () => this.selectUser('Varo');
        document.getElementById('btn-cia').onclick = () => this.selectUser('Cía');
        document.getElementById('btn-back').onclick = () => this.goToLanding();
        document.getElementById('btn-refresh').onclick = () => this.refreshData();
        document.getElementById('btn-save-bet').onclick = () => this.saveCurrentBet();

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
                const tab = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tab);
            };
        });

        // Selector de GP
        document.getElementById('gp-select').onchange = (e) => {
            this.state.selectedGP = parseInt(e.target.value);
            this.updateCircuitInfo();
            this.loadUserBetForCurrentGP();
        };

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
        
        this.loadLastUserBet();
        this.loadUserBetForCurrentGP();
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
        
        const name = document.getElementById('circuit-name');
        const flag = document.getElementById('circuit-flag');
        const map = document.getElementById('circuit-map');
        const fecha = document.getElementById('circuit-fecha');
        
        if (name) name.textContent = info.nombre;
        if (flag) flag.src = info.bandera;
        if (map) map.src = info.mapa;
        if (fecha) fecha.textContent = info.fecha;
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

    // ==================== GESTIÓN DE APUESTAS ====================
    
    loadLastUserBet() {
        const user = this.state.currentUser;
        const userBets = this.firebaseData.bets.filter(bet => bet.Jugador === user);
        
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
            case 'lastNumber':
                this.loadHistoryTab(); // Cambiado de loadLastNumberTab a loadHistoryTab
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
        const existingBet = this.firebaseData.seasonBets.find(bet => bet.Jugador === user);
        
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

    // ==================== PESTAÑA HISTORIAL (reemplaza última número) ====================
    
    loadHistoryTab() {
        const tabContent = document.getElementById('tab-lastNumber');
        if (!tabContent) return;
        
        // Ordenar apuestas por fecha (más reciente primero)
        const allBets = [...this.firebaseData.bets].sort((a, b) => {
            return new Date(b.timestamp || b.Fecha) - new Date(a.timestamp || a.Fecha);
        });
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">📋 HISTORIAL DE APUESTAS</p>
                <div class="history-list mt-20">
                    ${allBets.length > 0 ? allBets.map(bet => {
                        const fecha = bet.Fecha ? bet.Fecha.split(' ')[0] : 'Fecha no disponible';
                        const hora = bet.Fecha ? bet.Fecha.split(' ')[1] : '';
                        
                        return `
                            <div class="history-item ${bet.Jugador === this.state.currentUser ? 'my-bet' : ''}">
                                <div class="history-header">
                                    <span class="circuit-name">${bet.Carrera.split(' (')[0]}</span>
                                    <span class="bet-date">${fecha} ${hora}</span>
                                </div>
                                <div class="history-player">
                                    <span class="player-badge ${bet.Jugador.toLowerCase()}">${bet.Jugador}</span>
                                    <span class="bet-podium">${bet.P1} - ${bet.P2} - ${bet.P3}</span>
                                </div>
                            </div>
                        `;
                    }).join('') : '<p class="text-center">No hay apuestas registradas aún</p>'}
                </div>
                <button onclick="window.f1App.refreshData()" class="btn btn-secondary w-100 mt-20">
                    <i class="fas fa-redo"></i> ACTUALIZAR HISTORIAL
                </button>
            </div>
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

    calculateAllPoints() {
        this.firebaseData.points = { Varo: 0, Cía: 0 };
        
        // Para cada carrera con resultados
        this.firebaseData.results.forEach(result => {
            const carrera = result.Carrera;
            const realPodium = [result.P1, result.P2, result.P3];
            
            // Buscar apuestas para esta carrera
            const betsForRace = this.firebaseData.bets.filter(bet => bet.Carrera === carrera);
            
            betsForRace.forEach(bet => {
                const betPodium = [bet.P1, bet.P2, bet.P3];
                let points = 0;
                let exactMatches = 0;
                let podioMatches = 0;
                
                // Contar aciertos exactos
                for (let i = 0; i < 3; i++) {
                    if (betPodium[i] === realPodium[i]) {
                        exactMatches++;
                    }
                }
                
                // Contar pilotos en podio (en cualquier posición)
                betPodium.forEach(piloto => {
                    if (realPodium.includes(piloto)) {
                        podioMatches++;
                    }
                });
                
                // Asignar puntos según aciertos exactos
                switch(exactMatches) {
                    case 1: points += 5; break;
                    case 2: points += 4; break;
                    case 3: points += 3; break;
                }
                
                // Puntos por cada piloto en podio
                points += (podioMatches * 2);
                
                // Acumular puntos al jugador
                this.firebaseData.points[bet.Jugador] = (this.firebaseData.points[bet.Jugador] || 0) + points;
            });
            
            // Punto extra para quien tenga menor diferencia de posiciones
            if (betsForRace.length > 1) {
                let minDifference = Infinity;
                let winner = null;
                
                betsForRace.forEach(bet => {
                    const betPodium = [bet.P1, bet.P2, bet.P3];
                    let positionDifference = 0;
                    
                    betPodium.forEach((piloto, index) => {
                        const realIndex = realPodium.indexOf(piloto);
                        if (realIndex !== -1) {
                            positionDifference += Math.abs(index - realIndex);
                        } else {
                            positionDifference += 3; // Penalización si no está en podio
                        }
                    });
                    
                    if (positionDifference < minDifference) {
                        minDifference = positionDifference;
                        winner = bet.Jugador;
                    }
                });
                
                if (winner) {
                    this.firebaseData.points[winner] += 1;
                }
            }
        });
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
        
        const lastGP = this.circuitsList[0];
        
        tabContent.innerHTML = `
            <div class="mobile-card">
                <p class="sub-text">🔧 PANEL ADMINISTRADOR</p>
                
                <div class="admin-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>PUBLICAR RESULTADOS OFICIALES</h4>
                    <p>Completa TODOS los puestos (1-22) y publica resultados.</p>
                </div>
                
                <div class="admin-section mt-20">
                    <h4><i class="fas fa-flag-checkered"></i> RESULTADOS OFICIALES</h4>
                    
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
        
        // Configurar botones del admin
        const publishBtn = document.getElementById('btn-publish-results');
        if (publishBtn) {
            publishBtn.onclick = () => this.publishFullResults();
        }
        
        const refreshBtn = document.getElementById('btn-refresh-admin');
        if (refreshBtn) {
            refreshBtn.onclick = () => this.refreshData();
        }
        
        // Cargar resultados existentes si los hay
        this.loadExistingResults();
    }

    loadExistingResults() {
        const gpSelect = document.getElementById('admin-gp-select');
        if (!gpSelect) return;
        
        const circuit = this.circuitsList[parseInt(gpSelect.value)];
        const existingResult = this.firebaseData.results.find(r => r.Carrera === circuit);
        
        if (existingResult) {
            for (let i = 1; i <= 22; i++) {
                const select = document.querySelector(`[data-position="${i}"]`);
                const driver = existingResult[`P${i}`];
                if (select && driver) {
                    select.value = driver;
                }
            }
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
        
        if (this.state.currentTab === 'points') this.loadPointsTab();
        if (this.state.currentTab === 'season') this.loadSeasonTab();
        if (this.state.currentTab === 'lastNumber') this.loadHistoryTab();
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
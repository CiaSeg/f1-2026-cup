// app.js - VERSIÓN COMPLETA Y CORREGIDA
class F1CupApp {
    constructor() {
        this.state = {
            currentUser: localStorage.getItem('f1_user') || 'Varo',
            currentPage: 'landing',
            currentTab: 'race',
            selectedGP: 0,
            selectedPodium: ['', '', ''],
            seasonBet: null,
            isAdmin: false,
            dataLoaded: false,
            lastRaceData: null
        };

        this.data = {
            circuits: {
                "GP Australia (06-08 Mar)": { 
                    nombre: "Albert Park", 
                    bandera: "./assets/circuitos/au.png", 
                    mapa: "./assets/circuitos/australia.png" 
                },
                "GP China (13-15 Mar)": { 
                    nombre: "Shanghai", 
                    bandera: "./assets/circuitos/cn.png", 
                    mapa: "./assets/circuitos/china.png" 
                },
                "GP Japón (27-29 Mar)": { 
                    nombre: "Suzuka", 
                    bandera: "./assets/circuitos/jp.png", 
                    mapa: "./assets/circuitos/japan.png" 
                },
                "GP Bahrein (10-12 Apr)": { 
                    nombre: "Bahrain Int.", 
                    bandera: "./assets/circuitos/bh.png", 
                    mapa: "./assets/circuitos/bahrain.png" 
                },
                "GP Arabia Saudí (17-19 Apr)": { 
                    nombre: "Jeddah", 
                    bandera: "./assets/circuitos/sa.png", 
                    mapa: "./assets/circuitos/saudi.png" 
                },
                "GP Miami (01-03 May)": { 
                    nombre: "Miami", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/miami.png" 
                },
                "GP Canadá (22-24 May)": { 
                    nombre: "Gilles-Villeneuve", 
                    bandera: "./assets/circuitos/ca.png", 
                    mapa: "./assets/circuitos/canada.png" 
                },
                "GP Mónaco (05-07 Jun)": { 
                    nombre: "Monaco", 
                    bandera: "./assets/circuitos/mc.png", 
                    mapa: "./assets/circuitos/monaco.png" 
                },
                "GP Barcelona (12-14 Jun)": { 
                    nombre: "Catalunya", 
                    bandera: "./assets/circuitos/es.png", 
                    mapa: "./assets/circuitos/barcelona.png" 
                },
                "GP Austria (26-28 Jun)": { 
                    nombre: "Red Bull Ring", 
                    bandera: "./assets/circuitos/at.png", 
                    mapa: "./assets/circuitos/austria.png" 
                },
                "GP Gran Bretaña (03-05 Jul)": { 
                    nombre: "Silverstone", 
                    bandera: "./assets/circuitos/gb.png", 
                    mapa: "./assets/circuitos/britain.png" 
                },
                "GP Bélgica (17-19 Jul)": { 
                    nombre: "Spa", 
                    bandera: "./assets/circuitos/be.png", 
                    mapa: "./assets/circuitos/belgium.png" 
                },
                "GP Hungría (24-26 Jul)": { 
                    nombre: "Hungaroring", 
                    bandera: "./assets/circuitos/hu.png", 
                    mapa: "./assets/circuitos/hungary.png" 
                },
                "GP Países Bajos (21-23 Aug)": { 
                    nombre: "Zandvoort", 
                    bandera: "./assets/circuitos/nl.png", 
                    mapa: "./assets/circuitos/dutch.png" 
                },
                "GP Italia (04-06 Sep)": { 
                    nombre: "Monza", 
                    bandera: "./assets/circuitos/it.png", 
                    mapa: "./assets/circuitos/italy.png" 
                },
                "GP España - Madrid (11-13 Sep)": { 
                    nombre: "IFEMA Madrid", 
                    bandera: "./assets/circuitos/es.png", 
                    mapa: "./assets/circuitos/madrid.png" 
                },
                "GP Azerbaiyán (24-26 Sep)": { 
                    nombre: "Baku", 
                    bandera: "./assets/circuitos/az.png", 
                    mapa: "./assets/circuitos/baku.png" 
                },
                "GP Singapur (09-11 Oct)": { 
                    nombre: "Marina Bay", 
                    bandera: "./assets/circuitos/sg.png", 
                    mapa: "./assets/circuitos/singapore.png" 
                },
                "GP Austin USA (23-25 Oct)": { 
                    nombre: "COTA", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/austin.png" 
                },
                "GP México (30 Oct - 01 Nov)": { 
                    nombre: "Hermanos Rodríguez", 
                    bandera: "./assets/circuitos/mx.png", 
                    mapa: "./assets/circuitos/mexico.png" 
                },
                "GP Brasil (06-08 Nov)": { 
                    nombre: "Interlagos", 
                    bandera: "./assets/circuitos/br.png", 
                    mapa: "./assets/circuitos/brazil.png" 
                },
                "GP Las Vegas (19-21 Nov)": { 
                    nombre: "Las Vegas", 
                    bandera: "./assets/circuitos/us.png", 
                    mapa: "./assets/circuitos/vegas.png" 
                },
                "GP Qatar (27-29 Nov)": { 
                    nombre: "Lusail", 
                    bandera: "./assets/circuitos/qa.png", 
                    mapa: "./assets/circuitos/qatar.png" 
                },
                "GP Abu Dhabi (04-06 Dec)": { 
                    nombre: "Yas Marina", 
                    bandera: "./assets/circuitos/ae.png", 
                    mapa: "./assets/circuitos/abudhabi.png" 
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
            }
        };

        // Datos de ejemplo para pruebas (sin Google Sheets)
        this.sheetsData = {
            bets: [
                {
                    Carrera: "GP Australia (06-08 Mar)",
                    Jugador: "Varo",
                    P1: "Verstappen",
                    P2: "Hamilton",
                    P3: "Norris"
                },
                {
                    Carrera: "GP Australia (06-08 Mar)",
                    Jugador: "Cía",
                    P1: "Leclerc",
                    P2: "Verstappen",
                    P3: "Piastri"
                }
            ],
            results: [
                {
                    Carrera: "GP Australia (06-08 Mar)",
                    P1_Real: "Verstappen",
                    P2_Real: "Leclerc",
                    P3_Real: "Piastri"
                }
            ],
            seasonBets: [],
            points: { Varo: 0, Cía: 0 }
        };

        this.circuitsList = Object.keys(this.data.circuits);
        this.driversList = Object.keys(this.data.drivers).sort();
        
        this.init();
    }

    init() {
        console.log('🚀 Iniciando F1 Cup App...');
        
        // Ocultar loading después de 1.5 segundos
        setTimeout(() => {
            const loading = document.getElementById('loading');
            const app = document.getElementById('app');
            
            if (loading) {
                loading.style.display = 'none';
            }
            
            if (app) {
                app.style.display = 'flex';
                app.style.flexDirection = 'column';
            }
            
            this.setupEventListeners();
            this.updateUI();
            
            // Cargar datos iniciales
            this.loadInitialData();
            
        }, 1500);
    }

    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        
        // Botones de usuario
        const btnVaro = document.getElementById('btn-varo');
        const btnCia = document.getElementById('btn-cia');
        const btnBack = document.getElementById('btn-back');
        const btnRefresh = document.getElementById('btn-refresh');
        const btnSaveBet = document.getElementById('btn-save-bet');

        if (btnVaro) {
            btnVaro.onclick = () => this.selectUser('Varo');
        }

        if (btnCia) {
            btnCia.onclick = () => this.selectUser('Cía');
        }

        if (btnBack) {
            btnBack.onclick = () => this.goToLanding();
        }

        if (btnRefresh) {
            btnRefresh.onclick = () => this.refreshData();
        }

        if (btnSaveBet) {
            btnSaveBet.onclick = () => this.saveCurrentBet();
        }

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
                const tab = e.target.dataset.tab || e.target.closest('.tab-btn').dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                }
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

        // Selectores de podio
        const p1Select = document.getElementById('p1-select');
        const p2Select = document.getElementById('p2-select');
        const p3Select = document.getElementById('p3-select');

        if (p1Select) p1Select.onchange = (e) => this.updatePodiumSelection(0, e.target.value);
        if (p2Select) p2Select.onchange = (e) => this.updatePodiumSelection(1, e.target.value);
        if (p3Select) p3Select.onchange = (e) => this.updatePodiumSelection(2, e.target.value);
    }

    selectUser(user) {
        console.log(`👤 Seleccionando usuario: ${user}`);
        
        this.state.currentUser = user;
        localStorage.setItem('f1_user', user);
        
        const display = document.getElementById('current-user');
        if (display) {
            display.textContent = user.toUpperCase();
            display.style.color = (user === 'Varo') ? '#e10600' : '#ffffff';
        }

        this.state.currentPage = 'main';
        this.updateUI();
        
        // Cargar apuestas del usuario
        this.loadUserBetForCurrentGP();
    }

    goToLanding() {
        console.log('🔙 Volviendo a landing page');
        this.state.currentPage = 'landing';
        this.updateUI();
    }

    switchTab(tab) {
        console.log(`📁 Cambiando a pestaña: ${tab}`);
        
        this.state.currentTab = tab;
        
        // Actualizar botones de tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        // Actualizar contenido de tabs
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tab}`);
        });
        
        // Cargar contenido específico de la pestaña
        this.loadTabContent(tab);
    }

    updateUI() {
        const landing = document.getElementById('landing-page');
        const main = document.getElementById('main-page');
        
        if (this.state.currentPage === 'landing') {
            landing.classList.add('active');
            main.classList.remove('active');
            document.body.style.background = 'linear-gradient(135deg, #0a0a0f 0%, #15151e 100%)';
        } else {
            landing.classList.remove('active');
            main.classList.add('active');
            document.body.style.background = 'var(--f1-black)';
            this.loadMainApp();
        }
    }

    loadMainApp() {
        console.log('📱 Cargando aplicación principal...');
        
        this.loadGPSelector();
        this.updateCircuitInfo();
        this.loadLastRace();
        this.loadDriverSelectors();
        this.loadUserBetForCurrentGP();
        this.loadTabContent(this.state.currentTab);
    }

    loadGPSelector() {
        const select = document.getElementById('gp-select');
        if (!select) return;
        
        select.innerHTML = '';
        
        this.circuitsList.forEach((circuit, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = circuit;
            
            // Marcar como próximo GP (podría ser el primero sin resultado)
            if (index === 0) {
                opt.selected = true;
                this.state.selectedGP = 0;
            }
            
            select.appendChild(opt);
        });
    }

    updateCircuitInfo() {
        const circuitKey = this.circuitsList[this.state.selectedGP];
        const info = this.data.circuits[circuitKey];
        
        if (!info) {
            console.error('❌ No se encontró información del circuito');
            return;
        }
        
        console.log(`🏁 Actualizando info del circuito: ${info.nombre}`);
        
        const name = document.getElementById('circuit-name');
        const flag = document.getElementById('circuit-flag');
        const map = document.getElementById('circuit-map');
        
        if (name) name.textContent = info.nombre;
        
        if (flag) {
            flag.src = info.bandera;
            flag.alt = `Bandera de ${info.nombre}`;
            flag.onerror = () => {
                flag.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="26" viewBox="0 0 40 26"><rect width="40" height="26" fill="%2338383f"/></svg>';
            };
        }
        
        if (map) {
            map.src = info.mapa;
            map.alt = `Mapa del circuito ${info.nombre}`;
            map.onerror = () => {
                map.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231a1a24"/><text x="150" y="100" text-anchor="middle" fill="%23949498" font-family="Arial" font-size="16">Mapa no disponible</text></svg>';
            };
        }
    }

    loadDriverSelectors() {
        const p1Select = document.getElementById('p1-select');
        const p2Select = document.getElementById('p2-select');
        const p3Select = document.getElementById('p3-select');
        
        const selectors = [p1Select, p2Select, p3Select];
        
        selectors.forEach((select, index) => {
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecciona piloto</option>';
            
            this.driversList.forEach(driver => {
                const opt = document.createElement('option');
                opt.value = driver;
                opt.textContent = driver;
                
                // Añadir emoji del equipo si está disponible
                const equipo = this.data.drivers[driver]?.equipo;
                if (equipo) {
                    opt.textContent = `${driver} (${equipo})`;
                }
                
                select.appendChild(opt);
            });
        });
    }

    loadLastRace() {
        const card = document.getElementById('last-race-card');
        
        if (this.sheetsData.results.length > 0 && card) {
            const lastResult = this.sheetsData.results[this.sheetsData.results.length - 1];
            
            card.classList.remove('hidden');
            
            // Nombre de la carrera
            const raceName = document.getElementById('last-race-name');
            if (raceName) {
                raceName.textContent = lastResult.Carrera.split(' (')[0];
            }
            
            // Actualizar imágenes del podio
            const drivers = [
                { id: 'last-p1-img', name: lastResult.P1_Real },
                { id: 'last-p2-img', name: lastResult.P2_Real },
                { id: 'last-p3-img', name: lastResult.P3_Real }
            ];
            
            drivers.forEach(driver => {
                const img = document.getElementById(driver.id);
                if (img && driver.name && this.data.drivers[driver.name]) {
                    img.src = this.data.drivers[driver.name].foto;
                    img.alt = driver.name;
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="%231a1a24" stroke="%2338383f" stroke-width="2"/><text x="40" y="45" text-anchor="middle" fill="%23949498" font-family="Arial" font-size="14">' + driver.name.charAt(0) + '</text></svg>';
                    };
                }
            });
            
            // Guardar datos para cálculo de puntos
            this.state.lastRaceData = lastResult;
            
            // Calcular puntos del último GP
            this.calculatePointsForLastRace();
            
        } else {
            // Ocultar card si no hay resultados
            card?.classList.add('hidden');
        }
    }

    loadUserBetForCurrentGP() {
        const currentGP = this.circuitsList[this.state.selectedGP];
        const user = this.state.currentUser;
        
        // Buscar apuesta existente
        const existingBet = this.sheetsData.bets.find(bet => 
            bet.Carrera === currentGP && bet.Jugador === user
        );
        
        // Actualizar selectores
        const p1Select = document.getElementById('p1-select');
        const p2Select = document.getElementById('p2-select');
        const p3Select = document.getElementById('p3-select');
        
        if (existingBet) {
            console.log(`📝 Cargando apuesta existente para ${user} en ${currentGP}`);
            
            this.state.selectedPodium = [
                existingBet.P1,
                existingBet.P2,
                existingBet.P3
            ];
            
            if (p1Select) p1Select.value = existingBet.P1;
            if (p2Select) p2Select.value = existingBet.P2;
            if (p3Select) p3Select.value = existingBet.P3;
            
            // Actualizar texto del botón
            const saveBtn = document.getElementById('btn-save-bet');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ACTUALIZAR APUESTA';
            }
            
        } else {
            // Resetear si no hay apuesta
            this.state.selectedPodium = ['', '', ''];
            
            if (p1Select) p1Select.value = '';
            if (p2Select) p2Select.value = '';
            if (p3Select) p3Select.value = '';
            
            // Restaurar texto del botón
            const saveBtn = document.getElementById('btn-save-bet');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> GUARDAR APUESTA';
            }
        }
    }

    updatePodiumSelection(position, driver) {
        this.state.selectedPodium[position] = driver;
        console.log(`🏆 Posición ${position + 1}: ${driver}`);
    }

    saveCurrentBet() {
        const currentGP = this.circuitsList[this.state.selectedGP];
        const user = this.state.currentUser;
        
        // Validar que se hayan seleccionado 3 pilotos diferentes
        const selected = this.state.selectedPodium;
        
        if (!selected[0] || !selected[1] || !selected[2]) {
            this.showNotification('❌ Debes seleccionar 3 pilotos', 'error');
            return;
        }
        
        if (selected[0] === selected[1] || selected[0] === selected[2] || selected[1] === selected[2]) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }
        
        console.log(`💾 Guardando apuesta para ${user} en ${currentGP}:`, selected);
        
        // Crear objeto de apuesta
        const betData = {
            Carrera: currentGP,
            Jugador: user,
            P1: selected[0],
            P2: selected[1],
            P3: selected[2],
            Fecha: new Date().toISOString()
        };
        
        // Buscar si ya existe una apuesta
        const existingIndex = this.sheetsData.bets.findIndex(bet => 
            bet.Carrera === currentGP && bet.Jugador === user
        );
        
        if (existingIndex !== -1) {
            // Actualizar apuesta existente
            this.sheetsData.bets[existingIndex] = betData;
            this.showNotification('✅ Apuesta actualizada correctamente', 'success');
        } else {
            // Añadir nueva apuesta
            this.sheetsData.bets.push(betData);
            this.showNotification('✅ Apuesta guardada correctamente', 'success');
        }
        
        // Simular guardado en Google Sheets
        this.simulateSaveToSheets(betData);
        
        // Actualizar UI
        this.loadUserBetForCurrentGP();
    }

    simulateSaveToSheets(betData) {
        console.log('📤 Simulando guardado en Google Sheets:', betData);
        
        // Aquí iría la lógica real para guardar en Google Sheets
        // Por ahora solo mostramos un log
        
        setTimeout(() => {
            console.log('✅ Simulación: Apuesta guardada exitosamente');
        }, 500);
    }

    calculatePointsForLastRace() {
        if (!this.state.lastRaceData) return;
        
        const lastResult = this.state.lastRaceData;
        const currentGP = lastResult.Carrera;
        
        console.log(`🧮 Calculando puntos para ${currentGP}...`);
        
        // Buscar apuestas para esta carrera
        const betsForRace = this.sheetsData.bets.filter(bet => bet.Carrera === currentGP);
        
        betsForRace.forEach(bet => {
            let points = 0;
            
            // Puntos por acierto exacto de posición
            if (bet.P1 === lastResult.P1_Real) points += 5;
            if (bet.P2 === lastResult.P2_Real) points += 3;
            if (bet.P3 === lastResult.P3_Real) points += 2;
            
            // Puntos por piloto en podio (pero no en posición correcta)
            if (bet.P1 === lastResult.P2_Real || bet.P1 === lastResult.P3_Real) points += 1;
            if (bet.P2 === lastResult.P1_Real || bet.P2 === lastResult.P3_Real) points += 1;
            if (bet.P3 === lastResult.P1_Real || bet.P3 === lastResult.P2_Real) points += 1;
            
            // Actualizar puntos totales
            this.sheetsData.points[bet.Jugador] = (this.sheetsData.points[bet.Jugador] || 0) + points;
            
            console.log(`📊 ${bet.Jugador}: ${points} puntos (Total: ${this.sheetsData.points[bet.Jugador]})`);
        });
        
        // Actualizar UI de puntos si estamos en esa pestaña
        if (this.state.currentTab === 'points') {
            this.loadPointsTab();
        }
    }

    loadTabContent(tab) {
        switch(tab) {
            case 'race':
                // Ya está cargado por defecto
                break;
                
            case 'season':
                this.loadSeasonTab();
                break;
                
            case 'points':
                this.loadPointsTab();
                break;
                
            default:
                console.warn(`⚠️ Pestaña desconocida: ${tab}`);
        }
    }

    loadSeasonTab() {
        const tabContent = document.getElementById('tab-season');
        if (!tabContent) return;
        
        console.log('🌍 Cargando pestaña Mundial...');
        
        // Limpiar contenido
        tabContent.innerHTML = '';
        
        // Crear contenido de apuestas mundiales
        const card = document.createElement('div');
        card.className = 'mobile-card';
        
        card.innerHTML = `
            <p class="sub-text">🏆 APUESTAS MUNDIALES 2026</p>
            <div class="season-bets-container mt-20">
                <div class="form-group">
                    <label class="form-label">CAMPEÓN DEL MUNDIO</label>
                    <select id="season-p1" class="form-select">
                        <option value="">Selecciona piloto</option>
                        ${this.driversList.map(driver => 
                            `<option value="${driver}">${driver} (${this.data.drivers[driver]?.equipo || 'Sin equipo'})</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">SUBCAMPEÓN</label>
                    <select id="season-p2" class="form-select">
                        <option value="">Selecciona piloto</option>
                        ${this.driversList.map(driver => 
                            `<option value="${driver}">${driver} (${this.data.drivers[driver]?.equipo || 'Sin equipo'})</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">TERCER LUGAR</label>
                    <select id="season-p3" class="form-select">
                        <option value="">Selecciona piloto</option>
                        ${this.driversList.map(driver => 
                            `<option value="${driver}">${driver} (${this.data.drivers[driver]?.equipo || 'Sin equipo'})</option>`
                        ).join('')}
                    </select>
                </div>
                <button id="btn-save-season" class="btn btn-primary w-100 mt-20">
                    <i class="fas fa-trophy"></i> GUARDAR APUESTA MUNDIAL
                </button>
            </div>
        `;
        
        tabContent.appendChild(card);
        
        // Añadir event listener para el botón de guardar
        const saveBtn = document.getElementById('btn-save-season');
        if (saveBtn) {
            saveBtn.onclick = () => this.saveSeasonBet();
        }
        
        // Cargar apuesta mundial existente si la hay
        this.loadExistingSeasonBet();
    }

    loadExistingSeasonBet() {
        const user = this.state.currentUser;
        
        // Buscar apuesta mundial existente
        const existingBet = this.sheetsData.seasonBets.find(bet => bet.Jugador === user);
        
        if (existingBet) {
            const p1Select = document.getElementById('season-p1');
            const p2Select = document.getElementById('season-p2');
            const p3Select = document.getElementById('season-p3');
            
            if (p1Select) p1Select.value = existingBet.D_P1;
            if (p2Select) p2Select.value = existingBet.D_P2;
            if (p3Select) p3Select.value = existingBet.D_P3;
            
            // Actualizar texto del botón
            const saveBtn = document.getElementById('btn-save-season');
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ACTUALIZAR APUESTA MUNDIAL';
            }
        }
    }

    saveSeasonBet() {
        const user = this.state.currentUser;
        const p1Select = document.getElementById('season-p1');
        const p2Select = document.getElementById('season-p2');
        const p3Select = document.getElementById('season-p3');
        
        if (!p1Select || !p2Select || !p3Select) return;
        
        const seasonBet = {
            D_P1: p1Select.value,
            D_P2: p2Select.value,
            D_P3: p3Select.value
        };
        
        // Validar
        if (!seasonBet.D_P1 || !seasonBet.D_P2 || !seasonBet.D_P3) {
            this.showNotification('❌ Debes seleccionar 3 pilotos', 'error');
            return;
        }
        
        if (seasonBet.D_P1 === seasonBet.D_P2 || seasonBet.D_P1 === seasonBet.D_P3 || seasonBet.D_P2 === seasonBet.D_P3) {
            this.showNotification('❌ Los pilotos deben ser diferentes', 'error');
            return;
        }
        
        console.log(`🌍 Guardando apuesta mundial para ${user}:`, seasonBet);
        
        // Crear objeto completo
        const seasonData = {
            Jugador: user,
            ...seasonBet,
            Fecha: new Date().toISOString()
        };
        
        // Buscar si ya existe
        const existingIndex = this.sheetsData.seasonBets.findIndex(bet => bet.Jugador === user);
        
        if (existingIndex !== -1) {
            this.sheetsData.seasonBets[existingIndex] = seasonData;
            this.showNotification('✅ Apuesta mundial actualizada', 'success');
        } else {
            this.sheetsData.seasonBets.push(seasonData);
            this.showNotification('✅ Apuesta mundial guardada', 'success');
        }
        
        // Simular guardado
        this.simulateSaveSeasonToSheets(seasonData);
    }

    simulateSaveSeasonToSheets(seasonData) {
        console.log('📤 Simulando guardado de apuesta mundial:', seasonData);
        
        setTimeout(() => {
            console.log('✅ Simulación: Apuesta mundial guardada exitosamente');
        }, 500);
    }

    loadPointsTab() {
        const tabContent = document.getElementById('tab-points');
        if (!tabContent) return;
        
        console.log('📊 Cargando pestaña Puntos...');
        
        // Limpiar contenido
        tabContent.innerHTML = '';
        
        // Crear card de clasificación
        const card = document.createElement('div');
        card.className = 'mobile-card';
        
        // Ordenar jugadores por puntos
        const sortedPlayers = Object.entries(this.sheetsData.points)
            .sort((a, b) => b[1] - a[1]);
        
        const pointsTable = sortedPlayers.map(([player, points], index) => {
            const position = index + 1;
            let positionClass = '';
            
            if (position === 1) positionClass = 'first';
            else if (position === 2) positionClass = 'second';
            else if (position === 3) positionClass = 'third';
            
            return `
                <div class="points-row ${positionClass}">
                    <div class="position">${position}º</div>
                    <div class="player-name">${player}</div>
                    <div class="points">${points} pts</div>
                </div>
            `;
        }).join('');
        
        card.innerHTML = `
            <p class="sub-text">📊 CLASIFICACIÓN 2026</p>
            <div class="points-table mt-20">
                ${pointsTable || '<p class="text-center" style="color: var(--f1-light-gray); margin-top: 20px;">No hay puntos registrados todavía</p>'}
            </div>
            <div class="points-info mt-20">
                <p class="sub-text" style="font-size: 0.8rem; margin-bottom: 10px;">SISTEMA DE PUNTOS</p>
                <div class="points-rules">
                    <div class="rule-item">
                        <span class="rule-point">5 pts</span>
                        <span class="rule-text">Acierto exacto de posición</span>
                    </div>
                    <div class="rule-item">
                        <span class="rule-point">3 pts</span>
                        <span class="rule-text">Acierto de posición 2º</span>
                    </div>
                    <div class="rule-item">
                        <span class="rule-point">2 pts</span>
                        <span class="rule-text">Acierto de posición 3º</span>
                    </div>
                    <div class="rule-item">
                        <span class="rule-point">1 pt</span>
                        <span class="rule-text">Piloto en podio (posición incorrecta)</span>
                    </div>
                </div>
            </div>
        `;
        
        tabContent.appendChild(card);
        
        // Añadir estilos para la tabla de puntos
        this.addPointsStyles();
    }

    addPointsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .points-table {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .points-row {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                transition: all 0.3s ease;
            }
            
            .points-row:hover {
                background: rgba(225, 6, 0, 0.05);
            }
            
            .points-row.first {
                background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), transparent);
                border-left: 4px solid #ffd700;
            }
            
            .points-row.second {
                background: linear-gradient(90deg, rgba(192, 192, 192, 0.1), transparent);
                border-left: 4px solid #c0c0c0;
            }
            
            .points-row.third {
                background: linear-gradient(90deg, rgba(205, 127, 50, 0.1), transparent);
                border-left: 4px solid #cd7f32;
            }
            
            .position {
                width: 50px;
                font-weight: 900;
                font-size: 1.2rem;
                color: var(--f1-red);
            }
            
            .player-name {
                flex: 1;
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            .points {
                font-weight: 900;
                font-size: 1.3rem;
                color: var(--f1-white);
                background: var(--f1-red);
                padding: 5px 15px;
                border-radius: 20px;
                min-width: 80px;
                text-align: center;
            }
            
            .points-info {
                background: rgba(255, 255, 255, 0.03);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid rgba(225, 6, 0, 0.1);
            }
            
            .points-rules {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .rule-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 10px;
                background: rgba(255, 255, 255, 0.02);
                border-radius: 8px;
            }
            
            .rule-point {
                background: var(--f1-red);
                color: white;
                padding: 5px 12px;
                border-radius: 6px;
                font-weight: 700;
                font-size: 0.9rem;
                min-width: 60px;
                text-align: center;
            }
            
            .rule-text {
                color: var(--f1-light-gray);
                font-size: 0.9rem;
                flex: 1;
            }
        `;
        
        document.head.appendChild(style);
    }

    refreshData() {
        console.log('🔄 Refrescando datos...');
        
        // Mostrar indicador de carga
        const refreshBtn = document.getElementById('btn-refresh');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }
        
        // Simular carga de datos
        setTimeout(() => {
            // Recargar todo
            this.loadLastRace();
            this.loadUserBetForCurrentGP();
            
            if (this.state.currentTab === 'points') {
                this.loadPointsTab();
            }
            
            // Restaurar botón
            if (refreshBtn) {
                refreshBtn.innerHTML = '<i class="fas fa-redo"></i>';
                refreshBtn.disabled = false;
            }
            
            this.showNotification('✅ Datos actualizados', 'success');
            
        }, 1000);
    }

    loadInitialData() {
        console.log('📥 Cargando datos iniciales...');
        
        // Aquí cargaríamos datos reales de Google Sheets
        // Por ahora usamos datos de ejemplo
        
        // Simular carga asíncrona
        setTimeout(() => {
            this.state.dataLoaded = true;
            console.log('✅ Datos iniciales cargados');
        }, 500);
    }

    showNotification(message, type = 'info') {
        console.log(`📢 Notificación: ${message}`);
        
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;
        
        // Estilos para la notificación
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
            max-width: 300px;
            font-weight: 600;
        `;
        
        // Añadir al body
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Añadir animaciones CSS si no existen
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
    }

    // Método para debug
    debug() {
        console.log('=== DEBUG INFO ===');
        console.log('Estado:', this.state);
        console.log('Datos cargados:', this.sheetsData);
        console.log('Puntos:', this.sheetsData.points);
        console.log('==================');
    }
}

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚦 DOM cargado, iniciando aplicación...');
    
    // Crear instancia global
    window.f1App = new F1CupApp();
    
    // Hacer disponible para debugging
    window.debugF1App = () => window.f1App.debug();
    
    // Manejar tecla Escape para debug
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && e.ctrlKey) {
            window.f1App.debug();
        }
    });
});

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    console.error('❌ Error no capturado:', event.error);
    
    // Mostrar error amigable al usuario
    if (window.f1App && window.f1App.showNotification) {
        window.f1App.showNotification('⚠️ Error en la aplicación. Por favor, recarga la página.', 'error');
    }
});

// Manejar cuando la página se vuelve visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.f1App) {
        console.log('👀 Página visible, actualizando datos...');
        window.f1App.refreshData();
    }
});
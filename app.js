// app.js - Versión completa para GitHub Pages
class F1CupApp {
    constructor() {
        // Estado de la aplicación
        this.state = {
            currentUser: localStorage.getItem('f1_user') || 'Varo',
            currentPage: 'landing',
            currentTab: 'race',
            selectedGP: 0,
            selectedPodium: ['', '', ''],
            seasonBet: null,
            isAdmin: false,
            dataLoaded: false
        };

        // Datos estáticos
        this.data = {
            circuits: {
                "GP Australia (06-08 Mar)": {
                    nombre: "Albert Park", 
                    bandera: "assets/circuitos/au.png", 
                    mapa: "assets/circuitos/australia.png"
                },
                "GP China (13-15 Mar)": {
                    nombre: "Shanghai", 
                    bandera: "assets/circuitos/cn.png", 
                    mapa: "assets/circuitos/china.png"
                },
                "GP Japón (27-29 Mar)": {
                    nombre: "Suzuka", 
                    bandera: "assets/circuitos/jp.png", 
                    mapa: "assets/circuitos/japan.png"
                },
                "GP Bahrein (10-12 Apr)": {
                    nombre: "Bahrain Int.", 
                    bandera: "assets/circuitos/bh.png", 
                    mapa: "assets/circuitos/bahrain.png"
                },
                "GP Arabia Saudí (17-19 Apr)": {
                    nombre: "Jeddah", 
                    bandera: "assets/circuitos/sa.png", 
                    mapa: "assets/circuitos/saudi.png"
                },
                "GP Miami (01-03 May)": {
                    nombre: "Miami", 
                    bandera: "assets/circuitos/us.png", 
                    mapa: "assets/circuitos/miami.png"
                },
                "GP Canadá (22-24 May)": {
                    nombre: "Gilles-Villeneuve", 
                    bandera: "assets/circuitos/ca.png", 
                    mapa: "assets/circuitos/canada.png"
                },
                "GP Mónaco (05-07 Jun)": {
                    nombre: "Monaco", 
                    bandera: "assets/circuitos/mc.png", 
                    mapa: "assets/circuitos/monaco.png"
                },
                "GP Barcelona (12-14 Jun)": {
                    nombre: "Catalunya", 
                    bandera: "assets/circuitos/es.png", 
                    mapa: "assets/circuitos/barcelona.png"
                },
                "GP Austria (26-28 Jun)": {
                    nombre: "Red Bull Ring", 
                    bandera: "assets/circuitos/at.png", 
                    mapa: "assets/circuitos/austria.png"
                },
                "GP Gran Bretaña (03-05 Jul)": {
                    nombre: "Silverstone", 
                    bandera: "assets/circuitos/gb.png", 
                    mapa: "assets/circuitos/britain.png"
                },
                "GP Bélgica (17-19 Jul)": {
                    nombre: "Spa", 
                    bandera: "assets/circuitos/be.png", 
                    mapa: "assets/circuitos/belgium.png"
                },
                "GP Hungría (24-26 Jul)": {
                    nombre: "Hungaroring", 
                    bandera: "assets/circuitos/hu.png", 
                    mapa: "assets/circuitos/hungary.png"
                },
                "GP Países Bajos (21-23 Aug)": {
                    nombre: "Zandvoort", 
                    bandera: "assets/circuitos/nl.png", 
                    mapa: "assets/circuitos/dutch.png"
                },
                "GP Italia (04-06 Sep)": {
                    nombre: "Monza", 
                    bandera: "assets/circuitos/it.png", 
                    mapa: "assets/circuitos/italy.png"
                },
                "GP España - Madrid (11-13 Sep)": {
                    nombre: "IFEMA Madrid", 
                    bandera: "assets/circuitos/es.png", 
                    mapa: "assets/circuitos/madrid.png"
                },
                "GP Azerbaiyán (24-26 Sep)": {
                    nombre: "Baku", 
                    bandera: "assets/circuitos/az.png", 
                    mapa: "assets/circuitos/baku.png"
                },
                "GP Singapur (09-11 Oct)": {
                    nombre: "Marina Bay", 
                    bandera: "assets/circuitos/sg.png", 
                    mapa: "assets/circuitos/singapore.png"
                },
                "GP Austin USA (23-25 Oct)": {
                    nombre: "COTA", 
                    bandera: "assets/circuitos/us.png", 
                    mapa: "assets/circuitos/austin.png"
                },
                "GP México (30 Oct - 01 Nov)": {
                    nombre: "Hermanos Rdz", 
                    bandera: "assets/circuitos/mx.png", 
                    mapa: "assets/circuitos/mexico.png"
                },
                "GP Brasil (06-08 Nov)": {
                    nombre: "Interlagos", 
                    bandera: "assets/circuitos/br.png", 
                    mapa: "assets/circuitos/brazil.png"
                },
                "GP Las Vegas (19-21 Nov)": {
                    nombre: "Las Vegas", 
                    bandera: "assets/circuitos/us.png", 
                    mapa: "assets/circuitos/vegas.png"
                },
                "GP Qatar (27-29 Nov)": {
                    nombre: "Lusail", 
                    bandera: "assets/circuitos/qa.png", 
                    mapa: "assets/circuitos/qatar.png"
                },
                "GP Abu Dhabi (04-06 Dec)": {
                    nombre: "Yas Marina", 
                    bandera: "assets/circuitos/ae.png", 
                    mapa: "assets/circuitos/abudhabi.png"
                }
            },
            
            drivers: {
                "Albon": { foto: "assets/pilotos/albon.png", equipo: "Williams" },
                "Alonso": { foto: "assets/pilotos/alonso.png", equipo: "Aston Martin" },
                "Antonelli": { foto: "assets/pilotos/antonelli.png", equipo: "Mercedes" },
                "Bearman": { foto: "assets/pilotos/bearman.png", equipo: "Haas" },
                "Bortoleto": { foto: "assets/pilotos/bortoleto.png", equipo: "Audi" },
                "Bottas": { foto: "assets/pilotos/bottas.png", equipo: "Cadillac" },
                "Colapinto": { foto: "assets/pilotos/colapinto.png", equipo: "Alpine" },
                "Gasly": { foto: "assets/pilotos/gasly.png", equipo: "Alpine" },
                "Hadjar": { foto: "assets/pilotos/hadjar.png", equipo: "Red Bull" },
                "Hamilton": { foto: "assets/pilotos/hamilton.png", equipo: "Ferrari" },
                "Hulkenberg": { foto: "assets/pilotos/hulkenberg.png", equipo: "Audi" },
                "Lawson": { foto: "assets/pilotos/lawson.png", equipo: "Racing Bulls" },
                "Leclerc": { foto: "assets/pilotos/leclerc.png", equipo: "Ferrari" },
                "Lindblad": { foto: "assets/pilotos/lindblad.png", equipo: "Racing Bulls" },
                "Norris": { foto: "assets/pilotos/norris.png", equipo: "McLaren" },
                "Ocon": { foto: "assets/pilotos/ocon.png", equipo: "Haas" },
                "Perez": { foto: "assets/pilotos/perez.png", equipo: "Cadillac" },
                "Piastri": { foto: "assets/pilotos/piastri.png", equipo: "McLaren" },
                "Russell": { foto: "assets/pilotos/russell.png", equipo: "Mercedes" },
                "Sainz": { foto: "assets/pilotos/sainz.png", equipo: "Williams" },
                "Stroll": { foto: "assets/pilotos/stroll.png", equipo: "Aston Martin" },
                "Verstappen": { foto: "assets/pilotos/verstappen.png", equipo: "Red Bull" }
            },
            
            teams: {
                "Alpine": "assets/equipos/alpine.png",
                "Aston Martin": "assets/equipos/aston_martin.png",
                "Audi": "assets/equipos/audi.png",
                "Cadillac": "assets/equipos/cadillac.png",
                "Ferrari": "assets/equipos/ferrari.png",
                "Haas": "assets/equipos/haas.png",
                "McLaren": "assets/equipos/mclaren.png",
                "Mercedes": "assets/equipos/mercedes.png",
                "Racing Bulls": "assets/equipos/rb.png",
                "Red Bull": "assets/equipos/redbull.png",
                "Williams": "assets/equipos/williams.png"
            }
        };

        // Datos dinámicos (Google Sheets)
        this.sheetsData = {
            bets: [],
            results: [],
            seasonBets: [],
            points: { Varo: 0, Cía: 0 }
        };

        this.circuitsList = Object.keys(this.data.circuits);
        this.driversList = Object.keys(this.data.drivers).sort();
        this.teamsList = Object.keys(this.data.teams).sort();

        this.init();
    }

    async init() {
        // Ocultar loading después de 1.5 segundos
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            
            // Cargar datos
            this.loadLocalData();
            this.setupEventListeners();
            this.updateUI();
            this.loadSheetsData();
            
            // Configurar Firebase si existe
            if (window.firebaseApp) {
                this.setupFirebase();
            }
        }, 1500);
    }

    setupEventListeners() {
        // Landing page
        document.getElementById('btn-varo').addEventListener('click', () => this.selectUser('Varo'));
        document.getElementById('btn-cia').addEventListener('click', () => this.selectUser('Cía'));
        
        // Admin
        document.getElementById('toggle-admin').addEventListener('click', () => this.toggleAdmin());
        document.getElementById('admin-password').addEventListener('input', (e) => this.checkAdminPassword(e.target.value));
        document.getElementById('btn-publish').addEventListener('click', () => this.publishResults());
        
        // Main app
        document.getElementById('btn-back').addEventListener('click', () => this.goToLanding());
        document.getElementById('btn-refresh').addEventListener('click', () => this.refreshData());
        
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Race tab
        document.getElementById('gp-select').addEventListener('change', (e) => {
            this.state.selectedGP = e.target.value;
            this.updateCircuitInfo();
        });
        
        ['p1', 'p2', 'p3'].forEach((pos, index) => {
            document.getElementById(`select-${pos}`).addEventListener('change', (e) => {
                this.state.selectedPodium[index] = e.target.value;
                this.updateDriverPreview(pos, e.target.value);
            });
        });
        
        document.getElementById('btn-submit-bet').addEventListener('click', () => this.submitBet());
        
        // Season tab
        ['dp1', 'dp2', 'dp3'].forEach(pos => {
            document.getElementById(`season-${pos}`).addEventListener('change', (e) => {
                this.updateChampionPreview(pos, e.target.value);
            });
        });
        
        ['tp1', 'tp2', 'tp3'].forEach(pos => {
            document.getElementById(`season-${pos}`).addEventListener('change', (e) => {
                this.updateTeamPreview(pos, e.target.value);
            });
        });
        
        document.getElementById('btn-submit-season').addEventListener('click', () => this.submitSeasonBet());
        
        // Modals
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
    }

    selectUser(user) {
        this.state.currentUser = user;
        localStorage.setItem('f1_user', user);
        
        // Actualizar UI
        document.querySelectorAll('.player-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (user === 'Varo') {
            document.getElementById('btn-varo').classList.add('active');
            document.getElementById('current-user').textContent = 'VARO';
            document.getElementById('current-user').style.color = '#007bff';
        } else {
            document.getElementById('btn-cia').classList.add('active');
            document.getElementById('current-user').textContent = 'CÍA';
            document.getElementById('current-user').style.color = '#e83e8c';
        }
        
        // Ir a la app principal
        this.state.currentPage = 'main';
        this.updateUI();
    }

    goToLanding() {
        this.state.currentPage = 'landing';
        this.updateUI();
    }

    switchTab(tab) {
        this.state.currentTab = tab;
        
        // Actualizar botones de tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });
        
        // Actualizar contenido
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        document.getElementById(`tab-${tab}`).classList.add('active');
        
        // Cargar datos específicos del tab
        if (tab === 'points') {
            this.calculatePoints();
        } else if (tab === 'season') {
            this.loadSeasonBet();
        }
    }

    updateUI() {
        // Actualizar visibilidad de páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        if (this.state.currentPage === 'landing') {
            document.getElementById('landing-page').classList.add('active');
            this.updateLandingStats();
        } else {
            document.getElementById('main-page').classList.add('active');
            this.loadMainApp();
        }
    }

    updateLandingStats() {
        // Calcular puntos para landing
        const varoPoints = this.sheetsData.points.Varo || 0;
        const ciaPoints = this.sheetsData.points.Cía || 0;
        
        document.getElementById('stats-varo').textContent = varoPoints;
        document.getElementById('stats-cia').textContent = ciaPoints;
    }

    loadMainApp() {
        // Cargar selectores
        this.loadGPSelector();
        this.loadDriverSelectors();
        this.loadSeasonSelectors();
        this.updateCircuitInfo();
        
        // Cargar última carrera
        this.loadLastRace();
        
        // Actualizar pestaña actual
        this.switchTab(this.state.currentTab);
    }

    loadGPSelector() {
        const select = document.getElementById('gp-select');
        select.innerHTML = '';
        
        this.circuitsList.forEach((circuit, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = circuit;
            select.appendChild(option);
        });
        
        // También para admin
        const adminSelect = document.getElementById('admin-gp-select');
        adminSelect.innerHTML = '';
        
        this.circuitsList.forEach((circuit, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = circuit;
            adminSelect.appendChild(option);
        });
    }

    loadDriverSelectors() {
        const selectors = [
            'select-p1', 'select-p2', 'select-p3',
            'admin-p1', 'admin-p2', 'admin-p3',
            'season-dp1', 'season-dp2', 'season-dp3'
        ];
        
        selectors.forEach(selectorId => {
            const select = document.getElementById(selectorId);
            if (!select) return;
            
            // Guardar placeholder
            const placeholder = select.querySelector('option[value=""]');
            select.innerHTML = '';
            if (placeholder) select.appendChild(placeholder);
            
            // Agregar pilotos
            this.driversList.forEach(driver => {
                const option = document.createElement('option');
                option.value = driver;
                option.textContent = driver;
                select.appendChild(option);
            });
        });
    }

    loadSeasonSelectors() {
        const selectors = ['season-tp1', 'season-tp2', 'season-tp3'];
        
        selectors.forEach(selectorId => {
            const select = document.getElementById(selectorId);
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecciona equipo</option>';
            
            this.teamsList.forEach(team => {
                const option = document.createElement('option');
                option.value = team;
                option.textContent = team;
                select.appendChild(option);
            });
        });
    }

    updateCircuitInfo() {
        const circuit = this.circuitsList[this.state.selectedGP];
        const info = this.data.circuits[circuit];
        
        if (info) {
            document.getElementById('circuit-name').textContent = info.nombre;
            
            // Actualizar imágenes
            this.updateImage('circuit-flag', info.bandera, info.nombre);
            this.updateImage('circuit-map', info.mapa, `Mapa de ${info.nombre}`);
        }
    }

    updateDriverPreview(position, driverName) {
        const driver = this.data.drivers[driverName];
        if (driver) {
            document.getElementById(`name-${position}`).textContent = driverName;
            document.getElementById(`team-${position}`).textContent = driver.equipo;
            this.updateImage(`preview-${position}`, driver.foto, driverName);
        } else {
            document.getElementById(`name-${position}`).textContent = '';
            document.getElementById(`team-${position}`).textContent = '';
            document.getElementById(`preview-${position}`).src = '';
        }
    }

    updateChampionPreview(position, driverName) {
        const driver = this.data.drivers[driverName];
        if (driver) {
            this.updateImage(`preview-${position}`, driver.foto, driverName);
        } else {
            document.getElementById(`preview-${position}`).src = '';
        }
    }

    updateTeamPreview(position, teamName) {
        const teamLogo = this.data.teams[teamName];
        if (teamLogo) {
            this.updateImage(`preview-${position}`, teamLogo, teamName);
        } else {
            document.getElementById(`preview-${position}`).src = '';
        }
    }

    updateImage(elementId, src, alt) {
        const img = document.getElementById(elementId);
        if (img) {
            img.src = src;
            img.alt = alt;
            
            // Manejar errores de imagen
            img.onerror = () => {
                img.style.display = 'none';
                const parent = img.parentElement;
                const fallback = document.createElement('div');
                fallback.className = 'image-fallback';
                fallback.textContent = alt;
                parent.appendChild(fallback);
            };
            
            img.onload = () => {
                img.style.display = 'block';
                const fallback = img.parentElement.querySelector('.image-fallback');
                if (fallback) fallback.remove();
            };
        }
    }

    async submitBet() {
        // Validar selección
        if (this.state.selectedPodium.includes('')) {
            this.showError('Debes seleccionar 3 pilotos para el podio');
            return;
        }
        
        // Validar pilotos únicos
        const uniqueDrivers = new Set(this.state.selectedPodium);
        if (uniqueDrivers.size !== 3) {
            this.showError('Los 3 pilotos deben ser diferentes');
            return;
        }
        
        const circuit = this.circuitsList[this.state.selectedGP];
        const bet = {
            id: Date.now(),
            Carrera: circuit,
            Jugador: this.state.currentUser,
            P1: this.state.selectedPodium[0],
            P2: this.state.selectedPodium[1],
            P3: this.state.selectedPodium[2],
            Fecha: new Date().toISOString()
        };
        
        try {
            // Guardar localmente
            this.sheetsData.bets.push(bet);
            this.saveLocalData();
            
            // Enviar a Google Sheets (simulado)
            await this.saveToSheets('Apuestas', bet);
            
            // Mostrar éxito
            this.showSuccess(
                'Apuesta Registrada',
                `Has apostado para ${circuit.split(' (')[0]}<br><br>
                🥇 ${bet.P1}<br>
                🥈 ${bet.P2}<br>
                🥉 ${bet.P3}`
            );
            
            // Resetear selección
            this.state.selectedPodium = ['', '', ''];
            ['p1', 'p2', 'p3'].forEach(pos => {
                document.getElementById(`select-${pos}`).value = '';
                document.getElementById(`preview-${pos}`).src = '';
                document.getElementById(`name-${pos}`).textContent = '';
                document.getElementById(`team-${pos}`).textContent = '';
            });
            
        } catch (error) {
            this.showError('Error al guardar la apuesta: ' + error.message);
        }
    }

    async submitSeasonBet() {
        const drivers = ['dp1', 'dp2', 'dp3'].map(pos => 
            document.getElementById(`season-${pos}`).value
        );
        
        const teams = ['tp1', 'tp2', 'tp3'].map(pos => 
            document.getElementById(`season-${pos}`).value
        );
        
        // Validar
        if (drivers.includes('') || teams.includes('')) {
            this.showError('Debes completar todas las selecciones');
            return;
        }
        
        // Validar pilotos únicos
        if (new Set(drivers).size !== 3) {
            this.showError('Los 3 pilotos deben ser diferentes');
            return;
        }
        
        // Validar equipos únicos
        if (new Set(teams).size !== 3) {
            this.showError('Los 3 equipos deben ser diferentes');
            return;
        }
        
        const seasonBet = {
            Jugador: this.state.currentUser,
            D_P1: drivers[0],
            D_P2: drivers[1],
            D_P3: drivers[2],
            T_P1: teams[0],
            T_P2: teams[1],
            T_P3: teams[2],
            Fecha: new Date().toISOString()
        };
        
        try {
            // Guardar localmente
            this.sheetsData.seasonBets.push(seasonBet);
            this.saveLocalData();
            
            // Enviar a Google Sheets (simulado)
            await this.saveToSheets('Mundial', seasonBet);
            
            // Mostrar éxito
            this.showSuccess(
                'Apuesta Mundial Registrada',
                'Tu apuesta para el mundial ha sido bloqueada correctamente'
            );
            
            // Actualizar UI
            this.loadSeasonBet();
            
        } catch (error) {
            this.showError('Error al guardar la apuesta mundial: ' + error.message);
        }
    }

    loadSeasonBet() {
        const userBet = this.sheetsData.seasonBets.find(
            bet => bet.Jugador === this.state.currentUser
        );
        
        if (userBet) {
            // Mostrar apuesta existente
            document.getElementById('season-bet-form').style.display = 'none';
            document.getElementById('season-bet-info').style.display = 'block';
            
            // Crear contenido
            const content = `
                <div class="season-bet-display">
                    <h4>Pilotos:</h4>
                    <div class="season-drivers">
                        <div class="season-driver">
                            <span>🥇 ${userBet.D_P1}</span>
                            <small>${this.data.drivers[userBet.D_P1]?.equipo || ''}</small>
                        </div>
                        <div class="season-driver">
                            <span>🥈 ${userBet.D_P2}</span>
                            <small>${this.data.drivers[userBet.D_P2]?.equipo || ''}</small>
                        </div>
                        <div class="season-driver">
                            <span>🥉 ${userBet.D_P3}</span>
                            <small>${this.data.drivers[userBet.D_P3]?.equipo || ''}</small>
                        </div>
                    </div>
                    
                    <h4>Equipos:</h4>
                    <div class="season-teams">
                        <div class="season-team">🥇 ${userBet.T_P1}</div>
                        <div class="season-team">🥈 ${userBet.T_P2}</div>
                        <div class="season-team">🥉 ${userBet.T_P3}</div>
                    </div>
                    
                    <div class="season-date">
                        <small>Bloqueada: ${new Date(userBet.Fecha).toLocaleDateString('es-ES')}</small>
                    </div>
                </div>
            `;
            
            document.getElementById('season-bet-info').innerHTML = 
                '<h3><i class="fas fa-check-circle"></i> APUESTA REGISTRADA</h3>' + content;
                
        } else {
            // Mostrar formulario
            document.getElementById('season-bet-form').style.display = 'block';
            document.getElementById('season-bet-info').style.display = 'none';
        }
    }

    loadLastRace() {
        if (this.sheetsData.results.length > 0) {
            const lastResult = this.sheetsData.results[this.sheetsData.results.length - 1];
            
            document.getElementById('last-race-card').style.display = 'block';
            document.getElementById('last-race-name').textContent = lastResult.Carrera.split(' (')[0];
            
            // Actualizar podio
            ['P1', 'P2', 'P3'].forEach((pos, index) => {
                const driverName = lastResult[`${pos}_Real`];
                if (driverName && this.data.drivers[driverName]) {
                    document.getElementById(`last-${pos.toLowerCase()}-name`).textContent = driverName;
                    this.updateImage(
                        `last-${pos.toLowerCase()}-img`,
                        this.data.drivers[driverName].foto,
                        driverName
                    );
                }
            });
        }
    }

    calculatePoints() {
        // Simular cálculo de puntos (similar a tu lógica de Streamlit)
        let racePoints = { Varo: 0, Cía: 0 };
        let seasonPoints = { Varo: 0, Cía: 0 };
        
        // Calcular puntos por carrera
        this.sheetsData.results.forEach(result => {
            const varoBet = this.sheetsData.bets.find(
                b => b.Carrera === result.Carrera && b.Jugador === 'Varo'
            );
            const ciaBet = this.sheetsData.bets.find(
                b => b.Carrera === result.Carrera && b.Jugador === 'Cía'
            );
            
            if (varoBet) {
                racePoints.Varo += this.calculateRacePoints(varoBet, result);
            }
            if (ciaBet) {
                racePoints.Cía += this.calculateRacePoints(ciaBet, result);
            }
        });
        
        // Calcular puntos del mundial
        const finalResult = this.sheetsData.seasonBets.find(b => b.Jugador === 'RESULTADO_FINAL');
        if (finalResult) {
            ['Varo', 'Cía'].forEach(player => {
                const playerBet = this.sheetsData.seasonBets.find(b => b.Jugador === player);
                if (playerBet) {
                    seasonPoints[player] = this.calculateSeasonPoints(playerBet, finalResult);
                }
            });
        }
        
        // Actualizar UI
        document.getElementById('total-varo').textContent = racePoints.Varo + seasonPoints.Varo;
        document.getElementById('total-cia').textContent = racePoints.Cía + seasonPoints.Cía;
        document.getElementById('race-varo').textContent = racePoints.Varo;
        document.getElementById('race-cia').textContent = racePoints.Cía;
        document.getElementById('season-varo').textContent = seasonPoints.Varo;
        document.getElementById('season-cia').textContent = seasonPoints.Cía;
        
        // Actualizar tabla de carreras
        this.updateRacesTable();
    }

    calculateRacePoints(bet, result) {
        let points = 0;
        const podium = [
            result.P1_Real,
            result.P2_Real, 
            result.P3_Real
        ];
        
        // Puntos por aciertos exactos
        if (bet.P1 === result.P1_Real) points += 5;
        if (bet.P2 === result.P2_Real) points += 5;
        if (bet.P3 === result.P3_Real) points += 5;
        
        // Puntos por estar en podio
        if (bet.P1 !== result.P1_Real && podium.includes(bet.P1)) points += 2;
        if (bet.P2 !== result.P2_Real && podium.includes(bet.P2)) points += 2;
        if (bet.P3 !== result.P3_Real && podium.includes(bet.P3)) points += 2;
        
        return points;
    }

    calculateSeasonPoints(playerBet, finalResult) {
        let points = 0;
        const driverPodium = [finalResult.D_P1, finalResult.D_P2, finalResult.D_P3];
        const teamPodium = [finalResult.T_P1, finalResult.T_P2, finalResult.T_P3];
        
        // Puntos por pilotos
        if (playerBet.D_P1 === finalResult.D_P1) points += 10;
        else if (driverPodium.includes(playerBet.D_P1)) points += 4;
        
        if (playerBet.D_P2 === finalResult.D_P2) points += 8;
        else if (driverPodium.includes(playerBet.D_P2)) points += 4;
        
        if (playerBet.D_P3 === finalResult.D_P3) points += 6;
        else if (driverPodium.includes(playerBet.D_P3)) points += 4;
        
        // Puntos por equipos
        if (playerBet.T_P1 === finalResult.T_P1) points += 10;
        else if (teamPodium.includes(playerBet.T_P1)) points += 4;
        
        if (playerBet.T_P2 === finalResult.T_P2) points += 8;
        else if (teamPodium.includes(playerBet.T_P2)) points += 4;
        
        if (playerBet.T_P3 === finalResult.T_P3) points += 6;
        else if (teamPodium.includes(playerBet.T_P3)) points += 4;
        
        return points;
    }

    updateRacesTable() {
        const table = document.getElementById('races-table');
        if (this.sheetsData.results.length === 0) {
            table.innerHTML = '<p class="no-races">Aún no hay carreras disputadas</p>';
            return;
        }
        
        let html = `
            <table>
                <thead>
                    <tr>
                        <th>GP</th>
                        <th>VARO</th>
                        <th>CÍA</th>
                        <th>BONUS</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        this.sheetsData.results.forEach(result => {
            const varoBet = this.sheetsData.bets.find(
                b => b.Carrera === result.Carrera && b.Jugador === 'Varo'
            );
            const ciaBet = this.sheetsData.bets.find(
                b => b.Carrera === result.Carrera && b.Jugador === 'Cía'
            );
            
            let varoPoints = 0;
            let ciaPoints = 0;
            let bonus = "-";
            
            if (varoBet && ciaBet) {
                varoPoints = this.calculateRacePoints(varoBet, result);
                ciaPoints = this.calculateRacePoints(ciaBet, result);
                
                // Calcular bonus (suma de posiciones)
                const varoSum = this.getPositionSum(varoBet, result);
                const ciaSum = this.getPositionSum(ciaBet, result);
                
                if (varoSum < ciaSum) {
                    varoPoints += 1;
                    bonus = "Varo +1";
                } else if (ciaSum < varoSum) {
                    ciaPoints += 1;
                    bonus = "Cía +1";
                }
            }
            
            html += `
                <tr>
                    <td>${result.Carrera.split(' (')[0]}</td>
                    <td>${varoPoints}</td>
                    <td>${ciaPoints}</td>
                    <td>${bonus}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        table.innerHTML = html;
    }

    getPositionSum(bet, result) {
        let sum = 0;
        
        ['P1', 'P2', 'P3'].forEach(pos => {
            const driver = bet[pos];
            for (let i = 1; i <= 22; i++) {
                if (result[`P${i}_Real`] === driver) {
                    sum += i;
                    break;
                }
            }
        });
        
        return sum;
    }

    // Admin functions
    toggleAdmin() {
        const panel = document.getElementById('admin-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }

    checkAdminPassword(password) {
        const adminContent = document.getElementById('admin-content');
        if (password === 'admin123') {
            this.state.isAdmin = true;
            adminContent.style.display = 'block';
            
            // Cargar datos para admin
            this.loadAdminData();
        } else {
            this.state.isAdmin = false;
            adminContent.style.display = 'none';
        }
    }

    loadAdminData() {
        // Cargar última carrera para admin
        if (this.sheetsData.results.length > 0) {
            const lastResult = this.sheetsData.results[this.sheetsData.results.length - 1];
            const circuitIndex = this.circuitsList.findIndex(c => c === lastResult.Carrera);
            
            if (circuitIndex !== -1) {
                document.getElementById('admin-gp-select').value = circuitIndex;
                document.getElementById('admin-p1').value = lastResult.P1_Real || '';
                document.getElementById('admin-p2').value = lastResult.P2_Real || '';
                document.getElementById('admin-p3').value = lastResult.P3_Real || '';
            }
        }
    }

    async publishResults() {
        if (!this.state.isAdmin) {
            this.showError('No tienes permisos de administrador');
            return;
        }
        
        const circuitIndex = document.getElementById('admin-gp-select').value;
        const circuit = this.circuitsList[circuitIndex];
        const p1 = document.getElementById('admin-p1').value;
        const p2 = document.getElementById('admin-p2').value;
        const p3 = document.getElementById('admin-p3').value;
        
        if (!p1 || !p2 || !p3) {
            this.showError('Debes completar todo el podio');
            return;
        }
        
        const result = {
            Carrera: circuit,
            P1_Real: p1,
            P2_Real: p2,
            P3_Real: p3,
            Fecha: new Date().toISOString()
        };
        
        try {
            // Guardar localmente
            this.sheetsData.results.push(result);
            this.saveLocalData();
            
            // Enviar a Google Sheets (simulado)
            await this.saveToSheets('Resultados', result);
            
            this.showSuccess(
                'Resultados Publicados',
                `Podio de ${circuit.split(' (')[0]} publicado correctamente:<br><br>
                🥇 ${p1}<br>
                🥈 ${p2}<br>
                🥉 ${p3}`
            );
            
            // Actualizar UI
            this.loadLastRace();
            this.calculatePoints();
            
        } catch (error) {
            this.showError('Error al publicar resultados: ' + error.message);
        }
    }

    // Data management
    loadLocalData() {
        try {
            const saved = localStorage.getItem('f1_2026_cup_data');
            if (saved) {
                const data = JSON.parse(saved);
                this.sheetsData = { ...this.sheetsData, ...data };
            }
        } catch (error) {
            console.error('Error loading local data:', error);
        }
    }

    saveLocalData() {
        try {
            localStorage.setItem('f1_2026_cup_data', JSON.stringify(this.sheetsData));
        } catch (error) {
            console.error('Error saving local data:', error);
        }
    }

    async loadSheetsData() {
        try {
            // Simular carga desde Google Sheets
            // En una implementación real, usarías la API de Google Sheets
            
            // Por ahora, usamos datos de ejemplo
            this.sheetsData = {
                bets: [],
                results: [],
                seasonBets: [],
                points: { Varo: 0, Cía: 0 }
            };
            
            this.state.dataLoaded = true;
            
        } catch (error) {
            console.error('Error loading sheets data:', error);
            this.showError('Error al cargar datos');
        }
    }

    async saveToSheets(sheetName, data) {
        // Simular guardado en Google Sheets
        // En una implementación real, usarías la API de Google Sheets
        
        console.log(`Simulating save to ${sheetName}:`, data);
        
        // Simular retardo de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return { success: true };
    }

    async refreshData() {
        try {
            await this.loadSheetsData();
            this.updateUI();
            this.showSuccess('Datos Actualizados', 'Los datos se han refrescado correctamente');
        } catch (error) {
            this.showError('Error al refrescar datos');
        }
    }

    // UI Helpers
    showSuccess(title, message) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').innerHTML = message;
        document.getElementById('modal-success').style.display = 'flex';
    }

    showError(message) {
        document.getElementById('error-message').textContent = message;
        document.getElementById('modal-error').style.display = 'flex';
    }

    // Firebase integration (opcional)
    setupFirebase() {
        if (window.firebaseApp) {
            try {
                this.db = firebase.database();
                this.setupFirebaseListeners();
            } catch (error) {
                console.error('Error setting up Firebase:', error);
            }
        }
    }

    setupFirebaseListeners() {
        if (!this.db) return;
        
        // Escuchar cambios en apuestas
        this.db.ref('bets').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.sheetsData.bets = Object.values(data);
                this.saveLocalData();
            }
        });
        
        // Escuchar cambios en resultados
        this.db.ref('results').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.sheetsData.results = Object.values(data);
                this.saveLocalData();
                this.loadLastRace();
                this.calculatePoints();
            }
        });
    }
}

// Inicializar la app cuando se cargue la página
window.addEventListener('DOMContentLoaded', () => {
    window.f1App = new F1CupApp();
});
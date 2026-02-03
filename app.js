// app.js - Versión Unificada y Corregida
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
            dataLoaded: false
        };

        this.data = {
            circuits: {
                "GP Australia (06-08 Mar)": { nombre: "Albert Park", bandera: "./assets/circuitos/au.png", mapa: "./assets/circuitos/australia.png" },
                "GP China (13-15 Mar)": { nombre: "Shanghai", bandera: "./assets/circuitos/cn.png", mapa: "./assets/circuitos/china.png" },
                "GP Japón (27-29 Mar)": { nombre: "Suzuka", bandera: "./assets/circuitos/jp.png", mapa: "./assets/circuitos/japan.png" },
                "GP Bahrein (10-12 Apr)": { nombre: "Bahrain Int.", bandera: "./assets/circuitos/bh.png", mapa: "./assets/circuitos/bahrain.png" },
                "GP Arabia Saudí (17-19 Apr)": { nombre: "Jeddah", bandera: "./assets/circuitos/sa.png", mapa: "./assets/circuitos/saudi.png" },
                "GP Miami (01-03 May)": { nombre: "Miami", bandera: "./assets/circuitos/us.png", mapa: "./assets/circuitos/miami.png" },
                "GP Canadá (22-24 May)": { nombre: "Gilles-Villeneuve", bandera: "./assets/circuitos/ca.png", mapa: "./assets/circuitos/canada.png" },
                "GP Mónaco (05-07 Jun)": { nombre: "Monaco", bandera: "./assets/circuitos/mc.png", mapa: "./assets/circuitos/monaco.png" },
                "GP Barcelona (12-14 Jun)": { nombre: "Catalunya", bandera: "./assets/circuitos/es.png", mapa: "./assets/circuitos/barcelona.png" },
                "GP Austria (26-28 Jun)": { nombre: "Red Bull Ring", bandera: "./assets/circuitos/at.png", mapa: "./assets/circuitos/austria.png" },
                "GP Gran Bretaña (03-05 Jul)": { nombre: "Silverstone", bandera: "./assets/circuitos/gb.png", mapa: "./assets/circuitos/britain.png" },
                "GP Bélgica (17-19 Jul)": { nombre: "Spa", bandera: "./assets/circuitos/be.png", mapa: "./assets/circuitos/belgium.png" },
                "GP Hungría (24-26 Jul)": { nombre: "Hungaroring", bandera: "./assets/circuitos/hu.png", mapa: "./assets/circuitos/hungary.png" },
                "GP Países Bajos (21-23 Aug)": { nombre: "Zandvoort", bandera: "./assets/circuitos/nl.png", mapa: "./assets/circuitos/dutch.png" },
                "GP Italia (04-06 Sep)": { nombre: "Monza", bandera: "./assets/circuitos/it.png", mapa: "./assets/circuitos/italy.png" },
                "GP España - Madrid (11-13 Sep)": { nombre: "IFEMA Madrid", bandera: "./assets/circuitos/es.png", mapa: "./assets/circuitos/madrid.png" },
                "GP Azerbaiyán (24-26 Sep)": { nombre: "Baku", bandera: "./assets/circuitos/az.png", mapa: "./assets/circuitos/baku.png" },
                "GP Singapur (09-11 Oct)": { nombre: "Marina Bay", bandera: "./assets/circuitos/sg.png", mapa: "./assets/circuitos/singapore.png" },
                "GP Austin USA (23-25 Oct)": { nombre: "COTA", bandera: "./assets/circuitos/us.png", mapa: "./assets/circuitos/austin.png" },
                "GP México (30 Oct - 01 Nov)": { nombre: "Hermanos Rdz", bandera: "./assets/circuitos/mx.png", mapa: "./assets/circuitos/mexico.png" },
                "GP Brasil (06-08 Nov)": { nombre: "Interlagos", bandera: "./assets/circuitos/br.png", mapa: "./assets/circuitos/brazil.png" },
                "GP Las Vegas (19-21 Nov)": { nombre: "Las Vegas", bandera: "./assets/circuitos/us.png", mapa: "./assets/circuitos/vegas.png" },
                "GP Qatar (27-29 Nov)": { nombre: "Lusail", bandera: "./assets/circuitos/qa.png", mapa: "./assets/circuitos/qatar.png" },
                "GP Abu Dhabi (04-06 Dec)": { nombre: "Yas Marina", bandera: "./assets/circuitos/ae.png", mapa: "./assets/circuitos/abudhabi.png" }
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
                "Hamilton": { foto: "./assets/pilotos/hamilton.png", equipo: Ferrari },
                "Hulkenberg": { foto: "./assets/pilotos/hulkenberg.png", equipo: "Audi" },
                "Lawson": { foto: "./assets/pilotos/lawson.png", equipo: "Racing Bulls" },
                "Leclerc": { foto: "./assets/pilotos/leclerc.png", equipo: Ferrari },
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

        this.sheetsData = { bets: [], results: [], seasonBets: [], points: { Varo: 0, Cía: 0 } };
        this.circuitsList = Object.keys(this.data.circuits);
        this.driversList = Object.keys(this.data.drivers).sort();
        
        this.init();
    }

    init() {
        setTimeout(() => {
            const loading = document.getElementById('loading');
            const app = document.getElementById('app');
            if (loading) loading.style.display = 'none';
            if (app) app.style.display = 'block';
            
            this.setupEventListeners();
            this.updateUI();
        }, 1000);
    }

    setupEventListeners() {
        const btnVaro = document.getElementById('btn-varo');
        const btnCia = document.getElementById('btn-cia');
        const btnBack = document.getElementById('btn-back');

        if (btnVaro) btnVaro.onclick = () => this.selectUser('Varo');
        if (btnCia) btnCia.onclick = () => this.selectUser('Cía');
        if (btnBack) btnBack.onclick = () => this.goToLanding();

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => this.switchTab(e.target.dataset.tab);
        });

        const gpSelect = document.getElementById('gp-select');
        if (gpSelect) {
            gpSelect.onchange = (e) => {
                this.state.selectedGP = e.target.value;
                this.updateCircuitInfo();
            };
        }
    }

    selectUser(user) {
        this.state.currentUser = user;
        localStorage.setItem('f1_user', user);
        
        const display = document.getElementById('current-user');
        if (display) {
            display.textContent = user.toUpperCase();
            display.style.color = (user === 'Varo') ? '#e10600' : '#15151e';
        }

        this.state.currentPage = 'main';
        this.updateUI();
    }

    goToLanding() {
        this.state.currentPage = 'landing';
        this.updateUI();
    }

    switchTab(tab) {
        this.state.currentTab = tab;
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tab}`);
        });
    }

    updateUI() {
        const landing = document.getElementById('landing-page');
        const main = document.getElementById('main-page');
        
        if (this.state.currentPage === 'landing') {
            landing.classList.add('active');
            main.classList.remove('active');
        } else {
            landing.classList.remove('active');
            main.classList.add('active');
            this.loadMainApp();
        }
    }

    loadMainApp() {
        this.loadGPSelector();
        this.updateCircuitInfo();
        this.loadLastRace();
    }

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
    }

    updateCircuitInfo() {
        const info = this.data.circuits[this.circuitsList[this.state.selectedGP]];
        if (!info) return;
        
        const name = document.getElementById('circuit-name');
        const flag = document.getElementById('circuit-flag');
        const map = document.getElementById('circuit-map');
        
        if (name) name.textContent = info.nombre;
        if (flag) flag.src = info.bandera;
        if (map) map.src = info.mapa;
    }

    loadLastRace() {
        // Lógica para mostrar el podio anterior si hay datos en sheetsData.results
        const card = document.getElementById('last-race-card');
        if (this.sheetsData.results.length > 0 && card) {
            card.style.display = 'block';
            const last = this.sheetsData.results[this.sheetsData.results.length - 1];
            document.getElementById('last-race-name').textContent = last.Carrera.split(' (')[0];
            // Aquí se actualizarían las imágenes de last-p1-img, etc.
        }
    }
}

// Iniciar aplicación al cargar el DOM
window.addEventListener('load', () => {
    window.f1App = new F1CupApp();
});
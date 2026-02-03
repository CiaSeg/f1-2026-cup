// google-sheets-service.js
class GoogleSheetsService {
    constructor() {
        // TU CONFIGURACIÓN AQUÍ
        this.sheetId = "1MH-qdPD-urFE5zO-_14nPZw54nTr1zTiGV3hpBHpwbw";
        this.apiKey = "AIzaSyCoUGiDREyQNzMWggWKD9D_k6qA-FEk4go"; // Reemplaza con tu API Key
        this.baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";
        
        // Nombres de las hojas (worksheets)
        this.sheets = {
            bets: "Apuestas",
            results: "Resultados", 
            season: "Mundial"
        };
        
        // Cache local para reducir llamadas a la API
        this.cache = {
            bets: null,
            results: null,
            season: null,
            lastUpdate: {}
        };
    }
    
    // Verificar si la API está disponible
    isAvailable() {
        return !!this.apiKey && this.apiKey !== "TU_API_KEY_AQUI";
    }
    
    // Obtener datos de una hoja
    async getData(sheetName, useCache = true) {
        if (!this.isAvailable()) {
            console.warn('Google Sheets API no configurada');
            return [];
        }
        
        // Verificar cache
        if (useCache && this.cache[sheetName] && 
            this.cache.lastUpdate[sheetName] > Date.now() - 60000) { // 1 min cache
            console.log(`📦 Usando cache de ${sheetName}`);
            return this.cache[sheetName];
        }
        
        try {
            console.log(`📥 Descargando ${sheetName} desde Google Sheets...`);
            
            const url = `${this.baseUrl}/${this.sheetId}/values/${sheetName}?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.values || data.values.length === 0) {
                console.log(`📭 Hoja ${sheetName} está vacía`);
                this.cache[sheetName] = [];
                return [];
            }
            
            // Convertir filas a objetos
            const objects = this.convertToObjects(data.values);
            
            // Actualizar cache
            this.cache[sheetName] = objects;
            this.cache.lastUpdate[sheetName] = Date.now();
            
            console.log(`✅ ${objects.length} registros cargados de ${sheetName}`);
            return objects;
            
        } catch (error) {
            console.error(`❌ Error cargando ${sheetName}:`, error);
            
            // Si hay cache, devolverlo aunque sea viejo
            if (this.cache[sheetName]) {
                console.log('⚠️ Usando datos cacheados (pueden estar desactualizados)');
                return this.cache[sheetName];
            }
            
            return [];
        }
    }
    
    // Convertir filas de Google Sheets a objetos
    convertToObjects(rows) {
        if (!rows || rows.length < 2) return [];
        
        const headers = rows[0].map(header => header.trim());
        const data = [];
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const obj = {};
            
            headers.forEach((header, index) => {
                if (header && index < row.length) {
                    obj[header] = row[index] || '';
                }
            });
            
            // Solo añadir si tiene datos
            if (Object.keys(obj).length > 0) {
                data.push(obj);
            }
        }
        
        return data;
    }
    
    // Añadir nueva fila a una hoja
    async appendData(sheetName, rowData) {
        if (!this.isAvailable()) {
            console.warn('No se puede guardar: Google Sheets API no configurada');
            return { success: false, error: 'API no configurada' };
        }
        
        try {
            console.log(`📤 Guardando en ${sheetName}:`, rowData);
            
            const url = `${this.baseUrl}/${this.sheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED&key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    values: [rowData]
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `Error ${response.status}`);
            }
            
            const result = await response.json();
            console.log(`✅ Guardado en ${sheetName}:`, result.updates?.updatedRange);
            
            // Invalidar cache para esta hoja
            this.cache[sheetName] = null;
            
            return { 
                success: true, 
                range: result.updates?.updatedRange 
            };
            
        } catch (error) {
            console.error(`❌ Error guardando en ${sheetName}:`, error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    }
    
    // Obtener todas las apuestas
    async getBets() {
        return await this.getData(this.sheets.bets);
    }
    
    // Obtener todos los resultados
    async getResults() {
        return await this.getData(this.sheets.results);
    }
    
    // Obtener apuestas mundiales
    async getSeasonBets() {
        return await this.getData(this.sheets.season);
    }
    
    // Guardar una apuesta
    async saveBet(betData) {
        const rowData = [
            betData.Carrera || '',
            betData.Jugador || '',
            betData.P1 || '',
            betData.P2 || '',
            betData.P3 || '',
            new Date().toISOString()
        ];
        
        return await this.appendData(this.sheets.bets, rowData);
    }
    
    // Guardar resultado oficial
    async saveResult(resultData) {
        const rowData = [
            resultData.Carrera || '',
            resultData.P1_Real || '',
            resultData.P2_Real || '',
            resultData.P3_Real || '',
            new Date().toISOString(),
            'admin' // o el usuario que publica
        ];
        
        return await this.appendData(this.sheets.results, rowData);
    }
    
    // Guardar apuesta mundial
    async saveSeasonBet(seasonData) {
        // Primero verificar si ya existe
        const existingBets = await this.getSeasonBets();
        const existingBet = existingBets.find(bet => bet.Jugador === seasonData.Jugador);
        
        if (existingBet) {
            // Actualizar existente (necesitaríamos saber la fila)
            console.log(`⚠️ ${seasonData.Jugador} ya tiene apuesta mundial`);
            return { 
                success: false, 
                error: 'Ya tienes una apuesta mundial registrada' 
            };
        }
        
        const rowData = [
            seasonData.Jugador || '',
            seasonData.D_P1 || '',
            seasonData.D_P2 || '',
            seasonData.D_P3 || '',
            seasonData.T_P1 || '',
            seasonData.T_P2 || '',
            seasonData.T_P3 || '',
            new Date().toISOString()
        ];
        
        return await this.appendData(this.sheets.season, rowData);
    }
    
    // Sincronizar datos locales con Google Sheets
    async syncLocalData(localBets, localResults, localSeasonBets) {
        if (!this.isAvailable()) {
            return { success: false, synced: false };
        }
        
        try {
            console.log('🔄 Sincronizando con Google Sheets...');
            
            // Obtener datos actuales del sheet
            const [sheetBets, sheetResults, sheetSeasonBets] = await Promise.all([
                this.getBets(),
                this.getResults(),
                this.getSeasonBets()
            ]);
            
            // Encontrar datos locales que no están en el sheet
            const newBets = localBets.filter(localBet => {
                return !sheetBets.some(sheetBet => 
                    sheetBet.Carrera === localBet.Carrera && 
                    sheetBet.Jugador === localBet.Jugador
                );
            });
            
            // Guardar nuevos datos
            for (const bet of newBets) {
                await this.saveBet(bet);
                await new Promise(resolve => setTimeout(resolve, 100)); // Pequeña pausa
            }
            
            console.log(`✅ Sincronizados ${newBets.length} nuevos registros`);
            return { 
                success: true, 
                synced: true,
                newRecords: newBets.length
            };
            
        } catch (error) {
            console.error('❌ Error sincronizando:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Forzar refresco del cache
    clearCache() {
        this.cache = {
            bets: null,
            results: null,
            season: null,
            lastUpdate: {}
        };
        console.log('🗑️ Cache limpiado');
    }
}

// Crear instancia global
window.GoogleSheetsService = new GoogleSheetsService();
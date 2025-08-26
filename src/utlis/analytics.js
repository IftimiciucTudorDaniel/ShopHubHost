// API calls pentru product clicks
import {logDev} from "@/utlis/helpers.js";

const API_HOST = import.meta.env.VITE_API_HOST;
const isDev = import.meta.env.VITE_DEVELOPMENT;
// Incrementează click-ul pentru un produs
export const handleProductClickLocal = async (productId, title) => {
    try {
        if (!productId || !title) {
            console.error('ProductId și Title sunt obligatorii');
            return;
        }

        isDev && (`Incrementing clicks for: ${title} (${productId})`);

        const response = await fetch(`${API_HOST}/api/productclicks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                title: title
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        logDev('Click incrementat cu succes:', result);
        return result;
    } catch (error) {
        console.error('Eroare la incrementare click:', error);
        throw error;
    }
};

// Obține top produsele de astăzi - pentru "Alegerile de top de astăzi"
export const getTodaysTopProducts = async (top = 4) => {
    logDev(API_HOST);
    logDev(isDev);
    try {
        const response = await fetch(`${API_HOST}/api/productclicks/today?top=${top}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        logDev('Top products today:', products);
        return products;
    } catch (error) {
        console.error('Eroare la obținere top products astăzi:', error);
        return [];
    }
};

// Obține top produsele all-time - pentru "Cel mai bine vândut"
export const getAllTimeTopProducts = async (top = 4) => {
    try {
        const response = await fetch(`${API_HOST}/api/productclicks/alltime?top=${top}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        logDev('Top products all-time:', products);
        return products;
    } catch (error) {
        console.error('Eroare la obținere top products all-time:', error);
        return [];
    }
};
// === FUNCȚII UTILITARE ===

// Curăță produsele șterse din baza de date
export const cleanupDeletedProducts = async (activeProductIds) => {
    try {
        if (!activeProductIds || !Array.isArray(activeProductIds) || activeProductIds.length === 0) {
            console.error('Lista de produse active este obligatorie');
            return;
        }

        const response = await fetch(`${API_HOST}/api/productclicks/cleanup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activeProductIds),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        logDev(`Cleanup completat: ${result.deletedRows} înregistrări șterse`);
        return result;
    } catch (error) {
        console.error('Eroare la cleanup produse șterse:', error);
        throw error;
    }
};

// Obține statistici generale
export const getClickStats = async () => {
    try {
        const response = await fetch(`${API_HOST}/api/productclicks/stats`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const stats = await response.json();
        logDev('Click stats:', stats);
        return stats;
    } catch (error) {
        console.error('Eroare la obținere statistici:', error);
        return { uniqueProducts: 0, totalClicks: 0, totalRecords: 0 };
    }
};

// Funcție combinată pentru a obține ambele liste într-un singur call
export const getTopProductsSections = async () => {
    try {
        const [todayProducts, allTimeProducts] = await Promise.all([
            getTodaysTopProducts(4),
            getAllTimeTopProducts(4)
        ]);

        return {
            todayTop: todayProducts,      // Pentru "Alegerile de top de astăzi"
            allTimeTop: allTimeProducts   // Pentru "Cel mai bine vândut"
        };
    } catch (error) {
        console.error('Eroare la obținere secțiuni top products:', error);
        return {
            todayTop: [],
            allTimeTop: []
        };
    }
};

// Pentru debugging - verifică dacă API-ul funcționează
export const testApiConnection = async () => {
    try {
        const stats = await getClickStats();
        logDev('API connection test successful:', stats);
        return true;
    } catch (error) {
        console.error('API connection test failed:', error);
        return false;
    }
};

// === FUNCȚII LOCALE (localStorage) - păstrate pentru compatibilitate ===

export const handleProductClickLocalLocal = (productId) => {
    const stored = JSON.parse(localStorage.getItem("clickedProducts") || "[]");

    const existing = stored.find((item) => item.id === productId);

    let updated;
    if (existing) {
        updated = stored.map((item) =>
            item.id === productId ? { ...item, clicks: item.clicks + 1 } : item
        );
    } else {
        updated = [...stored, { id: productId, clicks: 1 }];
    }

    localStorage.setItem("clickedProducts", JSON.stringify(updated));
};

export const getTopClickedProducts = (allProducts, topN = 4) => {
    const stored = JSON.parse(localStorage.getItem("clickedProducts") || "[]");

    const sorted = stored
        .sort((a, b) => b.clicks - a.clicks)
        .map((item) => item.id);

    const result = sorted
        .map((id) => allProducts.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, topN);

    return result;
};


// Adaugă asta temporar în analytics.js pentru debugging

// Test complet al API-ului
export const debugAPI = async () => {
    logDev('🔧 Starting API Debug...');

    // 1. Test conexiunea API
    logDev('1. Testing API connection...');
    try {
        const response = await fetch(`${API_HOST}/umbraco/delivery/api/productclicks/stats`);
        logDev('✅ API Response Status:', response.status);

        if (response.ok) {
            const stats = await response.json();
            logDev('✅ API Stats:', stats);
        } else {
            console.error('❌ API Error:', response.statusText);
            return;
        }
    } catch (error) {
        console.error('❌ API Connection Failed:', error);
        return;
    }

    // 2. Test POST increment
    logDev('2. Testing POST increment...');
    const testProductId = '123e4567-e89b-12d3-a456-426614174000'; // GUID de test
    const testTitle = 'Test Product Debug';

    try {
        const postResponse = await fetch(`${API_HOST}/umbraco/delivery/api/productclicks/increment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: testProductId,
                title: testTitle
            }),
        });

        logDev('✅ POST Response Status:', postResponse.status);

        if (postResponse.ok) {
            const result = await postResponse.json();
            logDev('✅ POST Result:', result);
        } else {
            const errorText = await postResponse.text();
            console.error('❌ POST Error:', errorText);
        }
    } catch (error) {
        console.error('❌ POST Failed:', error);
    }

    // 3. Test GET today
    logDev('3. Testing GET today...');
    try {
        const todayResponse = await fetch(`${API_HOST}/umbraco/delivery/api/productclicks/today?top=4`);
        logDev('✅ Today Response Status:', todayResponse.status);

        if (todayResponse.ok) {
            const todayData = await todayResponse.json();
            logDev('✅ Today Data:', todayData);
        } else {
            console.error('❌ Today Error:', todayResponse.statusText);
        }
    } catch (error) {
        console.error('❌ Today Failed:', error);
    }

    // 4. Test GET alltime
    logDev('4. Testing GET alltime...');
    try {
        const alltimeResponse = await fetch(`${API_HOST}/umbraco/delivery/api/productclicks/alltime?top=4`);
        logDev('✅ Alltime Response Status:', alltimeResponse.status);

        if (alltimeResponse.ok) {
            const alltimeData = await alltimeResponse.json();
            logDev('✅ Alltime Data:', alltimeData);
        } else {
            console.error('❌ Alltime Error:', alltimeResponse.statusText);
        }
    } catch (error) {
        console.error('❌ Alltime Failed:', error);
    }

    logDev('🔧 Debug Complete!');
};

// Funcție pentru a testa cu date reale dintr-un produs
export const testWithRealProduct = async (productId, productTitle) => {
    logDev(`🧪 Testing with real product: ${productTitle} (${productId})`);

    try {
        // 1. Incrementează click-ul
        const result = await handleProductClickLocal(productId, productTitle);
        logDev('✅ Click incremented:', result);

        // 2. Verifică dacă apare în today
        setTimeout(async () => {
            const todayProducts = await getTodaysTopProducts(10); // Iau mai multe să fiu sigur
            logDev('📊 Today products after click:', todayProducts);

            const foundProduct = todayProducts.find(p => p.productId === productId);
            if (foundProduct) {
                logDev('✅ Product found in today list:', foundProduct);
            } else {
                logDev('❌ Product not found in today list');
            }
        }, 1000); // Așteaptă 1 secundă pentru ca baza de date să se actualizeze

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
};

// Monitorizează toate request-urile pentru debugging
export const monitorRequests = () => {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        logDev('🌐 Fetch Request:', args[0], args[1]);
        return originalFetch.apply(this, args)
            .then(response => {
                logDev('📡 Fetch Response:', response.status, response.url);
                return response;
            })
            .catch(error => {
                console.error('💥 Fetch Error:', error);
                throw error;
            });
    };

    logDev('🔍 Request monitoring enabled');
};
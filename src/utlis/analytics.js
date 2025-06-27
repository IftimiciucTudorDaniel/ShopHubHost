import axios from 'axios';

export const handleGlobalProductClick = async (productId, title) => {
    try {
        const res = await fetch('http://188.214.88.51:5001/umbraco/delivery/api/productclicks/increment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, title }),
        });

        if (!res.ok) {
            throw new Error('Eroare la incrementare click');
        }

        const response = await res.json();
    } catch (error) {
        console.error('Eroare la incrementare click:', error);
    }
};

export const getTodaysTopClickedProducts = async () => {
    const res = await fetch("http://188.214.88.51:5001/umbraco/delivery/api/productclicks/top?top=4&period=today");
    return res.json();
};

export const getAllTimeTopClickedProducts = async () => {
    const res = await fetch("http://188.214.88.51:5001/umbraco/delivery/api/productclicks/top?top=4&period=alltime");
    return res.json();
};

export const handleProductClick = (productId) => {
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

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const apiKey = process.env.NEXON_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'NEXON_API_KEY가 서버에 설정되지 않았습니다.' });
    }

    try {
        const response = await fetch('https://open.api.nexon.com/fconline/v1/market/top-players?tradeType=1&limit=10', {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Nexon API Proxy Error', details: error.message });
    }
}

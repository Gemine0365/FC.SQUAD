export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-nxopen-api-key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const apiKey = process.env.NEXON_API_KEY || "live_21197d6d11990fbaa6c34c0b101302ddc787b95b4c26f4e14d652467821c81cefe8d04e6d233bd35cf2fabdeb93fb0d";

    try {
        const response = await fetch('https://open.api.nexon.com/fconline/v1/market/top-players?tradeType=1&limit=10', {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Nexon Market API Error Response:', data);
            return res.status(response.status).json({
                error: 'Nexon Market API Rejected Request',
                status: response.status,
                nexonMessage: data
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Nexon API Proxy Internal Error', details: error.message });
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const response = await fetch('https://open.api.nexon.com/fconline/v1/market/top-players?tradeType=1&limit=10', {
            headers: {
                'x-nxopen-api-key': process.env.NEXON_API_KEY
            }
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Nexon API Proxy Error' });
    }
}

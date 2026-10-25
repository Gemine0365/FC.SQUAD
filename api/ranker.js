export default async function handler(req, res) {
    try {
        const response = await fetch('https://open.api.nexon.com/fconline/v1/ranker?matchtype=50', {
            headers: {
                'x-nxopen-api-key': process.env.NEXON_API_KEY,
                'Referer': 'https://fcsquad.kro.kr' // 👈 이 줄 추가
            }
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

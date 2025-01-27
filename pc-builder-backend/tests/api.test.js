const request = require('supertest');
const app = require('../src/app'); 

////// EARLY SETUP UNIT TESTING, USED ON EMPTY TABLES

describe('Jest Setup Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })  

describe('API Route Tests', () => {
    let partId;

    it('GET /api/parts - should check for empty parts table', async () => {
        const res = await request(app).get('/api/parts');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0); //check if empty
    });

    it('GET /api/parts - should post one part and return a list of parts', async () => {
        await request(app)
            .post('/api/parts')
            .send({name: 'Intel i5-13600K', type: 'CPU', price: 250, tier: 'mid'});
            
            const res = await request(app).get('/api/parts');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0]).toHaveProperty('name', 'Intel i5-13600K'); // Check a specific part
            expect(res.body[0]).toHaveProperty('type', 'CPU');
            partId = res.body[0].id;
            console.log("PartID is ", partId);
    });

    it('POST /api/parts - should create a new part', async () => {
        const newPart = { name: 'NVIDIA RTX 4080', type: 'GPU', price: 1000, tier: 'high' };
        const res = await request(app).post('/api/parts').send(newPart);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newPart.name);
    });

    it('GET /api/parts - should return all parts', async ()=> {
        const res = await request(app).get('/api/parts');
        expect(res.statusCode).toBe(200);
        console.log('GET /api/parts Response:', res.body);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(!0);
    });

    it('DELETE /api/parts/:id - should delete the cpu part', async () => {
        console.log("PartID is ", partId);
        const res = await request(app).delete(`/api/parts/${partId}`);
        //console.log("DELETE Response:", res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Part deleted successfully');
        expect(res.body).toHaveProperty('part');
        expect(res.body.part.id).toBe(partId);
        const checkPart = await request(app).get(`/api/parts/${partId}`);
        expect(checkPart.status).toBe(404);
        expect(checkPart.body).toHaveProperty('error', 'Part not found');
    });

    it('POST /api/builds - should create a new build', async () => {
        const newBuild = {
            budget: 2000,
            use_case: 'Gaming',
            build_details: {
                CPU: 'Intel i5-13600K',
                GPU: 'NVIDIA RTX 4080',
                Motherboard: 'ASUS ROG Z690'
            },
            total_price: 1800.00
        };
        const res = await request(app).post('/api/builds').send(newBuild);
        expect(res.statusCode).toBe(201);
        expect(parseFloat(res.body.budget)).toBe(2000);
    });

    it('GET /api/builds - should return all builds', async () => {
        const res = await request(app).get('/api/builds');
        expect(res.statusCode).toBe(200);
        console.log('GET /api/builds Response:', res.body);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

//Early Testing, Depricated

describe('GPT Generate Build Test', () => {
    it('GET /api/parts - should return all parts', async ()=> {
        const res = await request(app).get('/api/parts');
        expect(res.statusCode).toBe(200);
        console.log('GET /api/parts Response:', res.body);
        expect(Array.isArray(res.body)).toBe(true);
        
    });

    it('POST /api/builds/suggest', async () => {
        const buildParams = {"budget": 1200.00, "tier": "low"};
        const res = await request(app).post('/api/builds/suggest').send(buildParams);
        expect(res.statusCode).toBe(200);
        expect(res.body.budget).toBe(buildParams.budget);
        console.log(res.body.build_details);
    });

});
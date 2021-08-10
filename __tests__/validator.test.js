'use strict'

const {app} = require('../src/server');
// I do not have to run it
const supertest = require('supertest');
const request = supertest(app);

describe('validator middleware', ()=> {


    //  -------------------- 1. 404 on a bad route -----------------

    it('404 on a bad route', async () => {
        const response = await request.get('/asd'); // async
        expect(response.status).toEqual(404);
    });

     //  -------------------- 2. 404 on a bad method -----------------

    it('404 on a bad method', async () => {
        const response = await request.put(`/person?name=${String}`); // async
        expect(response.status).toEqual(404);
    });

    //  -------------------- 3. 500 if no name in the query string -----------------

   it('500 if no name in the query string', async () => {
       const response = await request.get('/person'); // async
       expect(response.status).toEqual(500);
       
   });
    
    //  -------------------- 4. 200 if the name is in the query string -----------------

    it('200 if the name is in the query string', async () => {
        const response = await request.get(`/person?name=${String}`); // async
        expect(response.status).toEqual(200);
        
    });
    
    //  -------------- 5. given an name in the query string, the output object is correct --------------

    it('given an name in the query string, the output object is correct', async () => {
        const response = await request.get('/person?name=mayadah'); // async
        expect(response.status).toEqual(200);
        
    });


})











// 'use strict';

// const validator = require('../src/middlewares/validator');

// const server = require('../src/server');
// // I do not have to run it
// const supertest = require('supertest');
// const request = supertest(server.app);

// //add the name of the module that I am testing 
// describe('my API Server', ()=> {

//     // add scenarios & test cases 
//     it('the name is string', async () => {
//         // add test
//         const response = await request.get('/person?name=mayada'); // async
//         expect(response.status).toEqual(200);
//     });


    
    
//     it('handles my internal server errors', async () => {
//         const response = await request.post('/bad'); // async
//         expect(response.status).toEqual(500);
//     });
    



// });
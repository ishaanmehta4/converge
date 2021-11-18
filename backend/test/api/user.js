process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const request = require('supertest');

const app = require('../../build-ts/index');
const { connectToDB } = require('../../build-ts/config/mongoatlas');

describe('POST /user/doc/self', function () {
    this.timeout(10000);

    // before((done) => {
    //     console.log('before');
    //     connectToDB()
    //         .then(res => {
    //             console.log('beofre',res.body);
    //             done();
    //         })
    // })

    it('should return 401 for missing JWT.', (done) => {
        request(app)
            .get('/api/users/doc/self')
            // set jwt auth header
            .then((res) => {
                expect(res.status).to.equal(401);
                expect(res.body.status).to.equal('error');
                done();

            }).catch((err) => {
                done(err);
            });
    })

    it('should return 404 for test-jwt.', (done) => {
        request(app)
            .get('/api/users/doc/self')
            // set jwt auth header
            .set('Authorization', 'Bearer test-jwt')
            .then((res) => {
                expect(res.status).to.equal(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    })
    
    it('should create a new user.', (done) => {
        let newUserData = {
            username: 'testuser',
        phone_number: '9999999990',
        resume_url: '',
        skills: ['s1','s2'],
        user_type: 'applicant',
        }

        request(app)
            .post('/api/users/create')
            // set jwt auth header
            .set('Authorization', 'Bearer test-jwt')
            .send({new_user_data: newUserData})
            .then((res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body.data.username).to.equal('testuser');
                done();
            })
            .catch((err) => {
                done(err);
            });
    })
})
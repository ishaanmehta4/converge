process.env.NODE_ENV = 'test';
require('./user')

const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const request = require('supertest');

const app = require('../../build-ts/index');

describe('Project module', function () {
    this.timeout(10000);

    it('should return empty array of projects for new user', (done) => {
        request(app)
            .get('/api/projects/list/self')
            .set('Authorization', 'Bearer test-jwt')
            // set jwt auth header
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.data.length).to.equal(0);
                done();

            }).catch((err) => {
                done(err);
            });
    })

    it('create a new project', (done) => {
        let new_project_data = {
            title: 'Test title',
            description: 'Test desc',
            address: {
                address_line_1: '',
                address_line_2: '',
                city: '',
                city_zip: '',
            },
            tags: ['t1', 't2'],
            skills_required: ['s1'],
        }

        request(app)
            .post('/api/projects/create')
            // set jwt auth header
            .set('Authorization', 'Bearer test-jwt')
            .send({new_project_data})
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.data.title).to.equal(new_project_data.title);
                done();

            }).catch((err) => {
                done(err);
            });
    })

    it('should return an array with the newly created project.', (done) => {
        request(app)
            .get('/api/projects/list/self')
            .set('Authorization', 'Bearer test-jwt')
            // set jwt auth header
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.data.length).to.equal(1);
                expect(res.body.data[0].title).to.equal('Test title');
                done();

            }).catch((err) => {
                done(err);
            });
    })

})
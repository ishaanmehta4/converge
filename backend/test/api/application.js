process.env.NODE_ENV = 'test';
require('./user')
require('./project')

const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const request = require('supertest');

const app = require('../../build-ts/index');

describe('Application module', function () {
    this.timeout(10000);

    it('should return empty array of applications for new user', (done) => {
        request(app)
            .get('/api/applications/list/self')
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

    it('create a new application', (done) => {
        let test_project_id = 'new_project'
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

        let new_application_data = {
            cover_letter: 'Test cover letter',
            resume_url: 'https://test.url',
        }

        request(app)
            .post('/api/projects/create')
            // set jwt auth header
            .set('Authorization', 'Bearer test-jwt')
            .send({ new_project_data })
            .then((res) => {
                expect(res.status).to.equal(200);
                test_project_id = res.body.data._id;
                // console.log('test-project', res.body)

                request(app)
                    .post('/api/applications/create')
                    // set jwt auth header
                    .set('Authorization', 'Bearer test-jwt')
                    .send({
                        new_application_data: {
                            project: test_project_id,
                            ...new_application_data
                        }
                    })
                    .then((res) => {
                        // console.log('new app res.body', res.body)
                        expect(res.status).to.equal(200);
                        expect(res.body.status).to.equal('success');
                        done();
                    })
                    .catch((err) => {
                        // console.log('err', err)
                        done(err);
                    })
            }).catch((err) => {
                // console.log(err.res.body)
                done(err);
            })

    })

    it('should return an array with the newly created application.', (done) => {
        request(app)
            .get('/api/applications/list/self')
            .set('Authorization', 'Bearer test-jwt')
            // set jwt auth header
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.data.length).to.equal(1);
                expect(res.body.data[0].cover_letter).to.equal('Test cover letter');
                done();

            }).catch((err) => {
                done(err);
            });
    })
})
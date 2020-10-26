const request = require('supertest');
const { app } = require('../app');
const db = require('../models');

describe('Go to login page If unauthenticated user tried to open home page', function() {
  it('Shows The login page if not authenticated user', function (done) {
    request(app)
      .get('/')
      .expect(302)
      .expect('Location', /\/login/, done);
  });
});

describe('Go to message Page to after success registration', function() {
  it('Shows message page if the registration form submitted with right form property', function (done) {
    request(app)
      .post('/register')
      .send({ username: 'testUser', password: '123456', firstName: 'test', lastName: 'user' })
      .expect(302)
      .expect('Location', /\/message/, done)
  });
});

describe('Go to message Page to after failed registration', function() {
  it('Shows message page if the registration form submitted with existing username in db', function (done) {
    request(app)
      .post('/register')
      .send({ username: 'testUser', password: '123456', firstName: 'test', lastName: 'user' })
      .expect(422)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
  });
});


describe('Go to home page after successful login', function() {
  it('Shows The home page if the user is authenticated user', function (done) {
    request(app)
      .post('/login')
      .send({ username: 'testUser', password: '123456'})
      .expect(302)
      .expect('Location', /\//, done);
  });
});

describe('Go to message Page to show Wrong Password', function() {
  it('Shows The message page if the user is authenticated with wrong credentials', function (done) {
    request(app)
      .post('/login')
      .send({ username: 'testUser', password: '1234567'})
      .expect(422)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
  });
});


describe('Go to message Page to show not found username message', function() {
  it('Shows The message page if the user is authenticated with not found username', function (done) {
    request(app)
      .post('/login')
      .send({ username: 'testUserr', password: '123456'})
      .expect(404)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
  });
});

describe('Go to message Page to show validation messages', function() {
  it('Shows The message page if the login form submitted with empty form property', function (done) {
    request(app)
      .post('/login')
      .send({ username: '', password: ''})
      .expect(422)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
  });
});

describe('Go to message Page to show validation messages', function() {
  it('Shows The message page if the login form submitted with empty body', function (done) {
    request(app)
      .post('/login')
      .send({ })
      .expect(422)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
  });
});

// validate register
describe('Go to message Page to show validation messages if wrong register form sent', function() {
  it('Shows The message page if the registration form submitted with empty form property', function (done) {
    request(app)
      .post('/register')
      .send({ username: '', password: '', firstName: '', lastName: '' })
      .expect(422)
      .redirects('/message')
      .expect(/هناك خطأ/, done);
      db.user.destroy({ truncate : true });
  });
});

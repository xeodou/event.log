var console = require('../index');
var should = require('should')

describe('console', function() {

    it('should be an object.', function() {
        console.should.be.a('object')
    })

    it('should be have property.', function() {
        console.should.have.property('log')
        console.should.have.property('error')
        console.should.have.property('warn')
        console.should.have.property('raw')
        console.should.have.property('emit')
        console.should.have.property('on')

    })

    it('should used as origin console.', function() {
        console.log('test')
        console.log('test '+ 'test')
        console.log('test ' + {})
        console.error('error')
        console.warn('warn')
        console.raw('raw')
    })

    it('should log to event.', function(done) {

        console.on('console.log', function(data) {
            data.join(' ').should.be.eql('[log] test')
            process.env.NODE_ENV = 'test';
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.log('test')

    })

    it('should error to event.', function(done) {

        console.on('console.error', function(data) {
            data.join(' ').should.be.eql('[error] test')
            process.env.NODE_ENV = 'test';
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.error('test')

    })

    it('should warn to event.', function(done) {

        console.on('console.warn', function(data) {
            data.join(' ').should.be.eql('[warn] test')
            process.env.NODE_ENV = 'test';
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.warn('test')

    })

    it('should raw to event.', function(done) {

        console.on('console.raw', function(data) {
            data.join('').should.be.eql('test')
            process.env.NODE_ENV = 'test';
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.raw('test')

    })
})

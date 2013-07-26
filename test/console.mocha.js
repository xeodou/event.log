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
        console.should.have.property('trace')
        console.should.have.property('emit')
        console.should.have.property('on')

    })

    it('should used as origin console.', function() {
        console.log('test')
        console.log('test %s', 'test')
        console.log('test %j', {})
        console.error('error')
        console.warn('warn')
        console.trace('trace')
        console.raw('raw')
    })

    it('should log to event.', function(done) {

        console.on('console.log', function(data) {
            data.message.should.be.eql('test')
            data.type.should.be.eql('log')
            process.env.NODE_ENV = 'test';
            console.raw(data)
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.log('test')

    })

    it('should error to event.', function(done) {

        console.on('console.error', function(data) {
            data.message.should.be.eql('test')
            data.type.should.be.eql('error')
            process.env.NODE_ENV = 'test';
            console.raw(data)
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.error('test')

    })

    it('should warn to event.', function(done) {

        console.on('console.warn', function(data) {
            data.message.should.be.eql('test')
            data.type.should.be.eql('warn')
            process.env.NODE_ENV = 'test';
            console.raw(data)
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.warn('test')

    })

    it('should trace to event.', function(done) {

        console.on('console.trace', function(data) {
            data.message.indexOf('test').should.not.eql(-1)
            data.type.should.be.eql('trace')
            process.env.NODE_ENV = 'test';
            console.raw(data)
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.trace('test')

    })

    it('should raw to event.', function(done) {

        console.on('console.raw', function(data) {
            data.should.be.eql('test')
            process.env.NODE_ENV = 'test';
            done()
        })
        process.env.NODE_ENV = 'mocha';
        console.raw('test')

    })
})

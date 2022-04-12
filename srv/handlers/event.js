const cds = require('@sap/cds')


class EventService extends cds.ApplicationService {

  async init() {

    console.log('===> EventService: init()')


    let messaging = await cds.connect.to("messaging")


    // To output the message we can initiate through CAP
    messaging.on('gpslocation', async msg => {
      console.log('===> Received message on topic (riz/inno/events/gpslocation): ', msg)

    })

    // ensure to call super.init()
    await super.init()

  }

}
module.exports = { EventService }
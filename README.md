# SAP CAP Problem with developing AMQP locally

To replicate the problem: 
1. Clone the repo
2. Install the necesary packages`npm i`
3. Adjust the name of the event mesh instance in the mta.yaml to match the name of your event-mesh instance.
```yaml
  - name: riz-inno-events # !!! Adjust
    type: org.cloudfoundry.existing-service
```
4. Execute `mbt build`
5. Deploy to cf via `cf deploy ./mta_archives/sap-incident-cap-amqp_1.0.0.mtar`
6. Execute `cf de sap-incident-cap-amqp-srv` to download environment variables (default-env.json)
7. run `cds watch`
8. Send a message to topic 'gpslocation' -> You should see somelink like this the following 
```text
===> EventService: init()
[cds] - serving EventService { at: '/event', impl: './srv/handlers/event.js' }

[cds] - server listening on { url: 'http://localhost:4004' }
[cds] - launched at 4/12/2022, 12:08:31 PM, in: 1.925s
[cds] - [ terminate with ^C ]

[enterprise-messaging-amqp] - Create messaging artifacts 
[enterprise-messaging-amqp] - Create queue { queue: 'riz/inno/events/sap-incident-cap-amqp-srv/e20f' }
[enterprise-messaging-amqp] - Get subscriptions { queue: 'riz/inno/events/sap-incident-cap-amqp-srv/e20f' }
[enterprise-messaging-amqp] - Unchanged subscriptions [ 'riz/inno/events/gpslocation' ]   
===> Received message on topic (riz/inno/events/gpslocation):  EventMessage {
  data: {
    crumbTime: '2021-05-09T18:25:43.511Z',
    locationLong: 47.569503,
    locationLat: -122.284001,
    locationAccuracy: 10,
    deviceId: 'ABCESEDD',
    personId: 'bla Stenzig (PID 212121)'
  },
  headers: {},
  inbound: true,
  event: 'gpslocation'
}

```
9. Control-C to terminate the watch. cds comments with
```text
^C
[cds] - my watch has ended.
```
10. change line 16 in ./srv/handlers/event.js to
```js
  console.log('===> bla', msg)
```
11. repeat step 7 and 8. I see this... 
```text
===> Received message on topic (riz/inno/events/gpslocation):  EventMessage {
```
but I should see this....
```text
===> bla EventMessage {
```

**After I kill the terminal, create a new terminal and restart the watch, I receive the correct result.**
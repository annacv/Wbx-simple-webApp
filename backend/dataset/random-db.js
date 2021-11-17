const fs = require('fs');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const types = ['Pulsar', 'Commander', 'Copper']
const status = [10, 11, 20, 50, 51, 52, 53, 45, 55]
const wifiSignals = [null, 0, 25, 50, 75, 100]
const connectionType = ['wifi', 'ethernet']

module.exports = () => {
  const data = { chargers: [] }
  for (let i = 0; i < random(0, 1000); i++) {
    data.chargers.push({
      id: i,
      type: types[random(0, types.length - 1)],
      name: `chargers ${i}`,
      serialNumber: `SN-${random(10000, 99999)}-${i}`,
      chargingTime: random(0, 20000000),
      energySupplied: random(0, 85),
      currentCharging: random(18, 32),
      manufacturedDate: new Date(random(1420066800000, new Date().getTime())).toISOString(),
      wifiSignal: wifiSignals[random(0, wifiSignals.length - 1)],
      status: status[random(0, status.length - 1)],
      connectivityType: connectionType[random(0, connectionType.length - 1)],
    })
  }

  return data
}

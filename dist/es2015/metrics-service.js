var _dec, _class;

import { inject } from 'aurelia-framework';
import { ServiceBase } from './service-base';

let MemoryMetricsService = class MemoryMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;
    return self.http.get('metrics/fabric/' + fabric + '/memory?start=' + start).then(response => response.json());
  }
};
let CpuMetricsService = class CpuMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;
    return self.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start).then(response => response.json());
  }
};
let SensorsMetricsService = class SensorsMetricsService extends ServiceBase {
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors').then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors?sensor=' + sensor + '&start=' + start).then(response => response.json());
  }
};

export let MetricsService = (_dec = inject(MemoryMetricsService, CpuMetricsService, SensorsMetricsService), _dec(_class = class MetricsService extends ServiceBase {
  constructor(memory, cpu, sensors) {
    super();

    this.memory = memory;
    this.cpu = cpu;
    this.sensors = sensors;
  }

  read(fabric, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start).then(response => response.json());
  }
}) || _class);
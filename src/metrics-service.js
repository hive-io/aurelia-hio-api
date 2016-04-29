import {inject} from 'aurelia-framework';
import {ServiceBase} from './service-base';

class MemoryMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return self.http.get('metrics/fabric/' + fabric + '/memory?start=' + start)
      .then(response => response.json());
  }
}

class CpuMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return self.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start)
      .then(response => response.json());
  }
}

class SensorsMetricsService extends ServiceBase {
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors')
      .then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;  // 1hr
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors?sensor=' + sensor + '&start=' + start)
      .then(response => response.json());
  }
}

@inject(MemoryMetricsService, CpuMetricsService, SensorsMetricsService)
export class MetricsService extends ServiceBase {
  constructor(memory, cpu, sensors) {
    super();

    this.memory = memory;
    this.cpu = cpu;
    this.sensors = sensors;
  }

  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start)
      .then(response => response.json());
  }
}

import {inject} from 'aurelia-dependency-injection';
import {ServiceBase} from './service-base';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
class MemoryMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.get('metrics/fabric/' + fabric + '/memory?start=' + start)
      .then(response => response.json());
  }
}

@inject(HttpClient)
class CpuMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start)
      .then(response => response.json());
  }
}

@inject(HttpClient)
class SensorsMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensorsList')
      .then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;  // 1hr
    return this.http.fetch('metrics/fabric/' + fabric + '/sensor/' + sensor + '&start=' + start)
      .then(response => response.json());
  }
}

@inject(HttpClient, MemoryMetricsService, CpuMetricsService, SensorsMetricsService)
export class MetricsService extends ServiceBase {
  constructor(httpClient, memory, cpu, sensors) {
    super(httpClient);

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

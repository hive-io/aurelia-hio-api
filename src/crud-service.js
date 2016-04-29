import {ServiceBase} from './service-base';

export class CrudService extends ServiceBase {
  constructor(Model, options) {
    super();

    this.Model = Model;
    this.endpoints = {
      singular: options.singular,
      plural: options.plural
    };
  }

  read(identifier) {
    let url = (!!identifier) ?
      this.endpoints.singular + '/' + identifier : this.endpoints.singular;
    return this._fetch(url);
  }

  list(options) {
    let url = this.endpoints.plural;
    let query = [];

    if (!!options) {
      if (!!options.order) query.push("sort=" + options.order);
      if (!!options.offset || options.offset !== undefined) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push("offset=" + (+options.offset));
      }

      if (!!options.limit) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push("count=" + (+options.limit));
      }

      if (!!options.q) query.push("q=" + options.q);

      Object.keys(options)
        .filter(key => (key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q'))
        .forEach(option => {
          let value =
            Array.isArray(options[option]) ? options[option].join(',') : options[option];
          query.push(option + '=' + value);
        });
    }

    if (query.length) url = url + "?" + query.join('&');
    return this._fetch(url);
  }

  // private
  _fetch(url, options) {
    let raw = false;
    if (options && options.hasOwnProperty('raw')) {
      raw = options.raw;
      delete options.raw;
    }

    let self = this;
    return this.http.fetch(url, options)
      .then(response => {
        if (!!raw) return response;
        return response.json()
          .then(data => {
            let body = Array.isArray(data) ?
              data.map(v => (typeof v === 'object') ? new self.Model(v, self.http) : v) :
              (typeof data === 'object') ? new self.Model(data, self.http) : data;

            return { headers: response.headers, body: body };
          })
          .catch(err => {
            console.log(err); return response; });
      });
  }
}

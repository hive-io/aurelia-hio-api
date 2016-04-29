
import {Container} from 'aurelia-dependency-injection';
import {AuthService} from '../src/auth-service';

let test = {};
describe('AuthService', () => {
  let _fetch = window.fetch;

  beforeEach(() => {
    test.container = new Container();
    test.$auth = test.container.get(AuthService);
    test.$httpBackend = window.fetch = jasmine.createSpy('fetch');
  });

  afterEach(() => {
    test.$httpBackend = window.fetch = _fetch;
  });

  it('puts the lotion on', done => {
    return test.$auth.login('mbroadst@gmail.com', 'password')
      .then(result => {
        console.log(result);
        console.log("BRAWBS!");
      })
      .catch(response => {
        console.log(test.$httpBackend.calls.mostRecent().object);

        console.log(response.headers.get('Content-Type'));
        console.log(response.headers.get('Date'));
        console.log(response.status);
        console.log(response.statusText);
      })
      .then(done);
  });
});

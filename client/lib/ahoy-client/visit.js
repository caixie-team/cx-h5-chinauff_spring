import Cookies from 'js-cookie';
import request from 'superagent';
import generateId from './utils';
import csrfToken from './csrfToken';

class Visit {
  constructor(config) {
    this.config = config;
    this.visitId = Cookies.get('ahoy_visit');
    this.visitorId = Cookies.get('ahoy_visitor');
    this.track = Cookies.get('ahoy_track');

    if (this.track) Cookies.remove('ahoy_track');
    if (!this.visitId) this.createVisit();
    if (!this.visitorId) this.createVisitor();
    this.sendVisit();
  }

  createVisit() {
    this.visitId = generateId();
    Cookies.set('ahoy_visit', this.visitId, this.config.visitTtl);
  }

  createVisitor() {
    this.visitorId = generateId();
    Cookies.set('ahoy_visitor', this.visitorId, this.config.visitorTtl);
  }

  sendVisit() {
    const data = {
      visit_token: this.visitId,
      visitor_token: this.visitorId,
      platform: this.config.platform,
      landing_page: window.location.href,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };

    if (document.referrer.length > 0) data.referrer = document.referrer;

    request
      .post(this.config.visitsUrl)
      .set('X-CSRF-Token', csrfToken())
      .send(data)
      .end();
  }
}

export default Visit;

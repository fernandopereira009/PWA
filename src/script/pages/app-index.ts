import { LitElement, css, html, customElement } from 'lit-element';
import { Router } from '@vaadin/router';
import './app-home';
import './app-report';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
      #router-outlet > * {
        width: 100% !important;
      }

      #router-outlet > .leaving {
        animation: 160ms fadeOut ease-in-out;
      }

      #router-otlet > .entering {
        animation: 160ms fadeIn linear;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0.2;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit-element
    // for more info check out the lit-element docs https://lit-element.polymer-project.org/guide/lifecycle

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#router-outlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: '',
        animate: true,
        children: [
          { path: '/', component: 'app-home' },
          {
            path: '/testing',
            component: 'app-testing',
            action: async () => {
              await import('./app-testing.js');
            },
          },
          {
            path: '/reportcard',
            component: 'app-report',
          },
          {
            path: '/publish',
            component: 'app-publish',
            action: async () => {
              await import('./app-publish');
            },
          },
        ],
      } as any,
    ]);
  }

  render() {
    return html`
      <div>
        <main>
          <div id="router-outlet"></div>
        </main>
      </div>
    `;
  }
}
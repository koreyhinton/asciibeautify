import { LitElement, html } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-list/mwc-list-item";
import "./ascii-beautify.js";

class AsciiBeautifyDemo extends LitElement {
  static get properties() {
    return {
      themes: {
        type: Array,
      },
      selectedTheme: {
        type: String,
      },
      ascii: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.themes = [
      { name: "Default", colors: "default" },
      { name: "Light", colors: "light" },
      { name: "Dark", colors: "dark" },
    ];
    this.selectedTheme = this.themes[0];
  }

  render() {
    return html`
      <h1>Ascii Beautify Demo</h1>

      <mwc-select
        outlined
        @selected=${(e) => {
          console.log(e.target.value);
        }}
      >
        ${this.themes.map(
          (theme) =>
            html`
              <mwc-list-item value=${theme.name}>${theme.name}</mwc-list-item>
            `
        )}
      </mwc-select>
      <ascii-beautify
        .ascii=${this.ascii}
        .colors=${this.selectedTheme.colors}
      ></ascii-beautify>
    `;
  }
}
customElements.define("ascii-beautify-demo", AsciiBeautifyDemo);

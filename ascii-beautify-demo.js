import { LitElement, html, css } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-textarea";
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

  async firstUpdated() {
    await this.updateComplete;
    const textarea = this.shadowRoot.querySelector("mwc-textarea");
    textarea.shadowRoot.querySelector("textarea").style.fontFamily = "Courier";
    textarea.shadowRoot.querySelector("textarea").style.whiteSpace = "nowrap";
    textarea.shadowRoot.querySelector("textarea").style.overflowX = "auto";
}

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 24px;
      }

      mwc-textarea,
      mwc-select {
        width: 100%;
        margin-top: 24px;
      }

      mwc-textarea {
        height: 300px;
      }
    `;
  }

  render() {
    return html`
      <h1>Ascii Beautify Demo</h1>
      <mwc-textarea
        outlined
        label="Ascii"
        .value=${this.ascii ?? ""}
        @input=${(e) => {
          this.ascii = e.target.value;
          console.log(e.target.value);
        }}
      >
      </mwc-textarea>

      <mwc-select
        label="Theme"
        outlined
        @selected=${(e) => {
          this.selectedTheme = e.target.value;
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

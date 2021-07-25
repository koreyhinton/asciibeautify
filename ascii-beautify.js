import { LitElement, html, css } from "lit-element";
import { asciiBeautifyColorGrid } from "./utils";

class AsciiBeautify extends LitElement {
  static get properties() {
    return {
      ascii: {
        type: String,
      },
      colors: {
        type: Object,
      },
    };
  }

  static get styles() {
    return css`
      table {
        border-spacing: inherit;
        margin-top: 24px;
        border-radius: 4px;
      }

      tr,
      td {
        margin: 0;
        padding: 0;
        border: none;
        width: 20px;
        height: 20px;
        border-spacing: 0;
      }

      @media (max-width: 768px) {
        table {
          width: 100%;
          max-width: 400px;
        }
      }
    `;
  }

  render() {
    return html`
      <table>
        ${asciiBeautifyColorGrid(this.ascii, this.colors).map((tro) => {
          return html`
            <tr>
              ${tro.map((tdo) => {
                return html` <td style="background-color: ${tdo.color}"></td> `;
              })}
            </tr>
          `;
        })}
      </table>
    `;
  }
}
customElements.define("ascii-beautify", AsciiBeautify);

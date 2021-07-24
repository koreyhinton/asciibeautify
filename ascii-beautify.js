import { LitElement, html, css } from "lit-element";
import ascii_beautify_color_grid from "./ascii-beautify-color-grid.js";

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
        border: 1px solid #00000061;
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
    `;
  }

  render() {
    return html`
      <table>
        ${ascii_beautify_color_grid(this.ascii, this.colors).map((tro) => {
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

import { LitElement, html } from "lit-element";
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

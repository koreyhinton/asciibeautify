import { LitElement, html } from "lit-element";

class AsciiBeautify extends LitElement {
  ascii;
  colors;

  renderTable() {
    ascii_beautify_color_grid(this.ascii, this.colors).map((node) => {
      return html`
        <tr style=${node.style}>
          node.tds.map(td => {
          <td style=${td.style}></td>
          });
        </tr>
      `;
    });
  }

  render() {
    return html` <h1>fa</h1> `;
  }
}
customElements.define("ascii-beautify", AsciiBeautify);

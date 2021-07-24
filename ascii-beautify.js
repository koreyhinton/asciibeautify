import { LitElement, html } from "lit-element";

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
    return html` <table></table> `;
  }
}
customElements.define("ascii-beautify", AsciiBeautify);

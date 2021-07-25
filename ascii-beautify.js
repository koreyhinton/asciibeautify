import { LitElement, html, css } from "lit-element";
import { asciiBeautifyColorGrid } from "./utils";

class AsciiBeautify extends LitElement {
  downloadImage() {
    const canvas = this.shadowRoot.querySelector("canvas");
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = url;
    a.download = "ascii-beautify.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async updated() {
    if (this.ascii && this.colors) {
      const canvas = this.shadowRoot.querySelector("canvas");
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await this.updateComplete;
        const grid = asciiBeautifyColorGrid(this.ascii, this.colors);
      console.log(grid);
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          ctx.fillStyle = grid[i][j].color ?? "#ffffff";
          ctx.fillRect(j*8, i*8, 8, 8);
        }
      }
    }
  }

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

      canvas {
        display: block;
        margin-top: 24px;
        max-width: 450px;
      }
    `;
  }

  render() {
    return html` <canvas> </canvas> `;
  }
}
customElements.define("ascii-beautify", AsciiBeautify);

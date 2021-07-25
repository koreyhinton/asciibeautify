import { LitElement, html, css } from "lit-element";
import { asciiBeautifyColorGrid } from "./utils";

class AsciiBeautify extends LitElement {
  downloadImage() {
    const canvas = this.shadowRoot.querySelector("canvas");
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = url;
    a.download = "filename.png";
    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
    a.click();
    a.remove(); //afterwards we remove the element again
  }

  updated() {
    if (this.ascii && this.colors) {
      const canvas = this.shadowRoot.querySelector("canvas");
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grid = asciiBeautifyColorGrid(this.ascii, this.colors);
      console.log(grid);
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          ctx.fillStyle = grid[i][j].color;
          ctx.fillRect(j*10, i*10, 10, 10);
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
        width: 100%;
        height: 100%;
      }
    `;
  }

  render() {
    return html` <canvas> </canvas> `;
  }
}
customElements.define("ascii-beautify", AsciiBeautify);

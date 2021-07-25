import { TextArea } from "@material/mwc-textarea";
import { css } from "lit-element";

class AsciiTextarea extends TextArea {
  static get styles() {
    return [
      super.styles,
      css`
        textarea {
          font-family: "Fira Code" !important;
          overflow-x: auto !important;
          white-space: pre !important;
        }
      `,
    ];
  }
}
customElements.define("ascii-textarea", AsciiTextarea);

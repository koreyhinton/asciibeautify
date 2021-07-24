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
      designs: {
        type: Array,
      },
      selectedDesign: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    var template = {
      "0": "#FFFFFF",
      "1": "#FFFFFF",
      "2": "#FFFFFF",
      "3": "#FFFFFF",
      "4": "#FFFFFF",
      "5": "#FFFFFF",
      "6": "#FFFFFF",
      "7": "#FFFFFF",
      "8": "#FFFFFF",
      "9": "#FFFFFF",
      " ": "#FFFFFF",
      "!": "#FFFFFF",
      '"': "#FFFFFF",
      "#": "#FFFFFF",
      "$": "#FFFFFF",
      "%": "#FFFFFF",
      "&": "#FFFFFF",
      "'": "#FFFFFF",
      "(": "#FFFFFF",
      ")": "#FFFFFF",
      "*": "#FFFFFF",
      "+": "#FFFFFF",
      ",": "#FFFFFF",
      "-": "#FFFFFF",
      ".": "#FFFFFF",
      "/": "#FFFFFF",
      ":": "#FFFFFF",
      ";": "#FFFFFF",
      "<": "#FFFFFF",
      "=": "#FFFFFF",
      ">": "#FFFFFF",
      "?": "#FFFFFF",
      "@": "#FFFFFF",
      "A": "#FFFFFF",
      "B": "#FFFFFF",
      "C": "#FFFFFF",
      "D": "#FFFFFF",
      "E": "#FFFFFF",
      "F": "#FFFFFF",
      "G": "#FFFFFF",
      "H": "#FFFFFF",
      "I": "#FFFFFF",
      "J": "#FFFFFF",
      "K": "#FFFFFF",
      "L": "#FFFFFF",
      "M": "#FFFFFF",
      "N": "#FFFFFF",
      "O": "#FFFFFF",
      "P": "#FFFFFF",
      "Q": "#FFFFFF",
      "R": "#FFFFFF",
      "S": "#FFFFFF",
      "T": "#FFFFFF",
      "U": "#FFFFFF",
      "V": "#FFFFFF",
      "W": "#FFFFFF",
      "X": "#FFFFFF",
      "Y": "#FFFFFF",
      "Z": "#FFFFFF",
      "[": "#FFFFFF",
      "\\": "#FFFFFF",
      "]": "#FFFFFF",
      "^": "#FFFFFF",
      "_": "#FFFFFF",
      "`": "#FFFFFF",
      "a": "#FFFFFF",
      "b": "#FFFFFF",
      "c": "#FFFFFF",
      "d": "#FFFFFF",
      "e": "#FFFFFF",
      "f": "#FFFFFF",
      "g": "#FFFFFF",
      "h": "#FFFFFF",
      "i": "#FFFFFF",
      "j": "#FFFFFF",
      "k": "#FFFFFF",
      "l": "#FFFFFF",
      "m": "#FFFFFF",
      "n": "#FFFFFF",
      "o": "#FFFFFF",
      "p": "#FFFFFF",
      "q": "#FFFFFF",
      "r": "#FFFFFF",
      "s": "#FFFFFF",
      "t": "#FFFFFF",
      "u": "#FFFFFF",
      "v": "#FFFFFF",
      "w": "#FFFFFF",
      "x": "#FFFFFF",
      "y": "#FFFFFF",
      "z": "#FFFFFF",
      "{": "#FFFFFF",
      "|": "#FFFFFF",
      "}": "#FFFFFF",
      "~": "#FFFFFF"
    };
    var scifi = [
      "#000" ,"#FFF", "#623ea2","#2e1f49","#2eff6c","#1d775d", "#e53aff", "#9b20b7"
    ];
    this.themes = [
      { name: "Default", colors: "default" },
      { name: "Light", colors: "light" },
      { name: "Dark", colors: "dark" },
      { name: "SciFi", colors: {} },

//	  {
//	  " ": "#FFF", "!":"#e53aff", ".": "#000", "/":"#623ea2", ":": "#2e1f49" //}
    ];
    var scifi_obj={name: "SciFi", colors: {}};
    var templ_keys=Object.keys(template);
    for (var i=0;i<templ_keys.length;i++) {
      scifi_obj.colors[templ_keys[i]] = scifi[i%scifi.length];
    }
    console.log(scifi_obj);
    this.themes = [...this.themes.filter(theme => theme.name!="SciFi"),
		  scifi_obj];
    
    this.selectedTheme = this.themes[0];
    this.designs = [
      {
        name: "Computer",
        ascii: `
 _____
| ___ |
||   ||  J.O.
||___||
|   _ |
|_____|
/_/_|_\_\----.
/_/__|__\_\   )
            (
            []
        `,
      },
      {
        name: "Duck",
        ascii: `
>o)
(_>
      `,
      },
      {
        name: "Whale",
        ascii: `
 __v_
(____\/{
        `,
      },
      {
        name: "Saturn",
        ascii: `
        .::.
        .:'  .:
,MMM8&&&.:'   .:'
MMMMM88&&&&  .:'
MMMMM88&&&&&&:'
MMMMM88&&&&&&
.:MMMMM88&&&&&&
.:'  MMMMM88&&&&
.:'   .:'MMM8&&&'
:'  .:'
'::'  jgs
        `,
      },
      {
        name: "Book",
        ascii: `
        ,   ,
        /////|
       ///// |
      |~~~|  |
      |===|  |
      |j  |  |
      | g |  |
      |  s| /
      |===|/
      '---'
        `,
      },
    ];
    this.selectedDesign = this.designs[0];
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
      <mwc-select
        label="Design"
        outlined
        @selected=${(e) => {
          this.selectedDesign = this.designs.find(
            (design) => design.name === e.target.value
          );
          this.ascii = this.selectedDesign.ascii;
        }}
      >
        ${this.designs.map(
          (design) =>
            html`
              <mwc-list-item value=${design.name}>${design.name}</mwc-list-item>
            `
        )}
      </mwc-select>

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
          this.selectedTheme = this.themes.find(theme => theme.name===e.target.value);//e.target.value;
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

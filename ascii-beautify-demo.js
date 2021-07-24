import { LitElement, html, css } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-textarea";
import "@material/mwc-icon-button";
import "@material/mwc-list/mwc-list-item";
import "./ascii-beautify.js";
import ascii_beautify_bg_fg_swap from "./ascii-beautify-bg-fg-swap.js";

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
      0: "#FFFFFF",
      1: "#FFFFFF",
      2: "#FFFFFF",
      3: "#FFFFFF",
      4: "#FFFFFF",
      5: "#FFFFFF",
      6: "#FFFFFF",
      7: "#FFFFFF",
      8: "#FFFFFF",
      9: "#FFFFFF",
      " ": "#FFFFFF",
      "!": "#FFFFFF",
      '"': "#FFFFFF",
      "#": "#FFFFFF",
      $: "#FFFFFF",
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
      A: "#FFFFFF",
      B: "#FFFFFF",
      C: "#FFFFFF",
      D: "#FFFFFF",
      E: "#FFFFFF",
      F: "#FFFFFF",
      G: "#FFFFFF",
      H: "#FFFFFF",
      I: "#FFFFFF",
      J: "#FFFFFF",
      K: "#FFFFFF",
      L: "#FFFFFF",
      M: "#FFFFFF",
      N: "#FFFFFF",
      O: "#FFFFFF",
      P: "#FFFFFF",
      Q: "#FFFFFF",
      R: "#FFFFFF",
      S: "#FFFFFF",
      T: "#FFFFFF",
      U: "#FFFFFF",
      V: "#FFFFFF",
      W: "#FFFFFF",
      X: "#FFFFFF",
      Y: "#FFFFFF",
      Z: "#FFFFFF",
      "[": "#FFFFFF",
      "\\": "#FFFFFF",
      "]": "#FFFFFF",
      "^": "#FFFFFF",
      _: "#FFFFFF",
      "`": "#FFFFFF",
      a: "#FFFFFF",
      b: "#FFFFFF",
      c: "#FFFFFF",
      d: "#FFFFFF",
      e: "#FFFFFF",
      f: "#FFFFFF",
      g: "#FFFFFF",
      h: "#FFFFFF",
      i: "#FFFFFF",
      j: "#FFFFFF",
      k: "#FFFFFF",
      l: "#FFFFFF",
      m: "#FFFFFF",
      n: "#FFFFFF",
      o: "#FFFFFF",
      p: "#FFFFFF",
      q: "#FFFFFF",
      r: "#FFFFFF",
      s: "#FFFFFF",
      t: "#FFFFFF",
      u: "#FFFFFF",
      v: "#FFFFFF",
      w: "#FFFFFF",
      x: "#FFFFFF",
      y: "#FFFFFF",
      z: "#FFFFFF",
      "{": "#FFFFFF",
      "|": "#FFFFFF",
      "}": "#FFFFFF",
      "~": "#FFFFFF",
    };
    var scifi = [
      "#000000",
      "#FFFFFF",
      "#623ea2",
      "#2e1f49",
      "#2eff6c",
      "#1d775d",
      "#e53aff",
      "#9b20b7",
      "#6c6c6c",
      "#6920b7",
      "#88b720",
    ];
    this.themes = [
      { name: "Default", colors: "default" },
      { name: "Light", colors: {} },
      { name: "Dark", colors: {} },
      { name: "SciFi", colors: {} },
    ];

    var darkTheme = { name: "Dark", colors: {} };
    var darkTemplate = { ...template };
    for (let [key, value] of Object.entries(darkTemplate)) {
      darkTheme.colors[key] = key === " " ? "#000000" : "#ffffff";
    }

    var lightTheme = { name: "Light", colors: {} };
    var lightTemplate = { ...template };
    for (let [key, value] of Object.entries(lightTemplate)) {
      lightTheme.colors[key] = key === " " ? "#000000" : "#ffffff";
    }

    var scifi_obj = { name: "SciFi", colors: {} };
    var templ_keys = Object.keys(template);
    for (var i = 0; i < templ_keys.length; i++) {
      scifi_obj.colors[templ_keys[i]] = scifi[i % scifi.length];
    }
    
    this.themes = [
      ...this.themes.filter((theme) => theme.name != "SciFi" && theme.name != "Dark" && theme.name != "Light"),
      scifi_obj,
      darkTheme,
      lightTheme,
    ];

    console.log(this.themes);
    this.selectedTheme = this.themes[1];
    this.swapSelectedThemeBackground();
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

  updated(changedProps) {
    if (changedProps.has("selectedTheme")) {
      this.swapSelectedThemeBackground();
    }

    if(changedProps.has('ascii') || changedProps.has('selectedDesign')) {
      this.fillBackgroundSpaces();
    }
  }

  fillBackgroundSpaces() {
    console.log("FILL SPACES");
  }

  async swapSelectedThemeBackground() {
    ascii_beautify_bg_fg_swap(
      this.selectedTheme,
      this.selectedTheme.colors[" "]
    );
    await this.updateComplete;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 24px;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }

      h1 {
        font-family: "Zen Tokyo Zoo", cursive;
        font-size: 64px;
        color: var(--primary-color);
        margin: 0;
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
      <header>
        <h1>Ascii Beautify</h1>
        <mwc-icon-button
          @click=${() =>
            window.open("https://github.com/koreyhinton/asciibeautify")}
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </mwc-icon-button>
      </header>
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
        @change=${(e) => {
          this.ascii = e.target.value;
          console.log(e.target.value);
        }}
      >
      </mwc-textarea>

      <mwc-select
        label="Theme"
        outlined
        @selected=${(e) => {
          this.selectedTheme = this.themes.find(
            (theme) => theme.name === e.target.value
          ); //e.target.value;
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
        .ascii=${this.ascii ?? ""}
        .colors=${this.selectedTheme.colors ?? {}}
      ></ascii-beautify>
    `;
  }
}
customElements.define("ascii-beautify-demo", AsciiBeautifyDemo);

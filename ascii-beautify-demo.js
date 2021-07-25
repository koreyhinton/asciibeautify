import { LitElement, html, css } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import "@material/mwc-list/mwc-list-item";
import "./ascii-beautify.js";
import "./ascii-textarea.js";
import {
  colorTemplate,
  designsTemplate,
  asciiBeautifyBgFgSwap,
  asciiBeautifyReduce,
  fillBackgroundSpaces,
} from "./utils.js";

class AsciiBeautifyDemo extends LitElement {
  static get properties() {
    return {
      themes: {
        type: Array,
      },
      selectedTheme: {
        type: Object,
      },
      subTheme: {
        type: Object,
      },
      ascii: {
        type: String,
      },
      last_ascii: {
        type: String,
      },
      designs: {
        type: Array,
      },
      selectedDesign: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.ascii = "";
    this.last_ascii = "";
    this.templates = [];
    this.designs = [];
    this.selectedTheme = null;
    this.selectedDesign = null;

    this.createThemes();
    this.designs = designsTemplate;

    this.selectedTheme = this.themes[0];
    this.selectedDesign = this.designs[0];
    this.subTheme = {};
  }

  async updated(changedProps) {
    if (changedProps.has("ascii") || changedProps.has("selectedTheme")) {
      if (!!this.selectedTheme && !!this.ascii) {
        this.subTheme =
          asciiBeautifyReduce(this.selectedTheme, this.ascii) ?? {};
      }
    }
  }

  createThemes() {
    this.themes = [];

    var darkTheme = { name: "Dark", colors: {} };
    for (let [key, value] of Object.entries({ ...colorTemplate })) {
      darkTheme.colors[key] = key === "sp" ? "#000000" : "#ffffff";
    }

    var lightTheme = { name: "Light", colors: {} };
    for (let [key, value] of Object.entries({ ...colorTemplate })) {
      lightTheme.colors[key] = key === "sp" ? "#ffffff" : "#000000";
    }

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

    var scifiTheme = { name: "SciFi", colors: {} };
    let i = 0;
    for (let [key, value] of Object.entries({ ...colorTemplate })) {
      const color = scifi[i % scifi.length];
      i += 1;
      scifiTheme.colors[key] = color;
    }
    console.log(scifiTheme);

    this.themes = [
      asciiBeautifyBgFgSwap(lightTheme, lightTheme.colors["sp"]),
      asciiBeautifyBgFgSwap(darkTheme, darkTheme.colors["sp"]),
      asciiBeautifyBgFgSwap(scifiTheme, scifiTheme.colors["sp"]),
    ];
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
      }

      h1 {
        font-family: "Zen Tokyo Zoo", cursive;
        font-size: 64px;
        color: var(--primary-color);
        margin: 0;
      }

      p {
        max-width: 600px;
      }

      ascii-textarea,
      mwc-select {
        width: 100%;
        margin-top: 24px;
      }

      ascii-textarea {
        height: 300px;
      }

      color-picker-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 24px;
      }

      color-picker {
        display: flex;
        width: 50;
        height: 50;
        border-radius: 50%;
        border: 3px solid #eee;
        justify-content: center;
        align-items: center;
        opacity: 0.7;
        overflow: hidden;
        margin-right: 8px;
      }

      color-picker:hover {
        opacity: 1;
        transition: 0.5s ease;
        cursor: pointer;
      }

      color-picker span {
        font-size: 24px;
        font-weight: 500;
        position: absolute;
        text-shadow: 1px 0 0 #eee, 0 -1px 0 #eee, 0 1px 0 #eee, -1px 0 0 #eee;
      }

      input[type="color"] {
        cursor: pointer;
        width: 50px;
        height: 50px;
        opacity: 0;
      }

      button-container {
          display: flex;
      }

      mwc-button {
        align-self: flex-start;
        margin-top: 24px;
        margin-right: 12px;
        display: flex;
        align-item: center;
      }

      mwc-button svg {
          width: 18px;
          height: 18px;
          margin-right: 12px;
      }

      [hidden] {
        display: none;
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
      <p>
        Draw some beautiful ascii art! Or select from a few pre-made designs.
        Select a theme and customize your colors and watch your masterpiece
        unfold in real time!
      </p>
      <mwc-select
        label="Design"
        outlined
        .value=${this.selectedDesign?.name}
        @selected=${(e) => {
          this.selectedDesign = this.designs.find(
            (design) => design.name === e.target.value
          );
          this.ascii = fillBackgroundSpaces(this.selectedDesign.ascii);
        }}
      >
        ${this.designs.map(
          (design) =>
            html`
              <mwc-list-item value=${design.name}>${design.name}</mwc-list-item>
            `
        )}
      </mwc-select>

      <ascii-textarea
        outlined
        label="Ascii"
        .value=${this.ascii ?? ""}
        @change=${(e) => {
          this.ascii = fillBackgroundSpaces(e.target.value);
        }}
      ></ascii-textarea>

      <mwc-select
        label="Theme"
        outlined
        .value=${this.selectedTheme?.name}
        @selected=${(e) => {
          this.selectedTheme = this.themes.find(
            (theme) => theme.name === e.target.value
          );
        }}
      >
        ${this.themes.map(
          (theme) =>
            html`
              <mwc-list-item value=${theme.name}>${theme.name}</mwc-list-item>
            `
        )}
      </mwc-select>

      <color-picker-container>
        ${Object.entries(this.subTheme?.colors ?? {}).map((a) => {
          return html`
            <color-picker style="background-color: ${a[1]}">
              <span>${a[0]}</span>
              <input
                .value=${a[1]}
                @change=${(e) => {
                  console.log(a);
                  this.subTheme.colors[a[0]] = e.target.value;
                  this.selectedTheme = this.subTheme;
                }}
                type="color"
              />
            </color-picker>
          `;
        })}
      </color-picker-container>

      <ascii-beautify
        .ascii=${this.ascii ?? ""}
        .colors=${this.selectedTheme?.colors ?? {}}
      ></ascii-beautify>
      <button-container>
      <mwc-button
        @click=${() => {
          const asciiBeautify = this.shadowRoot.querySelector("ascii-beautify");
          asciiBeautify.downloadImage();

        }}
        ?hidden=${!this.ascii || !this.selectedTheme}
        raised
        ><svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M8,13H10.55V10H13.45V13H16L12,17L8,13M19.35,10.04C21.95,10.22 24,12.36 24,15A5,5 0 0,1 19,20H6A6,6 0 0,1 0,14C0,10.91 2.34,8.36 5.35,8.04C6.6,5.64 9.11,4 12,4C15.64,4 18.67,6.59 19.35,10.04M19,18A3,3 0 0,0 22,15C22,13.45 20.78,12.14 19.22,12.04L17.69,11.93L17.39,10.43C16.88,7.86 14.62,6 12,6C9.94,6 8.08,7.14 7.13,8.97L6.63,9.92L5.56,10.03C3.53,10.24 2,11.95 2,14A4,4 0 0,0 6,18H19Z" />
</svg> PNG</mwc-button
      >
      <mwc-button
        @click=${() => {
          this.gen_xpm(8);
          
        }}
        ?hidden=${!this.ascii || !this.selectedTheme}
        outlined
        ><svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M8,13H10.55V10H13.45V13H16L12,17L8,13M19.35,10.04C21.95,10.22 24,12.36 24,15A5,5 0 0,1 19,20H6A6,6 0 0,1 0,14C0,10.91 2.34,8.36 5.35,8.04C6.6,5.64 9.11,4 12,4C15.64,4 18.67,6.59 19.35,10.04M19,18A3,3 0 0,0 22,15C22,13.45 20.78,12.14 19.22,12.04L17.69,11.93L17.39,10.43C16.88,7.86 14.62,6 12,6C9.94,6 8.08,7.14 7.13,8.97L6.63,9.92L5.56,10.03C3.53,10.24 2,11.95 2,14A4,4 0 0,0 6,18H19Z" />
</svg> XPM</mwc-button
      >
     </button-container>
    `;
  }
  gen_xpm(scale=1) {
    scale=1;//scale has to be 1 for xpm file output
    var xpm="";
    var header=`/* XPM */
static char * xpm[] = {
`;
    var keys=Object.keys(this.subTheme.colors);
    var w = this.ascii.replace("\r","").split("\n")[0].length;
    var h = this.ascii.split("\n").length - 1;
    var c = keys.length;
    xpm += header;
    var sp=" ";
    xpm += "\"" + w + sp + h + sp + c + sp + scale + "\",";
    for (var i=0; i<keys.length; i++) {
      var key = keys[i];
      var val = key == "sp" ? " " : key;
      xpm += `
`;
      xpm += "\"" + val + sp + "c" + sp + this.subTheme.colors[key] + "\",";
    }
    xpm += `
"`;
    for (var i=0; i<this.ascii.length; i++) {
      var a = this.ascii[i];
      if (a == '\r'){continue;}
      if (a == '\n'){
	xpm += '",';
	xpm += `
"`;
      }
      else {
	xpm += a;
      }
    }
    xpm = xpm.substring(0,xpm.length-3);
    xpm += `
`;
    xpm += '};';
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xpm));
    el.setAttribute('download', 'img.xpm');
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
}
customElements.define("ascii-beautify-demo", AsciiBeautifyDemo);

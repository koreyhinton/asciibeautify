import { LitElement, html, css } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-icon-button";
import "@material/mwc-list/mwc-list-item";
import "./ascii-beautify.js";
import "./ascii-textarea.js";
import ascii_beautify_bg_fg_swap from "./ascii-beautify-bg-fg-swap.js";
import ascii_beautify_reduce from "./ascii-beautify-reduce.js";
import colorTemplate from "./color-template.js";
import designsTemplate from "./design-template.js";

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
  }

  async updated(changedProps) {
    if (
      (changedProps.has("ascii") && this.ascii !== this.last_ascii) ||
      changedProps.has("selectedDesign")
    ) {
      const asciiFilled = await this.fillBackgroundSpaces(this.ascii);
      this.ascii = asciiFilled;
      this.last_ascii = asciiFilled;
    }

    if (changedProps.has("ascii") || changedProps.has("selectedTheme")) {
      if (!!this.selectedTheme && !!this.ascii) {
        this.subTheme =
          ascii_beautify_reduce(this.selectedTheme, this.ascii) ?? {};
      }
    }
  }

  createThemes() {
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

    this.themes = [];

    var darkTheme = { name: "Dark", colors: {} };
    var darkTemplate = { ...colorTemplate };
    for (let [key, value] of Object.entries(darkTemplate)) {
      darkTheme.colors[key] = key === " " ? "#000000" : "#ffffff";
    }

    var lightTheme = { name: "Light", colors: {} };
    var lightTemplate = { ...colorTemplate };
    for (let [key, value] of Object.entries(lightTemplate)) {
      lightTheme.colors[key] = key === " " ? "#ffffff" : "#000000";
    }

    var scifiTheme = { name: "SciFi", colors: {} };
    var templ_keys = Object.keys(colorTemplate);
    for (var i = 0; i < templ_keys.length; i++) {
      scifiTheme.colors[templ_keys[i]] = scifi[i % scifi.length];
    }

    this.themes = [
      ascii_beautify_bg_fg_swap(lightTheme, lightTheme.colors[" "]),
      ascii_beautify_bg_fg_swap(darkTheme, darkTheme.colors[" "]),
      ascii_beautify_bg_fg_swap(scifiTheme, scifiTheme.colors[" "]),
    ];

    // Fix each theme's background colors
    this.themes.forEach((theme) => {
      ascii_beautify_bg_fg_swap(theme, theme.colors[" "]);
    });

    this.subTheme = {};
  }

  async fillBackgroundSpaces(ascii) {
    await this.updateComplete;

    if (ascii == null || ascii.length == 0) {
      return;
    }
    var min_w = 999;
    var max_w = 0;
    var lines = ascii.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var ll = lines[i].length;
      if (ll < min_w) min_w = ll;
      if (ll > max_w) max_w = ll;
    }
    if (min_w == max_w) {
      return;
    }
    var padded_str = "";
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trailer = "";
      if (line[line.length - 1] == "\r") {
        trailer = "\r";
      }
      var oops = 0;
      while (line.length < max_w) {
        line += " ";
        if (oops > 300) break;
      }
      line += trailer;
      line += "\n";
      padded_str += line;
    }
    return padded_str;
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
        justify-content: space-between;
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

      <ascii-textarea
        outlined
        label="Ascii"
        .value=${this.ascii ?? ""}
        @change=${(e) => {
          this.ascii = e.target.value;
        }}
      ></ascii-textarea>

      <mwc-select
        label="Theme"
        outlined
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
    `;
  }
}
customElements.define("ascii-beautify-demo", AsciiBeautifyDemo);

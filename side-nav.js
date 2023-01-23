// based on https://www.w3schools.com/howto/howto_js_sidenav.asp

import { MenuIcon } from "./menu-icon.js";
import { style } from "https://js.sabae.cc/css.js";

const css = `
side-nav {
  height: 20em;
  width: 0;
  position: fixed;
  z-index: 1;
  bottom: 0;
  right: 0;
  background-color: #333;
  overflow-x: hidden;
  transition: 0.5s;
  border-top-left-radius: 1em;
}
side-nav > div {
  display: inline-block;
  position: absolute;
  bottom: 3em;
}
side-nav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #fff;
  display: block;
  transition: 0.3s;
}
side-nav a:hover {
  color: #fff;
}
@media screen and (max-height: 450px) {
  side-nav {
    padding-top: 15px;
  }
  side-nav a {
    font-size: 18px;
  }
}
`;

export class SideNav extends HTMLElement {
  constructor(menulinks) { // title, url
    super();
    const div = document.createElement("div");
    this.appendChild(div);
    for (const menu of menulinks) {
      const a = document.createElement("a");
      a.href = menu.url;
      a.textContent = menu.title;
      div.appendChild(a);
    }
    style(css);

    const menuIcon = new MenuIcon();
    document.body.appendChild(menuIcon);

    const bodyclose = () => {
      this.style.width = "0";
      document.body.removeEventListener("click", bodyclose);
      menuIcon.classList.remove("change");
    };
    menuIcon.onclick = (e) => {
      const s = this.style;
      if (s.width == "250px") {
        s.width = "0";
      } else {
        s.width = "250px";
        setTimeout(() => document.body.addEventListener("click", bodyclose), 500);
      }
    };
  }
}

customElements.define("side-nav", SideNav);

// ==UserScript==
// @name         Red Planet
// @namespace    https://github.com/pixelkat5/
// @version      0.84.0-4
// @description  A userscript to automate and/or enhance the user experience on Wplace.live. Make sure to comply with the site's Terms of Service, and rules! This script is not affiliated with Wplace.live in any way, use at your own risk. This script is not affiliated with TamperMonkey. The author of this userscript is not responsible for any damages, issues, loss of data, or punishment that may occur as a result of using this script. This script is provided "as is" under the MPL-2.0 license. The "Blue Marble" icon is licensed under CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. The image is owned by NASA.
// @author       SwingTheVine, PixelKat5
// @license      MPL-2.0
// @supportURL   https://discord.gg/tpeBPy46hf
// @homepageURL  https://discord.gg/tpeBPy46hf
// @icon         https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/favicon.png
// @updateURL    https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/Redplanet.user.js
// @downloadURL  https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/Redplanet.user.js
// @match        https://wplace.live/*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      nominatim.openstreetmap.org
// @resource     CSS-BM-File https://raw.githubusercontent.com/SwingTheVine/Wplace-BlueMarble/8d02ac9cbe8f6861248152f2b0d632a0b4a830ee/dist/BlueMarble.user.css
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/

(() => {
    var t, e, n = t => {
            throw TypeError(t)
        },
        i = (t, e, i) => e.has(t) ? n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i),
        o = (t, e, i) => (((t, e) => {
            e.has(t) || n("Cannot access private method")
        })(t, e), i),
        r = class {
            constructor(e, n) {
                i(this, t), this.name = e, this.version = n, this.t = null, this.i = "bm-o", this.o = null, this.m = null, this.l = []
            }
            u(t) {
                this.t = t
            }
            h() {
                return this.l.length > 0 && (this.m = this.l.pop()), this
            }
            p(t) {
                t?.appendChild(this.o), this.o = null, this.m = null, this.l = []
            }
            v(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "div", {}, n)), this
            }
            $(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "p", {}, n)), this
            }
            S(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "small", {}, n)), this
            }
            M(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "img", {}, n)), this
            }
            O(n, i = {}, r = () => {}) {
                return r(this, o(this, t, e).call(this, "h" + n, {}, i)), this
            }
            C(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "hr", {}, n)), this
            }
            D(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "br", {}, n)), this
            }
            T(n = {}, i = () => {}) {
                const r = o(this, t, e).call(this, "label", {
                    textContent: n.textContent ?? ""
                });
                delete n.textContent;
                const s = o(this, t, e).call(this, "input", {
                    type: "checkbox"
                }, n);
                return r.insertBefore(s, r.firstChild), this.h(), i(this, r, s), this
            }
            k(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "button", {}, n)), this
            }
            N(n = {}, i = () => {}) {
                const r = n.title ?? n.textContent ?? "Help: No info";
                delete n.textContent, n.title = `Help: ${r}`;
                const s = {
                    textContent: "?",
                    className: "bm-D",
                    onclick: () => {
                        this.B(this.i, r)
                    }
                };
                return i(this, o(this, t, e).call(this, "button", s, n)), this
            }
            I(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "input", {}, n)), this
            }
            L(n = {}, i = () => {}) {
                const r = n.textContent ?? "";
                delete n.textContent;
                const s = o(this, t, e).call(this, "div"),
                    a = o(this, t, e).call(this, "input", {
                        type: "file",
                        style: "display: none !important; visibility: hidden !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; opacity: 0 !important;"
                    }, n);
                this.h();
                const m = o(this, t, e).call(this, "button", {
                    textContent: r
                });
                return this.h(), this.h(), a.setAttribute("tabindex", "-1"), a.setAttribute("aria-hidden", "true"), m.addEventListener("click", () => {
                    a.click()
                }), a.addEventListener("change", () => {
                    m.style.maxWidth = `${m.offsetWidth}px`, a.files.length > 0 ? m.textContent = a.files[0].name : m.textContent = r
                }), i(this, s, a, m), this
            }
            G(n = {}, i = () => {}) {
                return i(this, o(this, t, e).call(this, "textarea", {}, n)), this
            }
            B(t, e, n = !1) {
                const i = document.getElementById(t.replace(/^#/, ""));
                i && (i instanceof HTMLInputElement ? i.value = e : n ? i.textContent = e : i.innerHTML = e)
            }
            W(t, e) {
                let n, i = !1,
                    o = 0,
                    r = null,
                    s = 0,
                    a = 0,
                    m = 0,
                    l = 0;
                if (t = document.querySelector("#" == t?.[0] ? t : "#" + t), e = document.querySelector("#" == e?.[0] ? e : "#" + e), !t || !e) return void this.P(`Can not drag! ${t?"":"moveMe"} ${t||e?"":"and "}${e?"":"iMoveThings "}was not found!`);
                const c = () => {
                    if (i) {
                        const e = Math.abs(s - m),
                            n = Math.abs(a - l);
                        (e > .5 || n > .5) && (s = m, a = l, t.style.transform = `translate(${s}px, ${a}px)`, t.style.left = "0px", t.style.top = "0px", t.style.right = ""), r = requestAnimationFrame(c)
                    }
                };
                let u = null;
                const d = (d, h) => {
                        i = !0, u = t.getBoundingClientRect(), n = d - u.left, o = h - u.top;
                        const b = window.getComputedStyle(t).transform;
                        if (b && "none" !== b) {
                            const t = new DOMMatrix(b);
                            s = t.m41, a = t.m42
                        } else s = u.left, a = u.top;
                        m = s, l = a, document.body.style.userSelect = "none", e.classList.add("dragging"), r && cancelAnimationFrame(r), c()
                    },
                    h = () => {
                        i = !1, r && (cancelAnimationFrame(r), r = null), document.body.style.userSelect = "", e.classList.remove("dragging")
                    };
                e.addEventListener("mousedown", function(t) {
                    t.preventDefault(), d(t.clientX, t.clientY)
                }), e.addEventListener("touchstart", function(t) {
                    const e = t?.touches?.[0];
                    e && (d(e.clientX, e.clientY), t.preventDefault())
                }, {
                    passive: !1
                }), document.addEventListener("mousemove", function(t) {
                    i && u && (m = t.clientX - n, l = t.clientY - o)
                }, {
                    passive: !0
                }), document.addEventListener("touchmove", function(t) {
                    if (i && u) {
                        const e = t?.touches?.[0];
                        if (!e) return;
                        m = e.clientX - n, l = e.clientY - o, t.preventDefault()
                    }
                }, {
                    passive: !1
                }), document.addEventListener("mouseup", h), document.addEventListener("touchend", h), document.addEventListener("touchcancel", h)
            }
            _(t) {
                (0, console.info)(`${this.name}: ${t}`), this.B(this.i, "Status: " + t, !0)
            }
            P(t) {
                (0, console.error)(`${this.name}: ${t}`), this.B(this.i, "Error: " + t, !0)
            }
        };

    function s(...t) {
        (0, console.error)(...t)
    }

    function a(t, e) {
        if (0 === t) return e[0];
        let n = "";
        const i = e.length;
        for (; t > 0;) n = e[t % i] + n, t = Math.floor(t / i);
        return n
    }

    function m(t) {
        let e = "";
        for (let n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
        return btoa(e)
    }

    function l(t) {
        const e = atob(t),
            n = new Uint8Array(e.length);
        for (let t = 0; t < e.length; t++) n[t] = e.charCodeAt(t);
        return n
    }
    t = new WeakSet, e = function(t, e = {}, n = {}) {
        const i = document.createElement(t);
        this.o ? (this.m?.appendChild(i), this.l.push(this.m), this.m = i) : (this.o = i, this.m = i);
        for (const [t, n] of Object.entries(e)) i[t] = n;
        for (const [t, e] of Object.entries(n)) i[t] = e;
        return i
    };
    var c, u, d, h, b, p, g = [{
            id: 0,
            premium: !1,
            name: "Transparent",
            rgb: [0, 0, 0]
        }, {
            id: 1,
            premium: !1,
            name: "Black",
            rgb: [0, 0, 0]
        }, {
            id: 2,
            premium: !1,
            name: "Dark Gray",
            rgb: [60, 60, 60]
        }, {
            id: 3,
            premium: !1,
            name: "Gray",
            rgb: [120, 120, 120]
        }, {
            id: 4,
            premium: !1,
            name: "Light Gray",
            rgb: [210, 210, 210]
        }, {
            id: 5,
            premium: !1,
            name: "White",
            rgb: [255, 255, 255]
        }, {
            id: 6,
            premium: !1,
            name: "Deep Red",
            rgb: [96, 0, 24]
        }, {
            id: 7,
            premium: !1,
            name: "Red",
            rgb: [237, 28, 36]
        }, {
            id: 8,
            premium: !1,
            name: "Orange",
            rgb: [255, 127, 39]
        }, {
            id: 9,
            premium: !1,
            name: "Gold",
            rgb: [246, 170, 9]
        }, {
            id: 10,
            premium: !1,
            name: "Yellow",
            rgb: [249, 221, 59]
        }, {
            id: 11,
            premium: !1,
            name: "Light Yellow",
            rgb: [255, 250, 188]
        }, {
            id: 12,
            premium: !1,
            name: "Dark Green",
            rgb: [14, 185, 104]
        }, {
            id: 13,
            premium: !1,
            name: "Green",
            rgb: [19, 230, 123]
        }, {
            id: 14,
            premium: !1,
            name: "Light Green",
            rgb: [135, 255, 94]
        }, {
            id: 15,
            premium: !1,
            name: "Dark Teal",
            rgb: [12, 129, 110]
        }, {
            id: 16,
            premium: !1,
            name: "Teal",
            rgb: [16, 174, 166]
        }, {
            id: 17,
            premium: !1,
            name: "Light Teal",
            rgb: [19, 225, 190]
        }, {
            id: 18,
            premium: !1,
            name: "Dark Blue",
            rgb: [40, 80, 158]
        }, {
            id: 19,
            premium: !1,
            name: "Blue",
            rgb: [64, 147, 228]
        }, {
            id: 20,
            premium: !1,
            name: "Cyan",
            rgb: [96, 247, 242]
        }, {
            id: 21,
            premium: !1,
            name: "Indigo",
            rgb: [107, 80, 246]
        }, {
            id: 22,
            premium: !1,
            name: "Light Indigo",
            rgb: [153, 177, 251]
        }, {
            id: 23,
            premium: !1,
            name: "Dark Purple",
            rgb: [120, 12, 153]
        }, {
            id: 24,
            premium: !1,
            name: "Purple",
            rgb: [170, 56, 185]
        }, {
            id: 25,
            premium: !1,
            name: "Light Purple",
            rgb: [224, 159, 249]
        }, {
            id: 26,
            premium: !1,
            name: "Dark Pink",
            rgb: [203, 0, 122]
        }, {
            id: 27,
            premium: !1,
            name: "Pink",
            rgb: [236, 31, 128]
        }, {
            id: 28,
            premium: !1,
            name: "Light Pink",
            rgb: [243, 141, 169]
        }, {
            id: 29,
            premium: !1,
            name: "Dark Brown",
            rgb: [104, 70, 52]
        }, {
            id: 30,
            premium: !1,
            name: "Brown",
            rgb: [149, 104, 42]
        }, {
            id: 31,
            premium: !1,
            name: "Beige",
            rgb: [248, 178, 119]
        }, {
            id: 32,
            premium: !0,
            name: "Medium Gray",
            rgb: [170, 170, 170]
        }, {
            id: 33,
            premium: !0,
            name: "Dark Red",
            rgb: [165, 14, 30]
        }, {
            id: 34,
            premium: !0,
            name: "Light Red",
            rgb: [250, 128, 114]
        }, {
            id: 35,
            premium: !0,
            name: "Dark Orange",
            rgb: [228, 92, 26]
        }, {
            id: 36,
            premium: !0,
            name: "Light Tan",
            rgb: [214, 181, 148]
        }, {
            id: 37,
            premium: !0,
            name: "Dark Goldenrod",
            rgb: [156, 132, 49]
        }, {
            id: 38,
            premium: !0,
            name: "Goldenrod",
            rgb: [197, 173, 49]
        }, {
            id: 39,
            premium: !0,
            name: "Light Goldenrod",
            rgb: [232, 212, 95]
        }, {
            id: 40,
            premium: !0,
            name: "Dark Olive",
            rgb: [74, 107, 58]
        }, {
            id: 41,
            premium: !0,
            name: "Olive",
            rgb: [90, 148, 74]
        }, {
            id: 42,
            premium: !0,
            name: "Light Olive",
            rgb: [132, 197, 115]
        }, {
            id: 43,
            premium: !0,
            name: "Dark Cyan",
            rgb: [15, 121, 159]
        }, {
            id: 44,
            premium: !0,
            name: "Light Cyan",
            rgb: [187, 250, 242]
        }, {
            id: 45,
            premium: !0,
            name: "Light Blue",
            rgb: [125, 199, 255]
        }, {
            id: 46,
            premium: !0,
            name: "Dark Indigo",
            rgb: [77, 49, 184]
        }, {
            id: 47,
            premium: !0,
            name: "Dark Slate Blue",
            rgb: [74, 66, 132]
        }, {
            id: 48,
            premium: !0,
            name: "Slate Blue",
            rgb: [122, 113, 196]
        }, {
            id: 49,
            premium: !0,
            name: "Light Slate Blue",
            rgb: [181, 174, 241]
        }, {
            id: 50,
            premium: !0,
            name: "Light Brown",
            rgb: [219, 164, 99]
        }, {
            id: 51,
            premium: !0,
            name: "Dark Beige",
            rgb: [209, 128, 81]
        }, {
            id: 52,
            premium: !0,
            name: "Light Beige",
            rgb: [255, 197, 165]
        }, {
            id: 53,
            premium: !0,
            name: "Dark Peach",
            rgb: [155, 82, 73]
        }, {
            id: 54,
            premium: !0,
            name: "Peach",
            rgb: [209, 128, 120]
        }, {
            id: 55,
            premium: !0,
            name: "Light Peach",
            rgb: [250, 182, 164]
        }, {
            id: 56,
            premium: !0,
            name: "Dark Tan",
            rgb: [123, 99, 82]
        }, {
            id: 57,
            premium: !0,
            name: "Tan",
            rgb: [156, 132, 107]
        }, {
            id: 58,
            premium: !0,
            name: "Dark Slate",
            rgb: [51, 57, 65]
        }, {
            id: 59,
            premium: !0,
            name: "Slate",
            rgb: [109, 117, 141]
        }, {
            id: 60,
            premium: !0,
            name: "Light Slate",
            rgb: [179, 185, 209]
        }, {
            id: 61,
            premium: !0,
            name: "Dark Stone",
            rgb: [109, 100, 63]
        }, {
            id: 62,
            premium: !0,
            name: "Stone",
            rgb: [148, 140, 107]
        }, {
            id: 63,
            premium: !0,
            name: "Light Stone",
            rgb: [205, 197, 158]
        }],
        f = class {
            constructor({
                displayName: t = "My template",
                F: e = 0,
                j: n = "",
                url: i = "",
                file: o = null,
                coords: r = null,
                R: s = null,
                A: a = 1e3
            } = {}) {
                this.displayName = t, this.F = e, this.j = n, this.url = i, this.file = o, this.coords = r, this.R = s, this.A = a, this.J = 0, this.U = 0, this.V = 0, this.X = {}, this.q = new Set, this.H = null;
                const m = Array.isArray(g) ? g : [];
                this.Y = new Set(m.filter(t => "transparent" !== (t?.name || "").toLowerCase() && Array.isArray(t?.rgb)).map(t => `${t.rgb[0]},${t.rgb[1]},${t.rgb[2]}`));
                const l = "222,250,206";
                this.Y.add(l), this.K = new Map(m.filter(t => Array.isArray(t?.rgb)).map(t => [`${t.rgb[0]},${t.rgb[1]},${t.rgb[2]}`, {
                    id: t.id,
                    premium: !!t.premium,
                    name: t.name
                }]));
                try {
                    const t = m.find(t => "transparent" === (t?.name || "").toLowerCase());
                    t && Array.isArray(t.rgb) && this.K.set(l, {
                        id: t.id,
                        premium: !!t.premium,
                        name: t.name
                    })
                } catch (t) {}
            }
            async Z() {
                const t = await createImageBitmap(this.file),
                    e = t.width,
                    n = t.height,
                    i = e * n;
                this.J = i;
                try {
                    const i = new OffscreenCanvas(e, n).getContext("2d", {
                        tt: !0
                    });
                    i.imageSmoothingEnabled = !1, i.clearRect(0, 0, e, n), i.drawImage(t, 0, 0);
                    const o = i.getImageData(0, 0, e, n).data;
                    let r = 0,
                        s = 0;
                    const a = new Map;
                    for (let t = 0; t < n; t++)
                        for (let n = 0; n < e; n++) {
                            const i = 4 * (t * e + n),
                                m = o[i],
                                l = o[i + 1],
                                c = o[i + 2];
                            if (0 === o[i + 3]) continue;
                            const u = `${m},${l},${c}`;
                            222 === m && 250 === l && 206 === c && s++, this.Y.has(u) && (r++, a.set(u, (a.get(u) || 0) + 1))
                        }
                    this.U = r, this.V = s;
                    const m = {};
                    for (const [t, e] of a.entries()) m[t] = {
                        count: e,
                        enabled: !0
                    };
                    this.X = m
                } catch (t) {
                    this.U = Math.max(0, this.J), this.V = 0
                }
                const o = {},
                    r = {},
                    s = new OffscreenCanvas(this.A, this.A),
                    a = s.getContext("2d", {
                        tt: !0
                    });
                for (let i = this.coords[3]; i < n + this.coords[3];) {
                    const l = Math.min(this.A - i % this.A, n - (i - this.coords[3]));
                    for (let n = this.coords[2]; n < e + this.coords[2];) {
                        const c = Math.min(this.A - n % this.A, e - (n - this.coords[2])),
                            u = 3 * c,
                            d = 3 * l;
                        s.width = u, s.height = d, a.imageSmoothingEnabled = !1, a.clearRect(0, 0, u, d), a.drawImage(t, n - this.coords[2], i - this.coords[3], c, l, 0, 0, 3 * c, 3 * l);
                        const h = a.getImageData(0, 0, u, d);
                        for (let t = 0; t < d; t++)
                            for (let e = 0; e < u; e++) {
                                const n = 4 * (t * u + e);
                                if (222 === h.data[n] && 250 === h.data[n + 1] && 206 === h.data[n + 2])(e + t) % 2 == 0 ? (h.data[n] = 0, h.data[n + 1] = 0, h.data[n + 2] = 0) : (h.data[n] = 255, h.data[n + 1] = 255, h.data[n + 2] = 255), h.data[n + 3] = 32;
                                else if (e % 3 != 1 || t % 3 != 1) h.data[n + 3] = 0;
                                else {
                                    const t = h.data[n],
                                        e = h.data[n + 1],
                                        i = h.data[n + 2];
                                    this.Y.has(`${t},${e},${i}`) || (h.data[n + 3] = 0)
                                }
                            }
                        a.putImageData(h, 0, 0);
                        const b = `${(this.coords[0]+Math.floor(n/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(i/1e3)).toString().padStart(4,"0")},${(n%1e3).toString().padStart(3,"0")},${(i%1e3).toString().padStart(3,"0")}`;
                        o[b] = await createImageBitmap(s), this.q.add(b.split(",").slice(0, 2).join(","));
                        const p = await s.convertToBlob(),
                            g = await p.arrayBuffer(),
                            f = Array.from(new Uint8Array(g));
                        r[b] = m(f), n += c
                    }
                    i += l
                }
                return {
                    et: o,
                    nt: r
                }
            }
        };
    c = new WeakSet, u = async function() {
        GM.setValue("bmTemplates", JSON.stringify(this.it))
    }, d = async function(t) {
        const e = t.templates;
        if (Object.keys(e).length > 0) {
            for (const t in e) {
                const n = t,
                    i = e[t];
                if (e.hasOwnProperty(t)) {
                    const t = n.split(" "),
                        o = Number(t?.[0]),
                        r = t?.[1] || "0",
                        s = i.name || `Template ${o||""}`,
                        a = i.tiles,
                        m = {};
                    let c = 0;
                    const u = new Map;
                    for (const t in a)
                        if (a.hasOwnProperty(t)) {
                            const e = l(a[t]),
                                n = new Blob([e], {
                                    type: "image/png"
                                }),
                                i = await createImageBitmap(n);
                            m[t] = i;
                            try {
                                const t = i.width,
                                    e = i.height,
                                    n = new OffscreenCanvas(t, e).getContext("2d", {
                                        tt: !0
                                    });
                                n.imageSmoothingEnabled = !1, n.clearRect(0, 0, t, e), n.drawImage(i, 0, 0);
                                const o = n.getImageData(0, 0, t, e).data;
                                for (let n = 0; n < e; n++)
                                    for (let e = 0; e < t; e++) {
                                        if (e % this.ot !== 1 || n % this.ot !== 1) continue;
                                        const i = 4 * (n * t + e),
                                            r = o[i],
                                            s = o[i + 1],
                                            a = o[i + 2];
                                        if (o[i + 3] < 64) continue;
                                        if (222 === r && 250 === s && 206 === a) continue;
                                        c++;
                                        const m = `${r},${s},${a}`;
                                        u.set(m, (u.get(m) || 0) + 1)
                                    }
                            } catch (t) {}
                        } const d = new f({
                        displayName: s,
                        F: o || this.rt?.length || 0,
                        j: r || ""
                    });
                    d.R = m, d.U = c;
                    const h = {};
                    for (const [t, e] of u.entries()) h[t] = {
                        count: e,
                        enabled: !0
                    };
                    d.X = h;
                    try {
                        Object.keys(m).forEach(t => {
                            d.q?.add(t.split(",").slice(0, 2).join(","))
                        })
                    } catch (t) {}
                    try {
                        const t = e?.[n]?.palette;
                        if (t)
                            for (const [e, n] of Object.entries(t)) d.X[e] ? d.X[e].enabled = !!n?.enabled : d.X[e] = {
                                count: n?.count || 0,
                                enabled: !!n?.enabled
                            }
                    } catch (t) {}
                    d.H = n, this.rt.push(d)
                }
            }
            try {
                const t = document.querySelector("#bm-9");
                t && (t.style.display = ""), window.postMessage({
                    source: "blue-marble",
                    st: "bm-b"
                }, "*")
            } catch (t) {}
        }
    }, h = new WeakSet, b = async function(t = navigator.userAgent) {
        return (t = t || "").includes("OPR/") || t.includes("Opera") ? "Opera" : t.includes("Edg/") ? "Edge" : t.includes("Vivaldi") ? "Vivaldi" : t.includes("YaBrowser") ? "Yandex" : t.includes("Kiwi") ? "Kiwi" : t.includes("Brave") ? "Brave" : t.includes("Firefox/") ? "Firefox" : t.includes("Chrome/") ? "Chrome" : t.includes("Safari/") ? "Safari" : navigator.brave && "function" == typeof navigator.brave.isBrave && await navigator.brave.isBrave() ? "Brave" : "Unknown"
    }, p = function(t = navigator.userAgent) {
        return /Windows NT 11/i.test(t = t || "") ? "Windows 11" : /Windows NT 10/i.test(t) ? "Windows 10" : /Windows NT 6\.3/i.test(t) ? "Windows 8.1" : /Windows NT 6\.2/i.test(t) ? "Windows 8" : /Windows NT 6\.1/i.test(t) ? "Windows 7" : /Windows NT 6\.0/i.test(t) ? "Windows Vista" : /Windows NT 5\.1|Windows XP/i.test(t) ? "Windows XP" : /Mac OS X 10[_\.]15/i.test(t) ? "macOS Catalina" : /Mac OS X 10[_\.]14/i.test(t) ? "macOS Mojave" : /Mac OS X 10[_\.]13/i.test(t) ? "macOS High Sierra" : /Mac OS X 10[_\.]12/i.test(t) ? "macOS Sierra" : /Mac OS X 10[_\.]11/i.test(t) ? "OS X El Capitan" : /Mac OS X 10[_\.]10/i.test(t) ? "OS X Yosemite" : /Mac OS X 10[_\.]/i.test(t) ? "macOS" : /Android/i.test(t) ? "Android" : /iPhone|iPad|iPod/i.test(t) ? "iOS" : /Linux/i.test(t) ? "Linux" : "Unknown"
    };
    var w = GM_info.script.name.toString(),
        y = GM_info.script.version.toString();
    ! function(t) {
        const e = document.createElement("script");
        e.setAttribute("bm-E", w), e.setAttribute("bm-B", "color: cornflowerblue;"), e.textContent = `(${t})();`, document.documentElement?.appendChild(e), e.remove()
    }(() => {
        const t = document.currentScript,
            e = t?.getAttribute("bm-E") || "Blue Marble",
            n = t?.getAttribute("bm-B") || "",
            i = new Map;
        window.addEventListener("message", t => {
            const {
                source: o,
                endpoint: r,
                blobID: s,
                blobData: a,
                blink: m
            } = t.data;
            if (Date.now(), "blue-marble" == o && s && a && !r) {
                const t = i.get(s);
                "function" == typeof t ? t(a) : function(...t) {
                    (0, console.warn)(...t)
                }(`%c${e}%c: Attempted to retrieve a blob (%s) from queue, but the blobID was not a function! Skipping...`, n, "", s), i.delete(s)
            }
        });
        const o = window.fetch;
        window.fetch = async function(...t) {
            const e = await o.apply(this, t),
                n = e.clone(),
                r = (t[0] instanceof Request ? t[0]?.url : t[0]) || "ignore",
                s = n.headers.get("content-type") || "";
            if (s.includes("application/json")) n.json().then(t => {
                window.postMessage({
                    source: "blue-marble",
                    endpoint: r,
                    jsonData: t
                }, "*")
            }).catch(t => {});
            else if (s.includes("image/") && !r.includes("openfreemap") && !r.includes("maps")) {
                const t = Date.now(),
                    e = await n.blob();
                return new Promise(o => {
                    const s = crypto.randomUUID();
                    i.set(s, t => {
                        o(new Response(t, {
                            headers: n.headers,
                            status: n.status,
                            statusText: n.statusText
                        }))
                    }), window.postMessage({
                        source: "blue-marble",
                        endpoint: r,
                        blobID: s,
                        blobData: e,
                        blink: t
                    })
                }).catch(t => {
                    Date.now()
                })
            }
            return e
        }
    });
    var v = GM_getResourceText("CSS-BM-File");
GM_addStyle(v);

// Override main window colors to match wrench menu red theme
const redThemeCSS = `
#bm-A {
  background: #3c1e24 !important;
  border: 2px solid #5e2d2a !important;
  color: #fff !important;
  box-shadow: 0 8px 32px #2a1113cc !important;
}

#bm-A h1 {
  color: #e4bfbf !important;
}

#bm-A hr {
  border-color: #5e2d2a !important;
}

#bm-A button.bm-D {
  background: #a23a2b !important;
  color: #fff !important;
  border: 1px solid #5e2d2a !important;
  transition: background 0.18s !important;
}

#bm-A button.bm-D:hover {
  background: #d85c38 !important;
}

#bm-A button.bm-D:active {
  background: #c14429 !important;
}

#bm-A input[type="number"] {
  background: #5e2d2a !important;
  color: #fff !important;
  border: 1px solid #a23a2b !important;
}

#bm-A input[type="number"]:focus {
  outline: 1px solid #d85c38 !important;
}

#bm-A textarea {
  background: #5e2d2a !important;
  color: #fff !important;
  border: 1px solid #a23a2b !important;
}

#bm-A small {
  color: #e4bfbf !important;
}

#bm-A p {
  color: #e4bfbf !important;
}

#bm-A label {
  color: #e4bfbf !important;
}

#bm-A div[style*="border"] {
  border-color: #5e2d2a !important;
}

#bm-A input[type="checkbox"] {
  accent-color: #a23a2b !important;
}

#bm-A input[type="file"] {
  background: #5e2d2a !important;
  color: #fff !important;
  border: 1px solid #a23a2b !important;
}

#bm-A input[type="file"]:hover {
  background: #d85c38 !important;
}

/* Target specific buttons that don't use bm-D class */
#bm-A #bm-3, /* Enable All */
#bm-A #bm-0, /* Disable All */
#bm-A #bm-s, /* Enable */
#bm-A #bm-r, /* Create */
#bm-A #bm-l, /* Disable */
#bm-A #bm-a button, /* Upload Template button */
#bm-A button:not(.bm-D) { /* Any other buttons not using bm-D class */
  background: #a23a2b !important;
  color: #fff !important;
  border: 1px solid #5e2d2a !important;
  transition: background 0.18s !important;
}

#bm-A #bm-3:hover, /* Enable All */
#bm-A #bm-0:hover, /* Disable All */
#bm-A #bm-s:hover, /* Enable */
#bm-A #bm-r:hover, /* Create */
#bm-A #bm-l:hover, /* Disable */
#bm-A #bm-a button:hover, /* Upload Template button */
#bm-A button:not(.bm-D):hover { /* Any other buttons not using bm-D class */
  background: #d85c38 !important;
}

#bm-A #bm-3:active, /* Enable All */
#bm-A #bm-0:active, /* Disable All */
#bm-A #bm-s:active, /* Enable */
#bm-A #bm-r:active, /* Create */
#bm-A #bm-l:active, /* Disable */
#bm-A #bm-a button:active, /* Upload Template button */
#bm-A button:not(.bm-D):active { /* Any other buttons not using bm-D class */
  background: #c14429 !important;
}

/* Style the main window drag handle to match wrench window */
#bm-z {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="3" cy="3" r="1.5" fill="indianred" /></svg>') repeat !important;
  cursor: grab !important;
  width: 100% !important;
  height: 1.2em !important;
  border-radius: 4px 4px 0 0 !important;
  margin-bottom: 0.5em !important;
}

#bm-z:hover {
  cursor: grab !important;
}

#bm-z:active {
  cursor: grabbing !important;
}
`;

GM_addStyle(redThemeCSS);

// Add Search Window CSS
const searchWindowCSS = `
#mars-search-draggable {
  position: fixed; right: 75px; top: 440px; z-index: 2147483646;
  width: min(420px,90vw); max-height: 500px;
  background: #3c1e24; color: #fff; border-radius: 10px;
  box-shadow: 0 8px 32px #2a1113cc;
  font: 14px/1.4 Roboto Mono, monospace, Arial;
  display: none;
  border: none;
  flex-direction: column;
  min-width: 300px;
  will-change: transform;
}
#mars-search-draggable .drag-handle {
  margin-bottom: 0.5em;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="3" cy="3" r="1.5" fill="indianred" /></svg>') repeat;
  cursor: grab;
  width: 100%;
  height: 1.2em;
  border-radius: 4px 4px 0 0;
}
#mars-search-draggable.dragging .drag-handle {
  cursor: grabbing;
}
#mars-search-draggable .hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px 0 14px;
}
#mars-search-draggable .hdr h3 {
  margin: 0; font-size: 17px; font-weight: 700; letter-spacing: 0.07em;
  display: flex; align-items: center; gap: 0.5em;
}
#mars-search-draggable .hdr .actions {
  display: flex; gap: 10px;
}
#mars-search-draggable .hdr button {
  border: none; padding: 6px 10px; border-radius: 7px;
  background: #a23a2b; color: #fff; font: 14px monospace;
  cursor: pointer;
  transition: background 0.18s;
}
#mars-search-draggable .hdr button:hover { background: #d85c38; }
#mars-search-draggable .hdr button:active { background: #c14429; }
#mars-search-draggable .body {
  padding: 10px 14px; overflow: hidden;
}
#mars-search-input {
  width: 100%; padding: 8px 12px; border-radius: 6px;
  border: 1px solid #a23a2b; background: #5e2d2a;
  color: #fff; font: 14px monospace;
  margin-bottom: 10px;
}
#mars-search-input:focus { outline: 1px solid #d85c38;}
#mars-search-input::placeholder { color: #e4bfbf80; }
#mars-search-results {
  max-height: 320px; overflow-y: auto;
}
.mars-search-result {
  padding: 10px; cursor: pointer;
  border-bottom: 1px solid #5e2d2a;
  transition: background-color 0.2s;
}
.mars-search-result:hover {
  background-color: #5e2d2a;
}
.mars-search-result:last-child {
  border-bottom: none;
}
.mars-result-name {
  font-size: 14px;
  color: #e4bfbf;
  margin-bottom: 4px;
  font-weight: 500;
}
.mars-result-address {
  font-size: 12px;
  color: #e4bfbf80;
}
.mars-loading, .mars-no-results {
  padding: 20px;
  text-align: center;
  color: #e4bfbf80;
  font-size: 14px;
}
.mars-icon {
  display: inline-block; height: 2em; margin-right: 1ch; vertical-align: middle;
}
`;

GM_addStyle(searchWindowCSS);

var x = document.createElement("link");
x.href = "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap", x.rel = "preload", x.as = "style", x.onload = function() {
    this.onload = null, this.rel = "stylesheet"
}, document.head?.appendChild(x), new class {
        constructor() {
            this.lt = null, this.ct = null, this.ut = "#bm-h"
        }
        dt(t) {
            return this.ct = t, this.lt = new MutationObserver(t => {
                for (const e of t)
                    for (const t of e.addedNodes) t instanceof HTMLElement && t.matches?.(this.ut)
            }), this
        }
        ht() {
            return this.lt
        }
        observe(t, e = !1, n = !1) {
            t.observe(this.ct, {
                childList: e,
                subtree: n
            })
        }
    };
    var $ = new r(w, y),
        S = (new r(w, y), new class {
            constructor(t, e, n) {
                i(this, c), this.name = t, this.version = e, this.o = n, this.bt = "1.0.0", this.gt = null, this.ft = "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~", this.A = 1e3, this.ot = 3, this.wt = null, this.yt = null, this.vt = "bm-C", this.xt = "div#map canvas.maplibregl-canvas", this.$t = null, this.St = "", this.rt = [], this.it = null, this.Mt = !0, this.Ot = new Map
            }
            Ct() {
                if (document.body.contains(this.wt)) return this.wt;
                document.getElementById(this.vt)?.remove();
                const t = document.querySelector(this.xt),
                    e = document.createElement("canvas");
                return e.id = this.vt, e.className = "maplibregl-canvas", e.style.position = "absolute", e.style.top = "0", e.style.left = "0", e.style.height = t?.clientHeight * (window.devicePixelRatio || 1) + "px", e.style.width = t?.clientWidth * (window.devicePixelRatio || 1) + "px", e.height = t?.clientHeight * (window.devicePixelRatio || 1), e.width = t?.clientWidth * (window.devicePixelRatio || 1), e.style.zIndex = "8999", e.style.pointerEvents = "none", t?.parentElement?.appendChild(e), this.wt = e, window.addEventListener("move", this.Dt), window.addEventListener("zoom", this.Tt), window.addEventListener("resize", this.kt), this.wt
            }
            async Nt() {
                return {
                    whoami: this.name.replace(" ", ""),
                    scriptVersion: this.version,
                    schemaVersion: this.bt,
                    templates: {}
                }
            }
            async Bt(t, e, n) {
                this.it || (this.it = await this.Nt()), this.o._(`Creating template at ${n.join(", ")}...`);
                const i = new f({
                        displayName: e,
                        F: 0,
                        j: a(this.gt || 0, this.ft),
                        file: t,
                        coords: n
                    }),
                    {
                        et: r,
                        nt: s
                    } = await i.Z(this.A);
                i.R = r;
                const m = `${i.F} ${i.j}`;
                i.H = m, this.it.templates[m] = {
                    name: i.displayName,
                    coords: n.join(", "),
                    enabled: !0,
                    tiles: s,
                    palette: i.X
                }, this.rt = [], this.rt.push(i);
                const l = (new Intl.NumberFormat).format(i.J);
                this.o._(`Template created at ${n.join(", ")}! Total pixels: ${l}`);
                try {
                    const t = document.querySelector("#bm-9");
                    t && (t.style.display = ""), window.postMessage({
                        source: "blue-marble",
                        st: "bm-b"
                    }, "*")
                } catch (t) {}
                await o(this, c, u).call(this)
            }
            It() {}
            async Lt() {
                this.it || (this.it = await this.Nt())
            }
            async Gt(t, e) {
                if (!this.Mt) return t;
                const n = this.A * this.ot;
                e = e[0].toString().padStart(4, "0") + "," + e[1].toString().padStart(4, "0");
                const i = this.rt;
                if (i.sort((t, e) => t.F - e.F), !i.some(t => !!t?.R && (t.q && t.q.size > 0 ? t.q.has(e) : Object.keys(t.R).some(t => t.startsWith(e))))) return t;
                const o = i.map(t => {
                        const n = Object.keys(t.R).filter(t => t.startsWith(e));
                        if (0 === n.length) return null;
                        const i = n.map(e => {
                            const n = e.split(",");
                            return {
                                Wt: t.R[e],
                                Pt: [n[0], n[1]],
                                _t: [n[2], n[3]]
                            }
                        });
                        return i?.[0]
                    }).filter(Boolean),
                    r = o?.length || 0;
                let s = 0,
                    a = 0,
                    m = 0;
                const l = await createImageBitmap(t),
                    c = new OffscreenCanvas(n, n),
                    u = c.getContext("2d");
                u.imageSmoothingEnabled = !1, u.beginPath(), u.rect(0, 0, n, n), u.clip(), u.clearRect(0, 0, n, n), u.drawImage(l, 0, 0, n, n);
                let d = null;
                try {
                    d = u.getImageData(0, 0, n, n).data
                } catch (t) {}
                for (const t of o) {
                    if (d) try {
                        const e = t.Wt.width,
                            i = t.Wt.height,
                            o = new OffscreenCanvas(e, i).getContext("2d", {
                                tt: !0
                            });
                        o.imageSmoothingEnabled = !1, o.clearRect(0, 0, e, i), o.drawImage(t.Wt, 0, 0);
                        const r = o.getImageData(0, 0, e, i).data,
                            l = Number(t._t[0]) * this.ot,
                            c = Number(t._t[1]) * this.ot;
                        for (let t = 0; t < i; t++)
                            for (let i = 0; i < e; i++) {
                                if (i % this.ot !== 1 || t % this.ot !== 1) continue;
                                const o = i + l,
                                    u = t + c;
                                if (o < 0 || u < 0 || o >= n || u >= n) continue;
                                const h = 4 * (t * e + i),
                                    b = r[h],
                                    p = r[h + 1],
                                    g = r[h + 2];
                                if (r[h + 3] < 64) {
                                    try {
                                        const t = this.rt?.[0],
                                            e = 4 * (u * n + o),
                                            i = d[e],
                                            r = d[e + 1],
                                            s = d[e + 2],
                                            m = d[e + 3],
                                            l = `${i},${r},${s}`,
                                            c = !!t?.Y && t.Y.has(l);
                                        m >= 64 && c && a++
                                    } catch (t) {}
                                    continue
                                }
                                try {
                                    const t = this.rt?.[0];
                                    if (t?.Y && !t.Y.has(`${b},${p},${g}`)) continue
                                } catch (t) {}
                                m++;
                                const f = 4 * (u * n + o),
                                    w = d[f],
                                    y = d[f + 1],
                                    v = d[f + 2];
                                d[f + 3] < 64 || (w === b && y === p && v === g ? s++ : a++)
                            }
                    } catch (t) {}
                    try {
                        const e = this.rt?.[0],
                            n = e?.X || {};
                        if (Object.values(n).some(t => !1 === t?.enabled)) {
                            const i = t.Wt.width,
                                o = t.Wt.height,
                                r = new OffscreenCanvas(i, o),
                                s = r.getContext("2d", {
                                    tt: !0
                                });
                            s.imageSmoothingEnabled = !1, s.clearRect(0, 0, i, o), s.drawImage(t.Wt, 0, 0);
                            const a = s.getImageData(0, 0, i, o),
                                m = a.data;
                            for (let t = 0; t < o; t++)
                                for (let o = 0; o < i; o++) {
                                    if (o % this.ot !== 1 || t % this.ot !== 1) continue;
                                    const r = 4 * (t * i + o),
                                        s = m[r],
                                        a = m[r + 1],
                                        l = m[r + 2];
                                    if (m[r + 3] < 1) continue;
                                    const c = `${s},${a},${l}`;
                                    (!e?.Y || e.Y.has(c)) && !1 !== n?.[c]?.enabled || (m[r + 3] = 0)
                                }
                            s.putImageData(a, 0, 0), u.drawImage(r, Number(t._t[0]) * this.ot, Number(t._t[1]) * this.ot)
                        } else u.drawImage(t.Wt, Number(t._t[0]) * this.ot, Number(t._t[1]) * this.ot)
                    } catch (e) {
                        u.drawImage(t.Wt, Number(t._t[0]) * this.ot, Number(t._t[1]) * this.ot)
                    }
                }
                if (r > 0) {
                    const t = e;
                    this.Ot.set(t, {
                        Et: s,
                        required: m,
                        Ft: a
                    });
                    let n = 0,
                        i = 0,
                        o = 0;
                    for (const t of this.Ot.values()) n += t.Et || 0, i += t.required || 0, o += t.Ft || 0;
                    const l = this.rt.reduce((t, e) => t + (e.U || e.J || 0), 0),
                        c = l > 0 ? l : i,
                        u = (new Intl.NumberFormat).format(n),
                        d = (new Intl.NumberFormat).format(c),
                        h = (new Intl.NumberFormat).format(c - n);
                    this.o._(`Displaying ${r} template${1==r?"":"s"}.\nPainted ${u} / ${d} • Wrong ${h}`)
                } else this.o._(`Displaying ${r} templates.`);
                return await c.convertToBlob({
                    type: "image/png"
                })
            }
            jt(t) {
                "BlueMarble" == t?.whoami && o(this, c, d).call(this, t)
            }
            Rt(t) {
                this.Mt = t
            }
        }(w, y, $)),
        M = new class {
            constructor(t) {
                i(this, h), this.At = t, this.Jt = !1, this.Ut = [], this.Vt = []
            }
            Xt(t) {
                window.addEventListener("message", async e => {
                    const n = e.data,
                        i = n.jsonData;
                    if (!n || "blue-marble" !== n.source) return;
                    if (!n.endpoint) return;
                    const o = n.endpoint?.split("?")[0].split("/").filter(t => t && isNaN(Number(t))).filter(t => t && !t.includes(".")).pop();
                    switch (o) {
                        case "me":
                            if (i.status && "2" != i.status?.toString()[0]) return void t.P("You are not logged in!\nCould not fetch userdata.");
                            const e = Math.ceil(Math.pow(Math.floor(i.level) * Math.pow(30, .65), 1 / .65) - i.pixelsPainted);
                            i.id || i.id, this.At.gt = i.id, t.B("bm-u", `Username: <b>${function(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}(i.name)}</b>`), t.B("bm-p", `Droplets: <b>${(new Intl.NumberFormat).format(i.droplets)}</b>`), t.B("bm-i", `Next level in <b>${(new Intl.NumberFormat).format(e)}</b> pixel${1==e?"":"s"}`);
                            break;
                        case "pixel":
                            const o = n.endpoint.split("?")[0].split("/").filter(t => t && !isNaN(Number(t))),
                                a = new URLSearchParams(n.endpoint.split("?")[1]),
                                m = [a.get("x"), a.get("y")];
                            if (this.Ut.length && (!o.length || !m.length)) return void t.P("Coordinates are malformed!\nDid you try clicking the canvas first?");
                            this.Ut = [...o, ...m];
                            const l = (r = o, s = m, [parseInt(r[0]) % 4 * 1e3 + parseInt(s[0]), parseInt(r[1]) % 4 * 1e3 + parseInt(s[1])]),
                                c = document.querySelectorAll("span");
                            for (const t of c)
                                if (t.textContent.trim().includes(`${l[0]}, ${l[1]}`)) {
                                    let e = document.querySelector("#bm-h");
                                    const n = `(Tl X: ${o[0]}, Tl Y: ${o[1]}, Px X: ${m[0]}, Px Y: ${m[1]})`;
                                    e ? e.textContent = n : (e = document.createElement("span"), e.id = "bm-h", e.textContent = n, e.style = "margin-left: calc(var(--spacing)*3); font-size: small;", t.parentNode.parentNode.parentNode.insertAdjacentElement("afterend", e))
                                } break;
                        case "tiles":
                            let u = n.endpoint.split("/");
                            u = [parseInt(u[u.length - 2]), parseInt(u[u.length - 1].replace(".png", ""))];
                            const d = n.blobID,
                                h = n.blobData,
                                b = await this.At.Gt(h, u);
                            window.postMessage({
                                source: "blue-marble",
                                blobID: d,
                                blobData: b,
                                blink: n.blink
                            });
                            break;
                        case "robots":
                            this.Jt = "false" == i.userscript?.toString().toLowerCase()
                    }
                    var r, s
                })
            }
            async qt(t) {
                let e = GM_getValue("bmUserSettings", "{}");
                if (e = JSON.parse(e), !e || !e.telemetry || !e.uuid) return;
                const n = navigator.userAgent;
                let i = await o(this, h, b).call(this, n),
                    r = o(this, h, p).call(this, n);
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "https://telemetry.thebluecorner.net/heartbeat",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        uuid: e.uuid,
                        version: t,
                        browser: i,
                        os: r
                    }),
                    onload: t => {
                        200 !== t.status && s("Failed to send heartbeat:", t.statusText)
                    },
                    onerror: t => {
                        s("Error sending heartbeat:", t)
                    }
                })
            }
        }(S);
    $.u(M);
    var O = JSON.parse(GM_getValue("bmTemplates", "{}"));
    S.jt(O);
    var C = JSON.parse(GM_getValue("bmUserSettings", "{}"));
    if (0 == Object.keys(C).length) {
        const t = crypto.randomUUID();
        GM.setValue("bmUserSettings", JSON.stringify({
            uuid: t
        }))
    }
    if (setInterval(() => M.qt(y), 18e5), null == C?.telemetry || C?.telemetry > 1) {
        const t = new r(w, y);
        t.u(M), t.v({
            id: "bm-d",
            style: "top: 0px; left: 0px; width: 100vw; max-width: 100vw; height: 100vh; max-height: 100vh; z-index: 9999;"
        }).v({
            id: "bm-7",
            style: "display: flex; flex-direction: column; align-items: center;"
        }).v({
            id: "bm-1",
            style: "margin-top: 10%;"
        }).O(1, {
            textContent: `${w} Telemetry`
        }).h().h().v({
            id: "bm-e",
            style: "max-width: 50%; overflow-y: auto; max-height: 80vh;"
        }).C().h().D().h().v({
            style: "width: fit-content; margin: auto; text-align: center;"
        }).k({
            id: "bm-8",
            textContent: "More Information"
        }, (t, e) => {
            e.onclick = () => {
                window.open("https://github.com/SwingTheVine/Wplace-TelemetryServer#telemetry-data", "_blank", "noopener noreferrer")
            }
        }).h().h().D().h().v({
            style: "width: fit-content; margin: auto; text-align: center;"
        }).k({
            id: "bm-5",
            textContent: "Enable Telemetry",
            style: "margin-right: 2ch;"
        }, (t, e) => {
            e.onclick = () => {
                const t = JSON.parse(GM_getValue("bmUserSettings", "{}"));
                t.telemetry = 1, GM.setValue("bmUserSettings", JSON.stringify(t));
                const e = document.getElementById("bm-d");
                e && (e.style.display = "none")
            }
        }).h().k({
            id: "bm-2",
            textContent: "Disable Telemetry"
        }, (t, e) => {
            e.onclick = () => {
                const t = JSON.parse(GM_getValue("bmUserSettings", "{}"));
                t.telemetry = 0, GM.setValue("bmUserSettings", JSON.stringify(t));
                const e = document.getElementById("bm-d");
                e && (e.style.display = "none")
            }
        }).h().h().D().h().$({
            textContent: "We collect anonymous telemetry data such as your browser, OS, and script version to make the experience better for everyone. The data is never shared personally. The data is never sold. You can turn this off by pressing the 'Disable' button, but keeping it on helps us improve features and reliability faster. Thank you for supporting the Blue Marble!"
        }).h().$({
            textContent: 'You can disable telemetry by pressing the "Disable" button below.'
        }).h().h().h().p(document.body)
    }

    // Add Search Functionality
    function createSearchWindow() {
        const searchPanel = document.createElement('div');
        searchPanel.id = 'mars-search-draggable';
        searchPanel.innerHTML = `
<div class="drag-handle"></div>
<div class="hdr">
  <h3>
    <img class="mars-icon" src="https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/favicon.png" alt="Mars">
    Location Search
  </h3>
  <div class="actions">
    <button id="mars-search-close">Close</button>
  </div>
</div>
<div class="body">
  <input type="text" id="mars-search-input" placeholder="Search for a place...">
  <div id="mars-search-results"></div>
</div>`;
        document.body.appendChild(searchPanel);

        // Close logic
        searchPanel.querySelector('#mars-search-close').addEventListener('click', () => searchPanel.style.display = 'none');

        // Drag logic
        const dragHandle = searchPanel.querySelector('.drag-handle');
        let isDragging = false, dragOriginX = 0, dragOriginY = 0, dragOffsetX = 0, dragOffsetY = 0, animationId = 0;

        function getTransformXY(el) {
            const computed = window.getComputedStyle(el).transform;
            if (computed && computed !== 'none') {
                const matrix = new DOMMatrix(computed);
                return [matrix.m41, matrix.m42];
            }
            return [0, 0];
        }

        function animate() {
            if (isDragging) {
                searchPanel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
                animationId = requestAnimationFrame(animate);
            }
        }

        function startDrag(clientX, clientY) {
            isDragging = true;
            searchPanel.classList.add('dragging');
            const rect = searchPanel.getBoundingClientRect();
            let [curX, curY] = getTransformXY(searchPanel);
            dragOriginX = clientX - rect.left;
            dragOriginY = clientY - rect.top;
            searchPanel.style.left = "0px";
            searchPanel.style.top = "0px";
            searchPanel.style.right = "auto";
            searchPanel.style.bottom = "auto";
            searchPanel.style.position = "fixed";
            if (curX === 0 && curY === 0) {
                dragOffsetX = rect.left;
                dragOffsetY = rect.top;
                searchPanel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
            } else {
                dragOffsetX = curX;
                dragOffsetY = curY;
            }
            document.body.style.userSelect = "none";
            if (animationId) cancelAnimationFrame(animationId);
            animate();
        }

        function stopDrag() {
            isDragging = false;
            if (animationId) cancelAnimationFrame(animationId);
            document.body.style.userSelect = "";
            searchPanel.classList.remove('dragging');
        }

        function doDrag(clientX, clientY) {
            if (!isDragging) return;
            dragOffsetX = clientX - dragOriginX;
            dragOffsetY = clientY - dragOriginY;
        }

        dragHandle.addEventListener("mousedown", function(e) {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });

        document.addEventListener("mousemove", function(e) {
            if (isDragging) doDrag(e.clientX, e.clientY);
        }, { passive: true });

        document.addEventListener("mouseup", stopDrag);

        dragHandle.addEventListener("touchstart", function(e) {
            const touch = e?.touches?.[0];
            if (touch) {
                startDrag(touch.clientX, touch.clientY);
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener("touchmove", function(e) {
            if (isDragging) {
                const touch = e?.touches?.[0];
                if (!touch) return;
                doDrag(touch.clientX, touch.clientY);
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener("touchend", stopDrag);
        document.addEventListener("touchcancel", stopDrag);

        // Search functionality
        const searchInput = searchPanel.querySelector('#mars-search-input');
        const resultsContainer = searchPanel.querySelector('#mars-search-results');

        function searchLocation(query) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
                    headers: {
                        'User-Agent': 'RedPlanet-Search-UserScript/1.0'
                    },
                    onload: function(response) {
                        try {
                            const data = JSON.parse(response.responseText);
                            resolve(data);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onerror: function(error) {
                        reject(error);
                    }
                });
            });
        }

        function navigateToLocation(lat, lon) {
            const zoom = 14.62;
            const url = `https://wplace.live/?lat=${lat}&lng=${lon}&zoom=${zoom}`;
            window.location.href = url;
        }

        function displayResults(results) {
            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="mars-no-results">No results found</div>';
                return;
            }

            resultsContainer.innerHTML = '';
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'mars-search-result';

                const displayName = result.display_name || 'Unknown location';
                const nameParts = displayName.split(',');
                const primaryName = nameParts[0];
                const address = nameParts.slice(1).join(',').trim();

                resultItem.innerHTML = `
                    <div class="mars-result-name">${primaryName}</div>
                    ${address ? `<div class="mars-result-address">${address}</div>` : ''}
                `;

                resultItem.addEventListener('click', () => {
                    navigateToLocation(result.lat, result.lon);
                    searchPanel.style.display = 'none';
                    searchInput.value = '';
                    resultsContainer.innerHTML = '';
                });

                resultsContainer.appendChild(resultItem);
            });
        }

        async function handleSearch() {
            const query = searchInput.value.trim();
            if (!query) return;

            resultsContainer.innerHTML = '<div class="mars-loading">Searching...</div>';

            try {
                const results = await searchLocation(query);
                displayResults(results);
            } catch (error) {
                console.error('Search error:', error);
                resultsContainer.innerHTML = '<div class="mars-no-results">Error searching. Please try again.</div>';
            }
        }

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(handleSearch, 500); // Debounce search
        });
    }

! function() {
        let t = !1,
            e = {};
        try {
            e = JSON.parse(GM_getValue("bmCoords", "{}")) || {}
        } catch (t) {
            e = {}
        }
        const n = () => {
            try {
                const t = Number(document.querySelector("#bm-v")?.value || ""),
                    e = Number(document.querySelector("#bm-w")?.value || ""),
                    n = {
                        Ht: t,
                        Yt: e,
                        px: Number(document.querySelector("#bm-x")?.value || ""),
                        zt: Number(document.querySelector("#bm-y")?.value || "")
                    };
                GM.setValue("bmCoords", JSON.stringify(n))
            } catch (t) {}
        };
        $.v({
            id: "bm-A",
            style: "top: 10px; right: 75px;"
        }).v({
            id: "bm-j"
        }).v({
            id: "bm-z"
        }).h().M({
            alt: "Blue Marble Icon - Click to minimize/maximize",
            src: "https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/favicon.png",
            style: "cursor: pointer;"
        }, (e, n) => {
            n.addEventListener("click", () => {
                t = !t;
                const i = document.querySelector("#bm-A"),
                    o = document.querySelector("#bm-j"),
                    r = document.querySelector("#bm-z"),
                    s = document.querySelector("#bm-k"),
                    a = document.querySelector("#bm-q"),
                    m = document.querySelector("#bm-r"),
                    l = document.querySelector("#bm-s"),
                    c = document.querySelector("#bm-l"),
                    u = document.querySelectorAll("#bm-k input");
                t || (i.style.width = "auto", i.style.maxWidth = "300px", i.style.minWidth = "200px", i.style.padding = "10px"), ["#bm-A h1", "#bm-f", "#bm-A hr", "#bm-c > *:not(#bm-k)", "#bm-a", "#bm-6", `#${e.i}`, "#bm-9"].forEach(e => {
                    document.querySelectorAll(e).forEach(e => {
                        e.style.display = t ? "none" : ""
                    })
                }), t ? (s && (s.style.display = "none"), a && (a.style.display = "none"), m && (m.style.display = "none"), l && (l.style.display = "none"), c && (c.style.display = "none"), u.forEach(t => {
                    t.style.display = "none"
                }), i.style.width = "60px", i.style.height = "76px", i.style.maxWidth = "60px", i.style.minWidth = "60px", i.style.padding = "8px", n.style.marginLeft = "3px", o.style.textAlign = "center", o.style.margin = "0", o.style.marginBottom = "0", r && (r.style.display = "", r.style.marginBottom = "0.25em")) : (s && (s.style.display = "", s.style.flexDirection = "", s.style.justifyContent = "", s.style.alignItems = "", s.style.gap = "", s.style.textAlign = "", s.style.margin = ""), a && (a.style.display = ""), m && (m.style.display = "", m.style.marginTop = ""), l && (l.style.display = "", l.style.marginTop = ""), c && (c.style.display = "", c.style.marginTop = ""), u.forEach(t => {
                    t.style.display = ""
                }), n.style.marginLeft = "", i.style.padding = "10px", o.style.textAlign = "", o.style.margin = "", o.style.marginBottom = "", r && (r.style.marginBottom = "0.5em"), i.style.width = "", i.style.height = ""), n.alt = t ? "Blue Marble Icon - Minimized (Click to maximize)" : "Blue Marble Icon - Maximized (Click to minimize)"
            })
        }).h().O(1, {
            textContent: w
        }).h().h().C().h().v({
            id: "bm-f"
        }).$({
            id: "bm-u",
            textContent: "Username:"
        }).h().$({
            id: "bm-p",
            textContent: "Droplets:"
        }).h().$({
            id: "bm-i",
            textContent: "Next level in..."
        }).h().h().C().h().v({
            id: "bm-c"
        }).v({
            id: "bm-k"
        }).k({
            id: "bm-q",
            className: "bm-D",
            style: "margin-top: 0;",
            innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 6"><circle cx="2" cy="2" r="2"></circle><path d="M2 6 L3.7 3 L0.3 3 Z"></path><circle cx="2" cy="2" r="0.7" fill="white"></circle></svg></svg>'
        }, (t, e) => {
            e.onclick = () => {
                const e = t.t?.Ut;
                e?.[0] ? (t.B("bm-v", e?.[0] || ""), t.B("bm-w", e?.[1] || ""), t.B("bm-x", e?.[2] || ""), t.B("bm-y", e?.[3] || ""), n()) : t.P("Coordinates are malformed! Did you try clicking on the canvas first?")
            }
        }).h().I({
            type: "number",
            id: "bm-v",
            placeholder: "Tl X",
            min: 0,
            max: 2047,
            step: 1,
            required: !0,
            value: e.Ht ?? ""
        }, (t, e) => {
            e.addEventListener("paste", t => {
                let e = (t.clipboardData || window.clipboardData).getData("text").split(" ").filter(t => t).map(Number).filter(t => !isNaN(t));
                if (4 !== e.length) return;
                let n = (i = document, coords = [], coords.push(i.querySelector("#bm-v")), coords.push(i.querySelector("#bm-w")), coords.push(i.querySelector("#bm-x")), coords.push(i.querySelector("#bm-y")), coords);
                var i;
                for (let t = 0; t < n.length; t++) n[t].value = e[t];
                t.preventDefault()
            });
            const i = () => n();
            e.addEventListener("input", i), e.addEventListener("change", i)
        }).h().I({
            type: "number",
            id: "bm-w",
            placeholder: "Tl Y",
            min: 0,
            max: 2047,
            step: 1,
            required: !0,
            value: e.Yt ?? ""
        }, (t, e) => {
            const i = () => n();
            e.addEventListener("input", i), e.addEventListener("change", i)
        }).h().I({
            type: "number",
            id: "bm-x",
            placeholder: "Px X",
            min: 0,
            max: 2047,
            step: 1,
            required: !0,
            value: e.px ?? ""
        }, (t, e) => {
            const i = () => n();
            e.addEventListener("input", i), e.addEventListener("change", i)
        }).h().I({
            type: "number",
            id: "bm-y",
            placeholder: "Px Y",
            min: 0,
            max: 2047,
            step: 1,
            required: !0,
            value: e.zt ?? ""
        }, (t, e) => {
            const i = () => n();
            e.addEventListener("input", i), e.addEventListener("change", i)
        }).h().h().v({
            id: "bm-9",
            style: "max-height: 140px; overflow: auto; border: 1px solid rgba(255,255,255,0.1); padding: 4px; border-radius: 4px; display: none;"
        }).v({
            style: "display: flex; gap: 6px; margin-bottom: 6px;"
        }).k({
            id: "bm-3",
            textContent: "Enable All"
        }, (t, e) => {
            e.onclick = () => {
                const e = S.rt[0];
                e?.X && (Object.values(e.X).forEach(t => t.enabled = !0), buildColorFilterList(), t._("Enabled all colors"))
            }
        }).h().k({
            id: "bm-0",
            textContent: "Disable All"
        }, (t, e) => {
            e.onclick = () => {
                const e = S.rt[0];
                e?.X && (Object.values(e.X).forEach(t => t.enabled = !1), buildColorFilterList(), t._("Disabled all colors"))
            }
        }).h().h().v({
            id: "bm-g"
        }).h().h().L({
            id: "bm-a",
            textContent: "Upload Template",
            accept: "image/png, image/jpeg, image/webp, image/bmp, image/gif"
        }).h().v({
            id: "bm-4"
        }).k({
            id: "bm-s",
            textContent: "Enable"
        }, (t, e) => {
            e.onclick = () => {
                t.t?.At?.Rt(!0), t._("Enabled templates!")
            }
        }).h().k({
            id: "bm-r",
            textContent: "Create"
        }, (t, e) => {
            e.onclick = () => {
                const e = document.querySelector("#bm-a"),
                    n = document.querySelector("#bm-v");
                if (!n.checkValidity()) return n.reportValidity(), void t.P("Coordinates are malformed! Did you try clicking on the canvas first?");
                const i = document.querySelector("#bm-w");
                if (!i.checkValidity()) return i.reportValidity(), void t.P("Coordinates are malformed! Did you try clicking on the canvas first?");
                const o = document.querySelector("#bm-x");
                if (!o.checkValidity()) return o.reportValidity(), void t.P("Coordinates are malformed! Did you try clicking on the canvas first?");
                const r = document.querySelector("#bm-y");
                if (!r.checkValidity()) return r.reportValidity(), void t.P("Coordinates are malformed! Did you try clicking on the canvas first?");
                e?.files[0] ? (S.Bt(e.files[0], e.files[0]?.name.replace(/\.[^/.]+$/, ""), [Number(n.value), Number(i.value), Number(o.value), Number(r.value)]), t._("Drew to canvas!")) : t.P("No file selected!")
            }
        }).h().k({
            id: "bm-l",
            textContent: "Disable"
        }, (t, e) => {
            e.onclick = () => {
                t.t?.At?.Rt(!1), t._("Disabled templates!")
            }
        }).h().h().G({
            id: $.i,
            placeholder: `Status: Sleeping...\nVersion: ${y}`,
            readOnly: !0
        }).h().v({
            id: "bm-6"
        }).v().k({
            id: "bm-m",
            className: "bm-D",
            innerHTML: "🎨",
            title: "Template Color Converter"
        }, (t, e) => {
            e.addEventListener("click", () => {
                window.open("https://pepoafonso.github.io/color_converter_wplace/", "_blank", "noopener noreferrer")
            })
        }).h().k({
            id: "bm-n",
            className: "bm-D",
            innerHTML: "🌐",
            title: "Official Blue Marble Website"
        }, (t, e) => {
            e.addEventListener("click", () => {
                window.open("https://bluemarble.camilledaguin.fr/", "_blank", "noopener noreferrer")
            })
        }).h().k({
            id: "bm-wrench",
            className: "bm-D",
            innerHTML: "🔧",
            title: "Open Color Keybind Configuration"
        }, (t, e) => {
            e.addEventListener("click", () => {
                // Open the Mars keybind panel directly
                const panel = document.getElementById('mars-keybinder-draggable');
                if (panel) {
                    // Scan for swatches and render rows
                    if (window.scanSwatches) window.scanSwatches();
                    if (window._mars_keybinder_renderRows) window._mars_keybinder_renderRows();
                    panel.style.display = panel.style.display === 'none' || !panel.style.display ? 'flex' : 'none';
                }
            })
        }).h().k({
            id: "bm-search",
            className: "bm-D",
            innerHTML: "🔍",
            title: "Open Location Search"
        }, (t, e) => {
            e.addEventListener("click", () => {
                const searchPanel = document.getElementById('mars-search-draggable');
                if (searchPanel) {
                    searchPanel.style.display = searchPanel.style.display === 'none' || !searchPanel.style.display ? 'flex' : 'none';
                }
            })
        }).h().h().S({
            textContent: "Made by SwingTheVine, Pixel",
            style: "margin-top: auto;"
        }).h().h().h().p(document.body), window.buildColorFilterList = function() {
            const t = document.querySelector("#bm-g"),
                e = S.rt?.[0];
            if (!t || !e?.X) return void(t && (t.innerHTML = "<small>No template colors to display.</small>"));
            t.innerHTML = "";
            const n = Object.entries(e.X).sort((t, e) => e[1].count - t[1].count);
            for (const [e, i] of n) {
                const [n, o, r] = e.split(",").map(Number), s = document.createElement("div");
                s.style.display = "flex", s.style.alignItems = "center", s.style.gap = "8px", s.style.margin = "4px 0";
                const a = document.createElement("div");
                a.style.width = "14px", a.style.height = "14px", a.style.border = "1px solid rgba(255,255,255,0.5)", a.style.background = `rgb(${n},${o},${r})`;
                const m = document.createElement("span");
                m.style.fontSize = "12px";
                let l = `${i.count.toLocaleString()}`;
                try {
                    const t = S.rt?.[0]?.K?.get(e);
                    if (t && "number" == typeof t.id) {
                        const e = t?.name || `rgb(${n},${o},${r})`,
                            i = t.premium ? "★ " : "";
                        l = `#${t.id} ${i}${e} • ${l}`
                    }
                } catch (t) {}
                m.textContent = l;
                const c = document.createElement("input");
                c.type = "checkbox", c.checked = !!i.enabled, c.addEventListener("change", () => {
                    i.enabled = c.checked, $._(`${c.checked?"Enabled":"Disabled"} ${e}`);
                    try {
                        const t = S.rt?.[0],
                            e = t?.H;
                        t && e && S.it?.templates?.[e] && (S.it.templates[e].palette = t.X, GM.setValue("bmTemplates", JSON.stringify(S.it)))
                    } catch (t) {}
                }), s.appendChild(c), s.appendChild(a), s.appendChild(m), t.appendChild(s)
            }
        }, window.addEventListener("message", t => {
            if ("bm-b" === t?.data?.st) try {
                buildColorFilterList()
            } catch (t) {}
        }), setTimeout(() => {
            try {
                if (S.rt?.length > 0) {
                    const t = document.querySelector("#bm-9");
                    t && (t.style.display = ""), buildColorFilterList()
                }
            } catch (t) {}
        }, 0)
    }(), $.W("#bm-A", "#bm-z"), M.Xt($),

    // Initialize search window
    createSearchWindow();

    new MutationObserver((t, e) => {
            const n = document.querySelector("#color-1");
            if (!n) return;
            let i = document.querySelector("#bm-t");
            if (!i) {
                i = document.createElement("button"), i.id = "bm-t", i.textContent = "Move ↑", i.className = "btn btn-soft", i.onclick = function() {
                    const t = this.parentNode.parentNode.parentNode.parentNode,
                        e = "Move ↑" == this.textContent;
                    t.parentNode.className = t.parentNode.className.replace(e ? "bottom" : "top", e ? "top" : "bottom"), t.style.borderTopLeftRadius = e ? "0px" : "var(--radius-box)", t.style.borderTopRightRadius = e ? "0px" : "var(--radius-box)", t.style.borderBottomLeftRadius = e ? "var(--radius-box)" : "0px", t.style.borderBottomRightRadius = e ? "var(--radius-box)" : "0px", this.textContent = e ? "Move ↓" : "Move ↑"
                };
                const t = n.parentNode.parentNode.parentNode.parentNode.querySelector("h2");
                t.parentNode?.appendChild(i)
            }
        }).observe(document.body, {
            childList: !0,
            subtree: !0
        }),
        function(...t) {
            (0, console.log)(...t)
        }(`%c${w}%c (${y}) userscript has loaded!`, "color: cornflowerblue;", "");

// Mars Keybind System
(function() {
  'use strict';

  const STORAGE_KEY = 'wplace.manualHotkeys';
  const SWATCH_SELECTOR = 'button[id^="color-"][aria-label]';
  const PANEL_Z = 2147483647;

  let keyMap = {};
  let swatches = [];

  // --- Mars window CSS
  function marsCSS() {
    const css = `
#mars-keybinder-draggable {
  position: fixed; right: 75px; top: 260px; z-index: ${PANEL_Z};
  width: min(490px,92vw); max-height: 72vh;
  background: #3c1e24; color: #fff; border-radius: 10px;
  box-shadow: 0 8px 32px #2a1113cc;
  font: 14px/1.4 Roboto Mono, monospace, Arial;
  display: none;
  border: none;
  flex-direction: column;
  min-width: 320px;
  will-change: transform;
}
#mars-keybinder-draggable .drag-handle {
  margin-bottom: 0.5em;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="3" cy="3" r="1.5" fill="indianred" /></svg>') repeat;
  cursor: grab;
  width: 100%;
  height: 1.2em;
  border-radius: 4px 4px 0 0;
}
#mars-keybinder-draggable.dragging .drag-handle {
  cursor: grabbing;
}
#mars-keybinder-draggable .hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px 0 14px; /* no bottom padding, handled by drag handle */
}
#mars-keybinder-draggable .hdr h3 {
  margin: 0; font-size: 17px; font-weight: 700; letter-spacing: 0.07em;
  display: flex; align-items: center; gap: 0.5em;
}
#mars-keybinder-draggable .hdr .actions {
  display: flex; gap: 10px;
}
#mars-keybinder-draggable .hdr button {
  border: none; padding: 6px 10px; border-radius: 7px;
  background: #a23a2b; color: #fff; font: 14px monospace;
  cursor: pointer;
  transition: background 0.18s;
}
#mars-keybinder-draggable .hdr button:hover { background: #d85c38; }
#mars-keybinder-draggable .hdr button:active { background: #c14429; }
#mars-keybinder-draggable .body {
  padding: 10px 14px; overflow: auto; max-height: calc(72vh - 56px);
}
#mars-keybinder-list {
  width: 100%; border-collapse: collapse;
  margin-bottom: 4px;
}
#mars-keybinder-list th, #mars-keybinder-list td {
  padding: 7px 7px; border-bottom: 1px solid #5e2d2a;
  vertical-align: middle;
}
#mars-keybinder-list th {
  background: #3c1e24; z-index: 1; position: sticky; top: 0;
  color: #e4bfbf; font-size: 13px;
}
.mars-swatch {
  width: 24px; height: 24px; border-radius: 6px;
  border: 1px solid #e4bfbf60; box-sizing: border-box;
}
.mars-name { opacity: .88;}
.mars-keybox {
  width: 130px; padding: 6px 8px; border-radius: 6px;
  border: 1px solid #a23a2b; background: #5e2d2a;
  color: #fff; font: 14px monospace;
}
.mars-keybox:focus { outline: 1px solid #d85c38;}
.mars-mini { font-size: 11px; opacity: .8; color: #e4bfbf;}
.mars-icon {
  display: inline-block; height: 2em; margin-right: 1ch; vertical-align: middle;
}
`;
    const tag = document.createElement('style');
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  function loadMap() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveMap() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(keyMap)); } catch {} }

  function normKey(e) {
    if(['Shift','Control','Alt','Meta'].includes(e.key)) return '';
    let mods=[];
    if(e.ctrlKey) mods.push('ctrl');
    if(e.altKey) mods.push('alt');
    if(e.shiftKey) mods.push('shift');
    let k=e.key.toLowerCase();
    if(k===' ') k='space';
    if(k==='escape') k='esc';
    return [...mods.sort(),k].join('+');
  }

  function isTyping(el){
    if(!el) return false;
    if(el.closest('#mars-keybinder-draggable')) return true; // typing in panel
    if(el.closest('#mars-search-draggable')) return true; // typing in search panel
    const t = el.tagName?.toLowerCase();
    return t==='input'||t==='textarea'||el.isContentEditable;
  }

  function clickColor(el){
    if(!el) return;
    el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
  }

  function scanSwatches(){
    swatches = Array.from(document.querySelectorAll(SWATCH_SELECTOR))
      .filter(el=>el && el.offsetParent && el.getBoundingClientRect().width>0);
  }

  function onKeyDown(e){
    if(e.repeat) return;
    if(isTyping(document.activeElement)) return;
    const key = normKey(e);
    if(!key) return;
    const id = keyMap[key];
    if(!id) return;
    const el = document.getElementById(id);
    clickColor(el);
    e.preventDefault();
    e.stopPropagation();
  }

  function onMouseDown(e){
    if(isTyping(document.activeElement)) return;
    if(e.button === 0 || e.button === 2) return; // ignore left/right
    let btn = '';
    if(e.button === 3) btn = 'mouse4';
    if(e.button === 4) btn = 'mouse5';
    if(!btn) return;
    const id = keyMap[btn];
    if(!id) return;
    const el = document.getElementById(id);
    clickColor(el);
    e.preventDefault();
    e.stopPropagation();
  }

  function colorOf(el){
    const st=getComputedStyle(el);
    const inline=el.getAttribute('style');
    if(inline && /background\s*:\s*[^;]+/.test(inline)){
      const m=inline.match(/background\s*:\s*([^;]+)/i);
      if(m) return m[1].trim();
    }
    return st.backgroundColor||'#000';
  }

  function buildDraggablePanel(){
    // Draggable panel
    const panel = document.createElement('div');
    panel.id = 'mars-keybinder-draggable';
    panel.innerHTML = `
<div class="drag-handle"></div>
<div class="hdr">
  <h3>
    <img class="mars-icon" src="https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/favicon.png" alt="Mars">
    Hotkey Manager
  </h3>
  <div class="actions">
    <button id="mars-keybinder-clear">Clear</button>
    <button id="mars-keybinder-close">Close</button>
  </div>
</div>
<div class="body">
  <table id="mars-keybinder-list">
    <thead>
      <tr>
        <th>Color</th>
        <th>Name</th>
        <th>Shortcut</th>
        <th class="mars-mini">Test</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <div class="mars-mini" style="margin-top:6px;">
    Tip: assign keys freely; clicks on locked colors will just fail safely.
  </div>
</div>`;
    document.body.appendChild(panel);

    // Close logic
    panel.querySelector('#mars-keybinder-close').addEventListener('click', ()=>panel.style.display='none');
    panel.querySelector('#mars-keybinder-clear').addEventListener('click', ()=>{
      keyMap={};
      saveMap();
      renderRows();
    });

    // Drag logic
    const dragHandle = panel.querySelector('.drag-handle');
    let isDragging = false, dragOriginX = 0, dragOriginY = 0, dragOffsetX = 0, dragOffsetY = 0, animationId = 0;
    function getTransformXY(el) {
      const computed = window.getComputedStyle(el).transform;
      if (computed && computed !== 'none') {
        const matrix = new DOMMatrix(computed);
        return [matrix.m41, matrix.m42];
      }
      return [0, 0];
    }
    function animate() {
      if (isDragging) {
        panel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
        animationId = requestAnimationFrame(animate);
      }
    }
    function startDrag(clientX, clientY) {
      isDragging = true;
      panel.classList.add('dragging');
      const rect = panel.getBoundingClientRect();
      let [curX, curY] = getTransformXY(panel);
      dragOriginX = clientX - rect.left;
      dragOriginY = clientY - rect.top;
      panel.style.left = "0px";
      panel.style.top = "0px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.position = "fixed";
      if (curX === 0 && curY === 0) {
        dragOffsetX = rect.left;
        dragOffsetY = rect.top;
        panel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
      } else {
        dragOffsetX = curX;
        dragOffsetY = curY;
      }
      document.body.style.userSelect = "none";
      if (animationId) cancelAnimationFrame(animationId);
      animate();
    }
    function stopDrag() {
      isDragging = false;
      if (animationId) cancelAnimationFrame(animationId);
      document.body.style.userSelect = "";
      panel.classList.remove('dragging');
    }
    function doDrag(clientX, clientY) {
      if (!isDragging) return;
      dragOffsetX = clientX - dragOriginX;
      dragOffsetY = clientY - dragOriginY;
    }
    dragHandle.addEventListener("mousedown", function(e) {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });
    document.addEventListener("mousemove", function(e) {
      if (isDragging) doDrag(e.clientX, e.clientY);
    }, { passive: true });
    document.addEventListener("mouseup", stopDrag);
    dragHandle.addEventListener("touchstart", function(e) {
      const touch = e?.touches?.[0];
      if (touch) {
        startDrag(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    }, { passive: false });
    document.addEventListener("touchmove", function(e) {
      if (isDragging) {
        const touch = e?.touches?.[0];
        if (!touch) return;
        doDrag(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    }, { passive: false });
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchcancel", stopDrag);

    // Table logic
    function assignKeyToColor(keyOrBtn, colorId, input) {
      // Remove previous key or previous color mapping
      for (const [k,v] of Object.entries({...keyMap})) {
        if(k === keyOrBtn || v === colorId) delete keyMap[k];
      }
      keyMap[keyOrBtn] = colorId;
      saveMap();

      // Update current input
      input.value = keyOrBtn;

      // Live clear other inputs using the same key
      const tbody = document.querySelector('#mars-keybinder-list tbody');
      if(tbody) {
        const otherInputs = Array.from(tbody.querySelectorAll('.mars-keybox'))
          .filter(inp => inp !== input && inp.value === keyOrBtn);
        otherInputs.forEach(inp => inp.value = '');
      }
    }

    function renderRows(){
      const tbody = panel.querySelector('#mars-keybinder-list tbody');
      tbody.innerHTML='';
      const rev = new Map();
      for(const [k,v] of Object.entries(keyMap)) rev.set(v,k);

      for(const el of swatches){
        const id = el.id;
        const name = el.getAttribute('aria-label')||id;
        const bg = colorOf(el);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><div class="mars-swatch" style="background:${bg}"></div></td>
<td class="mars-name">${name}</td>
<td><input class="mars-keybox" type="text" value="${rev.get(id)||''}" placeholder="press a key or mouse button"></td>
<td><button class="mars-mini" data-test="${id}">Click</button></td>`;
        const input = tr.querySelector('.mars-keybox');

        input.addEventListener('keydown', e=>{
          e.preventDefault(); e.stopPropagation();
          const nk = normKey(e);
          if(!nk) return;
          assignKeyToColor(nk, id, input);
        });

        input.addEventListener('mousedown', e=>{
          if(e.button === 0 || e.button === 2) return;
          let btn = '';
          if(e.button === 3) btn = 'mouse4';
          if(e.button === 4) btn = 'mouse5';
          if(!btn) return;
          assignKeyToColor(btn, id, input);
          e.preventDefault();
          e.stopPropagation();
        });

        tr.querySelector('button[data-test]').addEventListener('click', ()=>clickColor(el));
        tbody.appendChild(tr);
      }
    }
    buildDraggablePanel.renderRows = renderRows;
    // Expose for MutationObserver
    window._mars_keybinder_renderRows = renderRows;
  }

  function init(){
    keyMap = loadMap();
    marsCSS();
    buildDraggablePanel();
    scanSwatches();
    // Expose scanSwatches globally
    window.scanSwatches = scanSwatches;
    window.addEventListener('keydown', onKeyDown,{capture:true});
    window.addEventListener('mousedown', onMouseDown,{capture:true});
    const mo = new MutationObserver(()=>{
      const oldCount = swatches.length;
      scanSwatches();
      if(swatches.length!==oldCount) window._mars_keybinder_renderRows?.();
    });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
(function() {
  const calcCSS = `
#pixel-regen-calc-modal {
  position: fixed; right: 120px; top: 120px; z-index: 2147483647;
  min-width: 300px; max-width: 90vw; background: #3c1e24; color: #fff;
  border-radius: 9px; box-shadow: 0 8px 32px #2a1113cc; font: 14px/1.5 Roboto Mono, monospace;
  border: none; padding: 0; display: none; flex-direction: column;
  will-change: transform;
}
#pixel-regen-calc-modal .drag-handle {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="3" cy="3" r="1.5" fill="indianred" /></svg>') repeat;
  cursor: grab; width: 100%; height: 1.2em; border-radius: 9px 9px 0 0;
  margin-bottom: 0.5em;
}
#pixel-regen-calc-modal.dragging .drag-handle { cursor: grabbing; }
#pixel-regen-calc-modal .body { padding: 16px 18px 18px 18px; }
#pixel-regen-calc-modal h3 { margin: 0 0 14px 0; font-size: 17px; }
#pixel-regen-calc-modal input[type="number"] {
  width: 90px; padding: 6px 8px; border-radius: 6px;
  border: 1px solid #a23a2b; background: #5e2d2a;
  color: #fff; font: 15px monospace; margin-right: 12px;
}
#pixel-regen-calc-modal input[type="number"]:focus { outline: 1px solid #d85c38;}
#pixel-regen-calc-modal .results { margin-top: 10px; color: #e4bfbf; }
#pixel-regen-calc-modal .actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 12px;}
#pixel-regen-calc-modal button {
  border: none; padding: 6px 14px; border-radius: 7px;
  background: #a23a2b; color: #fff; font: 14px monospace; cursor: pointer;
  transition: background 0.18s;
}
#pixel-regen-calc-modal button:hover { background: #d85c38; }
#pixel-regen-calc-modal button:active { background: #c14429; }
`;
  const styleTag = document.createElement('style');
  styleTag.textContent = calcCSS;
  document.head.appendChild(styleTag);

  const modal = document.createElement('div');
  modal.id = 'pixel-regen-calc-modal';
  modal.innerHTML = `
<div class="drag-handle"></div>
<div class="body">
  <h3>Pixel Regen Calculator</h3>
  <label>
    Pixels to regain:
    <input type="number" id="pixel-regen-calc-input" min="1" max="10000" step="1" value="100">
  </label>
  <div style="margin: 8px 0 4px 0; display: flex; align-items: center; gap: 8px;">
    <input type="checkbox" id="pixel-regen-calc-flag">
    <label for="pixel-regen-calc-flag">Have a flag.</label>
  </div>
  <div class="results" id="pixel-regen-calc-results"></div>
  <div class="actions">
    <button id="pixel-regen-calc-close">Close</button>
  </div>
</div>`;
  document.body.appendChild(modal);

  function showResults(pixels, hasFlag) {
    pixels = Number(pixels) || 0;
    if (pixels < 1) pixels = 1;

    let instant = 0, regen = pixels, remain = pixels;
    if (hasFlag) {
      instant = Math.floor(pixels * 0.10);
      remain = pixels - instant;
      regen = remain;
    }

    const seconds = Math.max(0, regen * 30);
    const rMins = (seconds/60).toFixed(2);
    const rHrs = (seconds/3600).toFixed(2);
    const rDays = (seconds/86400).toFixed(4);

    const now = new Date();
    const completionDate = new Date(now.getTime() + (seconds * 1000));

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const dateOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };

    const completionTime = completionDate.toLocaleTimeString('en-US', timeOptions);
    const completionDateStr = completionDate.toLocaleDateString('en-US', dateOptions);
    const isToday = completionDate.toDateString() === now.toDateString();

    let html = '';
    if (hasFlag) {
      html += `<div>
        <b>Flag returnal pixels:</b> <span style="color:#ffe082">${instant.toLocaleString()}</span> pixel${instant!==1?'s':''}<br>
        <b>Remaining pixels spent:</b> ${remain.toLocaleString()} pixel${remain!==1?'s':''}.
      </div>`;
    }

    html += `
      <div style="margin-top:7px;">
        <b>Time needed:</b><br>
        <span>${rMins} minutes<br>
        ${rHrs} hours<br>
        ${rDays} days</span>
      </div>
      <div style="margin-top:10px; padding-top:10px; border-top:1px solid #5e2d2a;">
        <b>Completion time:</b><br>
        <span style="color:#ffe082">${completionTime}</span>
        ${isToday ? '' : `<br><span style="font-size:12px;">${completionDateStr}</span>`}
      </div>`;

    document.getElementById('pixel-regen-calc-results').innerHTML = html;
  }

  const inputEl = modal.querySelector('#pixel-regen-calc-input');
  const flagEl = modal.querySelector('#pixel-regen-calc-flag');
  function updateCalc() {
    let pixels = Number(inputEl.value);
    if (!pixels || pixels < 1) pixels = 1;
    showResults(pixels, flagEl && flagEl.checked);
  }
  inputEl.addEventListener('input', updateCalc);
  if(flagEl) flagEl.addEventListener('change', updateCalc);

  modal.querySelector('#pixel-regen-calc-close').onclick = ()=> { modal.style.display='none'; };
  function openCalc() {
    modal.style.display = 'flex';
    inputEl.focus();
  }

  function addButton() {
    let refBtn = document.querySelector('#bm-search') || document.querySelector('#bm-wrench');
    if (!refBtn) return setTimeout(addButton, 500);
    let parent = refBtn.parentElement;
    if (!parent || document.getElementById('bm-regen-calc')) return;

    const btn = document.createElement('button');
    btn.id = 'bm-regen-calc';
    btn.className = "bm-D";
    btn.title = "Open Pixel Regen Calculator";
    btn.style.marginLeft = "2px";
    btn.innerHTML = "⏳";
    btn.addEventListener('click', openCalc);
    parent.insertBefore(btn, refBtn.nextSibling);
  }
  setTimeout(addButton, 800);

  const dragHandle = modal.querySelector('.drag-handle');
  let isDragging = false, dragOriginX = 0, dragOriginY = 0, dragOffsetX = 0, dragOffsetY = 0, animationId = 0;
  function getTransformXY(el) {
    const computed = window.getComputedStyle(el).transform;
    if (computed && computed !== 'none') {
      const matrix = new DOMMatrix(computed);
      return [matrix.m41, matrix.m42];
    }
    return [0, 0];
  }
  function animate() {
    if (isDragging) {
      modal.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
      animationId = requestAnimationFrame(animate);
    }
  }
  function startDrag(clientX, clientY) {
    isDragging = true;
    modal.classList.add('dragging');
    const rect = modal.getBoundingClientRect();
    let [curX, curY] = getTransformXY(modal);
    dragOriginX = clientX - rect.left;
    dragOriginY = clientY - rect.top;
    modal.style.left = "0px";
    modal.style.top = "0px";
    modal.style.right = "auto";
    modal.style.bottom = "auto";
    modal.style.position = "fixed";
    if (curX === 0 && curY === 0) {
      dragOffsetX = rect.left;
      dragOffsetY = rect.top;
      modal.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
    } else {
      dragOffsetX = curX;
      dragOffsetY = curY;
    }
    document.body.style.userSelect = "none";
    if (animationId) cancelAnimationFrame(animationId);
    animate();
  }
  function stopDrag() {
    isDragging = false;
    if (animationId) cancelAnimationFrame(animationId);
    document.body.style.userSelect = "";
    modal.classList.remove('dragging');
  }
  function doDrag(clientX, clientY) {
    if (!isDragging) return;
    dragOffsetX = clientX - dragOriginX;
    dragOffsetY = clientY - dragOriginY;
  }
  dragHandle.addEventListener("mousedown", function(e) {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });
  document.addEventListener("mousemove", function(e) {
    if (isDragging) doDrag(e.clientX, e.clientY);
  }, { passive: true });
  document.addEventListener("mouseup", stopDrag);
  dragHandle.addEventListener("touchstart", function(e) {
    const touch = e?.touches?.[0];
    if (touch) {
      startDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    }
  }, { passive: false });
  document.addEventListener("touchmove", function(e) {
    if (isDragging) {
      const touch = e?.touches?.[0];
      if (!touch) return;
      doDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    }
  }, { passive: false });
  document.addEventListener("touchend", stopDrag);
  document.addEventListener("touchcancel", stopDrag);
})();
class DraggableWindow {
  constructor(options = {}) {
    this.id = options.id || `draggable-window-${Date.now()}`;
    this.title = options.title || 'Window';
    this.iconUrl = options.iconUrl || 'https://raw.githubusercontent.com/pixelkat5/Wplace-Red-planet/refs/heads/main/dist/favicon.png';
    this.width = options.width || 'min(420px, 90vw)';
    this.position = options.position || { right: '75px', top: '440px' };
    this.zIndex = options.zIndex || 2147483646;
    this.onClose = options.onClose || (() => {});

    this.panel = null;
    this.bodyElement = null;
    this.isDragging = false;

    this.createWindow();
    this.setupDragging();
  }

  createWindow() {
    this.panel = document.createElement('div');
    this.panel.id = this.id;
    this.panel.style.cssText = `
      position: fixed;
      right: ${this.position.right};
      top: ${this.position.top};
      z-index: ${this.zIndex};
      width: ${this.width};
      max-height: 72vh;
      background: #3c1e24;
      color: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 32px #2a1113cc;
      font: 14px/1.4 Roboto Mono, monospace, Arial;
      display: none;
      flex-direction: column;
      min-width: 300px;
      will-change: transform;
    `;

    this.panel.innerHTML = `
      <div class="drag-handle" style="
        margin-bottom: 0.5em;
        background: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;5&quot; height=&quot;5&quot;><circle cx=&quot;3&quot; cy=&quot;3&quot; r=&quot;1.5&quot; fill=&quot;indianred&quot; /></svg>') repeat;
        cursor: grab;
        width: 100%;
        height: 1.2em;
        border-radius: 4px 4px 0 0;
      "></div>
      <div class="hdr" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px 0 14px;
      ">
        <h3 style="
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.07em;
          display: flex;
          align-items: center;
          gap: 0.5em;
        ">
          <img src="${this.iconUrl}" alt="Icon" style="
            display: inline-block;
            height: 2em;
            vertical-align: middle;
          ">
          ${this.title}
        </h3>
        <div class="actions" style="display: flex; gap: 10px;">
          <button class="close-btn" style="
            border: none;
            padding: 6px 10px;
            border-radius: 7px;
            background: #a23a2b;
            color: #fff;
            font: 14px monospace;
            cursor: pointer;
            transition: background 0.18s;
          ">Close</button>
        </div>
      </div>
      <div class="body" style="padding: 10px 14px; overflow: auto; max-height: calc(72vh - 56px);"></div>
    `;

    document.body.appendChild(this.panel);
    this.bodyElement = this.panel.querySelector('.body');

    this.panel.querySelector('.close-btn').addEventListener('click', () => this.hide());

    const btns = this.panel.querySelectorAll('button');
    btns.forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.background = '#d85c38');
      btn.addEventListener('mouseleave', () => btn.style.background = '#a23a2b');
      btn.addEventListener('mousedown', () => btn.style.background = '#c14429');
      btn.addEventListener('mouseup', () => btn.style.background = '#d85c38');
    });
  }

  setupDragging() {
    const dragHandle = this.panel.querySelector('.drag-handle');
    let dragOriginX = 0, dragOriginY = 0, dragOffsetX = 0, dragOffsetY = 0, animationId = 0;

    const getTransformXY = (el) => {
      const computed = window.getComputedStyle(el).transform;
      if (computed && computed !== 'none') {
        const matrix = new DOMMatrix(computed);
        return [matrix.m41, matrix.m42];
      }
      return [0, 0];
    };

    const animate = () => {
      if (this.isDragging) {
        this.panel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
        animationId = requestAnimationFrame(animate);
      }
    };

    const startDrag = (clientX, clientY) => {
      this.isDragging = true;
      this.panel.classList.add('dragging');
      dragHandle.style.cursor = 'grabbing';

      const rect = this.panel.getBoundingClientRect();
      let [curX, curY] = getTransformXY(this.panel);
      dragOriginX = clientX - rect.left;
      dragOriginY = clientY - rect.top;

      this.panel.style.left = "0px";
      this.panel.style.top = "0px";
      this.panel.style.right = "auto";
      this.panel.style.bottom = "auto";
      this.panel.style.position = "fixed";

      if (curX === 0 && curY === 0) {
        dragOffsetX = rect.left;
        dragOffsetY = rect.top;
        this.panel.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
      } else {
        dragOffsetX = curX;
        dragOffsetY = curY;
      }

      document.body.style.userSelect = "none";
      if (animationId) cancelAnimationFrame(animationId);
      animate();
    };

    const stopDrag = () => {
      this.isDragging = false;
      if (animationId) cancelAnimationFrame(animationId);
      document.body.style.userSelect = "";
      this.panel.classList.remove('dragging');
      dragHandle.style.cursor = 'grab';
    };

    const doDrag = (clientX, clientY) => {
      if (!this.isDragging) return;
      dragOffsetX = clientX - dragOriginX;
      dragOffsetY = clientY - dragOriginY;
    };

    dragHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => {
      if (this.isDragging) doDrag(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener("mouseup", stopDrag);

    dragHandle.addEventListener("touchstart", (e) => {
      const touch = e?.touches?.[0];
      if (touch) {
        startDrag(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
      if (this.isDragging) {
        const touch = e?.touches?.[0];
        if (!touch) return;
        doDrag(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchcancel", stopDrag);
  }

  setContent(html) {
    this.bodyElement.innerHTML = html;
  }

  appendContent(element) {
    this.bodyElement.appendChild(element);
  }

  show() {
    this.panel.style.display = 'flex';
  }

  hide() {
    this.panel.style.display = 'none';
    this.onClose();
  }

  toggle() {
    this.panel.style.display = this.panel.style.display === 'none' ? 'flex' : 'none';
  }
}

// ============================================
// Region Downloader
// ============================================

class RegionDownloader {
  constructor() {
    this.TILE_SIZE = 1000;
    this.window = new DraggableWindow({
      id: 'region-downloader-window',
      title: 'Region Downloader',
      position: { right: '75px', top: '580px' }
    });

    this.setupUI();
  }

  setupUI() {
    this.window.setContent(`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <label style="display: block; margin-bottom: 4px; color: #e4bfbf; font-size: 13px;">
            Input Format:
          </label>
          <select id="rd-format" style="
            width: 100%;
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #a23a2b;
            background: #5e2d2a;
            color: #fff;
            font: 14px monospace;
          ">
            <option value="tile">Tile Coordinates</option>
            <option value="pixel">Absolute Pixel Coordinates</option>
            <option value="link">Share Links (lat/lng)</option>
          </select>
        </div>

        <div id="rd-inputs"></div>

        <div style="display: flex; gap: 8px;">
          <button id="rd-calculate" style="
            flex: 1;
            border: none;
            padding: 8px;
            border-radius: 7px;
            background: #a23a2b;
            color: #fff;
            font: 14px monospace;
            cursor: pointer;
            transition: background 0.18s;
          ">Calculate</button>
          <button id="rd-download" style="
            flex: 1;
            border: none;
            padding: 8px;
            border-radius: 7px;
            background: #a23a2b;
            color: #fff;
            font: 14px monospace;
            cursor: pointer;
            transition: background 0.18s;
          " disabled>Download</button>
        </div>

        <div id="rd-status" style="
          color: #e4bfbf;
          font-size: 12px;
          min-height: 40px;
          padding: 8px;
          background: #5e2d2a;
          border-radius: 6px;
          border: 1px solid #a23a2b;
        ">Ready to calculate region...</div>
      </div>
    `);

    const formatSelect = this.window.panel.querySelector('#rd-format');
    const inputsDiv = this.window.panel.querySelector('#rd-inputs');
    const calcBtn = this.window.panel.querySelector('#rd-calculate');
    const dlBtn = this.window.panel.querySelector('#rd-download');

    [calcBtn, dlBtn].forEach(btn => {
      btn.addEventListener('mouseenter', () => { if (!btn.disabled) btn.style.background = '#d85c38'; });
      btn.addEventListener('mouseleave', () => btn.style.background = '#a23a2b');
    });

    formatSelect.addEventListener('change', () => this.updateInputFields());
    calcBtn.addEventListener('click', () => this.calculate());
    dlBtn.addEventListener('click', () => this.download());

    this.updateInputFields();
  }

  updateInputFields() {
    const format = this.window.panel.querySelector('#rd-format').value;
    const inputsDiv = this.window.panel.querySelector('#rd-inputs');

    const inputStyle = `
      width: 100%;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid #a23a2b;
      background: #5e2d2a;
      color: #fff;
      font: 14px monospace;
      margin-top: 4px;
    `;

    if (format === 'tile') {
      inputsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Tile X</label>
            <input type="number" id="rd-tile-x1" style="${inputStyle}" placeholder="0-2047">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Tile Y</label>
            <input type="number" id="rd-tile-y1" style="${inputStyle}" placeholder="0-137">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Px X</label>
            <input type="number" id="rd-px-x1" style="${inputStyle}" placeholder="0-999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Px Y</label>
            <input type="number" id="rd-px-y1" style="${inputStyle}" placeholder="0-999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Tile X</label>
            <input type="number" id="rd-tile-x2" style="${inputStyle}" placeholder="0-2047">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Tile Y</label>
            <input type="number" id="rd-tile-y2" style="${inputStyle}" placeholder="0-137">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Px X</label>
            <input type="number" id="rd-px-x2" style="${inputStyle}" placeholder="0-999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Px Y</label>
            <input type="number" id="rd-px-y2" style="${inputStyle}" placeholder="0-999">
          </div>
        </div>
      `;
    } else if (format === 'pixel') {
      inputsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Pixel X</label>
            <input type="number" id="rd-abs-x1" style="${inputStyle}" placeholder="0-2047999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">Start Pixel Y</label>
            <input type="number" id="rd-abs-y1" style="${inputStyle}" placeholder="0-137999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Pixel X</label>
            <input type="number" id="rd-abs-x2" style="${inputStyle}" placeholder="0-2047999">
          </div>
          <div>
            <label style="color: #e4bfbf; font-size: 12px;">End Pixel Y</label>
            <input type="number" id="rd-abs-y2" style="${inputStyle}" placeholder="0-137999">
          </div>
        </div>
      `;
    } else if (format === 'link') {
      inputsDiv.innerHTML = `
        <div>
          <label style="color: #e4bfbf; font-size: 12px;">Start Position Link</label>
          <input type="text" id="rd-link1" style="${inputStyle}" placeholder="https://wplace.live/?lat=...&lng=...">
        </div>
        <div style="margin-top: 8px;">
          <label style="color: #e4bfbf; font-size: 12px;">End Position Link</label>
          <input type="text" id="rd-link2" style="${inputStyle}" placeholder="https://wplace.live/?lat=...&lng=...">
        </div>
      `;
    }
  }

  parseShareLink(url) {
    const match = url.match(/lat=([-\d.]+)&lng=([-\d.]+)/);
    if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    return null;
  }

  latlonToPixel(lat, lng) {
    const ref1_lat = 42.526335232105254;
    const ref1_lng = -86.59168978447266;
    const ref1_pixel_x = 531 * 1000 + 389;
    const ref1_pixel_y = 756 * 1000 + 206;

    const ref2_lat = 42.507418808693245;
    const ref2_lng = -86.56584994072264;
    const ref2_pixel_x = 531 * 1000 + 536;
    const ref2_pixel_y = 756 * 1000 + 352;

    const pixels_per_lng = (ref2_pixel_x - ref1_pixel_x) / (ref2_lng - ref1_lng);
    const pixels_per_lat = (ref2_pixel_y - ref1_pixel_y) / (ref2_lat - ref1_lat);

    const pixel_x = Math.round(ref1_pixel_x + (lng - ref1_lng) * pixels_per_lng);
    const pixel_y = Math.round(ref1_pixel_y + (lat - ref1_lat) * pixels_per_lat);

    return { x: pixel_x, y: pixel_y };
  }

  calculate() {
    const format = this.window.panel.querySelector('#rd-format').value;
    const statusDiv = this.window.panel.querySelector('#rd-status');

    let pixelX1, pixelY1, pixelX2, pixelY2;

    try {
      if (format === 'tile') {
        const tileX1 = parseInt(this.window.panel.querySelector('#rd-tile-x1').value);
        const tileY1 = parseInt(this.window.panel.querySelector('#rd-tile-y1').value);
        const pxX1 = parseInt(this.window.panel.querySelector('#rd-px-x1').value);
        const pxY1 = parseInt(this.window.panel.querySelector('#rd-px-y1').value);
        const tileX2 = parseInt(this.window.panel.querySelector('#rd-tile-x2').value);
        const tileY2 = parseInt(this.window.panel.querySelector('#rd-tile-y2').value);
        const pxX2 = parseInt(this.window.panel.querySelector('#rd-px-x2').value);
        const pxY2 = parseInt(this.window.panel.querySelector('#rd-px-y2').value);

        pixelX1 = tileX1 * this.TILE_SIZE + pxX1;
        pixelY1 = tileY1 * this.TILE_SIZE + pxY1;
        pixelX2 = tileX2 * this.TILE_SIZE + pxX2;
        pixelY2 = tileY2 * this.TILE_SIZE + pxY2;
      } else if (format === 'pixel') {
        pixelX1 = parseInt(this.window.panel.querySelector('#rd-abs-x1').value);
        pixelY1 = parseInt(this.window.panel.querySelector('#rd-abs-y1').value);
        pixelX2 = parseInt(this.window.panel.querySelector('#rd-abs-x2').value);
        pixelY2 = parseInt(this.window.panel.querySelector('#rd-abs-y2').value);
      } else if (format === 'link') {
        const link1 = this.window.panel.querySelector('#rd-link1').value;
        const link2 = this.window.panel.querySelector('#rd-link2').value;

        const coords1 = this.parseShareLink(link1);
        const coords2 = this.parseShareLink(link2);

        if (!coords1 || !coords2) throw new Error('Invalid share links');

        const pixel1 = this.latlonToPixel(coords1.lat, coords1.lng);
        const pixel2 = this.latlonToPixel(coords2.lat, coords2.lng);

        pixelX1 = pixel1.x;
        pixelY1 = pixel1.y;
        pixelX2 = pixel2.x;
        pixelY2 = pixel2.y;
      }

      if (pixelX1 > pixelX2) [pixelX1, pixelX2] = [pixelX2, pixelX1];
      if (pixelY1 > pixelY2) [pixelY1, pixelY2] = [pixelY2, pixelY1];

      const width = pixelX2 - pixelX1 + 1;
      const height = pixelY2 - pixelY1 + 1;

      const tileX1 = Math.floor(pixelX1 / this.TILE_SIZE);
      const tileY1 = Math.floor(pixelY1 / this.TILE_SIZE);
      const tileX2 = Math.floor(pixelX2 / this.TILE_SIZE);
      const tileY2 = Math.floor(pixelY2 / this.TILE_SIZE);

      const numTiles = (tileX2 - tileX1 + 1) * (tileY2 - tileY1 + 1);

      this.calculatedRegion = { pixelX1, pixelY1, pixelX2, pixelY2, tileX1, tileY1, tileX2, tileY2 };

      statusDiv.innerHTML = `
        <strong>Region Calculated:</strong><br>
        Output: ${width}x${height} pixels<br>
        Tiles needed: ${numTiles}<br>
        Pixel range: (${pixelX1}, ${pixelY1}) to (${pixelX2}, ${pixelY2})<br>
        <span style="color: #ffe082;">Ready to download!</span>
      `;

      this.window.panel.querySelector('#rd-download').disabled = false;
    } catch (e) {
      statusDiv.innerHTML = `<span style="color: #ff6b6b;">Error: ${e.message}</span>`;
      this.window.panel.querySelector('#rd-download').disabled = true;
    }
  }

  async download() {
    const statusDiv = this.window.panel.querySelector('#rd-status');
    const dlBtn = this.window.panel.querySelector('#rd-download');

    if (!this.calculatedRegion) {
      statusDiv.innerHTML = '<span style="color: #ff6b6b;">Please calculate region first!</span>';
      return;
    }

    dlBtn.disabled = true;
    statusDiv.innerHTML = 'Downloading tiles...<br>This may take a while.';

    const { pixelX1, pixelY1, pixelX2, pixelY2, tileX1, tileY1, tileX2, tileY2 } = this.calculatedRegion;

    try {
      const canvas = document.createElement('canvas');
      const width = pixelX2 - pixelX1 + 1;
      const height = pixelY2 - pixelY1 + 1;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      let downloaded = 0;
      const totalTiles = (tileX2 - tileX1 + 1) * (tileY2 - tileY1 + 1);

      for (let tileX = tileX1; tileX <= tileX2; tileX++) {
        for (let tileY = tileY1; tileY <= tileY2; tileY++) {
          const url = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;

          try {
            const response = await fetch(url);
            if (!response.ok) continue;

            const blob = await response.blob();
            const img = await createImageBitmap(blob);

            const tilePixelX1 = tileX * this.TILE_SIZE;
            const tilePixelY1 = tileY * this.TILE_SIZE;

            const cropLeft = Math.max(0, pixelX1 - tilePixelX1);
            const cropTop = Math.max(0, pixelY1 - tilePixelY1);
            const cropRight = Math.min(this.TILE_SIZE, pixelX2 - tilePixelX1 + 1);
            const cropBottom = Math.min(this.TILE_SIZE, pixelY2 - tilePixelY1 + 1);

            const pasteX = tilePixelX1 + cropLeft - pixelX1;
            const pasteY = tilePixelY1 + cropTop - pixelY1;

            ctx.drawImage(img, cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop,
                              pasteX, pasteY, cropRight - cropLeft, cropBottom - cropTop);

            downloaded++;
            statusDiv.innerHTML = `Downloading: ${downloaded}/${totalTiles} tiles...`;
          } catch (e) {
            console.error(`Failed to download tile (${tileX}, ${tileY}):`, e);
          }

          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wplace_region_${pixelX1}_${pixelY1}_to_${pixelX2}_${pixelY2}.png`;
        a.click();
        URL.revokeObjectURL(url);

        statusDiv.innerHTML = `<span style="color: #90ee90;">Download complete! ${width}x${height} pixels saved.</span>`;
        dlBtn.disabled = false;
      }, 'image/png');

    } catch (e) {
      statusDiv.innerHTML = `<span style="color: #ff6b6b;">Error during download: ${e.message}</span>`;
      dlBtn.disabled = false;
    }
  }

  show() {
    this.window.show();
  }
}

function addRegionDownloaderButton() {
  const refBtn = document.querySelector('#bm-search');
  if (!refBtn) return setTimeout(addRegionDownloaderButton, 500);

  const parent = refBtn.parentElement;
  if (!parent || document.getElementById('bm-region-dl')) return;

  const btn = document.createElement('button');
  btn.id = 'bm-region-dl';
  btn.className = "bm-D";
  btn.title = "Open Region Downloader";
  btn.innerHTML = "📥";
  btn.addEventListener('click', () => {
    if (!window.regionDownloader) {
      window.regionDownloader = new RegionDownloader();
    }
    window.regionDownloader.show();
  });

  parent.insertBefore(btn, refBtn.nextSibling);
}

setTimeout(addRegionDownloaderButton, 1000);

// ============================================
// Bookmark Manager
// ============================================

class BookmarkManager {
  constructor() {
    this.STORAGE_KEY = 'wplace_custom_bookmarks';
    this.bookmarks = this.loadBookmarks();
    this.currentCoords = null;

    this.window = new DraggableWindow({
      id: 'bookmark-manager-window',
      title: 'Custom Bookmarks',
      position: { right: '75px', top: '720px' },
      width: 'min(450px, 90vw)'
    });

    this.setupUI();
    this.startCoordMonitor();
  }

  loadBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (e) {
      console.warn('Failed to parse bookmarks from storage, resetting.', e);
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }

  startCoordMonitor() {
    const self = this;
    setInterval(() => {
      const coordSpan = document.querySelector('#bm-h');
      if (!coordSpan) return;

      const match = coordSpan.textContent.match(/Tl X: ([-\d]+), Tl Y: ([-\d]+), Px X: ([-\d]+), Px Y: ([-\d]+)/);
      if (match) {
        self.currentCoords = {
          tileX: parseInt(match[1], 10),
          tileY: parseInt(match[2], 10),
          pixelX: parseInt(match[3], 10),
          pixelY: parseInt(match[4], 10)
        };

        const statusDiv = self.window.panel ? self.window.panel.querySelector('#bm-current-coords') : null;
        if (statusDiv && self.window.panel.style.display !== 'none') {
          statusDiv.innerHTML = `Current: Tile (${self.currentCoords.tileX}, ${self.currentCoords.tileY}) Pixel (${self.currentCoords.pixelX}, ${self.currentCoords.pixelY})`;
          statusDiv.style.color = '#ffe082';
        }
      }
    }, 500);
  }

  coordsToAbsolutePixel(tileX, tileY, pixelX, pixelY) {
    const absX = tileX * 1000 + pixelX;
    const absY = tileY * 1000 + pixelY;
    return { x: absX, y: absY };
  }

  pixelToLatLng(pixelX, pixelY) {
    const ref1_lat = 42.526335232105254;
    const ref1_lng = -86.59168978447266;
    const ref1_pixel_x = 531 * 1000 + 389;
    const ref1_pixel_y = 756 * 1000 + 206;

    const ref2_lat = 42.507418808693245;
    const ref2_lng = -86.56584994072264;
    const ref2_pixel_x = 531 * 1000 + 536;
    const ref2_pixel_y = 756 * 1000 + 352;

    const pixels_per_lng = (ref2_pixel_x - ref1_pixel_x) / (ref2_lng - ref1_lng);
    const pixels_per_lat = (ref2_pixel_y - ref1_pixel_y) / (ref2_lat - ref1_lat);

    const lng = ref1_lng + (pixelX - ref1_pixel_x) / pixels_per_lng;
    const lat = ref1_lat + (pixelY - ref1_pixel_y) / pixels_per_lat;

    return { lat, lng };
  }

  setupUI() {
    const self = this;
    this.window.setContent(`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 8px; align-items: flex-end;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 4px; color: #e4bfbf; font-size: 12px;">
              Bookmark Name
            </label>
            <input type="text" id="bm-name-input" placeholder="My favorite spot..." style="
              width: 100%;
              padding: 6px 8px;
              border-radius: 6px;
              border: 1px solid #a23a2b;
              background: #5e2d2a;
              color: #fff;
              font: 14px monospace;
            ">
          </div>
          <button id="bm-add-btn" style="
            border: none;
            padding: 8px 12px;
            border-radius: 7px;
            background: #a23a2b;
            color: #fff;
            font: 14px monospace;
            cursor: pointer;
            transition: background 0.18s;
            white-space: nowrap;
          ">+ Add Current</button>
        </div>

        <div id="bm-current-coords" style="
          font-size: 11px;
          color: #e4bfbf80;
          padding: 6px;
          background: #5e2d2a;
          border-radius: 4px;
          border: 1px solid #a23a2b;
        ">Click on the canvas to get coordinates...</div>

        <div style="
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #5e2d2a;
          border-radius: 6px;
          background: #5e2d2a;
        ">
          <div id="bm-list" style="padding: 4px;"></div>
        </div>

        <div style="display: flex; gap: 8px; font-size: 12px; color: #e4bfbf;">
          <button id="bm-export-btn" style="
            flex: 1;
            border: none;
            padding: 6px;
            border-radius: 6px;
            background: #5e2d2a;
            color: #e4bfbf;
            font: 12px monospace;
            cursor: pointer;
            border: 1px solid #a23a2b;
          ">Export JSON</button>
          <button id="bm-import-btn" style="
            flex: 1;
            border: none;
            padding: 6px;
            border-radius: 6px;
            background: #5e2d2a;
            color: #e4bfbf;
            font: 12px monospace;
            cursor: pointer;
            border: 1px solid #a23a2b;
          ">Import JSON</button>
          <button id="bm-clear-btn" style="
            flex: 1;
            border: none;
            padding: 6px;
            border-radius: 6px;
            background: #5e2d2a;
            color: #e4bfbf;
            font: 12px monospace;
            cursor: pointer;
            border: 1px solid #a23a2b;
          ">Clear All</button>
        </div>
      </div>
    `);

    const addBtn = this.window.panel.querySelector('#bm-add-btn');
    const nameInput = this.window.panel.querySelector('#bm-name-input');
    const exportBtn = this.window.panel.querySelector('#bm-export-btn');
    const importBtn = this.window.panel.querySelector('#bm-import-btn');
    const clearBtn = this.window.panel.querySelector('#bm-clear-btn');

    [addBtn, exportBtn, importBtn, clearBtn].forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.background = btn === addBtn ? '#d85c38' : '#a23a2b';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = btn === addBtn ? '#a23a2b' : '#5e2d2a';
      });
    });

    addBtn.addEventListener('click', () => self.addBookmark(nameInput.value));
    exportBtn.addEventListener('click', () => self.exportBookmarks());
    importBtn.addEventListener('click', () => self.importBookmarks());
    clearBtn.addEventListener('click', () => self.clearAllBookmarks());

    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') self.addBookmark(nameInput.value);
    });

    this.renderList();
  }

  addBookmark(name) {
    if (!this.currentCoords) {
      alert('No coordinates available. Click on the canvas first!');
      return;
    }

    if (!name || name.trim() === '') {
      name = `Bookmark ${this.bookmarks.length + 1}`;
    }

    const bookmark = {
      id: Date.now(),
      name: name.trim(),
      tileX: this.currentCoords.tileX,
      tileY: this.currentCoords.tileY,
      pixelX: this.currentCoords.pixelX,
      pixelY: this.currentCoords.pixelY,
      createdAt: new Date().toISOString()
    };

    this.bookmarks.unshift(bookmark);
    this.saveBookmarks();
    this.renderList();

    const input = this.window.panel.querySelector('#bm-name-input');
    if (input) input.value = '';
  }

  deleteBookmark(id) {
    if (!confirm('Delete this bookmark?')) return;

    this.bookmarks = this.bookmarks.filter(b => b.id !== id);
    this.saveBookmarks();
    this.renderList();
  }

  goToBookmark(bookmark) {
    const absPixel = this.coordsToAbsolutePixel(
      bookmark.tileX,
      bookmark.tileY,
      bookmark.pixelX,
      bookmark.pixelY
    );

    const latLng = this.pixelToLatLng(absPixel.x, absPixel.y);
    const zoom = 14.62;
    const shareUrl = `https://wplace.live/?lat=${latLng.lat}&lng=${latLng.lng}&zoom=${zoom}`;
    window.location.href = shareUrl;
  }

  renameBookmark(bookmark) {
    const newName = prompt('Enter new name for bookmark:', bookmark.name);
    if (newName === null || newName.trim() === '') return;

    const bookmarkToUpdate = this.bookmarks.find(b => b.id === bookmark.id);
    if (bookmarkToUpdate) {
      bookmarkToUpdate.name = newName.trim();
      this.saveBookmarks();
      this.renderList();
    }
  }

  renderList() {
    const listDiv = this.window.panel.querySelector('#bm-list');

    if (!this.bookmarks || this.bookmarks.length === 0) {
      listDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: #e4bfbf80; font-size: 13px;">No bookmarks yet. Click canvas, then add!</div>';
      return;
    }

    listDiv.innerHTML = '';

    this.bookmarks.forEach(bookmark => {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 8px; margin: 4px 0; background: #3c1e24; border-radius: 6px;
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
        border: 1px solid #5e2d2a;
      `;

      const date = new Date(bookmark.createdAt).toLocaleDateString();

      item.innerHTML = `
        <div style="flex: 1; cursor: pointer; min-width: 0;" class="bm-goto">
          <div style="color: #e4bfbf; font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" class="bm-title">
            ${bookmark.name}
          </div>
          <div style="color: #e4bfbf80; font-size: 11px; margin-top: 2px;">
            Tile (${bookmark.tileX}, ${bookmark.tileY}) Px (${bookmark.pixelX}, ${bookmark.pixelY}) • ${date}
          </div>
        </div>
        <button class="bm-delete" style="
          border: none; padding: 4px 8px; border-radius: 4px;
          background: #a23a2b; color: #fff; font-size: 12px;
          cursor: pointer; flex-shrink: 0;
        ">Delete</button>
      `;

      const gotoDiv = item.querySelector('.bm-goto');
      const titleDiv = item.querySelector('.bm-title');
      const deleteBtn = item.querySelector('.bm-delete');

      gotoDiv.addEventListener('click', () => this.goToBookmark(bookmark));

      titleDiv.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        this.renameBookmark(bookmark);
      });

      gotoDiv.addEventListener('mouseenter', () => item.style.background = '#5e2d2a');
      gotoDiv.addEventListener('mouseleave', () => item.style.background = '#3c1e24');

      deleteBtn.addEventListener('mouseenter', () => deleteBtn.style.background = '#d85c38');
      deleteBtn.addEventListener('mouseleave', () => deleteBtn.style.background = '#a23a2b');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteBookmark(bookmark.id);
      });

      listDiv.appendChild(item);
    });
  }

  exportBookmarks() {
    try {
      const data = JSON.stringify(this.bookmarks, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wplace_bookmarks_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export bookmarks:', e);
      alert(`Failed to export bookmarks: ${e.message}`);
    }
  }

  importBookmarks() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (!Array.isArray(imported)) {
            alert('Invalid bookmark file format');
            return;
          }

          const existingIds = new Set(this.bookmarks.map(b => b.id));
          const newBookmarks = imported.filter(b => !existingIds.has(b.id));

          this.bookmarks = [...this.bookmarks, ...newBookmarks];
          this.saveBookmarks();
          this.renderList();

          alert(`Imported ${newBookmarks.length} new bookmarks!`);
        } catch (err) {
          alert(`Failed to import bookmarks: ${err.message}`);
        }
      };
      reader.readAsText(file);
    });

    input.click();
  }

  clearAllBookmarks() {
    if (!confirm(`Delete all ${this.bookmarks.length} bookmarks? This cannot be undone!`)) return;

    this.bookmarks = [];
    this.saveBookmarks();
    this.renderList();
  }

  show() {
    this.window.show();
  }
}

function addBookmarkButton() {
  const refBtn = document.querySelector('#bm-region-dl') || document.querySelector('#bm-search');
  if (!refBtn) return setTimeout(addBookmarkButton, 500);

  const parent = refBtn.parentElement;
  if (!parent || document.getElementById('bm-bookmark-mgr')) return;

  const btn = document.createElement('button');
  btn.id = 'bm-bookmark-mgr';
  btn.className = "bm-D";
  btn.title = "Open Bookmark Manager";
  btn.innerHTML = "⭐";
  btn.addEventListener('click', () => {
    if (!window.bookmarkManager) {
      window.bookmarkManager = new BookmarkManager();
    }
    window.bookmarkManager.show();
  });

  parent.insertBefore(btn, refBtn.nextSibling);
}

setTimeout(addBookmarkButton, 1000);

})();

// ==UserScript==
// @name         Wplace chunk downloader
// @namespace    http://tampermonkey.net/
// @version      2.2.0
// @description  Easily download chunk images from wplace.live using multi-point selection and highlighting
// @author       NotNotWaldo
// @match        https://wplace.live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wplace.live
// @license      MIT
// @run-at       document-end
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/546392/Wplace%20chunk%20downloader.user.js
// @updateURL https://update.greasyfork.org/scripts/546392/Wplace%20chunk%20downloader.meta.js
// ==/UserScript==

// Code below, feel free to read in horror

(() => {
  // Global vals because I'm way too lazy
  // These variables are for handling the highlighting feature
  let isHightlightOn = false;
  let downloadingState = false; // the downloading state ensures that the highlight wont be also printed when downloading the images of chunk
  let highlightedChunksLinksArr = []; // array for the highlighted chunks

  // the coords of chunks that are selected by the points you've set
  let mlChunkCoords = {
    firstChunk: { x: null, y: null },
    secondChunk: { x: null, y: null },
  };
  let mlPixelCoords = {
    firstPixel: { x: null, y: null },
    secondPixel: { x: null, y: null },
  };

  // variables for the currently selected chunks
  let chunkX = null;
  let chunkY = null;
  let pixelX = null;
  let pixelY = null;
  let chunkUrl = null;

  // for the dragging mechanic
  let isPointing = false;

  let regionDlSafety = true;

  // just a template for chunk img
  const chunkTemplateUrl = `https://backend.wplace.live/files/s0/tiles/`;

  // variables for the download bar
  let currImgsDownloaded = null;
  let totalImgsToBeDownloaded = null;

  // for lazily waiting for something
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let multipleChunksDownloaderElem = document.createElement("div");
  multipleChunksDownloaderElem.className = "mulChunksDownloader";

  multipleChunksDownloaderElem.innerHTML = `
  <div class="chunk-downloader">

    <!-- Multiple Chunk Downloader -->

    <div class="mainHead section-header">
      <span>Wplace Chunks Downloader</span>
      <button class="collapse-btn">–</button>
    </div>

    <div class="mainCollapsible expanded">

      <div class="infoSection section">
        <div class="section-header coords">
          <span class="chunkSelectedInfo">Chunk selected: X: null, Y: null</span>
        </div>
        <div class="btn-row">
            <button class="downloadChunkBtn btn btn-primary">Download chunk</button>
            <button class="viewChunkBtn btn">View chunk image</button>
          </div>
      </div>

      <div class="mulChunkSection section">
        <div class="section-header">
          <span>Multiple Chunks Downloader</span>
          <button class="collapse-btn">+</button>
        </div>

        <div class="collapsible collapsed">
          <div class="coords">
            <span>1st X: null, Y: null</span>
            <span>2nd X: null, Y: null</span>
          </div>

          <div class="btn-row">
            <button class="setPointBtn btn btn-primary">Set point</button>
            <button class="removePointBtn btn">Remove points</button>
          </div>

          <div class="btn-row">
            <button class="downloadBtn btn btn-primary">Download chunks</button>
            <button class="highlightBtn btn">Highlight chunks</button>
          </div>

          <div class="regionDownloadSection section">
            <div class="section-header">
              <span>Pixel Region Downloader</span>
              <button class="collapse-btn">+</button>
            </div>

            <div class="collapsible collapsed">
              <div class="pixelCoords">
                <span>1st X: null, Y: null</span>
                <span>2nd X: null, Y: null</span>
              </div>
                <div class="btn-row">
                  <button class="downloadRegionBtn btn btn-primary">Download Region</button>
                  <button class="downloadRegionSafetyBtn btn">Turn off safety</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Manual Chunk Download -->
      <div class="manualChunkSection section">
        <div class="section-header">
          <span>Manual Chunk Downloader</span>
          <button class="collapse-btn">+</button>
        </div>

        <div class="collapsible collapsed">
          <input class="coordsInput input-box" type="text" name="chunksCoords" placeholder="firstX, firstY, secX, secY, safety">
          </input>

          <div class="btn-row" style="grid-template-columns: 1fr;">
            <button class="manualDownloadBtn btn btn-primary">Download</button>
          </div>
        </div>
      </div>

      <div class="downloadBarCon">
        <div class="download-bar">
          <div class="download-progress"></div>
          <span class="download-text">0 / 0</span>
        </div>
      </div>
    </div>
  </div>
`;

  let style = document.createElement("style");
  style.textContent = `
.mulChunksDownloader {
  position: fixed;
  top: auto;
  bottom: 12px;
  left: 12px;
  z-index: 49;
}

.mulChunksDownloader .chunk-downloader {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid #e5e7eb;
  font-family: sans-serif;
  padding: 16px;
  width: 360px;
  font-size: 14px;
  color: #111827;
}

.mulChunksDownloader .section {
  margin-bottom: 16px;
}

.mulChunksDownloader .mainHead {
  margin: 0px;
}

.mulChunksDownloader .infoSection {
  margin-top: 16px;
}

.mulChunksDownloader .regionDownloadSection {
  margin-top: 16px;
  margin-bottom: 0px;
}

.mulChunksDownloader .pixelCoords {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  padding: 4px 12px;
  border-radius: 9999px;
  background: #f3f4f6;
}

.mulChunksDownloader .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 3px;
}

.mulChunksDownloader .mainHead {
  cursor: move;
}

.mulChunksDownloader .collapse-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  font-size: 14px;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  }
.mulChunksDownloader .collapse-btn:hover {
  background: #e5e7eb;
}

.mulChunksDownloader .coords {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  padding: 4px 12px;
  border-radius: 9999px;
  background: #f3f4f6;
}

.mulChunksDownloader .btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}

.mulChunksDownloader .btn {
  border-radius: 9999px;
  padding: 6px 12px;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  color: #374151;
  text-align: center;
  font-size: 13px;
}
.mulChunksDownloader .btn:hover {
  background: #e5e7eb;
}

.mulChunksDownloader .btn-primary {
  background: #2563eb;
  border: none;
  color: white;
}

.mulChunksDownloader .btn-primary:hover {
  background: #1d4ed8;
}

.mulChunksDownloader .input-box {
  width: 100%;
  border-radius: 9999px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  font-size: 0.875rem;
  margin: 8px 0;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}
.mulChunksDownloader .input-box:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  background: white;
}

.mulChunksDownloader .collapsible {
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.mulChunksDownloader .collapsible.collapsed {
  max-height: 0;
}

.mulChunksDownloader .collapsible.expanded {
  max-height: 1000px;
}

.mulChunksDownloader button:disabled {
  background-color: #4b5563; /* darken */
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.7;
}

.mulChunksDownloader .download-bar {
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #e0e0e0; /* light gray background */
  border-radius: 6px;
  overflow: hidden;
  margin-top: 10px;
}

.mulChunksDownloader .download-progress {
  height: 100%;
  width: 0%;
  background-color: #007bff; /* bootstrap blue */
  transition: width 0.3s ease;
}

.mulChunksDownloader .download-text {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
  color: white;
  line-height: 24px;
}

.mulChunksDownloader .mainCollapsible {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mulChunksDownloader .mainCollapsible.collapsed {
  max-height: 0;
}

.mulChunksDownloader .mainCollapsible.expanded {
  max-height: 2000px; /* large enough to fit all content */
}

`;
  document.head.appendChild(style);
  document.body.appendChild(multipleChunksDownloaderElem);

  // === COLLAPSING MECHANISM SECTION ===

  let collapseSection = (btn, target) => {
    let isCollapsed = btn.dataset.collapsed === "true";

    if (!isCollapsed) {
      target.classList.remove("expanded");
      target.classList.add("collapsed");
      btn.dataset.collapsed = "true";
      btn.textContent = "+";
    } else {
      target.classList.remove("collapsed");
      target.classList.add("expanded");
      btn.dataset.collapsed = "false";
      btn.textContent = "–";
    }
  };

  // Main collapse
  let mainHead = multipleChunksDownloaderElem.querySelector(".mainHead");
  const mainCollapsible =
    multipleChunksDownloaderElem.querySelector(".mainCollapsible");
  const mainCollapseBtn = multipleChunksDownloaderElem.querySelector(
    ".mainHead .collapse-btn"
  );
  mainCollapseBtn.dataset.collapsed = "false";

  mainCollapseBtn.addEventListener("click", () => {
    collapseSection(mainCollapseBtn, mainCollapsible);
  });

  // Multiple Chunks Section collapse
  let mulChunkSection =
    multipleChunksDownloaderElem.querySelector(".mulChunkSection");
  let mulChunkCollapseBtn = mulChunkSection.querySelector(".collapse-btn");
  let mulChunkCollapsible = mulChunkSection.querySelector(".collapsible");
  mulChunkCollapseBtn.dataset.collapsed = "true";

  mulChunkCollapseBtn.addEventListener("click", () => {
    collapseSection(mulChunkCollapseBtn, mulChunkCollapsible);
  });

  // Manual Chunks Section collapse
  let manualChunkSection = multipleChunksDownloaderElem.querySelector(
    ".manualChunkSection"
  );
  let manualCollapseBtn = manualChunkSection.querySelector(".collapse-btn");
  let manualCollapsible = manualChunkSection.querySelector(".collapsible");
  manualCollapseBtn.dataset.collapsed = "true"; // starts collapsed

  manualCollapseBtn.addEventListener("click", () => {
    collapseSection(manualCollapseBtn, manualCollapsible);
  });

  let regionDownloadSection = mulChunkSection.querySelector(
    ".regionDownloadSection"
  );
  let rgDlSectionCollapseBtn =
    regionDownloadSection.querySelector(".collapse-btn");
  let rgDlSectionCollapsible =
    regionDownloadSection.querySelector(".collapsible");
  rgDlSectionCollapseBtn.dataset.collapsed = "true";

  rgDlSectionCollapseBtn.addEventListener("click", () => {
    collapseSection(rgDlSectionCollapseBtn, rgDlSectionCollapsible);
  });

  // === COLLAPSING MECHANISM SECTION END ===

  // for the dragging mechanism
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  mainHead.addEventListener("mousedown", (e) => {
    isDragging = true;

    // Calculates click offset inside the box
    const rect = multipleChunksDownloaderElem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Prevent accidental text selection
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    multipleChunksDownloaderElem.style.top = `${e.clientY - offsetY}px`;
    multipleChunksDownloaderElem.style.left = `${e.clientX - offsetX}px`;
    multipleChunksDownloaderElem.style.bottom = "auto"; // stop sticking to bottom
    multipleChunksDownloaderElem.style.right = "auto"; // stop sticking to left
    multipleChunksDownloaderElem.style.position = "fixed";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // for displaying info about points and currently selected chunk
  let infoSection = multipleChunksDownloaderElem.querySelector(".infoSection");

  let downloadChunkBtn = infoSection.querySelector(".downloadChunkBtn");

  downloadChunkBtn.addEventListener("click", async () => {
    if (chunkX == null) return;
    multipleChunksDlUrl({
      firstChunk: { x: chunkX, y: chunkY },
      secondChunk: { x: chunkX, y: chunkY },
    });
  });

  let viewChunkBtn = infoSection.querySelector(".viewChunkBtn");
  viewChunkBtn.addEventListener("click", (event) => {
    if (chunkX == null) return;
    window.open(chunkUrl, "_blank");
  });

  // to update the infos displayed
  const refreshSetPointsInfo = () => {
    let coordsCon = mulChunkSection.querySelector(".coords");
    let currentCoords = infoSection.querySelector("span");
    currentCoords.textContent = `Chunk selected: X: ${chunkX}, Y: ${chunkY}`;
    let infoChildren = coordsCon.querySelectorAll("span");
    infoChildren[0].textContent = `1st X: ${mlChunkCoords.firstChunk.x}, Y: ${mlChunkCoords.firstChunk.y}`;
    infoChildren[1].textContent = `2nd X: ${mlChunkCoords.secondChunk.x}, Y: ${mlChunkCoords.secondChunk.y}`;

    let pixelCoordsCon = regionDownloadSection.querySelector(".pixelCoords");
    let pixelinfoChildren = pixelCoordsCon.querySelectorAll("span");
    pixelinfoChildren[0].textContent = `1st X: ${mlPixelCoords.firstPixel.x}, Y: ${mlPixelCoords.firstPixel.y}`;
    pixelinfoChildren[1].textContent = `2nd X: ${mlPixelCoords.secondPixel.x}, Y: ${mlPixelCoords.secondPixel.y}`;
  };

  // for the multiple chunk downloader elems/buttons

  let setPointBtn = mulChunkSection.querySelector(".setPointBtn");

  setPointBtn.addEventListener("click", async () => {
    if (chunkX == null) return;
    // for checking if there is a chunk coords value to be set

    if (mlChunkCoords.firstChunk.x == null) {
      // yes I'm lazy
      mlChunkCoords.firstChunk = { x: chunkX, y: chunkY };
      mlPixelCoords.firstPixel = { x: pixelX, y: pixelY };
    } else if (mlChunkCoords.secondChunk.x == null) {
      mlChunkCoords.secondChunk = { x: chunkX, y: chunkY };
      mlPixelCoords.secondPixel = { x: pixelX, y: pixelY };
    } else {
      mlChunkCoords.firstChunk = mlChunkCoords.secondChunk;
      mlChunkCoords.secondChunk = { x: chunkX, y: chunkY };

      mlPixelCoords.firstPixel = mlPixelCoords.secondPixel;
      mlPixelCoords.secondPixel = { x: pixelX, y: pixelY };
    }

    if (isHightlightOn) {
      highlightedChunksLinksArr.length = 0;
      let organizedCoords = await mlCoordsOrganizer(mlChunkCoords);
      highlightedChunksLinksArr.push(
        ...getLinksFromChunkCoords(organizedCoords)
      );
    }

    refreshSetPointsInfo();
    updateButtons();
  });

  let removePointsBtn = mulChunkSection.querySelector(".removePointBtn");
  removePointsBtn.addEventListener("click", async () => {
    mlChunkCoords = {
      firstChunk: { x: null, y: null },
      secondChunk: { x: null, y: null },
    };
    mlPixelCoords = {
      firstPixel: { x: null, y: null },
      secondPixel: { x: null, y: null },
    };

    highlightedChunksLinksArr.length = 0;
    isHightlightOn = false;
    let highlightBtn = mulChunkSection.querySelector(".highlightBtn");
    highlightBtn.textContent = "Highlight chunks";

    refreshSetPointsInfo();
    updateButtons();
  });

  let highlightBtn = mulChunkSection.querySelector(".highlightBtn");
  highlightBtn.addEventListener("click", async () => {
    console.log("Trying to hightlight chunks");
    if (mlChunkCoords.firstChunk.x == null) return;
    if (!isHightlightOn) {
      let organizedCoords = await mlCoordsOrganizer(mlChunkCoords);
      console.log(Object.keys(organizedCoords));
      highlightedChunksLinksArr.push(
        ...getLinksFromChunkCoords(organizedCoords)
      );
      console.log(`Turned on hightlight`);
      isHightlightOn = !isHightlightOn;
      highlightBtn.textContent = "Unhighlight chunks";
    } else {
      highlightedChunksLinksArr.length = 0;
      console.log(`Turned off highlight`);
      isHightlightOn = !isHightlightOn;
      highlightBtn.textContent = "Highlight chunks";
    }
  });

  let downloadBtn = mulChunkSection.querySelector(".downloadBtn");
  downloadBtn.addEventListener("click", async () => {
    let tempCoords = structuredClone(mlChunkCoords);
    if (
      mlChunkCoords.firstChunk.x == null &&
      mlChunkCoords.secondChunk.x == null
    ) {
      return;
    }
    if (mlChunkCoords.secondChunk.x == null) {
      tempCoords.secondChunk.x = mlChunkCoords.firstChunk.x;
      tempCoords.secondChunk.y = mlChunkCoords.firstChunk.y;
    }
    console.log(
      `downloading chunks: ${tempCoords.firstChunk.x}, ${tempCoords.firstChunk.y} | ${tempCoords.secondChunk.x}, ${tempCoords.secondChunk.y}`
    );

    multipleChunksDlUrl(mlChunkCoords);
  });

  // for the region download elems/buttons
  let downloadRegionBtn =
    regionDownloadSection.querySelector(".downloadRegionBtn");
  downloadRegionBtn.addEventListener("click", (event) => {
    console.log("Clicked region download");
    if (
      downloadingState ||
      mlPixelCoords.firstPixel.x == null ||
      mlPixelCoords.secondPixel.x == null
    )
      return;
    regionDl(mlChunkCoords, mlPixelCoords, regionDlSafety);
  });

  let downloadRegionSafetyBtn = regionDownloadSection.querySelector(
    ".downloadRegionSafetyBtn"
  );
  downloadRegionSafetyBtn.addEventListener("click", (event) => {
    regionDlSafety = !regionDlSafety;
    updateButtons();
    console.log("Clicked safety button");
  });

  // for the manual downloading
  let coordsInput = manualChunkSection.querySelector(".coordsInput");
  coordsInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.repeat) {
      manualDownload();
    }
  });

  let manualDownloadBtn =
    manualChunkSection.querySelector(".manualDownloadBtn");
  manualDownloadBtn.addEventListener("click", () => {
    manualDownload();
  });

  let manualDownload = () => {
    if (downloadingState) return;

    let coordsText = coordsInput.value;
    // Split and trim whitespace from each value
    let splitUpVal = coordsText.split(",").map((v) => v.trim());

    // Helper: convert string to boolean or null if invalid
    const toBoolean = (str) => {
      if (str.toLowerCase() === "true") return true;
      if (str.toLowerCase() === "false") return false;
      return null;
    };

    if (splitUpVal.length !== 4 && splitUpVal.length !== 5) {
      console.log("You must input 4 or 5 arguments (comma-separated).");
      return;
    }

    // Validate first 4 args as integers
    for (let i = 0; i < 4; i++) {
      if (!Number.isInteger(Number(splitUpVal[i]))) {
        console.log(
          "First 4 arguments must all be integers. Also make sure that there is no space in between numbers. Example of what not to do: ..., 34 6, ..."
        );
        return;
      }
    }
    // organizing before sending data
    let tempCoords = {
      firstChunk: { x: Number(splitUpVal[0]), y: Number(splitUpVal[1]) },
      secondChunk: { x: Number(splitUpVal[2]), y: Number(splitUpVal[3]) },
    };

    // With 5th arg (boolean)
    if (splitUpVal.length === 5) {
      let inputBool = toBoolean(splitUpVal[4]);
      if (inputBool === null) {
        console.log("The fifth argument only accepts 'true' or 'false'.");
        return;
      }
      multipleChunksDlUrl(tempCoords, inputBool);
    } else {
      // Only 4 args
      multipleChunksDlUrl(tempCoords);
    }
  };

  let updateButtons = () => {
    let marker = document.querySelector(".maplibregl-marker");
    if (!marker) {
      isPointing = false;
      chunkX = null;
      chunkY = null;
      pixelX = null;
      pixelY = null;
      chunkUrl = null;
      refreshSetPointsInfo();
    }
    setPointBtn.disabled = !isPointing;
    downloadChunkBtn.disabled = !isPointing || downloadingState;
    viewChunkBtn.disabled = !isPointing;
    downloadBtn.disabled =
      downloadingState || mlChunkCoords.firstChunk.x == null;
    downloadRegionBtn.disabled =
      downloadingState ||
      mlPixelCoords.firstPixel.x == null ||
      mlPixelCoords.secondPixel.x == null;
    manualDownloadBtn.disabled = downloadingState;

    let noFirstChunk = mlChunkCoords.firstChunk.x == null;
    highlightBtn.disabled = noFirstChunk;
    removePointsBtn.disabled = noFirstChunk;

    if (regionDlSafety) downloadRegionSafetyBtn.textContent = `Turn off safety`;
    else downloadRegionSafetyBtn.textContent = `Turn on safety`;
  };

  // for the download bar
  let updateDownloadBar = () => {
    const progressElem = document.querySelector(".download-progress");
    const textElem = document.querySelector(".download-text");

    if (!progressElem || !textElem || totalImgsToBeDownloaded === 0) return;

    const percent = Math.min(
      100,
      (currImgsDownloaded / totalImgsToBeDownloaded) * 100
    );

    progressElem.style.width = percent + "%";
    textElem.textContent = `${currImgsDownloaded} / ${totalImgsToBeDownloaded}`;
  };

  updateButtons();

  const mlCoordsOrganizer = (mlCoords) => {
    console.log(mlCoords);
    let { firstChunk, secondChunk } = structuredClone(mlCoords);

    // checks if the second point is empty. If yes, it copies the val of first point onto the second
    if (secondChunk.x == null || secondChunk.y == null) {
      secondChunk = { ...firstChunk };
      return { firstChunk, secondChunk };
    }

    // making sure that the coords that will be sent would be appropriate
    // turns the first point to be the topleft corner and the second the bottom right
    const result = {
      firstChunk: {
        x: Math.min(firstChunk.x, secondChunk.x),
        y: Math.min(firstChunk.y, secondChunk.y),
      },
      secondChunk: {
        x: Math.max(firstChunk.x, secondChunk.x),
        y: Math.max(firstChunk.y, secondChunk.y),
      },
    };

    return result;
  };

  const nativeFetch = window.fetch.bind(window);

  let myFetchWrapper = async (resource, init) => {
    const url = new URL(
      typeof resource === "string" ? resource : resource.url || ""
    );

    const isTile = url.pathname.endsWith(".png");

    const x = url.searchParams.get("x");
    const y = url.searchParams.get("y");

    // First, actually perform the fetch with the current target
    const res = await myFetchWrapper._target(resource, init);

    if (
      isTile &&
      isHightlightOn &&
      highlightedChunksLinksArr.includes(url.href) &&
      !downloadingState
    ) {
      const cloned = res.clone();
      const blob = await cloned.blob();
      const bmp = await createImageBitmap(blob);

      const canvas = document.createElement("canvas");
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(bmp, 0, 0);
      ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const modifiedBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const headers = new Headers(res.headers);
      headers.delete("content-length");
      headers.delete("content-encoding");

      // Return modified response so other scripts still get it
      return new Response(modifiedBlob, {
        status: res.status,
        statusText: res.statusText,
        headers,
      });
    }

    if (x != null && y != null) {
      const pathnames = url.pathname.split("/");
      chunkX = Number(pathnames.at(-2));
      chunkY = Number(pathnames.at(-1));
      pixelX = Number(x);
      pixelY = Number(y);
      chunkUrl = `https://backend.wplace.live/files/s0/tiles/${chunkX}/${chunkY}.png`;

      isPointing = true;
      updateButtons();
      refreshSetPointsInfo();
      console.log(`Pressed on ChunkX: ${chunkX}, ChunkY: ${chunkY}`);

      const parent = document
        .querySelector(".rounded-t-box")
        ?.querySelector("div");

      if (parent) {
        const pixelBtns = parent.querySelector(".hide-scrollbar");

        let exitBtn = parent.querySelector(
          "div.px-3:nth-child(1) > button:nth-child(2)"
        );

        let exitPointEvent = (e) => {
          // to be activated when the current set point is (to be) removed
          isPointing = false;
          chunkX = null;
          chunkY = null;
          chunkUrl = null;
          updateButtons();
          refreshSetPointsInfo();
        };

        exitBtn.addEventListener("click", exitPointEvent);

        let paintBtn = pixelBtns.querySelector("button:nth-child(1)");

        paintBtn.addEventListener("click", async () => {
          console.log("clicked the paint button");
          let retryCount = 0;
          while (true) {
            let newParent = document.querySelector(".rounded-t-box");

            let addPaintBtn = newParent.querySelector(
              "div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > button:nth-child(1)"
            );

            let exitPaintBtn = newParent.querySelector(
              "div:nth-child(1) > div:nth-child(1) > button.btn-circle:nth-child(3)"
            );

            if (addPaintBtn) {
              addPaintBtn.addEventListener("click", exitPointEvent);
            }
            if (exitPaintBtn) {
              exitPaintBtn.addEventListener("click", exitPointEvent);
            }

            if (addPaintBtn && exitPaintBtn) {
              break;
            }

            if (retryCount >= 50) {
              console.error(
                "Unable to find the buttons within the set amount of retries..."
              );
              break;
            }

            await sleep(100);
            retryCount++;
          }
        });
      } else {
        console.error("Parent element not found");
      }
    }
    // If nothing special, return original response
    return res;
  };

  myFetchWrapper._target = nativeFetch;

  // Define a "trap" on window.fetch < this is for other scripts: to prevent it from breaking this script
  Object.defineProperty(window, "fetch", {
    configurable: true,
    get() {
      return myFetchWrapper;
    },
    set(fn) {
      console.log("Another script patched fetch, wrapping it.");
      myFetchWrapper._target = fn;
    },
  });

  // gonna need to optimize the code below, later.

  const multipleChunksDlUrl = async (chunkCoords, safety = true) => {
    if (downloadingState) return;

    let organizedChunkCoords = mlCoordsOrganizer(chunkCoords);

    let topleftX = organizedChunkCoords.firstChunk.x;
    let topleftY = organizedChunkCoords.firstChunk.y;
    let botRightX = organizedChunkCoords.secondChunk.x;
    let botRightY = organizedChunkCoords.secondChunk.y;

    let linksResultArr = getLinksFromChunkCoords(organizedChunkCoords);

    downloadingState = true;
    updateButtons();

    let safetyThreshold = 70;

    let chunkWidth = 1 + Number(botRightX - topleftX);

    let imgsAmount = linksResultArr.length;

    if (linksResultArr.length > safetyThreshold) {
      if (safety) {
        console.warn(
          `You were about to download ${linksResultArr.length} images but was prevented by this precaution. If you intentionally wanted to download that much, you can type '${topleftX}, ${topleftY}, ${botRightX}, ${botRightY}, false' onto the manual chunk downloader. Good luck.`
        );
        downloadingState = false;
        updateButtons();
        return;
      } else {
        console.log("Better pray to God...");
      }
    }

    totalImgsToBeDownloaded = imgsAmount;
    currImgsDownloaded = 0;
    updateDownloadBar();

    let resultCanvas = await stitchImages(linksResultArr, chunkWidth);
    let canvasName = `ch-${topleftX}, ${topleftY}, ${botRightX}, ${botRightY} time-${Date.now()}`;

    canvasDownloader(resultCanvas, canvasName);
  };

  // region downloader

  const regionDl = async (chunkCoords, pixelCoords, safety = true) => {
    let organizedChunkCoords = mlCoordsOrganizer(chunkCoords);

    let topleftX = organizedChunkCoords.firstChunk.x;
    let topleftY = organizedChunkCoords.firstChunk.y;
    let botRightX = organizedChunkCoords.secondChunk.x;
    let botRightY = organizedChunkCoords.secondChunk.y;

    let linksResultArr = getLinksFromChunkCoords(organizedChunkCoords);

    downloadingState = true;
    updateButtons();

    let safetyThreshold = 70;

    let chunkWidth = 1 + Number(botRightX - topleftX);

    let imgsAmount = linksResultArr.length;

    if (linksResultArr.length > safetyThreshold) {
      if (safety) {
        console.warn(
          `You were about to download ${linksResultArr.length} images but was prevented by this precaution. If you intentionally wanted to download that much, Turn off the 'safety' under the Region Download section. Good luck.`
        );
        downloadingState = false;
        updateButtons();
        return;
      } else {
        console.log("Better pray to God...");
      }
    }

    totalImgsToBeDownloaded = imgsAmount;
    currImgsDownloaded = 0;
    updateDownloadBar();

    console.log(
      `First point coords: Chunkx: ${topleftX}, ChunkY: ${topleftY}, PixelX: ${pixelCoords.firstPixel.x}, PixelY: ${pixelCoords.firstPixel.y}`
    );
    console.log(
      `Second point coords: Chunkx: ${botRightX}, ChunkY: ${botRightY}, PixelX: ${pixelCoords.secondPixel.x}, PixelY: ${pixelCoords.secondPixel.y}`
    );

    let baseCanvas = await stitchImages(linksResultArr, chunkWidth);

    console.log(
      `canvas - Width: ${baseCanvas.width}, Height: ${baseCanvas.height}`
    );

    // translating the pixel coords onto canvas coords

    let toCanvasCoord = (chunk, pixel, origin, tileSize) => {
      return {
        x: (chunk.x - origin.x) * tileSize + pixel.x,
        y: (chunk.y - origin.y) * tileSize + pixel.y,
      };
    };

    // Basically the "organizedChunkCoords.firstChunk" serves as the "topleft corner" or the 0,0 coords
    // then we extract how far away are the points (on the amount of chunk tiles) from the topleft corner
    // then we multiply it by 1000
    // then the result would be then added by the pixel's coordinate (on the current chunk it is on) to get its coords on canvas.

    let tileWidthAndHeight = 1000; // the width and height of a chunk, hopefully wont change lol

    let canvasPixelCoords = {
      firstPixel: toCanvasCoord(
        chunkCoords.firstChunk,
        pixelCoords.firstPixel,
        organizedChunkCoords.firstChunk,
        tileWidthAndHeight
      ),
      secondPixel: toCanvasCoord(
        chunkCoords.secondChunk,
        pixelCoords.secondPixel,
        organizedChunkCoords.firstChunk,
        tileWidthAndHeight
      ),
    };

    console.log(chunkCoords);
    console.log(pixelCoords);
    console.log(canvasPixelCoords);

    let organizedCanvasPixelCoords = pixelCoordsOrganizer(canvasPixelCoords);

    // sets the width and height of the region
    let regionWidth =
      1 +
      (organizedCanvasPixelCoords.secondPixel.x -
        organizedCanvasPixelCoords.firstPixel.x);
    let regionHeight =
      1 +
      (organizedCanvasPixelCoords.secondPixel.y -
        organizedCanvasPixelCoords.firstPixel.y);

    // creates a new canvas so the data can be put into it
    let regionCanvas = document.createElement("canvas");
    regionCanvas.width = regionWidth;
    regionCanvas.height = regionHeight;

    let regionCtx = regionCanvas.getContext("2d");

    // copy the region onto the new canvas
    regionCtx.drawImage(
      baseCanvas,
      organizedCanvasPixelCoords.firstPixel.x, // source x
      organizedCanvasPixelCoords.firstPixel.y, // source y
      regionWidth, // source width
      regionHeight, // source height
      0, // destination x
      0, // destination y
      regionWidth, // destination width
      regionHeight // destination height
    );

    let canvasName = `ch-${organizedChunkCoords.firstChunk.x}, ${
      organizedChunkCoords.firstChunk.y
    }, ${organizedChunkCoords.secondChunk.x}, ${
      organizedChunkCoords.secondChunk.y
    } px-${organizedCanvasPixelCoords.firstPixel.x}, ${
      organizedCanvasPixelCoords.firstPixel.y
    }, ${organizedCanvasPixelCoords.secondPixel.x}, ${
      organizedCanvasPixelCoords.secondPixel.y
    } time-${Date.now()}`;

    // finally download the resulting canvas
    await canvasDownloader(regionCanvas, canvasName);
  };

  let pixelCoordsOrganizer = (pixelCoords) => {
    let { firstPixel, secondPixel } = structuredClone(pixelCoords);

    const result = {
      firstPixel: {
        x: Math.min(firstPixel.x, secondPixel.x),
        y: Math.min(firstPixel.y, secondPixel.y),
      },
      secondPixel: {
        x: Math.max(firstPixel.x, secondPixel.x),
        y: Math.max(firstPixel.y, secondPixel.y),
      },
    };

    return result;
  };

  let getLinksFromChunkCoords = (chunkCoords) => {
    console.log("getting the links from chunk coords.");
    console.log(
      "tempChunkCoords: " +
        `First chunk {x: ${chunkCoords.firstChunk.x}, y: ${chunkCoords.firstChunk.y}}, Second chunk {x: ${chunkCoords.secondChunk.x}, y: ${chunkCoords.secondChunk.y}}`
    );
    let topleftX = chunkCoords.firstChunk.x,
      topleftY = chunkCoords.firstChunk.y,
      botRightX = chunkCoords.secondChunk.x,
      botRightY = chunkCoords.secondChunk.y;

    if (botRightX == null) {
      botRightX = topleftX;
      botRightY = topleftY;
    }

    let chunkWidth = 1 + Number(botRightX - topleftX);
    let chunkHeight = 1 + Number(botRightY - topleftY);

    console.log("chunkWidth: " + chunkWidth);
    console.log("chunkHeight: " + chunkHeight);

    let linksArr = [];
    for (let j = 0; j < chunkHeight; j++) {
      for (let i = 0; i < chunkWidth; i++) {
        // I F*CKING HATE JAVASCRIPT. TF YOU MEAN THAT YOU THINK A F*CKING NUMBER IS A STRING!
        linksArr.push(
          chunkTemplateUrl +
            (Number(i) + Number(topleftX)) +
            "/" +
            (Number(j) + Number(topleftY)) +
            ".png"
        );
      }
    }
    return linksArr;
  };

  async function stitchImages(images, width) {
    // Creates a temp 1000x1000 image

    const resizeImage = (img, maxWidth = 1000, maxHeight = 1000) => {
      if (img.width <= maxWidth && img.height <= maxHeight) {
        return img; // no need to resize
      }

      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = Math.floor(img.width * scale);
      const newHeight = Math.floor(img.height * scale);

      const c = document.createElement("canvas");
      c.width = newWidth;
      c.height = newHeight;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const resized = new Image();
      resized.src = c.toDataURL(); // safe because already same-origin blob
      return new Promise((resolve) => {
        resized.onload = () => resolve(resized);
      });
    };

    const createBlank = () => {
      const c = document.createElement("canvas");
      c.width = 1000;
      c.height = 1000;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0)"; // or transparent
      ctx.fillRect(0, 0, c.width, c.height);
      return new Promise((resolve) => {
        c.toBlob((blob) => {
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          img.onload = () => resolve(img);
        });
      });
    };

    async function loadImagesWithDelay(images, delay = 100) {
      const loadedImages = [];

      for (const src of images) {
        let img;

        while (true) {
          // keep retrying until successful
          try {
            const res = await fetch(src, { mode: "cors" });

            if (res.status === 429) {
              console.warn("Rate limited! Cooling down for 10s...");
              await sleep(10000); // 10 second cooldown, i dont know if this should be lessened to 5s
              continue; // retry this same image
            }

            if (!res.ok) {
              throw new Error(`HTTP ${res.status}`);
            }

            // Convert response to blob and load into Image
            const blob = await res.blob();
            img = await new Promise((resolve) => {
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.onload = () => resolve(image);
              image.onerror = async () => {
                console.warn("Failed to decode image, using blank:", src);
                const blank = await createBlank();
                resolve(blank);
              };
              image.src = URL.createObjectURL(blob);
            });

            img = await resizeImage(img, 1000, 1000);
            break; // success, exit retry loop
          } catch (err) {
            console.warn("Fetch failed, using blank:", src, err);
            img = await createBlank();
            break;
          }
        }

        loadedImages.push(img);
        currImgsDownloaded++;
        updateDownloadBar();

        // cooldown between normal downloads
        await sleep(delay);
      }

      return loadedImages;
    }

    // usage
    const loadedImages = await loadImagesWithDelay(images, 150);

    // # of columns/rows
    const columns = width;
    const rows = Math.ceil(loadedImages.length / columns);

    const imgWidth = 1000;
    const imgHeight = 1000;

    const canvas = document.createElement("canvas");
    canvas.width = imgWidth * columns;
    canvas.height = imgHeight * rows;
    const ctx = canvas.getContext("2d");

    // this draw images in order: left to right, top to bottom
    loadedImages.forEach((img, index) => {
      const x = (index % columns) * imgWidth;
      const y = Math.floor(index / columns) * imgHeight;
      ctx.drawImage(img, x, y);
    });

    return canvas;
  }

  let canvasDownloader = async (canvasToBeDownloaded, name) => {
    canvasToBeDownloaded.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name + ".png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      // to enable the highlight to stay after downloading
      downloadingState = false;
      updateButtons();
    }, "image/png");
  };
})();

// Sry for horrible coding lmao
// No one just can win against Javascript that easily...
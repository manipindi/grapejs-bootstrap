import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

export default function Grape() {
  const [editor, setEditor] = useState();
  useEffect(() => {
    loadGrapeJs();
  }, []);

  const loadGrapeJs = async () => {
    const editor = await grapesjs.init({
      container: "#gjs",
      width: "auto",
      // height: "400px",
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          "./grape.css",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
        ],
      },
      // plugins:[websitePlugin],

      blockManager: {
        appendTo: "#extrablocks",
        custom: true,
        media: `<svg width="30" height="20">
              <rect  width="150" height="150" style="white:white;stroke-width:5;opacity:0.5" />
              </svg>`,
        blocks: [
          {
            id: "square",
            label: "<b>Square</b>",
            content: `<div class="sqaure_one">
                square
              </div>`,
            media: `<svg width="20" height="20">
            <rect  width="150" height="150" style="white:white;stroke-width:5;opacity:0.5" />
          </svg>
          `,
          },
          {
            id: "rectangle",
            label: "<b>Rectangle</b>",
            content: ` <div>
            Rectangle
            </div>`,
            media: `<svg width="30" height="20">
            <rect  width="150" height="150" style="white:white;stroke-width:5;opacity:0.5" />
          </svg>
          `,
          },
          {
            id: "sec",
            label: "section",
            media: `<svg width="30" height="20">
                    <rect  width="150" height="150" style="white:white;stroke-width:5;opacity:0.5" />
                    </svg>`,
            content: {
              tagName: "div",
              components: [
                {
                  type: "image",
                  attributes: {
                    src: "https://brandlogos.net/wp-content/uploads/2020/09/react-logo-512x512.png",
                  },
                },
                {
                  tagName: "span",
                  type: "text",
                  attributes: { title: "foo" },
                  components: [
                    {
                      type: "textnode",
                      content: "Hello world!!!",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    });


    editor.DomComponents.addType("test-component", {
      model: {
        defaults: {
          testprop: 1,
        },
        init() {
          console.log("Local hook: model.init");
          this.listenTo(this, "change:testprop", this.handlePropChange);
          // Here we can listen global hooks with editor.on('...')
        },
        updated(property, value, prevValue) {
          console.log(
            "Local hook: model.updated",
            "property",
            property,
            "value",
            value,
            "prevValue",
            prevValue
          );
        },
        removed() {
          console.log("Local hook: model.removed");
        },
        handlePropChange() {
          console.log("The value of testprop", this.get("testprop"));
        },
      },
      view: {
        init() {
          console.log("Local hook: view.init");
        },
        onRender() {
          console.log("Local hook: view.onRender");
        },
      },
    });

    editor.BlockManager.add("test-component", {
      label: "Test Component",
      content: `<div id="carouselExampleIndicators" class="carousel slide mw-100 custom_caro">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://demos.creative-tim.com/material-kit/assets-old/img/bg2.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).webp" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    
    <style>
    .custom_caro{
      height : 500px
    }
    .carousel-item > img {
      height : 500px
    }
  </style>
    `,
    });
  };

  return (
    <div>
      <div id="gjs"></div>
      <div id="extrablocks"></div>
    </div>
  );
}

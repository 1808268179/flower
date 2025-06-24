if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
    data() {
      return {
        username: "",
        password: "",
        isLoading: false
      };
    },
    methods: {
      login() {
        if (!this.username || !this.password) {
          uni.showToast({
            title: "用户名或密码不能为空",
            icon: "none"
          });
          return;
        }
        this.isLoading = true;
        formatAppLog("log", "at pages/Login/Login.vue:65", "正在进行登录验证...");
        uni.showLoading({
          title: "登录中..."
        });
        setTimeout(() => {
          this.isLoading = false;
          uni.hideLoading();
          uni.reLaunch({
            url: "/pages/Recognition/Recognition"
          });
        }, 1500);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createCommentVNode(" 背景装饰 "),
      vue.createElementVNode("view", { class: "bg-decoration" }, [
        vue.createElementVNode("view", { class: "floating-orchid orchid-1" }),
        vue.createElementVNode("view", { class: "floating-orchid orchid-2" }),
        vue.createElementVNode("view", { class: "floating-orchid orchid-3" })
      ]),
      vue.createElementVNode("view", { class: "content-wrapper" }, [
        vue.createElementVNode("view", { class: "logo-wrapper" }, [
          vue.createCommentVNode(" 精美的兰花Logo "),
          vue.createElementVNode("view", { class: "logo-container" }, [
            vue.createElementVNode("image", {
              class: "logo",
              src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBldGFsR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY2Qjk1O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNDNzU5RjA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsZWFmR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDBFMEQwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzOEJERjg7c2lvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8IS0tIE9yY2hpZCBQZXRhbCAtLT4KICA8ZWxsaXBzZSBjeD0iNTAiIGN5PSIzMCIgcng9IjE1IiByeT0iMjAiIGZpbGw9InVybCgjcGV0YWxHcmFkaWVudCkiIHRyYW5zZm9ybT0icm90YXRlKDEwIDUwIDMwKSIvPgogIDxlbGxpcHNlIGN4PSI3MCIgY3k9IjQwIiByeD0iMTIiIHJ5PSIxOCIgZmlsbD0idXJsKCNwZXRhbEdyYWRpZW50KSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNzAgNDApIi8+CiAgPGVsbGlwc2UgY3g9IjMwIiBjeT0iNDAiIHJ4PSIxMiIgcnk9IjE4IiBmaWxsPSJ1cmwoI3BldGFsR3JhZGllbnQpIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMzAgNDApIi8+CiAgPGVsbGlwc2UgY3g9IjUwIiBjeT0iNjUiIHJ4PSIyMCIgcnk9IjE1IiBmaWxsPSJ1cmwoI3BldGFsR3JhZGllbnQpIiB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDY1KSIvPgogIDwhLS0gU3RlbSAtLT4KICA8cmVjdCB4PSI0OCIgeT0iNzAiIHdpZHRoPSI0IiBoZWlnaHQ9IjI1IiBmaWxsPSJ1cmwoI2xlYWZHcmFkaWVudCkiIHJ4PSIyIi8+CiAgPCEtLSBMZWF2ZXMgLS0+CiAgPGVsbGlwc2UgY3g9IjM1IiBjeT0iODAiIHJ4PSI4IiByeT0iMTIiIGZpbGw9InVybCgjbGVhZkdyYWRpZW50KSIgdHJhbnNmb3JtPSJyb3RhdGUoLTMwIDM1IDgwKSIvPgogIDxlbGxpcHNlIGN4PSI2NSIgY3k9IjgwIiByeD0iOCIgcnk9IjEyIiBmaWxsPSJ1cmwoI2xlYWZHcmFkaWVudCkiIHRyYW5zZm9ybT0icm90YXRlKDMwIDY1IDgwKSIvPgo8L3N2Zz4="
            }),
            vue.createElementVNode("view", { class: "logo-shine" })
          ]),
          vue.createElementVNode("view", { class: "title" }, "兰花识别专家"),
          vue.createElementVNode("view", { class: "subtitle" }, "AI 驱动的智能花卉识别")
        ]),
        vue.createElementVNode("view", { class: "form" }, [
          vue.createElementVNode("view", { class: "input-wrapper" }, [
            vue.createElementVNode("view", { class: "input-icon" }, "👤"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input-item",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                placeholder: "请输入用户名"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "input-wrapper" }, [
            vue.createElementVNode("view", { class: "input-icon" }, "🔒"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input-item",
                type: "password",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
                placeholder: "请输入密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.password]
            ])
          ]),
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args)),
            disabled: $data.isLoading
          }, [
            $data.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading-spinner"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.isLoading ? "登录中..." : "立即登录"),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "btn-glow" })
          ], 8, ["disabled"])
        ]),
        vue.createElementVNode("view", { class: "tips" }, [
          vue.createElementVNode("view", { class: "tip-icon" }, "💡"),
          vue.createElementVNode("text", null, "演示模式：输入任意内容即可体验")
        ])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-461d1d79"], ["__file", "/Users/jw/Documents/HBuilderProjects/orchid-recognition-app/pages/Login/Login.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        imageSrc: "",
        isLoading: false,
        isUploading: false,
        result: {
          name: "",
          latin: "",
          confidence: 0,
          features: []
        }
      };
    },
    methods: {
      chooseImage() {
        this.isUploading = true;
        uni.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            setTimeout(() => {
              this.imageSrc = res.tempFilePaths[0];
              this.result = { name: "", latin: "", confidence: 0, features: [] };
              this.isUploading = false;
              uni.showToast({
                title: "图片上传成功",
                icon: "success",
                duration: 1500
              });
            }, 800);
          },
          fail: () => {
            this.isUploading = false;
            uni.showToast({
              title: "图片选择失败",
              icon: "error"
            });
          }
        });
      },
      startRecognition() {
        if (!this.imageSrc) {
          uni.showToast({
            title: "请先选择一张图片",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        this.isLoading = true;
        uni.showLoading({ title: "AI正在努力识别中..." });
        uni.uploadFile({
          url: "http://61.136.101.57:5000/predict",
          // 替换为你的 Flask API 地址
          filePath: this.imageSrc,
          name: "file",
          success: (res) => {
            const data = JSON.parse(res.data);
            if (data.message === "成功") {
              const topResult = data.top5_info[0];
              this.result = {
                name: topResult.name,
                latin: "",
                // 若 API 未返回拉丁名，可留空
                confidence: topResult.confidence,
                features: []
                // 若 API 未返回特征，可留空
              };
              uni.showToast({
                title: "识别完成！",
                icon: "success",
                duration: 2e3
              });
            } else {
              uni.showToast({
                title: "识别失败：" + data.error,
                icon: "error"
              });
            }
          },
          fail: (err) => {
            uni.showToast({
              title: "请求失败：" + err.errMsg,
              icon: "error"
            });
          },
          complete: () => {
            this.isLoading = false;
            uni.hideLoading();
          }
        });
      },
      clearResult() {
        this.result = { name: "", latin: "", confidence: 0, features: [] };
        uni.showToast({
          title: "结果已清除",
          icon: "none",
          duration: 1500
        });
      },
      logout() {
        uni.showModal({
          title: "确认退出",
          content: "确定要退出当前账户吗？",
          success: (res) => {
            if (res.confirm) {
              uni.reLaunch({
                url: "/pages/Login/Login"
              });
            }
          }
        });
      },
      getConfidenceLevel(confidence) {
        if (confidence >= 0.9)
          return "high";
        if (confidence >= 0.7)
          return "medium";
        return "low";
      },
      getConfidenceText(confidence) {
        if (confidence >= 0.9)
          return "高可信度";
        if (confidence >= 0.7)
          return "中等可信度";
        return "低可信度";
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "recognition-container" }, [
      vue.createCommentVNode(" 顶部装饰背景 "),
      vue.createElementVNode("view", { class: "header-decoration" }, [
        vue.createElementVNode("view", { class: "decoration-circle circle-1" }),
        vue.createElementVNode("view", { class: "decoration-circle circle-2" }),
        vue.createElementVNode("view", { class: "decoration-circle circle-3" })
      ]),
      vue.createCommentVNode(" 页面标题 "),
      vue.createElementVNode("view", { class: "page-title" }, [
        vue.createElementVNode("view", { class: "title-icon" }, "🌺"),
        vue.createElementVNode("text", { class: "title-text" }, "AI 兰花识别"),
        vue.createElementVNode("text", { class: "subtitle-text" }, "上传图片，智能识别兰花品种")
      ]),
      vue.createCommentVNode(" 图片上传区域 "),
      vue.createElementVNode("view", { class: "upload-section" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["image-wrapper", { "has-image": $data.imageSrc, "uploading": $data.isUploading }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseImage && $options.chooseImage(...args))
          },
          [
            $data.imageSrc ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: $data.imageSrc,
              class: "preview-image",
              mode: "aspectFill"
            }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "placeholder"
            }, [
              vue.createElementVNode("view", { class: "upload-icon" }, [
                vue.createElementVNode("view", { class: "icon-camera" }, "📷")
              ]),
              vue.createElementVNode("text", { class: "placeholder-text" }, "点击上传兰花图片"),
              vue.createElementVNode("text", { class: "placeholder-subtext" }, "支持相册选择或相机拍摄")
            ])),
            $data.isUploading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "upload-overlay"
            }, [
              vue.createElementVNode("view", { class: "upload-spinner" }),
              vue.createElementVNode("text", { class: "upload-text" }, "图片上传中...")
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )
      ]),
      vue.createCommentVNode(" 识别结果卡片 "),
      $data.result.name ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["result-card", { "show": $data.result.name }])
        },
        [
          vue.createElementVNode("view", { class: "card-header" }, [
            vue.createElementVNode("view", { class: "result-badge" }, [
              vue.createElementVNode("text", { class: "badge-text" }, "AI识别结果")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["confidence-chip", $options.getConfidenceLevel($data.result.confidence)])
              },
              vue.toDisplayString($options.getConfidenceText($data.result.confidence)),
              3
              /* TEXT, CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "result-content" }, [
            vue.createElementVNode("view", { class: "species-info" }, [
              vue.createElementVNode("view", { class: "species-icon" }, "🌸"),
              vue.createElementVNode("view", { class: "species-details" }, [
                vue.createElementVNode(
                  "text",
                  { class: "species-name" },
                  vue.toDisplayString($data.result.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "species-latin" },
                  vue.toDisplayString($data.result.latin || "Orchidaceae Family"),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "confidence-section" }, [
              vue.createElementVNode("view", { class: "confidence-label" }, [
                vue.createElementVNode("text", { class: "label-text" }, "识别置信度"),
                vue.createElementVNode(
                  "text",
                  { class: "confidence-value" },
                  vue.toDisplayString(($data.result.confidence * 100).toFixed(1)) + "%",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "progress-container" }, [
                vue.createElementVNode("view", { class: "progress-track" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "progress-fill",
                      style: vue.normalizeStyle({ width: $data.result.confidence * 100 + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" 特征描述 "),
            $data.result.features ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "features-section"
            }, [
              vue.createElementVNode("text", { class: "features-title" }, "主要特征"),
              vue.createElementVNode("view", { class: "features-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.result.features, (feature, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "feature-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "feature-text" },
                        vue.toDisplayString(feature),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 操作按钮区域 "),
      vue.createElementVNode("view", { class: "actions-section" }, [
        vue.createElementVNode("button", {
          class: vue.normalizeClass(["primary-btn", { "loading": $data.isLoading }]),
          onClick: _cache[1] || (_cache[1] = (...args) => $options.startRecognition && $options.startRecognition(...args)),
          disabled: !$data.imageSrc || $data.isLoading
        }, [
          $data.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "btn-loader"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "text",
            { class: "btn-text" },
            vue.toDisplayString($data.isLoading ? "正在识别中..." : "开始AI识别"),
            1
            /* TEXT */
          )
        ], 10, ["disabled"]),
        $data.imageSrc ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "secondary-actions"
        }, [
          vue.createElementVNode("button", {
            class: "secondary-btn",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.chooseImage && $options.chooseImage(...args))
          }, [
            vue.createElementVNode("text", { class: "btn-icon" }, "🔄"),
            vue.createElementVNode("text", { class: "btn-text" }, "重新选择")
          ]),
          $data.result.name ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "secondary-btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.clearResult && $options.clearResult(...args))
          }, [
            vue.createElementVNode("text", { class: "btn-icon" }, "🗑️"),
            vue.createElementVNode("text", { class: "btn-text" }, "清除结果")
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode(" 底部退出按钮 "),
      vue.createElementVNode("view", { class: "footer-section" }, [
        vue.createElementVNode("button", {
          class: "logout-btn",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.logout && $options.logout(...args))
        }, [
          vue.createElementVNode("text", { class: "logout-icon" }, "👋"),
          vue.createElementVNode("text", { class: "logout-text" }, "退出登录")
        ])
      ]),
      vue.createCommentVNode(" 浮动提示 "),
      !$data.imageSrc && !$data.result.name ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "floating-tips"
      }, [
        vue.createElementVNode("text", { class: "tips-text" }, "💡 选择清晰的兰花照片可以提高识别准确率")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesRecognitionRecognition = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-59324cd3"], ["__file", "/Users/jw/Documents/HBuilderProjects/orchid-recognition-app/pages/Recognition/Recognition.vue"]]);
  __definePage("pages/Login/Login", PagesLoginLogin);
  __definePage("pages/Recognition/Recognition", PagesRecognitionRecognition);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:6", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:11", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/jw/Documents/HBuilderProjects/orchid-recognition-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

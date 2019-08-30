// https://www.tiny.cloud/docs/advanced/events/#editorevents
// editor的时间一定要加上on,例如@onNodeChange="onClickItem"
<template>
  <div id="editorAndAdvPanel" :height="contentHeight">
    <el-container>
      <el-aside class="editor-aside">
        <div ref="editorDiv">
          <editor v-model="myValue"
                  id="my_editor_id"
                  :init="init"
                  :disabled="disabled"
                  @onInit="editorInited"
                  @onClick="onClickItem"
                  @onChange="editorChanged"
                  @onDirty="editorChanged"
                  @onKeyUp="editorChanged">
          </editor>
        </div>
      </el-aside>

      <el-aside class="toolPanel" :style="{height:contentHeight+'px'}">
        <el-card :body-style="{ padding: '20px' }" shadow="never">
          <div slot="header" class="clearfix">
            <span>选中样式调整</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-row>
            <el-col :span="3" v-for="(color,index) in styleItemAllColors" :key="index">
              <div :id="index" @click="pickerClick(index)">
                <el-color-picker
                  v-model="styleItemAllColors[index]"
                  @change="styleItemPickColorChange"
                  @active-change="styleItemPickColorChange"
                  size="mini"
                  :show-alpha="false"
                  color-format="rgb"
                  :id="index"
                  v-show="!disableSelectedItemPanel"
                ></el-color-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="44">
            <el-col :span="2">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="deleteStyle"
              >删除</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="passItemStyle"
              >传递</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="moveUp"
              >上移</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="moveDown"
              >下移</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="3">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="insertLineBefore"
              >前空行</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="insertLineAfter"
              >后空行</el-button>
            </el-col>

            <el-col :span="3">
              <el-button
                type="text"
                class="button"
                :disabled="disableSelectedItemPanel"
                @click="clearItemStyle"
              >清样式</el-button>
            </el-col>

            <el-col :span="3">
              <el-button
                type="text"
                class="button"
                @click="serachByID"
                :disabled="disableSelectedItemPanel"
              >搜回样式</el-button>
            </el-col>
          </el-row>

          <el-form label-width="50px" label-position="left">
            <el-form-item label="宽度">
              <el-row :gutter="20">
                <el-col :span="19">
                  <el-slider
                    :min="0"
                    :max="100"
                    v-model="w_h_rate"
                    @change="widthChanged"
                    :step="1"
                    :disabled="disableSelectedItemPanel"
                  ></el-slider>
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="text"
                    class="button"
                    :disabled="disableSelectedItemPanel"
                    @click="restoreW_h_rate"
                  >
                    <i class="el-icon-close"></i>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="角度">
              <el-row :gutter="20">
                <el-col :span="19">
                  <el-slider
                    :min="-180"
                    :max="180"
                    v-model="angle"
                    @change="angleChanged"
                    :setp="1"
                    :disabled="disableSelectedItemPanel"
                  ></el-slider>
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="text"
                    class="button"
                    :disabled="disableSelectedItemPanel"
                    @click="restoreAngle"
                  >
                    <i class="el-icon-close"></i>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="透明">
              <el-row :gutter="20">
                <el-col :span="19">
                  <el-slider
                    :max="1"
                    :step="0.01"
                    v-model="alpha"
                    @change="alphaChanged"
                    :disabled="disableSelectedItemPanel"
                  ></el-slider>
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="text"
                    class="button"
                    :disabled="disableSelectedItemPanel"
                    @click="restoreAlpha"
                  >
                    <i class="el-icon-close"></i>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card :body-style="{ padding: '20px' }" shadow="never">
          <div slot="header" class="clearfix center">
            <span>导入公众号文章</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-row>
            <el-col :span="21">
              <el-form>
                <el-form-item>
                  <el-input
                    size="mini"
                    placeholder="请贴入公众号文章链接"
                    class="input-with-select"
                    v-model="importUrl"
                  >
                    <el-button
                      size="mini"
                      slot="append"
                      icon="el-icon-download"
                      @click="importContentFromWeixin"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '20px' }" shadow="never">
          <div slot="header" class="clearfix center">
            <span>工具箱</span>
          </div>
          <el-row>
            <el-col>
              <div>
                <el-button type="text" @click="saveArticle('wap')">生成长图(适配 WAP)</el-button>
                <!--<el-button type="text" @click="genLongImage(480)">生成长图(宽480px)</el-button>-->
              </div>
              <div>
                <el-button type="text" @click="saveArticle('pc')">生成长图(适配 PC)</el-button>
                <!--<el-button type="text" @click="genLongImage(640)">生成长图(宽640px)</el-button>-->
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '20px' }" shadow="never">
          <div slot="header" class="clearfix center">
            <span>添加视频</span>
          </div>
          <el-row>
            <el-col>
              <el-upload
                ref="upload"
                action=""
                accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb"
                :on-change="fileChange"
                :auto-upload="false"
              >
                <el-button class="add-video" slot="trigger" size="small" type="primary">选取</el-button>
                <el-button class="add-video" style="margin-left: 10px;" size="small" type="success" @click="upload">上传</el-button>
              </el-upload>

            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '20px' }" shadow="never">
          <div slot="header" class="clearfix center">
            <span>编辑完成</span>
          </div>
          <el-row>
            <el-col>
              <el-button class="save-button" type="text" @click="saveArticle">保存文章</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-aside>
    </el-container>
    <div class="pop" v-if="ispopUp">
      <div class="pop-box">
        <div class="closeBtn" @click="close">
          <img src="../assets/closeBtn.png" alt="">
        </div>
        <div class="pop-content">
          <img :src="popSrc" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/imagetools'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/lineheight'
  import 'tinymce/plugins/letterspacing'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/autosave'
  import 'tinymce/plugins/autolink'//自动链接插件
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/directionality'//文字方向 ltr文字方向从左到右，rtl从右到左
  import 'tinymce/plugins/preview'//内容浏览
  import 'tinymce/plugins/searchreplace'//查找替换
  import 'tinymce/plugins/preview'//预览
  /*  import tinymceEditor from "@tinymce/tinymce-vue";

    import crypto from "crypto";*/

  /*String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
  };
*/
  var host = window.location.host;

  export default {
    name: "editorTinyMce",
    components: {
      Editor
    },
    props: {
      //传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'code link codesample lists image imagetools table textcolor contextmenu fullscreen lineheight letterspacing insertdatetime autosave paste autolink directionality preview searchreplace preview'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo code link codesample bullist numlist ists image table insertdatetime fullscreen bold italic alignleft aligncenter alignright alignjustify outdent indent ltr rtl removeformat forecolor backcolor lineheight letterspacing preview | fontselect formatselect fontsizeselect '
      },
      contentHeight:{
        type:Number
      }
    },
    data() {
      return {
        styleItemAllColors: [
          // "rgba(19, 206, 102, 0.8)",
          // "rgba(19, 206, 102, 0.8)",
          // "rgba(19, 206, 102, 0.8)"
        ],
        w_h_rate: 100,
        angle: 0,
        alpha: 1,
        disableSelectedItemPanel: true,
        color4: "#409EFF",

        importUrl: "",
        testUrl:'http://b.bestbpk.cn',
        url:'http://b.bestbpk.cn',

        files:'',

        id:'',
        content: "",
        myValue: '',
        ispopUp:false,
        popSrc:'',
        //初始化配置
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          content_css: ["/static/tinymce/editor.css"],
          height: '100%',
          skin_url: '/static/tinymce/skins/ui/oxide',
          skin: "oxide",
          entity_encoding : "raw",
          plugins: this.plugins,
          toolbar: this.toolbar,
          imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
          menubar: '',
          branding: false,
          statusbar: false,
          elementpath: false,

          paste_filter_drop: false,
          element_format: "html",
          schema: 'html5',
          remove_trailing_brs: false,

          relative_urls: false,
          remove_script_host: false,
          convert_urls: false,

          paste_retain_style_properties: "all",
          paste_word_valid_elements: "*[*]", // word需要它
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: false,
          paste_merge_formats: false,
          paste_auto_cleanup_on_paste: false,
          paste_enable_default_filters: false,
          paste_remove_styles_if_webkit: false,

          custom_undo_redo_levels: 60,
          end_container_on_empty_block: true,
//          imagetools_proxy: 'http://192.168.1.197/task/tesk/proxy.php',//跨域获取图像
//          imagetools_cors_hosts: ["image.yzmg.com", "b.bestbpk.cn"],
          autosave_restore_when_empty: false,

          fontsize_formats: "10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 24px 28px 32px 36px",
          font_formats:'微软雅黑="微软雅黑";苹方="苹方";宋体="宋体";黑体="黑体";仿宋="仿宋";楷体="楷体";隶书="隶书";幼圆="幼圆";Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Courier New=courier new,courier;Helvetica=helvetica;Symbol=symbol;Times New Roman=times new roman,times;Verdana=verdana,geneva;',
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" }
          ],
          /*file_picker_types: 'image',//本地文件选择器
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/!*');

            /!*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            *!/

            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                /!*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                *!/
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /!* call the callback and populate the Title field with the file name *!/
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },*/
          //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
             /*const img = 'data:image/jpeg;base64,' + blobInfo.base64()
             success(img)*/
             var xhr, formData;

             xhr = new XMLHttpRequest();
             xhr.withCredentials = false;
             xhr.open('POST', 'http://video.xinba.com:8085/db_upload');
             xhr.onload = function() {
               var json;
               if (xhr.status != 200) {
                 failure('HTTP Error: ' + xhr.status);
                 return;
               }
               json = xhr.responseText;

               success(json);
             };

             formData = new FormData();
             formData.append('upfile', blobInfo.blob(), blobInfo.filename());

             xhr.send(formData);
           },
          setup: function(editor) {
            // Tab 添加空格
            editor.on("keydown", function(event) {
              if (event.keyCode == 9) {
                editor.execCommand("mceInsertContent", false, "&emsp;&emsp;");
                event.preventDefault();
                return false;
              }
            });
          }
        },

      };
    },
    //https://alligator.io/vuejs/component-lifecycle/
    //https://blog.csdn.net/qyl_0316/article/details/80890070
    //->beforeCreate() 创建Vue事例前的钩子函数
    //Observe Data 开始监听data对象数据变化情况
    //Init Event
    //->created() 创建Vue事例前的钩子函数
    //判断如果没有el选项，那么就vm.$mount(el)
    //继续判断，如果有template选项
    //编译模板
    //如果没有template选项
    //编译el的OuterHtml为template
    //->beforeMount(),开始挂在编译生成的html，此时还没有编译出html渲染到页面上
    //将编译好的html替换掉el属性，所指向的dom对象或替换对应Html标签里的内容
    //->mounted()，编译好的html挂在到页面完成后执行，此时可以进行发送ajax请求获取数据的操作进行数据初始化，
    //->beforeDestory
    //->destoreyed
    mounted() {
      //页面加载后
      this.loadingService = this.$loading({
        lock: true,
        text: "编辑器加载中",
        spinner: "el-icon-loading",
        // background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector("#editorAndAdvPanel")
      });
      this.id=this.$route.query.id;
    },
    updated() {
      //放到updated后才能获得prop中的contentHeight

      //this.$refs.editorDiv.style.height = this.contentHeight + "px";

      this.fixEditorHeight(this.contentHeight);

    },
    created() {
      if (this.contentHeight > 0) {
        //this.$refs.editorDiv.style.height = this.contentHeight + "px";
        this.fixEditorHeight(this.contentHeight);

      }
    },
    methods: {
      // 本地安装：https://www.tiny.cloud/get-tiny/self-hosted/
      // npm install 更新后 需要修改 \node_modules\@tinymce\tinymce-vue\lib\es2015\components\Editor.js
      // 第66行 var url = "/static/tinymce/tinymce.min.js?apiKey=" + apiKey;

      // https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/
      // https://www.tiny.cloud/docs-3x/reference/Configuration3x/#undoredo
      // https://www.tiny.cloud/docs/advanced/editor-command-identifiers/
      // https://www.tiny.cloud/docs-3x/reference/TinyMCE3x@Command_identifiers/
      // https://www.tiny.cloud/docs/advanced/events/#editorevents
      // https://www.tiny.cloud/docs/api/tinymce/tinymce.editorcommands/#execcommand
      // https://www.tiny.cloud/docs/configure/content-filtering/#force_p_newlinesdeprecated
      // https://www.tiny.cloud/get-tiny/custom-builds/
      // https://www.tiny.cloud/get-tiny/self-hosted/
      // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.selection/
      // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.domutils/
      // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.domquery/
      // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.eventutils/
      // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.scriptloader/
      // activeEditor https://www.tiny.cloud/docs/api/tinymce/tinymce.editormanager/
      // http://www.iwms.net/n2065c17.aspx

      //视频选取文件
      fileChange(file){
        this.files=file.raw;//上传文件变化时将文件对象push进files数组
        console.log(this.files);
      },
      //视频上传服务器
      upload(){
        let _this=this;
        let formData = new FormData();
        formData.append('upfile',this.files);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        _this.loadingService = this.$loading({
          lock: true,
          text: "视频上传中,请稍后！",
          spinner: "el-icon-loading",
          // background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector("#editorAndAdvPanel")
        });
        this.axios.post('http://video.xinba.com:8085/db_upload',formData,config).then(res=>{
          console.log(res.data);
          _this.loadingService.close();
          _this.addVideo(_this.addVideoHtml(res.data));
        })
      },
      //添加视频标签
      addVideoHtml(src) {
        let html ="<p style='width: 90%;margin: 0 auto'>\n" +
          "               <span class=\"mce-preview-object mce-object-video\" contenteditable=\"false\" data-mce-object=\"video\" data-mce-p-allowfullscreen=\"allowfullscreen\" data-mce-p-frameborder=\"no\" data-mce-p-scrolling=\"no\" data-mce-p-src="+src+" data-mce-html=\"%20\">\n" +
          "                 <video src="+src+" width=\"100%\" controls=\"controls\"></video>\n" +
          "               </span>\n" +
          "            </p>\n";

        return html;
      },
      //视频添加到编辑器
      addVideo(newHtml) {
        if (newHtml.indexOf("alert") == -1) {
          //console.log("点击事件");
          //console.log(newHtml);
          this.$store.commit("SetNewHtml", newHtml);
        }
      },
      //可以添加一些自己的自定义事件，如清空内容
      editorChanged(e, editor) {
        if (tinymce.activeEditor != null) {
          tinymce.util.LocalStorage.setItem(
            "lastEditorContent",
            tinymce.activeEditor.getBody().innerHTML
          );

          //console.log(tinymce.activeEditor.getBody().innerHTML);

          //console.log("保存:");
        }
      },
      editorInited(e, editor) {
        const _this=this;

        this.fixEditorHeight(this.contentHeight);

        var lastEditorContent = tinymce.util.LocalStorage.getItem(
          "lastEditorContent"
        );

        let id=this.id;
        this.axios
          .get(this.getEditorInitedAPI(id))
          .then(response => {
            let data=response.data.data;
            _this.loadingService.close();
//            console.log(response);
            if (data.content) {
              //tinymce.activeEditor.getBody().innerHTML = lastEditorContent;
              tinymce.activeEditor.getBody().innerHTML = data.content;
              tinymce.activeEditor.dom.removeClass(
                tinymce.activeEditor.dom.select(".active"),
                "active"
              );
            } else {
              var newHtml = "<br />";
              tinymce.activeEditor.setContent(newHtml);
              tinymce.activeEditor.execCommand("fontName", false, "微软雅黑");
              tinymce.activeEditor.execCommand("fontSize", false, "14px");
              //console.log(newHtml);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      onClickItem() {
        //console.log("test");1
        //console.log(tinymce.activeEditor.selection.getNode().nodeName);

        if (
          tinymce.activeEditor != null &&
          tinymce.activeEditor.selection != null
        ) {
          var selectedNode = tinymce.activeEditor.selection.getNode();

          var styleItemParent = this.activeItem(
            selectedNode,
            this.getEditorDoc()
          );

          this.selectedStyleItemParent = styleItemParent;

          //控制是否禁止扩展操作控件
          this.disableSelectedItemPanel = true;
          if (styleItemParent != null && styleItemParent.tagName == "SECTION") {
            //初始化宽度
            var widthValue = styleItemParent.offsetWidth;

            //ToDo: 404需要根据实际宽度调整
            this.w_h_rate = parseInt((widthValue / 404) * 100);
            //console.log(this.w_h_rate);

            //初始化透明度

            var alphaValue = 1;
            if (styleItemParent.style.opacity != "") {
              alphaValue = parseFloat(styleItemParent.style.opacity);
            }

            this.alpha = alphaValue;
            //console.log("alpha:" + this.alpha);

            //初始化角度
            var angleValue = styleItemParent.style.getPropertyValue("transform");
            var angleValueInt = 0;
            if (angleValue) {
              //rotatez(-152deg)

              angleValueInt = parseInt(
                angleValue
                  .toString()
                  .toLowerCase()
                  .replace("rotatez(", "")
                  .replace("deg)", "")
              );
            }

            //console.log(angleValueInt);

            this.angle = angleValueInt;

            this.InitColorPick(styleItemParent);

            this.disableSelectedItemPanel = false;
          }
        }
      },
      InitColorPick(styleItemParent) {
        if (styleItemParent != null && styleItemParent.querySelectorAll != null) {
          //初始化颜色
          this.styleItemAllColors = [];
          var styleItemAllColorsLocal = this.styleItemAllColors;
          var thisVue = this;

          //遍历所有section寻找所有颜色
          [].forEach.call(styleItemParent.querySelectorAll("section"), function(
            foundSection
          ) {
            //console.log(foundSection);
            //console.log(foundSection.style);
            if (styleItemParent != foundSection) {
              for (var i = 0, len = foundSection.style.length; i < len; i++) {
                var prop = foundSection.style[i];

                //console.log(prop);

                var propValue = foundSection.style.getPropertyValue(prop);
                if (propValue.indexOf("rgb") != -1) {
                  //rgb(156, 80, 60)

                  //console.log(propValue);

                  var rgbRe = /rgb\(\s*[\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+\s*\)/g;
                  var rgbArr = propValue.match(rgbRe);

                  if (rgbArr == null) {
                    rgbRe = /rgba\(\s*[\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+\s*\)/g;
                    rgbArr = propValue.match(rgbRe);

                    //console.log(rgbArr);
                  }

                  rgbArr.forEach((rgb, index, array) => {
                    //console.log(rgb);
                    if (styleItemAllColorsLocal.indexOf(rgb) == -1) {
                      styleItemAllColorsLocal.push(rgb);
                    }
                  });
                }
              }
            }
          });
        }
      },
      styleItemPickColorChange(currentColor) {
        var styleItemParent = this.selectedStyleItemParent;
        if (styleItemParent != null && styleItemParent.querySelectorAll != null) {
          var lastClickPickColor = this.lastClickPickColor;

          [].forEach.call(styleItemParent.querySelectorAll("section"), function(
            foundSection
          ) {
            //console.log(foundSection);
            //console.log(foundSection.style);
            if (styleItemParent !== foundSection) {
              for (var i = 0, len = foundSection.style.length; i < len; i++) {
                var prop = foundSection.style[i];

                var propValue = foundSection.style.getPropertyValue(prop);
                // console.log("当前属性：" + prop);
                // console.log("当前属性值" + propValue);
                // console.log("原始值：" + lastClickPickColor);

                if (propValue.indexOf(lastClickPickColor) != -1) {
                  //console.log("新值：" + currentColor);
                  //console.log("原始值：" + lastClickPickColor);

                  tinymce.activeEditor.dom.setStyle(
                    foundSection,
                    prop,
                    propValue.replace(lastClickPickColor, currentColor)
                  );

                  // //如果找到了原始值，那么就开始替换
                  // foundSection.style.setProperty(
                  //   prop,
                  //   propValue.replace(lastClickPickColor, currentColor)
                  // );
                }
              }
            }
          });

          //保存替换后的颜色
          this.lastClickPickColor = currentColor;

          this.InitColorPick(styleItemParent);

          this.setDirty();
        }
      },
      setDirty() {
        //tinymce.activeEditor.setDirty(true);
        tinymce.activeEditor.fire("Change");
        //tinymce.activeEditor.execCommand("mceInsertContent", false, "");
      },
      styleItemParentOuter() {
        console.log(this.selectedStyleItemParent.parentNode);
        return this.selectedStyleItemParent.parentNode;
      },
      contentChange() {
        //this.deactiveItem(this.getEditorDoc());
      },
      pickerClick(index) {
        this.lastClickPickColor = this.styleItemAllColors[index];
        //console.log(this.lastClickPickColor);
      },
      restoreAngle() {
        this.angle = 0;
        this.angleChanged(0);
      },
      angleChanged(newAngle) {
        var styleItemParent = this.selectedStyleItemParent;

        var newAngleStr = "rotatez(" + newAngle + "deg)";

        this.setVendor(styleItemParent, "transform", newAngleStr);

        //margin: 0px auto;
        styleItemParent.style.setProperty("margin", "0px auto");

        this.setDirty();
      },
      restoreW_h_rate() {
        this.w_h_rate = 100;
        this.widthChanged(100);
      },
      widthChanged(newWidth) {
        var styleItemParent = this.selectedStyleItemParent;
        styleItemParent.style.width = newWidth + "%";

        //margin: 0px auto;
        styleItemParent.style.setProperty("margin", "0px auto");

        this.setDirty();
      },
      restoreAlpha() {
        this.alpha = 1;
        this.alphaChanged(1);
      },
      alphaChanged(newAlpha) {
        //opacity: 0.66;
        var styleItemParent = this.selectedStyleItemParent;
        styleItemParent.style.opacity = newAlpha;

        //margin: 0px auto;
        styleItemParent.style.setProperty("margin", "0px auto");

        this.setDirty();
      },
      insertLineAfter() {
        var styleItemParent = this.selectedStyleItemParent;
        var newNodeBr = document.createElement("p");
        newNodeBr.innerHTML = "&nbsp";
        this.insertAfter(newNodeBr, this.styleItemParentOuter());

        this.setDirty();

        this.focusCursor(newNodeBr);
      },
      insertLineBefore() {
        var styleItemParent = this.selectedStyleItemParent;
        var newNodeBr = document.createElement("p");
        newNodeBr.innerHTML = "&nbsp";
        this.insertBefore(newNodeBr, this.styleItemParentOuter());

        this.setDirty();

        this.focusCursor(newNodeBr);
      },
      moveOutSiblingsNodes(styleItemParent) {
        //把所有兄弟全部移动出去
        var allSiblingsNodes = this.getAllSiblingsNodesAfter(styleItemParent);
        for (var i = 0; i < allSiblingsNodes.length; i++) {
          var allSiblingsNode = allSiblingsNodes[i];
          if (
            allSiblingsNode.tagName == "SECTION" &&
            styleItemParent.parentNode.tagName != "BODY"
          ) {
            this.insertAfter(allSiblingsNode, styleItemParent.parentNode);
          }
        }
      },
      moveElement(styleItemParent, direction) {
        //把所选样式的外框移动到同级外框前面
        //console.log(styleItemParent);
        var allSiblingsNodes;
        if (direction == "before") {
          allSiblingsNodes = this.getAllSiblingsNodesBefore(
            styleItemParent.parentNode
          );
        } else {
          allSiblingsNodes = this.getAllSiblingsNodesAfter(
            styleItemParent.parentNode
          );
        }

        //console.log(allSiblingsNodes);
        var hasMoved = false;

        if (direction == "before") {
          allSiblingsNodes = this.reverseArray(allSiblingsNodes);
        }

        for (var i = 0; i < allSiblingsNodes.length; i++) {
          var allSiblingsNode = allSiblingsNodes[i];
          //if (allSiblingsNode.tagName == "SECTION") {
          if (direction == "before") {
            this.insertBefore(styleItemParent.parentNode, allSiblingsNode);
          } else {
            this.insertAfter(styleItemParent.parentNode, allSiblingsNode);
          }

          tinymce.activeEditor.selection.select(styleItemParent);
          tinymce.activeEditor.selection.collapse(false);
          tinymce.activeEditor.execCommand("mceInsertContent", false, "");

          this.flashBackground(styleItemParent);

          hasMoved = true;
          break;
        }
        //}

        tinymce.activeEditor.focus();
        return hasMoved;
      },
      moveUp() {
        var styleItemParent = this.selectedStyleItemParent;

        //把所有兄弟移出去
        this.moveOutSiblingsNodes(styleItemParent.parentNode);

        //往上面移动
        var hasMoved = this.moveElement(styleItemParent, "before");

        //如果移动不了，就移动上层的
        if (hasMoved == false) {
          var foundRootItemStyle = this.findStyleItemRootWithStyle(
            styleItemParent
          );
          if (foundRootItemStyle != null) {
            hasMoved = this.moveElement(foundRootItemStyle, "before");
          }
        }

        if (hasMoved == false) {
          this.$notify.info({
            title: "提示",
            message: "已经在同级元素中处于最顶部"
          });
        } else {
          this.setDirty();
        }
      },
      moveDown() {
        var styleItemParent = this.selectedStyleItemParent;

        this.moveOutSiblingsNodes(styleItemParent.parentNode);

        var hasMoved = this.moveElement(styleItemParent, "after");

        if (hasMoved == false) {
          var foundRootItemStyle = this.findStyleItemRootWithStyle(
            styleItemParent
          );
          if (foundRootItemStyle != null) {
            hasMoved = this.moveElement(foundRootItemStyle, "after");
          }
        }

        if (hasMoved == false) {
          this.$notify.info({
            title: "提示",
            message: "已经在同级元素中处于最底部"
          });
        } else {
          this.setDirty();
        }
      },
      focusCursor(element) {
        tinymce.activeEditor.selection.setCursorLocation(element);

        this.flashBackground(element);

        tinymce.execCommand("mceFocus", false, "intymceEditor");
      },
      selectStyle() {
        this.selectStyleFun(this.styleItemParentOuter());
      },
      selectStyleFun(styleItemParent) {
        //console.log(styleItemParent);

        tinymce.activeEditor.selection.select(styleItemParent, true);

        this.deactiveItem(this.getEditorDoc());

        tinymce.execCommand("mceFocus", false, "intymceEditor");
      },
      copyStyle() {
        this.selectStyleFun(this.styleItemParentOuter());

        tinymce.activeEditor.execCommand("copy", false);
        //tinymce.activeEditor.getDoc().execCommand("copy");
      },
      cutStyle() {
        var styleItemParent = this.styleItemParentOuter();

        this.selectStyleFun(styleItemParent);

        tinymce.activeEditor.execCommand("copy", false);
        //tinymce.activeEditor.getDoc().execCommand("copy");

        styleItemParent.parentNode.removeChild(styleItemParent);

        this.setDirty();
      },
      deleteStyle() {
        var styleItemParent = this.styleItemParentOuter();

        this.disableSelectedItemPanel = true;

        styleItemParent.parentNode.removeChild(styleItemParent);

        this.setDirty();
      },
      clearItemStyle() {
        var styleItemParent = this.selectedStyleItemParent;

        var allChildNodes = [];
        this.getAllChildNode(allChildNodes, styleItemParent);

        for (var j = 0; j < allChildNodes.length; j++) {
          allChildNodes[j].setAttribute("style", "");
        }

        this.$notify({
          title: "成功",
          message: "样式清除成功",
          type: "success"
        });

        this.setDirty();
      },
      serachByID() {
        var styleItemParent = this.selectedStyleItemParent;
        var styleID = styleItemParent.getAttribute("styleid");
        if (styleID == null) {
          styleID = styleItemParent.getAttribute("data-id");

          if (styleID == null) {
            styleID = styleItemParent.getAttribute("id");
          }
        }
        this.$store.commit("SetSearchStyleID", styleID);
      },
      passItemStyle() {
        var styleItemParent = this.selectedStyleItemParent;
        var selectedStyleDataId = tinymce.activeEditor.dom.getAttrib(
          styleItemParent,
          "styleid"
        );

        var allChildNodes = [this.selectedStyleItemParent];
        this.getAllChildNode(allChildNodes, styleItemParent);

        var items = tinymce.activeEditor.dom.select("._5118editor");

        var successTimes = 0;
        var failedTimes = 0;
        for (var i = 0; i < items.length; i++) {
          var sameItem = items[i];
          var sameItemStyleDataId = tinymce.activeEditor.dom.getAttrib(
            sameItem,
            "styleid"
          );

          if (
            sameItem != styleItemParent &&
            sameItemStyleDataId == selectedStyleDataId
          ) {
            // console.log(sameItemStyleDataId);
            // console.log(sameItem);

            // console.log(selectedStyleDataId);
            // console.log(styleItemParent);

            var sameItemAllChildNodes = [sameItem];
            this.getAllChildNode(sameItemAllChildNodes, sameItem);
            //console.log(allChildNodes);

            if (allChildNodes.length == sameItemAllChildNodes.length) {
              successTimes++;
              for (var j = 0; j < allChildNodes.length; j++) {
                sameItemAllChildNodes[j].setAttribute(
                  "style",
                  allChildNodes[j].getAttribute("style")
                );
              }
            } else {
              failedTimes++;
            }

            var messageStr = "成功为你复制风格到" + successTimes + "个同类样式";
            if (failedTimes > 0) {
              messageStr += "，" + failedTimes + "个因为样式结构已被修改而放弃";
            }
          }
        }

        this.$notify({
          title: "成功",
          message: messageStr,
          type: "success"
        });

        this.setDirty();
      },
      importContentFromWeixin() {
        console.log(this.importUrl);

        this.loadingService = this.$loading({
          lock: true,
          text: "文章导入中",
          spinner: "el-icon-loading",
          // background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector("#editorAndAdvPanel")
        });

        this.axios
          .get(this.getImportAPI(this.importUrl))
          .then(response => {
            tinymce.activeEditor.dom.setHTML(
              tinymce.activeEditor.getBody(),
              response.data
            );

            this.setDirty();

            this.loadingService.close();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("导入微信公众号文章时发生错误: " + error);
          });
      },
      getEditorInitedAPI(id) {
        if (process.env.NODE_ENV === "development") {
          return this.testUrl+"/inspection/edit_frist_article?id="+id;
        } else {
          return this.url+"/inspection/edit_frist_article?id="+id;
        }
      },
      getImportAPI(url) {
        if (process.env.NODE_ENV === "development") {
          return this.testUrl+"/inspection/request_public?url=" + escape(url);
        } else {
          return this.url+"/inspection/request_public?url=" + escape(url);
        }
      },
      getGenImageAPI(os) {
        let num=Math.random();
        if (process.env.NODE_ENV === "development") {
          return this.testUrl+"/inspection/get_wap_or_pc_img?id="+this.id+"&os="+os+"&t="+num;
        } else {
          return this.url+"/inspection/get_wap_or_pc_img?id="+this.id+"&os="+os+"&t="+num;
        }
      },
      getArticleAPI() {
        if (process.env.NODE_ENV === "development") {
          return this.testUrl+"/inspection/edit_article";
        } else {
          return this.url+"/inspection/edit_article";
        }
      },
      getImageHost() {
        if (process.env.NODE_ENV === "development") {
          return "http://192.168.1.202";
        } else {
          return "https://ai.5118.com";
        }
      },
      close(){
        this.ispopUp=false;
      },
      genLongImage(os) {
        let _this=this;
        let src=_this.getGenImageAPI(os);
        console.log();
        this.deactiveItem(this.getEditorDoc());
        this.loadingService = this.$loading({
          lock: true,
          text: "正在生成长图，请耐心等待",
          spinner: "el-icon-loading",
          // background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector("#editorAndAdvPanel")
        });
        let newImg = new Image();
        newImg.src = src;
        newImg.onload = function(){
          _this.loadingService.close();
          _this.ispopUp=true;
          _this.popSrc=src;
        }
      },
      getEditorDoc() {
        //console.log(tinymce.activeEditor.getDoc());
        return tinymce.activeEditor.getDoc();
      },
      fixEditorHeight(newContentHeight) {
//        console.log(newContentHeight);
//        console.log(this.$refs.editorDiv);
        if (this.$refs.editorDiv != null) {
          this.$refs.editorDiv.style.height = newContentHeight + "px";
        }
        var toolbar = document.querySelector(".mce-toolbar-grp");

        var editorToolbarHeight = 0;
        if (toolbar != null && toolbar != undefined) {
          editorToolbarHeight = toolbar.offsetHeight;
        }
        var editorStatusBarHeight = 2;
        // var editorStatusBarHeight =
        //   document.querySelector(".mce-statusbar").offsetHeight + 2;

        var realHeight =
          newContentHeight - editorToolbarHeight - editorStatusBarHeight;
//        console.log(typeof tinymce);
//        console.log(tinymce.activeEditor);
//        console.log(realHeight);
        if (typeof tinymce !== "undefined" && tinymce.activeEditor != null) {
//          tinymce.activeEditor.theme.resizeTo("100%", realHeight);
        }
      },
      saveArticle(os) {
        const _this=this;
        let content=tinymce.activeEditor.getBody().innerHTML;
        let id=_this.id;
        this.axios
          .post(this.getArticleAPI(),{
            id: id,
            content: content
          })
          .then(response => {
            if((os == 'wap' || os == 'pc') && response.data.status == 1){
              _this.genLongImage(os);
              return;
            }
            if(response.data.status == 1){
              _this.$notify({
                title: "保存成功",
                type: "success"
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.$message.error("保存文章是时网络异常");
          });

      },
      copyToWeixin() {
        console.log(tinymce.activeEditor.getBody().innerHTML);
        this.copyFormatted(tinymce.activeEditor.getBody().innerHTML);

        this.$notify({
          title: "成功",
          message: "已将编辑器内容拷贝到粘贴板，请粘贴到公众号后台编辑器中！",
          type: "success"
        });
      },
      copyFormatted(html) {
        // Create container for the HTML
        // [1]
        var container = document.createElement("div");
        container.innerHTML = html;

        // Hide element
        // [2]
        container.style.position = "fixed";
        container.style.pointerEvents = "none";
        container.style.opacity = 0;

        // Detect all style sheets of the page
        var activeSheets = Array.prototype.slice
          .call(document.styleSheets)
          .filter(function(sheet) {
            return !sheet.disabled;
          });

        // Mount the container to the DOM to make `contentWindow` available
        // [3]
        document.body.appendChild(container);

        // Copy to clipboard
        // [4]
        window.getSelection().removeAllRanges();

        var range = document.createRange();
        range.selectNode(container);
        window.getSelection().addRange(range);

        // [5.1]
        document.execCommand("copy");

        // [5.2]
        for (var i = 0; i < activeSheets.length; i++)
          activeSheets[i].disabled = true;

        // [5.3]
        document.execCommand("copy");

        // [5.4]
        for (var i = 0; i < activeSheets.length; i++)
          activeSheets[i].disabled = false;

        // Remove the container
        // [6]
        document.body.removeChild(container);
      },
    },
    computed: {
      ...mapGetters([
        "insertCount",
        "insertHtml",
        "insertArticleImage",
        "insertArticleImageCount",
        "insertArticleHtml",
        "insertArticleHtmlCount"
      ])
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      },
      contentHeight: {
        handler: function(val, oldVal) {
          this.fixEditorHeight(val);
        }
      },
      insertArticleHtmlCount: {
        handler: function() {
          var newHtml = this.insertArticleHtml;

          this.deactiveItem(this.getEditorDoc());

          tinymce.activeEditor.insertContent(newHtml);

          this.$notify({
            title: "成功",
            message: "截取文章内容插入完成",
            type: "success"
          });
        }
      },
      insertArticleImageCount: {
        handler: function() {
          //console.log(this.insertArticleImage);

          var imgHtml =
            //margin: 0px auto; width: 100%; 让样式居中
            "<img src='" + this.insertArticleImage + "' />";

          this.deactiveItem(this.getEditorDoc());

          //tinymce.activeEditor.execCommand("mceInsertContent", false, newHtml);

          tinymce.activeEditor.insertContent(imgHtml);

          this.$notify({
            title: "成功",
            message: "文章中的图片插入完成",
            type: "success"
          });
        }
      },
      insertCount: {
        //deep: true,
        handler: function() {
          var newHtml =
            "<section class='parentStyle' style='margin: 0px auto; width: 100%;'><p style='display: block;'/>" +
            this.insertHtml +
            "<p style='display: block;'/></section><br />&nbsp;";
          this.deactiveItem(this.getEditorDoc());
          tinymce.activeEditor.insertContent(newHtml);

          this.$notify({
            title: "成功",
            message: "样式插入完成",
            type: "success"
          });

          // tinymce.activeEditor.dom.setHTML(
          //   tinymce.activeEditor.getBody(),
          //   newHtml
          // );

          // if (process.env.NODE_ENV !== "development") {
          //   newHtml = newHtml.replaceAll("/net/upload/", "net/upload/");

          //   newHtml = newHtml.replaceAll(
          //     "net/upload/",
          //     this.getImageHost() + "/net/upload/"
          //   );
          // }

          // console.log(newHtml);

          //tinymce.activeEditor.execCommand("mceInsertRawHTML", false, newHtml);
        }
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #editorAndAdvPanel .el-container{
    position: relative;
    padding-right: 280px !important;
  }
  .editor-aside{
    width: 100% !important;
  }
  .toolPanel{
    position: absolute;
    right: 0;
    width: 280px !important;
    z-index: 10;
  }
  .el-form--label-left .el-form-item__content{
    width: 203px !important;
  }
  .add-video{
    width: 100px;
    font-size: 14px;
  }
  /*弹窗*/
  .pop{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
    display: flex;
    align-items:center;
  }
  .pop-box{
    position: relative;
    margin: 0 auto;
    height: 80%;
  }
  .pop-content{
    width: 500px;
    height: 100%;
    overflow: auto;
    background-color: #fff;
  }
  .pop-box img{
    width: 100%;
  }
  .closeBtn{
    position: absolute;
    right: -100px;
    top: -40px;
    width: 30px;
    height: 30px;
  }
  .el-main {
    padding: 0px !important;
  }
  .el-aside {
    padding: 0px !important;
  }
  .el-card {
    border: 0px !important;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .center {
    width: 0% auto;
  }

  .genLongPreviewImg {
    width: 400px !important;
  }

  .genLongImg {
    width: 460px !important;
  }

  .genLongImgPreviewImg {
    width: 430px;
    max-height: 500px;
    overflow: visible;
    overflow-x: hidden;
    border: 1px solid #ededed;
  }

  .genLongImgDownLink {
    text-align: center;
    padding-bottom: 10px;
    font-size: 16px;
  }

  div.mce-fullscreen {
    z-index: 1050;
  }

  .toolPanel {
    background-color: white !important;
    z-index: 2;
    height: 100%;
    overflow: auto;
  }

  .el-slider__button {
    width: 6px !important;
    height: 6px !important;
  }

  .el-form-item {
    margin-bottom: 0px !important;
  }
  .save-button{}
  .save-button span{
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #338cff;
    text-align: center;
    color: #fff;
  }
</style>



// WEBPACK FOOTER //
// src/components/EditorTiny.vue

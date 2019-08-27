<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/imagetools'
  import 'tinymce/plugins/media'
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

  export default {
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
        default: 'code link codesample lists image imagetools media table textcolor contextmenu fullscreen lineheight letterspacing insertdatetime autosave paste autolink directionality preview searchreplace'
      },
      toolbar: {
        type: [String, Array],
        default: 'code | link | codesample | bullist numlist | undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify outdent indent | lists image media table | removeformat | fontsizeselect | fontselect | forecolor | backcolor | fullscreen | lineheight | letterspacing | insertdatetime | ltr | rtl'
      }
    },
    data() {
      return {
        //初始化配置
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          content_css: ["static/tinymce/editor.css"],
          height: 600,
          skin_url: '/static/tinymce/skins/ui/oxide',
          skin: "light",
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
          /* images_upload_url: '',//图片提交地址
           images_upload_base_path: '',//图片路径
           images_reuse_filename: true,
           end_container_on_empty_block: true,
           imagetools_proxy: '',//跨域获取图像
           automatic_uploads: true, //https://www.tiny.cloud/docs/configure/file-image-upload/#automatic_uploads
           autosave_restore_when_empty: false,
           imagetools_cors_hosts: ["", ""],//图片域名*/
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
          file_picker_types: 'image',//本地文件选择器
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */

            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
//          images_upload_handler: (blobInfo, success, failure) => {
//            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
//            success(img)
//          }
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
        myValue: this.value
      }
    },
    mounted() {
      tinymce.init({

      })
    },
    methods: {
      //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      //需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      //可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    }
  }

</script>
<style scoped>

</style>

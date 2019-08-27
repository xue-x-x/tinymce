<template>
  <div class="style-box ListPanel">
    <el-row class="styleTagPanel" id="tagPanel">
      <el-col :span="item.type.length > 3 ? 5 : 3" v-for="(item,index) in titleList" :key="index">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand" placement="bottom-start">
            <span class="el-dropdown-link">{{item.type}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item1,index1) in item.tag" :key="index1" :command="item1">{{item1}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!--<el-col :span="3">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">正文</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="引用">引用</el-dropdown-item>
              <el-dropdown-item command="段落文字">段落文字</el-dropdown-item>
              <el-dropdown-item command="边框内容">边框内容</el-dropdown-item>
              <el-dropdown-item command="底色内容">底色内容</el-dropdown-item>
              <el-dropdown-item command="轴线/总结">轴线/总结</el-dropdown-item>
              <el-dropdown-item command="单页/卡片">单页</el-dropdown-item>
              <el-dropdown-item command="竖排">竖排</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">引导</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="分割线">分割线</el-dropdown-item>
              <el-dropdown-item command="引导关注">引导关注</el-dropdown-item>
              <el-dropdown-item command="引导阅读原文">引导阅读原文</el-dropdown-item>
              <el-dropdown-item command="引导分享">引导分享</el-dropdown-item>
              <el-dropdown-item command="引导分享">引导赞</el-dropdown-item>
              <el-dropdown-item command="二维码">二维码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">图文</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="纯图片">纯图片</el-dropdown-item>
              <el-dropdown-item command="上下图文">上下图文</el-dropdown-item>
              <el-dropdown-item command="左右图文">左右图文</el-dropdown-item>
              <el-dropdown-item command="单图">单图</el-dropdown-item>
              <el-dropdown-item command="双图">双图</el-dropdown-item>
              <el-dropdown-item command="三图">三图</el-dropdown-item>
              <el-dropdown-item command="三个以上图">三个以上图</el-dropdown-item>
              <el-dropdown-item command="背景图/信纸">背景图/信纸</el-dropdown-item>
              <el-dropdown-item command="对话">对话</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">布局</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="左右留白">左右留白</el-dropdown-item>
              <el-dropdown-item command="表格样式">表格</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">节日行业</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="教育">教育</el-dropdown-item>
              <el-dropdown-item command="活动">活动</el-dropdown-item>
              <el-dropdown-item command="电商">电商</el-dropdown-item>
              <el-dropdown-item command="视频/音频">视频/音频</el-dropdown-item>
              <el-dropdown-item command="医药">医药</el-dropdown-item>
              <el-dropdown-item command="母婴">母婴</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <el-dropdown size="mini" type="primary" :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">常用</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="简约">简约</el-dropdown-item>
              <el-dropdown-item command="背景图/信纸">背景</el-dropdown-item>
              <el-dropdown-item command="时尚">时尚</el-dropdown-item>
              <el-dropdown-item command="滑动">滑动</el-dropdown-item>
              <el-dropdown-item command="怀旧">怀旧</el-dropdown-item>
              <el-dropdown-item command="古典">古典</el-dropdown-item>
              <el-dropdown-item command="可爱">可爱</el-dropdown-item>
              <el-dropdown-item command="撕纸">撕纸</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>-->
      <el-col :span="1">
        <el-popover placement="bottom" title="全部样式" width="500" trigger="hover">
          <el-row>
            <el-col :span="6" v-for="(item,index) in hotTags" :key="index">
              <a @click="clickTag(item)" class="linkButton">{{item}}</a>
            </el-col>
          </el-row>
          <i
            class="el-icon-arrow-down el-icon--right linkButton"
            slot="reference"
            @click="showAllStyle"
          ></i>
        </el-popover>
      </el-col>
    </el-row>
    <el-row class="styleTagPanel" id="searchPanel" :gutter="0">

      <el-col :span="24">
        <el-input
          size="mini"
          placeholder="搜索样式"
          class="input-with-select"
          v-model="searchTagTxt"
          maxlength="7"
          minlength="1"
          autofocus="false"
          @keyup.enter.native="searchStyle"
        >
          <el-button size="mini" slot="append" icon="el-icon-search" @click="searchStyle"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <!-- https://www.jianshu.com/p/9b4a287e677a -->
      <div
        ref="styleDataTable"
        id="styleDataTable"
        class="styleDataTable"
      >
        <el-alert
          ref="searchAlert"
          :title="SearchMessage"
          v-show="searching"
          type="error"
          center
          show-icon
          @close="alertClose"
        ></el-alert>

        <el-table
          :data="styleData"
          :show-header="false"
          :stripe="false"
          :height="tableHeight"
          v-loadmore="loadMore"
          v-loading="pageLoading"
          :lock="false"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          empty-text=" "
        >
          <el-table-column label="样式">
            <template slot-scope="scope">
              <div
                class="styleItem"
                v-html="addEditorWrapper(scope.row.fixedHtml,scope.row.id)"
                @click="setNewHtml(addEditorWrapper(scope.row.fixedHtml,scope.row.id))"
              ></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
  };

  export default {
    data() {
      return {
        specialTags: [
          { name: "元宵", tagName: "元宵节" },
          { name: "情人节", tagName: "情人节/七夕" }
        ],
        allStyleIsVisible: false,
        pageIndex: 0,
        pageEnd: false,
        pageLoading: false,
        currentTag: "编号标题",
        searchTagTxt: "",
        searching: false,
        styleData: [

        ],
        hotTags: [

        ],
        testUrl:'http://b.bestbpk.cn',
        url:'http://b.bestbpk.cn',
        titleList:[
          {type:'标题'},
          {type:'正文'},
          {type:'引导'},
          {type:'图文'},
          {type:'布局'},
          {type:'节日行业'},
          {type:'常用'},
        ],
        classify:[]
      };
    },
    name: "StyleList",
    props: {
      contentHeight:Number
    },
    methods: {
      alertClose() {
        this.searchTagTxt = "";
        this.searching = false;

        this.resetPage("编号标题", false);

        this.loadStylePageData(0, "编号标题");
      },
      searchStyle() {
        //console.log(this.searchTagTxt);

        if (this.searchTagTxt != "") {
          this.resetPage(this.searchTagTxt, true);

          this.searching = true;

          this.loadStylePageData(0, this.searchTagTxt);
        }
      },
      resetPage(tag, isSearching) {
        this.pageEnd = false;
        this.styleData = [];
        this.pageIndex = 0;

        if (isSearching == false) {
          this.searching = false;
          this.searchTagTxt = "";
        }

        this.currentTag = tag;
      },
      loadMorePageData(newData) {
        if (
          this.styleData.length > 0 &&
          this.styleData[this.styleData.length - 1].isAlert != undefined
        ) {
          this.styleData.splice(this.styleData.length - 1, 1);
        }
        this.styleData = this.styleData.concat(newData);

        if (this.pageEnd) {
          //console.log(this.styleData[this.styleData.length - 1].isAlert);

          this.styleData = this.styleData.concat([
            {
              fixedHtml:
                '<div role="alert" class="el-alert el-alert--error"><div class="el-alert__content"><span class="el-alert__title">已加载全部数据</span></div></div>',
              isAlert: true
            }
          ]);
        }
      },
      showAllStyle() {
        this.allStyleIsVisible = !this.allStyleIsVisible;
      },
      setNewHtml(newHtml) {

        if (newHtml.indexOf("alert") == -1) {
          //console.log("点击事件");
          //console.log(newHtml);
          this.$store.commit("SetNewHtml", newHtml);

          //console.log(this.specialTags);
        }
      },
      addEditorWrapper(html, id) {
        html =
          '<section class="xb-editor" id="'+id+'" data-id="'+id+'" styleid="' +
          id +
          '">' +
          html +
          "</section>";

        return html;
      },
      loadMore() {
        //if (this.pageEnd == false) {
        this.pageIndex++;
        //console.log(this.pageIndex);

        this.loadStylePageData(this.pageIndex, this.currentTag);
        //}
      },
      loadStylePageData(page, tag) {
        var _this = this;

        //console.log(this.pageLoading);

        this.pageLoading = true;

        var apiUrl = this.getSytleAPI(page, tag);
        var message = "加载样式列表时网络异常";
        if (this.searching == true) {
          apiUrl = this.searchStyleAPI(page, tag);
          message = "搜索样式列表时网络异常";
        }

        this.axios
          .get(apiUrl)
          .then(response => {
//            console.log(response.data);

            //ToDo: 这给地方判断结束有问题
            //不能用 < 10，因为可能正好等于10
            //需要修改为API返回值判断
            if (response.data.data.list.length < 10) {
              this.pageEnd = true;
            } else {
              this.pageEnd = false;
            }
            // setTimeout(function() {
            //   _this.pageLoading = false;
            // }, 200);

            _this.pageLoading = false;

            this.loadMorePageData(response.data.data.list);
          })
          .catch(error => {
            console.log(error);
            this.$message.error(message);

            this.pageLoading = false;
          });

        if (this.hotTags.length == 0) {
          this.axios
            .get(this.getTagAPI())
            .then(response => {
              _this.hotTags = response.data.data;
            })
            .catch(error => {
              console.log(error);
              this.$message.error("加载热门标签列表时网络异常");
            });
        }
      },
      getSytleAPI(page, tag) {
        if (process.env.NODE_ENV === "development") {
          return (
            this.testUrl+"/inspection/get_edt_style?page=" + page + "&title=" + tag
          );
        } else {
          return (
            this.url+"/inspection/get_edt_style?page=" + page + "&title=" + tag
          );
        }
      },
      getTagAPI() {
        if (process.env.NODE_ENV === "development") {
          return this.testUrl+"/inspection/get_all_tag?title=所有样式";
        } else {
          return this.url+"/inspection/get_all_tag?title=所有样式";
        }
      },
      searchStyleAPI(page, tag) {
        if (process.env.NODE_ENV === "development") {
          return (
            this.testUrl+"/inspection/get_search_style?page=" +
            page +
            "&search=" +
            tag
          );
        } else {
          return (
            this.url+"/inspection/get_search_style?page=" +
            page +
            "&search=" +
            tag
          );
        }
      },
      getImageHost() {
        if (process.env.NODE_ENV === "development") {
          return "http://192.168.1.202";
        } else {
          return "https://ai.5118.com";
        }
      },
      handleCommand(command) {

        this.clickTag(command);
      },
      clickTag(tag) {

        this.resetPage(tag, false);

        this.loadStylePageData(0, tag);
      },
      getTitleListAPI() {
        if (process.env.NODE_ENV === "development") {
          return (
            this.testUrl+"/inspection/get_edt_title"
          );
        } else {
          return (
            this.url+"/inspection/get_edt_title"
          );
        }
      },
      /*getClassifyAPI(title) {
        const _this=this;
        if (process.env.NODE_ENV === "development") {
          return (
            _this.testUrl+"/inspection/get_edt_tag?title="+title
          );
        } else {
          return (
            _this.url+"/api/Styles/Search"
          );
        }
      },
      getClassify(title) {
        const _this=this;
        this.axios
          .get(this.getClassifyAPI(title))
          .then(response => {
            let data=response.data;
            if(data.status == 1){
              _this.classify=data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },*/

    },
    directives: {
      loadmore: {
        bind: function(el, binding) {
          const selectWrap = el.querySelector(".el-table__body-wrapper");

          selectWrap.addEventListener("scroll", function() {
            let sign = 500;

            const scrollDistance =
              this.scrollHeight - this.scrollTop - this.clientHeight;
            if (scrollDistance <= sign) {
              binding.value();
            }
          });
        },
        unbind: function() {
          //指令解除绑定时调用
        }
      }
    },
    created() {
      this.resetPage("编号标题", false);

      this.loadStylePageData(0, "编号标题");
    },
    computed: {
      tableHeight() {
        var searchAlertHeight = 0;
        if (this.searching == true) {
          searchAlertHeight += 33.64;
        }
        var realHeight = this.contentHeight - 168.802 - searchAlertHeight;
        return realHeight;
      },
      SearchMessage() {
        return "您正在搜索“" + this.searchTagTxt + "”相关的样式";
      },
      ...mapGetters(["searchStyleCount", "searchStyleID"])
    },
    watch: {
      searchStyleCount: {
        handler: function() {
          //console.log(this.searchStyleID);
          this.searchTagTxt = this.searchStyleID;
          this.searchStyle();
        }
      }
    },
    mounted(){
      const _this=this;

      this.axios
        .get(this.getTitleListAPI())
        .then(response => {
          let data=response.data;
//          this.hotTags = response.data;
          if(data.status == 1){
            _this.titleList=data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
</script>

<style>
  .styleItem {
    max-width: 347px !important;
    box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    word-wrap: break-word !important;
    cursor: pointer;
    overflow: visible;
    line-height: 1.6;
    font-size: unset !important;

    -webkit-max-logical-width: 100%;
    margin: 0;
  }

  .styleItem img {
    max-width: 100% !important;
  }

  .styleItem div {
    max-width: 100% !important;
  }

  .styleItem section {
    max-width: 100% !important;
  }

  .el-dropdown-link {
    font-size: 14px;
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-icon--right {
    font-size: 10px;
  }
  .styleTagPanel:first-child{
    border-top: 1px solid #e6e6e6;
  }
  .styleTagPanel {
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px dashed #e6e6e6;
  }

  .el-card__header {
    padding: 5px;
  }

  .el-alert {
    padding: 5px 0px 5px 0px !important;
    border-radius: 0px !important;
  }

  .styleDataTable {
    border-left: 1px solid #e6e6e6;
  }

  .linkButton {
    cursor: pointer;
  }

  .el-table .cell {
    line-height: normal !important;
    overflow: visible !important;
  }

</style>



// WEBPACK FOOTER //
// src/components/StyleList.vue

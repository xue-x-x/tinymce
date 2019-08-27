<template>
  <!--<someComponent></someComponent>-->
  <div>
    <el-row class="style-section">
      <el-col :span="3">
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">标题</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="编号标题">编号标题</el-dropdown-item>
              <el-dropdown-item command="框线标题">框线标题</el-dropdown-item>
              <el-dropdown-item command="底色标题">底色标题</el-dropdown-item>
              <el-dropdown-item command="图片标题">图片标题</el-dropdown-item>
              <el-dropdown-item command="纯序号">纯序号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">正文</span>
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
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">引导</span>
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
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">图文</span>
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
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">布局</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="左右留白">左右留白</el-dropdown-item>
              <el-dropdown-item command="表格样式">表格</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">节日行业</span>
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
        <div class="dropdown-list">
          <el-dropdown size="mini" type="primary" :hide-on-click="false">
            <span class="el-dropdown-title fs_14">常用</span>
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
      </el-col>
      <el-col :span="1">
        <el-popover placement="bottom" title="全部样式" width="500" trigger="hover">
          <el-row>
            <!--<el-col :span="6" v-for="{id,name} in hotTags" :key="id">-->
            <!--<a @click="clickTag(name)" class="linkButton">{{name}}</a>-->
            <!--</el-col>-->
          </el-row>
          <i
            class="el-icon-arrow-down el-icon--right linkButton"
            slot="reference"
          ></i>
        </el-popover>
      </el-col>
    </el-row>
    <el-row  class="style-section" id="searchPanel" :gutter="0">
      <el-col :span="24">
        <el-input
          size="mini"
          placeholder="搜索样式"
          class="input-with-select"
          maxlength="7"
          minlength="1"
          autofocus="false"
        >
          <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //import someComponent from './someComponent'
  export default {
    props: {
      clientHeight: String,
    },
    data() {
      return {}
    },
    methods:{

    },
    component: {
      //someComponent
    }
  }
</script>

<style scoped>
  .style-section{
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
    /*border-right: 1px solid #e6e6e6;*/
  }
  .el-dropdown-title{
    cursor: pointer;
    color: #409eff;
  }
</style>

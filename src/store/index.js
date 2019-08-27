import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    insertHtml: '',
    insertCount: 0,
    searchStyleID: 0,
    searchStyleCount: 0,
    insertArticleImage: '',
    insertArticleImageCount: 0,
    insertArticleHtml: '',
    insertArticleHtmlCount: 0,
    insertNewImageTemplateID: 0,
    insertNewImageTemplateWidth: 0,
    insertNewImageTemplateHeight: 0,
    insertNewImageTemplateCount: 0
  },
  mutations: {
    SetNewHtml(state, newHtml) {
      state.insertHtml = newHtml;

      state.insertCount += 1;

      //console.log("存储:" + state.insertCount);
    },
    SetSearchStyleID(state, searchStyleID) {
      state.searchStyleID = searchStyleID;

      state.searchStyleCount += 1;

      //console.log("存储:" + state.searchStyleID);
    },
    SetNewArticleImage(state, iamgeSrc) {
      state.insertArticleImage = iamgeSrc;

      state.insertArticleImageCount += 1;
    },
    SetNewArticleHtml(state, newHtml) {
      state.insertArticleHtml = newHtml;

      state.insertArticleHtmlCount += 1;

    },
    SetNewImageTemplate(state, templateState) {
      // console.log(templateState.id);
      // console.log(templateState.width);
      // console.log(templateState.height);
      state.insertNewImageTemplateID = templateState.id;
      state.insertNewImageTemplateWidth = templateState.width;
      state.insertNewImageTemplateHeight = templateState.height;
      state.insertNewImageTemplateCount += 1;

      //console.log("存储:" + state.insertCount);
    }
  },
  getters: {
    insertHtml: state => state.insertHtml,
    insertCount: state => state.insertCount,
    searchStyleID: state => state.searchStyleID,
    searchStyleCount: state => state.searchStyleCount,
    insertArticleImage: state => state.insertArticleImage,
    insertArticleImageCount: state => state.insertArticleImageCount,
    insertArticleHtml: state => state.insertArticleHtml,
    insertArticleHtmlCount: state => state.insertArticleHtmlCount,
    insertNewImageTemplateID: state => state.insertNewImageTemplateID,
    insertNewImageTemplateWidth: state => state.insertNewImageTemplateWidth,
    insertNewImageTemplateHeight: state => state.insertNewImageTemplateHeight,
    insertNewImageTemplateCount: state => state.insertNewImageTemplateCount,
  }
})

export default store


// WEBPACK FOOTER //
// ./src/vuex/store.js

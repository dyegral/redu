<template>
  <!-- 点击 游客浏览 进来的页面 -->
  <div id="index">
    <div class="top-fixed">
      <TabTop @clickTab="clickTab" class="tab-top"></TabTop>
    </div>
    <div class="content">
      <ItemNews
        v-for="(item, index) in allNewsObj[tag]"
        :key="index"
        :detail="item"
        :signature="signature"
      ></ItemNews>
      <div class="loading" @click="getMore">{{ allNewsObj[tag].length === 0 ? 'loading' : '加载更多'}}</div>
    </div>
    <div class="to-top">
      <img src="../../static/images/top.png" alt @click="toTop" />
    </div>
  </div>
</template>

<script>
import TabTop from "./TabTop";
import ItemNews from "./ItemNews";

import axios from "axios";

export default {
  components: {
    TabTop,
    ItemNews
  },
  data() {
    return {
      tag: "__all__",// 当前显示的类别
      as: "",
      cp: "",
      signature: "",
      allNewsObj: {
        __all__: [],
        news_hot: [],
        news_society: [],
        news_entertainment: [],
        news_tech: [],
        news_military: [],
        news_sports: [],
        news_car: [],
        news_finance: [],
        news_world: [],
        news_fashion: [],
        news_travel: [],
        news_discovery: [],
        news_baby: [],
        news_regimen: [],
        news_story: [],
        news_essay: [],
        news_game: [],
        news_history: [],
        news_food: []
      }
    };
  },
  methods: {
    clickTab(tag) {
      //子组件通信
      this.tag = tag;

      if (this.allNewsObj[tag].length === 0) {
        this.getTagData(
          tag,
          this.as,
          this.cp,
          this.signature
        );
      }
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    getMore() {
      if (this.allNewsObj[this.tag].length !== 0) {
        this.getTagData(this.tag, this.as, this.cp, this.signature);
      }
    },
    // 请求某一类别的内容,并添加到allNewsObj中
    getTagData(tag, as, cp, signature) {
      let that = this;
      axios
        .get(
          `http://zzzia.net:8080/toutiao/cross?url=https://m.toutiao.com/list/?ac=wap&format=json_raw&tag=${tag}&as=${as}&cp=${cp}&_signature=${signature}`
        )
        .then(function(res) {
          //返回的数据都在res.data里面
          that.allNewsObj[tag].push(...res.data.info.data);
        })
        .catch(function() {});
    }
  },
  created() {
    let that = this;
    //请求3个加密信息
    axios
      .get("http://zzzia.net:8080/toutiao/init")
      .then(function(res) {
        //返回的数据都在res.data里面
        // console.log(res.data);
        if (res.data.status == 200) {
          that.as = res.data.info.as;
          that.cp = res.data.info.cp;
          that.signature = res.data.info._signature;
        }

        //请求列表内容
        that.getTagData(that.tag, that.as, that.cp, that.signature);
      })
      .catch(function() {});
  }
};
</script>

<style scoped>
.top-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.content {
  padding: 0 0.5rem;
  margin-top: 2.6rem;
}

.loading {
  height: 4rem;
  text-align: center;
  line-height: 4rem;
}

.to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
}
.to-top img {
  width: 100%;
  height: 100%;
}
</style>
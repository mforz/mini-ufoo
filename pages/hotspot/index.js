//index.js
//获取应用实例
const { hotspot } = require("../../utils/state");
const { replaceNumber } = require("../../utils/util");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch: FetchHotspot } = useFetchRequest();

Page({
  data: {
    initList: [...hotspot],
    initState: {},
    radio: 0.7,
    current: 0,
  },

  onLoad: function () {
    const { initList } = this.data;
    initList.forEach((item) => {
      this.getFetchHotspot(item);
    });
  },

  getFetchHotspot(item) {
    FetchHotspot({
      url: item.url,
      callback: (res) => {
        let list = [];
        const data = res.data;
        item.key === "zhihu" && (list = data.data);
        item.key === "weibo" && (list = data.data.data.data);
        item.key === "baidu" && (list = data.result.topwords);
        list && list.length && this.setHotspotList(list, item.key);
      },
    });
  },

  setHotspotList(potlist, key) {
    const { initState } = this.data;
    const hots = { ...initState };
    key === "baidu" &&
      (hots[key] = potlist.map((i) => ({
        name: i.keyword,
        hot: replaceNumber(i.searches),
      })));
    key === "weibo" &&
      (hots[key] = potlist.map((i) => ({
        name: i.word,
        hot: replaceNumber(i.num),
      })));
    key === "zhihu" &&
      (hots[key] = potlist.map((i) => ({
        name: i.target.title,
        hot: replaceNumber(i.detail_text, "万热度", "w"),
        target: i.target,
        img: i.children[0] && i.children[0].thumbnail,
      })));

    this.setData({ initState: { ...hots } });
  },
});

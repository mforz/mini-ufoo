//index.js
//获取应用实例
// const { hotspot } = require("../../utils/state");
const useFetchRequest = require("../../utils/request");
// const iptvs = require("../../utils/iptv.json");
import iptvs from '../../utils/iptv.js'
const { apis, useFetchRef, state, fetch: FetchIptv } = useFetchRequest();

/**
 *  television
 *  play
 */
Page({
  data: {
    play: "",
    radio: 0.6,
    current: 0,
    initList: [],
  },

  onLoad: function () { 
  },
  onScrollTap: function (e) {
    const params = e.detail.params;
    this.setData({ play: params.playUrl });
  },
  getFetchIptv() {
    this.setData({ initList: iptvs.data });
    // FetchIptv({
    //   url: "iptv",
    //   callback: (res) => {
    //     res.data.data && this.setData({ initList: iptvs });
    //   },
    // });
  },

  setIptvList(tvlist, key) {
    const { initList } = this.data;
    const tvs = { ...initList };
    this.setData({ initList: { ...tvs } });
  },

  onMenusTap(e){
    console.log(e)
  }
});

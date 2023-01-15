<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchQuery.categoryName">
              {{ searchQuery.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchQuery.keyword">
              {{ searchQuery.keyword }} <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchQuery.trademark">
              {{ searchQuery.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-show="searchQuery.props"
              v-for="(prop, index) in searchQuery.props"
              :key="index"
            >
              {{ prop.split(":")[1] }} <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <Selector
          @searchTrademark="searchTrademark"
          @searchAttrValue="searchAttrValue"
          :trademark-list="searchData.trademarkList"
          :attrs-list="searchData.attrsList"
        />

        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{ active: isTopOrder }" @click="orderTab('1')">
                <a href="javascript:void(0);"
                  >综合
                  <i
                    class="iconfont"
                    :class="{
                      'icon-shang--jiantou': isTopOrder & isAsc,
                      'icon-xia--jiantou': isTopOrder & isDesc,
                    }"
                  ></i>
                </a>
              </li>
              <li :class="{ active: isPriceOrder }" @click="orderTab('2')">
                <a href="javascript:void(0);"
                  >价格
                  <i
                    class="iconfont"
                    :class="{
                      'icon-shang--jiantou': isPriceOrder & isAsc,
                      'icon-xia--jiantou': isPriceOrder & isDesc,
                    }"
                  ></i
                ></a>
              </li>
            </ul>
          </div>
        </div>

        <!--details-->
        <GoodsList :goodsList="searchData.goodsList" />

        <!-- 引入分页组件 -->
        <Pagenation />

        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="@/assets/images/search/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="@/assets/images/search/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="@/assets/images/search/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="@/assets/images/search/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Selector from "@/pages/search/Selector";
import GoodsList from "@/pages/search/GoodsList";

export default {
  name: "Search",
  components: { Selector, GoodsList },
  data() {
    return {
      searchQuery: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    ...mapState({ searchData: (state) => state.search.searchData }),
    isTopOrder() {
      return this.searchQuery.order.split(":")[0] === "1";
    },
    isPriceOrder() {
      return this.searchQuery.order.split(":")[0] === "2";
    },
    isAsc() {
      return this.searchQuery.order.split(":")[1] === "asc";
    },
    isDesc() {
      return this.searchQuery.order.split(":")[1] === "desc";
    },
  },
  mounted() {
    this.getSearchData();
  },
  watch: {
    // 监听路由是否发生变化
    $route() {
      this.getSearchData();
    },
  },
  methods: {
    getSearchData() {
      Object.assign(this.searchQuery, this.$route.query, this.$route.params);
      this.$store.dispatch("getSearchData", this.searchQuery);
      this.searchQuery.category1Id = undefined;
      this.searchQuery.category2Id = undefined;
      this.searchQuery.category3Id = undefined;
    },
    removeCategoryName() {
      this.searchQuery.categoryName = undefined;
      this.searchQuery.category1Id = undefined;
      this.searchQuery.category2Id = undefined;
      this.searchQuery.category3Id = undefined;
      // 路由query参数置空
      this.$router.push({
        name: "search",
        query: {},
        params: this.$route.params,
      });
    },
    removeKeyword() {
      this.searchQuery.keyword = undefined;
      // 发送全局事件bus，通知搜索框将keyword置空
      this.$bus.$emit("resetKeyword");
      // 路由params参数置空
      this.$router.push({
        name: "search",
        query: this.$route.query,
        params: {},
      });
    },
    removeTrademark() {
      this.searchQuery.trademark = "";
      this.getSearchData();
    },
    removeAttr(index) {
      // 删除对应下标的元素
      this.searchQuery.props.splice(index, 1);
      this.getSearchData();
    },
    searchTrademark(data) {
      this.searchQuery.trademark = data;
      this.getSearchData();
    },
    searchAttrValue(data) {
      // 对props进行去重
      if (this.searchQuery.props.indexOf(data) === -1) {
        this.searchQuery.props.push(data);
        this.getSearchData();
      }
    },
    // 排序tab切换
    orderTab(newVal) {
      const orderArr = this.searchQuery.order.split(":");
      if (newVal !== orderArr[0]) {
        this.searchQuery.order = `${newVal}:desc`;
      } else {
        // 切换排序
        if (orderArr[1] === "asc") {
          this.searchQuery.order = `${orderArr[0]}:desc`;
        } else {
          this.searchQuery.order = `${orderArr[0]}:asc`;
        }
      }
      this.getSearchData()
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .sui-navbar {
      overflow: visible;
      margin-bottom: 0;
      .filter {
        min-height: 40px;
        padding-right: 20px;
        background: #fbfbfb;
        border: 1px solid #e2e2e2;
        padding-left: 0;
        border-radius: 0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
        .sui-nav {
          position: relative;
          left: 0;
          display: block;
          float: left;
          margin: 0 10px 0 0;
          .icon-shang--jiantou {
            font-size: 13px;
          }
          .icon-xia--jiantou {
            font-size: 13px;
          }
          li {
            float: left;
            line-height: 18px;
            a {
              display: block;
              cursor: pointer;
              padding: 11px 15px;
              color: #777;
              text-decoration: none;
            }
            &.active {
              a {
                background: #e1251b;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>

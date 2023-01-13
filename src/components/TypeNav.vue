<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHandler" @mouseenter="enterHandler">
        <h2 class="all">全部商品分类</h2>
        <transition>
          <div v-show="show" class="sort">
            <div @click="routeJump" class="all-sort-list2">
              <div v-for="(c1, index) in categoryList" :key="c1.categoryId" class="item">
                <h3 @mouseenter="activeSelected(index)" :class="{ active: index === currentIndex }">
                  <a :data-category-name="c1.categoryName" :data-category-id_1="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl v-for="c2 in c1.categoryChild" :key="c2.categoryId" class="fore">
                      <dt>
                        <a :data-category-name="c2.categoryName" :data-category-id_2="c2.categoryId"
                          >{{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category-name="c3.categoryName" :data-category-id_3="c3.categoryId"
                            >{{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
      routeName: this.$route.name,
    };
  },
  computed: {
    ...mapState({
      // 使用对象写法，右侧需要返回一个函数
      categoryList: (state) => state.home.categoryList,
    }),
  },
  created() {
    // 判断路由
    if (this.routeName === "search") {
      this.show = false;
    }
  },
  methods: {
    // 使用节流函数,throttle函数不要用箭头函数，否则this指向将不再是vc实例
    activeSelected: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    routeJump(event) {
      const data = event.target.dataset;
      if (data.categoryName) {
        // 说明点击的就是目标路由跳转元素
        let location = { name: "search" };
        let query = { categoryName: data.categoryName };
        if (data.categoryId_1) {
          // 一级菜单
          query.category1Id = data.categoryId_1;
        } else if (data.categoryId_2) {
          // 二级菜单
          query.category2Id = data.categoryId_2;
        } else {
          // 三级菜单
          query.category3Id = data.categoryId_3;
        }
        // 判断路由上 params参数是否存在
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 合并请求参数
        location.query = query;
        this.$router.push(location);
      }
    },
    enterHandler() {
      if (this.routeName === "search") {
        this.show = true;
      }
    },
    leaveHandler() {
      this.currentIndex = -1;
      // 判断路由
      if (this.routeName === "search") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .active {
            background-color: #e1251b;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }

    // 过渡动画css需要写在 v-show/v-if指令 所在的class属性下方
    .v-enter {
      height: 0;
    }

    .v-enter-to {
      height: 461px;
    }

    .v-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>

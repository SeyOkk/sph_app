<template>
  <div v-if="total !== 0" class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li v-show="pageNo > 1" class="prev disabled" @click="clickPrePage">
          <a href="javascript:void(0);">«上一页</a>
        </li>

        <li
          v-for="(item, index) in pageItems"
          :key="index"
          @click="clickPage(item)"
          :class="{ active: pageNo === item }"
        >
          <a href="javascript:void(0);"> {{ item }} </a>
        </li>

        <li class="next" v-show="pageNo < totalPage" @click="clickNextPage">
          <a href="javascript:void(0);">下一页»</a>
        </li>
      </ul>
      <div class="total-page">
        <span>共 {{ totalPage }} 页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      // default: 0,
    },
  },
  data() {
    return {
      // 分页元素连续数组
      pageItems: [],
    };
  },
  computed: {
    // 计算当前总计多少页
    totalPage() {
      return this.total % this.pageSize === 0 ? this.total / this.pageSize : Math.floor(this.total / this.pageSize) + 1;
    },
  },
  watch: {
    total() {
      this.handlerPage();
    },
    pageNo() {
      this.handlerPage();
    },
  },
  methods: {
    handlerPage() {
      // 清空pageItems
      this.pageItems = [];
      if (this.totalPage < 8) {
        // 直接分页元素放入pageItems中
        for (let i = 1; i <= this.totalPage; i++) {
          this.pageItems.push(i);
        }
      } else {
        if (this.pageNo < 5) {
          for (let i = 1; i <= 6; i++) {
            this.pageItems.push(i);
          }
          this.pageItems.push("...");
          this.pageItems.push(this.totalPage);
        } else {
          if (this.pageNo + 3 < this.totalPage) {
            this.pageItems.push(1);
            this.pageItems.push("...");

            for (let j = this.pageNo - 2; j <= this.pageNo + 2; j++) {
              this.pageItems.push(j);
            }

            this.pageItems.push("...");
            this.pageItems.push(this.totalPage);
          } else {
            this.pageItems.push(1);
            this.pageItems.push("...");
            for (let k = this.totalPage - 5; k <= this.totalPage; k++) {
              this.pageItems.push(k);
            }
          }
        }
      }
    },
    clickPage(pageNum) {
      if (typeof pageNum === "number") {
        this.$emit("pageNoChange", pageNum);
      }
    },
    clickPrePage() {
      if (this.pageNo > 1) {
        this.$emit("pageNoPre");
      }
    },
    clickNextPage() {
      if (this.pageNo < this.totalPage) {
        this.$emit("pageNoNext");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  //width: 733px;
  height: 66px;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  .sui-pagination {
    margin: 13px 0;
    ul {
      margin-left: 0;
      margin-right: 20px;
      margin-bottom: 0;
      vertical-align: middle;
      // width: 490px;
      float: left;
      li {
        margin-left: 5px;
        line-height: 18px;
        display: inline-block;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            //color: #999;
            cursor: default;
          }
        }
        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    .total-page {
      display: flex;
      align-items: center;
      height: 100%;
      color: #333;
      font-size: 14px;
    }
  }
}
</style>

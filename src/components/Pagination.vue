<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev" @click="$emit('prePage')" v-show="pageNo !== 1">
          <a href="#">«上一页</a>
        </li>

        <li v-if="handlerContinuesPage.start !== 1" @click="$emit('jumpPage', 1)">
          <a href="#">1</a>
        </li>
        <li v-if="isShowFirst" class="dotted"><span>...</span></li>

        <li v-for="(count, index) in handlerContinuesPage.end" :key="index"
            v-show="handlerContinuesPage.start <= count"
            :class="{active: pageNo === count}" @click="$emit('jumpPage', count)">
          <a href="#"> {{ count }} </a>
        </li>

        <li v-if="isShowEnd" class="dotted"><span>...</span></li>
        <li v-if="handlerContinuesPage.end !== totalPage" @click="$emit('jumpPage', totalPage)">
          <a href="#"> {{ totalPage }} </a>
        </li>

        <li class="next" @click="$emit('nextPage')" v-show="pageNo !== totalPage">
          <a href="#">下一页»</a>
        </li>
      </ul>
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
    },
    continues: {
      type: Number,
      default: 5
    },
  },
  computed: {
    // 计算当前总计多少页
    totalPage() {
      return this.total % this.pageSize === 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize);
    },
    // 计算连续的起始和结束页码
    handlerContinuesPage() {
      let start = 0, end = 0

      // 判断连续页码数 是否 大于 总页数
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        const intervalCount = Math.floor(this.continues / 2)
        start = this.pageNo - intervalCount
        end = this.pageNo + intervalCount
        // 处理start
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 处理end
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continues + 1
        }
      }
      return {start, end}
    },
    isShowFirst() {
      return this.pageNo > Math.ceil(this.continues / 2) + 1
    },
    isShowEnd() {
      return this.pageNo < this.totalPage - Math.ceil(this.continues / 2)
    }
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

<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <a href="javascript:void(0);">«上一页</a>
        </li>
        <li>
          <a href="#">1</a>
        </li>
        <li>
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li>
        <li>
          <a href="#">4</a>
        </li>
        <li>
          <a href="#">5</a>
        </li>
        <li>
          <a href="#">尾页</a>
        </li>
        <li class="dotted"><span>...</span></li>
        <li class="next">
          <a href="javascript:void(0);">下一页»</a>
        </li>
      </ul>
      <div class="total-page"><span>共 {{totalPage}} 页&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  computed: {
    startIndex() {
      if (this.totalPage - this.pageNo >= 5) {
        //
      } else {
      }
    }
  }
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
      margin-bottom: 0;
      vertical-align: middle;
      width: 490px;
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
      width: 241px;
    }
  }
}
</style>

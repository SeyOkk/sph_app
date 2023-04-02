<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="cart in getCartInfoList" :key="cart.id" class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" @change="updateCheckState(cart.skuId, $event.target.checked)" :checked="cart.isChecked === 1">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="throttleChangeSkuNum('mins', cart.skuId, cart.skuNum)">-</a>
            <input class="itxt" @input="throttleChangeSkuNum('input', cart.skuId, $event.target.value, cart.skuNum)"
                   autocomplete="off" type="text" :value="cart.skuNum">
            <a class="plus" @click="throttleChangeSkuNum('plus', cart.skuId, cart.skuNum)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="removeCart(cart.skuId)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="updateAllCheckState($event.target.checked)" :checked="allChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ totalCheckedNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import throttle from 'lodash/throttle'

export default {
  name: 'ShopCart',
  mounted() {
    this.getCartList()
  },
  computed: {
    ...mapGetters(['getCartInfoList']),
    totalPrice() {
      return this.getCartInfoList
          .filter(item => item.isChecked === 1)
          .map(item => item.skuPrice * item.skuNum)
          .reduce((a, b) => a + b, 0)
    },
    allChecked() {
      return this.getCartInfoList.every(item => item.isChecked === 1) && this.getCartInfoList.length > 0
    },
    totalCheckedNum() {
      return this.getCartInfoList.filter(item => item.isChecked === 1).length
    }
  },
  methods: {
    ...mapActions(['getCartList', "saveShopCart", "removeShopCart", "changeCheckCart"]),
    // 改变商品数量,使用节流
    throttleChangeSkuNum: throttle(function (type, skuId, inputSkuNum, skuNum) {
      // skuNum合法性校验，非整数、负数、小数 都不会发请求更新skuNum
      inputSkuNum = inputSkuNum * 1
      if (isNaN(inputSkuNum) || inputSkuNum % 1 !== 0) inputSkuNum = 0
      // 变更的商品数量
      switch (type) {
        case 'mins':
          inputSkuNum = (inputSkuNum === 0 || inputSkuNum <= 1) ? 0 : -1
          break
        case 'plus':
          inputSkuNum = inputSkuNum !== 0 ? 1 : 0
          break
        case 'input':
          inputSkuNum = (inputSkuNum <= 0 || inputSkuNum - skuNum === 0) ? 0 : inputSkuNum - skuNum
          break
      }
      try {
        if (inputSkuNum !== 0) {
          this.updateShopCart(skuId, inputSkuNum)
        }
      } catch (e) {
        alert(e.messages)
      }
    }, 1000),
    async updateShopCart(skuId, skuNum) {
      await this.saveShopCart({skuId, skuNum})
      this.getCartList()
    },
    // 移除商品
    async removeCart(skuId) {
      try {
        await this.removeShopCart({skuId})
        this.getCartList()
      } catch (e) {
        alert(e.messages)
      }
    },
    // 变更商品选中状态
    async updateCheckState(skuId, checked) {
      checked = checked ? "1" : "0"
      try {
        await this.changeCheckCart({skuId, isChecked: checked})
        this.getCartList()
      } catch (e) {
        console.log(e.messages);
      }
    },
    // 变更所有商品的选中状态
    updateAllCheckState(checked) {
      const isChecked = checked ? "1" : "0"
      this.getCartInfoList.forEach(item => {
        if (item.isChecked !== isChecked) {
          this.updateCheckState(item.skuId, checked)
        }
      })
    },
    // 删除所有选中的商品
    deleteAllChecked() {
      this.getCartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          this.removeCart(item.skuId)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
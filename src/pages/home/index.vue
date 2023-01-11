<template>
  <div>
    <TypeNav />

    <ListContainer />

    <Recommend />

    <Rank />

    <Like />

    <Floor />

    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
};
</script>

<style lang="less" scoped></style>

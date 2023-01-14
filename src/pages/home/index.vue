<template>
  <div>
    <TypeNav />

    <ListContainer />

    <Recommend />

    <Rank />

    <Like />

    <Floor v-for="floor in floors" :floor="floor" :key="floor.id" />

    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";

import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
    ...mapState({ floors: (state) => state.home.floors }),
  },
};
</script>

<style lang="less" scoped></style>

<template>
  <div class="filters__field filter">
    <label class="filters__label" for="search">
      <span class="filters__label-text">Search</span>
      <input
        v-model="query"
        @change="handleClick"
        class="filters__input filters__input--search input"
        id="search"
        placeholder="Enter search query"
        type="text"
      />
    </label>
  </div>
</template>
<script>
export default {
  name: "FilterInput",
  props: {
    selectName: String,
    setFilter: Function,
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    handleClick() {
      this.setFilter("q", this.query.trim());
    },
  },
};
</script>
<style>
label {
  user-select: none;
}
.filters__label-text {
  display: block;
}
.filters__input {
  width: 200px;
}

.input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}
</style>

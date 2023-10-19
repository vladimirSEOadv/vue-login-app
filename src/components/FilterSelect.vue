<template>
  <div class="filters__field filter">
    <label class="filters__label" :for="selectName">
      <span class="filters__label-text">{{ selectName }}</span>
    </label>
    <select
      v-model="selectedOption"
      class="filters__input input"
      :id="selectName"
      @change="handleFilterChange(selectedOption)"
    >
      <option>All</option>
      <option v-for="value in selectOptions" :value="value" :key="value">
        {{ value }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "FilterTodo",
  props: {
    selectName: String,
    selectOptions: Array,
    setFilter: Function,
  },
  data() {
    return {
      selectedOption: "All",
    };
  },
  methods: {
    handleFilterChange(option) {
      this.setFilter(this.selectName, option);
    },
  },
};
</script>
<style>
label {
  user-select: none;
}

.input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}

.filters__label {
  padding-bottom: 5px;
}

.filters__label-text {
  display: block;
}

.filters__input {
  width: 200px;
}
</style>

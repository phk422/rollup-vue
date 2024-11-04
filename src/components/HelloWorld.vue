<template>
  <h1>HelloWorld Rollup! -> 随机数：{{ getNumber() }}</h1>
</template>

<script setup>
import { getNumber } from "@/utils";
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

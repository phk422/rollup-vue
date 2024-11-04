<template>
  <h2 class="red">{{ msg }}</h2>
  <HelloWorld></HelloWorld>
  <button @click="msg = 'Hello Vue 3 + rollup2222'">Change Message</button>
  <hr />
  <component :is="LazyCpnAsync" />
  <button @click="loadLazyCpn">显示LazyCpn</button>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

const msg = ref("Hello Vue 3 + rollup");

const LazyCpnAsync = ref();

function loadLazyCpn() {
  if (LazyCpnAsync.value) return;
  // 这里会懒加载该组件
  LazyCpnAsync.value = defineAsyncComponent(() =>
    import("@/components/LazyCpn.vue")
  );
}
</script>

<style scoped>
.red {
  color: red;
}
</style>

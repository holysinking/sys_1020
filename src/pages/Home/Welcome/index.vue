<template>
  <h1>Welcome</h1>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  methods: {
    send() {
      getLoginLog(this).then(res => {
        console.log(res);
      });
    },
    abort() {
      if (typeof this.cancel === "function") {
        this.cancel();
      }
    }
  }
};
</script>

<template>
  <div>
    <!--<div v-on:click="logoutPopup">Logout Popup</div>--->
    <div class=" cursor-pointer" v-on:click="logoutRedirect">Logout</div>
  </div>
</template>

<script setup lang="ts">
import { useMsal } from '../../infrastructure/composition-api/useMsal';

const { instance } = useMsal();

/* const logoutPopup = () => {
  instance.logoutPopup({
    mainWindowRedirectUri: "/"
  });
} */

const logoutRedirect = () => {
  instance.logoutRedirect();
}
</script>

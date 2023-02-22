<template>
<div> 
  <div v-on:click="loginRedirect" class=" cursor-pointer ">Sign In</div>
  <!--<div v-on:click="loginPopup">Login Popup</div>--->
</div>

</template>

<script setup lang="ts">
import { useMsal } from '../../infrastructure/composition-api/useMsal';
import { loginRequest } from "../../infrastructure/authConfig";

const { instance } = useMsal();

const loginPopup = () => {
  instance.loginPopup(loginRequest);
}
    
const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
}
</script>

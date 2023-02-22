<template>
<div> 
  <div v-on:click="loginRedirect" class="flex justify-center cursor-pointer p-4 text-[#2e54a5] bg-slate-200 rounded-xl shadow-lg mt-2">
    <img src="https://www.uml.edu/Images/uml_vertical_logo_no_tagline_tcm18-59064.png?w=l" class="h-20">
    <span class="ml-5 text-xl w-full m-auto text-center"> Sign on with your UML Credentials <br> Single Sign-On</span>
  </div>
  <div class="mt-2"><small>Azure Active Directory Integration</small></div>
</div>

</template>

<script setup lang="ts">
import { useMsal } from '../../infrastructure/composition-api/useMsal';
import { loginRequest } from "../../infrastructure/authConfig";

const { instance } = useMsal();
    
const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
}
</script>

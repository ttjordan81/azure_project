<template>
  <div>
    <NavBar />

    <div class="flex flex-col md:flex-row text-left">


      <div class="bg-[#2e54a5] shadow-xl h-16 fixed bottom-0  md:relative md:h-screen z-10 w-full md:w-48">

        <div
          class="md:mt-20 md:w-48 md:fixed md:left-0 md:top-0 md:content-start text-left justify-between">
          <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li class="mr-3 flex-1">
              <router-link to="/"   class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2  hover:border-gray-500">
                <i class="fas fa-tasks pr-0 md:pr-3"></i><span
                  class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Papers</span>
              </router-link>              
            </li>
            <li class="mr-3 flex-1">
              <router-link to="/upload-paper"   class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2  hover:border-gray-500">
                <i class="fas fa-tasks pr-0 md:pr-3"></i><span
                  class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Upload</span>
              </router-link>  
            </li>

          </ul>
        </div>


      </div>

      <div class="main-content w-full ">
        <router-view />
      </div>
    </div>

 
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>

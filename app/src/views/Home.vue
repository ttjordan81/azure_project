<template>
  <div>


    <div v-if="!isAuthenticated"  class="flex p-5 mt-20">
      <div class="w-full md:w-1/2 xl:w-1/3 p-6">
        <h3 class="font-bold">Please sign-in to see Clould Computing Alumni Papers.</h3>
        <SignInHomeButton />
      </div>
    </div>

    <div v-else class="flex p-5 mt-20">

      <div class="w-full overflow-y-auto text-left">
        <h1 class="mb-5 text-xl border-b-2 border-[#2e54a5] pb-3">Alumni Papers and Collections</h1>
        <div class="grid mb-5 gap-2">
          <p>You will find papers students wrote in the Cloud Compute course taken at UML. These papers are a collection of past students' works that you can use as a resource for your professional work.</p>

          <p>If you would like to share your paper for other classmates, please <router-link to="/upload-paper" class=" underline">Upload</router-link>  your paper.</p>
        </div>
        <div class="relative overflow-x-auto">
          <div class="grid grid-cols-2 justify-items-stretch"> 
            <p class="justify-self-start mt-4 font-bold">UML: MSIT 5650 — Bob Bell, Senior Adjunct Professor — Cloud Computing</p>
            <router-link to="/upload-paper" class=" underline justify-self-end"><svg-icon type="mdi" :path="mdiFilePlus" size="40" class="mb-2"/></router-link>
          </div>
          <table class="w-full text-sm">
            <thead class="text-xs text-white uppercase bg-[#2e54a5] border-gray shadow-lg">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Alumni Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Paper Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(paper, index) in papers" :key="index"
                class="bg-white border-b ">
                <td class="px-6 py-4">{{ index }}</td>
                <td class="px-6 py-4">
                  <a :href="paper.url" target="_blank" class=" underline">{{ paper.student_name }}</a>
                </td>
                <td class="px-6 py-4">
                  {{ paper.title }}
                </td>
                <td class="px-6 py-4">
                  {{ paper.description }}
                </td>
                <td class="px-6 py-4">
                  <a :href="paper.url" target="_blank"><svg-icon type="mdi" :path="mdiOpenInNew" size="30" class="mb-2"/></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { useIsAuthenticated } from "../../infrastructure/composition-api/useIsAuthenticated";
import { defineComponent, onMounted, reactive, ref } from 'vue';
import SignInHomeButton from "./../components/SignInHomeButton.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFilePlus, mdiOpenInNew } from '@mdi/js';

export default {
  methods: {
  },
  components: {
    SignInHomeButton,
		SvgIcon
    },
  data() {
    return {
      isAuthenticated: useIsAuthenticated(),
      papers: [],
      mdiFilePlus: mdiFilePlus,
      mdiOpenInNew: mdiOpenInNew,
    }
  },
  mounted() {

    this.papers = axios
      .get('http://lively-meadow-0c02fb810.2.azurestaticapps.net/api/get-survey')
      .then((response) => {
        this.papers = response.data.value
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>
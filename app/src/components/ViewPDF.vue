<template>
    <div>
      <div v-if="!isAuthenticated" class="">
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
          <h3 class="font-bold pl-2">Please sign-in to see your profile information.</h3>
  
        </div>
      </div>
  
      <div v-else class="flex">
        <div class="w-1/4 bg-slate-400 h-screen overflow-y-auto pt-20 text-left">
          test
        </div>
        <div class="w-3/4 border bg-slate-400 h-[700px] overflow-y-auto overflow-x-hidden">
          <h2>Student Paper: 2021</h2>
         <!---<VuePdf v-for="page in numOfPages" :key="page" :src="pdfSrc" :page="page" />---> 
        </div>
      </div>
  
  
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { VuePdf, createLoadingTask } from 'vue3-pdfjs';
  import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
  import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
  import { useRouter } from "vue-router";
  import { useIsAuthenticated } from "../../infrastructure/composition-api/useIsAuthenticated";
  
  
  export default defineComponent({
    name: 'Home',
    components: { VuePdf },
    setup() {
      const pdfSrc = ref<VuePdfPropsType['src']>('./src/assets/demo/FA2020_CC031_ProjAzure_Borlakunta_Kamalakar_VM_LB_Bastian_CosmosDB__RecoveryVault_Alerts(1)(1).pdf')
      const numOfPages = ref(0);
      const router = useRouter();
      const isAuthenticated = useIsAuthenticated();
  
      onMounted(() => {
        const loadingTask = createLoadingTask(<string>pdfSrc.value)
        loadingTask.promise.then((pdf: PDFDocumentProxy) => {
          numOfPages.value = pdf.numPages
        })
      })
      return {
        router,
        pdfSrc,
        numOfPages,
        isAuthenticated
      }
    }
  });
  </script>
  
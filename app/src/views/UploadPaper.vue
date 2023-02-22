<template>
    <div>
        <div v-if="isAuthenticated" class="flex flex-col p-5 mt-20">

            <h1 class="mb-5 text-xl border-b-2 border-[#2e54a5] pb-3">Upload Paper</h1>

            <div class="w-full overflow-y-auto text-left">

                <form class="w-full max-w-sm">
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="alumni_name">
                                Alumni Name
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input v-model="alumni_name" placeholder="enter name"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#2e54a5]"
                                id="alumni_name" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="title">
                                Title
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input v-model="title" placeholder="enter title"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#2e54a5]"
                                id="title" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                for="description">
                                Description
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input v-model="description" placeholder="enter title"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#2e54a5]"
                                id="description" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                for="paste_url">
                                Paste URL
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input v-model="url" placeholder="enter url"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#2e54a5]"
                                id="paste_url" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3">
                            <button v-on:click="submitData()"
                                class="shadow bg-[#2e54a5] hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button">
                                Submit
                            </button>
                            <a @click="$router.go(-1)" class="ml-5 cursor-pointer">Cancel</a>

                            <div  class=" p-1 rounded-md  text-center"></div>

                            <span v-if="msgDiv" class="inline-flex items-center mt-2 px-4 py-2 font-semibold text-sm rounded transition ease-in-out duration-150 w-full bg-gray-200 text-gray-800 place-content-center">

                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

                            </svg>


                            {{ msg }}
                        </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { useIsAuthenticated } from "../../infrastructure/composition-api/useIsAuthenticated";
import { defineComponent, onMounted, reactive, ref } from 'vue';


export default {
    data() {
        return {
            alumni_name: null,
            title: null,
            description: null,
            url: null,
            isAuthenticated: useIsAuthenticated(),
            papers: [],
            msgDiv: false,
            msg: null
        }
    },
    mounted() {

    },
    methods: {
        async submitData() {
            this.msg = 'Saving';
            this.msgDiv= true;
            await axios.post('http://localhost/api/post-survey', {
                "paper": "cloud_compute",
                "student_name": this.alumni_name,
                "title": this.title,
                "description": this.description,
                "url": this.url,
            }).then(response => {
                    this.alumni_name = null;
                    this.title =  null;
                    this.description = null;
                    this.url = null;
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.message);
                });

                //hide message
                setTimeout(() =>  this.msgDiv= false, 2000);
        },
        goBack() {
            return $router.go(-1)
        },
        showMsg(){
            alert(12)
        }
    }
}
</script>
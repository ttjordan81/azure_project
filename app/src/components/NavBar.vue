<template>
    <nav class=" bg-[#2e54a5] pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 border-gray shadow-lg">

        <div class="flex flex-wrap items-center">
            <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                <router-link to="/" class="text-xl pl-2 cursor-pointer">Cloud Compute </router-link>
            </div>

            <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 my-2">
                <span class="relative w-full">
                    <input type="search" placeholder="Search"
                        class="w-full bg-slate-200 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal">
                    <div class="absolute search-icon" style="top: 1rem; left: .8rem;">
                        <svg class="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </div>
                </span>
            </div>

            <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <ul class="list-reset flex justify-between flex-1 md:flex-none items-center text-white">

                    <!---
                    <li class="flex-1 md:flex-none md:mr-3"  v-if="isAuthenticated">
                        <router-link to="/profileNoGuard">No Guard Profile</router-link>
                    </li>-->

                    <li class="flex-1 md:flex-none md:mr-3 bg-slate-300 p-2 text-[#2e54a5] rounded-md "
                        v-if="isAuthenticated">
                        <button type="button" v-on:click="toggleDropdown()" ref="btnDropdownRef" class="cursor-pointer">
                            Settings
                        </button>
                        <div v-bind:class="{ 'hidden': !dropdownPopoverShow, 'block': dropdownPopoverShow }"
                            class="bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg"
                            style="min-width:8rem;" ref="popoverDropdownRef">

                            <div
                                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                <router-link to="/profile" v-on:click="dropdownPopoverShow = false">Profile</router-link>
                            </div>
                            <div
                                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-slate-700">
                                <SignOutButton />
                            </div>
                        </div>
                    </li>
                    <li v-else>
                        <SignInButton />
                    </li>
                    <li class="flex-1 md:flex-none md:mr-3">
                        <WelcomeName />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script  lang="ts">
import { useIsAuthenticated } from '../../infrastructure/composition-api/useIsAuthenticated';
import SignInButton from "./SignInButton.vue";
import SignOutButton from "./SignOutButton.vue";
import WelcomeName from './WelcomeName.vue';
import { createPopper } from '@popperjs/core';

export default {
    components: {
        SignInButton,
        SignOutButton,
        WelcomeName
    },
    name: "dropdown",
    data() {
        return {
            dropdownPopoverShow: false,
            isAuthenticated: useIsAuthenticated()
        }
    },
    methods: {
        toggleDropdown: function () {
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            } else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom",
                    modifiers: [
                        {
                            name: "offset",

                            options: {
                                offset: [-2, 10]
                            }
                        }
                    ]
                });
            }
        }
    }
}



</script>
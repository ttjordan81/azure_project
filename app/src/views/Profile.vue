<template>
	<div v-if="state.resolved" class="flex flex-col p-5 mt-20 w-1/4 text-left">
		<p class="flex"><span class="text-right pr-2 font-bold w-1/4">Name:</span>     <span>{{ state.data.displayName }}</span></p>
		<p class="flex"><span class="text-right pr-2 font-bold w-1/4">Title:</span>    <span>{{ state.data.jobTitle }}</span></p>
		<p class="flex"><span class="text-right pr-2 font-bold w-1/4">Mail:</span>     <span>{{ state.data.mail }}</span></p>
		<p class="flex"><span class="text-right pr-2 font-bold w-1/4">Phone:</span>    <span>{{ state.data.businessPhones ? state.data.businessPhones[0] : "" }}</span></p>
		<p class="flex"><span class="text-right pr-2 font-bold w-1/4">Location:</span> <span>{{ state.data.officeLocation }}</span></p>
	</div>
</template>

<script setup lang="ts">
import { useMsal } from "../../infrastructure/composition-api/useMsal";
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { reactive, onMounted, watch } from 'vue'
import { loginRequest } from "../../infrastructure/authConfig";
import { callMsGraph } from "../utils/MsGraphApiCall";
import UserInfo from "../utils/UserInfo";

const { instance, inProgress } = useMsal();

const state = reactive({
	resolved: false,
	data: {} as UserInfo
});

async function getGraphData() {
	const response = await instance.acquireTokenSilent({
		...loginRequest
	}).catch(async (e) => {
		if (e instanceof InteractionRequiredAuthError) {
			await instance.acquireTokenRedirect(loginRequest);
		}
		throw e;
	});
	if (inProgress.value === InteractionStatus.None) {
		const graphData = await callMsGraph(response.accessToken);
		state.data = graphData;
		state.resolved = true;
		stopWatcher();
	}
}

onMounted(() => {
	getGraphData();
});

const stopWatcher = watch(inProgress, () => {
	if (!state.resolved) {
		getGraphData();
	}
});
</script>

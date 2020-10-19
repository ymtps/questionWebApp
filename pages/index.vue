<template>
	<div class="main">
		<div class="top">
			<top v-if="dispType === 'top'"></top>
			<questions v-if="dispType === 'questions'"></questions>
			<result v-if="dispType === 'result'"></result>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Top from '~/components/top.vue';
import Questions from '~/components/questions.vue';
import Result from '~/components/result.vue';
import settingsJsonPath from '~/assets/json/settings.json'; // 設定ファイル

export default {
	data() {
		return {
			
		}
	},
	computed: {
		...mapState('common', [
			'dispType',
			'settingOption',
		]),
	},
	created () {
		this.readSettings(); // 初期表示設定
	},
	components: {
		Top,
		Questions,
		Result
	},
	methods: {
		...mapMutations('common', [
			'setSettingOption',
			'setDispType',
		]),
		/**
		 * 初期表示設定
		 * 
		 * 設定ファイルをvuexで格納し、トップコンポーネントを表示
		 */
		readSettings() {
			this.setSettingOption(settingsJsonPath); // 設定オプション情報をvuexに格納
			this.setDispType('top'); // トップコンポーネントを表示
		},
	}
}
</script>

<style lang="scss" scoped>
.main {
    width: 80%;
    min-height: 550px;
    border: 1px solid;
    border-radius: 15px;
    position: relative;
    top: 40px;
    left: 0;
    margin: auto;
	padding: 30px;
	background-color: #ffffff;
}
</style>
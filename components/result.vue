<template>
	<div class="resultComponent">
		<h2 class="title">全{{questionList.length}}問中、{{correctCount}}問正解です。</h2>
		<div class="contents">
			<div class="answers">
				<ul>
					<li v-for="(questionInfo, qIndex) in questionList" :key="qIndex">
						<question-info :qIndex="qIndex" :questionInfo="questionInfo" :mode="'answer'"></question-info>
					</li>
				</ul>
			</div>
			<div class="btns-area">
				<button class="btn" @click="backTop()">終了</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QuestionInfo from '~/components/questions/qInfo.vue';

export default {
	data() {
		return {

		}
	},
	created () {
		
	},
	computed: {
		...mapState('common', [
			'correctCount',
			'questionList',
		]),
	},
	components: {
		QuestionInfo,
	},
	methods: {
		...mapMutations('common',[
            'setDispType',
		]),
		/**
		 * トップ画面に戻る
		 */
		backTop() {
			this.setDispType("top");
		}
	},
};
</script>

<style scoped lang="scss">
.resultComponent {
	.answers {
		padding: 15px 0 0 15px;
		background-color: #eaeaea;
		margin-top: 20px;
		border-radius: 15px;
		ul {
			height: 370px;
			overflow: auto;
		}
	}
	.btns-area {
		margin-top: 15px;
		text-align: center;
	}
}
</style>
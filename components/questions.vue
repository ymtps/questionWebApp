<template>
	<div class="questionsComponent">
		<div class="header">
			<button class="btn btn-back" @click="showPreviousQuestion()" :disabled="qIndex === 0">前の問題に戻る</button>
		</div>
		<div class="contents">
			<div class="quetion-area">
				<question-info :qIndex="qIndex" :questionInfo="questionInfo" :answerList="selectAnswerList" :mode="'question'"></question-info>
			</div>
			<div class="btns-area">
				<button class="btn" @click="answerQuestion(qIndex+1)">解答</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import QuestionInfo from '~/components/questions/qInfo.vue';

export default {
	data() {
		return {
			questionInfo: {}, // 表示する問題情報
			qIndex: 0, // 問題のインデックス
			correctCount: 0, // 正解数
			selectAnswerList: [], // 選択した解答リスト
		}
	},
	created() {
		this.showQustion(); // 表示する問題情報をセット
	},
	computed: {
		...mapState('common', [
			'questionList',
		]),
		...mapGetters('common', [
			'getSelectChoiceStore',
		]),
	},
	components: {
		QuestionInfo,
	},
	methods: {
		...mapMutations('common', [
			'setDispType',
			'setCorrectCount',
			'setSelectAnswerList',
		]),
		/**
		 * 表示する問題情報をセット
		 */
		showQustion() {
			this.questionInfo = this.questionList[this.qIndex];
		},
		/**
		 * 解答ボタン押下処理
		 * 
		 * 答え合わせをして、次の問題を表示。最後の問題の場合は解答結果画面を表示。
		 * 
		 * @param {int} nextIndex 次の問題のインデックス
		 */
		answerQuestion(nextIndex) {
			this.checkCorrectAnswer();

			this.qIndex = nextIndex;

			if (this.questionList[this.qIndex]) {
				this.selectChoise = '';
				this.showQustion();
			} else {
				this.setCorrectCount(this.correctCount);
				this.setSelectAnswerList(this.selectAnswerList);
				this.setDispType("result");
			}
		},
		/**
		 * 前の問題に戻るボタン押下処理
		 * 
		 * 前の問題を表示。選択肢のラジオボタンも自分が解答した選択肢の値にする。
		 */
		showPreviousQuestion() {
			this.qIndex = this.qIndex - 1; // 問題のインデックスを一つ前に設定
			this.showQustion(); // 前の問題を表示
			this.selectChoise = this.selectAnswerList[this.qIndex]; // 前の問題で選択した選択肢を設定
		},
		/**
		 * 選択した問題の答えチェック
		 * 
		 * 正解の場合は正解数をインクリメントする。解答リストに自分が選択した解答を追加。
		 */
		checkCorrectAnswer() {
			if (this.getSelectChoiceStore === this.questionInfo.answer) {
				this.correctCount++;
			}

			this.selectAnswerList[this.qIndex] = this.getSelectChoiceStore;
		}
	},
};
</script>

<style scoped lang="scss">
.questionsComponent {
	.header {
		height: 30px;
	}
	.contents {
		margin-top: 10px;
	}
}
</style>
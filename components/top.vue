<template>
	<div class="topComponent">
		<h2 class="title">{{title}}</h2>
		<div class="contents">
			<div class="select_question">
				<p>問題を選択</p>
				<ul>
					<li v-for="(fileInfo, index) in settingOption.questionPaths" :key="index" @click="selectQuestion(fileInfo.filePath)" :class="{'selected': selectQuestionPath === fileInfo.filePath}">
						{{fileInfo.title}}
					</li>
				</ul>
			</div>
			<div class="btns-area">
				<button class="btn" @click="showQuestionCoponent()" :disabled="!selectQuestionPath">{{btnName}}</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from 'axios';

export default {
	data() {
		return {
			title: '', // メインタイトル
			btnName: '', // ボタン名
			selectQuestionPath: '', // 選択した問題集のファイルパス
		}
	},
	created() {
		this.selectQuestionPath = ''; // 選択ファイルパスのリセット
		this.setSettingName(); // タイトルとボタン名を設定
	},
	computed: {
		...mapState('common', [
			'questionList',
			'settingOption',
		]),
	},
	methods: {
		...mapMutations('common', [
			'setDispType',
			'setQuestionList',
        ]),
		/**
		 * タイトルとボタン名を設定
		 * 
		 * 設定ファイルの内容からタイトルとボタン名を設定
		 */
		setSettingName() {
			this.title = this.settingOption.title;
			this.btnName = this.settingOption.btnName;
		},
		/**
		 * 問題コンポーネントを表示
		 */
		showQuestionCoponent() {
			this.readQuestions(); // 問題情報を読み込む
		},
		/**
		 * 問題情報を読み込む
		 */
		readQuestions() {
			axios.get(this.selectQuestionPath).then((response) => {
				this.setReadQuestions(response.data.questionList);
				this.setDispType("questions");
			}).catch((error) => {
				console.log(error);
			})
		},
		/**
		 * 読み込んだ問題情報をstoreに格納
		 * 
		 * @param {object[]} questionList 問題情報
		 */
		setReadQuestions(questionList) {
			// 問題をランダムにする
			if (this.settingOption.randam) {
				questionList = this.shuffleArray(questionList);
			}

			// 選択肢をランダムにする
            if (this.settingOption.choiceRandam) {
				questionList.forEach((questionInfo, index) => {
					questionInfo.choice = this.shuffleArray(questionInfo.choice);
				});
       	    }

			this.setQuestionList(questionList); // 問題情報をvuexに格納
		},
		/**
		 * 選択した問題集のファイルパスを設定
		 * 
		 * @param {string} filePath 問題集のファイルパス
		 */
		selectQuestion(filePath) {
			// 既に選択している場合は選択状態を解除
			if (filePath === this.selectQuestionPath) {
				this.selectQuestionPath = '';
			} else {
				this.selectQuestionPath = filePath;
			}
		}
	},
};
</script>

<style scoped lang="scss">
.topComponent {
	.title {
		margin-top: 50px;
		font-size: 60px;
		color: red;
		text-align: center;
	}
	.contents {
		.select_question {
			margin-top: 30px;
			padding: 0 200px;
			ul {
				border: 1px solid;
				max-height: 200px;
				li {
					height: 30px;
					line-height: 30px;
					padding-left: 20px;
					border: 1px solid;
					cursor: pointer;
					&:hover {
						background-color: greenyellow;
					}
					&.selected {
						background-color: greenyellow;
					}					
				}
			}
		}
		.btn {
			@include center-xy;
			bottom: 30px;
		}
	}
}
</style>
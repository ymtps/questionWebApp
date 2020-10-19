<template>
    <div class="qInfoComponent">
        <div class="header">
            <p class="title">
                問{{qIndex+1}}
                <span v-if="mode === 'answer' && questionInfo.answer === selectAnswerList[qIndex]" class="answer-correct">: 正解</span>
                <span v-if="mode === 'answer' && questionInfo.answer !== selectAnswerList[qIndex]" class="answer-incorrect">: 不正解</span>
            </p>
            <p class="question" v-html="questionInfo.question"></p>
        </div>
        <div class="contents">
            <ul class="choiceList">
                <li v-for="(choice, index) in questionInfo.choice" :key="index" class="choiceList__item">
                    <label class="choice">
                        <input type="radio" v-model="selectChoice" :value="choice" :disabled="mode === 'answer' && (choice !== questionInfo.answer)">
                        <span :class="checkCorrectClass(choice)" v-html="choice"></span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	data() {
		return {
            selectChoice: '', // 選択肢
		}
	},
	created () {
        this.initSelectChoice(); // 選択肢の初期値設定
    },
    watch: {
        questionInfo() {
            this.$nextTick(() => {
                this.initSelectChoice(); // 選択肢の初期値設定
            });
        },
        selectChoice(newVal) {
            this.setSelectChoiceStore(newVal); // 前の画面に戻るボタンの処理用に選択するたびに値を保持
        },
    },
	computed: {
		...mapState('common', [
            'selectAnswerList',
            'settingOption',
		]),
    },
    props: ['qIndex', 'questionInfo', 'mode', 'answerList'],
	methods: {
		...mapMutations('common',[
            'setSelectChoiceStore',
        ]),
        /**
         * 選択肢の初期値設定
         * 
         * 問題解答画面の場合、初めて表示する問題の場合は先頭の選択肢にチェックが付けるが、一度解答した問題であれば自分が選択した解答にチェックが付く。
         */
        initSelectChoice() {
            if (this.mode === 'question') {
                this.selectChoice = this.answerList[this.qIndex] || this.questionInfo.choice[0];
            } else if (this.mode === 'answer') {
                this.selectChoice = this.questionInfo.answer;
            }
        },
        /**
         * 選択肢のクラス付与処理
         * 
         * 正解の選択肢に緑、自分が選択した不正解の選択肢なら赤の背景のクラスを付与
         * 
         * @return {string} 正解(is-correct)、もしくは不正解(is-incorrect)のクラスを返す
         */
        checkCorrectClass(choice) {
            if (this.mode !== 'answer') {
                return '';
            }

            if (choice === this.selectAnswerList[this.qIndex]) {
                if (choice === this.questionInfo.answer) {
                    return 'is-correct';
                } else {
                    return 'is-incorrect';
                }
            } else if (choice === this.questionInfo.answer) {
                return 'is-correct';
            }
        }
	},
};
</script>

<style scoped lang="scss">
.qInfoComponent {
    margin-bottom: 20px;
    .header {
        font-size:32px;
        .title {
            span {
                font-weight: bold;
                 &.answer-correct {
                    color: $color-text-answercorrect;
                }               
                &.answer-incorrect {
                    color: $color-text-incorrect;
                }
            }
        }
    }
    .contents {
        font-size: 24px;
        margin-top: 20px;
        .choiceList {
            &__item {
                .choice {
                    span {
                        &.is-correct {
                            background-color: $color-text-correct;
                        }
                        &.is-incorrect {
                            background-color: $color-text-incorrect;
                        }
                    }
                }
            }
        }
    }
}
</style>
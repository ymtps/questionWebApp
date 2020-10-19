const getDefaultState = () => {
	return {
		dispType: '', // 表示する画面情報
		settingOption: {}, // 設定ファイルの内容
		questionList: [], // 問題集リスト
		selectAnswerList: [], // 解答リスト
		correctCount: 0, // 正解数
		selectChoiceStore: '', // 選択した選択肢
    }
}

export const state = () => (getDefaultState())

export const getters = {
	getSelectChoiceStore (state) {
		return state.selectChoiceStore;
	},
}

export const mutations = {
	setDispType (state, value) {
		state.dispType = value;
	},
	setSettingOption (state, value) {
		state.settingOption = value;
	},
	setQuestionList (state, value) {
		state.questionList = value;
	},
	setSelectAnswerList (state, value) {
		state.selectAnswerList = value;
	},
	setCorrectCount (state, value) {
		state.correctCount = value;
	},
	setSelectChoiceStore (state, value) {
		state.selectChoiceStore = value;
	},
};

export const actions = {

}
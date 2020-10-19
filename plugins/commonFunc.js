import Vue from 'vue'

Vue.mixin({
    methods: {
		/**
		 * 配列をシャッフル
		 * 
		 * @param {string[]} array シャッフルしたい配列
		 * @return シャッフルした配列
		 */
		shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--){
				let r = Math.floor(Math.random() * (i + 1));
				let tmp = array[i];
				
				array[i] = array[r];
				array[r] = tmp;
			}

			return array;
		}
    }
})
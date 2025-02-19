import _ from 'lodash'

export const useSettings = defineStore('useSettings', () => {
	const settings = ref()
	const config = ref()
	async function init() {
		const existing = (await usePb().collection('settings').getList()).items[0] ?? {}
		settings.value = _.merge(
			{
				app: {},
				trakt: {
					clientId: '',
					clientSecret: '',
				},

				real_debrid: {},

				tmdb: {
					key: '',
				},

				fanart: {
					key: '',
				},
			},
			existing
		)
	}

	async function save() {
		if (settings.value.id) {
			await usePb().collection('settings').update(settings.value.id, settings.value)
		} else {
			settings.value = await usePb().collection('settings').create(settings.value)
		}
	}
	return {
		settings,
		config,
		init,
		save,
	}
})

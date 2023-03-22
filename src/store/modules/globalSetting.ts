import { defineStore } from 'pinia'
import globalSetting from '@/setting/globalSetting'
const { navMode, navTheme } = globalSetting
interface globalSettingState {
    navMode: string,
    navTheme: string
}
export const useGlobalSettingStore = defineStore('global-setting', {
    state: (): globalSettingState => ({
        navMode,
        navTheme
    }),
    actions: {

    },
    getters: {
        getNavMode: (state): string => {
            console.log(state);
            return state.navMode
        }
    }
}) 
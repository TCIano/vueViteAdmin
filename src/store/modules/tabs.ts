import { defineStore } from 'pinia'
import { storageStore } from '../storage'
import { route } from '../type'
interface tabsState {
    cacheList: Array<route>,
    activeKey: string
}
const SYSTEM_TABS_ACTIVE_KEY = 'active-key'
export const useTabsStore = defineStore('tabs', {
    state: (): tabsState => {
        return {
            cacheList: [],
            activeKey: storageStore.get(SYSTEM_TABS_ACTIVE_KEY) || ''
        }
    },
    actions: {
        addCacheView(payload: route) {
            let route = payload.name
            const isRepeat = this.cacheList.some(item => item.name === route)
            if (!isRepeat) {
                let newCacheList = this.cacheList
                newCacheList.push(payload)
                this.cacheList = newCacheList
            }
            else {
                let updateList = this.cacheList
                let indexRoute = updateList.findIndex(item => item.name === route)
                updateList[indexRoute] = payload
                this.cacheList = updateList
            }
        },
        removeCacheView(payload: string) {
            let filterList = this.cacheList
            filterList = filterList.filter(item => item.fullPath !== payload)
            this.cacheList = filterList
        },
        resetCacheView(newList: Array<route>) {
            this.cacheList = newList
        },
        setActiveKey(payload: string) {
            storageStore.set(SYSTEM_TABS_ACTIVE_KEY, payload)
        }
    },
    getters: {
        getActiveKey: (state): string => {
            return state.activeKey
        },
        getCacheView: (state): Array<route> => {
            console.log(state.cacheList);
            return state.cacheList

        }
    }
})
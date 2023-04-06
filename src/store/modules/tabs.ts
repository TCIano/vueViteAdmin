import { defineStore } from 'pinia'
import { storageStore } from '../storage'
interface tabsState {
    cacheList: Array<route>,
    activeKey: string
}
interface route {
    fullPath: string,
    name: string
    meta: any,
}
const SYSTEM_TABS_STORE = 'system-tabs'
const SYSTEM_TABS_ACTIVE_KEY = 'active-key'
export const useTabsStore = defineStore('tabs', {
    state: (): tabsState => {
        return {
            cacheList: storageStore.get(SYSTEM_TABS_STORE) || [],
            activeKey: storageStore.get(SYSTEM_TABS_ACTIVE_KEY) || ''
        }
    },
    actions: {
        addCacheView(payload: any) {
            let route = payload.name
            const isRepeat = this.cacheList.some(item => item.name === route)
            if (!isRepeat) {
                this.cacheList.push(payload)
                storageStore.set(SYSTEM_TABS_STORE, this.cacheList)
            } else {
                let indexRoute = this.cacheList.findIndex(item => item.name === route)
                this.cacheList[indexRoute] = payload
            }
        },
        removeCacheView(payload: any) {

        },
        resetCacheView() { },
        setActiveKey(payload: string) {
            storageStore.set(SYSTEM_TABS_ACTIVE_KEY, payload)
        }
    },
    getters: {
        getActiveKey: (state): string => {
            return state.activeKey
        }
    }
})
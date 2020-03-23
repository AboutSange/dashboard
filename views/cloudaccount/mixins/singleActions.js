import { mapGetters } from 'vuex'
import { changeToArr } from '@/utils/utils'
import expectStatus from '@/constants/expectStatus'

const steadyStatus = {
  status: Object.values(expectStatus.cloudaccount).flat(),
  sync_status: Object.values(expectStatus.cloudaccountSyncStatus).flat(),
}

export default {
  computed: {
    ...mapGetters(['l3PermissionEnable']),
  },
  created () {
    this.singleActions = [
      {
        label: '更新账号密码',
        permission: 'cloudaccounts_perform_update_credential',
        action: obj => {
          this.createDialog('CloudaccountUpdateDialog', {
            data: [obj],
            columns: this.columns,
            onManager: this.onManager,
          })
        },
        meta: obj => {
          const ownerDomain = this.$store.getters.isAdminMode || obj.domain_id === this.$store.getters.userInfo.projectDomainId
          let tooltip
          if (!obj.enabled) tooltip = '请先启用云账号'
          return {
            validate: obj.enabled && ownerDomain,
            tooltip,
          }
        },
      },
      {
        label: '更多',
        actions: obj => {
          const ownerDomain = this.$store.getters.isAdminMode || obj.domain_id === this.$store.getters.userInfo.projectDomainId
          return [
            {
              label: '更新账单文件',
              permission: 'cloudaccounts_perform_update_credential',
              action: obj => {
                this.$router.push({
                  name: 'CloudaccountUpdateBill',
                  query: {
                    id: obj.id,
                  },
                })
              },
              meta: obj => {
                return {
                  validate: ['Aws', 'Aliyun', 'Google', 'Huawei'].indexOf(obj.brand) > -1,
                }
              },
            },
            {
              label: '全量同步',
              permission: 'cloudaccounts_perform_sync',
              action: () => {
                this.onManager('performAction', {
                  id: obj.id,
                  steadyStatus,
                  managerArgs: {
                    action: 'sync',
                    data: {
                      full_sync: true,
                    },
                  },
                })
              },
              meta: () => this.syncPolicy(obj, ownerDomain),
            },
            {
              label: '设置自动同步',
              permission: 'cloudaccounts_perform_enable_auto_sync,cloudaccounts_perform_disable_auto_sync',
              action: () => {
                this.createDialog('CloudaccountSetAutoSyncDialog', {
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  steadyStatus,
                })
              },
              meta: () => this.setAutoSyncPolicy(obj, ownerDomain),
            },
            {
              label: '连接测试',
              permission: 'cloudaccounts_perform_sync',
              action: () => {
                this.onManager('performAction', {
                  id: obj.id,
                  steadyStatus,
                  managerArgs: {
                    action: 'sync',
                  },
                })
              },
              meta: () => {
                let tooltip
                if (!obj.enabled) tooltip = '请先启用云账号'
                if (obj.enable_auto_sync) tooltip = '请先取消设置自动同步'
                return {
                  validate: (obj.enabled && !obj.enable_auto_sync) && ownerDomain,
                  tooltip,
                }
              },
            },
            {
              label: '设置共享',
              action: () => {
                this.createDialog('CloudaccountSetShareDialog', {
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                })
              },
              meta: () => {
                let tooltip = ''
                if (!this.l3PermissionEnable) {
                  tooltip = '未开启三级权限，无法操作'
                } else if (!this.$store.getters.isAdminMode) {
                  tooltip = '仅系统管理后台下可以操作'
                }
                return {
                  validate: this.l3PermissionEnable && this.$store.getters.isAdminMode,
                  tooltip,
                }
              },
            },
            {
              label: '启用',
              permission: 'cloudaccounts_perform_enable',
              action: () => {
                this.onManager('performAction', {
                  id: obj.id,
                  managerArgs: {
                    action: 'enable',
                  },
                })
              },
              meta: () => {
                return {
                  validate: !obj.enabled && ownerDomain,
                }
              },
            },
            {
              label: '禁用',
              permission: 'cloudaccounts_perform_disable',
              action: () => {
                this.onManager('performAction', {
                  id: obj.id,
                  managerArgs: {
                    action: 'disable',
                  },
                })
              },
              meta: () => {
                return {
                  validate: obj.enabled && ownerDomain,
                }
              },
            },
            {
              label: '删除',
              permission: 'cloudaccounts_delete',
              action: () => {
                this.createDialog('DeleteResDialog', {
                  vm: this,
                  data: [obj],
                  columns: this.columns,
                  title: '删除云账号',
                  onManager: this.onManager,
                })
              },
              meta: () => this.$getDeleteResult(obj),
            },
          ]
        },
      },
    ]
  },
  methods: {
    syncPolicy (item, ownerDomain) {
      let tooltip
      const items = changeToArr(item)
      if (!items.length) return { validate: false }
      const enabledValid = items.every(obj => {
        if (!obj.enabled) {
          tooltip = '请先启用云账号'
          return false
        }
        return true
      })
      const autoSyncValid = items.every(obj => {
        if (obj.enable_auto_sync) {
          tooltip = '请先取消设置自动同步'
          return false
        }
        return true
      })
      return {
        validate: enabledValid && autoSyncValid && ownerDomain,
        tooltip,
      }
    },
    setAutoSyncPolicy (item, ownerDomain) {
      let tooltip
      const items = changeToArr(item)
      if (!items.length) return { validate: false }
      const enabledValid = items.every(obj => {
        if (!obj.enabled) {
          tooltip = '请先启用云账号'
          return false
        }
        return true
      })
      return {
        validate: enabledValid && ownerDomain,
        tooltip,
      }
    },
  },
}

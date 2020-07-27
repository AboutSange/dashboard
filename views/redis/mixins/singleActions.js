import { disableDeleteAction } from '@/utils/common/tableActions'
import i18n from '@/locales'

export default {
  created () {
    this.singleActions = [
      {
        label: i18n.t('db.text_69'),
        action: (obj) => {
          this.onManager('performAction', {
            id: obj.id,
            steadyStatus: 'running',
            managerArgs: {
              action: 'Sync',
            },
          })
        },
      },
      {
        label: i18n.t('db.text_155'),
        actions: (obj) => {
          const { provider, status } = obj
          const isRunning = status.toLowerCase() === 'running'
          const notRunninTip = !isRunning ? i18n.t('db.text_156') : null
          const isAuthModeOn = obj.auth_mode === 'on'
          const setAuthMode = () => {
            if (!isAuthModeOn && obj.brand !== 'Huawei') {
              return {
                label: i18n.t('db.text_304'),
                action: () => {
                  this.createDialog('RedisUpdateAuthModeDialog', {
                    title: i18n.t('db.text_304'),
                    data: [obj],
                    columns: this.columns,
                    onManager: this.onManager,
                    refresh: this.refresh,
                    name: this.$t('dictionary.elasticcaches'),
                  })
                },
                meta: () => {
                  return {
                    validate: isRunning,
                    tooltip: notRunninTip,
                  }
                },
              }
            }
            return {
              label: i18n.t('db.text_305'),
              action: () => {
                this.createDialog('RedisUpdateAuthModeDialog', {
                  title: i18n.t('db.text_305'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                return {
                  validate: isRunning && obj.brand !== 'Huawei',
                  tooltip: notRunninTip || (obj.brand === 'Huawei' && i18n.t('db.text_306')),
                }
              },
            }
          }
          return [
            {
              label: i18n.t('db.text_70'),
              action: () => {
                this.createDialog('RedisRestartdialog', {
                  title: i18n.t('db.text_70'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                return {
                  validate: isRunning,
                  tooltip: notRunninTip,
                }
              },
            },
            {
              label: i18n.t('db.text_159'),
              action: () => {
                this.createDialog('RedisSetConfigDialog', {
                  title: i18n.t('db.text_159'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                const isPrepaid = obj.billing_type === 'prepaid'
                return {
                  validate: isRunning && !isPrepaid,
                  tooltip: notRunninTip || (isPrepaid ? i18n.t('db.text_307') : ''),
                }
              },
            },
            {
              label: i18n.t('db.text_239'),
              action: () => {
                this.createDialog('RedisClearDataDialog', {
                  title: i18n.t('db.text_239'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                return {
                  validate: isRunning,
                  tooltip: notRunninTip,
                }
              },
            },
            {
              label: provider === 'Huawei' ? i18n.t('db.text_308') : i18n.t('db.text_201'),
              action: () => {
                this.createDialog('RedisResetPassworddialog', {
                  title: provider === 'Huawei' ? i18n.t('db.text_308') : i18n.t('db.text_201'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                return {
                  validate: isRunning,
                  tooltip: notRunninTip,
                }
              },
            },
            {
              label: i18n.t('db.text_160', [i18n.t('dictionary.project')]),
              action: () => {
                this.createDialog('ChangeOwenrDialog', {
                  title: i18n.t('db.text_160', [i18n.t('dictionary.project')]),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                  resource: 'elasticcaches',
                })
              },
            },
            setAuthMode(),
            {
              label: i18n.t('db.text_71'),
              action: () => {
                this.createDialog('SetDurationDialog', {
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                  name: this.$t('dictionary.elasticcaches'),
                })
              },
              meta: () => {
                const ret = {
                  validate: false,
                  tooltip: null,
                }
                if (obj.billing_type === 'prepaid') {
                  ret.tooltip = i18n.t('db.text_72')
                  return ret
                }
                ret.validate = true
                return ret
              },
            },
            disableDeleteAction(this, {
              name: this.$t('dictionary.elasticcaches'),
            }),
            {
              label: i18n.t('db.text_42'),
              permission: 'redis_elasticcaches_delete',
              action: () => {
                this.createDialog('DeleteResDialog', {
                  vm: this,
                  title: i18n.t('db.text_42'),
                  name: this.$t('dictionary.elasticcaches'),
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                })
              },
              meta: () => {
                let tooltip = ''
                const seconds = this.$moment(obj.expired_at).diff(new Date()) / 1000
                if (obj.disable_delete) {
                  tooltip = i18n.t('db.text_74')
                } else if (obj.billing_type === 'prepaid' && seconds > 0) {
                  tooltip = i18n.t('db.text_75')
                }
                return {
                  validate: !tooltip,
                  tooltip: tooltip,
                }
              },
            },
          ]
        },
      },
    ]
  },
}

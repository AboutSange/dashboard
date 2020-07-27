import { mapGetters } from 'vuex'
import i18n from '@/locales'

export default {
  computed: mapGetters(['isAdminMode']),
  created () {
    this.singleActions = [
      {
        label: i18n.t('cloudenv.text_423'),
        action: obj => {
          this.createDialog('SetOwnerDialog', {
            data: [obj],
            columns: this.columns,
            title: i18n.t('cloudenv.text_423'),
            tipName: i18n.t('cloudenv.text_18'),
            onManager: this.onManager,
            tipname: this.$t('dictionary.schedtag'),
          })
        },
        meta: () => {
          const ret = {
            validate: true,
            tooltip: null,
          }
          if (!this.isAdminMode) {
            ret.validate = false
          }
          return ret
        },
      },
      {
        label: i18n.t('cloudenv.text_422'),
        action: obj => {
          this.createDialog('SetStrategyDialog', {
            data: [obj],
            columns: this.columns,
            title: i18n.t('cloudenv.text_422'),
            onManager: this.onManager,
          })
        },
        meta: () => {
          const ret = {
            validate: true,
            tooltip: null,
          }
          if (!this.isAdminMode) {
            ret.validate = false
          }
          return ret
        },
      },
      {
        label: i18n.t('cloudenv.text_108'),
        action: obj => {
          this.createDialog('DeleteResDialog', {
            vm: this,
            data: [obj],
            columns: this.columns,
            title: i18n.t('cloudenv.text_108'),
            name: this.$t('dictionary.schedtag'),
            onManager: this.onManager,
            success: () => {
              this.destroySidePages()
            },
          })
        },
        meta: obj => {
          const ret = {
            validate: obj.can_delete,
            tooltip: null,
          }
          if (!this.isAdminMode) {
            ret.validate = false
          }
          return ret
        },
      },
    ]
  },
}

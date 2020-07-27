import LbListCell from '@Network/views/lb/components/LbListCell'
import {
  getNameDescriptionTableColumn,
  getStatusTableColumn,
} from '@/utils/common/tableColumn'
import i18n from '@/locales'

export default {
  components: {
    LbListCell,
  },
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        title: i18n.t('network.text_21'),
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      getStatusTableColumn({ minWidth: 100, statusModule: 'lb' }),
      getStatusTableColumn({ minWidth: 100, statusModule: 'lbRedirect', field: 'redirect', title: i18n.t('network.text_368') }),
      {
        field: 'domain',
        title: i18n.t('network.text_156'),
        minWidth: 200,
      },
      {
        field: 'path',
        title: 'URL',
        minWidth: 200,
      },
      {
        field: 'backend_group',
        title: i18n.t('network.text_139'),
        minWidth: 200,
        formatter: ({ row }) => {
          return row.redirect === 'off' && row.backend_group ? row.backend_group : '-'
        },
      },
    ]
  },
}

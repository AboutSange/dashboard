import {
  getEnabledTableColumn,
  getNameDescriptionTableColumn,
  getBrandTableColumn,
} from '@/utils/common/tableColumn'
import i18n from '@/locales'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{ row.name }</side-page-trigger>
          )
        },
      }),
      getEnabledTableColumn({ title: i18n.t('cloudenv.text_97') }),
      {
        field: 'guest_count',
        title: this.$t('dictionary.server'),
        width: 70,
      },
      {
        field: 'vpc_count',
        title: 'VPC',
        minWidth: 120,
        showOverflow: 'title',
      },
      {
        field: 'zone_count',
        title: i18n.t('cloudenv.text_11'),
        width: 70,
      },
      getBrandTableColumn({ field: 'provider' }),
    ]
  },
}

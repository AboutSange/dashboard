import {
  getNameDescriptionTableColumn,
  getEnabledTableColumn,
  getStatusTableColumn,
  getProjectTableColumn,
  getTimeTableColumn,
} from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger vm={this} name='InstanceGroupSidePage' id={row.id} list={this.list}>{ row.name }</side-page-trigger>
          )
        },
      }),
      getEnabledTableColumn(),
      {
        field: 'force_dispersion',
        title: '策略',
        width: 70,
        formatter: ({ cellValue }) => {
          let ret = '非强制'
          if (cellValue) ret = '强制'
          return ret
        },
      },
      getStatusTableColumn({ statusModule: 'instanceGroup' }),
      {
        field: 'granularity',
        title: '粒度',
        width: 70,
      },
      {
        field: 'guest_count',
        title: `绑定${this.$t('dictionary.server')}数量`,
        width: 120,
        slots: {
          default: ({ row }) => {
            if (row.guest_count <= 0) return row.guest_count
            return [<side-page-trigger vm={this} name='InstanceGroupSidePage' id={row.id} list={this.list} tab='v-m-instance-list-for-instance-group'>{ row.guest_count }</side-page-trigger>]
          },
        },
      },
      getProjectTableColumn(),
      getTimeTableColumn(),
    ]
  },
}

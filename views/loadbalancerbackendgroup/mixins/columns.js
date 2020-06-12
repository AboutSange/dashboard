import LbListCell from '@Network/views/lb/components/LbListCell'
import {
  getNameDescriptionTableColumn,
  getRegionTableColumn,
  getStatusTableColumn,
  getProjectTableColumn,
} from '@/utils/common/tableColumn'

export default {
  components: {
    LbListCell,
  },
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        title: '名称',
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      getStatusTableColumn({ statusModule: 'lb' }),
      {
        field: 'listeners',
        title: '关联监听',
        type: 'expand',
        width: 100,
        slots: {
          content: ({ row }, h) => {
            if (row.listeners && row.listeners.length > 0) {
              return row.listeners.map(item => {
                return <a-tag class='mb-2'>{item.name}({item.listener_type}: {item.listener_port})</a-tag>
              })
            }
          },
        },
      },
      getRegionTableColumn(),
      getProjectTableColumn(),
    ]
  },
}

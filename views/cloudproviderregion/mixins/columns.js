import { getEnabledTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      {
        field: 'cloudregion',
        title: '名称',
      },
      getEnabledTableColumn({ title: '启用同步' }),
      {
        field: 'last_auto_sync',
        title: '同步时间',
        slots: {
          default: ({ row }) => {
            if (row.sync_status !== 'idle') { // 表示正在同步中
              return [
                <status status={ row.sync_status } statusModule='cloudaccountSyncStatus' />,
              ]
            } else {
              let time = this.$moment(row.last_sync)
              if (row.enable_auto_sync) {
                time = this.$moment(row.last_auto_sync)
              }
              if (time) {
                return time.fromNow()
              } else {
                return '-'
              }
            }
          },
        },
      },
      {
        field: 'sync_status',
        title: '同步状态',
        slots: {
          default: ({ row }) => {
            return [
              <status status={ row.sync_status } statusModule='cloudaccountSyncStatus' />,
            ]
          },
        },
      },
    ]
  },
}

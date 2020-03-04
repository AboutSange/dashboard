import { ACL_TYPE } from '@Storage/constants/index.js'
import AccessInfo from './AccessInfo'
import { getNameDescriptionTableColumn, getStatusTableColumn, getBrandTableColumn, getRegionTableColumn, getAccountTableColumn, getProjectTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name_cn ? `${row.name}(${row.name_cn})` : row.name }</side-page-trigger>
          )
        },
      }),
      getStatusTableColumn({ statusModule: 'bucket' }),
      {
        field: 'storage_class',
        title: '存储类型',
        width: 120,
        formatter: ({ row }) => {
          return row.storage_class || '-'
        },
      },
      {
        field: 'acl',
        title: '读写权限',
        width: 120,
        formatter: ({ row }) => {
          return ACL_TYPE[row.acl] || row.acl || '-'
        },
      },
      {
        field: 'access-info',
        title: '后端访问信息',
        width: 120,
        slots: {
          default: ({ row }) => {
            return [
              <AccessInfo row={row}/>,
            ]
          },
        },
      },
      getBrandTableColumn(),
      getAccountTableColumn(),
      getRegionTableColumn(),
      getProjectTableColumn(),
    ]
  },
}

import {
  getProjectTableColumn,
  getRegionTableColumn,
  getStatusTableColumn,
  getBrandTableColumn,
  getCopyWithContentTableColumn,
  getNameDescriptionTableColumn,
  getBillingTypeTableColumn,
} from '@/utils/common/tableColumn'
import SystemIcon from '@/sections/SystemIcon'
import { sizestr } from '@/utils/utils'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        // addLock: true,
        addBackup: true,
        formRules: [
          { required: true, message: '请输入名称' },
          { validator: this.$validate('resourceCreateName') },
        ],
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'instance_type',
        title: '配置',
        showOverflow: 'ellipsis',
        minWidth: 120,
        sortable: true,
        slots: {
          default: ({ row }) => {
            const { sku, disks } = row.config_info
            const diskSize = disks.map(item => item.size_mb).reduce((a, b) => {
              return a + b
            })
            let ret = []
            if (row.name) {
              ret.push(<div class='text-truncate' style={{ color: '#0A1F44' }}>{ sku.name }</div>)
            }
            const config = sku.cpu_core_count + 'C' + sizestr(sku.memory_size_mb, 'M', 1024) + (diskSize ? sizestr(diskSize, 'M', 1024) : '')
            return ret.concat(<div class='text-truncate' style={{ color: '#53627C' }}>{ config }</div>)
          },
        },
      },
      {
        field: 'os_type',
        title: '系统',
        width: 50,
        slots: {
          default: ({ row }) => {
            let name = (row.metadata && row.metadata.os_distribution) ? row.metadata.os_distribution : row.os_type || ''
            if (name.includes('Windows') || name.includes('windows')) {
              name = 'Windows'
            }
            const version = (row.metadata && row.metadata.os_version) ? `${row.metadata.os_version}` : ''
            const tooltip = (version.includes(name) ? version : `${name} ${version}`) || '未知' // 去重
            return [
              <SystemIcon tooltip={ tooltip } name={ name } />,
            ]
          },
        },
      },
      {
        field: 'config_info.image',
        title: '系统镜像',
        showOverflow: 'ellipsis',
        minWidth: 190,
      },
      getBillingTypeTableColumn(),
      getStatusTableColumn({ statusModule: 'servertemplate' }),
      getCopyWithContentTableColumn({ field: 'vpc', title: 'VPC' }),
      getProjectTableColumn(),
      getBrandTableColumn(),
      getRegionTableColumn(),
    ]
  },
}

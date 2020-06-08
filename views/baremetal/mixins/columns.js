import PasswordFetcher from '@Compute/sections/PasswordFetcher'
import SystemIcon from '@/sections/SystemIcon'
import { sizestr } from '@/utils/utils'
import { getProjectTableColumn, getStatusTableColumn, getCopyWithContentTableColumn, getIpsTableColumn, getNameDescriptionTableColumn, getTagTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        addLock: true,
        addBackup: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      getTagTableColumn({ onManager: this.onManager, needExt: true, resource: 'server', columns: () => this.columns }),
      getIpsTableColumn({ field: 'ip', title: 'IP' }),
      {
        field: 'instance_type',
        title: '配置',
        showOverflow: 'ellipsis',
        minWidth: 120,
        sortable: true,
        slots: {
          default: ({ row }) => {
            const ret = []
            if (row.instance_type) {
              ret.push(<div class='text-truncate' style={{ color: '#0A1F44' }}>{ row.instance_type }</div>)
            }
            const config = row.vcpu_count + 'C' + sizestr(row.vmem_size, 'M', 1024) + (row.disk ? sizestr(row.disk, 'M', 1024) : '')
            return ret.concat(<div class='text-truncate' style={{ color: '#53627C' }}>{ config }</div>)
          },
        },
      },
      {
        field: 'host_sn',
        title: 'SN',
        minWidth: 70,
        showOverflow: 'ellipsis',
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
        field: 'login_account',
        title: '密码',
        width: 50,
        slots: {
          default: ({ row }) => {
            return [<PasswordFetcher serverId={ row.id } resourceType='servers' />]
          },
        },
      },
      getStatusTableColumn({ statusModule: 'server' }),
      getProjectTableColumn(),
      getCopyWithContentTableColumn({
        field: 'host',
        title: '物理机',
        hideField: true,
        slotCallback: row => {
          if (!row.host) return '-'
          return [<side-page-trigger name='PhysicalmachineSidePage' id={row.host_id} list={this.list} tab='physicalmachine-detail' vm={this} >{ row.host }</side-page-trigger>]
        },
      }),
    ]
  },
}

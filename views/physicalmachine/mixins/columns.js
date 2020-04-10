import PasswordFetcher from '@Compute/sections/PasswordFetcher'
import { getMaintenanceTableColumn } from '../utils/columns'
import { getRegionTableColumn, getStatusTableColumn, getEnabledTableColumn, getNameDescriptionTableColumn, getCopyWithContentTableColumn, getTagTableColumn, getPublicScopeTableColumn, getProjectDomainTableColumn } from '@/utils/common/tableColumn'
import { sizestr } from '@/utils/utils'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger name='PhysicalmachineSidePage' id={row.id} list={this.list} vm={this}>{ row.name }</side-page-trigger>
          )
        },
        cellWrapSlots: row => {
          return {
            append: () => row.is_import ? (<a-tooltip title="托管的物理机，不可转化为宿主机"><icon class='ml-2' type='res-physicalmachine' style={{ 'color': '#1890ff' }} /></a-tooltip>) : null,
          }
        },
      }),
      getTagTableColumn({ onManager: this.onManager, needExt: true, resource: 'host', columns: () => this.columns }),
      getEnabledTableColumn(),
      getStatusTableColumn({ statusModule: 'host' }),
      {
        field: 'custom_ip',
        title: 'IP',
        width: 180,
        showOverflow: 'ellipsis',
        slots: {
          default: ({ row }) => {
            let cellWrap = []
            if (row.access_ip) {
              cellWrap.push(
                <div class="d-flex">
                 管理IP：<list-body-cell-wrap row={row} field="access_ip" copy />
                </div>
              )
            }
            if (row.ipmi_ip) {
              cellWrap.push(
                <div class="d-flex">
                  带外IP：<list-body-cell-wrap row={row} field="ipmi_ip" copy />
                </div>
              )
            }
            return cellWrap
          },
        },
      },
      {
        field: 'spec',
        title: '规格',
        width: 120,
        showOverflow: 'ellipsis',
        formatter: ({ row }) => {
          if (!row.spec) return '-'
          let g = function (sz, prefix) {
            if (!prefix || prefix.length === 0) {
              prefix = ''
            }
            if (sz && sz > 0) {
              return `${prefix}${sizestr(sz, 'M', 1024)}`
            } else {
              return ''
            }
          }
          let spec = row.spec
          let cpu = ''
          if (spec.cpu && spec.cpu > 0) {
            cpu = `${spec.cpu}C`
          }
          let mem = g(spec.mem)
          let ssd = ''
          let hdd = ''
          if (spec.disk) {
            if (spec.disk.SSD) {
              ssd = 'SSD'
              for (let key in spec.disk.SSD) {
                ssd += `${g(spec.disk.SSD[key])}x${spec.disk.SSD[key]}`
              }
            }
            if (spec.disk.HDD) {
              hdd = 'HDD'
              for (let key in spec.disk.HDD) {
                hdd += `${g(key)}x${spec.disk.HDD[key]}`
              }
            }
          }
          let driver = ''
          if (spec && spec.driver && spec.driver !== 'Linux') {
            driver = 'RAID'
          }
          return `${cpu}${mem}${hdd}${ssd}${driver}`
        },
      },
      {
        field: 'manufacture',
        title: '品牌',
        width: 70,
        slots: {
          default: ({ row }) => {
            if (row.sys_info && row.sys_info.oem_name) {
              const icons = {
                dell: { height: '25px' },
                hp: { height: '25px' },
                hpe: { height: '30px' },
                inspur: { height: '50px' },
                lenovo: { height: '10px' },
              }
              const arr = Object.keys(icons)
              if (!arr.includes(row.sys_info.oem_name)) {
                return row.sys_info.oem_name
              }
              const imgSrc = require(`../assets/${row.sys_info.oem_name}.svg`)
              return [
                <img src={ imgSrc } style={ icons[row.sys_info.oem_name] } />,
              ]
            }
          },
        },
      },
      getCopyWithContentTableColumn({ field: 'sn', title: 'SN' }),
      getCopyWithContentTableColumn({
        field: 'server',
        title: '分配',
        hideField: true,
        slotCallback: row => {
          if (!row.server) return '-'
          return [
            <side-page-trigger name='PhysicalmachineSidePage' id={row.id} list={this.list} tab='baremetal-list' vm={this}>{ row.server }</side-page-trigger>,
          ]
        },
      }),
      {
        field: 'login_ssh',
        title: '初始账号',
        width: 70,
        slots: {
          default: ({ row }) => {
            return [<PasswordFetcher serverId={ row.id } resourceType='baremetal_ssh' disabled={ row.is_import } promptText={row.is_import ? '托管物理机，无法查看账号信息' : '' } />]
          },
        },
      },
      {
        field: 'access_mac',
        title: 'MAC',
        width: 130,
      },
      {
        field: 'ipmi',
        title: 'IPMI',
        width: 70,
        slots: {
          default: ({ row }) => {
            return [<PasswordFetcher serverId={ row.id } resourceType='baremetals' />]
          },
        },
      },
      getMaintenanceTableColumn(),
      getPublicScopeTableColumn(),
      getProjectDomainTableColumn(),
      getRegionTableColumn(),
    ]
  },
}

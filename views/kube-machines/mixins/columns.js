import * as R from 'ramda'
import { NODE_ROLE_MAP } from '@K8S/views/cluster/constants'
import {
  getNameDescriptionTableColumn,
  getStatusTableColumn,
} from '@/utils/common/tableColumn'
import { HYPERVISORS_MAP } from '@/constants'
import BrandIcon from '@/sections/BrandIcon'
import { sizestr } from '@/utils/utils'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        edit: false,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'cluster',
        title: '集群',
        minWidth: 50,
      },
      {
        field: 'role',
        title: '角色',
        minWidth: 50,
        slots: {
          default: ({ row }, h) => {
            const cnRole = NODE_ROLE_MAP[row.role] || row.role
            return [<a-tag class="mr-2" color="blue">{cnRole}</a-tag>]
          },
        },
      },
      getStatusTableColumn({ statusModule: 'kubemachines' }),
      {
        field: 'cpuRequests/cpuCapacity',
        title: 'CPU(核)',
        minWidth: 70,
        formatter: ({ row }) => {
          if (row.machine_node && R.is(Object, row.machine_node.allocatedResources)) {
            const nodeInfo = row.machine_node.allocatedResources
            return (nodeInfo.cpuRequests / 1000) + ' / ' + (nodeInfo.cpuCapacity / 1000)
          }
          return '-/-'
        },
      },
      {
        field: 'memoryRequests/memoryCapacity',
        title: '内存',
        minWidth: 70,
        formatter: ({ row }) => {
          if (row.machine_node && R.is(Object, row.machine_node.allocatedResources)) {
            const nodeInfo = row.machine_node.allocatedResources
            return sizestr(nodeInfo.memoryRequests, 'B', 1024) + ' / ' + sizestr(nodeInfo.memoryCapacity, 'B', 1024)
          }
          return '-/-'
        },
      },
      {
        field: 'address',
        title: 'IP地址',
        minWidth: 100,
        showOverflow: 'ellipsis',
      },
      {
        title: '平台',
        field: 'hypervisor',
        slots: {
          default: ({ row }, h) => {
            const brand = HYPERVISORS_MAP[row.hypervisor].brand
            if (!brand) return '-'
            return [
              <BrandIcon name={ brand } />,
            ]
          },
        },
      },
    ]
  },
}

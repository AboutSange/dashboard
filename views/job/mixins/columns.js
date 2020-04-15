import { k8sStatusColumn, k8sImageColumn } from '@K8S/utils/tableColumns'
import { getNameDescriptionTableColumn, getTimeTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        edit: false,
        showDesc: false,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'namespace',
        title: '命名空间',
        width: 120,
        sortable: true,
      },
      k8sStatusColumn(),
      {
        field: 'podsInfo',
        title: '容器组',
        width: 70,
        formatter: ({ row }) => {
          return row.podsInfo.running + ' / ' + row.podsInfo.current
        },
      },
      k8sImageColumn(),
      getTimeTableColumn({ field: 'creationTimestamp', fromNow: true, sortable: true }),
    ]
  },
}
